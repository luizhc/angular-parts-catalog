import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { UsersService } from './users.service';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.interface';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(private afAuth: AngularFireAuth, private _userService: UsersService, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
   }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(credential => {
        this._userService.createUserData(credential.user); // if using firestore
      });
  }

  logOut() {
    this.afAuth.auth.signOut();
  }
}
