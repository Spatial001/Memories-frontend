const apierrors = (state={message:null,code: null}, action)=>{
    switch(action.type){
        case 'ADD':
            return{...state,message: action.data.message,code: action.data.code}
        case 'DELETE':
            return{...state,message: null,code: null}
        default:
            return state;
    }
}
export default apierrors;