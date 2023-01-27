import entryAPI from 'api/entryAPI';
import {setLoading} from './auth';


const SET_ENTRIES = 'SET_ENTRIES';
const ADD_ENTRY = 'ADD_ENTRY';

const initialState = {
    entries: []
};

export default function tableReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_ENTRIES:
            return {
                ...state,
                entries: action.value
            }
        case ADD_ENTRY:
            return {
                ...state,
                entries: [...state.entries, action.value]
            }
        default:
            return state;
    }
}

export function setEntries(value) {
    return {type: SET_ENTRIES, value};
}

export function addEntry(value) {
    return {type: ADD_ENTRY, value};
}

export const getEntries = () => (dispatch) => {
    dispatch(setLoading(true));
    const obj = JSON.parse(localStorage.getItem('userWl4'));
    entryAPI.getEntries(obj.key)
        .then(response => {
            if (response.status === 200) {
                dispatch(setEntries(response.data));
            } else {
                alert(`Непредвиденный ответ ${response.status} от сервера!`);
            }
            dispatch(setLoading(false));
        })
    let timeId = setInterval(() => {
        const obj = JSON.parse(localStorage.getItem('userWl4'));
        if (obj !== null) {
            entryAPI.getEntries(obj.key)
                .then(response => {
                    if (response.status === 200) {
                        console.log("обновил");
                        dispatch(setEntries(response.data));
                    } else {
                        alert(`Непредвиденный ответ ${response.status} от сервера!`);
                    }
                })
        } else {
            clearInterval(timeId);
        }
    }, 5000);
}
