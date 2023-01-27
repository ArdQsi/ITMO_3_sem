import entryAPI from 'api/entryAPI';
import {logout, setServerErrorMessage} from './auth';
import {addEntry} from './table';

const SELECT_R = 'SELECT_R';
const SELECT_X = 'SELECT_X';
const CHANGE_Y = 'CHANGE_Y';
const CLEAR_CURRENT = 'CLEAR_CURRENT';
const SELECT_X_BY_GRAPH = "SELECT_X_BY_GRAPH";
const SELECT_Y_BY_GRAPH = "SELECT_Y_BY_GRAPH";
const SELECT_R_BY_GRAPH = "SELECT_R_BY_GRAPH";

const initialState = {
    rValues: [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2],
    rCurrent: [],
    xValues: [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2],
    xChoose: [
        {valueX: "-2", id: "x1", key: "991"},
        {valueX: "-1.5", id: "x2", key: "992"},
        {valueX: "-1", id: "x3", key: "993"},
        {valueX: "-0.5", id: "x4", key: "994"},
        {valueX: "0", id: "x5", key: "995"},
        {valueX: "1", id: "x6", key: "996"},
        {valueX: "1.5", id: "x7", key: "997"},
        {valueX: "2", id: "x8", key: "998"},
    ],
    rChoose: [
        {valueR: "-2", id: "r1", key: "981"},
        {valueR: "-1.5", id: "r2", key: "982"},
        {valueR: "-1", id: "r3", key: "983"},
        {valueR: "-0.5", id: "r4", key: "984"},
        {valueR: "0", id: "r5", key: "985"},
        {valueR: "1", id: "r6", key: "986"},
        {valueR: "1.5", id: "r7", key: "987"},
        {valueR: "2", id: "r8", key: "988"},
    ],
    xCurrent: [],
    change: undefined,
    yMin: -3,
    yMax: 3,
    yCurrent: undefined,
    x: undefined,
    y: undefined,
    r: undefined
};
let updateNumber;

function update() {
    updateNumber = Math.random()
}

export default function valuesReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SELECT_R:
            if (state.rCurrent != null && state.rCurrent.includes(action.value)) {
                let i = state.rCurrent.indexOf(action.value);
                if (i >= 0) {
                    state.rCurrent.splice(i, 1);
                }
            } else {
                state.rCurrent.push(action.value);
            }
            update();
            return {
                ...state,
                change: updateNumber
            }
        case SELECT_X:
            if (state.xCurrent != null && state.xCurrent.includes(action.value)) {
                let i = state.xCurrent.indexOf(action.value);
                if (i >= 0) {
                    state.xCurrent.splice(i, 1);
                }
            } else {
                state.xCurrent.push(action.value);
            }
            update();
            return {
                ...state,
                change: updateNumber
            }
        case SELECT_X_BY_GRAPH:
            return {
                ...state,
                x: action.value
            }
        case SELECT_Y_BY_GRAPH:
            return {
                ...state,
                y: action.value
            }
        case SELECT_R_BY_GRAPH:
            return {
                ...state,
                r: action.value
            }
        case CHANGE_Y:
            return {
                ...state,
                yCurrent: action.value
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                rCurrent: [],
                xCurrent: [],
                yCurrent: undefined
            }
        default:
            return state;
    }
}

export function selectR(value) {
    return {type: SELECT_R, value};
}

export function selectX(value) {
    return {type: SELECT_X, value};
}

export function selectXByGraph(value) {
    return {type: SELECT_X_BY_GRAPH, value};
}

export function selectYByGraph(value) {
    return {type: SELECT_Y_BY_GRAPH, value};
}

export function selectRByGraph(value) {
    return {type: SELECT_R_BY_GRAPH, value};
}

export function changeY(value) {
    return {type: CHANGE_Y, value};
}

export function clearCurrent() {
    return {type: CLEAR_CURRENT};
}

export const checkEntry = () => (dispatch, getState) => {
    const obj = JSON.parse(localStorage.getItem('userWl4'));
    if (obj !== null) {
        getState().values.xCurrent.forEach(function (itemX) {
            getState().values.rCurrent.forEach(function (itemR) {
                entryAPI.checkEntry(
                    itemX,
                    getState().values.yCurrent,
                    itemR,
                    obj.key.toString())
                    .then(response => {
                        if (response.status === 200) {
                            dispatch(addEntry(response.data));
                        } else {
                            alert(`Непредвиденный ответ от сервера!`);
                        }
                    });
            });
        });
    } else {
        dispatch(logout());
        dispatch(setServerErrorMessage("Вы не авторизованы"));
    }
}

export const checkEntryByGraph = () => (dispatch, getState) => {
    const obj = JSON.parse(localStorage.getItem('userWl4'));
    if (obj !== null) {
        entryAPI.checkEntry(
            getState().values.x,
            getState().values.y,
            getState().values.r,
            obj.key.toString())
            .then(response => {
                if (response.status === 200) {
                    dispatch(addEntry(response.data));
                } else {
                    alert(`Непредвиденный ответ от сервера!`);
                }
            });
    } else {
        dispatch(logout());
        dispatch(setServerErrorMessage("Вы не авторизованы"));
    }
}
