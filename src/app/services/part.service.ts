import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Part } from './../models/part.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartService {

  partCollection: AngularFirestoreCollection<Part>;

  constructor(private afs: AngularFirestore) {
    this.partCollection = this.afs.collection('parts');
  }

  get(): Observable<Part[]> {
    return this.partCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => ({ uid: action.payload.doc.id, ...action.payload.doc.data() }));
      })
    );
  }

  post(content: Part) {
    this.afs.collection('parts').add(content);
  }

  put(uid: string, content: Part) {
    this.afs.collection('parts').doc(uid).set(content);
  }

  delete(uid: string) {
    this.afs.collection('parts').doc(uid).delete();
  }
}
