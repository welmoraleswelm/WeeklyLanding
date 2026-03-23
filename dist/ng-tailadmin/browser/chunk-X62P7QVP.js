import {
  API_ENDPOINTS,
  ApiClientService,
  ApiRequestContextService,
  AsyncPipe,
  BehaviorSubject,
  ChangeDetectionStrategy,
  CommonModule,
  Component,
  DefaultValueAccessor,
  EventEmitter,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  Injectable,
  Input,
  ModalComponent,
  NgClass,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  Output,
  PageBreadcrumbComponent,
  ReactiveFormsModule,
  Router,
  RouterLink,
  SelectControlValueAccessor,
  Subject,
  TicketUploadStatusService,
  Validators,
  catchError,
  forkJoin,
  map,
  of,
  setClassMetadata,
  signal,
  startWith,
  switchMap,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-AIPZTRQE.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-YP43Q66R.js";

// src/app/pages/support/components/support-header-card/support-header-card.component.ts
var SupportHeaderCardComponent = class _SupportHeaderCardComponent {
  query = "";
  averageResponseTimeLabel = "Sin datos";
  queryChange = new EventEmitter();
  onInput(value) {
    this.queryChange.emit(value);
  }
  static \u0275fac = function SupportHeaderCardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SupportHeaderCardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SupportHeaderCardComponent, selectors: [["app-support-header-card"]], inputs: { query: "query", averageResponseTimeLabel: "averageResponseTimeLabel" }, outputs: { queryChange: "queryChange" }, decls: 35, vars: 1, consts: [[1, "relative", "overflow-hidden", "rounded-3xl", "border", "border-gray-200", "bg-white", "shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)]", "dark:border-gray-800", "dark:bg-white/[0.03]"], [1, "absolute", "-left-20", "-top-20", "h-64", "w-64", "rounded-full", "bg-gradient-to-br", "from-brand-500/10", "to-brand-600/5", "blur-3xl"], [1, "absolute", "-bottom-20", "-right-20", "h-64", "w-64", "rounded-full", "bg-gradient-to-br", "from-blue-500/10", "to-cyan-500/5", "blur-3xl"], [1, "relative", "p-6", "sm:p-8"], [1, "grid", "grid-cols-1", "gap-6", "lg:grid-cols-[minmax(0,1fr)_320px]", "lg:items-center"], [1, "inline-flex", "items-center", "gap-2", "rounded-full", "bg-brand-50", "px-3", "py-1.5", "dark:bg-brand-500/10"], [1, "flex", "h-2", "w-2", "rounded-full", "bg-brand-500", "animate-pulse"], [1, "text-xs", "font-semibold", "text-brand-600", "dark:text-brand-400"], [1, "mt-4", "text-2xl", "font-bold", "text-gray-900", "sm:text-3xl", "dark:text-white"], [1, "mt-3", "text-sm", "text-gray-500", "dark:text-gray-400", "max-w-lg"], [1, "relative", "hidden"], [1, "rounded-2xl", "border", "border-gray-200", "bg-gray-50/80", "p-4", "backdrop-blur-sm", "dark:border-gray-700", "dark:bg-white/[0.04]"], [1, "block", "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300", "mb-2"], [1, "relative"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "absolute", "left-3.5", "top-1/2", "h-5", "w-5", "-translate-y-1/2", "text-gray-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"], ["type", "search", "placeholder", "Ej: \xBFC\xF3mo subir un ticket?", 1, "w-full", "rounded-xl", "border", "border-gray-200", "bg-white", "py-3", "pl-11", "pr-4", "text-sm", "text-gray-700", "outline-none", "transition-all", "focus:border-brand-500", "focus:ring-2", "focus:ring-brand-500/20", "dark:border-gray-600", "dark:bg-gray-800", "dark:text-white", "dark:focus:border-brand-500", 3, "input", "value"], [1, "mt-3", "flex", "flex-wrap", "gap-2"], ["type", "button", 1, "inline-flex", "items-center", "gap-1", "rounded-lg", "bg-white", "px-2.5", "py-1.5", "text-xs", "font-medium", "text-gray-600", "shadow-sm", "ring-1", "ring-gray-200", "transition-all", "hover:bg-gray-50", "dark:bg-gray-800", "dark:text-gray-300", "dark:ring-gray-700", "dark:hover:bg-gray-700", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-3", "w-3"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"]], template: function SupportHeaderCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 0);
      \u0275\u0275domElement(1, "div", 1)(2, "div", 2);
      \u0275\u0275domElementStart(3, "div", 3)(4, "div", 4)(5, "div")(6, "div", 5);
      \u0275\u0275domElement(7, "span", 6);
      \u0275\u0275domElementStart(8, "span", 7);
      \u0275\u0275text(9, "Soporte disponible 24/7");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(10, "h1", 8);
      \u0275\u0275text(11, " \xBFEn qu\xE9 podemos ayudarte hoy? ");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(12, "p", 9);
      \u0275\u0275text(13, " Busca en nuestra base de conocimiento, revisa el estado de tus tickets o contacta con nuestro equipo de soporte. ");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(14, "div", 10)(15, "div", 11)(16, "label", 12);
      \u0275\u0275text(17, " Buscar en soporte ");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(18, "div", 13);
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(19, "svg", 14);
      \u0275\u0275domElement(20, "path", 15);
      \u0275\u0275domElementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(21, "input", 16);
      \u0275\u0275domListener("input", function SupportHeaderCardComponent_Template_input_input_21_listener($event) {
        return ctx.onInput($event.target.value);
      });
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(22, "div", 17)(23, "button", 18);
      \u0275\u0275domListener("click", function SupportHeaderCardComponent_Template_button_click_23_listener() {
        return ctx.onInput("subir ticket");
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(24, "svg", 19);
      \u0275\u0275domElement(25, "path", 20);
      \u0275\u0275domElementEnd();
      \u0275\u0275text(26, " Subir ticket ");
      \u0275\u0275domElementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(27, "button", 18);
      \u0275\u0275domListener("click", function SupportHeaderCardComponent_Template_button_click_27_listener() {
        return ctx.onInput("estado");
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(28, "svg", 19);
      \u0275\u0275domElement(29, "path", 21);
      \u0275\u0275domElementEnd();
      \u0275\u0275text(30, " Estado ticket ");
      \u0275\u0275domElementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(31, "button", 18);
      \u0275\u0275domListener("click", function SupportHeaderCardComponent_Template_button_click_31_listener() {
        return ctx.onInput("facturaci\xF3n");
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(32, "svg", 19);
      \u0275\u0275domElement(33, "path", 22);
      \u0275\u0275domElementEnd();
      \u0275\u0275text(34, " Facturaci\xF3n ");
      \u0275\u0275domElementEnd()()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(21);
      \u0275\u0275domProperty("value", ctx.query);
    }
  }, dependencies: [CommonModule], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SupportHeaderCardComponent, [{
    type: Component,
    args: [{ selector: "app-support-header-card", standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `<section class="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)] dark:border-gray-800 dark:bg-white/[0.03]">
  <!-- Background decorations -->
  <div class="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-brand-500/10 to-brand-600/5 blur-3xl"></div>
  <div class="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/5 blur-3xl"></div>

  <div class="relative p-6 sm:p-8">
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
      <!-- Content -->
      <div>
        <div class="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 dark:bg-brand-500/10">
          <span class="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
          <span class="text-xs font-semibold text-brand-600 dark:text-brand-400">Soporte disponible 24/7</span>
        </div>

        <h1 class="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          \xBFEn qu\xE9 podemos ayudarte hoy?
        </h1>

        <p class="mt-3 text-sm text-gray-500 dark:text-gray-400 max-w-lg">
          Busca en nuestra base de conocimiento, revisa el estado de tus tickets o contacta con nuestro equipo de soporte.
        </p>

        <!-- Quick stats intentionally hidden until real metrics are available -->
      </div>

      <!-- Search -->
      <div class="relative hidden">
        <div class="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 backdrop-blur-sm dark:border-gray-700 dark:bg-white/[0.04]">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Buscar en soporte
          </label>
          <div class="relative">
            <svg class="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              class="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-brand-500"
              type="search"
              [value]="query"
              (input)="onInput($any($event.target).value)"
              placeholder="Ej: \xBFC\xF3mo subir un ticket?"
            />
          </div>

          <!-- Quick suggestions -->
          <div class="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              class="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm ring-1 ring-gray-200 transition-all hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700"
              (click)="onInput('subir ticket')"
            >
              <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Subir ticket
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm ring-1 ring-gray-200 transition-all hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700"
              (click)="onInput('estado')"
            >
              <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Estado ticket
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm ring-1 ring-gray-200 transition-all hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700"
              (click)="onInput('facturaci\xF3n')"
            >
              <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
              </svg>
              Facturaci\xF3n
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
` }]
  }], null, { query: [{
    type: Input
  }], averageResponseTimeLabel: [{
    type: Input
  }], queryChange: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SupportHeaderCardComponent, { className: "SupportHeaderCardComponent", filePath: "src/app/pages/support/components/support-header-card/support-header-card.component.ts", lineNumber: 11 });
})();

// src/app/pages/support/components/recent-tickets-card/recent-tickets-card.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function RecentTicketsCardComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275element(1, "span", 17);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.uploadBusyLabel, " ");
  }
}
function RecentTicketsCardComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function RecentTicketsCardComponent_Conditional_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onNewTicket());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 19);
    \u0275\u0275element(2, "path", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Subir ticket ");
    \u0275\u0275elementEnd();
  }
}
function RecentTicketsCardComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 21);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 22);
    \u0275\u0275element(3, "path", 23);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "h3", 24);
    \u0275\u0275text(5, "No tienes tickets recientes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 25);
    \u0275\u0275text(7, "Crea tu primer ticket para comenzar a recibir soporte");
    \u0275\u0275elementEnd()();
  }
}
function RecentTicketsCardComponent_Conditional_21_For_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 29);
    \u0275\u0275element(1, "path", 45);
    \u0275\u0275elementEnd();
  }
}
function RecentTicketsCardComponent_Conditional_21_For_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 30);
    \u0275\u0275element(1, "path", 13);
    \u0275\u0275elementEnd();
  }
}
function RecentTicketsCardComponent_Conditional_21_For_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 31);
    \u0275\u0275element(1, "path", 46);
    \u0275\u0275elementEnd();
  }
}
function RecentTicketsCardComponent_Conditional_21_For_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 32);
    \u0275\u0275element(1, "path", 47);
    \u0275\u0275elementEnd();
  }
}
function RecentTicketsCardComponent_Conditional_21_For_2_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 33);
    \u0275\u0275element(1, "circle", 48);
    \u0275\u0275elementEnd();
  }
}
function RecentTicketsCardComponent_Conditional_21_For_2_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 49);
    \u0275\u0275listener("click", function RecentTicketsCardComponent_Conditional_21_For_2_Conditional_24_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ticket_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onViewTicketImage(ticket_r4));
    });
    \u0275\u0275text(1, " Ver imagen ");
    \u0275\u0275elementEnd();
  }
}
function RecentTicketsCardComponent_Conditional_21_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26)(1, "div", 27)(2, "div", 28);
    \u0275\u0275conditionalCreate(3, RecentTicketsCardComponent_Conditional_21_For_2_Case_3_Template, 2, 0, ":svg:svg", 29)(4, RecentTicketsCardComponent_Conditional_21_For_2_Case_4_Template, 2, 0, ":svg:svg", 30)(5, RecentTicketsCardComponent_Conditional_21_For_2_Case_5_Template, 2, 0, ":svg:svg", 31)(6, RecentTicketsCardComponent_Conditional_21_For_2_Case_6_Template, 2, 0, ":svg:svg", 32)(7, RecentTicketsCardComponent_Conditional_21_For_2_Case_7_Template, 2, 0, ":svg:svg", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 34)(9, "div", 35)(10, "div", 36)(11, "p", 37);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 38)(14, "span", 39);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "span", 40);
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "span", 41);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 42)(22, "button", 43);
    \u0275\u0275listener("click", function RecentTicketsCardComponent_Conditional_21_For_2_Template_button_click_22_listener() {
      const ticket_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onViewTicketDetails(ticket_r4));
    });
    \u0275\u0275text(23, " Ver informaci\xF3zn ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(24, RecentTicketsCardComponent_Conditional_21_For_2_Conditional_24_Template, 2, 0, "button", 44);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_11_0;
    const ticket_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_11_0 = ctx_r0.statusIcon(ticket_r4.status)) === "check" ? 3 : tmp_11_0 === "clock" ? 4 : tmp_11_0 === "hourglass" ? 5 : tmp_11_0 === "x" ? 6 : 7);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ticket_r4.title);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ticket_r4.number);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ticket_r4.updatedAt);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.badgeClasses(ticket_r4.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.statusLabel(ticket_r4.status), " ");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ticket_r4.hasImage ? 24 : -1);
  }
}
function RecentTicketsCardComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275repeaterCreate(1, RecentTicketsCardComponent_Conditional_21_For_2_Template, 25, 7, "div", 26, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.tickets);
  }
}
var RecentTicketsCardComponent = class _RecentTicketsCardComponent {
  tickets = [];
  isUploadBusy = false;
  uploadPhaseLabel = "Extrayendo...";
  newTicket = new EventEmitter();
  viewHistory = new EventEmitter();
  viewTicketDetails = new EventEmitter();
  viewTicketImage = new EventEmitter();
  onNewTicket() {
    this.newTicket.emit();
  }
  onViewHistory() {
    this.viewHistory.emit();
  }
  onViewTicketDetails(ticket) {
    this.viewTicketDetails.emit(ticket);
  }
  onViewTicketImage(ticket) {
    this.viewTicketImage.emit(ticket);
  }
  get uploadBusyLabel() {
    return this.uploadPhaseLabel?.trim() || "Extrayendo...";
  }
  badgeClasses(status) {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300";
      case "Processing":
        return "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300";
      case "Waiting provider":
        return "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300";
      case "Failed":
        return "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200";
    }
  }
  statusIcon(status) {
    switch (status) {
      case "Completed":
        return "check";
      case "Processing":
        return "clock";
      case "Waiting provider":
        return "hourglass";
      case "Failed":
        return "x";
      default:
        return "circle";
    }
  }
  statusLabel(status) {
    switch (status) {
      case "Completed":
        return "Completado";
      case "Processing":
        return "Procesando";
      case "Waiting provider":
        return "En espera";
      case "Failed":
        return "Fallido";
      default:
        return status;
    }
  }
  static \u0275fac = function RecentTicketsCardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RecentTicketsCardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RecentTicketsCardComponent, selectors: [["app-recent-tickets-card"]], inputs: { tickets: "tickets", isUploadBusy: "isUploadBusy", uploadPhaseLabel: "uploadPhaseLabel" }, outputs: { newTicket: "newTicket", viewHistory: "viewHistory", viewTicketDetails: "viewTicketDetails", viewTicketImage: "viewTicketImage" }, decls: 22, vars: 2, consts: [[1, "h-full", "overflow-hidden", "rounded-3xl", "border", "border-gray-200", "bg-white", "shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)]", "dark:border-gray-800", "dark:bg-white/[0.03]"], [1, "relative", "overflow-hidden", "from-brand-500/5", "via-transparent", "to-brand-500/5", "px-6", "py-5", "dark:from-brand-500/10", "dark:to-brand-500/10"], [1, "relative", "grid", "grid-cols-1", "gap-4", "md:grid-cols-[minmax(0,1fr)_auto]", "md:items-center"], [1, "flex", "items-center", "gap-2"], [1, "flex", "h-8", "w-8", "items-center", "justify-center", "rounded-lg", "bg-brand-500/10", "text-brand-500"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-4", "w-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"], [1, "text-sm", "font-medium", "text-gray-500", "dark:text-gray-400"], [1, "mt-1.5", "text-xl", "font-semibold", "text-gray-900", "dark:text-white"], [1, "flex", "flex-col", "gap-2", "sm:flex-row"], ["type", "button", "disabled", "", "aria-label", "Extrayendo", 1, "flex", "cursor-not-allowed", "items-center", "justify-center", "gap-2", "rounded-lg", "border", "border-brand-400/50", "bg-brand-500/10", "px-4", "py-2.5", "text-sm", "font-semibold", "text-brand-600", "dark:border-brand-400/30", "dark:bg-brand-500/15", "dark:text-brand-300"], ["type", "button", "aria-label", "Subir ticket", 1, "group", "flex", "items-center", "justify-center", "gap-2", "rounded-lg", "bg-gradient-to-r", "from-brand-500", "to-brand-600", "px-4", "py-2.5", "text-sm", "font-semibold", "text-white", "shadow-lg", "shadow-brand-500/25", "transition-all", "hover:from-brand-600", "hover:to-brand-700", "hover:shadow-brand-500/40"], ["type", "button", 1, "flex", "items-center", "justify-center", "gap-2", "rounded-lg", "border", "border-gray-200", "bg-white", "px-4", "py-2.5", "text-sm", "font-semibold", "text-gray-700", "transition-all", "hover:border-gray-300", "hover:bg-gray-50", "dark:border-gray-700", "dark:bg-transparent", "dark:text-gray-200", "dark:hover:border-gray-600", "dark:hover:bg-white/[0.06]", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "p-6", "pt-4"], [1, "flex", "flex-col", "items-center", "justify-center", "py-10", "text-center"], [1, "space-y-3"], [1, "inline-block", "h-4", "w-4", "animate-spin", "rounded-full", "border-2", "border-current", "border-t-transparent"], ["type", "button", "aria-label", "Subir ticket", 1, "group", "flex", "items-center", "justify-center", "gap-2", "rounded-lg", "bg-gradient-to-r", "from-brand-500", "to-brand-600", "px-4", "py-2.5", "text-sm", "font-semibold", "text-white", "shadow-lg", "shadow-brand-500/25", "transition-all", "hover:from-brand-600", "hover:to-brand-700", "hover:shadow-brand-500/40", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-4", "w-4", "transition-transform", "group-hover:rotate-90"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M12 4v16m8-8H4"], [1, "flex", "h-16", "w-16", "items-center", "justify-center", "rounded-2xl", "bg-gray-100", "dark:bg-gray-800"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "1.5", 1, "h-8", "w-8", "text-gray-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"], [1, "mt-4", "text-base", "font-semibold", "text-gray-900", "dark:text-white"], [1, "mt-1", "text-sm", "text-gray-500", "dark:text-gray-400"], [1, "rounded-2xl", "border", "border-gray-100", "bg-gray-50/50", "p-4", "transition-all", "hover:border-brand-200", "hover:bg-brand-50/50", "hover:shadow-sm", "dark:border-gray-800", "dark:bg-white/[0.02]", "dark:hover:border-brand-500/30", "dark:hover:bg-brand-500/5"], [1, "flex", "items-start", "gap-4"], [1, "relative", "flex", "h-11", "w-11", "shrink-0", "items-center", "justify-center", "rounded-xl", "bg-white", "shadow-sm", "ring-1", "ring-gray-100", "dark:bg-gray-800", "dark:ring-gray-700"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-5", "w-5", "text-emerald-500"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-5", "w-5", "animate-pulse", "text-amber-500"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-5", "w-5", "text-blue-500"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-5", "w-5", "text-red-500"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-5", "w-5", "text-gray-400"], [1, "min-w-0", "flex-1"], [1, "flex", "items-start", "justify-between", "gap-3"], [1, "min-w-0"], [1, "truncate", "text-sm", "font-semibold", "text-gray-900", "dark:text-white"], [1, "mt-1", "flex", "items-center", "gap-2", "text-xs", "text-gray-500", "dark:text-gray-400"], [1, "font-medium", "text-gray-600", "dark:text-gray-300"], [1, "h-1", "w-1", "rounded-full", "bg-gray-300", "dark:bg-gray-600"], [1, "shrink-0", "rounded-full", "px-2.5", "py-1", "text-[11px]", "font-semibold", "uppercase", "tracking-wide", 3, "ngClass"], [1, "mt-3", "flex", "flex-wrap", "gap-2"], ["type", "button", 1, "rounded-lg", "border", "border-gray-200", "px-3", "py-2", "text-xs", "font-semibold", "text-gray-700", "transition", "hover:border-brand-300", "hover:text-brand-600", "dark:border-gray-700", "dark:text-gray-200", "dark:hover:border-brand-500/40", "dark:hover:text-brand-300", 3, "click"], ["type", "button", 1, "rounded-lg", "border", "border-brand-200", "bg-brand-50", "px-3", "py-2", "text-xs", "font-semibold", "text-brand-700", "transition", "hover:bg-brand-100", "dark:border-brand-500/30", "dark:bg-brand-500/10", "dark:text-brand-300", "dark:hover:bg-brand-500/20"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M5 13l4 4L19 7"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"], ["cx", "12", "cy", "12", "r", "10"], ["type", "button", 1, "rounded-lg", "border", "border-brand-200", "bg-brand-50", "px-3", "py-2", "text-xs", "font-semibold", "text-brand-700", "transition", "hover:bg-brand-100", "dark:border-brand-500/30", "dark:bg-brand-500/10", "dark:text-brand-300", "dark:hover:bg-brand-500/20", 3, "click"]], template: function RecentTicketsCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div")(4, "div", 3)(5, "div", 4);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(6, "svg", 5);
      \u0275\u0275element(7, "path", 6);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(8, "p", 7);
      \u0275\u0275text(9, "Tus tickets recientes");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "h2", 8);
      \u0275\u0275text(11, "Seguimiento rapido");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 9);
      \u0275\u0275conditionalCreate(13, RecentTicketsCardComponent_Conditional_13_Template, 3, 1, "button", 10)(14, RecentTicketsCardComponent_Conditional_14_Template, 4, 0, "button", 11);
      \u0275\u0275elementStart(15, "button", 12);
      \u0275\u0275listener("click", function RecentTicketsCardComponent_Template_button_click_15_listener() {
        return ctx.onViewHistory();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(16, "svg", 5);
      \u0275\u0275element(17, "path", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275text(18, " Ver historial ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(19, "div", 14);
      \u0275\u0275conditionalCreate(20, RecentTicketsCardComponent_Conditional_20_Template, 8, 0, "div", 15)(21, RecentTicketsCardComponent_Conditional_21_Template, 3, 0, "div", 16);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(13);
      \u0275\u0275conditional(ctx.isUploadBusy ? 13 : 14);
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.tickets.length === 0 ? 20 : 21);
    }
  }, dependencies: [CommonModule, NgClass], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RecentTicketsCardComponent, [{
    type: Component,
    args: [{ selector: "app-recent-tickets-card", standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `<section class="h-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)] dark:border-gray-800 dark:bg-white/[0.03]">
  <div class="relative overflow-hidden from-brand-500/5 via-transparent to-brand-500/5 px-6 py-5 dark:from-brand-500/10 dark:to-brand-500/10">
    <div class="relative grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
      <div>
        <div class="flex items-center gap-2">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 text-brand-500">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Tus tickets recientes</p>
        </div>
        <h2 class="mt-1.5 text-xl font-semibold text-gray-900 dark:text-white">Seguimiento rapido</h2>
      </div>
      <div class="flex flex-col gap-2 sm:flex-row">
        @if (isUploadBusy) {
        <button class="flex cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-brand-400/50 bg-brand-500/10 px-4 py-2.5 text-sm font-semibold text-brand-600 dark:border-brand-400/30 dark:bg-brand-500/15 dark:text-brand-300" type="button" disabled aria-label="Extrayendo">
          <span class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
          {{ uploadBusyLabel }}
        </button>
        } @else {
        <button class="group flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:from-brand-600 hover:to-brand-700 hover:shadow-brand-500/40" type="button" (click)="onNewTicket()" aria-label="Subir ticket">
          <svg class="h-4 w-4 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Subir ticket
        </button>
        }
        <button class="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-transparent dark:text-gray-200 dark:hover:border-gray-600 dark:hover:bg-white/[0.06]" type="button" (click)="onViewHistory()">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Ver historial
        </button>
      </div>
    </div>
  </div>

  <div class="p-6 pt-4">
    @if (tickets.length === 0) {
      <div class="flex flex-col items-center justify-center py-10 text-center">
        <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
          <svg class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h3 class="mt-4 text-base font-semibold text-gray-900 dark:text-white">No tienes tickets recientes</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Crea tu primer ticket para comenzar a recibir soporte</p>
      </div>
    } @else {
      <div class="space-y-3">
        @for (ticket of tickets; track ticket.id) {
          <div class="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 transition-all hover:border-brand-200 hover:bg-brand-50/50 hover:shadow-sm dark:border-gray-800 dark:bg-white/[0.02] dark:hover:border-brand-500/30 dark:hover:bg-brand-500/5">
            <div class="flex items-start gap-4">
              <div class="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700">
                @switch (statusIcon(ticket.status)) {
                  @case ('check') {
                    <svg class="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                  }
                  @case ('clock') {
                    <svg class="h-5 w-5 animate-pulse text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  }
                  @case ('hourglass') {
                    <svg class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  }
                  @case ('x') {
                    <svg class="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  }
                  @default {
                    <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" /></svg>
                  }
                }
              </div>

              <div class="min-w-0 flex-1">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <p class="truncate text-sm font-semibold text-gray-900 dark:text-white">{{ ticket.title }}</p>
                    <div class="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span class="font-medium text-gray-600 dark:text-gray-300">{{ ticket.number }}</span>
                      <span class="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                      <span>{{ ticket.updatedAt }}</span>
                    </div>
                  </div>

                  <span class="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide" [ngClass]="badgeClasses(ticket.status)">
                    {{ statusLabel(ticket.status) }}
                  </span>
                </div>

                <div class="mt-3 flex flex-wrap gap-2">
                  <button type="button" class="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-brand-300 hover:text-brand-600 dark:border-gray-700 dark:text-gray-200 dark:hover:border-brand-500/40 dark:hover:text-brand-300" (click)="onViewTicketDetails(ticket)">
                    Ver informaci\xF3zn
                  </button>
                  @if (ticket.hasImage) {
                  <button type="button" class="rounded-lg border border-brand-200 bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700 transition hover:bg-brand-100 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300 dark:hover:bg-brand-500/20" (click)="onViewTicketImage(ticket)">
                    Ver imagen
                  </button>
                  }
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    }
  </div>
</section>
` }]
  }], null, { tickets: [{
    type: Input
  }], isUploadBusy: [{
    type: Input
  }], uploadPhaseLabel: [{
    type: Input
  }], newTicket: [{
    type: Output
  }], viewHistory: [{
    type: Output
  }], viewTicketDetails: [{
    type: Output
  }], viewTicketImage: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RecentTicketsCardComponent, { className: "RecentTicketsCardComponent", filePath: "src/app/pages/support/components/recent-tickets-card/recent-tickets-card.component.ts", lineNumber: 12 });
})();

