import axios from "axios"

const API = axios.create({ baseURL: 'http://localhost:8081' })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return req;
});


export const login = (credentials) => API.post('/login', credentials).catch((error) => error.response)
export const signup = (credentials) => API.post('/signup', credentials).catch((error) => error.response)
export const addpost = (credentials) => API.post('/post/create', credentials).catch((error) => error.response)
export const fetchpost = (credentials) => API.post('/post/near', credentials).catch((error) => error.response)
export const createcomment = (credentials) => API.post('/post/createComment', credentials).catch((error) => error.response)
export const fetchcomments = (credentials) => API.post('/post/getComments', credentials).catch((error) => error.response)
export const createReply = (credentials) => API.post('/post/createReply', credentials).catch((error) => error.response)
export const getPosts = (credentials) => API.post('/post/getPosts', credentials).catch((error) => error.response)
export const upvote = (credentials) => API.post('/post/upvote', credentials).catch((error) => error.response)
export const downvote = (credentials) => API.post('/post/downvote', credentials).catch((error) => error.response)
export const commentDownvote = (credentials) => API.post('/post/comment/downvote', credentials).catch((error) => error.response)
export const commentUpvote = (credentials) => API.post('/post/comment/upvote', credentials).catch((error) => error.response)
export const replyOnComment = (credentials) => API.post('/post/createReply', credentials).catch((error) => error.response);

export const savePost = (credentials) => API.post('/savePost', credentials).catch((error) => error.response);




