import React from 'react';
import axios from 'axios';
import * as types from './../constants/ActionTypes';

let initialState = {
    todos: [],
    todo: {text: '', id: 0}
};

let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return {
                todos: [
                    ...action.todos.reverse()
                ],
                todo: { text: '', id: 0 }
            };
        case types.ADD_TODO:
            return {
                todos: [
                    {
                        id: action.todo.id,
                        text: action.todo.text
                    },
                    ...state.todos
                ],
                todo: { text: '', id: 0 }
            };
        case types.DELETE_TODO:
            let {todos} = state;
            let items = todos.filter((item) => {
                return item.id !== action.todo.id
            });
            return {
                todos: items,
                todo: {text: '', id: 0}
            };
        case types.EDIT_TODO:
            return {
                todos: state.todos,
                todo: {...action.todo}
            };
        case types.SAVE_EDIT_TODO:
            let editTodos = state.todos;
            let newItem = editTodos.map(item => {
                if (action.todo.id === item.id){
                    item.text = action.todo.text;
                }
                return item;
            });
            return {
                todos: newItem,
                todo: {text: '', id: 0}
            };
        default: return {...state};
    }
};
export default myReducer;