// src/app/pages/support/components/quick-actions-card/quick-actions-card.component.ts
var _forTrack02 = ($index, $item) => $item.id;
function QuickActionsCardComponent_For_11_Case_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 19);
  }
}
function QuickActionsCardComponent_For_11_Case_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 12);
    \u0275\u0275element(1, "path", 20);
    \u0275\u0275elementEnd();
  }
}
function QuickActionsCardComponent_For_11_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, QuickActionsCardComponent_For_11_Case_3_Conditional_0_Template, 1, 0, "span", 19)(1, QuickActionsCardComponent_For_11_Case_3_Conditional_1_Template, 2, 0, ":svg:svg", 12);
  }
  if (rf & 2) {
    const action_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.isUploadAction(action_r2) && ctx_r2.isUploadBusy ? 0 : 1);
  }
}
function QuickActionsCardComponent_For_11_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 12);
    \u0275\u0275element(1, "path", 21);
    \u0275\u0275elementEnd();
  }
}
function QuickActionsCardComponent_For_11_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 12);
    \u0275\u0275element(1, "path", 22);
    \u0275\u0275elementEnd();
  }
}
function QuickActionsCardComponent_For_11_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 12);
    \u0275\u0275element(1, "path", 4);
    \u0275\u0275elementEnd();
  }
}
function QuickActionsCardComponent_For_11_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.uploadBusyLabel, " ");
  }
}
function QuickActionsCardComponent_For_11_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Subir ticket ");
  }
}
function QuickActionsCardComponent_For_11_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const action_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", action_r2.title, " ");
  }
}
function QuickActionsCardComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function QuickActionsCardComponent_For_11_Template_button_click_0_listener() {
      const action_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onActionClick(action_r2));
    });
    \u0275\u0275elementStart(1, "div", 10)(2, "div", 11);
    \u0275\u0275conditionalCreate(3, QuickActionsCardComponent_For_11_Case_3_Template, 2, 1)(4, QuickActionsCardComponent_For_11_Case_4_Template, 2, 0, ":svg:svg", 12)(5, QuickActionsCardComponent_For_11_Case_5_Template, 2, 0, ":svg:svg", 12)(6, QuickActionsCardComponent_For_11_Case_6_Template, 2, 0, ":svg:svg", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 13)(8, "p", 14);
    \u0275\u0275conditionalCreate(9, QuickActionsCardComponent_For_11_Conditional_9_Template, 1, 1)(10, QuickActionsCardComponent_For_11_Conditional_10_Template, 1, 0)(11, QuickActionsCardComponent_For_11_Conditional_11_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 15);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 16);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(15, "svg", 17);
    \u0275\u0275element(16, "path", 18);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_14_0;
    const action_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r2.isUploadAction(action_r2) && ctx_r2.isUploadBusy ? "cursor-not-allowed border-brand-300/40 bg-brand-500/5" : ctx_r2.getHoverColor(action_r2.icon))("disabled", ctx_r2.isUploadAction(action_r2) && ctx_r2.isUploadBusy);
    \u0275\u0275attribute("aria-label", ctx_r2.isUploadAction(action_r2) ? "Subir ticket" : action_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r2.getIconColor(action_r2.icon));
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_14_0 = action_r2.icon) === "upload" ? 3 : tmp_14_0 === "retry" ? 4 : tmp_14_0 === "download" ? 5 : 6);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r2.isUploadAction(action_r2) && ctx_r2.isUploadBusy ? 9 : ctx_r2.isUploadAction(action_r2) ? 10 : 11);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(action_r2.description);
  }
}
var QuickActionsCardComponent = class _QuickActionsCardComponent {
  actions = [];
  isUploadBusy = false;
  uploadPhaseLabel = "Extrayendo...";
  actionClick = new EventEmitter();
  onActionClick(action) {
    if (this.isUploadBusy && this.isUploadAction(action)) {
      return;
    }
    this.actionClick.emit(action);
  }
  isUploadAction(action) {
    return action.id === "qa-new" || action.icon === "upload";
  }
  get uploadBusyLabel() {
    return this.uploadPhaseLabel?.trim() || "Extrayendo...";
  }
  getIconColor(icon) {
    switch (icon) {
      case "upload":
        return "from-brand-500 to-brand-600 text-white";
      case "retry":
        return "from-amber-500 to-orange-500 text-white";
      case "download":
        return "from-emerald-500 to-teal-500 text-white";
      default:
        return "from-gray-500 to-gray-600 text-white";
    }
  }
  getHoverColor(icon) {
    switch (icon) {
      case "upload":
        return "hover:border-brand-200 hover:bg-brand-50/50 dark:hover:border-brand-500/30 dark:hover:bg-brand-500/5";
      case "retry":
        return "hover:border-amber-200 hover:bg-amber-50/50 dark:hover:border-amber-500/30 dark:hover:bg-amber-500/5";
      case "download":
        return "hover:border-emerald-200 hover:bg-emerald-50/50 dark:hover:border-emerald-500/30 dark:hover:bg-emerald-500/5";
      default:
        return "hover:border-gray-300 hover:bg-gray-100/50 dark:hover:border-gray-600 dark:hover:bg-gray-500/5";
    }
  }
  static \u0275fac = function QuickActionsCardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _QuickActionsCardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _QuickActionsCardComponent, selectors: [["app-quick-actions-card"]], inputs: { actions: "actions", isUploadBusy: "isUploadBusy", uploadPhaseLabel: "uploadPhaseLabel" }, outputs: { actionClick: "actionClick" }, decls: 12, vars: 0, consts: [[1, "h-full", "rounded-3xl", "border", "border-gray-200", "bg-white", "p-6", "shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)]", "dark:border-gray-800", "dark:bg-white/[0.03]"], [1, "flex", "items-center", "gap-2", "mb-1"], [1, "flex", "h-8", "w-8", "items-center", "justify-center", "rounded-lg", "bg-gradient-to-br", "from-brand-500/10", "to-brand-600/10"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-4", "w-4", "text-brand-500"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M13 10V3L4 14h7v7l9-11h-7z"], [1, "text-sm", "font-medium", "text-gray-500", "dark:text-gray-400"], [1, "text-xl", "font-semibold", "text-gray-900", "dark:text-white"], [1, "mt-5", "grid", "grid-cols-1", "gap-3"], ["type", "button", 1, "group", "w-full", "rounded-2xl", "border", "border-gray-100", "bg-gray-50/50", "p-4", "text-left", "transition-all", "dark:border-gray-800", "dark:bg-white/[0.02]", 3, "ngClass", "disabled"], ["type", "button", 1, "group", "w-full", "rounded-2xl", "border", "border-gray-100", "bg-gray-50/50", "p-4", "text-left", "transition-all", "dark:border-gray-800", "dark:bg-white/[0.02]", 3, "click", "ngClass", "disabled"], [1, "flex", "items-start", "gap-4"], [1, "flex", "h-11", "w-11", "shrink-0", "items-center", "justify-center", "rounded-xl", "bg-gradient-to-br", "shadow-lg", "transition-transform", "group-hover:scale-105", 3, "ngClass"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-5", "w-5"], [1, "min-w-0", "flex-1"], [1, "text-sm", "font-semibold", "text-gray-900", "dark:text-white"], [1, "mt-1", "text-xs", "text-gray-500", "dark:text-gray-400", "line-clamp-2"], [1, "flex", "h-11", "items-center"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-4", "w-4", "text-gray-300", "transition-all", "group-hover:translate-x-1", "group-hover:text-gray-500", "dark:text-gray-600", "dark:group-hover:text-gray-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M9 5l7 7-7 7"], [1, "inline-block", "h-5", "w-5", "animate-spin", "rounded-full", "border-2", "border-current", "border-t-transparent"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"]], template: function QuickActionsCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(3, "svg", 3);
      \u0275\u0275element(4, "path", 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(5, "p", 5);
      \u0275\u0275text(6, "Acciones r\xE1pidas");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "h3", 6);
      \u0275\u0275text(8, "Optimiza tu flujo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 7);
      \u0275\u0275repeaterCreate(10, QuickActionsCardComponent_For_11_Template, 17, 7, "button", 8, _forTrack02);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275repeater(ctx.actions);
    }
  }, dependencies: [CommonModule, NgClass], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuickActionsCardComponent, [{
    type: Component,
    args: [{ selector: "app-quick-actions-card", standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `<section class="h-full rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)] dark:border-gray-800 dark:bg-white/[0.03]">
  <div class="flex items-center gap-2 mb-1">
    <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500/10 to-brand-600/10">
      <svg class="h-4 w-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Acciones r\xE1pidas</p>
  </div>
  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Optimiza tu flujo</h3>

  <div class="mt-5 grid grid-cols-1 gap-3">
    @for (action of actions; track action.id) {
      <button
        class="group w-full rounded-2xl border border-gray-100 bg-gray-50/50 p-4 text-left transition-all dark:border-gray-800 dark:bg-white/[0.02]"
        [ngClass]="isUploadAction(action) && isUploadBusy
          ? 'cursor-not-allowed border-brand-300/40 bg-brand-500/5'
          : getHoverColor(action.icon)"
        type="button"
        (click)="onActionClick(action)"
        [disabled]="isUploadAction(action) && isUploadBusy"
        [attr.aria-label]="isUploadAction(action) ? 'Subir ticket' : action.title"
      >
        <div class="flex items-start gap-4">
          <!-- Icon -->
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg transition-transform group-hover:scale-105"
            [ngClass]="getIconColor(action.icon)"
          >
            @switch (action.icon) {
              @case ('upload') {
                @if (isUploadAction(action) && isUploadBusy) {
                <span class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                } @else {
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                }
              }
              @case ('retry') {
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              }
              @case ('download') {
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              }
              @default {
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            }
          </div>

          <!-- Content -->
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">
              @if (isUploadAction(action) && isUploadBusy) {
              {{ uploadBusyLabel }}
              } @else if (isUploadAction(action)) {
              Subir ticket
              } @else {
              {{ action.title }}
              }
            </p>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{{ action.description }}</p>
          </div>

          <!-- Arrow -->
          <div class="flex h-11 items-center">
            <svg class="h-4 w-4 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-gray-500 dark:text-gray-600 dark:group-hover:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </button>
    }
  </div>
</section>
` }]
  }], null, { actions: [{
    type: Input
  }], isUploadBusy: [{
    type: Input
  }], uploadPhaseLabel: [{
    type: Input
  }], actionClick: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(QuickActionsCardComponent, { className: "QuickActionsCardComponent", filePath: "src/app/pages/support/components/quick-actions-card/quick-actions-card.component.ts", lineNumber: 12 });
})();

// src/app/pages/support/components/guides-card/guides-card.component.ts
var _forTrack03 = ($index, $item) => $item.id;
function GuidesCardComponent_For_11_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 12);
    \u0275\u0275element(1, "path", 19);
    \u0275\u0275elementEnd();
  }
}
function GuidesCardComponent_For_11_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 12);
    \u0275\u0275element(1, "path", 20);
    \u0275\u0275elementEnd();
  }
}
function GuidesCardComponent_For_11_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 12);
    \u0275\u0275element(1, "path", 21);
    \u0275\u0275elementEnd();
  }
}
function GuidesCardComponent_For_11_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 12);
    \u0275\u0275element(1, "path", 22);
    \u0275\u0275elementEnd();
  }
}
function GuidesCardComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function GuidesCardComponent_For_11_Template_button_click_0_listener() {
      const guide_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onGuideClick(guide_r2));
    });
    \u0275\u0275elementStart(1, "div", 10)(2, "div", 11);
    \u0275\u0275conditionalCreate(3, GuidesCardComponent_For_11_Case_3_Template, 2, 0, ":svg:svg", 12)(4, GuidesCardComponent_For_11_Case_4_Template, 2, 0, ":svg:svg", 12)(5, GuidesCardComponent_For_11_Case_5_Template, 2, 0, ":svg:svg", 12)(6, GuidesCardComponent_For_11_Case_6_Template, 2, 0, ":svg:svg", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 13)(8, "p", 14);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 15);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 16);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(13, "svg", 17);
    \u0275\u0275element(14, "path", 18);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_11_0;
    const guide_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r2.getIconColor(guide_r2.icon));
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_11_0 = guide_r2.icon) === "check" ? 3 : tmp_11_0 === "status" ? 4 : tmp_11_0 === "alert" ? 5 : 6);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(guide_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(guide_r2.description);
  }
}
var GuidesCardComponent = class _GuidesCardComponent {
  guides = [];
  guideClick = new EventEmitter();
  onGuideClick(guide) {
    this.guideClick.emit(guide);
  }
  getIconColor(icon) {
    switch (icon) {
      case "check":
        return "from-emerald-500 to-teal-500";
      case "status":
        return "from-blue-500 to-cyan-500";
      case "alert":
        return "from-rose-500 to-pink-500";
      default:
        return "from-brand-500 to-brand-600";
    }
  }
  static \u0275fac = function GuidesCardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GuidesCardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GuidesCardComponent, selectors: [["app-guides-card"]], inputs: { guides: "guides" }, outputs: { guideClick: "guideClick" }, decls: 12, vars: 0, consts: [[1, "h-full", "rounded-3xl", "border", "border-gray-200", "bg-white", "p-6", "shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)]", "dark:border-gray-800", "dark:bg-white/[0.03]"], [1, "flex", "items-center", "gap-2", "mb-1"], [1, "flex", "h-8", "w-8", "items-center", "justify-center", "rounded-lg", "bg-gradient-to-br", "from-emerald-500/10", "to-teal-500/10"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-4", "w-4", "text-emerald-500"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"], [1, "text-sm", "font-medium", "text-gray-500", "dark:text-gray-400"], [1, "text-xl", "font-semibold", "text-gray-900", "dark:text-white"], [1, "mt-5", "grid", "grid-cols-1", "gap-3"], ["type", "button", 1, "group", "w-full", "rounded-2xl", "border", "border-gray-100", "bg-gray-50/50", "p-4", "text-left", "transition-all", "hover:border-gray-200", "hover:bg-white", "hover:shadow-sm", "dark:border-gray-800", "dark:bg-white/[0.02]", "dark:hover:border-gray-700", "dark:hover:bg-white/[0.04]"], ["type", "button", 1, "group", "w-full", "rounded-2xl", "border", "border-gray-100", "bg-gray-50/50", "p-4", "text-left", "transition-all", "hover:border-gray-200", "hover:bg-white", "hover:shadow-sm", "dark:border-gray-800", "dark:bg-white/[0.02]", "dark:hover:border-gray-700", "dark:hover:bg-white/[0.04]", 3, "click"], [1, "flex", "items-start", "gap-4"], [1, "flex", "h-11", "w-11", "shrink-0", "items-center", "justify-center", "rounded-xl", "bg-gradient-to-br", "text-white", "shadow-lg", "transition-transform", "group-hover:scale-105", 3, "ngClass"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-5", "w-5"], [1, "min-w-0", "flex-1"], [1, "text-sm", "font-semibold", "text-gray-900", "dark:text-white"], [1, "mt-1", "text-xs", "text-gray-500", "dark:text-gray-400", "line-clamp-2"], [1, "flex", "h-11", "items-center"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-4", "w-4", "text-gray-300", "transition-all", "group-hover:translate-x-1", "group-hover:text-gray-500", "dark:text-gray-600", "dark:group-hover:text-gray-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M9 5l7 7-7 7"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"]], template: function GuidesCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(3, "svg", 3);
      \u0275\u0275element(4, "path", 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(5, "p", 5);
      \u0275\u0275text(6, "Gu\xEDas y recursos");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "h3", 6);
      \u0275\u0275text(8, "Documentaci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 7);
      \u0275\u0275repeaterCreate(10, GuidesCardComponent_For_11_Template, 15, 4, "button", 8, _forTrack03);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275repeater(ctx.guides);
    }
  }, dependencies: [CommonModule, NgClass], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GuidesCardComponent, [{
    type: Component,
    args: [{ selector: "app-guides-card", standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `<section class="h-full rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)] dark:border-gray-800 dark:bg-white/[0.03]">
  <div class="flex items-center gap-2 mb-1">
    <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
      <svg class="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    </div>
    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Gu\xEDas y recursos</p>
  </div>
  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Documentaci\xF3n</h3>

  <div class="mt-5 grid grid-cols-1 gap-3">
    @for (guide of guides; track guide.id) {
      <button
        type="button"
        (click)="onGuideClick(guide)"
        class="group w-full rounded-2xl border border-gray-100 bg-gray-50/50 p-4 text-left transition-all hover:border-gray-200 hover:bg-white hover:shadow-sm dark:border-gray-800 dark:bg-white/[0.02] dark:hover:border-gray-700 dark:hover:bg-white/[0.04]"
      >
        <div class="flex items-start gap-4">
          <!-- Icon -->
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg transition-transform group-hover:scale-105"
            [ngClass]="getIconColor(guide.icon)"
          >
            @switch (guide.icon) {
              @case ('check') {
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              @case ('status') {
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
              @case ('alert') {
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              }
              @default {
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
            }
          </div>

          <!-- Content -->
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ guide.title }}</p>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{{ guide.description }}</p>
          </div>

          <!-- Arrow -->
          <div class="flex h-11 items-center">
            <svg class="h-4 w-4 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-gray-500 dark:text-gray-600 dark:group-hover:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </button>
    }
  </div>
</section>
` }]
  }], null, { guides: [{
    type: Input
  }], guideClick: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GuidesCardComponent, { className: "GuidesCardComponent", filePath: "src/app/pages/support/components/guides-card/guides-card.component.ts", lineNumber: 12 });
})();

