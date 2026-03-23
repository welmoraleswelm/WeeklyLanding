import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalResourceItem } from '../../services/support-data.service';

@Component({
  selector: 'app-legal-resources-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './legal-resources-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegalResourcesCardComponent {
  @Input() resources: LegalResourceItem[] = [];

  selectedResource: LegalResourceItem | null = null;

  openResourceModal(resource: LegalResourceItem): void {
    this.selectedResource = resource;
  }

  closeResourceModal(): void {
    this.selectedResource = null;
  }

  get sampleText(): string {
    if (!this.selectedResource) return '';

    return `Este es un texto de ejemplo para "${this.selectedResource.title}". Puedes reemplazarlo por el contenido legal real cuando esté disponible.`;
  }
}
