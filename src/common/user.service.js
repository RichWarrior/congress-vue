const ID_USER_KEY="user"

export const getUser = () => {
    return window.localStorage.getItem(ID_USER_KEY)
}

export const setUser = user => {
    window.localStorage.setItem(ID_USER_KEY,user);
}

export const destroyUser = () => {
    window.localStorage.removeItem(ID_USER_KEY);
}

export default {getUser,setUser,destroyUser};