// src/app/pages/support/components/faq-card/faq-card.component.ts
var _forTrack04 = ($index, $item) => $item.id;
function FaqCardComponent_For_17_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "div", 27)(2, "p", 28);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 29)(5, "span", 30);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 31);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 32);
    \u0275\u0275element(9, "path", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " \xBFNecesitas m\xE1s ayuda? ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const faq_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(faq_r2.answer);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r2.getCategoryColor(faq_r2.category));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", faq_r2.category, " ");
  }
}
function FaqCardComponent_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "button", 15);
    \u0275\u0275listener("click", function FaqCardComponent_For_17_Template_button_click_1_listener() {
      const faq_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleFaq(faq_r2.id));
    });
    \u0275\u0275elementStart(2, "div", 16)(3, "div", 17);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 18);
    \u0275\u0275element(5, "path", 5);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "div", 19)(7, "p", 20);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 21)(10, "span", 22);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 23);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(13, "svg", 24);
    \u0275\u0275element(14, "path", 25);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(15, FaqCardComponent_For_17_Conditional_15_Template, 11, 3, "div", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const faq_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r2.isOpen(faq_r2.id) ? "border-brand-200 bg-brand-50/30 dark:border-brand-500/30 dark:bg-brand-500/5" : "border-gray-100 bg-gray-50/50 hover:border-gray-200 dark:border-gray-800 dark:bg-white/[0.02] dark:hover:border-gray-700");
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-expanded", ctx_r2.isOpen(faq_r2.id));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(faq_r2.question);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r2.getCategoryColor(faq_r2.category));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", faq_r2.category, " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-180", ctx_r2.isOpen(faq_r2.id))("bg-brand-100", ctx_r2.isOpen(faq_r2.id))("dark:bg-brand-500/20", ctx_r2.isOpen(faq_r2.id));
    \u0275\u0275advance();
    \u0275\u0275classProp("text-brand-500", ctx_r2.isOpen(faq_r2.id))("text-gray-500", !ctx_r2.isOpen(faq_r2.id));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.isOpen(faq_r2.id) ? 15 : -1);
  }
}
function FaqCardComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 33);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 34);
    \u0275\u0275element(3, "path", 10);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "p", 35);
    \u0275\u0275text(5, "No se encontraron resultados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 36);
    \u0275\u0275text(7, "Intenta con otros t\xE9rminos de b\xFAsqueda");
    \u0275\u0275elementEnd()();
  }
}
var FaqCardComponent = class _FaqCardComponent {
  faqs = [];
  query = "";
  openIds = signal(/* @__PURE__ */ new Set(), ...ngDevMode ? [{ debugName: "openIds" }] : []);
  get filteredFaqs() {
    const query = this.query.trim().toLowerCase();
    if (!query)
      return this.faqs;
    return this.faqs.filter((faq) => `${faq.question} ${faq.answer} ${faq.category}`.toLowerCase().includes(query));
  }
  onQueryChange(value) {
    this.query = value;
  }
  toggleFaq(id) {
    const currentIds = new Set(this.openIds());
    if (currentIds.has(id)) {
      currentIds.delete(id);
    } else {
      currentIds.add(id);
    }
    this.openIds.set(currentIds);
  }
  isOpen(id) {
    return this.openIds().has(id);
  }
  getCategoryColor(category) {
    switch (category.toLowerCase()) {
      case "estado":
        return "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300";
      case "subidas":
        return "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300";
      case "acciones":
        return "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300";
      case "pagos":
        return "bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-300";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
    }
  }
  static \u0275fac = function FaqCardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FaqCardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FaqCardComponent, selectors: [["app-faq-card"]], inputs: { faqs: "faqs" }, decls: 19, vars: 2, consts: [[1, "h-full", "rounded-3xl", "border", "border-gray-200", "bg-white", "p-6", "shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)]", "dark:border-gray-800", "dark:bg-white/[0.03]"], [1, "grid", "grid-cols-1", "gap-4", "md:grid-cols-[minmax(0,1fr)_200px]", "md:items-center"], [1, "flex", "items-center", "gap-2", "mb-1"], [1, "flex", "h-8", "w-8", "items-center", "justify-center", "rounded-lg", "bg-gradient-to-br", "from-blue-500/10", "to-cyan-500/10"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-4", "w-4", "text-blue-500"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "text-sm", "font-medium", "text-gray-500", "dark:text-gray-400"], [1, "text-xl", "font-semibold", "text-gray-900", "dark:text-white"], [1, "relative"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "absolute", "left-3", "top-1/2", "h-4", "w-4", "-translate-y-1/2", "text-gray-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"], ["type", "search", "placeholder", "Buscar pregunta...", "aria-label", "Buscar preguntas frecuentes", 1, "w-full", "rounded-xl", "border", "border-gray-200", "bg-gray-50", "py-2.5", "pl-10", "pr-4", "text-sm", "text-gray-700", "outline-none", "transition-all", "focus:border-brand-500", "focus:bg-white", "focus:ring-2", "focus:ring-brand-500/20", "dark:border-gray-700", "dark:bg-white/[0.04]", "dark:text-white", "dark:focus:bg-white/[0.08]", 3, "input", "value"], [1, "mt-5", "space-y-3"], [1, "overflow-hidden", "rounded-2xl", "border", "transition-all", 3, "ngClass"], [1, "flex", "flex-col", "items-center", "justify-center", "py-10", "text-center"], ["type", "button", 1, "flex", "w-full", "items-center", "justify-between", "gap-4", "p-4", "text-left", 3, "click"], [1, "flex", "items-start", "gap-3", "min-w-0", "flex-1"], [1, "flex", "h-8", "w-8", "shrink-0", "items-center", "justify-center", "rounded-lg", "bg-white", "shadow-sm", "ring-1", "ring-gray-100", "dark:bg-gray-800", "dark:ring-gray-700"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-4", "w-4", "text-brand-500"], [1, "min-w-0", "flex-1"], [1, "text-sm", "font-semibold", "text-gray-900", "dark:text-white"], [1, "flex", "items-center", "gap-3", "shrink-0"], [1, "hidden", "sm:inline-flex", "rounded-full", "px-2.5", "py-0.5", "text-[11px]", "font-semibold", 3, "ngClass"], [1, "flex", "h-7", "w-7", "items-center", "justify-center", "rounded-full", "bg-gray-100", "transition-all", "dark:bg-gray-800"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-4", "w-4", "transition-colors"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M19 9l-7 7-7-7"], [1, "border-t", "border-gray-100", "px-4", "pb-4", "pt-3", "dark:border-gray-800"], [1, "ml-11"], [1, "text-sm", "leading-relaxed", "text-gray-600", "dark:text-gray-300"], [1, "mt-3", "flex", "items-center", "gap-2"], [1, "inline-flex", "sm:hidden", "rounded-full", "px-2.5", "py-0.5", "text-[11px]", "font-semibold", 3, "ngClass"], ["type", "button", 1, "inline-flex", "items-center", "gap-1.5", "text-xs", "font-medium", "text-brand-500", "hover:text-brand-600", "dark:text-brand-400", "dark:hover:text-brand-300"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-3.5", "w-3.5"], [1, "flex", "h-12", "w-12", "items-center", "justify-center", "rounded-xl", "bg-gray-100", "dark:bg-gray-800"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "1.5", 1, "h-6", "w-6", "text-gray-400"], [1, "mt-3", "text-sm", "font-medium", "text-gray-900", "dark:text-white"], [1, "mt-1", "text-xs", "text-gray-500", "dark:text-gray-400"]], template: function FaqCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div")(3, "div", 2)(4, "div", 3);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(5, "svg", 4);
      \u0275\u0275element(6, "path", 5);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(7, "p", 6);
      \u0275\u0275text(8, "Preguntas frecuentes");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "h3", 7);
      \u0275\u0275text(10, "Respuestas r\xE1pidas");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 8);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(12, "svg", 9);
      \u0275\u0275element(13, "path", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(14, "input", 11);
      \u0275\u0275listener("input", function FaqCardComponent_Template_input_input_14_listener($event) {
        return ctx.onQueryChange($event.target.value);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(15, "div", 12);
      \u0275\u0275repeaterCreate(16, FaqCardComponent_For_17_Template, 16, 16, "div", 13, _forTrack04);
      \u0275\u0275conditionalCreate(18, FaqCardComponent_Conditional_18_Template, 8, 0, "div", 14);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(14);
      \u0275\u0275property("value", ctx.query);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.filteredFaqs);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.filteredFaqs.length === 0 ? 18 : -1);
    }
  }, dependencies: [CommonModule, NgClass], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FaqCardComponent, [{
    type: Component,
    args: [{ selector: "app-faq-card", standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `<section class="h-full rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)] dark:border-gray-800 dark:bg-white/[0.03]">
  <!-- Header -->
  <div class="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_200px] md:items-center">
    <div>
      <div class="flex items-center gap-2 mb-1">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
          <svg class="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Preguntas frecuentes</p>
      </div>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Respuestas r\xE1pidas</h3>
    </div>
    <div class="relative">
      <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        class="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition-all focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.08]"
        type="search"
        placeholder="Buscar pregunta..."
        [value]="query"
        (input)="onQueryChange($any($event.target).value)"
        aria-label="Buscar preguntas frecuentes"
      />
    </div>
  </div>

  <!-- FAQ List -->
  <div class="mt-5 space-y-3">
    @for (faq of filteredFaqs; track faq.id) {
      <div
        class="overflow-hidden rounded-2xl border transition-all"
        [ngClass]="isOpen(faq.id)
          ? 'border-brand-200 bg-brand-50/30 dark:border-brand-500/30 dark:bg-brand-500/5'
          : 'border-gray-100 bg-gray-50/50 hover:border-gray-200 dark:border-gray-800 dark:bg-white/[0.02] dark:hover:border-gray-700'"
      >
        <button
          class="flex w-full items-center justify-between gap-4 p-4 text-left"
          type="button"
          [attr.aria-expanded]="isOpen(faq.id)"
          (click)="toggleFaq(faq.id)"
        >
          <div class="flex items-start gap-3 min-w-0 flex-1">
            <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700">
              <svg class="h-4 w-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ faq.question }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3 shrink-0">
            <span
              class="hidden sm:inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
              [ngClass]="getCategoryColor(faq.category)"
            >
              {{ faq.category }}
            </span>
            <div
              class="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 transition-all dark:bg-gray-800"
              [class.rotate-180]="isOpen(faq.id)"
              [class.bg-brand-100]="isOpen(faq.id)"
              [class.dark:bg-brand-500/20]="isOpen(faq.id)"
            >
              <svg
                class="h-4 w-4 transition-colors"
                [class.text-brand-500]="isOpen(faq.id)"
                [class.text-gray-500]="!isOpen(faq.id)"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </button>

        <!-- Answer -->
        @if (isOpen(faq.id)) {
          <div class="border-t border-gray-100 px-4 pb-4 pt-3 dark:border-gray-800">
            <div class="ml-11">
              <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{{ faq.answer }}</p>
              <div class="mt-3 flex items-center gap-2">
                <span
                  class="inline-flex sm:hidden rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                  [ngClass]="getCategoryColor(faq.category)"
                >
                  {{ faq.category }}
                </span>
                <button
                  type="button"
                  class="inline-flex items-center gap-1.5 text-xs font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300"
                >
                  <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  \xBFNecesitas m\xE1s ayuda?
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    }

    <!-- Empty State -->
    @if (filteredFaqs.length === 0) {
      <div class="flex flex-col items-center justify-center py-10 text-center">
        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
          <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p class="mt-3 text-sm font-medium text-gray-900 dark:text-white">No se encontraron resultados</p>
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Intenta con otros t\xE9rminos de b\xFAsqueda</p>
      </div>
    }
  </div>
</section>
` }]
  }], null, { faqs: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FaqCardComponent, { className: "FaqCardComponent", filePath: "src/app/pages/support/components/faq-card/faq-card.component.ts", lineNumber: 12 });
})();

// src/app/pages/support/components/legal-resources-card/legal-resources-card.component.ts
var _forTrack05 = ($index, $item) => $item.id;
function LegalResourcesCardComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 15);
    \u0275\u0275domListener("click", function LegalResourcesCardComponent_For_11_Template_button_click_0_listener() {
      const resource_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openResourceModal(resource_r2));
    });
    \u0275\u0275domElementStart(1, "div", 16)(2, "div", 17);
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(3, "svg", 18);
    \u0275\u0275domElement(4, "path", 4);
    \u0275\u0275domElementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275domElementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(7, "svg", 19);
    \u0275\u0275domElement(8, "path", 20);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const resource_r2 = ctx.$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(resource_r2.title);
  }
}
function LegalResourcesCardComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 21);
    \u0275\u0275domListener("click", function LegalResourcesCardComponent_Conditional_19_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeResourceModal());
    });
    \u0275\u0275domElementStart(1, "div", 22);
    \u0275\u0275domListener("click", function LegalResourcesCardComponent_Conditional_19_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r4);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275domElementStart(2, "div", 23)(3, "h3", 24);
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "button", 25);
    \u0275\u0275domListener("click", function LegalResourcesCardComponent_Conditional_19_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeResourceModal());
    });
    \u0275\u0275text(6, " Cerrar ");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(7, "p", 26);
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "div", 27)(10, "button", 28);
    \u0275\u0275domListener("click", function LegalResourcesCardComponent_Conditional_19_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeResourceModal());
    });
    \u0275\u0275text(11, " Entendido ");
    \u0275\u0275domElementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedResource.title, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r2.sampleText, " ");
  }
}
var LegalResourcesCardComponent = class _LegalResourcesCardComponent {
  resources = [];
  selectedResource = null;
  openResourceModal(resource) {
    this.selectedResource = resource;
  }
  closeResourceModal() {
    this.selectedResource = null;
  }
  get sampleText() {
    if (!this.selectedResource)
      return "";
    return `Este es un texto de ejemplo para "${this.selectedResource.title}". Puedes reemplazarlo por el contenido legal real cuando est\xE9 disponible.`;
  }
  static \u0275fac = function LegalResourcesCardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LegalResourcesCardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LegalResourcesCardComponent, selectors: [["app-legal-resources-card"]], inputs: { resources: "resources" }, decls: 20, vars: 1, consts: [[1, "h-full", "rounded-3xl", "border", "border-gray-200", "bg-white", "p-6", "shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)]", "dark:border-gray-800", "dark:bg-white/[0.03]"], [1, "flex", "items-center", "gap-2", "mb-1"], [1, "flex", "h-8", "w-8", "items-center", "justify-center", "rounded-lg", "bg-gradient-to-br", "from-slate-500/10", "to-gray-500/10"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-4", "w-4", "text-slate-500"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"], [1, "text-sm", "font-medium", "text-gray-500", "dark:text-gray-400"], [1, "text-xl", "font-semibold", "text-gray-900", "dark:text-white"], [1, "mt-5", "grid", "grid-cols-1", "gap-2"], ["type", "button", 1, "group", "flex", "items-center", "justify-between", "gap-3", "rounded-xl", "border", "border-gray-100", "bg-gray-50/50", "px-4", "py-3", "text-sm", "font-medium", "text-gray-700", "transition-all", "hover:border-gray-200", "hover:bg-white", "dark:border-gray-800", "dark:bg-white/[0.02]", "dark:text-gray-200", "dark:hover:border-gray-700", "dark:hover:bg-white/[0.04]"], [1, "mt-5", "rounded-xl", "border", "border-dashed", "border-gray-200", "bg-gray-50/50", "p-4", "dark:border-gray-700", "dark:bg-white/[0.02]"], [1, "text-xs", "font-medium", "text-gray-600", "dark:text-gray-300"], ["href", "mailto:legal@weeklylanding.com", 1, "mt-1", "inline-flex", "items-center", "gap-1.5", "text-xs", "text-brand-500", "hover:text-brand-600", "dark:text-brand-400", "dark:hover:text-brand-300"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-3.5", "w-3.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"], [1, "fixed", "inset-0", "z-[9999]", "flex", "items-center", "justify-center", "bg-gray-900/60", "p-4"], ["type", "button", 1, "group", "flex", "items-center", "justify-between", "gap-3", "rounded-xl", "border", "border-gray-100", "bg-gray-50/50", "px-4", "py-3", "text-sm", "font-medium", "text-gray-700", "transition-all", "hover:border-gray-200", "hover:bg-white", "dark:border-gray-800", "dark:bg-white/[0.02]", "dark:text-gray-200", "dark:hover:border-gray-700", "dark:hover:bg-white/[0.04]", 3, "click"], [1, "flex", "items-center", "gap-3"], [1, "flex", "h-8", "w-8", "items-center", "justify-center", "rounded-lg", "bg-gray-100", "dark:bg-gray-800"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-4", "w-4", "text-gray-500", "dark:text-gray-400"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-4", "w-4", "text-gray-300", "transition-all", "group-hover:translate-x-1", "group-hover:text-gray-500", "dark:text-gray-600", "dark:group-hover:text-gray-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"], [1, "fixed", "inset-0", "z-[9999]", "flex", "items-center", "justify-center", "bg-gray-900/60", "p-4", 3, "click"], [1, "w-full", "max-w-lg", "rounded-2xl", "border", "border-gray-200", "bg-white", "p-6", "dark:border-gray-800", "dark:bg-gray-900", 3, "click"], [1, "mb-4", "flex", "items-center", "justify-between"], [1, "text-lg", "font-semibold", "text-gray-900", "dark:text-white"], ["type", "button", 1, "rounded-lg", "px-2", "py-1", "text-sm", "text-gray-500", "hover:bg-gray-100", "dark:hover:bg-white/10", 3, "click"], [1, "text-sm", "leading-6", "text-gray-700", "dark:text-gray-300"], [1, "mt-5", "flex", "justify-end"], ["type", "button", 1, "rounded-xl", "bg-brand-500", "px-4", "py-2", "text-sm", "font-semibold", "text-white", "hover:bg-brand-600", 3, "click"]], template: function LegalResourcesCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(3, "svg", 3);
      \u0275\u0275domElement(4, "path", 4);
      \u0275\u0275domElementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(5, "p", 5);
      \u0275\u0275text(6, "Recursos legales");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(7, "h3", 6);
      \u0275\u0275text(8, "Legal y privacidad");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(9, "div", 7);
      \u0275\u0275repeaterCreate(10, LegalResourcesCardComponent_For_11_Template, 9, 1, "button", 8, _forTrack05);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(12, "div", 9)(13, "p", 10);
      \u0275\u0275text(14, "\xBFTienes dudas sobre nuestras pol\xEDticas?");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(15, "a", 11);
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(16, "svg", 12);
      \u0275\u0275domElement(17, "path", 13);
      \u0275\u0275domElementEnd();
      \u0275\u0275text(18, " legal@weeklylanding.com ");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275conditionalCreate(19, LegalResourcesCardComponent_Conditional_19_Template, 12, 2, "div", 14);
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275repeater(ctx.resources);
      \u0275\u0275advance(9);
      \u0275\u0275conditional(ctx.selectedResource ? 19 : -1);
    }
  }, dependencies: [CommonModule], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LegalResourcesCardComponent, [{
    type: Component,
    args: [{ selector: "app-legal-resources-card", standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: '<section class="h-full rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)] dark:border-gray-800 dark:bg-white/[0.03]">\n  <div class="flex items-center gap-2 mb-1">\n    <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-slate-500/10 to-gray-500/10">\n      <svg class="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">\n        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />\n      </svg>\n    </div>\n    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Recursos legales</p>\n  </div>\n  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Legal y privacidad</h3>\n\n  <div class="mt-5 grid grid-cols-1 gap-2">\n    @for (resource of resources; track resource.id) {\n      <button\n        type="button"\n        class="group flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:border-gray-200 hover:bg-white dark:border-gray-800 dark:bg-white/[0.02] dark:text-gray-200 dark:hover:border-gray-700 dark:hover:bg-white/[0.04]"\n        (click)="openResourceModal(resource)"\n      >\n        <div class="flex items-center gap-3">\n          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">\n            <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">\n              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />\n            </svg>\n          </div>\n          <span>{{ resource.title }}</span>\n        </div>\n        <svg class="h-4 w-4 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-gray-500 dark:text-gray-600 dark:group-hover:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">\n          <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />\n        </svg>\n      </button>\n    }\n  </div>\n\n  <!-- Contact info -->\n  <div class="mt-5 rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-white/[0.02]">\n    <p class="text-xs font-medium text-gray-600 dark:text-gray-300">\xBFTienes dudas sobre nuestras pol\xEDticas?</p>\n    <a href="mailto:legal@weeklylanding.com" class="mt-1 inline-flex items-center gap-1.5 text-xs text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300">\n      <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">\n        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />\n      </svg>\n      legal&#64;weeklylanding.com\n    </a>\n  </div>\n</section>\n\n@if (selectedResource) {\n  <div\n    class="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/60 p-4"\n    (click)="closeResourceModal()"\n  >\n    <div\n      class="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"\n      (click)="$event.stopPropagation()"\n    >\n      <div class="mb-4 flex items-center justify-between">\n        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">\n          {{ selectedResource.title }}\n        </h3>\n        <button\n          type="button"\n          class="rounded-lg px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10"\n          (click)="closeResourceModal()"\n        >\n          Cerrar\n        </button>\n      </div>\n\n      <p class="text-sm leading-6 text-gray-700 dark:text-gray-300">\n        {{ sampleText }}\n      </p>\n\n      <div class="mt-5 flex justify-end">\n        <button\n          type="button"\n          class="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"\n          (click)="closeResourceModal()"\n        >\n          Entendido\n        </button>\n      </div>\n    </div>\n  </div>\n}\n' }]
  }], null, { resources: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LegalResourcesCardComponent, { className: "LegalResourcesCardComponent", filePath: "src/app/pages/support/components/legal-resources-card/legal-resources-card.component.ts", lineNumber: 12 });
})();

