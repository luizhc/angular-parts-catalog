import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Customer } from '../models/Customer.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerCollection$: AngularFirestoreCollection<Customer>;

  constructor(private afs: AngularFirestore) {
    this.customerCollection$ = this.afs.collection('customers');
  }

  get(): Observable<Customer[]> {
    return this.customerCollection$.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => ({ uid: action.payload.doc.id, ...action.payload.doc.data() }));
      })
    );
  }

  post(content: Customer) {
    this.afs.collection('customers').add(content);
  }

  put(uid: string, content: Customer) {
    this.afs.collection('customers').doc(uid).set(content);
  }

  delete(uid: string) {
    this.afs.collection('customers').doc(uid).delete();
  }
}
