import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  CLEAR_ERRORS,
  SET_ERRORS,
  POST_SCREAM,
  LOADING_UI,
  SET_SCREAM,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from "../types";
import axios from "axios";

//Get all screams
export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/screams")
    .then(res => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_SCREAMS,
        payload: [],
      });
    });
};

export const getScream = (screamId) => (dispatch) => {
  dispatch({type: LOADING_UI})
  axios.get(`/scream/${screamId}`)
    .then(res => {
      console.log('inside axios');
      console.log(res.data)
      dispatch({
        type: SET_SCREAM,
        payload: res.data
      })
      dispatch({type: STOP_LOADING_UI})
      console.log('stop loading ui dispatched')
    })
    .catch( err => {
      console.log('inside catch')

    })
}

//post a scream
export const postScream = (newScream) => (dispatch) => {
  console.log('inside postScream dataAction.js')
  console.log(newScream)
  dispatch({ type: LOADING_UI });
  axios
    .post(`/scream`, newScream)
    .then((res) => {
      console.log('response')
      console.log(res.data)
      dispatch({
        type: POST_SCREAM,
        payload: res.data,
        
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log('error')
      console.log(err.response.data)
    
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Like a scream

export const likeScream = (screamId) => (dispatch) => {
  console.log(screamId);
  console.log(`/scream/${screamId}/like`);
  axios
    .get(`/scream/${screamId}/like`)
    .then((res) => {
      console.log("inside actions likeScream");
      console.log(res.data);
      console.log(res)
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

//Unlike a scream
export const unlikeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/unlike`)
    .then((res) => {
      console.log("inside actions unlikeScream");
      console.log(res.data);
      console.log(res.id)
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

//submit comment
export const submitComment = (screamId, commentData) => (dispatch) => {
  axios.post(`/scream/${screamId}/comment`,commentData)
    .then(res => {
      dispatch({type: SUBMIT_COMMENT,
      payload: res.data})
      dispatch(clearErrors())
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      })
    })
}

export const deleteScream = (screamId) => (dispatch) => {
  axios
    .delete(`/scream/${screamId}`)
    .then(() => {
      console.log('scream deleted in database fore sure')
      dispatch({ type: DELETE_SCREAM, payload: screamId });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({type: LOADING_DATA})
  axios.get(`/user/${userHandle}`)
    .then(res => {
      dispatch({type: SET_SCREAMS, payload: res.data.screams,})

    })
    .catch(() => {
      dispatch({type: SET_SCREAMS, payload: null,})
    })
}

export const clearErrors = () => (dispatch) => {
  dispatch({type: CLEAR_ERRORS})
}