// src/app/pages/support/services/support-chat.service.ts
var SupportChatService = class _SupportChatService {
  openSubject = new BehaviorSubject(false);
  messagesSubject = new BehaviorSubject([]);
  open$ = this.openSubject.asObservable();
  messages$ = this.messagesSubject.asObservable();
  openChat(contextMessage) {
    this.openSubject.next(true);
    if (contextMessage) {
      const existing = this.messagesSubject.getValue();
      if (!existing.length) {
        this.addMessage("bot", contextMessage);
      }
    }
  }
  closeChat() {
    this.openSubject.next(false);
  }
  sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed)
      return;
    this.addMessage("user", trimmed);
    this.addMessage("bot", "Gracias, ya estoy revisando tu solicitud.");
  }
  addMessage(author, content) {
    const next = {
      id: `${author}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      author,
      content,
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit"
      })
    };
    this.messagesSubject.next([...this.messagesSubject.getValue(), next]);
  }
  static \u0275fac = function SupportChatService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SupportChatService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SupportChatService, factory: _SupportChatService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SupportChatService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/pages/support/components/support-chat-panel/support-chat-panel.component.ts
var _forTrack06 = ($index, $item) => $item.id;
function SupportChatPanelComponent_Conditional_0_For_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "div", 31)(2, "p", 32);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 33);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const message_r3 = ctx.$implicit;
    \u0275\u0275classProp("justify-end", message_r3.author === "user");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", message_r3.author === "user" ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-br-md" : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-bl-md");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(message_r3.content);
    \u0275\u0275advance();
    \u0275\u0275classProp("text-white/70", message_r3.author === "user")("text-gray-400", message_r3.author !== "user");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", message_r3.timestamp, " ");
  }
}
function SupportChatPanelComponent_Conditional_0_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "div", 34);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 35);
    \u0275\u0275element(3, "path", 36);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "p", 37);
    \u0275\u0275text(5, "Inicia la conversaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 38);
    \u0275\u0275text(7, "Escribe tu mensaje abajo");
    \u0275\u0275elementEnd()();
  }
}
function SupportChatPanelComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
    \u0275\u0275element(2, "div", 2);
    \u0275\u0275elementStart(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "div", 6);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 7);
    \u0275\u0275element(8, "path", 8);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "span", 9);
    \u0275\u0275element(10, "span", 10)(11, "span", 11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div")(13, "p", 12);
    \u0275\u0275text(14, "Asistente de soporte");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p", 13);
    \u0275\u0275element(16, "span", 14);
    \u0275\u0275text(17, " En l\xEDnea \xB7 Respuesta ~2 min ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "button", 15);
    \u0275\u0275listener("click", function SupportChatPanelComponent_Conditional_0_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClose());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(19, "svg", 7);
    \u0275\u0275element(20, "path", 16);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(21, "div", 17)(22, "div", 18);
    \u0275\u0275repeaterCreate(23, SupportChatPanelComponent_Conditional_0_For_24_Template, 6, 9, "div", 19, _forTrack06);
    \u0275\u0275pipe(25, "async");
    \u0275\u0275conditionalCreate(26, SupportChatPanelComponent_Conditional_0_Conditional_26_Template, 8, 0, "div", 20);
    \u0275\u0275pipe(27, "async");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 21)(29, "div", 22)(30, "button", 23);
    \u0275\u0275listener("click", function SupportChatPanelComponent_Conditional_0_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.message = "Tengo un problema con mi ticket";
      return \u0275\u0275resetView(ctx_r1.onSend());
    });
    \u0275\u0275text(31, " Problema con ticket ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "button", 23);
    \u0275\u0275listener("click", function SupportChatPanelComponent_Conditional_0_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.message = "\xBFCu\xE1nto tarda en procesarse?";
      return \u0275\u0275resetView(ctx_r1.onSend());
    });
    \u0275\u0275text(33, " Tiempo de procesamiento ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 24)(35, "form", 25);
    \u0275\u0275listener("ngSubmit", function SupportChatPanelComponent_Conditional_0_Template_form_ngSubmit_35_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSend());
    });
    \u0275\u0275elementStart(36, "div", 26)(37, "input", 27);
    \u0275\u0275twoWayListener("ngModelChange", function SupportChatPanelComponent_Conditional_0_Template_input_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.message, $event) || (ctx_r1.message = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "button", 28);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(39, "svg", 7);
    \u0275\u0275element(40, "path", 29);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(23);
    \u0275\u0275repeater(\u0275\u0275pipeBind1(25, 3, ctx_r1.messages$));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(((tmp_2_0 = \u0275\u0275pipeBind1(27, 5, ctx_r1.messages$)) == null ? null : tmp_2_0.length) === 0 ? 26 : -1);
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.message);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r1.message.trim());
  }
}
var SupportChatPanelComponent = class _SupportChatPanelComponent {
  chatService;
  open = false;
  close = new EventEmitter();
  message = "";
  messages$;
  constructor(chatService) {
    this.chatService = chatService;
    this.messages$ = this.chatService.messages$;
  }
  onSend() {
    if (!this.message.trim())
      return;
    this.chatService.sendMessage(this.message);
    this.message = "";
  }
  onClose() {
    this.close.emit();
  }
  static \u0275fac = function SupportChatPanelComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SupportChatPanelComponent)(\u0275\u0275directiveInject(SupportChatService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SupportChatPanelComponent, selectors: [["app-support-chat-panel"]], inputs: { open: "open" }, outputs: { close: "close" }, decls: 1, vars: 1, consts: [[1, "fixed", "right-0", "top-0", "z-99999", "flex", "h-full", "w-[380px]", "max-w-[90vw]", "flex-col", "bg-white", "shadow-2xl", "dark:bg-gray-900"], [1, "relative", "overflow-hidden", "border-b", "border-gray-200", "px-5", "py-4", "dark:border-gray-800"], [1, "absolute", "-right-10", "-top-10", "h-24", "w-24", "rounded-full", "bg-brand-500/10", "blur-2xl"], [1, "relative", "flex", "items-center", "justify-between"], [1, "flex", "items-center", "gap-3"], [1, "relative"], [1, "flex", "h-10", "w-10", "items-center", "justify-center", "rounded-full", "bg-gradient-to-br", "from-brand-500", "to-brand-600", "text-white", "shadow-lg", "shadow-brand-500/25"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-5", "w-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"], [1, "absolute", "-bottom-0.5", "-right-0.5", "flex", "h-3", "w-3"], [1, "absolute", "inline-flex", "h-full", "w-full", "animate-ping", "rounded-full", "bg-emerald-400", "opacity-75"], [1, "relative", "inline-flex", "h-3", "w-3", "rounded-full", "bg-emerald-500"], [1, "text-sm", "font-semibold", "text-gray-900", "dark:text-white"], [1, "flex", "items-center", "gap-1.5", "text-xs", "text-gray-500", "dark:text-gray-400"], [1, "h-1.5", "w-1.5", "rounded-full", "bg-emerald-500"], ["type", "button", "aria-label", "Cerrar chat", 1, "flex", "h-8", "w-8", "items-center", "justify-center", "rounded-full", "text-gray-400", "transition-colors", "hover:bg-gray-100", "hover:text-gray-600", "dark:hover:bg-gray-800", "dark:hover:text-gray-300", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M6 18L18 6M6 6l12 12"], [1, "flex-1", "overflow-y-auto", "px-5", "py-4"], [1, "space-y-4"], [1, "flex", 3, "justify-end"], [1, "flex", "flex-col", "items-center", "justify-center", "py-10", "text-center"], [1, "border-t", "border-gray-100", "px-5", "py-3", "dark:border-gray-800"], [1, "flex", "flex-wrap", "gap-2"], ["type", "button", 1, "rounded-full", "bg-gray-100", "px-3", "py-1.5", "text-xs", "font-medium", "text-gray-600", "transition-colors", "hover:bg-gray-200", "dark:bg-gray-800", "dark:text-gray-300", "dark:hover:bg-gray-700", 3, "click"], [1, "border-t", "border-gray-200", "px-5", "py-4", "dark:border-gray-800"], [1, "flex", "items-center", "gap-2", 3, "ngSubmit"], [1, "relative", "flex-1"], ["type", "text", "name", "message", "placeholder", "Escribe tu mensaje...", "aria-label", "Escribe tu mensaje", 1, "w-full", "rounded-xl", "border", "border-gray-200", "bg-gray-50", "py-3", "pl-4", "pr-10", "text-sm", "text-gray-700", "outline-none", "transition-all", "focus:border-brand-500", "focus:bg-white", "focus:ring-2", "focus:ring-brand-500/20", "dark:border-gray-700", "dark:bg-gray-800", "dark:text-white", "dark:focus:bg-gray-800", 3, "ngModelChange", "ngModel"], ["type", "submit", "aria-label", "Enviar mensaje", 1, "flex", "h-11", "w-11", "shrink-0", "items-center", "justify-center", "rounded-xl", "bg-gradient-to-r", "from-brand-500", "to-brand-600", "text-white", "shadow-lg", "shadow-brand-500/25", "transition-all", "hover:from-brand-600", "hover:to-brand-700", "hover:shadow-brand-500/40", "disabled:opacity-50", "disabled:shadow-none", 3, "disabled"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M12 19l9 2-9-18-9 18 9-2zm0 0v-8"], [1, "flex"], [1, "max-w-[85%]", "rounded-2xl", "px-4", "py-3", 3, "ngClass"], [1, "text-sm", "leading-relaxed"], [1, "mt-1.5", "text-[10px]"], [1, "flex", "h-14", "w-14", "items-center", "justify-center", "rounded-2xl", "bg-gray-100", "dark:bg-gray-800"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "1.5", 1, "h-7", "w-7", "text-gray-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"], [1, "mt-3", "text-sm", "font-medium", "text-gray-900", "dark:text-white"], [1, "mt-1", "text-xs", "text-gray-500", "dark:text-gray-400"]], template: function SupportChatPanelComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, SupportChatPanelComponent_Conditional_0_Template, 41, 7, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.open ? 0 : -1);
    }
  }, dependencies: [CommonModule, NgClass, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, NgForm, AsyncPipe], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SupportChatPanelComponent, [{
    type: Component,
    args: [{ selector: "app-support-chat-panel", standalone: true, imports: [CommonModule, FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `@if (open) {
  <div class="fixed right-0 top-0 z-99999 flex h-full w-[380px] max-w-[90vw] flex-col bg-white shadow-2xl dark:bg-gray-900">
    <!-- Header -->
    <div class="relative overflow-hidden border-b border-gray-200 px-5 py-4 dark:border-gray-800">
      <div class="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-brand-500/10 blur-2xl"></div>
      <div class="relative flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="relative">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/25">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <span class="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <p class="text-sm font-semibold text-gray-900 dark:text-white">Asistente de soporte</p>
            <p class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              En l\xEDnea \xB7 Respuesta ~2 min
            </p>
          </div>
        </div>
        <button
          class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          type="button"
          (click)="onClose()"
          aria-label="Cerrar chat"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Messages -->
    <div class="flex-1 overflow-y-auto px-5 py-4">
      <div class="space-y-4">
        @for (message of (messages$ | async); track message.id) {
          <div
            class="flex"
            [class.justify-end]="message.author === 'user'"
          >
            <div
              class="max-w-[85%] rounded-2xl px-4 py-3"
              [ngClass]="message.author === 'user'
                ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-br-md'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-bl-md'"
            >
              <p class="text-sm leading-relaxed">{{ message.content }}</p>
              <p
                class="mt-1.5 text-[10px]"
                [class.text-white/70]="message.author === 'user'"
                [class.text-gray-400]="message.author !== 'user'"
              >
                {{ message.timestamp }}
              </p>
            </div>
          </div>
        }

        @if ((messages$ | async)?.length === 0) {
          <div class="flex flex-col items-center justify-center py-10 text-center">
            <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
              <svg class="h-7 w-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p class="mt-3 text-sm font-medium text-gray-900 dark:text-white">Inicia la conversaci\xF3n</p>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Escribe tu mensaje abajo</p>
          </div>
        }
      </div>
    </div>

    <!-- Quick replies -->
    <div class="border-t border-gray-100 px-5 py-3 dark:border-gray-800">
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          (click)="message = 'Tengo un problema con mi ticket'; onSend()"
        >
          Problema con ticket
        </button>
        <button
          type="button"
          class="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          (click)="message = '\xBFCu\xE1nto tarda en procesarse?'; onSend()"
        >
          Tiempo de procesamiento
        </button>
      </div>
    </div>

    <!-- Input -->
    <div class="border-t border-gray-200 px-5 py-4 dark:border-gray-800">
      <form class="flex items-center gap-2" (ngSubmit)="onSend()">
        <div class="relative flex-1">
          <input
            class="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-4 pr-10 text-sm text-gray-700 outline-none transition-all focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-800"
            type="text"
            name="message"
            [(ngModel)]="message"
            placeholder="Escribe tu mensaje..."
            aria-label="Escribe tu mensaje"
          />
        </div>
        <button
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/25 transition-all hover:from-brand-600 hover:to-brand-700 hover:shadow-brand-500/40 disabled:opacity-50 disabled:shadow-none"
          type="submit"
          [disabled]="!message.trim()"
          aria-label="Enviar mensaje"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  </div>
}
` }]
  }], () => [{ type: SupportChatService }], { open: [{
    type: Input
  }], close: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SupportChatPanelComponent, { className: "SupportChatPanelComponent", filePath: "src/app/pages/support/components/support-chat-panel/support-chat-panel.component.ts", lineNumber: 15 });
})();

// src/app/pages/support/components/support-chat-fab/support-chat-fab.component.ts
function SupportChatFabComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275listener("click", function SupportChatFabComponent_Conditional_10_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeChat());
    });
    \u0275\u0275elementEnd();
  }
}
var SupportChatFabComponent = class _SupportChatFabComponent {
  chatService;
  contextMessage = "";
  open$;
  constructor(chatService) {
    this.chatService = chatService;
    this.open$ = this.chatService.open$;
  }
  openChat() {
    this.chatService.openChat(this.contextMessage);
  }
  closeChat() {
    this.chatService.closeChat();
  }
  static \u0275fac = function SupportChatFabComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SupportChatFabComponent)(\u0275\u0275directiveInject(SupportChatService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SupportChatFabComponent, selectors: [["app-support-chat-fab"]], inputs: { contextMessage: "contextMessage" }, decls: 14, vars: 6, consts: [[1, "fixed", "bottom-6", "right-6", "z-50"], ["type", "button", "aria-label", "Abrir chat de soporte", 1, "group", "relative", "flex", "h-14", "w-14", "items-center", "justify-center", "rounded-full", "bg-gradient-to-r", "from-brand-500", "to-brand-600", "text-white", "shadow-lg", "shadow-brand-500/30", "transition-all", "hover:scale-105", "hover:shadow-xl", "hover:shadow-brand-500/40", "focus:outline-none", "focus:ring-4", "focus:ring-brand-500/30", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-6", "w-6"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"], [1, "absolute", "-right-1", "-top-1", "flex", "h-4", "w-4"], [1, "absolute", "inline-flex", "h-full", "w-full", "animate-ping", "rounded-full", "bg-emerald-400", "opacity-75"], [1, "relative", "inline-flex", "h-4", "w-4", "rounded-full", "bg-emerald-500", "ring-2", "ring-white", "dark:ring-gray-900"], [1, "pointer-events-none", "absolute", "bottom-full", "right-0", "mb-2", "whitespace-nowrap", "rounded-lg", "bg-gray-900", "px-3", "py-1.5", "text-xs", "font-medium", "text-white", "opacity-0", "shadow-lg", "transition-opacity", "group-hover:opacity-100", "dark:bg-gray-700"], [1, "absolute", "-bottom-1", "right-4", "h-2", "w-2", "rotate-45", "bg-gray-900", "dark:bg-gray-700"], ["aria-hidden", "true", 1, "fixed", "inset-0", "z-99999", "bg-black/30", "backdrop-blur-sm", "transition-opacity"], [3, "close", "open"], ["aria-hidden", "true", 1, "fixed", "inset-0", "z-99999", "bg-black/30", "backdrop-blur-sm", "transition-opacity", 3, "click"]], template: function SupportChatFabComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "button", 1);
      \u0275\u0275listener("click", function SupportChatFabComponent_Template_button_click_1_listener() {
        return ctx.openChat();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(2, "svg", 2);
      \u0275\u0275element(3, "path", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(4, "span", 4);
      \u0275\u0275element(5, "span", 5)(6, "span", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "span", 7);
      \u0275\u0275text(8, " \xBFNecesitas ayuda? ");
      \u0275\u0275element(9, "span", 8);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(10, SupportChatFabComponent_Conditional_10_Template, 1, 0, "div", 9);
      \u0275\u0275pipe(11, "async");
      \u0275\u0275elementStart(12, "app-support-chat-panel", 10);
      \u0275\u0275pipe(13, "async");
      \u0275\u0275listener("close", function SupportChatFabComponent_Template_app_support_chat_panel_close_12_listener() {
        return ctx.closeChat();
      });
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275conditional(\u0275\u0275pipeBind1(11, 2, ctx.open$) ? 10 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("open", \u0275\u0275pipeBind1(13, 4, ctx.open$) ?? false);
    }
  }, dependencies: [CommonModule, SupportChatPanelComponent, AsyncPipe], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SupportChatFabComponent, [{
    type: Component,
    args: [{ selector: "app-support-chat-fab", standalone: true, imports: [CommonModule, SupportChatPanelComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: '<!-- FAB Button -->\n<div class="fixed bottom-6 right-6 z-50">\n  <button\n    class="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-brand-500/40 focus:outline-none focus:ring-4 focus:ring-brand-500/30"\n    type="button"\n    (click)="openChat()"\n    aria-label="Abrir chat de soporte"\n  >\n    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">\n      <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />\n    </svg>\n\n    <!-- Pulse effect -->\n    <span class="absolute -right-1 -top-1 flex h-4 w-4">\n      <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>\n      <span class="relative inline-flex h-4 w-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-gray-900"></span>\n    </span>\n\n    <!-- Tooltip -->\n    <span class="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-gray-700">\n      \xBFNecesitas ayuda?\n      <span class="absolute -bottom-1 right-4 h-2 w-2 rotate-45 bg-gray-900 dark:bg-gray-700"></span>\n    </span>\n  </button>\n</div>\n\n<!-- Backdrop -->\n@if (open$ | async) {\n  <div\n    class="fixed inset-0 z-99999 bg-black/30 backdrop-blur-sm transition-opacity"\n    (click)="closeChat()"\n    aria-hidden="true"\n  ></div>\n}\n\n<!-- Chat Panel -->\n<app-support-chat-panel\n  [open]="(open$ | async) ?? false"\n  (close)="closeChat()"\n/>\n' }]
  }], () => [{ type: SupportChatService }], { contextMessage: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SupportChatFabComponent, { className: "SupportChatFabComponent", filePath: "src/app/pages/support/components/support-chat-fab/support-chat-fab.component.ts", lineNumber: 14 });
})();

// src/app/pages/support/components/new-ticket-modal/new-ticket-modal.component.ts
var _forTrack07 = ($index, $item) => $item.value;
function NewTicketModalComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.titleError);
  }
}
function NewTicketModalComponent_For_28_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 39);
    \u0275\u0275element(1, "path", 41);
    \u0275\u0275elementEnd();
  }
}
function NewTicketModalComponent_For_28_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 39);
    \u0275\u0275element(1, "path", 42)(2, "path", 43);
    \u0275\u0275elementEnd();
  }
}
function NewTicketModalComponent_For_28_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 39);
    \u0275\u0275element(1, "path", 44);
    \u0275\u0275elementEnd();
  }
}
function NewTicketModalComponent_For_28_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 39);
    \u0275\u0275element(1, "path", 45);
    \u0275\u0275elementEnd();
  }
}
function NewTicketModalComponent_For_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 38);
    \u0275\u0275listener("click", function NewTicketModalComponent_For_28_Template_button_click_0_listener() {
      let tmp_11_0;
      const cat_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView((tmp_11_0 = ctx_r0.form.get("category")) == null ? null : tmp_11_0.setValue(cat_r3.value));
    });
    \u0275\u0275conditionalCreate(1, NewTicketModalComponent_For_28_Case_1_Template, 2, 0, ":svg:svg", 39)(2, NewTicketModalComponent_For_28_Case_2_Template, 3, 0, ":svg:svg", 39)(3, NewTicketModalComponent_For_28_Case_3_Template, 2, 0, ":svg:svg", 39)(4, NewTicketModalComponent_For_28_Case_4_Template, 2, 0, ":svg:svg", 39);
    \u0275\u0275elementStart(5, "span", 40);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_10_0;
    let tmp_11_0;
    const cat_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(((tmp_10_0 = ctx_r0.form.get("category")) == null ? null : tmp_10_0.value) === cat_r3.value ? "border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400 ring-2 ring-brand-500/20" : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:bg-white/[0.04] dark:text-gray-300 dark:hover:bg-white/[0.08]");
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_11_0 = cat_r3.icon) === "receipt" ? 1 : tmp_11_0 === "wrench" ? 2 : tmp_11_0 === "user" ? 3 : 4);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(cat_r3.label);
  }
}
function NewTicketModalComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1, "Selecciona una categor\xEDa");
    \u0275\u0275elementEnd();
  }
}
function NewTicketModalComponent_For_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 46);
    \u0275\u0275listener("click", function NewTicketModalComponent_For_35_Template_button_click_0_listener() {
      let tmp_11_0;
      const pri_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView((tmp_11_0 = ctx_r0.form.get("priority")) == null ? null : tmp_11_0.setValue(pri_r5.value));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_10_0;
    const pri_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(((tmp_10_0 = ctx_r0.form.get("priority")) == null ? null : tmp_10_0.value) === pri_r5.value ? pri_r5.color + " ring-2 ring-offset-1 ring-gray-300 dark:ring-offset-gray-900" : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", pri_r5.label, " ");
  }
}
function NewTicketModalComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.descriptionError);
  }
}
function NewTicketModalComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span");
  }
}
function NewTicketModalComponent_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 47)(2, "div", 48);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 49);
    \u0275\u0275element(4, "path", 50);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "div", 51)(6, "p", 52);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 24);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "button", 53);
    \u0275\u0275listener("click", function NewTicketModalComponent_Conditional_65_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.removeFile());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(11, "svg", 39);
    \u0275\u0275element(12, "path", 54);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const image_r7 = ctx;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(image_r7.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatFileSize(image_r7.size));
  }
}
function NewTicketModalComponent_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 55);
    \u0275\u0275element(1, "circle", 56)(2, "path", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Enviando...");
    \u0275\u0275elementEnd();
  }
}
function NewTicketModalComponent_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 39);
    \u0275\u0275element(1, "path", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Crear ticket");
    \u0275\u0275elementEnd();
  }
}
var NewTicketModalComponent = class _NewTicketModalComponent {
  fb;
  isOpen = false;
  closeModal = new EventEmitter();
  submitTicket = new EventEmitter();
  form;
  selectedImage = signal(null, ...ngDevMode ? [{ debugName: "selectedImage" }] : []);
  isDragging = signal(false, ...ngDevMode ? [{ debugName: "isDragging" }] : []);
  isSubmitting = signal(false, ...ngDevMode ? [{ debugName: "isSubmitting" }] : []);
  categories = [
    { value: "facturacion", label: "Facturaci\xF3n", icon: "receipt" },
    { value: "tecnico", label: "Soporte t\xE9cnico", icon: "wrench" },
    { value: "cuenta", label: "Mi cuenta", icon: "user" },
    { value: "otro", label: "Otro", icon: "help" }
  ];
  priorities = [
    { value: "baja", label: "Baja", color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300" },
    { value: "media", label: "Media", color: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300" },
    { value: "alta", label: "Alta", color: "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300" },
    { value: "urgente", label: "Urgente", color: "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300" }
  ];
  constructor(fb) {
    this.fb = fb;
    this.form = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ["", [Validators.required, Validators.minLength(20), Validators.maxLength(2e3)]],
      category: ["", Validators.required],
      priority: ["media", Validators.required]
    });
  }
  onClose() {
    this.resetForm();
    this.closeModal.emit();
  }
  onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }
  onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }
  onDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
    const droppedFiles = event.dataTransfer?.files;
    if (droppedFiles) {
      this.addFiles(droppedFiles);
    }
  }
  onFileSelect(event) {
    const input = event.target;
    if (input.files) {
      this.addFiles(input.files);
    }
    input.value = "";
  }
  addFiles(fileList) {
    const validExtensions = [".png", ".jpg", ".jpeg", ".webp"];
    const maxSize = 10 * 1024 * 1024;
    const candidate = Array.from(fileList).find((file) => {
      const extension = "." + file.name.split(".").pop()?.toLowerCase();
      const isValidExtension = validExtensions.includes(extension);
      const isImage = file.type.startsWith("image/");
      const isValidSize = file.size <= maxSize;
      return isValidExtension && isImage && isValidSize;
    });
    if (candidate) {
      this.selectedImage.set(candidate);
    }
  }
  removeFile() {
    this.selectedImage.set(null);
  }
  formatFileSize(bytes) {
    if (bytes < 1024)
      return bytes + " B";
    if (bytes < 1024 * 1024)
      return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }
  getFileIcon(fileName) {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "png":
      case "jpg":
      case "jpeg":
      case "webp":
        return "image";
      default:
        return "file";
    }
  }
  onSubmit() {
    return __async(this, null, function* () {
      if (this.form.invalid || this.isSubmitting())
        return;
      this.isSubmitting.set(true);
      yield new Promise((resolve) => setTimeout(resolve, 1500));
      const ticketData = __spreadProps(__spreadValues({}, this.form.value), {
        image: this.selectedImage()
      });
      this.submitTicket.emit(ticketData);
      this.isSubmitting.set(false);
      this.resetForm();
      this.closeModal.emit();
    });
  }
  resetForm() {
    this.form.reset({ priority: "media" });
    this.selectedImage.set(null);
  }
  get titleError() {
    const control = this.form.get("title");
    if (control?.hasError("required"))
      return "El t\xEDtulo es requerido";
    if (control?.hasError("minlength"))
      return "M\xEDnimo 5 caracteres";
    if (control?.hasError("maxlength"))
      return "M\xE1ximo 100 caracteres";
    return "";
  }
  get descriptionError() {
    const control = this.form.get("description");
    if (control?.hasError("required"))
      return "La descripci\xF3n es requerida";
    if (control?.hasError("minlength"))
      return "M\xEDnimo 20 caracteres";
    if (control?.hasError("maxlength"))
      return "M\xE1ximo 2000 caracteres";
    return "";
  }
  static \u0275fac = function NewTicketModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NewTicketModalComponent)(\u0275\u0275directiveInject(FormBuilder));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NewTicketModalComponent, selectors: [["app-new-ticket-modal"]], inputs: { isOpen: "isOpen" }, outputs: { closeModal: "closeModal", submitTicket: "submitTicket" }, decls: 72, vars: 15, consts: [["className", "max-w-2xl mx-4 sm:mx-auto", 3, "close", "isOpen"], [1, "p-6", "sm:p-8"], [1, "mb-6"], [1, "mb-2", "flex", "items-center", "gap-3"], [1, "flex", "h-12", "w-12", "items-center", "justify-center", "rounded-2xl", "bg-gradient-to-br", "from-brand-500", "to-brand-600", "text-white", "shadow-lg", "shadow-brand-500/25"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-6", "w-6"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M12 4v16m8-8H4"], [1, "text-xl", "font-semibold", "text-gray-900", "dark:text-white"], [1, "text-sm", "text-gray-500", "dark:text-gray-400"], [1, "space-y-5", 3, "ngSubmit", "formGroup"], ["for", "title", 1, "mb-2", "block", "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300"], [1, "text-red-500"], ["id", "title", "type", "text", "formControlName", "title", "placeholder", "Ej: Error al procesar factura de enero", 1, "w-full", "rounded-xl", "border", "border-gray-200", "bg-gray-50", "px-4", "py-3", "text-sm", "text-gray-700", "outline-none", "transition-all", "focus:border-brand-500", "focus:bg-white", "focus:ring-2", "focus:ring-brand-500/20", "dark:border-gray-700", "dark:bg-white/[0.04]", "dark:text-white", "dark:focus:bg-white/[0.08]"], [1, "mt-1.5", "text-xs", "text-red-500"], [1, "grid", "grid-cols-1", "gap-4", "sm:grid-cols-2"], [1, "mb-2", "block", "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300"], [1, "grid", "grid-cols-2", "gap-2"], ["type", "button", 1, "flex", "items-center", "gap-2", "rounded-xl", "border", "px-3", "py-2.5", "text-sm", "font-medium", "transition-all", 3, "class"], [1, "flex", "flex-wrap", "gap-2"], ["type", "button", 1, "rounded-full", "px-3", "py-1.5", "text-xs", "font-semibold", "transition-all", 3, "class"], ["for", "description", 1, "mb-2", "block", "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300"], ["id", "description", "formControlName", "description", "rows", "4", "placeholder", "Describe tu problema o solicitud con el mayor detalle posible...", 1, "w-full", "resize-none", "rounded-xl", "border", "border-gray-200", "bg-gray-50", "px-4", "py-3", "text-sm", "text-gray-700", "outline-none", "transition-all", "focus:border-brand-500", "focus:bg-white", "focus:ring-2", "focus:ring-brand-500/20", "dark:border-gray-700", "dark:bg-white/[0.04]", "dark:text-white", "dark:focus:bg-white/[0.08]"], [1, "mt-1.5", "flex", "items-center", "justify-between"], [1, "text-xs", "text-red-500"], [1, "text-xs", "text-gray-400"], [1, "text-gray-400"], [1, "relative", "rounded-xl", "border-2", "border-dashed", "p-6", "text-center", "transition-all", 3, "dragover", "dragleave", "drop"], ["type", "file", "accept", "image/png,image/jpeg,image/webp", "aria-label", "Seleccionar imagen", 1, "absolute", "inset-0", "cursor-pointer", "opacity-0", 3, "change"], [1, "flex", "flex-col", "items-center", "gap-2"], [1, "flex", "h-12", "w-12", "items-center", "justify-center", "rounded-full", "bg-gray-100", "text-gray-400", "dark:bg-gray-800"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"], [1, "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300"], [1, "text-brand-500"], [1, "mt-1", "text-xs", "text-gray-400"], [1, "mt-3", "space-y-2"], [1, "flex", "flex-col-reverse", "gap-3", "border-t", "border-gray-100", "pt-5", "dark:border-gray-800", "sm:flex-row", "sm:justify-end"], ["type", "button", 1, "rounded-xl", "border", "border-gray-200", "bg-white", "px-5", "py-2.5", "text-sm", "font-semibold", "text-gray-700", "transition-colors", "hover:bg-gray-50", "dark:border-gray-700", "dark:bg-transparent", "dark:text-gray-300", "dark:hover:bg-white/[0.06]", 3, "click"], ["type", "submit", 1, "relative", "flex", "items-center", "justify-center", "gap-2", "rounded-xl", "bg-gradient-to-r", "from-brand-500", "to-brand-600", "px-5", "py-2.5", "text-sm", "font-semibold", "text-white", "shadow-lg", "shadow-brand-500/25", "transition-all", "hover:from-brand-600", "hover:to-brand-700", "disabled:cursor-not-allowed", "disabled:opacity-50", "disabled:shadow-none", 3, "disabled"], ["type", "button", 1, "flex", "items-center", "gap-2", "rounded-xl", "border", "px-3", "py-2.5", "text-sm", "font-medium", "transition-all", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-4", "w-4"], [1, "truncate"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M15 12a3 3 0 11-6 0 3 3 0 016 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], ["type", "button", 1, "rounded-full", "px-3", "py-1.5", "text-xs", "font-semibold", "transition-all", 3, "click"], [1, "flex", "items-center", "gap-3", "rounded-lg", "border", "border-gray-200", "bg-white", "p-3", "dark:border-gray-700", "dark:bg-white/[0.04]"], [1, "flex", "h-10", "w-10", "items-center", "justify-center", "rounded-lg", "bg-gray-100", "dark:bg-gray-800"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "h-5", "w-5", "text-blue-500"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"], [1, "min-w-0", "flex-1"], [1, "truncate", "text-sm", "font-medium", "text-gray-700", "dark:text-gray-300"], ["type", "button", "aria-label", "Eliminar imagen", 1, "flex", "h-8", "w-8", "items-center", "justify-center", "rounded-full", "text-gray-400", "transition-colors", "hover:bg-red-50", "hover:text-red-500", "dark:hover:bg-red-500/10", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M6 18L18 6M6 6l12 12"], ["fill", "none", "viewBox", "0 0 24 24", 1, "h-4", "w-4", "animate-spin"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M12 19l9 2-9-18-9 18 9-2zm0 0v-8"]], template: function NewTicketModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "app-modal", 0);
      \u0275\u0275listener("close", function NewTicketModalComponent_Template_app_modal_close_0_listener() {
        return ctx.onClose();
      });
      \u0275\u0275elementStart(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(5, "svg", 5);
      \u0275\u0275element(6, "path", 6);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(7, "div")(8, "h2", 7);
      \u0275\u0275text(9, "Nuevo ticket de soporte");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "p", 8);
      \u0275\u0275text(11, "Completa el formulario para crear tu solicitud");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(12, "form", 9);
      \u0275\u0275listener("ngSubmit", function NewTicketModalComponent_Template_form_ngSubmit_12_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(13, "div")(14, "label", 10);
      \u0275\u0275text(15, " Asunto del ticket ");
      \u0275\u0275elementStart(16, "span", 11);
      \u0275\u0275text(17, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(18, "input", 12);
      \u0275\u0275conditionalCreate(19, NewTicketModalComponent_Conditional_19_Template, 2, 1, "p", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 14)(21, "div")(22, "label", 15);
      \u0275\u0275text(23, " Categor\xEDa ");
      \u0275\u0275elementStart(24, "span", 11);
      \u0275\u0275text(25, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "div", 16);
      \u0275\u0275repeaterCreate(27, NewTicketModalComponent_For_28_Template, 7, 4, "button", 17, _forTrack07);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(29, NewTicketModalComponent_Conditional_29_Template, 2, 0, "p", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "div")(31, "label", 15);
      \u0275\u0275text(32, " Prioridad ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "div", 18);
      \u0275\u0275repeaterCreate(34, NewTicketModalComponent_For_35_Template, 2, 3, "button", 19, _forTrack07);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(36, "div")(37, "label", 20);
      \u0275\u0275text(38, " Descripci\xF3n detallada ");
      \u0275\u0275elementStart(39, "span", 11);
      \u0275\u0275text(40, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(41, "textarea", 21);
      \u0275\u0275elementStart(42, "div", 22);
      \u0275\u0275conditionalCreate(43, NewTicketModalComponent_Conditional_43_Template, 2, 1, "p", 23)(44, NewTicketModalComponent_Conditional_44_Template, 1, 0, "span");
      \u0275\u0275elementStart(45, "span", 24);
      \u0275\u0275text(46);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(47, "div")(48, "label", 15);
      \u0275\u0275text(49, " Imagen adjunta ");
      \u0275\u0275elementStart(50, "span", 25);
      \u0275\u0275text(51, "(opcional)");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(52, "div", 26);
      \u0275\u0275listener("dragover", function NewTicketModalComponent_Template_div_dragover_52_listener($event) {
        return ctx.onDragOver($event);
      })("dragleave", function NewTicketModalComponent_Template_div_dragleave_52_listener($event) {
        return ctx.onDragLeave($event);
      })("drop", function NewTicketModalComponent_Template_div_drop_52_listener($event) {
        return ctx.onDrop($event);
      });
      \u0275\u0275elementStart(53, "input", 27);
      \u0275\u0275listener("change", function NewTicketModalComponent_Template_input_change_53_listener($event) {
        return ctx.onFileSelect($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "div", 28)(55, "div", 29);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(56, "svg", 5);
      \u0275\u0275element(57, "path", 30);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(58, "div")(59, "p", 31);
      \u0275\u0275text(60, " Arrastra una imagen aqu\xED o ");
      \u0275\u0275elementStart(61, "span", 32);
      \u0275\u0275text(62, "haz clic para seleccionar");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(63, "p", 33);
      \u0275\u0275text(64, "PNG, JPG, WEBP (m\xE1x. 10MB)");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(65, NewTicketModalComponent_Conditional_65_Template, 13, 2, "div", 34);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "div", 35)(67, "button", 36);
      \u0275\u0275listener("click", function NewTicketModalComponent_Template_button_click_67_listener() {
        return ctx.onClose();
      });
      \u0275\u0275text(68, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "button", 37);
      \u0275\u0275conditionalCreate(70, NewTicketModalComponent_Conditional_70_Template, 5, 0)(71, NewTicketModalComponent_Conditional_71_Template, 4, 0);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      let tmp_2_0;
      let tmp_3_0;
      let tmp_5_0;
      let tmp_7_0;
      let tmp_8_0;
      let tmp_9_0;
      let tmp_11_0;
      \u0275\u0275property("isOpen", ctx.isOpen);
      \u0275\u0275advance(12);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(6);
      \u0275\u0275classProp("border-red-400", ((tmp_2_0 = ctx.form.get("title")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.form.get("title")) == null ? null : tmp_2_0.touched));
      \u0275\u0275advance();
      \u0275\u0275conditional(((tmp_3_0 = ctx.form.get("title")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.form.get("title")) == null ? null : tmp_3_0.touched) ? 19 : -1);
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.categories);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(((tmp_5_0 = ctx.form.get("category")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx.form.get("category")) == null ? null : tmp_5_0.touched) ? 29 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.priorities);
      \u0275\u0275advance(7);
      \u0275\u0275classProp("border-red-400", ((tmp_7_0 = ctx.form.get("description")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx.form.get("description")) == null ? null : tmp_7_0.touched));
      \u0275\u0275advance(2);
      \u0275\u0275conditional(((tmp_8_0 = ctx.form.get("description")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx.form.get("description")) == null ? null : tmp_8_0.touched) ? 43 : 44);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ((tmp_9_0 = ctx.form.get("description")) == null ? null : tmp_9_0.value == null ? null : tmp_9_0.value.length) || 0, " / 2000 ");
      \u0275\u0275advance(6);
      \u0275\u0275classMap(ctx.isDragging() ? "border-brand-500 bg-brand-50 dark:bg-brand-500/10" : "border-gray-200 bg-gray-50 hover:border-gray-300 dark:border-gray-700 dark:bg-white/[0.04] dark:hover:border-gray-600");
      \u0275\u0275advance(13);
      \u0275\u0275conditional((tmp_11_0 = ctx.selectedImage()) ? 65 : -1, tmp_11_0);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.form.invalid || ctx.isSubmitting());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isSubmitting() ? 70 : 71);
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, ModalComponent], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NewTicketModalComponent, [{
    type: Component,
    args: [{ selector: "app-new-ticket-modal", standalone: true, imports: [CommonModule, ReactiveFormsModule, ModalComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `<app-modal
  [isOpen]="isOpen"
  (close)="onClose()"
  className="max-w-2xl mx-4 sm:mx-auto"
>
  <div class="p-6 sm:p-8">
    <div class="mb-6">
      <div class="mb-2 flex items-center gap-3">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/25">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Nuevo ticket de soporte</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">Completa el formulario para crear tu solicitud</p>
        </div>
      </div>
    </div>

    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-5">
      <div>
        <label for="title" class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Asunto del ticket <span class="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          formControlName="title"
          placeholder="Ej: Error al procesar factura de enero"
          class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition-all focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.08]"
          [class.border-red-400]="form.get('title')?.invalid && form.get('title')?.touched"
        />
        @if (form.get('title')?.invalid && form.get('title')?.touched) {
          <p class="mt-1.5 text-xs text-red-500">{{ titleError }}</p>
        }
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Categor\xEDa <span class="text-red-500">*</span>
          </label>
          <div class="grid grid-cols-2 gap-2">
            @for (cat of categories; track cat.value) {
              <button
                type="button"
                (click)="form.get('category')?.setValue(cat.value)"
                [class]="form.get('category')?.value === cat.value
                  ? 'border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400 ring-2 ring-brand-500/20'
                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:bg-white/[0.04] dark:text-gray-300 dark:hover:bg-white/[0.08]'"
                class="flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all"
              >
                @switch (cat.icon) {
                  @case ('receipt') {
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                    </svg>
                  }
                  @case ('wrench') {
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                  @case ('user') {
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  }
                  @default {
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                }
                <span class="truncate">{{ cat.label }}</span>
              </button>
            }
          </div>
          @if (form.get('category')?.invalid && form.get('category')?.touched) {
            <p class="mt-1.5 text-xs text-red-500">Selecciona una categor\xEDa</p>
          }
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Prioridad
          </label>
          <div class="flex flex-wrap gap-2">
            @for (pri of priorities; track pri.value) {
              <button
                type="button"
                (click)="form.get('priority')?.setValue(pri.value)"
                [class]="form.get('priority')?.value === pri.value
                  ? pri.color + ' ring-2 ring-offset-1 ring-gray-300 dark:ring-offset-gray-900'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'"
                class="rounded-full px-3 py-1.5 text-xs font-semibold transition-all"
              >
                {{ pri.label }}
              </button>
            }
          </div>
        </div>
      </div>

      <div>
        <label for="description" class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Descripci\xF3n detallada <span class="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          formControlName="description"
          rows="4"
          placeholder="Describe tu problema o solicitud con el mayor detalle posible..."
          class="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition-all focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.08]"
          [class.border-red-400]="form.get('description')?.invalid && form.get('description')?.touched"
        ></textarea>
        <div class="mt-1.5 flex items-center justify-between">
          @if (form.get('description')?.invalid && form.get('description')?.touched) {
            <p class="text-xs text-red-500">{{ descriptionError }}</p>
          } @else {
            <span></span>
          }
          <span class="text-xs text-gray-400">
            {{ form.get('description')?.value?.length || 0 }} / 2000
          </span>
        </div>
      </div>

      <div>
        <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Imagen adjunta <span class="text-gray-400">(opcional)</span>
        </label>
        <div
          (dragover)="onDragOver($event)"
          (dragleave)="onDragLeave($event)"
          (drop)="onDrop($event)"
          [class]="isDragging()
            ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10'
            : 'border-gray-200 bg-gray-50 hover:border-gray-300 dark:border-gray-700 dark:bg-white/[0.04] dark:hover:border-gray-600'"
          class="relative rounded-xl border-2 border-dashed p-6 text-center transition-all"
        >
          <input
            type="file"
            (change)="onFileSelect($event)"
            accept="image/png,image/jpeg,image/webp"
            class="absolute inset-0 cursor-pointer opacity-0"
            aria-label="Seleccionar imagen"
          />
          <div class="flex flex-col items-center gap-2">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
                Arrastra una imagen aqu\xED o <span class="text-brand-500">haz clic para seleccionar</span>
              </p>
              <p class="mt-1 text-xs text-gray-400">PNG, JPG, WEBP (m\xE1x. 10MB)</p>
            </div>
          </div>
        </div>

        @if (selectedImage(); as image) {
          <div class="mt-3 space-y-2">
            <div class="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-white/[0.04]">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                <svg class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-medium text-gray-700 dark:text-gray-300">{{ image.name }}</p>
                <p class="text-xs text-gray-400">{{ formatFileSize(image.size) }}</p>
              </div>
              <button
                type="button"
                (click)="removeFile()"
                class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
                aria-label="Eliminar imagen"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        }
      </div>

      <div class="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 dark:border-gray-800 sm:flex-row sm:justify-end">
        <button
          type="button"
          (click)="onClose()"
          class="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-transparent dark:text-gray-300 dark:hover:bg-white/[0.06]"
        >
          Cancelar
        </button>
        <button
          type="submit"
          [disabled]="form.invalid || isSubmitting()"
          class="relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:from-brand-600 hover:to-brand-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          @if (isSubmitting()) {
            <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Enviando...</span>
          } @else {
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span>Crear ticket</span>
          }
        </button>
      </div>
    </form>
  </div>
</app-modal>\r
` }]
  }], () => [{ type: FormBuilder }], { isOpen: [{
    type: Input
  }], closeModal: [{
    type: Output
  }], submitTicket: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NewTicketModalComponent, { className: "NewTicketModalComponent", filePath: "src/app/pages/support/components/new-ticket-modal/new-ticket-modal.component.ts", lineNumber: 41 });
})();

// src/app/pages/support/services/support-data.service.ts
var SupportDataService = class _SupportDataService {
  api;
  requestContext;
  constructor(api, requestContext) {
    this.api = api;
    this.requestContext = requestContext;
  }
  quickActions = [
    {
      id: "qa-new",
      title: "Subir ticket",
      description: "Adjunta tu imagen y recibe seguimiento prioritario.",
      icon: "upload"
    },
    {
      id: "qa-retry",
      title: "Reintentar \xFAltimo ticket",
      description: "Reenv\xEDa la \xFAltima solicitud con datos corregidos.",
      icon: "retry"
    },
    {
      id: "qa-cfdi",
      title: "Descargar CFDI",
      description: "Obt\xE9n tu CFDI en PDF y XML desde tu panel.",
      icon: "download"
    }
  ];
  guides = [
    {
      id: "g-1",
      title: "Subir ticket correctamente",
      description: "Checklist para adjuntar im\xE1genes completas y legibles.",
      icon: "check"
    },
    {
      id: "g-2",
      title: "Entender estado del ticket",
      description: "Qu\xE9 significa cada estado y tiempos de respuesta.",
      icon: "status"
    },
    {
      id: "g-3",
      title: "Reportar incidencia",
      description: "Paso a paso para reportar errores cr\xEDticos.",
      icon: "alert"
    }
  ];
  faqs = [
    {
      id: "f-1",
      question: "\xBFCu\xE1nto tarda en procesarse un ticket?",
      answer: "Normalmente entre 24 y 48 horas h\xE1biles dependiendo del volumen.",
      category: "Estado"
    },
    {
      id: "f-2",
      question: "\xBFQu\xE9 formatos son v\xE1lidos para subir im\xE1genes?",
      answer: "Aceptamos PNG, JPG, JPEG y WEBP siempre que est\xE9n completos y legibles.",
      category: "Subidas"
    },
    {
      id: "f-3",
      question: "\xBFC\xF3mo reintento un ticket fallido?",
      answer: "Desde el historial puedes reintentar con una nueva imagen.",
      category: "Acciones"
    }
  ];
  legalResources = [
    {
      id: "l-1",
      title: "Pol\xEDtica de privacidad",
      href: "#"
    },
    {
      id: "l-2",
      title: "T\xE9rminos del servicio",
      href: "#"
    },
    {
      id: "l-3",
      title: "Acuerdo de procesamiento de datos",
      href: "#"
    }
  ];
  getRecentTickets() {
    return this.api.post(API_ENDPOINTS.support.recentTickets, this.requestContext.withUserId({ cantidad: 3 })).pipe(map((rows) => (rows ?? []).map((row) => this.mapRecentTicket(row))), catchError(() => of([])));
  }
  getHeaderSummary() {
    return of({ averageResponseTimeLabel: "Sin datos" });
  }
  getTicketHistory() {
    const request = this.requestContext.withUserId({});
    return this.buildHistoryFromRecentTickets(request);
  }
  getTicketDetail(idTicketSoporte) {
    return this.api.post(API_ENDPOINTS.support.ticketDetail, this.requestContext.withUserId({ idTicketSoporte: Number(idTicketSoporte) })).pipe(map((row) => this.mapTicketDetail(row)));
  }
  getTicketImage(idTicketSoporte) {
    return this.api.post(API_ENDPOINTS.support.ticketImage, this.requestContext.withUserId({ idTicketSoporte: Number(idTicketSoporte) })).pipe(map((row) => ({
      archivoBase64: row.archivoBase64DTO,
      nombreArchivo: row.nombreArchivoDTO,
      contentType: row.contentTypeDTO
    })));
  }
  getQuickActions() {
    return of(this.quickActions);
  }
  getGuides() {
    return of(this.guides);
  }
  getFaqs() {
    return of(this.faqs);
  }
  getLegalResources() {
    return of(this.legalResources);
  }
  buildHistoryFromRecentTickets(request) {
    return this.api.post(API_ENDPOINTS.support.recentTickets, __spreadProps(__spreadValues({}, request), { cantidad: 100 })).pipe(switchMap((recentRows) => {
      const items = recentRows ?? [];
      if (!items.length) {
        return of([]);
      }
      return forkJoin(items.map((row) => this.getTicketDetail(String(row.idTicketSoporteDTO)).pipe(map((detail) => ({ row, detail })), catchError(() => of({ row, detail: null }))))).pipe(map((details) => details.map(({ row, detail }) => ({
        id: String(row.idTicketSoporteDTO),
        title: row.asuntoDTO || "Ticket sin asunto",
        number: row.folioDTO || "-",
        category: detail?.categoria || "-",
        priority: detail?.prioridad || "-",
        status: row.estatusDTO || "abierto",
        createdAt: this.formatSupportDate(row.fechaCreacionDTO),
        updatedAt: detail?.fechaActualizacion || this.formatSupportDate(row.fechaCreacionDTO),
        createdAtRaw: row.fechaCreacionDTO,
        updatedAtRaw: row.fechaCreacionDTO,
        hasImage: row.tieneImagenDTO === true
      }))));
    }));
  }
  createTicket(payload) {
    const formData = new FormData();
    formData.append("idUsuario", String(this.requestContext.getUserIdOrDefault()));
    formData.append("asunto", payload.title);
    formData.append("descripcion", payload.description);
    formData.append("categoria", payload.category);
    formData.append("prioridad", payload.priority);
    if (payload.image) {
      formData.append("imagen", payload.image, payload.image.name);
    }
    return this.api.post(API_ENDPOINTS.support.createTicket, formData);
  }
  mapRecentTicket(row) {
    return {
      id: String(row.idTicketSoporteDTO),
      title: row.asuntoDTO || "Ticket sin asunto",
      status: this.mapStatus(row.estatusDTO),
      updatedAt: this.formatSupportDate(row.fechaCreacionDTO),
      number: row.folioDTO || "-",
      hasImage: row.tieneImagenDTO === true
    };
  }
  mapHistoryTicket(row) {
    return {
      id: String(row.idTicketSoporteDTO),
      title: row.asuntoDTO || "Ticket sin asunto",
      number: row.folioDTO || "-",
      category: row.categoriaDTO || "-",
      priority: row.prioridadDTO || "-",
      status: row.estatusDTO || "abierto",
      createdAt: this.formatSupportDate(row.fechaCreacionDTO),
      updatedAt: this.formatSupportDate(row.fechaActualizacionDTO),
      createdAtRaw: row.fechaCreacionDTO,
      updatedAtRaw: row.fechaActualizacionDTO,
      hasImage: row.tieneImagenDTO === true
    };
  }
  mapTicketDetail(row) {
    return {
      id: row.idTicketSoporteDTO,
      folio: row.folioDTO,
      asunto: row.asuntoDTO,
      descripcion: row.descripcionDTO,
      categoria: row.categoriaDTO,
      prioridad: row.prioridadDTO,
      estatus: row.estatusDTO,
      fechaCreacion: this.formatSupportDate(row.fechaCreacionDTO),
      fechaActualizacion: this.formatSupportDate(row.fechaActualizacionDTO),
      bucketPath: row.bucketPathDTO
    };
  }
  mapStatus(status) {
    const normalized = (status || "").trim().toLowerCase();
    switch (normalized) {
      case "abierto":
        return "Waiting provider";
      case "en_proceso":
      case "en proceso":
      case "procesando":
        return "Processing";
      case "cerrado":
      case "resuelto":
      case "completado":
        return "Completed";
      case "fallido":
      case "rechazado":
        return "Failed";
      default:
        return "Waiting provider";
    }
  }
  formatSupportDate(value) {
    if (!value)
      return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime()))
      return value;
    return new Intl.DateTimeFormat("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  }
  static \u0275fac = function SupportDataService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SupportDataService)(\u0275\u0275inject(ApiClientService), \u0275\u0275inject(ApiRequestContextService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SupportDataService, factory: _SupportDataService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SupportDataService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: ApiClientService }, { type: ApiRequestContextService }], null);
})();

// src/app/pages/support/support.component.ts
var _c0 = () => [];
function SupportPageComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 15)(2, "h2", 16);
    \u0275\u0275text(3, "Detalle del ticket");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 17);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 18)(7, "div", 19)(8, "p", 20);
    \u0275\u0275text(9, "Asunto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 21);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 19)(13, "p", 20);
    \u0275\u0275text(14, "Estatus");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p", 21);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 19)(18, "p", 20);
    \u0275\u0275text(19, "Categor\xEDa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p", 21);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 19)(23, "p", 20);
    \u0275\u0275text(24, "Prioridad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 22);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 23)(28, "p", 20);
    \u0275\u0275text(29, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "p", 24);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 19)(33, "p", 20);
    \u0275\u0275text(34, "Creado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "p", 21);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 19)(38, "p", 20);
    \u0275\u0275text(39, "Actualizado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "p", 21);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const detail_r1 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(detail_r1.folio);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(detail_r1.asunto);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(detail_r1.estatus);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(detail_r1.categoria);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r1.priorityClasses(detail_r1.prioridad));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", detail_r1.prioridad, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(detail_r1.descripcion);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(detail_r1.fechaCreacion);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(detail_r1.fechaActualizacion);
  }
}
function SupportPageComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 15)(2, "h2", 16);
    \u0275\u0275text(3, "Imagen del ticket");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 17);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 25);
    \u0275\u0275element(7, "img", 26);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const image_r3 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(image_r3.nombreArchivo);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r1.selectedTicketImageSrc, \u0275\u0275sanitizeUrl)("alt", image_r3.nombreArchivo);
  }
}
function SupportPageComponent_Conditional_28_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 30);
    \u0275\u0275element(1, "span", 34);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const bullet_r5 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(bullet_r5);
  }
}
function SupportPageComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 15)(2, "h2", 16);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 27);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 28)(7, "ul", 29);
    \u0275\u0275repeaterCreate(8, SupportPageComponent_Conditional_28_For_9_Template, 4, 1, "li", 30, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 31);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 32)(13, "button", 33);
    \u0275\u0275listener("click", function SupportPageComponent_Conditional_28_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeGuideModal());
    });
    \u0275\u0275text(14, " Cerrar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const guide_r6 = ctx;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(guide_r6.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(guide_r6.subtitle);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(guide_r6.bullets);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", guide_r6.footer, " ");
  }
}
var SupportPageComponent = class _SupportPageComponent {
  dataService;
  ticketUploadStatusService;
  router;
  headerQuery = "";
  refreshTickets$ = new Subject();
  isNewTicketModalOpen = signal(false, ...ngDevMode ? [{ debugName: "isNewTicketModalOpen" }] : []);
  selectedTicketDetail = signal(null, ...ngDevMode ? [{ debugName: "selectedTicketDetail" }] : []);
  selectedTicketImage = signal(null, ...ngDevMode ? [{ debugName: "selectedTicketImage" }] : []);
  selectedGuide = signal(null, ...ngDevMode ? [{ debugName: "selectedGuide" }] : []);
  isLoadingTicketDetail = signal(false, ...ngDevMode ? [{ debugName: "isLoadingTicketDetail" }] : []);
  isLoadingTicketImage = signal(false, ...ngDevMode ? [{ debugName: "isLoadingTicketImage" }] : []);
  tickets$;
  headerSummary$;
  quickActions$;
  guides$;
  faqs$;
  legalResources$;
  chatContextMessage$;
  isUploadBusy$;
  uploadPhaseLabel$;
  constructor(dataService, ticketUploadStatusService, router) {
    this.dataService = dataService;
    this.ticketUploadStatusService = ticketUploadStatusService;
    this.router = router;
    this.tickets$ = this.refreshTickets$.pipe(startWith(void 0), switchMap(() => this.dataService.getRecentTickets()));
    this.headerSummary$ = this.dataService.getHeaderSummary();
    this.quickActions$ = this.dataService.getQuickActions();
    this.guides$ = this.dataService.getGuides();
    this.faqs$ = this.dataService.getFaqs();
    this.legalResources$ = this.dataService.getLegalResources();
    this.isUploadBusy$ = this.ticketUploadStatusService.status$.pipe(map((status) => status.state === "processing" || status.state === "saving"));
    this.uploadPhaseLabel$ = this.ticketUploadStatusService.status$.pipe(map((status) => this.mapUploadPhaseLabel(status.state)));
    this.chatContextMessage$ = this.tickets$.pipe(map((tickets) => {
      const latest = tickets[0];
      if (!latest)
        return "Hola, en que podemos ayudarte hoy?";
      return `Veo que tu ultimo ticket esta en ${latest.status}. Quieres actualizarlo?`;
    }));
  }
  onHeaderQueryChange(value) {
    this.headerQuery = value;
  }
  openNewTicketModal() {
    this.isNewTicketModalOpen.set(true);
  }
  closeNewTicketModal() {
    this.isNewTicketModalOpen.set(false);
  }
  closeTicketDetailModal() {
    this.selectedTicketDetail.set(null);
  }
  closeTicketImageModal() {
    this.selectedTicketImage.set(null);
  }
  closeGuideModal() {
    this.selectedGuide.set(null);
  }
  onTicketSubmit(data) {
    this.dataService.createTicket({
      title: data.title,
      description: data.description,
      category: data.category,
      priority: data.priority,
      image: data.image
    }).subscribe({
      next: () => {
        this.closeNewTicketModal();
        this.refreshTickets$.next();
      },
      error: () => {
      }
    });
  }
  onViewTicketDetails(ticket) {
    this.isLoadingTicketDetail.set(true);
    this.dataService.getTicketDetail(ticket.id).subscribe({
      next: (detail) => {
        this.selectedTicketDetail.set(detail);
        this.isLoadingTicketDetail.set(false);
      },
      error: () => {
        this.isLoadingTicketDetail.set(false);
      }
    });
  }
  onViewTicketImage(ticket) {
    this.isLoadingTicketImage.set(true);
    this.dataService.getTicketImage(ticket.id).subscribe({
      next: (image) => {
        this.selectedTicketImage.set(image);
        this.isLoadingTicketImage.set(false);
      },
      error: () => {
        this.isLoadingTicketImage.set(false);
      }
    });
  }
  onViewHistory() {
    void this.router.navigate(["/support/history"]);
  }
  onQuickActionClick(action) {
    if (action.id === "qa-new") {
      void this.router.navigate(["/ticket-management"], {
        queryParams: { highlightUpload: "1" }
      });
    }
  }
  onGuideClick(guide) {
    this.selectedGuide.set(this.buildGuideModalContent(guide));
  }
  get selectedTicketImageSrc() {
    const image = this.selectedTicketImage();
    if (!image?.archivoBase64 || !image.contentType)
      return "";
    return `data:${image.contentType};base64,${image.archivoBase64}`;
  }
  priorityClasses(priority) {
    const normalized = (priority || "").trim().toLowerCase();
    switch (normalized) {
      case "baja":
        return "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300";
      case "media":
        return "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300";
      case "alta":
        return "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300";
      case "urgente":
        return "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200";
    }
  }
  mapUploadPhaseLabel(state) {
    switch (state) {
      case "processing":
        return "Extrayendo...";
      case "saving":
        return "Guardando...";
      default:
        return "Extrayendo...";
    }
  }
  buildGuideModalContent(guide) {
    switch (guide.id) {
      case "g-1":
        return {
          title: "Subir ticket correctamente",
          subtitle: "Checklist para adjuntar im\xE1genes completas y legibles.",
          bullets: [
            "Verifica que la foto est\xE9 completa y no corte los datos principales del ticket.",
            "Procura buena iluminaci\xF3n y evita sombras sobre fecha, total, RFC y folio.",
            "Sube una sola imagen clara por ticket y evita fondos con demasiado ruido visual.",
            "Confirma que el archivo sea PNG, JPG, JPEG o WEBP antes de enviarlo."
          ],
          footer: "Mientras mejor sea la imagen, m\xE1s r\xE1pida y precisa ser\xE1 la lectura del ticket."
        };
      case "g-2":
        return {
          title: "Entender estado del ticket",
          subtitle: "Qu\xE9 significa cada estado y tiempos de respuesta.",
          bullets: [
            "Abierto: el ticket fue recibido y est\xE1 pendiente de atenci\xF3n.",
            "En proceso: el equipo ya est\xE1 revisando la solicitud o validando la imagen.",
            "Completado: el caso fue resuelto o cerrado por soporte.",
            "Si un ticket tarda m\xE1s de lo esperado, revisa primero si falta informaci\xF3n o evidencia adicional."
          ],
          footer: "Puedes consultar el historial para revisar el estado actual y la fecha de creaci\xF3n de cada ticket."
        };
      case "g-3":
        return {
          title: "Reportar incidencia",
          subtitle: "Paso a paso para reportar errores cr\xEDticos.",
          bullets: [
            "Describe el problema con el mayor detalle posible desde el asunto y la descripci\xF3n.",
            "Indica si el error afecta facturaci\xF3n, soporte t\xE9cnico, tu cuenta u otra operaci\xF3n.",
            "Selecciona la prioridad correcta para que soporte entienda el impacto real del caso.",
            "Adjunta una imagen cuando el problema est\xE9 relacionado con un ticket o una evidencia visual."
          ],
          footer: "Un reporte claro reduce el tiempo de diagn\xF3stico y facilita el seguimiento del caso."
        };
      default:
        return {
          title: guide.title,
          subtitle: guide.description,
          bullets: ["Consulta esta gu\xEDa para conocer el flujo recomendado dentro del m\xF3dulo de soporte."],
          footer: "La informaci\xF3n de esta gu\xEDa est\xE1 pensada para ayudarte a resolver incidencias m\xE1s r\xE1pido."
        };
    }
  }
  static \u0275fac = function SupportPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SupportPageComponent)(\u0275\u0275directiveInject(SupportDataService), \u0275\u0275directiveInject(TicketUploadStatusService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SupportPageComponent, selectors: [["app-support"]], decls: 29, vars: 46, consts: [["pageTitle", "Soporte"], [1, "grid", "grid-cols-1", "gap-6"], [3, "queryChange", "query", "averageResponseTimeLabel"], [3, "newTicket", "viewHistory", "viewTicketDetails", "viewTicketImage", "tickets", "isUploadBusy", "uploadPhaseLabel"], [1, "grid", "grid-cols-1", "gap-6", "md:grid-cols-2"], [3, "actionClick", "actions", "isUploadBusy", "uploadPhaseLabel"], [3, "guideClick", "guides"], [1, "grid", "grid-cols-1", "gap-6", "md:grid-cols-2", "xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]"], [3, "faqs"], [3, "resources"], [3, "contextMessage"], [3, "closeModal", "submitTicket", "isOpen"], ["className", "max-w-2xl mx-4 sm:mx-auto", 3, "close", "isOpen"], [1, "p-6", "sm:p-8"], ["className", "max-w-4xl mx-4 sm:mx-auto", 3, "close", "isOpen"], [1, "mb-6"], [1, "text-xl", "font-semibold", "text-gray-900", "dark:text-white"], [1, "mt-1", "text-sm", "text-gray-500", "dark:text-gray-400"], [1, "grid", "grid-cols-1", "gap-4", "sm:grid-cols-2"], [1, "rounded-2xl", "border", "border-gray-200", "bg-gray-50", "p-4", "dark:border-gray-700", "dark:bg-white/[0.04]"], [1, "text-xs", "font-semibold", "uppercase", "tracking-wide", "text-gray-500", "dark:text-gray-400"], [1, "mt-2", "text-sm", "font-semibold", "text-gray-900", "dark:text-white"], [1, "mt-2", "inline-flex", "rounded-full", "px-3", "py-1", "text-sm", "font-semibold", "capitalize", 3, "ngClass"], [1, "rounded-2xl", "border", "border-gray-200", "bg-gray-50", "p-4", "dark:border-gray-700", "dark:bg-white/[0.04]", "sm:col-span-2"], [1, "mt-2", "text-sm", "text-gray-700", "dark:text-gray-200"], [1, "overflow-hidden", "rounded-2xl", "border", "border-gray-200", "bg-gray-50", "p-3", "dark:border-gray-700", "dark:bg-white/[0.04]"], [1, "max-h-[70vh]", "w-full", "rounded-xl", "object-contain", 3, "src", "alt"], [1, "mt-2", "text-sm", "text-gray-500", "dark:text-gray-400"], [1, "rounded-2xl", "border", "border-gray-200", "bg-gray-50", "p-5", "dark:border-gray-700", "dark:bg-white/[0.04]"], [1, "space-y-3"], [1, "flex", "items-start", "gap-3", "text-sm", "text-gray-700", "dark:text-gray-200"], [1, "mt-5", "rounded-2xl", "border", "border-brand-200", "bg-brand-50", "p-4", "text-sm", "text-brand-700", "dark:border-brand-500/20", "dark:bg-brand-500/10", "dark:text-brand-200"], [1, "mt-6", "flex", "justify-end", "border-t", "border-gray-200", "pt-4", "dark:border-gray-700"], [1, "rounded-lg", "bg-brand-500", "px-4", "py-2.5", "text-sm", "font-medium", "text-white", "transition", "hover:bg-brand-600", 3, "click"], [1, "mt-1", "inline-flex", "h-2.5", "w-2.5", "shrink-0", "rounded-full", "bg-brand-500"]], template: function SupportPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-page-breadcrumb", 0);
      \u0275\u0275elementStart(1, "div", 1)(2, "app-support-header-card", 2);
      \u0275\u0275pipe(3, "async");
      \u0275\u0275listener("queryChange", function SupportPageComponent_Template_app_support_header_card_queryChange_2_listener($event) {
        return ctx.onHeaderQueryChange($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "app-recent-tickets-card", 3);
      \u0275\u0275pipe(5, "async");
      \u0275\u0275pipe(6, "async");
      \u0275\u0275pipe(7, "async");
      \u0275\u0275listener("newTicket", function SupportPageComponent_Template_app_recent_tickets_card_newTicket_4_listener() {
        return ctx.openNewTicketModal();
      })("viewHistory", function SupportPageComponent_Template_app_recent_tickets_card_viewHistory_4_listener() {
        return ctx.onViewHistory();
      })("viewTicketDetails", function SupportPageComponent_Template_app_recent_tickets_card_viewTicketDetails_4_listener($event) {
        return ctx.onViewTicketDetails($event);
      })("viewTicketImage", function SupportPageComponent_Template_app_recent_tickets_card_viewTicketImage_4_listener($event) {
        return ctx.onViewTicketImage($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "section", 4)(9, "app-quick-actions-card", 5);
      \u0275\u0275pipe(10, "async");
      \u0275\u0275pipe(11, "async");
      \u0275\u0275pipe(12, "async");
      \u0275\u0275listener("actionClick", function SupportPageComponent_Template_app_quick_actions_card_actionClick_9_listener($event) {
        return ctx.onQuickActionClick($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "app-guides-card", 6);
      \u0275\u0275pipe(14, "async");
      \u0275\u0275listener("guideClick", function SupportPageComponent_Template_app_guides_card_guideClick_13_listener($event) {
        return ctx.onGuideClick($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "section", 7);
      \u0275\u0275element(16, "app-faq-card", 8);
      \u0275\u0275pipe(17, "async");
      \u0275\u0275element(18, "app-legal-resources-card", 9);
      \u0275\u0275pipe(19, "async");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(20, "app-support-chat-fab", 10);
      \u0275\u0275pipe(21, "async");
      \u0275\u0275elementStart(22, "app-new-ticket-modal", 11);
      \u0275\u0275listener("closeModal", function SupportPageComponent_Template_app_new_ticket_modal_closeModal_22_listener() {
        return ctx.closeNewTicketModal();
      })("submitTicket", function SupportPageComponent_Template_app_new_ticket_modal_submitTicket_22_listener($event) {
        return ctx.onTicketSubmit($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "app-modal", 12);
      \u0275\u0275listener("close", function SupportPageComponent_Template_app_modal_close_23_listener() {
        return ctx.closeTicketDetailModal();
      });
      \u0275\u0275conditionalCreate(24, SupportPageComponent_Conditional_24_Template, 42, 9, "div", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "app-modal", 14);
      \u0275\u0275listener("close", function SupportPageComponent_Template_app_modal_close_25_listener() {
        return ctx.closeTicketImageModal();
      });
      \u0275\u0275conditionalCreate(26, SupportPageComponent_Conditional_26_Template, 8, 3, "div", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "app-modal", 12);
      \u0275\u0275listener("close", function SupportPageComponent_Template_app_modal_close_27_listener() {
        return ctx.closeGuideModal();
      });
      \u0275\u0275conditionalCreate(28, SupportPageComponent_Conditional_28_Template, 15, 3, "div", 13);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_14_0;
      let tmp_16_0;
      let tmp_18_0;
      \u0275\u0275advance(2);
      \u0275\u0275property("query", ctx.headerQuery)("averageResponseTimeLabel", ((tmp_1_0 = \u0275\u0275pipeBind1(3, 19, ctx.headerSummary$)) == null ? null : tmp_1_0.averageResponseTimeLabel) ?? "Sin datos");
      \u0275\u0275advance(2);
      \u0275\u0275property("tickets", \u0275\u0275pipeBind1(5, 21, ctx.tickets$) ?? \u0275\u0275pureFunction0(41, _c0))("isUploadBusy", \u0275\u0275pipeBind1(6, 23, ctx.isUploadBusy$) ?? false)("uploadPhaseLabel", \u0275\u0275pipeBind1(7, 25, ctx.uploadPhaseLabel$) ?? "Extrayendo...");
      \u0275\u0275advance(5);
      \u0275\u0275property("actions", \u0275\u0275pipeBind1(10, 27, ctx.quickActions$) ?? \u0275\u0275pureFunction0(42, _c0))("isUploadBusy", \u0275\u0275pipeBind1(11, 29, ctx.isUploadBusy$) ?? false)("uploadPhaseLabel", \u0275\u0275pipeBind1(12, 31, ctx.uploadPhaseLabel$) ?? "Extrayendo...");
      \u0275\u0275advance(4);
      \u0275\u0275property("guides", \u0275\u0275pipeBind1(14, 33, ctx.guides$) ?? \u0275\u0275pureFunction0(43, _c0));
      \u0275\u0275advance(3);
      \u0275\u0275property("faqs", \u0275\u0275pipeBind1(17, 35, ctx.faqs$) ?? \u0275\u0275pureFunction0(44, _c0));
      \u0275\u0275advance(2);
      \u0275\u0275property("resources", \u0275\u0275pipeBind1(19, 37, ctx.legalResources$) ?? \u0275\u0275pureFunction0(45, _c0));
      \u0275\u0275advance(2);
      \u0275\u0275property("contextMessage", \u0275\u0275pipeBind1(21, 39, ctx.chatContextMessage$) || "");
      \u0275\u0275advance(2);
      \u0275\u0275property("isOpen", ctx.isNewTicketModalOpen());
      \u0275\u0275advance();
      \u0275\u0275property("isOpen", ctx.selectedTicketDetail() !== null);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_14_0 = ctx.selectedTicketDetail()) ? 24 : -1, tmp_14_0);
      \u0275\u0275advance();
      \u0275\u0275property("isOpen", ctx.selectedTicketImage() !== null);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_16_0 = ctx.selectedTicketImage()) ? 26 : -1, tmp_16_0);
      \u0275\u0275advance();
      \u0275\u0275property("isOpen", ctx.selectedGuide() !== null);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_18_0 = ctx.selectedGuide()) ? 28 : -1, tmp_18_0);
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    ModalComponent,
    PageBreadcrumbComponent,
    SupportHeaderCardComponent,
    RecentTicketsCardComponent,
    QuickActionsCardComponent,
    GuidesCardComponent,
    FaqCardComponent,
    LegalResourcesCardComponent,
    SupportChatFabComponent,
    NewTicketModalComponent,
    AsyncPipe
  ], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SupportPageComponent, [{
    type: Component,
    args: [{ selector: "app-support", standalone: true, imports: [
      CommonModule,
      ModalComponent,
      PageBreadcrumbComponent,
      SupportHeaderCardComponent,
      RecentTicketsCardComponent,
      QuickActionsCardComponent,
      GuidesCardComponent,
      FaqCardComponent,
      LegalResourcesCardComponent,
      SupportChatFabComponent,
      NewTicketModalComponent
    ], changeDetection: ChangeDetectionStrategy.OnPush, template: `<app-page-breadcrumb pageTitle="Soporte" />

<div class="grid grid-cols-1 gap-6">
  <app-support-header-card
    [query]="headerQuery"
    [averageResponseTimeLabel]="((headerSummary$ | async)?.averageResponseTimeLabel) ?? 'Sin datos'"
    (queryChange)="onHeaderQueryChange($event)" />

  <app-recent-tickets-card
    [tickets]="(tickets$ | async) ?? []"
    [isUploadBusy]="(isUploadBusy$ | async) ?? false"
    [uploadPhaseLabel]="(uploadPhaseLabel$ | async) ?? 'Extrayendo...'"
    (newTicket)="openNewTicketModal()"
    (viewHistory)="onViewHistory()"
    (viewTicketDetails)="onViewTicketDetails($event)"
    (viewTicketImage)="onViewTicketImage($event)"
  />

  <section class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <app-quick-actions-card
      [actions]="(quickActions$ | async) ?? []"
      [isUploadBusy]="(isUploadBusy$ | async) ?? false"
      [uploadPhaseLabel]="(uploadPhaseLabel$ | async) ?? 'Extrayendo...'"
      (actionClick)="onQuickActionClick($event)"
    />
    <app-guides-card [guides]="(guides$ | async) ?? []" (guideClick)="onGuideClick($event)" />
  </section>

  <section class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
    <app-faq-card [faqs]="(faqs$ | async) ?? []"></app-faq-card>
    <app-legal-resources-card [resources]="(legalResources$ | async) ?? []" />
  </section>
</div>

<app-support-chat-fab [contextMessage]="(chatContextMessage$ | async) || ''" />

<app-new-ticket-modal [isOpen]="isNewTicketModalOpen()" (closeModal)="closeNewTicketModal()"
  (submitTicket)="onTicketSubmit($event)" />

<app-modal [isOpen]="selectedTicketDetail() !== null" (close)="closeTicketDetailModal()" className="max-w-2xl mx-4 sm:mx-auto">
  @if (selectedTicketDetail(); as detail) {
    <div class="p-6 sm:p-8">
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Detalle del ticket</h2>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ detail.folio }}</p>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-white/[0.04]">
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Asunto</p>
          <p class="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{{ detail.asunto }}</p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-white/[0.04]">
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Estatus</p>
          <p class="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{{ detail.estatus }}</p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-white/[0.04]">
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Categor\xEDa</p>
          <p class="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{{ detail.categoria }}</p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-white/[0.04]">
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Prioridad</p>
          <span class="mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold capitalize" [ngClass]="priorityClasses(detail.prioridad)">
            {{ detail.prioridad }}
          </span>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-white/[0.04] sm:col-span-2">
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Descripci\xF3n</p>
          <p class="mt-2 text-sm text-gray-700 dark:text-gray-200">{{ detail.descripcion }}</p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-white/[0.04]">
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Creado</p>
          <p class="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{{ detail.fechaCreacion }}</p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-white/[0.04]">
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Actualizado</p>
          <p class="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{{ detail.fechaActualizacion }}</p>
        </div>
      </div>
    </div>
  }
