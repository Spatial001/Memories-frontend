
const PostReducer = (state = { posts: [],savedpost: [],hasMore:true }, action) => {
    switch (action.type) {
        case 'CREATEPOST':
            // console.log(action.data)
            return state;
        case 'FETCHPOST':
            var hasmore = true
            if (action.data.posts.length < 5){
                hasmore = state.hasMore
                hasmore = false
            }
            action.data.posts = action.data.posts.map((post) => { post.reportCount = 0;  return post;})
            console.log(action.data.posts);
            return { ...state, posts: state.posts.concat(action.data.posts),hasMore:hasmore };
        case 'CREATECOMMENT':
            return state
        case 'ADDCOMMENTS':
            return { ...state, comments: action.data.comments };
        case 'CREATEREPLY':
            return state;
        case 'SAVEPOST':
             console.log(action.data.savedPosts);
             const newstate=state;
             newstate.savedpost = action.data.savedPosts;
            return newstate;
        case 'REPORTPOST':
            console.log(state.posts);
            let maxReport = 0;
            const reportedPosts = state.posts.map(post => {
                if (post._id === action.data.id) {
                    maxReport = post.reportCount + 1;
                    return { ...post, reportCount: maxReport };
                }
                return post;
            });
            console.log(maxReport);
            if (maxReport === 5) {
                const updatedPosts = state.posts.filter(post => post._id !== action.data.id);
                return { ...state, posts: updatedPosts };
            }
            return { ...state, posts: reportedPosts };
        default:
            return state
    }
}


export default PostReducer;