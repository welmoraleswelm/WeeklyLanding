import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuideItem } from '../../models/guide.model';

@Component({
  selector: 'app-guides-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guides-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuidesCardComponent {
  @Input() guides: GuideItem[] = [];
  @Output() guideClick = new EventEmitter<GuideItem>();

  onGuideClick(guide: GuideItem): void {
    this.guideClick.emit(guide);
  }

  getIconColor(icon: string): string {
    switch (icon) {
      case 'check':
        return 'from-emerald-500 to-teal-500';
      case 'status':
        return 'from-blue-500 to-cyan-500';
      case 'alert':
        return 'from-rose-500 to-pink-500';
      default:
        return 'from-brand-500 to-brand-600';
    }
  }
}
