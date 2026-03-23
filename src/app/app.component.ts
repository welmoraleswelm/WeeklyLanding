import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GlobalUploadNotificationDockComponent } from './shared/components/common/global-upload-notification-dock/global-upload-notification-dock.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    GlobalUploadNotificationDockComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Weekly';
}
