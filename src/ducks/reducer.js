const initialState = {
    user:null
}

const LOGIN = 'LOGIN'

export const login = (user) => {
    return {
        type:LOGIN,
        payload: user,
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user:action.payload
            };
        default: return state;
    }
};

export default reducer