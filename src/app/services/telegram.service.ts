import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  // private botToken: string = '6787120111:AAHNxq2H4eKoKUFmuDErzqXBBvupLp-UPgE';
  private botToken: string = '6731621412:AAFaZOqAPDFdq9D9dIfDtkZuVsGeI01V_Rc';
  private apiUrl: string = `https://api.telegram.org/bot${this.botToken}/sendMessage`;

  constructor(private http: HttpClient) {}

   sendMessage( text: string) {

      const payload = {
        // chat_id: encodeURIComponent('-1001955593064'),
        chat_id: encodeURIComponent('-4090991684'),
        // text: encodeURIComponent(text),
        text:text
      };

     return this.http.post(this.apiUrl, payload);

  }
}

