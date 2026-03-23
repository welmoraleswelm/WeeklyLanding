import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlanInfo } from '../../data/wallet.models';

@Component({
  selector: 'app-header-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderSummaryComponent {
  @Input({ required: true }) plan!: PlanInfo;
}
