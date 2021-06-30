const user = (state = {
    name : 'USER',
    userDetail : '647-444-1234 your@email.com yourwebsite.com',
    userAddress : "1 your address city, state, country zip code",
}, action) => {
    switch(action.type){
        case "LOG_IN":
            return {...action.payload};
        default :
            return state;
    }
}

export default user;