import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface PlanFeature {
  id_plan?: number;
  texto: string;
  orden: number;
  activo: boolean;
}

export interface PlanOption {
  id_plan: number;
  nombre: string;
  tipo_periodo: 'mensual' | 'anual';
  costo: number;
  moneda: string;
  limite_busquedas: number;
  tickets_generados: number;
  facturas_emitidas: number;
  tickets_almacenados: number;
  descripcion: string;
  estatus: string;
  caracteristicas: PlanFeature[];
}

@Component({
  selector: 'app-change-plan-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './change-plan-modal.component.html',
})
export class ChangePlanModalComponent {
  @Input() open = false;
  @Input() plans: PlanOption[] = [];
  @Input() currentPlanId: number | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() selectPlan = new EventEmitter<PlanOption>();

  onClose(): void {
    this.close.emit();
  }

  onSelect(plan: PlanOption): void {
    if (plan.id_plan === this.currentPlanId) {
      return;
    }
    this.selectPlan.emit(plan);
  }

  getCostLabel(plan: PlanOption): string {
    const amount = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: plan.moneda,
      maximumFractionDigits: 0,
    }).format(plan.costo);
    const periodo = plan.tipo_periodo === 'anual' ? '/año' : '/mes';
    return `${amount} ${periodo}`;
  }
}
