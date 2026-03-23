import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GuideItem } from '../../data/guides.data';

@Component({
  selector: 'app-guides',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guides.component.html',
})
export class GuidesComponent {
  @Input() guides: GuideItem[] = [];
  @Input() activeGuide: GuideItem | null = null;
  @Output() selectGuide = new EventEmitter<GuideItem>();

  onSelect(guide: GuideItem): void {
    this.selectGuide.emit(guide);
  }
}
