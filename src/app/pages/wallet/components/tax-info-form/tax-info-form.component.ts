import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaxInfo } from '../../data/wallet.models';

interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-tax-info-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tax-info-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaxInfoFormComponent implements OnChanges {
  private fb = inject(FormBuilder);

  @Input() taxInfo?: TaxInfo;
  @Output() save = new EventEmitter<TaxInfo>();

  isSaving = false;
  successMessage = '';

  readonly usoCfdiOptions: SelectOption[] = [
    { label: 'G03 - Gastos en general', value: 'G03 - Gastos en general' },
    { label: 'G01 - Adquisición de mercancías', value: 'G01 - Adquisición de mercancías' },
    { label: 'I01 - Construcciones', value: 'I01 - Construcciones' },
    { label: 'P01 - Por definir', value: 'P01 - Por definir' },
  ];

  form = this.fb.group({
    rfc: ['', Validators.required],
    razonSocial: ['', Validators.required],
    usoCfdi: ['', Validators.required],
    emailFacturacion: ['', [Validators.required, Validators.email]],
    domicilioFiscal: [''],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taxInfo'] && this.taxInfo) {
      this.form.patchValue(this.taxInfo);
    }
  }

  submit(): void {
    if (this.form.invalid || this.isSaving) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.successMessage = '';

    const value = this.form.getRawValue() as TaxInfo;

    setTimeout(() => {
      this.isSaving = false;
      this.successMessage = 'Datos fiscales guardados correctamente.';
      this.save.emit(value);
    }, 700);
  }
}