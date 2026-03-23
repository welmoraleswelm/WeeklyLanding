import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeToggleTwoComponent } from '../../components/common/theme-toggle-two/theme-toggle-two.component';

@Component({
  selector: 'app-auth-page-layout',
  imports: [
    RouterModule,
    ThemeToggleTwoComponent,
  ],
  templateUrl: './auth-page-layout.component.html',
  styles: `
    :host {
      display: block;
      --auth-bg:         #f1f5f9;
      --auth-left-bg:    #e8edf5;
      --auth-right-bg:   #ffffff;
      --auth-border:     #e2e8f0;
      --auth-shadow:     rgba(0,0,0,0.10);
      --auth-glow:       rgba(59,130,246,0.08);
      --auth-name:       #1e293b;
      --auth-title:      #0f172a;
      --auth-sub:        #64748b;
      --auth-feat-title: #374151;
      --auth-feat-desc:  #94a3b8;
      --auth-sep:        #e2e8f0;
      --auth-url:        #cbd5e1;
    }

    :host-context(.dark) {
      --auth-bg:         #1c1c24;
      --auth-left-bg:    #20202c;
      --auth-right-bg:   #181822;
      --auth-border:     #2e2e3a;
      --auth-shadow:     rgba(0,0,0,0.50);
      --auth-glow:       rgba(59,130,246,0.13);
      --auth-name:       #e2e8f0;
      --auth-title:      #f1f5f9;
      --auth-sub:        #6b7280;
      --auth-feat-title: #d1d5db;
      --auth-feat-desc:  #4b5563;
      --auth-sep:        #2a2a38;
      --auth-url:        #4a4a5e;
    }

    .auth-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: var(--auth-bg);
      position: relative;
      padding: 40px 20px;
      transition: background 0.3s;
    }

    .grain {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      opacity: 0.045;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size: 160px;
    }

    .auth-card {
      display: flex;
      width: 100%;
      max-width: 860px;
      min-height: 540px;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid var(--auth-border);
      box-shadow: 0 24px 64px var(--auth-shadow);
      position: relative;
      z-index: 1;
      align-items: stretch;
    }

    .auth-left {
      display: flex;
      width: 42%;
      flex-shrink: 0;
      flex-direction: column;
      justify-content: space-between;
      padding: 44px 48px;
      background: var(--auth-left-bg);
      border-right: 1px solid var(--auth-border);
      position: sticky;
      top: 0;
      max-height: calc(100vh - 96px);
      overflow: hidden;
      transition: background 0.3s, border-color 0.3s;
    }

    .glow-tr {
      position: absolute;
      width: 340px; height: 340px;
      border-radius: 50%;
      background: radial-gradient(circle, var(--auth-glow) 0%, transparent 70%);
      top: -100px; right: -100px;
      pointer-events: none;
    }

    .glow-bl {
      position: absolute;
      width: 220px; height: 220px;
      border-radius: 50%;
      background: radial-gradient(circle, var(--auth-glow) 0%, transparent 70%);
      bottom: -70px; left: -70px;
      pointer-events: none;
    }

    .auth-left-top { position: relative; z-index: 1; }
    .auth-left-bottom { position: relative; z-index: 1; }

    .brand-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 48px;
    }

    .brand-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: #3b82f6;
      box-shadow: 0 0 8px rgba(59,130,246,0.5);
    }

    .brand-name {
      font-size: 14px;
      font-weight: 600;
      color: var(--auth-name);
      letter-spacing: 0.3px;
    }

    .welcome-title {
      font-size: 30px;
      font-weight: 600;
      color: var(--auth-title);
      line-height: 1.25;
      letter-spacing: -0.5px;
      margin-bottom: 12px;
    }

    .welcome-sub {
      font-size: 13px;
      color: var(--auth-sub);
      line-height: 1.7;
    }

    .features-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 32px;
    }

    .feat-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .feat-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: #3b82f6;
      opacity: 0.7;
      flex-shrink: 0;
      margin-top: 5px;
    }

    .feat-title {
      font-size: 13px;
      font-weight: 500;
      color: var(--auth-feat-title);
      margin-bottom: 3px;
    }

    .feat-desc {
      font-size: 12px;
      color: var(--auth-feat-desc);
      line-height: 1.5;
    }

    .left-sep {
      height: 1px;
      background: var(--auth-sep);
      margin-bottom: 14px;
    }

    .site-url {
      font-size: 11px;
      color: var(--auth-url);
    }

    .auth-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px 52px;
      background: var(--auth-right-bg);
      transition: background 0.3s;
    }
  `
})
export class AuthPageLayoutComponent {
  @Input() showLeft = false;
}
