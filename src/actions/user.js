import * as api from "../api"


export const login = (formData) => async (dispatch) => {
    try {
        const { data } = await api.login(formData);
        if (data.code != 200) {
            dispatch({ type: 'ADD', data })
            document.getElementById("apierror").style.visibility= "visible";
        }
        else{
            dispatch({ type: 'AUTH', data })
            dispatch({ type: 'DELETE' })
            window.location.reload();
        }
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData) => async (dispatch) => {
    try {
        const {data} = await api.signup(formData)
        if (data.code != 200) {
            dispatch({ type: 'ADD', data })
            document.getElementById("apierror").style.visibility= "visible";
        }
        else{
            dispatch({ type: 'AUTH', data })
            dispatch({ type: 'DELETE' })
            window.location.replace("/");

        }
       

    } catch (error) {
        console.log(error)
    }
}

export const logout = () => (dispatch) => {
    dispatch({ type: 'LOGOUT' })

}


// export const home = () => async (dispatch) => {
//     const token = localStorage?.getItem('profile')
//     if (token) {
//         try {
//             const { data } = await api.home()

//             dispatch({ type: 'HOME', payload: token, data: data })

//         } catch (error) {
//             console.log(error)
//         }

//     }



// }