</app-modal>

<app-modal [isOpen]="selectedTicketImage() !== null" (close)="closeTicketImageModal()" className="max-w-4xl mx-4 sm:mx-auto">
  @if (selectedTicketImage(); as image) {
    <div class="p-6 sm:p-8">
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Imagen del ticket</h2>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ image.nombreArchivo }}</p>
      </div>
      <div class="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-white/[0.04]">
        <img [src]="selectedTicketImageSrc" [alt]="image.nombreArchivo" class="max-h-[70vh] w-full rounded-xl object-contain" />
      </div>
    </div>
  }
</app-modal>\r
\r

<app-modal [isOpen]="selectedGuide() !== null" (close)="closeGuideModal()" className="max-w-2xl mx-4 sm:mx-auto">
  @if (selectedGuide(); as guide) {
    <div class="p-6 sm:p-8">
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ guide.title }}</h2>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">{{ guide.subtitle }}</p>
      </div>

      <div class="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-white/[0.04]">
        <ul class="space-y-3">
          @for (bullet of guide.bullets; track bullet) {
            <li class="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-200">
              <span class="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-brand-500"></span>
              <span>{{ bullet }}</span>
            </li>
          }
        </ul>
      </div>

      <div class="mt-5 rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-700 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-200">
        {{ guide.footer }}
      </div>

      <div class="mt-6 flex justify-end border-t border-gray-200 pt-4 dark:border-gray-700">
        <button
          (click)="closeGuideModal()"
          class="rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  }
