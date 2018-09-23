import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Manufacturer } from '../models/manufacturer.interface';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  manufacturerCollection$: AngularFirestoreCollection<Manufacturer>;

  constructor(private afs: AngularFirestore) {
    this.manufacturerCollection$ = this.afs.collection('manufacturers');
  }

  get(): Observable<Manufacturer[]> {
    return this.manufacturerCollection$.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => ({ uid: action.payload.doc.id, ...action.payload.doc.data() }));
      })
    );
  }

  post(content: Manufacturer) {
    this.afs.collection('manufacturers').add(content);
  }

  put(uid: string, content: Manufacturer) {
    this.afs.collection('manufacturers').doc(uid).set(content);
  }

  delete(uid: string) {
    this.afs.collection('manufacturers').doc(uid).delete();
  }
}
