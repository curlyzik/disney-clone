import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBJJlKDeL1xSd0r1bFeCXKkrXPZHt4UhuE",
  authDomain: "disney-clone-76eb4.firebaseapp.com",
  projectId: "disney-clone-76eb4",
  storageBucket: "disney-clone-76eb4.appspot.com",
  messagingSenderId: "453417851425",
  appId: "1:453417851425:web:81738509a525ab19a96160",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
