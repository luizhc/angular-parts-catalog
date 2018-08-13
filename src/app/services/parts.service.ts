import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Modelos } from '../parts-form/parts-form.component';
import { Fabricantes } from './../parts-form/parts-form.component';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class PartsService {
  private _urlModelos = 'assets/json/modelos-carros.json';
  private _urlFabricantes = 'assets/json/fabricantes-carros.json';

  partsCollection: AngularFirestoreCollection<any>;
  noteDocument:   AngularFirestoreDocument<any>;

  constructor(private afs: AngularFirestore, private _httpClient: HttpClient) {
    this.partsCollection = this.afs.collection('parts', (ref) => ref.orderBy('time', 'desc').limit(5));
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

  getModelos() {
    return this._httpClient.get<Modelos[]>(this._urlModelos);
  }

  getFabricantes() {
    return this._httpClient.get<Fabricantes[]>(this._urlFabricantes);
  }

  getPart(id: string) {
    return this.afs.doc<any>(`parts/${id}`);
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
