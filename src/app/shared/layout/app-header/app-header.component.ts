import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule } from '@angular/common';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
import { ThemeToggleButtonComponent } from '../../components/common/theme-toggle/theme-toggle-button.component';
import { NotificationDropdownComponent } from '../../components/header/notification-dropdown/notification-dropdown.component';
import { UserDropdownComponent } from '../../components/header/user-dropdown/user-dropdown.component';

interface SearchCommand {
  label: string;
  hint: string;
  route: string;
  keywords: string[];
  fragment?: string;
  queryParams?: Record<string, string>;
}

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
    ThemeToggleButtonComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
  ],
  templateUrl: './app-header.component.html',
})
export class AppHeaderComponent {
  isApplicationMenuOpen = false;
  readonly isMobileOpen$;
  searchQuery = '';
  highlightedCommandIndex = 0;
  isSearchMenuOpen = false;
  readonly commands: SearchCommand[] = [
    {
      label: 'Dashboard',
      hint: 'Inicio y resumen general',
      route: '/dashboard',
      keywords: ['dashboard', 'inicio', 'home', 'panel', 'resumen'],
    },
    {
      label: 'Gestion de tickets',
      hint: 'Consulta tickets y facturas',
      route: '/ticket-management',
      keywords: ['ticket', 'tickets', 'factura', 'facturas', 'gestion tickets', 'gestion de tickets'],
    },
    {
      label: 'Gestion de contribuyentes',
      hint: 'Busca clientes, RFC y CSF',
      route: '/contributors-management',
      keywords: ['contribuyente', 'contribuyentes', 'cliente', 'clientes', 'rfc', 'csf'],
    },
    {
      label: 'Mi suscripcion',
      hint: 'Revisa tu estado y consumo',
      route: '/profile-management',
      keywords: ['suscripcion', 'suscripción', 'perfil', 'cuenta', 'mi suscripcion'],
    },
    {
      label: 'Cartera',
      hint: 'Pagos, cobros y tarjetas',
      route: '/wallet',
      queryParams: { highlight: 'payment-methods' },
      keywords: ['cartera', 'pago', 'pagos', 'tarjeta', 'tarjetas', 'cobro', 'cobros', 'metodo de pago', 'método de pago'],
    },
    {
      label: 'Planes',
      hint: 'Administra tu plan actual',
      route: '/wallet',
      fragment: 'wallet-plans',
      queryParams: { highlight: 'subscription-card' },
      keywords: ['plan', 'planes', 'suscripcion plan', 'suscripción plan', 'plan actual', 'cambiar plan'],
    },
    {
      label: 'Soporte',
      hint: 'Ayuda y tickets recientes',
      route: '/support',
      keywords: ['soporte', 'ayuda', 'faq', 'faqs', 'guias', 'guías'],
    },
    {
      label: 'Historial de soporte',
      hint: 'Consulta todos tus tickets de soporte',
      route: '/support/history',
      keywords: ['historial soporte', 'tickets soporte', 'historial tickets', 'seguimiento soporte'],
    },
  ];

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  private readonly router = inject(Router);
  private readonly hostElement = inject(ElementRef<HTMLElement>);

  get filteredCommands(): SearchCommand[] {
    const query = this.normalizeQuery(this.searchQuery);
    if (!query) {
      return this.commands.slice(0, 6);
    }

    return this.commands
      .map((command) => ({
        command,
        score: this.getCommandScore(command, query),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.command.label.localeCompare(b.command.label))
      .map((item) => item.command)
      .slice(0, 6);
  }

  constructor(public sidebarService: SidebarService) {
    this.isMobileOpen$ = this.sidebarService.isMobileOpen$;
  }

  handleToggle() {
    if (window.innerWidth >= 1280) {
      this.sidebarService.toggleExpanded();
    } else {
      this.sidebarService.toggleMobileOpen();
    }

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 50);
  }

  toggleApplicationMenu() {
    this.isApplicationMenuOpen = !this.isApplicationMenuOpen;
  }

  ngAfterViewInit() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('click', this.handleDocumentClick, true);
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('click', this.handleDocumentClick, true);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.searchInput?.nativeElement.focus();
    }
  };

  handleDocumentClick = (event: MouseEvent) => {
    if (!this.hostElement.nativeElement.contains(event.target as Node)) {
      this.closeSearchMenu();
    }
  };

  onSearchInput(value: string): void {
    this.searchQuery = value;
    this.highlightedCommandIndex = 0;
    this.isSearchMenuOpen = true;
  }

  onSearchFocus(): void {
    this.isSearchMenuOpen = true;
    this.highlightedCommandIndex = 0;
  }

  onSearchKeydown(event: KeyboardEvent): void {
    const commands = this.filteredCommands;

    if (event.key === 'ArrowDown' && commands.length) {
      event.preventDefault();
      this.isSearchMenuOpen = true;
      this.highlightedCommandIndex = (this.highlightedCommandIndex + 1) % commands.length;
      return;
    }

    if (event.key === 'ArrowUp' && commands.length) {
      event.preventDefault();
      this.isSearchMenuOpen = true;
      this.highlightedCommandIndex = (this.highlightedCommandIndex - 1 + commands.length) % commands.length;
      return;
    }

    if (event.key === 'Escape') {
      this.closeSearchMenu();
      this.searchInput?.nativeElement.blur();
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const command = commands[this.highlightedCommandIndex] ?? commands[0];
      if (command) {
        this.executeCommand(command);
      }
    }
  }

  onSearchSubmit(event: Event): void {
    event.preventDefault();
    const command = this.filteredCommands[this.highlightedCommandIndex] ?? this.filteredCommands[0];
    if (command) {
      this.executeCommand(command);
    }
  }

  onCommandClick(command: SearchCommand): void {
    this.executeCommand(command);
  }

  isCommandHighlighted(index: number): boolean {
    return index === this.highlightedCommandIndex;
  }

  trackCommand(_: number, command: SearchCommand): string {
    return command.label;
  }

  private executeCommand(command: SearchCommand): void {
    this.searchQuery = command.label;
    this.closeSearchMenu();

    const navigationExtras: NavigationExtras = {};
    if (command.fragment) {
      navigationExtras.fragment = command.fragment;
    }
    if (command.queryParams) {
      navigationExtras.queryParams = command.queryParams;
    }

    const urlTree = this.router.createUrlTree([command.route], navigationExtras);
    void this.router.navigateByUrl(urlTree);
  }

  private closeSearchMenu(): void {
    this.isSearchMenuOpen = false;
    this.highlightedCommandIndex = 0;
  }

  private normalizeQuery(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  private getCommandScore(command: SearchCommand, query: string): number {
    const normalizedLabel = this.normalizeQuery(command.label);
    const normalizedHint = this.normalizeQuery(command.hint);
    const keywordMatches = command.keywords.map((keyword) => this.normalizeQuery(keyword));

    if (normalizedLabel === query) return 120;
    if (keywordMatches.some((keyword) => keyword === query)) return 110;
    if (normalizedLabel.startsWith(query)) return 90;
    if (keywordMatches.some((keyword) => keyword.startsWith(query))) return 80;
    if (normalizedLabel.includes(query)) return 70;
    if (keywordMatches.some((keyword) => keyword.includes(query))) return 60;
    if (normalizedHint.includes(query)) return 40;
    return 0;
  }
}