</app-modal>\r
` }]
  }], () => [{ type: SupportDataService }, { type: TicketUploadStatusService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SupportPageComponent, { className: "SupportPageComponent", filePath: "src/app/pages/support/support.component.ts", lineNumber: 47 });
})();

// src/app/pages/support/support-history.component.ts
var _forTrack08 = ($index, $item) => $item.id;
function SupportHistoryComponent_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275text(1, "Cargando historial...");
    \u0275\u0275elementEnd();
  }
}
function SupportHistoryComponent_Conditional_74_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42)(1, "h3", 46);
    \u0275\u0275text(2, "Error al cargar el historial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 47);
    \u0275\u0275listener("click", function SupportHistoryComponent_Conditional_74_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.loadHistory());
    });
    \u0275\u0275text(4, " Reintentar ");
    \u0275\u0275elementEnd()();
  }
}
function SupportHistoryComponent_Conditional_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "h3", 46);
    \u0275\u0275text(2, "No existe datos para mostrar");
    \u0275\u0275elementEnd()();
  }
}
function SupportHistoryComponent_Conditional_76_For_20_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 70);
    \u0275\u0275listener("click", function SupportHistoryComponent_Conditional_76_For_20_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ticket_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.onViewTicketImage(ticket_r7));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 66);
    \u0275\u0275element(2, "path", 71)(3, "path", 72)(4, "path", 73);
    \u0275\u0275elementEnd()();
  }
}
function SupportHistoryComponent_Conditional_76_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 54)(1, "td", 57);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 58);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 59);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 57);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 60)(10, "span", 61);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td", 60)(13, "span", 62);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td", 63)(16, "div", 64)(17, "button", 65);
    \u0275\u0275listener("click", function SupportHistoryComponent_Conditional_76_For_20_Template_button_click_17_listener() {
      const ticket_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.onViewTicketDetails(ticket_r7));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(18, "svg", 66);
    \u0275\u0275element(19, "path", 67)(20, "path", 68);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(21, SupportHistoryComponent_Conditional_76_For_20_Conditional_21_Template, 5, 0, "button", 69);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ticket_r7 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ticket_r7.createdAt);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ticket_r7.number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ticket_r7.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ticket_r7.category);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r4.priorityClasses(ticket_r7.priority));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ticket_r7.priority, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r4.statusClasses(ticket_r7.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.statusLabel(ticket_r7.status), " ");
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ticket_r7.hasImage ? 21 : -1);
  }
}
function SupportHistoryComponent_Conditional_76_For_23_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 70);
    \u0275\u0275listener("click", function SupportHistoryComponent_Conditional_76_For_23_Conditional_20_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ticket_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.onViewTicketImage(ticket_r10));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 66);
    \u0275\u0275element(2, "path", 67)(3, "path", 68);
    \u0275\u0275elementEnd()();
  }
}
function SupportHistoryComponent_Conditional_76_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 56)(1, "div", 74)(2, "div", 75)(3, "p", 76);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 77);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 78);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 26)(10, "span", 61);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 79);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 26)(15, "button", 65);
    \u0275\u0275listener("click", function SupportHistoryComponent_Conditional_76_For_23_Template_button_click_15_listener() {
      const ticket_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.onViewTicketDetails(ticket_r10));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(16, "svg", 66);
    \u0275\u0275element(17, "path", 71)(18, "path", 72)(19, "path", 73);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(20, SupportHistoryComponent_Conditional_76_For_23_Conditional_20_Template, 4, 0, "button", 69);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ticket_r10 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ticket_r10.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ticket_r10.number, " \xC2\xB7 ", ticket_r10.createdAt);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r4.statusClasses(ticket_r10.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.statusLabel(ticket_r10.status), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r4.priorityClasses(ticket_r10.priority));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ticket_r10.priority, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ticket_r10.category, " ");
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ticket_r10.hasImage ? 20 : -1);
  }
}
function SupportHistoryComponent_Conditional_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48)(1, "table", 49)(2, "thead")(3, "tr", 50)(4, "th", 51);
    \u0275\u0275text(5, "Fecha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 51);
    \u0275\u0275text(7, "Folio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 51);
    \u0275\u0275text(9, "Asunto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 51);
    \u0275\u0275text(11, "Categor\xC3\xADa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 51);
    \u0275\u0275text(13, "Prioridad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 51);
    \u0275\u0275text(15, "Estatus");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 52);
    \u0275\u0275text(17, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "tbody", 53);
    \u0275\u0275repeaterCreate(19, SupportHistoryComponent_Conditional_76_For_20_Template, 22, 9, "tr", 54, _forTrack08);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 55);
    \u0275\u0275repeaterCreate(22, SupportHistoryComponent_Conditional_76_For_23_Template, 21, 9, "div", 56, _forTrack08);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(19);
    \u0275\u0275repeater(ctx_r4.filteredTickets);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r4.filteredTickets);
  }
}
function SupportHistoryComponent_Conditional_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "div", 80)(2, "h2", 81);
    \u0275\u0275text(3, "Detalle del ticket");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 14);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 82)(7, "div", 83)(8, "p", 84);
    \u0275\u0275text(9, "Asunto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 85);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 83)(13, "p", 84);
    \u0275\u0275text(14, "Estatus");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p", 85);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 83)(18, "p", 84);
    \u0275\u0275text(19, "Categor\xC3\xADa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p", 85);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 83)(23, "p", 84);
    \u0275\u0275text(24, "Prioridad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 86);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 87)(28, "p", 84);
    \u0275\u0275text(29, "Descripci\xC3\xB3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "p", 88);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 83)(33, "p", 84);
    \u0275\u0275text(34, "Creado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "p", 85);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 83)(38, "p", 84);
    \u0275\u0275text(39, "Actualizado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "p", 85);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const detail_r12 = ctx;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(detail_r12.folio);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(detail_r12.asunto);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(detail_r12.estatus);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(detail_r12.categoria);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r4.priorityClasses(detail_r12.prioridad));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", detail_r12.prioridad, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(detail_r12.descripcion);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(detail_r12.fechaCreacion);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(detail_r12.fechaActualizacion);
  }
}
function SupportHistoryComponent_Conditional_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "div", 80)(2, "h2", 81);
    \u0275\u0275text(3, "Imagen del ticket");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 14);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 89);
    \u0275\u0275element(7, "img", 90);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const image_r13 = ctx;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(image_r13.nombreArchivo);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r4.selectedTicketImageSrc, \u0275\u0275sanitizeUrl)("alt", image_r13.nombreArchivo);
  }
}
var SupportHistoryComponent = class _SupportHistoryComponent {
  dataService;
  viewState = "loading";
  tickets = [];
  activeFilter = "todos";
  searchQuery = "";
  sortOption = "recientes";
  dateFrom = "";
  dateTo = "";
  selectedTicketDetail = signal(null, ...ngDevMode ? [{ debugName: "selectedTicketDetail" }] : []);
  selectedTicketImage = signal(null, ...ngDevMode ? [{ debugName: "selectedTicketImage" }] : []);
  isLoadingTicketDetail = signal(false, ...ngDevMode ? [{ debugName: "isLoadingTicketDetail" }] : []);
  isLoadingTicketImage = signal(false, ...ngDevMode ? [{ debugName: "isLoadingTicketImage" }] : []);
  constructor(dataService) {
    this.dataService = dataService;
  }
  ngOnInit() {
    this.loadHistory();
  }
  loadHistory() {
    this.viewState = "loading";
    this.dataService.getTicketHistory().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.viewState = tickets.length ? "data" : "empty";
      },
      error: () => {
        this.tickets = [];
        this.viewState = "error";
      }
    });
  }
  get filteredTickets() {
    let result = [...this.tickets];
    if (this.activeFilter !== "todos") {
      result = result.filter((ticket) => this.normalizeStatus(ticket.status) === this.activeFilter);
    }
    const query = this.searchQuery.trim().toLowerCase();
    if (query.length) {
      result = result.filter((ticket) => ticket.title.toLowerCase().includes(query) || ticket.number.toLowerCase().includes(query) || ticket.category.toLowerCase().includes(query));
    }
    const fromDate = this.parseFilterDate(this.dateFrom);
    const toDate = this.parseFilterDate(this.dateTo);
    const normalizedRange = this.normalizeDateRange(fromDate, toDate);
    if (normalizedRange.from || normalizedRange.to) {
      result = result.filter((ticket) => {
        const created = this.parseTicketDate(ticket.createdAtRaw);
        if (!created)
          return false;
        if (normalizedRange.from && created < normalizedRange.from)
          return false;
        if (normalizedRange.to && created > normalizedRange.to)
          return false;
        return true;
      });
    }
    result.sort((a, b) => {
      const left = new Date(a.createdAtRaw).getTime();
      const right = new Date(b.createdAtRaw).getTime();
      return this.sortOption === "antiguos" ? left - right : right - left;
    });
    return result;
  }
  get summary() {
    return {
      total: this.tickets.length,
      abiertos: this.tickets.filter((ticket) => this.normalizeStatus(ticket.status) === "abierto").length,
      enProceso: this.tickets.filter((ticket) => this.normalizeStatus(ticket.status) === "en_proceso").length,
      cerrados: this.tickets.filter((ticket) => this.normalizeStatus(ticket.status) === "cerrado").length
    };
  }
  setFilter(filter) {
    this.activeFilter = filter;
  }
  clearFilters() {
    this.activeFilter = "todos";
    this.searchQuery = "";
    this.sortOption = "recientes";
    this.dateFrom = "";
    this.dateTo = "";
  }
  openDatePicker(input) {
    input.showPicker?.();
  }
  onViewTicketDetails(ticket) {
    this.isLoadingTicketDetail.set(true);
    this.dataService.getTicketDetail(ticket.id).subscribe({
      next: (detail) => {
        this.selectedTicketDetail.set(detail);
        this.isLoadingTicketDetail.set(false);
      },
      error: () => {
        this.isLoadingTicketDetail.set(false);
      }
    });
  }
  onViewTicketImage(ticket) {
    this.isLoadingTicketImage.set(true);
    this.dataService.getTicketImage(ticket.id).subscribe({
      next: (image) => {
        this.selectedTicketImage.set(image);
        this.isLoadingTicketImage.set(false);
      },
      error: () => {
        this.isLoadingTicketImage.set(false);
      }
    });
  }
  closeTicketDetailModal() {
    this.selectedTicketDetail.set(null);
  }
  closeTicketImageModal() {
    this.selectedTicketImage.set(null);
  }
  get selectedTicketImageSrc() {
    const image = this.selectedTicketImage();
    if (!image?.archivoBase64 || !image.contentType)
      return "";
    return `data:${image.contentType};base64,${image.archivoBase64}`;
  }
  statusLabel(status) {
    switch (this.normalizeStatus(status)) {
      case "abierto":
        return "Abierto";
      case "en_proceso":
        return "En proceso";
      case "cerrado":
        return "Completado";
      default:
        return "Abierto";
    }
  }
  statusClasses(status) {
    switch (this.normalizeStatus(status)) {
      case "abierto":
        return "bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300";
      case "en_proceso":
        return "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300";
      case "cerrado":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200";
    }
  }
  priorityClasses(priority) {
    switch ((priority || "").trim().toLowerCase()) {
      case "baja":
        return "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300";
      case "media":
        return "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300";
      case "alta":
        return "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300";
      case "urgente":
        return "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200";
    }
  }
  normalizeStatus(status) {
    const normalized = (status || "").trim().toLowerCase();
    if (normalized === "en_proceso" || normalized === "en proceso" || normalized === "procesando") {
      return "en_proceso";
    }
    if (normalized === "cerrado" || normalized === "resuelto" || normalized === "completado") {
      return "cerrado";
    }
    return "abierto";
  }
  parseTicketDate(value) {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime()))
      return null;
    return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
  }
  parseFilterDate(value) {
    if (!value?.trim())
      return null;
    const clean = value.trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(clean))
      return null;
    const [year, month, day] = clean.split("-").map(Number);
    const parsed = new Date(year, month - 1, day);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  normalizeDateRange(from, to) {
    if (!from || !to)
      return { from, to };
    return from <= to ? { from, to } : { from: to, to: from };
  }
  static \u0275fac = function SupportHistoryComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SupportHistoryComponent)(\u0275\u0275directiveInject(SupportDataService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SupportHistoryComponent, selectors: [["app-support-history"]], decls: 81, vars: 24, consts: [["dateFromInput", ""], ["dateToInput", ""], ["pageTitle", "Historial de soporte"], [1, "space-y-6"], [1, "relative", "overflow-hidden", "rounded-3xl", "border", "border-gray-200", "bg-white", "shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)]", "dark:border-gray-800", "dark:bg-white/[0.03]"], [1, "absolute", "-left-20", "-top-20", "h-64", "w-64", "rounded-full", "bg-gradient-to-br", "from-brand-500/10", "to-brand-600/5", "blur-3xl"], [1, "absolute", "-bottom-20", "-right-20", "h-64", "w-64", "rounded-full", "bg-gradient-to-br", "from-blue-500/10", "to-cyan-500/5", "blur-3xl"], [1, "relative", "p-6", "sm:p-8"], [1, "grid", "grid-cols-1", "gap-6", "lg:grid-cols-[minmax(0,1fr)_auto]", "lg:items-center"], [1, "flex", "items-start", "gap-4"], [1, "flex", "h-14", "w-14", "shrink-0", "items-center", "justify-center", "rounded-2xl", "bg-gradient-to-br", "from-brand-500", "to-brand-600", "shadow-lg", "shadow-brand-500/25"], ["src", "/images/icons/ticket.svg", "alt", "", 1, "h-7", "w-7"], [1, "min-w-0"], [1, "text-xl", "font-semibold", "text-gray-800", "dark:text-white/90", "md:text-2xl", "lg:text-3xl"], [1, "mt-1", "text-sm", "text-gray-500", "dark:text-gray-400"], [1, "flex", "justify-end"], ["routerLink", "/support", 1, "inline-flex", "items-center", "justify-center", "gap-2", "rounded-lg", "border", "border-gray-300", "bg-white", "px-4", "py-2.5", "text-sm", "font-medium", "text-gray-700", "transition", "hover:bg-gray-50", "dark:border-gray-700", "dark:bg-gray-800", "dark:text-gray-300", "dark:hover:bg-gray-700"], [1, "grid", "grid-cols-2", "gap-4", "lg:grid-cols-4"], [1, "rounded-2xl", "border", "border-gray-200", "bg-white", "p-4", "shadow-theme-xs", "dark:border-gray-800", "dark:bg-gray-900"], [1, "text-2xl", "font-semibold", "text-gray-800", "dark:text-white"], [1, "text-xs", "text-gray-500", "dark:text-gray-400"], [1, "text-2xl", "font-semibold", "text-sky-700", "dark:text-sky-300"], [1, "text-2xl", "font-semibold", "text-amber-700", "dark:text-amber-300"], [1, "text-2xl", "font-semibold", "text-emerald-700", "dark:text-emerald-300"], [1, "rounded-3xl", "border", "border-gray-200", "bg-white", "p-4", "shadow-theme-xs", "dark:border-gray-800", "dark:bg-gray-900", "lg:p-6"], [1, "flex", "flex-col", "gap-4"], [1, "flex", "flex-wrap", "gap-2"], [1, "rounded-full", "px-4", "py-2", "text-sm", "font-medium", "transition", 3, "click"], [1, "grid", "gap-4", "md:grid-cols-2", "lg:grid-cols-4"], [1, "relative"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "1.5", 1, "absolute", "left-3", "top-1/2", "h-5", "w-5", "-translate-y-1/2", "text-gray-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"], ["type", "text", "placeholder", "Buscar por asunto, folio o categor\xC3\xADa", 1, "h-11", "w-full", "rounded-lg", "border", "border-gray-300", "bg-transparent", "pl-10", "pr-4", "text-sm", "text-gray-800", "placeholder:text-gray-400", "focus:border-brand-300", "focus:outline-none", "focus:ring-3", "focus:ring-brand-500/10", "dark:border-gray-700", "dark:bg-gray-800", "dark:text-white", "dark:placeholder:text-gray-500", 3, "ngModelChange", "ngModel"], ["type", "date", 1, "h-11", "w-full", "rounded-lg", "border", "border-gray-300", "bg-transparent", "px-4", "text-sm", "text-gray-800", "focus:border-brand-300", "focus:outline-none", "focus:ring-3", "focus:ring-brand-500/10", "dark:border-gray-700", "dark:bg-gray-800", "dark:text-white", 3, "ngModelChange", "click", "focus", "keydown", "ngModel"], [1, "h-11", "w-full", "appearance-none", "rounded-lg", "border", "border-gray-300", "bg-transparent", "px-4", "pr-10", "text-sm", "text-gray-800", "focus:border-brand-300", "focus:outline-none", "focus:ring-3", "focus:ring-brand-500/10", "dark:border-gray-700", "dark:bg-gray-800", "dark:text-white", 3, "ngModelChange", "ngModel"], ["value", "recientes"], ["value", "antiguos"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "1.5", 1, "pointer-events-none", "absolute", "right-3", "top-1/2", "h-5", "w-5", "-translate-y-1/2", "text-gray-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M19.5 8.25l-7.5 7.5-7.5-7.5"], [1, "rounded-lg", "border", "border-gray-300", "bg-white", "px-4", "py-2.5", "text-sm", "font-medium", "text-gray-700", "transition", "hover:bg-gray-50", "dark:border-gray-700", "dark:bg-gray-800", "dark:text-gray-300", "dark:hover:bg-gray-700", 3, "click"], [1, "rounded-3xl", "border", "border-gray-200", "bg-white", "shadow-theme-xs", "dark:border-gray-800", "dark:bg-gray-900"], [1, "p-6", "text-sm", "text-gray-500", "dark:text-gray-400"], [1, "flex", "flex-col", "items-center", "justify-center", "px-6", "py-16", "text-center"], ["className", "max-w-2xl mx-4 sm:mx-auto", 3, "close", "isOpen"], [1, "p-6", "sm:p-8"], ["className", "max-w-4xl mx-4 sm:mx-auto", 3, "close", "isOpen"], [1, "mb-2", "text-lg", "font-semibold", "text-gray-800", "dark:text-white"], [1, "rounded-lg", "bg-brand-500", "px-4", "py-2.5", "text-sm", "font-medium", "text-white", "transition", "hover:bg-brand-600", 3, "click"], [1, "hidden", "overflow-x-auto", "lg:block"], [1, "w-full"], [1, "border-b", "border-gray-200", "text-left", "dark:border-gray-700"], [1, "px-6", "py-4", "text-xs", "font-semibold", "uppercase", "tracking-wider", "text-gray-500", "dark:text-gray-400"], [1, "px-6", "py-4", "text-right", "text-xs", "font-semibold", "uppercase", "tracking-wider", "text-gray-500", "dark:text-gray-400"], [1, "divide-y", "divide-gray-100", "dark:divide-gray-800"], [1, "transition", "hover:bg-gray-50", "dark:hover:bg-gray-800/50"], [1, "divide-y", "divide-gray-100", "lg:hidden", "dark:divide-gray-800"], [1, "space-y-3", "p-4"], [1, "whitespace-nowrap", "px-6", "py-4", "text-sm", "text-gray-600", "dark:text-gray-400"], [1, "whitespace-nowrap", "px-6", "py-4", "text-sm", "font-medium", "text-gray-800", "dark:text-white"], [1, "px-6", "py-4", "text-sm", "font-medium", "text-gray-800", "dark:text-white"], [1, "whitespace-nowrap", "px-6", "py-4"], [1, "inline-flex", "rounded-full", "px-3", "py-1", "text-xs", "font-semibold", "capitalize", 3, "ngClass"], [1, "inline-flex", "rounded-full", "px-3", "py-1", "text-xs", "font-semibold", 3, "ngClass"], [1, "whitespace-nowrap", "px-6", "py-4", "text-right"], [1, "flex", "items-center", "justify-end", "gap-2"], ["title", "Ver informaci\xF3n", 1, "rounded-lg", "p-2", "text-gray-500", "transition", "hover:bg-gray-100", "hover:text-gray-700", "dark:text-gray-400", "dark:hover:bg-gray-700", "dark:hover:text-white", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "1.5", 1, "h-5", "w-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M12 15.75A3.75 3.75 0 1012 8.25a3.75 3.75 0 000 7.5z"], ["title", "Ver imagen", 1, "rounded-lg", "p-2", "text-gray-500", "transition", "hover:bg-gray-100", "hover:text-gray-700", "dark:text-gray-400", "dark:hover:bg-gray-700", "dark:hover:text-white"], ["title", "Ver imagen", 1, "rounded-lg", "p-2", "text-gray-500", "transition", "hover:bg-gray-100", "hover:text-gray-700", "dark:text-gray-400", "dark:hover:bg-gray-700", "dark:hover:text-white", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M19.5 14.25v-7.5A2.25 2.25 0 0017.25 4.5H6.75A2.25 2.25 0 004.5 6.75v10.5A2.25 2.25 0 006.75 19.5h7.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M15.75 17.25h6m-3-3v6"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M7.5 14.25l2.25-2.25 2.25 2.25 2.25-3 1.5 2.25"], [1, "flex", "items-start", "justify-between", "gap-4"], [1, "min-w-0", "flex-1"], [1, "truncate", "text-sm", "font-semibold", "text-gray-800", "dark:text-white"], [1, "mt-1", "text-xs", "text-gray-500", "dark:text-gray-400"], [1, "shrink-0", "rounded-full", "px-2.5", "py-1", "text-xs", "font-semibold", 3, "ngClass"], [1, "inline-flex", "rounded-full", "bg-gray-100", "px-3", "py-1", "text-xs", "font-semibold", "text-gray-700", "dark:bg-white/10", "dark:text-gray-300"], [1, "mb-6"], [1, "text-xl", "font-semibold", "text-gray-900", "dark:text-white"], [1, "grid", "grid-cols-1", "gap-4", "sm:grid-cols-2"], [1, "rounded-2xl", "border", "border-gray-200", "bg-gray-50", "p-4", "dark:border-gray-700", "dark:bg-white/[0.04]"], [1, "text-xs", "font-semibold", "uppercase", "tracking-wide", "text-gray-500", "dark:text-gray-400"], [1, "mt-2", "text-sm", "font-semibold", "text-gray-900", "dark:text-white"], [1, "mt-2", "inline-flex", "rounded-full", "px-3", "py-1", "text-sm", "font-semibold", "capitalize", 3, "ngClass"], [1, "rounded-2xl", "border", "border-gray-200", "bg-gray-50", "p-4", "dark:border-gray-700", "dark:bg-white/[0.04]", "sm:col-span-2"], [1, "mt-2", "text-sm", "text-gray-700", "dark:text-gray-200"], [1, "overflow-hidden", "rounded-2xl", "border", "border-gray-200", "bg-gray-50", "p-3", "dark:border-gray-700", "dark:bg-white/[0.04]"], [1, "max-h-[70vh]", "w-full", "rounded-xl", "object-contain", 3, "src", "alt"]], template: function SupportHistoryComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275element(0, "app-page-breadcrumb", 2);
      \u0275\u0275elementStart(1, "div", 3)(2, "section", 4);
      \u0275\u0275element(3, "div", 5)(4, "div", 6);
      \u0275\u0275elementStart(5, "div", 7)(6, "div", 8)(7, "div", 9)(8, "div", 10);
      \u0275\u0275element(9, "img", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 12)(11, "h1", 13);
      \u0275\u0275text(12, "Historial de soporte");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "p", 14);
      \u0275\u0275text(14, "Consulta y da seguimiento a todos tus tickets de soporte.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(15, "div", 15)(16, "a", 16);
      \u0275\u0275text(17, " Volver a soporte ");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(18, "div", 17)(19, "div", 18)(20, "p", 19);
      \u0275\u0275text(21);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "p", 20);
      \u0275\u0275text(23, "Total");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "div", 18)(25, "p", 21);
      \u0275\u0275text(26);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "p", 20);
      \u0275\u0275text(28, "Abiertos");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "div", 18)(30, "p", 22);
      \u0275\u0275text(31);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "p", 20);
      \u0275\u0275text(33, "En proceso");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "div", 18)(35, "p", 23);
      \u0275\u0275text(36);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "p", 20);
      \u0275\u0275text(38, "Completados");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(39, "div", 24)(40, "div", 25)(41, "div", 26)(42, "button", 27);
      \u0275\u0275listener("click", function SupportHistoryComponent_Template_button_click_42_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setFilter("todos"));
      });
      \u0275\u0275text(43, "Todos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "button", 27);
      \u0275\u0275listener("click", function SupportHistoryComponent_Template_button_click_44_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setFilter("abierto"));
      });
      \u0275\u0275text(45, "Abiertos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "button", 27);
      \u0275\u0275listener("click", function SupportHistoryComponent_Template_button_click_46_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setFilter("en_proceso"));
      });
      \u0275\u0275text(47, "En proceso");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "button", 27);
      \u0275\u0275listener("click", function SupportHistoryComponent_Template_button_click_48_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setFilter("cerrado"));
      });
      \u0275\u0275text(49, "Completados");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(50, "div", 28)(51, "div", 29);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(52, "svg", 30);
      \u0275\u0275element(53, "path", 31);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(54, "input", 32);
      \u0275\u0275twoWayListener("ngModelChange", function SupportHistoryComponent_Template_input_ngModelChange_54_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(55, "div")(56, "input", 33, 0);
      \u0275\u0275twoWayListener("ngModelChange", function SupportHistoryComponent_Template_input_ngModelChange_56_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.dateFrom, $event) || (ctx.dateFrom = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("click", function SupportHistoryComponent_Template_input_click_56_listener() {
        \u0275\u0275restoreView(_r1);
        const dateFromInput_r2 = \u0275\u0275reference(57);
        return \u0275\u0275resetView(ctx.openDatePicker(dateFromInput_r2));
      })("focus", function SupportHistoryComponent_Template_input_focus_56_listener() {
        \u0275\u0275restoreView(_r1);
        const dateFromInput_r2 = \u0275\u0275reference(57);
        return \u0275\u0275resetView(ctx.openDatePicker(dateFromInput_r2));
      })("keydown", function SupportHistoryComponent_Template_input_keydown_56_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.preventDefault());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(58, "div")(59, "input", 33, 1);
      \u0275\u0275twoWayListener("ngModelChange", function SupportHistoryComponent_Template_input_ngModelChange_59_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.dateTo, $event) || (ctx.dateTo = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("click", function SupportHistoryComponent_Template_input_click_59_listener() {
        \u0275\u0275restoreView(_r1);
        const dateToInput_r3 = \u0275\u0275reference(60);
        return \u0275\u0275resetView(ctx.openDatePicker(dateToInput_r3));
      })("focus", function SupportHistoryComponent_Template_input_focus_59_listener() {
        \u0275\u0275restoreView(_r1);
        const dateToInput_r3 = \u0275\u0275reference(60);
        return \u0275\u0275resetView(ctx.openDatePicker(dateToInput_r3));
      })("keydown", function SupportHistoryComponent_Template_input_keydown_59_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.preventDefault());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(61, "div", 29)(62, "select", 34);
      \u0275\u0275twoWayListener("ngModelChange", function SupportHistoryComponent_Template_select_ngModelChange_62_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.sortOption, $event) || (ctx.sortOption = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementStart(63, "option", 35);
      \u0275\u0275text(64, "M\xC3\xA1s recientes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "option", 36);
      \u0275\u0275text(66, "M\xC3\xA1s antiguos");
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(67, "svg", 37);
      \u0275\u0275element(68, "path", 38);
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(69, "div", 15)(70, "button", 39);
      \u0275\u0275listener("click", function SupportHistoryComponent_Template_button_click_70_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.clearFilters());
      });
      \u0275\u0275text(71, " Limpiar campos ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(72, "div", 40);
      \u0275\u0275conditionalCreate(73, SupportHistoryComponent_Conditional_73_Template, 2, 0, "div", 41);
      \u0275\u0275conditionalCreate(74, SupportHistoryComponent_Conditional_74_Template, 5, 0, "div", 42);
      \u0275\u0275conditionalCreate(75, SupportHistoryComponent_Conditional_75_Template, 3, 0, "div", 42);
      \u0275\u0275conditionalCreate(76, SupportHistoryComponent_Conditional_76_Template, 24, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(77, "app-modal", 43);
      \u0275\u0275listener("close", function SupportHistoryComponent_Template_app_modal_close_77_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.closeTicketDetailModal());
      });
      \u0275\u0275conditionalCreate(78, SupportHistoryComponent_Conditional_78_Template, 42, 9, "div", 44);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(79, "app-modal", 45);
      \u0275\u0275listener("close", function SupportHistoryComponent_Template_app_modal_close_79_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.closeTicketImageModal());
      });
      \u0275\u0275conditionalCreate(80, SupportHistoryComponent_Conditional_80_Template, 8, 3, "div", 44);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_19_0;
      let tmp_21_0;
      \u0275\u0275advance(21);
      \u0275\u0275textInterpolate(ctx.summary.total);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.summary.abiertos);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.summary.enProceso);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.summary.cerrados);
      \u0275\u0275advance(6);
      \u0275\u0275classMap(ctx.activeFilter === "todos" ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700");
      \u0275\u0275advance(2);
      \u0275\u0275classMap(ctx.activeFilter === "abierto" ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700");
      \u0275\u0275advance(2);
      \u0275\u0275classMap(ctx.activeFilter === "en_proceso" ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700");
      \u0275\u0275advance(2);
      \u0275\u0275classMap(ctx.activeFilter === "cerrado" ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700");
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.dateFrom);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.dateTo);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.sortOption);
      \u0275\u0275advance(11);
      \u0275\u0275conditional(ctx.viewState === "loading" ? 73 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.viewState === "error" ? 74 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.viewState === "empty" || ctx.viewState === "data" && ctx.filteredTickets.length === 0 ? 75 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.viewState === "data" && ctx.filteredTickets.length > 0 ? 76 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("isOpen", ctx.selectedTicketDetail() !== null);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_19_0 = ctx.selectedTicketDetail()) ? 78 : -1, tmp_19_0);
      \u0275\u0275advance();
      \u0275\u0275property("isOpen", ctx.selectedTicketImage() !== null);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_21_0 = ctx.selectedTicketImage()) ? 80 : -1, tmp_21_0);
    }
  }, dependencies: [CommonModule, NgClass, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, RouterLink, PageBreadcrumbComponent, ModalComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SupportHistoryComponent, [{
    type: Component,
    args: [{ selector: "app-support-history", standalone: true, imports: [CommonModule, FormsModule, RouterLink, PageBreadcrumbComponent, ModalComponent], template: `<app-page-breadcrumb pageTitle="Historial de soporte" />

