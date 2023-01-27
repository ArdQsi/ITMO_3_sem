import authAPI from 'api/authAPI';
import {getEntries} from './table';
import {clearCurrent} from "./values";

const SET_LOADING = 'SET_LOADING';
const SET_SERVER_ERROR_MESSAGE = 'SET_SERVER_ERROR_MESSAGE';
const SET_LOGGED_USER = 'SET_LOGGED_USER';

const initialState = {
    isLoading: false,
    loggedUser: '',
    serverErrorMessage: ''
};

export default function authReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.value
            }
        case SET_SERVER_ERROR_MESSAGE:
            return {
                ...state,
                serverErrorMessage: action.value
            }
        case SET_LOGGED_USER:
            return {
                ...state,
                loggedUser: action.value
            }
        default:
            return state;
    }
}

export function setLoading(value) {
    return {type: SET_LOADING, value};
}

export function setServerErrorMessage(value) {
    return {type: SET_SERVER_ERROR_MESSAGE, value};
}

export function setLoggedUser(value) {
    return {type: SET_LOGGED_USER, value};
}

export const initializeAuth = () => (dispatch) => {
    let currentUser = JSON.parse(localStorage.getItem('userWl4'));
    if (currentUser !== null) {
        dispatch(setLoggedUser(currentUser.username));
        dispatch(getEntries());
    } else {
        dispatch(setLoading(false));
    }
}

export const login = (username, password) => (dispatch) => {
    dispatch(setLoading(true));
    authAPI.login(username, password)
        .then(response => {
            if (response.status === 200) {
                if (response.data === "error") {
                    dispatch(setServerErrorMessage("Неверное имя пользователя или пароль"));
                } else {
                    if (localStorage.getItem('userWl4') == null) {
                        localStorage.setItem('userWl4', JSON.stringify(response.data));
                        dispatch(setLoggedUser(response.data.username));
                        dispatch(getEntries());
                    } else {
                        dispatch(setServerErrorMessage("Вы уже вошли в другой аккаунт"));
                    }
                }
                dispatch(setLoading(false));
            }
        })
}

export const register = (username, password) => (dispatch) => {
    dispatch(setLoading(true));
    authAPI.register(username, password)
        .then(response => {
            if (response.status === 200) {
                if (response.data === "error") {
                    dispatch(setServerErrorMessage("Данный пользователь уже зарегистрирован"));
                } else {
                    if (localStorage.getItem('userWl4') == null) {
                        localStorage.setItem('userWl4', JSON.stringify(response.data));
                        dispatch(setLoggedUser(response.data.username));
                        dispatch(getEntries());
                    } else {
                        dispatch(setServerErrorMessage("Вы уже вошли в другой аккаунт"));
                    }
                }
            }
            dispatch(setLoading(false));
        })
}

export const logout = () => (dispatch) => {
    dispatch(clearCurrent());
    localStorage.removeItem('userWl4');
    dispatch(setLoggedUser(''));
    dispatch(setServerErrorMessage(""));
}
