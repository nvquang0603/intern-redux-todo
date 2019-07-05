import { combineReducers} from "redux";
import todos from './todos'

const myReducer = combineReducers({
    todos
});

export default myReducer;