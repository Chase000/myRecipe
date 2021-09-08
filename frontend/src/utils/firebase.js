import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyASDtHGDGkUJsCByBJYt_g10gAdoNnARM8',
  authDomain: 'spiral-pics.firebaseapp.com',
  projectId: 'spiral-pics',
  storageBucket: 'spiral-pics.appspot.com',
  messagingSenderId: '884786198919',
  appId: '1:884786198919:web:38e1c6edc52ef18fd7bb22',
  measurementId: 'G-5KJXRYZY86',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
