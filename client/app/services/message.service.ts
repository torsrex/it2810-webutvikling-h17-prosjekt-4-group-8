//Observer service, used to let the product-details component notify the products component when the list should be re-rendered.

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {
  private subject = new Subject<any>();
  private idSubject = new Subject<any>();

  sendCoords(lat, lng) {
    this.subject.next({ text: [lat, lng] });
  }

  sendID(id) {
    this.idSubject.next({ text: id });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  getID(): Observable<any> {
    return this.idSubject.asObservable();
  }
}
