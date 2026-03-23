$ErrorActionPreference = 'Stop'

function Write-Utf8NoBom($Path, $Content) {
  $dir = Split-Path -Parent $Path
  if (-not (Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $utf8NoBom)
}

$base = 'C:\Users\willi\Documents\Weekly\WeeklyApi'

Write-Utf8NoBom "$base\Application\DTO\UsuarioWeb\Stripe\ConfiguracionPublicaStripeDTO.cs" @'
namespace Application.DTO.UsuarioWeb.Stripe
{
    public class ConfiguracionPublicaStripeDTO
    {
        public string publishableKeyDTO { get; set; } = string.Empty;
    }
}
'@

Write-Utf8NoBom "$base\Application\DTO\UsuarioWeb\Stripe\MetodoPagoStripeDTO.cs" @'
namespace Application.DTO.UsuarioWeb.Stripe
{
    public class MetodoPagoStripeDTO
    {
        public string idMetodoPagoDTO { get; set; } = string.Empty;
        public string marcaDTO { get; set; } = string.Empty;
        public string ultimos4DTO { get; set; } = string.Empty;
        public int mesExpiracionDTO { get; set; }
        public int anioExpiracionDTO { get; set; }
        public bool esPredeterminadaDTO { get; set; }
    }
}
'@

Write-Utf8NoBom "$base\Application\DTO\UsuarioWeb\Stripe\OperacionMetodoPagoStripeDTO.cs" @'
namespace Application.DTO.UsuarioWeb.Stripe
{
    public class OperacionMetodoPagoStripeDTO
    {
        public string idMetodoPagoDTO { get; set; } = string.Empty;
        public bool exitoDTO { get; set; }
    }
}
'@

Write-Utf8NoBom "$base\Application\Interfaces\Repositories\UsuarioWeb\Stripe\IConfiguracionPublicaStripeRepository.cs" @'
using Application.DTO.UsuarioWeb.Stripe;

namespace Application.Interfaces.Repositories.UsuarioWeb.Stripe
{
    public interface IConfiguracionPublicaStripeRepository
    {
        Task<ConfiguracionPublicaStripeDTO> ObtenerAsync();
    }
}
'@

Write-Utf8NoBom "$base\Application\Interfaces\Repositories\UsuarioWeb\Stripe\IMetodosPagoStripeRepository.cs" @'
using Application.DTO.UsuarioWeb.Stripe;

namespace Application.Interfaces.Repositories.UsuarioWeb.Stripe
{
    public interface IMetodosPagoStripeRepository
    {
        Task<List<MetodoPagoStripeDTO>> ListarAsync(int idUsuario);
        Task<OperacionMetodoPagoStripeDTO> EstablecerPredeterminadoAsync(int idUsuario, string idMetodoPago);
        Task<OperacionMetodoPagoStripeDTO> EliminarAsync(int idUsuario, string idMetodoPago);
    }
}
'@

Write-Utf8NoBom "$base\Application\UseCases\UsuarioWeb\Stripe\UsuarioStripeRequest.cs" @'
namespace Application.UseCases.UsuarioWeb.Stripe
{
    public class UsuarioStripeRequest
    {
        public int idUsuario { get; set; }
    }
}
'@

Write-Utf8NoBom "$base\Application\UseCases\UsuarioWeb\Stripe\MetodoPagoUsuarioStripeRequest.cs" @'
namespace Application.UseCases.UsuarioWeb.Stripe
{
    public class MetodoPagoUsuarioStripeRequest
    {
        public int idUsuario { get; set; }
        public string idMetodoPago { get; set; } = string.Empty;
    }
}
'@

Write-Utf8NoBom "$base\Infrastructure\Repositories\UsuarioWeb\Stripe\ConfiguracionPublicaStripeRepository.cs" @'
using Application.DTO.UsuarioWeb.Stripe;
using Application.Interfaces.Repositories.UsuarioWeb.Stripe;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Repositories.UsuarioWeb.Stripe
{
    public class ConfiguracionPublicaStripeRepository : IConfiguracionPublicaStripeRepository
    {
        private readonly IConfiguration _configuration;

        public ConfiguracionPublicaStripeRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Task<ConfiguracionPublicaStripeDTO> ObtenerAsync()
        {
            return Task.FromResult(new ConfiguracionPublicaStripeDTO
            {
                publishableKeyDTO = (_configuration["Stripe:PublishableKey"] ?? string.Empty).Trim()
            });
        }
    }
}
'@

Write-Utf8NoBom "$base\Infrastructure\Repositories\UsuarioWeb\Stripe\MetodosPagoStripeRepository.cs" @'
using Application.DTO.UsuarioWeb.Stripe;
using Application.Interfaces.Repositories.UsuarioWeb.Stripe;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace Infrastructure.Repositories.UsuarioWeb.Stripe
{
    public class MetodosPagoStripeRepository : IMetodosPagoStripeRepository
    {
        private readonly IConfiguration _configuration;
        private readonly IDbConnection _db;

        public MetodosPagoStripeRepository(IConfiguration configuration, IDbConnection db)
        {
            _configuration = configuration;
            _db = db;
        }

        public async Task<List<MetodoPagoStripeDTO>> ListarAsync(int idUsuario)
        {
            var customerId = await ObtenerStripeCustomerIdAsync(idUsuario);
            if (string.IsNullOrWhiteSpace(customerId))
            {
                return new List<MetodoPagoStripeDTO>();
            }

            ConfigurarStripe();

            var customerService = new global::Stripe.CustomerService();
            var customer = await customerService.GetAsync(customerId);
            var defaultPaymentMethodId = customer?.InvoiceSettings?.DefaultPaymentMethodId ?? string.Empty;

            var paymentMethodService = new global::Stripe.PaymentMethodService();
            var paymentMethods = await paymentMethodService.ListAsync(new global::Stripe.PaymentMethodListOptions
            {
                Customer = customerId,
                Type = "card"
            });

            return (paymentMethods?.Data ?? new List<global::Stripe.PaymentMethod>())
                .Select(item => new MetodoPagoStripeDTO
                {
                    idMetodoPagoDTO = item.Id ?? string.Empty,
                    marcaDTO = NormalizarMarca(item.Card?.Brand),
                    ultimos4DTO = item.Card?.Last4 ?? string.Empty,
                    mesExpiracionDTO = Convert.ToInt32(item.Card?.ExpMonth ?? 0),
                    anioExpiracionDTO = Convert.ToInt32(item.Card?.ExpYear ?? 0),
                    esPredeterminadaDTO = string.Equals(item.Id, defaultPaymentMethodId, StringComparison.OrdinalIgnoreCase)
                })
                .OrderByDescending(item => item.esPredeterminadaDTO)
                .ThenBy(item => item.marcaDTO)
                .ThenBy(item => item.ultimos4DTO)
                .ToList();
        }

        public async Task<OperacionMetodoPagoStripeDTO> EstablecerPredeterminadoAsync(int idUsuario, string idMetodoPago)
        {
            var customerId = await ObtenerStripeCustomerIdAsync(idUsuario);
            if (string.IsNullOrWhiteSpace(customerId))
            {
                return new OperacionMetodoPagoStripeDTO { idMetodoPagoDTO = idMetodoPago, exitoDTO = false };
            }

            ConfigurarStripe();

            var customerService = new global::Stripe.CustomerService();
            await customerService.UpdateAsync(customerId, new global::Stripe.CustomerUpdateOptions
            {
                InvoiceSettings = new global::Stripe.CustomerInvoiceSettingsOptions
                {
                    DefaultPaymentMethod = idMetodoPago
                }
            });

            await _db.ExecuteAsync(
                "UPDATE ft_the_usuario SET stripe_payment_method_id = @idMetodoPago WHERE id_usuario = @idUsuario;",
                new { idMetodoPago, idUsuario }
            );

            return new OperacionMetodoPagoStripeDTO
            {
                idMetodoPagoDTO = idMetodoPago,
                exitoDTO = true
            };
        }

        public async Task<OperacionMetodoPagoStripeDTO> EliminarAsync(int idUsuario, string idMetodoPago)
        {
            var customerId = await ObtenerStripeCustomerIdAsync(idUsuario);
            if (string.IsNullOrWhiteSpace(customerId))
            {
                return new OperacionMetodoPagoStripeDTO { idMetodoPagoDTO = idMetodoPago, exitoDTO = false };
            }

            ConfigurarStripe();

            var customerService = new global::Stripe.CustomerService();
            var customer = await customerService.GetAsync(customerId);
            var defaultPaymentMethodId = customer?.InvoiceSettings?.DefaultPaymentMethodId ?? string.Empty;

            var paymentMethodService = new global::Stripe.PaymentMethodService();
            await paymentMethodService.DetachAsync(idMetodoPago);

            string nuevoMetodoPredeterminado = string.Empty;

            if (string.Equals(defaultPaymentMethodId, idMetodoPago, StringComparison.OrdinalIgnoreCase))
            {
                var restantes = await paymentMethodService.ListAsync(new global::Stripe.PaymentMethodListOptions
                {
                    Customer = customerId,
                    Type = "card"
                });

                nuevoMetodoPredeterminado = restantes?.Data?.FirstOrDefault()?.Id ?? string.Empty;

                await customerService.UpdateAsync(customerId, new global::Stripe.CustomerUpdateOptions
                {
                    InvoiceSettings = new global::Stripe.CustomerInvoiceSettingsOptions
                    {
                        DefaultPaymentMethod = string.IsNullOrWhiteSpace(nuevoMetodoPredeterminado)
                            ? null
                            : nuevoMetodoPredeterminado
                    }
                });
            }

            await _db.ExecuteAsync(
                "UPDATE ft_the_usuario SET stripe_payment_method_id = @idMetodoPago WHERE id_usuario = @idUsuario;",
                new
                {
                    idMetodoPago = string.IsNullOrWhiteSpace(nuevoMetodoPredeterminado) ? null : nuevoMetodoPredeterminado,
                    idUsuario
                }
            );

            return new OperacionMetodoPagoStripeDTO
            {
                idMetodoPagoDTO = idMetodoPago,
                exitoDTO = true
            };
        }

        private async Task<string> ObtenerStripeCustomerIdAsync(int idUsuario)
        {
            var customerId = await _db.QueryFirstOrDefaultAsync<string>(
                "SELECT COALESCE(NULLIF(TRIM(stripe_customer_id), ''), '') FROM ft_the_usuario WHERE id_usuario = @idUsuario LIMIT 1;",
                new { idUsuario }
            );

            return (customerId ?? string.Empty).Trim();
        }

        private void ConfigurarStripe()
        {
            var secretKey = _configuration["Stripe:SecretKey"];
            if (string.IsNullOrWhiteSpace(secretKey))
            {
                throw new InvalidOperationException("Stripe:SecretKey no esta configurada.");
            }

            global::Stripe.StripeConfiguration.ApiKey = secretKey;
        }

        private static string NormalizarMarca(string? brand)
        {
            var value = (brand ?? string.Empty).Trim().ToLowerInvariant();
            return value switch
            {
                "visa" => "Visa",
                "mastercard" => "Mastercard",
                "amex" => "American Express",
                "american express" => "American Express",
                _ => string.IsNullOrWhiteSpace(brand) ? "Tarjeta" : brand.Trim()
            };
        }
    }
}
'@

Write-Utf8NoBom "$base\WebAPI\Controllers\UsuarioWeb\Stripe\StripeUsuarioWebController.cs" @'
using API.Controllers;
using Application.DTO.UsuarioWeb.Stripe;
using Application.Interfaces.Repositories.UsuarioWeb.Stripe;
using Application.UseCases.UsuarioWeb.Stripe;
using Domain.Common;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace WebAPI.Controllers.UsuarioWeb.Stripe
{
    [ApiController]
    [Route("api/v1/[controller]/[action]")]
    public class StripeUsuarioWebController : BaseController
    {
        private readonly IMediator _mediator;
        private readonly IConfiguracionPublicaStripeRepository _configRepo;
        private readonly IMetodosPagoStripeRepository _metodosPagoRepo;

        public StripeUsuarioWebController(
            IMediator mediator,
            IConfiguracionPublicaStripeRepository configRepo,
            IMetodosPagoStripeRepository metodosPagoRepo)
        {
            _mediator = mediator;
            _configRepo = configRepo;
            _metodosPagoRepo = metodosPagoRepo;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerConfiguracionPublica()
        {
            var response = new GenericResponse<ConfiguracionPublicaStripeDTO>
            {
                Result = true,
                Code = (int)EnumApp.ResponseCode.OK,
                Message = "Configuracion publica de Stripe obtenida correctamente.",
                Data = await _configRepo.ObtenerAsync()
            };

            return GenerateResponse(response);
        }

        [HttpPost]
        public async Task<IActionResult> ListarMetodosPagoUsuario([FromBody] UsuarioStripeRequest request)
        {
            var response = new GenericResponse<List<MetodoPagoStripeDTO>>
            {
                Result = false,
                Code = (int)EnumApp.ResponseCode.OK,
                Data = new List<MetodoPagoStripeDTO>()
            };

            if (request == null || request.idUsuario <= 0)
            {
                response.Code = (int)EnumApp.ResponseCode.BadRequest;
                response.Message = "Solicitud invalida";
                return GenerateResponse(response);
            }

            response.Result = true;
            response.Message = "Metodos de pago obtenidos correctamente.";
            response.Data = await _metodosPagoRepo.ListarAsync(request.idUsuario);
            return GenerateResponse(response);
        }

        [HttpPost]
        public async Task<IActionResult> EstablecerMetodoPagoDefault([FromBody] MetodoPagoUsuarioStripeRequest request)
        {
            var response = new GenericResponse<OperacionMetodoPagoStripeDTO>
            {
                Result = false,
                Code = (int)EnumApp.ResponseCode.OK,
                Data = new OperacionMetodoPagoStripeDTO()
            };

            if (request == null || request.idUsuario <= 0 || string.IsNullOrWhiteSpace(request.idMetodoPago))
            {
                response.Code = (int)EnumApp.ResponseCode.BadRequest;
                response.Message = "Solicitud invalida";
                return GenerateResponse(response);
            }

            response.Data = await _metodosPagoRepo.EstablecerPredeterminadoAsync(request.idUsuario, request.idMetodoPago.Trim());
            response.Result = response.Data.exitoDTO;
            response.Message = response.Result
                ? "Metodo de pago principal actualizado."
                : "No se pudo actualizar el metodo de pago principal.";
            return GenerateResponse(response);
        }

        [HttpPost]
        public async Task<IActionResult> EliminarMetodoPago([FromBody] MetodoPagoUsuarioStripeRequest request)
        {
            var response = new GenericResponse<OperacionMetodoPagoStripeDTO>
            {
                Result = false,
                Code = (int)EnumApp.ResponseCode.OK,
                Data = new OperacionMetodoPagoStripeDTO()
            };

            if (request == null || request.idUsuario <= 0 || string.IsNullOrWhiteSpace(request.idMetodoPago))
            {
                response.Code = (int)EnumApp.ResponseCode.BadRequest;
                response.Message = "Solicitud invalida";
                return GenerateResponse(response);
            }

            response.Data = await _metodosPagoRepo.EliminarAsync(request.idUsuario, request.idMetodoPago.Trim());
            response.Result = response.Data.exitoDTO;
            response.Message = response.Result
                ? "Metodo de pago eliminado correctamente."
                : "No se pudo eliminar el metodo de pago.";
            return GenerateResponse(response);
        }

        [HttpPost]
        public async Task<IActionResult> CrearCheckoutSesion([FromBody] CrearCheckoutSesionStripeRequest request)
        {
            if (request == null || request.idUsuario <= 0 || request.idPlan <= 0)
            {
                return BadRequest("Solicitud invalida");
            }

            var response = await _mediator.Send(request);
            return GenerateResponse(response);
        }

        [HttpPost]
        public async Task<IActionResult> ConfirmarPagoCheckout([FromBody] ConfirmarPagoCheckoutStripeRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.sessionId))
            {
                return BadRequest("Solicitud invalida");
            }

            var response = await _mediator.Send(request);
            return GenerateResponse(response);
        }

        [HttpPost]
        public async Task<IActionResult> WebhookStripe()
        {
            Request.EnableBuffering();

            string payload;
            using (var reader = new StreamReader(Request.Body, Encoding.UTF8, detectEncodingFromByteOrderMarks: false, leaveOpen: true))
            {
                payload = await reader.ReadToEndAsync();
                Request.Body.Position = 0;
            }

            var stripeSignature = Request.Headers["Stripe-Signature"].ToString();

            var request = new WebhookStripeRequest
            {
                payload = payload,
                stripeSignature = stripeSignature
            };

            var response = await _mediator.Send(request);
            return GenerateResponse(response);
        }

        [HttpPost]
        public async Task<IActionResult> ObtenerEstatusPago([FromBody] ObtenerEstatusPagoStripeRequest request)
        {
            if (request == null || (string.IsNullOrWhiteSpace(request.sessionId) && string.IsNullOrWhiteSpace(request.paymentIntentId)))
            {
                return BadRequest("Solicitud invalida");
            }

            var response = await _mediator.Send(request);
            return GenerateResponse(response);
        }

        [HttpPost]
        public async Task<IActionResult> AsegurarCustomerUsuario([FromBody] AsegurarCustomerStripeRequest request)
        {
            if (request == null || request.idUsuario <= 0)
            {
                return BadRequest("Solicitud invalida");
            }

            var response = await _mediator.Send(request);
            return GenerateResponse(response);
        }

        [HttpPost]
        public async Task<IActionResult> CrearSetupIntent([FromBody] CrearSetupIntentStripeRequest request)
        {
            if (request == null || request.idUsuario <= 0)
            {
                return BadRequest("Solicitud invalida");
            }

            var response = await _mediator.Send(request);
            return GenerateResponse(response);
        }
    }
}
'@
