const user_reducer = (state, action) => {
    if(action.type === 'setUser') {
        return {...state, user: action.payload, isAuthenticated: true, userLoading: false}
    }
    if(action.type === 'userLoading') {
        return {...state, userLoading: true}
    }
    if(action.type === 'userLogout') {
        return {...state, isAuthenticated: false, user: []}
    }
    if(action.type === 'userError') {
        return {...state, userLoading: false}
    }
}

export default user_reducer;