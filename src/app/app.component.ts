import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // deferredPrompt: any;

  // ngOnInit() {
  //   if ('serviceWorker' in navigator) {
  //     window.addEventListener('load', () => {
  //       navigator.serviceWorker.register('/ngsw-worker.js').then(registration => {
  //         registration.update();
  //       }).catch(error => {
  //         console.log('ServiceWorker registration failed: ', error);
  //       });
  //     });
  //   }

  //   window.addEventListener('beforeinstallprompt', (event) => {
  //     event.preventDefault();
  //     this.deferredPrompt = event;
  //     // You can display an "Add to Home Screen" button here

  //   });
  // }

  // installApp() {
  //   if (this.deferredPrompt) {
  //     this.deferredPrompt.prompt();
  //     this.deferredPrompt.userChoice
  //       .then((choiceResult: any) => {
  //         if (choiceResult.outcome === 'accepted') {
  //           console.log('User accepted the A2HS prompt');
  //         }
  //         this.deferredPrompt = null;
  //       });
  //   }
  // }

}
