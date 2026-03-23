import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { KeywordArticle } from '../../data/keywords.data';

interface ChatMessage {
  id: string;
  author: 'user' | 'ai';
  text: string;
}

interface SuggestedArticle {
  id: string;
  title: string;
  url: string;
}

@Component({
  selector: 'app-ai-support-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-support-widget.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiSupportWidgetComponent {
  @Input() keywords: KeywordArticle[] = [];

  inputValue = '';
  messages: ChatMessage[] = [
    {
      id: 'ai-1',
      author: 'ai',
      text: 'Hola, soy tu asistente. Describe tu problema y te sugiero artículos útiles.',
    },
  ];
  suggestions: SuggestedArticle[] = [];

  onInput(value: string): void {
    this.inputValue = value;
  }

  send(): void {
    const text = this.inputValue.trim();
    if (!text) return;
    this.messages = [...this.messages, { id: `u-${Date.now()}`, author: 'user', text }];
    this.inputValue = '';
    this.generateSuggestions(text);
  }

  private generateSuggestions(text: string): void {
    const lower = text.toLowerCase();
    const matched = this.keywords
      .filter((article) => article.keywords.some((k) => lower.includes(k)))
      .slice(0, 3)
      .map((article) => ({ id: article.id, title: article.title, url: article.url }));

    this.suggestions = matched.length ? matched : this.keywords.slice(0, 2).map((article) => ({
      id: article.id,
      title: article.title,
      url: article.url,
    }));

    this.messages = [
      ...this.messages,
      {
        id: `ai-${Date.now()}`,
        author: 'ai',
        text: matched.length
          ? 'Encontré artículos que podrían ayudarte. ¿Quieres revisar alguno?'
          : 'No encontré coincidencias exactas, pero aquí hay recursos recomendados.',
      },
    ];
  }
}
