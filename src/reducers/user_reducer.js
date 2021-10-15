const user_reducer = (state, action) => {
    if(action.type === 'setUser') {
        return {...state, user: action.payload, isAuthenticated: true}
    }
}

export default user_reducer;