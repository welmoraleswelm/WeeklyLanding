import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-support-header-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './support-header-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportHeaderCardComponent {
  @Input() query = '';
  @Input() averageResponseTimeLabel = 'Sin datos';
  @Output() queryChange = new EventEmitter<string>();

  onInput(value: string): void {
    this.queryChange.emit(value);
  }
}
