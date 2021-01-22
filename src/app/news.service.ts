import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import { User } from 'src/user.model';
import { AngularFirestore} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { News } from 'src/news.model';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private user: User | undefined;
  private latestNews: News | undefined;
  private news: News[] | undefined;

  constructor(private afAuth: AngularFireAuth,
              private router: Router, private firestore: AngularFirestore) { }

  async signInWithGoogle(){
    const credentials = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const isEditor: any = this.firestore.collection('editors').doc(credentials.user?.uid).get();
    isEditor.subscribe((doc: any) => {
        console.log(doc);
        let editor = false;
        if (doc.exists){
        editor = true;
      }
        console.log(credentials);
        this.user = {
          uid:     credentials.user?.uid!,
          displayName : credentials.user?.displayName!,
          email: credentials.user?.email!,
          editor
      };
        localStorage.setItem('user', JSON.stringify(this.user));
        this.updateUserData();
        this.router.navigate(['news']);
    });
  }

  private updateUserData(){
    const docRef = this.firestore.collection('users').doc(this.user?.uid);

    docRef.get().subscribe((doc: any) => {
        if (doc.exists && doc.data().editor) {
          this.firestore.collection('users').doc(this.user?.uid).set({
            uid: this.user?.uid,
            email: this.user?.email,
            displayName : this.user?.displayName,
            editor: true
          }, {merge : true});
          this.user?.editor != true;
          localStorage.setItem('user', JSON.stringify(this.user));
        }else{
          this.firestore.collection('users').doc(this.user?.uid).set({
            uid: this.user?.uid,
            email: this.user?.email,
            displayName : this.user?.displayName,
            editor : this.user?.editor
          }, {merge : true});
        }
    });
  }

  // method to retrieve user from components
  getUser(){
    if (this.user == null && this.userSignedIn()){
      this.user = JSON.parse(localStorage.getItem('user')!);
    }
    return this.user;
  }

  userSignedIn(): boolean{
    return JSON.parse(localStorage.getItem('user')!) != null;
  }

  signOut(){
    this.afAuth.signOut();
    localStorage.removeItem('user');
    this.user = null!;
    this.router.navigate(['signin']);
  }

  signIn(){
    this.router.navigate(['signin']);
  }

  toWorldwide(){
    this.router.navigate(['worldwide']);
  }

  onSubmit(value: any) {
    this.latestNews = {
      User: this.user!,
      Country: value.country,
      Description: value.description,
      Date: value.date
    }
    console.log(this.latestNews);

    this.firestore.collection('news').add({
      user: this.latestNews?.User,
      country: this.latestNews?.Country,
      description : this.latestNews?.Description,
      date : this.latestNews?.Date
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }

  getNews(){
    const docRef: any = this.firestore.collection('news').get();
    return docRef;
  }

}
