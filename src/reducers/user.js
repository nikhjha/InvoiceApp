
export const ghostUser = {
    name : 'USER',
    userDetail : '647-444-1234 your@email.com yourwebsite.com',
    userAddress : "1 your address city, state, country zip code"
}

const user = (state = ghostUser, action) => {
    switch(action.type){
        case "UPDATE_USER_DATA":
            return {...action.payload};
        default :
            return state;
    }
}

export default user;