import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPresent } from './present.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  get presentsCollection() {
    return this.afs.collection<IPresent>('presents',
    (ref) => ref.where('userID', '==', this.user.uid).orderBy('thanked'));
  }

  get presents(): Observable<IPresent[]> {
    return this.presentsCollection.snapshotChanges()
      .pipe(map(this.collectionID));
  }

  collectionID(docChangeAction) {
    return docChangeAction.map((a) => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return { id, ...data};
    });
  }

  get user() {
    return this.afAuth.auth.currentUser;
  }

  get isLoggedIn() {
    return (this.user) ? true : false;
  }

  register(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => this.router.navigate(['login']))
      .catch((error) => console.log('An error occured logging out: ' + error));
  }

  setName(name: string) {
    return this.afAuth.auth.currentUser.updateProfile({
      displayName: name,
      photoURL: 'https://i.pinimg.com/236x/b3/73/59/b373595c473299efe893572dd160f861--xmas-songs-song-with-lyrics.jpg'
    });
  }

}
