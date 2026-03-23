import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqItem } from '../../models/faq.model';

@Component({
  selector: 'app-faq-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqCardComponent {
  @Input() faqs: FaqItem[] = [];

  query = '';
  readonly openIds = signal<Set<string>>(new Set());

  get filteredFaqs(): FaqItem[] {
    const query = this.query.trim().toLowerCase();
    if (!query) return this.faqs;
    return this.faqs.filter((faq) =>
      `${faq.question} ${faq.answer} ${faq.category}`.toLowerCase().includes(query)
    );
  }

  onQueryChange(value: string): void {
    this.query = value;
  }

  toggleFaq(id: string): void {
    const currentIds = new Set(this.openIds());
    if (currentIds.has(id)) {
      currentIds.delete(id);
    } else {
      currentIds.add(id);
    }
    this.openIds.set(currentIds);
  }

  isOpen(id: string): boolean {
    return this.openIds().has(id);
  }

  getCategoryColor(category: string): string {
    switch (category.toLowerCase()) {
      case 'estado':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300';
      case 'subidas':
        return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300';
      case 'acciones':
        return 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300';
      case 'pagos':
        return 'bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-300';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
    }
  }
}

