import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ChatMessage {
  id: string;
  author: 'user' | 'bot';
  content: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupportChatService {
  private readonly openSubject = new BehaviorSubject<boolean>(false);
  private readonly messagesSubject = new BehaviorSubject<ChatMessage[]>([]);

  readonly open$ = this.openSubject.asObservable();
  readonly messages$ = this.messagesSubject.asObservable();

  openChat(contextMessage?: string): void {
    this.openSubject.next(true);
    if (contextMessage) {
      const existing = this.messagesSubject.getValue();
      if (!existing.length) {
        this.addMessage('bot', contextMessage);
      }
    }
  }

  closeChat(): void {
    this.openSubject.next(false);
  }

  sendMessage(text: string): void {
    const trimmed = text.trim();
    if (!trimmed) return;
    this.addMessage('user', trimmed);
    this.addMessage('bot', 'Gracias, ya estoy revisando tu solicitud.');
  }

  private addMessage(author: 'user' | 'bot', content: string): void {
    const next: ChatMessage = {
      id: `${author}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      author,
      content,
      timestamp: new Date().toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    this.messagesSubject.next([...this.messagesSubject.getValue(), next]);
  }
}
