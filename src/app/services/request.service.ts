import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Request } from '../models/request.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  requestCollection: AngularFirestoreCollection<Request>;

  constructor(private afs: AngularFirestore) {
    this.requestCollection = this.afs.collection('requests');
  }

  getData(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.requestCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { uid: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getById(uid: string) {
    return this.afs.doc<Request>(`requests/${uid}`);
  }

  create(req: Request) {
    return this.requestCollection.add(req);
  }

  update(uid: string, data: any) {
    return this.getById(uid).update(data);
  }

  delete(uid: string) {
    return this.getById(uid).delete();
  }
}
