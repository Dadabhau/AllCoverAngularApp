import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionTimeoutService {
  private timeoutId: any;

  constructor() {}
  resetTimer(): void {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      // Call a logout function or perform any other desired action on session timeout
      // For example, you can emit an event to notify other components
      // this.logout(); or this.timeoutExpired.emit();
    }, 900000); // 15 minutes in milliseconds
  }

  stopTimer(): void {
    clearTimeout(this.timeoutId);
  }
}
