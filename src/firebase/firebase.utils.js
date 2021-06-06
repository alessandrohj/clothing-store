import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDsTXFu30pik9C2MO7HBmgrYE9kNYHzxrA",
  authDomain: "crwndb-dad2e.firebaseapp.com",
  projectId: "crwndb-dad2e",
  storageBucket: "crwndb-dad2e.appspot.com",
  messagingSenderId: "582304331982",
  appId: "1:582304331982:web:f46c354e7457ccdd21f89f",
  measurementId: "G-JZY95X4TR5"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{

      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(err){
      console.log('error created user', err.message)
    }
  }
  return userRef;
}

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;