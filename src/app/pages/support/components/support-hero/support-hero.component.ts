import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-support-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './support-hero.component.html',
})
export class SupportHeroComponent {
  @Input() query = '';
  @Input() resultsCount = 0;
  @Output() queryChange = new EventEmitter<string>();

  onInput(value: string): void {
    this.queryChange.emit(value);
  }
}
