const ID_MENU_KEY = "id_menu";

export const getMenu = () => {
    return window.localStorage.getItem(ID_MENU_KEY);
}

export const setMenu = menu => {
    window.localStorage.setItem(ID_MENU_KEY,menu);
}

export const destroyMenu = () => {
    window.localStorage.removeItem(ID_MENU_KEY);
}

export default {getMenu,setMenu,destroyMenu};