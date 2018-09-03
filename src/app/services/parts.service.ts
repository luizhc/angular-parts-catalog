import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Group } from '../parts-form/parts-form.component';

@Injectable({
  providedIn: 'root'
})
export class PartsService {
  partsCollection: AngularFirestoreCollection<any>;
  groupsCollection: AngularFirestoreCollection<Group>;

  constructor(private afs: AngularFirestore) {
    this.partsCollection = this.afs.collection('parts', (ref) => ref.orderBy('time', 'desc').limit(5));

    this.groupsCollection = this.afs.collection('groups', (ref) => ref.orderBy('time', 'desc').limit(5));
  }

  getData(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.partsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getPart(id: string) {
    return this.afs.doc<any>(`parts/${id}`);
  }

  getGroups(): Observable<Group[]> {
    return this.groupsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  createPart(content: string) {
    const note = {
      content,
      hearts: 0,
      time: new Date().getTime(),
    };
    return this.partsCollection.add(note);
  }

  updatePart(id: string, data: any) {
    return this.getPart(id).update(data);
  }

  deletePart(id: string) {
    return this.getPart(id).delete();
  }
}
