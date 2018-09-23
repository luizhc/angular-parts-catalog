import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Group } from '../product/product.component';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productCollection: AngularFirestoreCollection<Product>;
  groupsCollection: AngularFirestoreCollection<Group>;

  constructor(private afs: AngularFirestore) {
    this.productCollection = this.afs.collection('products');

    this.groupsCollection = this.afs.collection('groups');
  }

  getData(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.productCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { uid: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getPart(uid: string) {
    return this.afs.doc<any>(`products/${uid}`);
  }

  getGroups(): Observable<Group[]> {
    return this.groupsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => ({ uid: action.payload.doc.id, ...action.payload.doc.data() }));
      })
    );
  }

  createProduct(product: Product) {
    return this.productCollection.add(product);
  }

  updateProduct(uid: string, data: any) {
    return this.getPart(uid).update(data);
  }

  deleteProduct(uid: string) {
    return this.getPart(uid).delete();
  }
}
