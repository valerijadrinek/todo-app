import { TodoStyled, TodoText, TodoStatus, RemoveTodo } from "./todo.styles";
import { TODO_STATUSES } from "../../redux/todo/todo-slice";

import { useDispatch } from "react-redux";
import { removeTodo, changeTodoStatus } from "../../redux/todo/todo-slice";

const CHANGE_TODO_STATUS = {
    [TODO_STATUSES.todo]: TODO_STATUSES.inProgress,
    [TODO_STATUSES.inProgress]: TODO_STATUSES.done,
    [TODO_STATUSES.done]: TODO_STATUSES.todo
};

const BACKGROUND_COLORS = {
    [TODO_STATUSES.inProgress]: 'grey',
    [TODO_STATUSES.done]: 'lime'
};

const COLORS = {
    [TODO_STATUSES.inProgress]: 'white'
};

/**
 * returns and renders Todo element to the screen
 * 
 * @param {object} props - { id, name, status } 
 * @returns {HTMLElement} todo
 */
const Todo = ({id, name, status}) => {
    const dispatch = useDispatch();

    /**
     * removes the todo from the state
     */
    const removeTodoHandler = () => {
        dispatch(removeTodo(id));
    };

    /**
     * changes the status of a todo depending on its previous status
     */
    const todoClickHandler = () => {
        const newStatus = CHANGE_TODO_STATUS[status];
        dispatch(changeTodoStatus({id, status: newStatus}));
    };

    const styles = {
        todoStyles: {
            backgroundColor: BACKGROUND_COLORS[status] || '',
            color: COLORS[status] || null
        }
    }

    return (
        <TodoStyled style={BACKGROUND_COLORS[status] ? styles.todoStyles : null}>
            <TodoText onClick={todoClickHandler}>
                {name}
            
                <TodoStatus> {status}</TodoStatus>
            
            </TodoText>
            <RemoveTodo onClick={removeTodoHandler}>
                &#10005;
            </RemoveTodo>
        </TodoStyled>
    );
}

export default Todo;