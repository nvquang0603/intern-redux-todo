import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from './../actions/index';
import axios from 'axios';
import PropTypes from 'prop-types';

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: {
                ...this.props.todos
            },
            todo: {id: 0, text: ''}
        }
    };

    static getDerivedStateFromProps(props, preState) {
        let state = {...preState};
        let {todo} = props;
        if (todo.id !== preState.todo.id && preState.todo.id === 0) {
            state.todo = {...todo};
        }

        return state;
    }
    handleChange = (event) => {
        this.setState({...this.state, todo: {text: event.target.value, id: this.state.todo.id}});
    };

    handleSubmit = () => {
        let todo = this.state.todo;
        let text = todo.text;
        if (todo.text !== '') {
            if (todo.id === 0) {
                axios.post(`http://5d1da69e3374890014f0053f.mockapi.io/pempem`, { text })
                    .then(res => {
                        this.props.addTodo({...todo,});
                        this.setState({todo: {id: 0, text: ''}});
                    });

            } else {
                axios.put(`http://5d1da69e3374890014f0053f.mockapi.io/pempem/${todo.id}`, { text })
                    .then(res => {
                        this.props.saveEditTodo({...this.state.todo, id: this.props.todo.id});
                        this.setState({todo: {id: 0, text: ''}});
                    });
            }
        }
    };

    render() {
        return (
            <div className={"form p-5"}>
                <label htmlFor="new-todo" className={'mr-5'}>
                    What needs to be done?
                </label>
                {/* nếu phát hiện thay đổi nào ở thì cũng set state thành giá trị lấy từ input (element đã kích hoạt event) */}
                <input
                    onChange={this.handleChange}
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                            this.handleSubmit()
                        }
                    }}
                    value={this.state.todo.text}
                />
                <button className="btn btn-sm mx-2 btn-success" onClick={this.handleSubmit}>
                    {this.state.todo.id === 0 ? "Add" : "Edit"}
                </button>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        ...state.todos,
        ...state.todo
    }
};

const mapDispatchToProps  = (dispatch, props) => {
    return {
        addTodo: (todo) => {
            dispatch(actions.addTodo(todo))
        },
        editTodo: (todo) => {
            dispatch(actions.editTodo(todo))
        },
        saveEditTodo: (todo, index) => {
            dispatch(actions.saveEditTodo(todo, index))
        }

    }
};
Form.propTypes = {
    addTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    saveEditTodo: PropTypes.func.isRequired,
    todo: PropTypes.object.isRequired,
    todos: PropTypes.array.isRequired
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form)