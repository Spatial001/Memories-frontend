import * as api from "../api"
export const addpost = (formData) => async (dispatch) => {
    try {
        const { data } = await api.addpost(formData)
        console.log(formData);
        console.log(data);
        dispatch({ type: 'CREATEPOST', data })
    } catch (error) {
        console.log(error);
    }
}
export const fetchpost = (formData) => async (dispatch) => {
    // console.log(state.posts)
    try {
        const { data } = await api.fetchpost(formData);
        console.log(data);
        dispatch({ type: 'FETCHPOST', data })
    } catch (error) {
        console.log(error);
    }
}
export const createComment = (formData) => async (dispatch) => {
    try {
        const { data } = await api.createcomment(formData);
        console.log(data);
        dispatch({ type: 'CREATECOMMENT', data })
    } catch (error) {
        console.log(error);
    }
}

export const createReply = (formData) => async (dispatch) => {
    try {
        console.log(formData);
        const { data } = await api.createReply(formData);
        console.log(data);
        await dispatch({ type: 'ADDCOMMENTS', data })
    } catch (error) {
        console.log(error);
    }
}
export const getpostbyid = (formData) => async (dispatch) => {
    try {
        console.log(formData);
        const { data } = await api.createReply(formData);
        console.log(data);
        await dispatch({ type: 'ADDCOMMENTS', data })
    } catch (error) {
        console.log(error);
    }
}
export const replyOnComment = (formData) => async (dispatch) => {
    try {
        console.log(formData);
        const { data } = await api.replyOnComment(formData);
        console.log(data);
        await dispatch({ type: 'CREATEREPLY', data })
    } catch (error) {
        console.log(error);
    }
}
export const savePost = (formData) => async (dispatch) => {
    try {
        console.log(formData);
        const { data } = await api.savePost(formData);
        console.log(data);
        localStorage.setItem('savedposts',JSON.stringify(data.savedPosts));

        await dispatch({ type: 'SAVEPOST', data })
    } catch (error) {
        console.log(error);
    }
}

export const reportPosts = (formData) => async (dispatch) => {
    try {
        console.log(formData);
        dispatch({ type: 'REPORTPOST', data: formData })
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (formData) => async (dispatch) => {
    try {
        console.log(formData);
        localStorage.setItem('deletedposts', formData.id);

        dispatch({ type: 'DELETEPOST', data: formData })
    } catch (error) {
        console.log(error);
    }
}

