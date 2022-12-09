
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs,addDoc, setDoc, getDoc, doc, arrayUnion, updateDoc, increment, query, where, arrayRemove, deleteDoc } from 'firebase/firestore/lite';
import {v4 as uuidv4} from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyAfN0Ibk87I9Z5A3RdUONyIjMafjW_soRQ",
  authDomain: "stove-top-cd1b1.firebaseapp.com",
  projectId: "stove-top-cd1b1",
  storageBucket: "stove-top-cd1b1.appspot.com",
  messagingSenderId: "323382038216",
  appId: "1:323382038216:web:a1c21ee23e399c61d61ffd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//DATABASE STUFF
const db = getFirestore(app)

async function getPosts() {
    console.log("a")
    const postCol = collection(db, "posts");
    const postSnap = await getDocs(postCol)
    const postList = postSnap.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
    }))
    return postList
}

async function addUser(email, username, password, description, picture){
  console.log("b")
  const user = await setDoc(doc(db, "users", email), {
    username: username,
    picture: picture,
    password: password,
    description: description,
    email: email,
    numPosts: 0,
    followers: [],
    following: [],
    savedRecipes: [],
  })
}

async function getUser(email){
  console.log("c")
  const user = doc(db, "users", email)
  const userSnap = await getDoc(user)
  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    console.log("No such document!");
  }
}

export async function getUserPosts(username){
  console.log("d")
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

export async function getUsers(emails){
  console.log("e")
  const emailsToFind = emails === [] ? emails : ["none"]
  const usersRef = collection(db, 'users');
  const q = query(usersRef, 
    where('email', 'in', emailsToFind));

  
  
  const querySnapshot = await getDocs(q);
  const usersList = querySnapshot.docs.map(doc => ({
    id: doc.id,
    user: doc.data()
  }))

  return usersList
}

async function addPost(username, email, caption, image, picture, recipe, instructions) {
  console.log("f")

  await addDoc(collection(db, "posts"), {
    caption: caption,
    image: image,
    instructions: instructions,
    username: username,
    email: email,
    picture: picture,
    recipe: recipe,
    comments: [],
    numRatings: 0,
    rating: 0.0,
    unique: uuidv4()
  });
  const user = doc(db, "users", email)
  await updateDoc(user, {
    numPosts: increment(1)
  })
}

export async function removePost(postId, email) {
  console.log("u")
  const postsRef = collection(db, "posts");
  const q = query(postsRef, 
    where('unique', '==', postId));
  const querySnapshot = await getDocs(q)
  const postList = querySnapshot.docs.map(doc => ({
    id: doc.id,
    post: doc.data()
  }))
  console.log(postList)
  console.log(postList[0].id)
  await deleteDoc(doc(db, "posts", postList[0].id))
  const user = doc(db, "users", email)
  await updateDoc(user, {
    numPosts: increment(-1)
  })

}

async function addRating(postId, newRating){
  console.log("g")
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
  console.log(newAverage)
  
  await updateDoc(post, {
    rating: newAverage,
    numRatings: increment(1)
  })
}

async function addComment(user, postId, comment) {
  console.log("h")
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
  console.log("i")
  const post = doc(db, "posts", postId)
  const postSnap = await getDoc(post)
  const postData = postSnap.data()
  const postComments = postData.comments
  return postComments

}

async function addSavedPost(uniquePostId, userEmail){
  console.log("j")
  const user = doc(db, "users", userEmail)
  await updateDoc(user, {
    savedPosts: arrayUnion(uniquePostId)
  })
}

export async function addSavedRecipe(recipe, userEmail){
  console.log("jj")
  const user = doc(db, "users", userEmail)
  await updateDoc(user, {
    savedRecipes: arrayUnion(recipe)
  })
}

export async function removeSavedRecipe(recipe, userEmail){
  console.log("jj")
  const user = doc(db, "users", userEmail)
  await updateDoc(user, {
    savedRecipes: arrayRemove(recipe)
  })
}

export async function removeSavedPost(uniquePostId, userEmail){
  console.log("k")
  const user = doc(db, "users", userEmail)
  await updateDoc(user, {
    savedPosts: arrayRemove(uniquePostId)
  })
}


async function getUserSavedPosts(userEmail){
  console.log("l")
  const user = doc(db, "users", userEmail)
  const userSnap = await getDoc(user)
  const userData = userSnap.data()
  
  const userSavedPostIds = userData.savedPosts
  console.log(userSavedPostIds)

  if(userSavedPostIds == []){
    return [];
  }
  
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

export async function getUserFollowingPosts(userEmail){
  const user = doc(db, "users", userEmail)
  const userSnap = await getDoc(user)
  const userData = userSnap.data()

  const userFollowing = userData.following

  if(userFollowing.length == 0){
    console.log("1")
    return [];
  }

  const postsRef = collection(db, 'posts');
  const q = query(postsRef, 
    where('email', 'in', userFollowing));
  const querySnapshot = await getDocs(q);
  const postList = querySnapshot.docs.map(doc => ({
    id: doc.id,
    post: doc.data()
  }))
  console.log(postList)
  return postList
}

export async function getUserFollowers(userEmail){
  console.log("m")
  const user = doc(db, "users", userEmail)
  const userSnap = await getDoc(user)
  const userData = userSnap.data()
  const userFollowers = userData.followers

  return userFollowers;
}

export async function getUserFollowing(userEmail){
  console.log("n")
  const user = doc(db, "users", userEmail)
  const userSnap = await getDoc(user)
  const userData = userSnap.data()
  const userFollowing = userData.following

  return userFollowing;
}

export async function addUserToFollowing(currUserEmail, userToFollowEmail){
  console.log("o")
  const user = doc(db, "users", currUserEmail)
  await updateDoc(user, {
    following: arrayUnion(userToFollowEmail)
  })
}

export async function addUserToFollowers(userFollowerEmail, userFollowingEmail){
  console.log("z")
  const user = doc(db, "users", userFollowingEmail)
  await updateDoc(user, {
    followers: arrayUnion(userFollowerEmail)
  })
}

export async function removeUserFollow(currUserEmail, userToFollowEmail){
  console.log("p")
  const user = doc(db, "users", currUserEmail)
  await updateDoc(user, {
    following: arrayRemove(userToFollowEmail)
  })
}

export async function removeUserFromFollowers(userFollowerEmail, userFollowingEmail){
  console.log("v")
  const user = doc(db, "users", userFollowingEmail)
  await updateDoc(user, {
    followers: arrayRemove(userFollowerEmail)
  })
}

//USER AUTH STUFF
const auth = getAuth(app)

async function createUser(email, username, password, description, picture) {
  console.log("q")
  const userCred = await createUserWithEmailAndPassword(auth, email, password).catch((error) => alert(error))
  await addUser(email, username, password, description, picture)
}

async function userSignIn(email, password) {
  console.log("r")
  const usercred = await signInWithEmailAndPassword(auth, email, password)
  console.log(usercred)
}


export { createUser, userSignIn, getPosts, getUser, addPost, addComment, getComments, addRating, addSavedPost, getUserSavedPosts };