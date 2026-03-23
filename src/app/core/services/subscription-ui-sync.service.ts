import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SubscriptionUiSyncService {
  private readonly planChangedSubject = new Subject<void>();

  readonly planChanged$ = this.planChangedSubject.asObservable();

  notifyPlanChanged(): void {
    this.planChangedSubject.next();
  }
}

