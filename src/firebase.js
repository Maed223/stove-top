
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs,addDoc, setDoc, getDoc, doc, arrayUnion, updateDoc, increment, FieldPath, query, where, arrayRemove } from 'firebase/firestore/lite';
import {v4 as uuidv4} from 'uuid';

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
    password: password,
    email: email,
    numPosts: 0,
    numFollowers: 0,
    followers: [],
    numFollowing: 0,
    following: []
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

export async function getUserPosts(username){
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, 
    where('username', '==', username));
  
  const querySnapshot = await getDocs(q);
  const postList = querySnapshot.docs.map(doc => ({
    id: doc.id,
    post: doc.data()
  }))

  return postList
}

async function addPost(username, caption, image, picture, recipe) {
  const docRef = await addDoc(collection(db, "posts"), {
    caption: caption,
    image: image,
    username: username,
    picture: picture,
    recipe: recipe,
    comments: [],
    numRatings: 0,
    rating: 0.0,
    unique: uuidv4()
  });
}

async function addRating(postId, newRating){
  const post = doc(db, "posts", postId);
  const postSnap = await getDoc(post)
  const postData = postSnap.data()

  const newIntRating = parseInt(newRating);
  let newAverage = 0
  if(postData.numRatings === 0){  
    newAverage = newIntRating;
  }
  if(postData.rating === 0 ){
    if(newIntRating === 0){
      newAverage = 0;
    }
    if(newIntRating !== 0){
      newAverage = newIntRating/((postData.numRatings)+1)
    } 
  }
  else{
    const a = (postData.rating * postData.numRatings)
    const b = a + newIntRating
    const c = b / (postData.numRatings+1)
    newAverage = c
  }
  
  await updateDoc(post, {
    rating: newAverage,
    numRatings: increment(1)
  })
}

async function addComment(user, postId, comment) {
  const post = doc(db, "posts", postId);

  await updateDoc(post, {
      comments: arrayUnion({
        username: user.username,
        picture: user.picture,
        comment: comment
      })
  });
}

async function getComments(postId){
  const post = doc(db, "posts", postId)
  const postSnap = await getDoc(post)
  const postData = postSnap.data()
  const postComments = postData.comments
  return postComments

}

async function addSavedPost(uniquePostId, userEmail){
  /**
  const post = doc(db, "posts", postId)
  const postSnap = await getDoc(post)
   */
  const user = doc(db, "users", userEmail)
  await updateDoc(user, {
    savedPosts: arrayUnion(uniquePostId)
  })
}

export async function removeSavedPost(uniquePostId, userEmail){
  /**
  const post = doc(db, "posts", postId)
  const postSnap = await getDoc(post)
   */
  const user = doc(db, "users", userEmail)
  await updateDoc(user, {
    savedPosts: arrayRemove(uniquePostId)
  })
}



async function getUserSavedPosts(userEmail){
  const user = doc(db, "users", userEmail)
  const userSnap = await getDoc(user)
  const userData = userSnap.data()
  const userSavedPostIds = userData.savedPosts
  
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, 
    where('unique', 'in', userSavedPostIds));
  
  const querySnapshot = await getDocs(q);
  const postList = querySnapshot.docs.map(doc => ({
    id: doc.id,
    post: doc.data()
  }))
  
  return postList;
}

//USER AUTH STUFF
const auth = getAuth(app)

async function createUser(email, username, password, picture) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password).catch((error) => alert(error))
  await addUser(email, username, password, picture)
}

async function userSignIn(email, password) {
  await signInWithEmailAndPassword(auth, email, password).catch((error) => alert(error))
}


export { createUser, userSignIn, getPosts, getUser, addPost, addComment, getComments, addRating, addSavedPost, getUserSavedPosts };