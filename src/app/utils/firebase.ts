/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, collection, getDocs, getDoc} from "firebase/firestore"; 
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDE_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
//const analytics = getAnalytics(app);

async function addQR(URL: string, id: string){
    URL = URL.concat("/"+id)
    try {
        await setDoc(doc(db, "qrcodes", id), {
          value: URL,
          ID: id
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

async function getQRs(){
    // eslint-disable-next-line no-var
    var result: any = []
    const querySnapshot = await getDocs(collection(db, 'qrcodes'))
    querySnapshot.forEach((doc) => {
     const data = doc.data()
     result.push(data)
    });
    return result
}
async function getTree(id: string){
    const Document = await getDoc(doc(db, "trees", id))
    if(Document.exists()){
        return Document.data()
    }
    else {
        return {}
    }
}

async function handleLogin(email, password){

  const user = await signInWithEmailAndPassword(auth, email, password)
  return user;
}

async function handleSignup(email, password){

  const user = await createUserWithEmailAndPassword(auth, email, password)
  return user;
}
async function handleLogout(){
  signOut(auth).then(()=>{
    console.log("signout success")
  });
}

export {
    app,
    db,
    auth,
    addQR,
    getQRs,
    getTree,
    handleLogin,
    handleSignup,
    signOut,
    handleLogout,
    onAuthStateChanged
}