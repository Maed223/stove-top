// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs,addDoc, setDoc, getDoc,doc } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNjQ50XbFSUhgnl-opOVqr3vRiRuS2n7E",
  authDomain: "stove-top-ed712.firebaseapp.com",
  databaseURL: "https://stove-top-ed712-default-rtdb.firebaseio.com",
  projectId: "stove-top-ed712",
  storageBucket: "stove-top-ed712.appspot.com",
  messagingSenderId: "891948117024",
  appId: "1:891948117024:web:561576b6d9e60252b0e045",
  measurementId: "G-4SZXLZCGTW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//DATABASE STUFF
const db = getFirestore(app)

async function getPosts() {
    const postCol = collection(db, "posts");
    const postSnap = await getDocs(postCol)
    const postList = postSnap.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
    }))
    return postList
}

async function addUser(email, username, password, picture){
  const user = await setDoc(doc(db, "users", email), {
    username: username,
    picture: picture,
    password: password
  })
}

async function getUser(email){
  const user = doc(db, "users", email)
  const userSnap = await getDoc(user)
  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    console.log("No such document!");
  }
}

async function addPost(username, caption, image, picture, recipe) {
  const docRef = await addDoc(collection(db, "posts"), {
    caption: caption,
    image: image,
    username: username,
    picture: picture,
    recipe: recipe
  });
}
//DATABASE STUFF

//USER AUTH STUFF
const auth = getAuth(app)

async function createUser(email, username, password, picture) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password).catch((error) => alert(error))
  await addUser(email, username, password, picture)
  console.log(userCred)
}

async function userSignIn(email, password) {
  await signInWithEmailAndPassword(auth, email, password).catch((error) => alert(error))
}
//USER AUTH STUFF


export { createUser, userSignIn, getPosts, getUser, addPost };