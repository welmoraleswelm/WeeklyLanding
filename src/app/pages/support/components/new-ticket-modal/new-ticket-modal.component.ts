import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalComponent } from '../../../../shared/components/ui/modal/modal.component';

export interface NewTicketData {
  title: string;
  description: string;
  category: string;
  priority: string;
  image: File | null;
}

export type TicketCategory =
  | 'facturacion'
  | 'tecnico'
  | 'cuenta'
  | 'otro';

export type TicketPriority = 'baja' | 'media' | 'alta' | 'urgente';

@Component({
  selector: 'app-new-ticket-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './new-ticket-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTicketModalComponent {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitTicket = new EventEmitter<NewTicketData>();

  readonly form: FormGroup;
  readonly selectedImage = signal<File | null>(null);
  readonly isDragging = signal(false);
  readonly isSubmitting = signal(false);

  readonly categories: { value: TicketCategory; label: string; icon: string }[] = [
    { value: 'facturacion', label: 'Facturación', icon: 'receipt' },
    { value: 'tecnico', label: 'Soporte técnico', icon: 'wrench' },
    { value: 'cuenta', label: 'Mi cuenta', icon: 'user' },
    { value: 'otro', label: 'Otro', icon: 'help' },
  ];

  readonly priorities: { value: TicketPriority; label: string; color: string }[] = [
    { value: 'baja', label: 'Baja', color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300' },
    { value: 'media', label: 'Media', color: 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300' },
    { value: 'alta', label: 'Alta', color: 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300' },
    { value: 'urgente', label: 'Urgente', color: 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300' },
  ];

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(2000)]],
      category: ['', Validators.required],
      priority: ['media', Validators.required],
    });
  }

  onClose(): void {
    this.resetForm();
    this.closeModal.emit();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    const droppedFiles = event.dataTransfer?.files;
    if (droppedFiles) {
      this.addFiles(droppedFiles);
    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(input.files);
    }
    input.value = '';
  }

  private addFiles(fileList: FileList): void {
    const validExtensions = ['.png', '.jpg', '.jpeg', '.webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    const candidate = Array.from(fileList).find((file) => {
      const extension = '.' + file.name.split('.').pop()?.toLowerCase();
      const isValidExtension = validExtensions.includes(extension);
      const isImage = file.type.startsWith('image/');
      const isValidSize = file.size <= maxSize;
      return isValidExtension && isImage && isValidSize;
    });

    if (candidate) {
      this.selectedImage.set(candidate);
    }
  }

  removeFile(): void {
    this.selectedImage.set(null);
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  getFileIcon(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'webp':
        return 'image';
      default:
        return 'file';
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid || this.isSubmitting()) return;

    this.isSubmitting.set(true);

    // Simular delay de envío
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const ticketData: NewTicketData = {
      ...this.form.value,
      image: this.selectedImage(),
    };

    this.submitTicket.emit(ticketData);
    this.isSubmitting.set(false);
    this.resetForm();
    this.closeModal.emit();
  }

  private resetForm(): void {
    this.form.reset({ priority: 'media' });
    this.selectedImage.set(null);
  }

  get titleError(): string {
    const control = this.form.get('title');
    if (control?.hasError('required')) return 'El título es requerido';
    if (control?.hasError('minlength')) return 'Mínimo 5 caracteres';
    if (control?.hasError('maxlength')) return 'Máximo 100 caracteres';
    return '';
  }

  get descriptionError(): string {
    const control = this.form.get('description');
    if (control?.hasError('required')) return 'La descripción es requerida';
    if (control?.hasError('minlength')) return 'Mínimo 20 caracteres';
    if (control?.hasError('maxlength')) return 'Máximo 2000 caracteres';
    return '';
  }
}
