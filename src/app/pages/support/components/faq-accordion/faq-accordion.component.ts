import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaqItem } from '../../data/faq.data';

@Component({
  selector: 'app-faq-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-accordion.component.html',
})
export class FaqAccordionComponent {
  @Input() faqs: FaqItem[] = [];
  @Input() query = '';
  @Input() openId: string | null = null;
  @Output() queryChange = new EventEmitter<string>();
  @Output() toggle = new EventEmitter<string>();

  onInput(value: string): void {
    this.queryChange.emit(value);
  }

  onToggle(id: string): void {
    this.toggle.emit(id);
  }
}
