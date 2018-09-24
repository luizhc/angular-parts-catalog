import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { UserInfo } from 'firebase';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private afs: AngularFirestore) { }

  public createUserData(authUser: UserInfo) {
    // sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${authUser.uid}`);
    const data: User = {
      uid: authUser.uid,
      email: authUser.email,
      displayName: authUser.displayName || 'nameless',
      createdAt: new Date()
    };
    userRef.set(data, { merge: true });
  }
}
