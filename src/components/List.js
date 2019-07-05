import React from 'react';
import { connect} from "react-redux";
import * as actions from "../actions";
import axios from 'axios';
import PropTypes from "prop-types";

class List extends React.Component {
    handleEdit(todo) {
        this.props.editTodo(todo);
    }
    handleDelete(todo) {
        axios.delete(`http://5d1da69e3374890014f0053f.mockapi.io/pempem/${todo.id}`)
            .then(res => {
                this.props.deleteTodo(todo);
            });
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.todos !== prevProps.todos) {
            axios.get(`http://5d1da69e3374890014f0053f.mockapi.io/pempem`)
                .then(res => {
                    let todos = res.data;
                    this.props.listTodo(todos);
                })
                .catch(error => console.log(error));
        }
    }
    componentDidMount() {
        axios.get(`http://5d1da69e3374890014f0053f.mockapi.io/pempem`)
            .then(res => {
                let todos = res.data;
                this.props.listTodo(todos);
            })
            .catch(error => console.log(error));
    }
    render() {
        return (
            <div className={"list"}>
                <ul>
                    {this.props.todos.map(item => {
                        return <li key={item.id} className={"list-group-item d-flex justify-content-between mb-2"}>
                            {item.text}
                            <div>
                                <button className={"btn btn-sm mx-1 btn-warning"} onClick={this.handleEdit.bind(this, item)}>Edit</button>
                                <button className={"btn btn-sm mx-1 btn-danger"} onClick={this.handleDelete.bind(this, item)}>Delete</button>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.todos,
        ...state.todo
    };
};

const mapDispatchToProps  = (dispatch, props) => {
    return {
        listTodo: (todo) => {
            dispatch(actions.listAll(todo))
        },
        deleteTodo: (todo) => {
            dispatch(actions.deleteTodo(todo))
        },
        editTodo: (todo) => {
            dispatch(actions.editTodo(todo))
        }
    }
};

List.propTypes = {
    deleteTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    todo: PropTypes.object.isRequired,
    todos: PropTypes.array.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);
