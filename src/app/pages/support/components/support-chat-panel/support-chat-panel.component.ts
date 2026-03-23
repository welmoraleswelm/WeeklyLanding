import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportChatService } from '../../services/support-chat.service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ChatMessage } from '../../services/support-chat.service';

@Component({
  selector: 'app-support-chat-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support-chat-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportChatPanelComponent {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();

  message = '';
  readonly messages$: Observable<ChatMessage[]>;

  constructor(private readonly chatService: SupportChatService) {
    this.messages$ = this.chatService.messages$;
  }

  onSend(): void {
    if (!this.message.trim()) return;

    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  onClose(): void {
    this.close.emit();
  }
}
