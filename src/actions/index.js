import * as types from './../constants/ActionTypes';
export const listAll = (todos) => {
    return {
        type: types.LIST_ALL,
        todos
    }
};

export const addTodo = (todo) => {
    return {
        type: types.ADD_TODO,
        todo
    }
};

export const deleteTodo = (todo) => {
    return {
        type: types.DELETE_TODO,
        todo
    }
};
export const editTodo = (todo) => {
    return {
        type: types.EDIT_TODO,
        todo
    }
};
export const saveEditTodo = (todo) => {
    return {
        type: types.SAVE_EDIT_TODO,
        todo
    }
};
