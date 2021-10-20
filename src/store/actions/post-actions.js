import { DB } from "../../db"
import { ADD_POST, LOAD_POSTS, REMOVE_POST, TOGGLE_BOOKED } from "../types"
import * as FileSystem from 'expo-file-system';
import { Dispatch } from 'redux';


const loadPostsAC = (data) => {
  return {type: LOAD_POSTS, data} 
};

const toggleBookedAC = (id) => {
  return {type: TOGGLE_BOOKED, id}
};

const removePostAC = (id) => {
  return {type: REMOVE_POST, id}
};

const addPostAC = (post) => {
  return {type: ADD_POST, post} 
};

export const loadPostsTC = () => async dispatch => {
  const posts = await DB.getPosts();
  dispatch(loadPostsAC(posts));
};

export const addPostTC = (post) => async dispatch => {
  const fileName = post.img.split('/').pop()
  const newPath = FileSystem.documentDirectory + fileName;
  try {
    await FileSystem.moveAsync({
      to: newPath,
      from: post.img
    });
  } catch (error) {
    console.log('Error', error);
  }
  const modifiedPost = {...post, img: newPath};
  modifiedPost.id = await DB.createPost(modifiedPost);
  dispatch(addPostAC(modifiedPost));
};

export const toggleBookedTC = (post) => async dispatch => {
  try {
    await DB.updatePost(post);
  } catch (error) {
    console.log('Error', error);
  }
  dispatch(toggleBookedAC(post.id));
};

export const removePostTC = (id) => async dispatch => {
  try {
    await DB.removePost(id);
  } catch (error) {
    console.log('Error', error);
  }
  dispatch(removePostAC(id));
};


// export const loadPosts = () => {
//   return async dispatch => {
//     const posts = await DB.getPosts()
//     dispatch({
//       type: LOAD_POSTS,
//       payload: posts
//     })
//   }
// }

// export const toggleBooked = (post) => async dispatch => {
//   await DB.updatePost(post)
//   dispatch ({
//     type: TOGGLE_BOOKED,
//     payload: post.id
//   })
// }

// export const removePost = (id) => async dispatch => {
//   await DB.removePost(id)
//   dispatch ({
//     type: REMOVE_POST,
//     payload: id
//   })
// }

// export const addPost = (post) => async dispatch => {
//   // post.id = Date.now().toString()

//   const fileNmae = post.img.split('/').pop()
//   const newPath = FileSystem.documentDirectory + fileNmae

//   try {
//     await FileSystem.moveAsync({
//       to: newPath,
//       from: post.img
//     })
//   } catch (e) {
//     console.log("Error ", e)
//   }
  
//   const payload = {...post, img: newPath}
//   const id = await DB.createPost(payload)

//   payload.id = id

//   dispatch({
//     type: ADD_POST,
//     payload
//   })
// }