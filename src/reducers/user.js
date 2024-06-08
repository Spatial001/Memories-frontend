const authReducer = (state = { authData: null, id: null }, action) => {
    switch (action.type) {
        case 'AUTH':
            console.log('auth action: ', action.data)
            localStorage.setItem('token', action?.data?.token);
            localStorage.setItem('id',action?.data?.result?._id);
            return { ...state, authData: action?.data?.token, id:action?.data?.result?._id  };
            
        case 'LOGOUT':
            localStorage.removeItem('token')
            return { ...state, authData: null, id: null };
            
        default:
            return state
    }
}


export default authReducer;