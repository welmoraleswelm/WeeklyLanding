import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportChatPanelComponent } from '../support-chat-panel/support-chat-panel.component';
import { SupportChatService } from '../../services/support-chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-support-chat-fab',
  standalone: true,
  imports: [CommonModule, SupportChatPanelComponent],
  templateUrl: './support-chat-fab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportChatFabComponent {
  @Input() contextMessage = '';

  readonly open$: Observable<boolean>;

  constructor(private readonly chatService: SupportChatService) {
    this.open$ = this.chatService.open$;
  }

  openChat(): void {
    this.chatService.openChat(this.contextMessage);
  }

  closeChat(): void {
    this.chatService.closeChat();
  }
}