<div class="space-y-6">
  <section class="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)] dark:border-gray-800 dark:bg-white/[0.03]">
    <div class="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-brand-500/10 to-brand-600/5 blur-3xl"></div>
    <div class="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/5 blur-3xl"></div>

    <div class="relative p-6 sm:p-8">
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div class="flex items-start gap-4">
          <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 shadow-lg shadow-brand-500/25">
            <img class="h-7 w-7" src="/images/icons/ticket.svg" alt="">
          </div>
          <div class="min-w-0">
            <h1 class="text-xl font-semibold text-gray-800 dark:text-white/90 md:text-2xl lg:text-3xl">Historial de soporte</h1>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Consulta y da seguimiento a todos tus tickets de soporte.</p>
          </div>
        </div>

        <div class="flex justify-end">
          <a
            routerLink="/support"
            class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Volver a soporte
          </a>
        </div>
      </div>
    </div>
  </section>

  <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
    <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900">
      <p class="text-2xl font-semibold text-gray-800 dark:text-white">{{ summary.total }}</p>
      <p class="text-xs text-gray-500 dark:text-gray-400">Total</p>
    </div>
    <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900">
      <p class="text-2xl font-semibold text-sky-700 dark:text-sky-300">{{ summary.abiertos }}</p>
      <p class="text-xs text-gray-500 dark:text-gray-400">Abiertos</p>
    </div>
    <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900">
      <p class="text-2xl font-semibold text-amber-700 dark:text-amber-300">{{ summary.enProceso }}</p>
      <p class="text-xs text-gray-500 dark:text-gray-400">En proceso</p>
    </div>
    <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900">
      <p class="text-2xl font-semibold text-emerald-700 dark:text-emerald-300">{{ summary.cerrados }}</p>
      <p class="text-xs text-gray-500 dark:text-gray-400">Completados</p>
    </div>
  </div>

  <div class="rounded-3xl border border-gray-200 bg-white p-4 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900 lg:p-6">
    <div class="flex flex-col gap-4">
      <div class="flex flex-wrap gap-2">
        <button (click)="setFilter('todos')" [class]="activeFilter === 'todos' ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'" class="rounded-full px-4 py-2 text-sm font-medium transition">Todos</button>
        <button (click)="setFilter('abierto')" [class]="activeFilter === 'abierto' ? 'bg-sky-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'" class="rounded-full px-4 py-2 text-sm font-medium transition">Abiertos</button>
        <button (click)="setFilter('en_proceso')" [class]="activeFilter === 'en_proceso' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'" class="rounded-full px-4 py-2 text-sm font-medium transition">En proceso</button>
        <button (click)="setFilter('cerrado')" [class]="activeFilter === 'cerrado' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'" class="rounded-full px-4 py-2 text-sm font-medium transition">Completados</button>
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div class="relative">
          <svg class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input type="text" [(ngModel)]="searchQuery" placeholder="Buscar por asunto, folio o categor\xC3\xADa" class="h-11 w-full rounded-lg border border-gray-300 bg-transparent pl-10 pr-4 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500" />
        </div>

        <div>
          <input #dateFromInput type="date" [(ngModel)]="dateFrom" (click)="openDatePicker(dateFromInput)" (focus)="openDatePicker(dateFromInput)" (keydown)="$event.preventDefault()" class="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
        </div>

        <div>
          <input #dateToInput type="date" [(ngModel)]="dateTo" (click)="openDatePicker(dateToInput)" (focus)="openDatePicker(dateToInput)" (keydown)="$event.preventDefault()" class="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
        </div>

        <div class="relative">
          <select [(ngModel)]="sortOption" class="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 pr-10 text-sm text-gray-800 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
            <option value="recientes">M\xC3\xA1s recientes</option>
            <option value="antiguos">M\xC3\xA1s antiguos</option>
          </select>
          <svg class="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>

      <div class="flex justify-end">
        <button (click)="clearFilters()" class="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
          Limpiar campos
        </button>
      </div>
    </div>
  </div>

  <div class="rounded-3xl border border-gray-200 bg-white shadow-theme-xs dark:border-gray-800 dark:bg-gray-900">
    @if (viewState === 'loading') {
      <div class="p-6 text-sm text-gray-500 dark:text-gray-400">Cargando historial...</div>
    }

    @if (viewState === 'error') {
      <div class="flex flex-col items-center justify-center px-6 py-16 text-center">
        <h3 class="mb-2 text-lg font-semibold text-gray-800 dark:text-white">Error al cargar el historial</h3>
        <button (click)="loadHistory()" class="rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-600">
          Reintentar
        </button>
      </div>
    }

    @if (viewState === 'empty' || (viewState === 'data' && filteredTickets.length === 0)) {
      <div class="flex flex-col items-center justify-center px-6 py-16 text-center">
        <h3 class="mb-2 text-lg font-semibold text-gray-800 dark:text-white">No existe datos para mostrar</h3>
      </div>
    }

    @if (viewState === 'data' && filteredTickets.length > 0) {
      <div class="hidden overflow-x-auto lg:block">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 text-left dark:border-gray-700">
              <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Fecha</th>
              <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Folio</th>
              <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Asunto</th>
              <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Categor\xC3\xADa</th>
              <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Prioridad</th>
              <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Estatus</th>
              <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
            @for (ticket of filteredTickets; track ticket.id) {
              <tr class="transition hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{{ ticket.createdAt }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800 dark:text-white">{{ ticket.number }}</td>
                <td class="px-6 py-4 text-sm font-medium text-gray-800 dark:text-white">{{ ticket.title }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{{ ticket.category }}</td>
                <td class="whitespace-nowrap px-6 py-4">
                  <span class="inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize" [ngClass]="priorityClasses(ticket.priority)">
                    {{ ticket.priority }}
                  </span>
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                  <span class="inline-flex rounded-full px-3 py-1 text-xs font-semibold" [ngClass]="statusClasses(ticket.status)">
                    {{ statusLabel(ticket.status) }}
                  </span>
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      (click)="onViewTicketDetails(ticket)"
                      class="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      title="Ver informaci\xF3n">
	                      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
	                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" />
	                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15.75A3.75 3.75 0 1012 8.25a3.75 3.75 0 000 7.5z" />
	                      </svg>
                    </button>
                    @if (ticket.hasImage) {
                      <button
                        (click)="onViewTicketImage(ticket)"
                        class="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        title="Ver imagen">
	                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
	                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-7.5A2.25 2.25 0 0017.25 4.5H6.75A2.25 2.25 0 004.5 6.75v10.5A2.25 2.25 0 006.75 19.5h7.5" />
	                          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25h6m-3-3v6" />
	                          <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25l2.25-2.25 2.25 2.25 2.25-3 1.5 2.25" />
	                        </svg>
                      </button>
                    }
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <div class="divide-y divide-gray-100 lg:hidden dark:divide-gray-800">
        @for (ticket of filteredTickets; track ticket.id) {
          <div class="space-y-3 p-4">
            <div class="flex items-start justify-between gap-4">
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-semibold text-gray-800 dark:text-white">{{ ticket.title }}</p>
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">{{ ticket.number }} \xC2\xB7 {{ ticket.createdAt }}</p>
              </div>
              <span class="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold" [ngClass]="statusClasses(ticket.status)">
                {{ statusLabel(ticket.status) }}
              </span>
            </div>
            <div class="flex flex-wrap gap-2">
              <span class="inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize" [ngClass]="priorityClasses(ticket.priority)">
                {{ ticket.priority }}
              </span>
              <span class="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-white/10 dark:text-gray-300">
                {{ ticket.category }}
              </span>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                (click)="onViewTicketDetails(ticket)"
                class="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                title="Ver informaci\xF3n">
	                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
	                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-7.5A2.25 2.25 0 0017.25 4.5H6.75A2.25 2.25 0 004.5 6.75v10.5A2.25 2.25 0 006.75 19.5h7.5" />
	                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25h6m-3-3v6" />
	                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25l2.25-2.25 2.25 2.25 2.25-3 1.5 2.25" />
	                  </svg>
              </button>
              @if (ticket.hasImage) {
                <button
                  (click)="onViewTicketImage(ticket)"
                  class="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  title="Ver imagen">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 15.75A3.75 3.75 0 1012 8.25a3.75 3.75 0 000 7.5z" />
                  </svg>
                </button>
              }
            </div>
          </div>
        }
      </div>
    }
  </div>
</div>

<app-modal [isOpen]="selectedTicketDetail() !== null" (close)="closeTicketDetailModal()" className="max-w-2xl mx-4 sm:mx-auto">
  @if (selectedTicketDetail(); as detail) {
    <div class="p-6 sm:p-8">
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Detalle del ticket</h2>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ detail.folio }}</p>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-white/[0.04]">
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Asunto</p>
          <p class="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{{ detail.asunto }}</p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-white/[0.04]">
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Estatus</p>
          <p class="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{{ detail.estatus }}</p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-white/[0.04]">
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Categor\xC3\xADa</p>
          <p class="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{{ detail.categoria }}</p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-white/[0.04]">
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Prioridad</p>
          <span class="mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold capitalize" [ngClass]="priorityClasses(detail.prioridad)">
            {{ detail.prioridad }}
          </span>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-white/[0.04] sm:col-span-2">
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Descripci\xC3\xB3n</p>
          <p class="mt-2 text-sm text-gray-700 dark:text-gray-200">{{ detail.descripcion }}</p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-white/[0.04]">
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Creado</p>
          <p class="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{{ detail.fechaCreacion }}</p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-white/[0.04]">
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Actualizado</p>
          <p class="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{{ detail.fechaActualizacion }}</p>
        </div>
      </div>
    </div>
  }
</app-modal>

<app-modal [isOpen]="selectedTicketImage() !== null" (close)="closeTicketImageModal()" className="max-w-4xl mx-4 sm:mx-auto">
  @if (selectedTicketImage(); as image) {
    <div class="p-6 sm:p-8">
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Imagen del ticket</h2>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ image.nombreArchivo }}</p>
      </div>
      <div class="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-white/[0.04]">
        <img [src]="selectedTicketImageSrc" [alt]="image.nombreArchivo" class="max-h-[70vh] w-full rounded-xl object-contain" />
      </div>
    </div>
  }
</app-modal>
\r
` }]
  }], () => [{ type: SupportDataService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SupportHistoryComponent, { className: "SupportHistoryComponent", filePath: "src/app/pages/support/support-history.component.ts", lineNumber: 20 });
})();

// src/app/pages/support/support.routes.ts
var SUPPORT_ROUTES = [
  {
    path: "",
    pathMatch: "full",
    component: SupportPageComponent,
    title: "Soporte"
  },
  {
    path: "history",
    component: SupportHistoryComponent,
    title: "Historial de soporte"
  }
];
export {
  SUPPORT_ROUTES
};
//# sourceMappingURL=chunk-X62P7QVP.js.map
