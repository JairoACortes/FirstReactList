import React, { useState, useRef, useEffect } from "react";
import { TodoList } from "./components/TodoList";
import { v4 as uuidv4 } from 'uuid';
export function App() {
    const [todos, setTodos] = useState([
        { id: 1, task: 'Tarea 1', complete: false}]);
    
    const todoTaskRef = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todoApp.todos'));
        if (storedTodos){
            setTodos(storedTodos);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('todoApp.todos', JSON.stringify(todos));
    }, [todos]);



    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.complete = !todo.complete;
        setTodos(newTodos);
    }
    const handleTodoAdd = () => {
        const task =  todoTaskRef.current.value;
        if(task === '') return;
        setTodos((prevTodos) => {
            return [...prevTodos, {id: uuidv4(), task, complete: false}]
        });
        todoTaskRef.current.value = null;
    };
    const handleClearAll = () => {
        const newTodos = todos.filter((todo) => !todo.complete);
        setTodos(newTodos);
    }

    return (
        <React.Fragment>
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
            <input ref={todoTaskRef} type='text' placeholder='Nueva Tarea'/>
            <button onClick={handleTodoAdd}>➕</button>
            <button onClick={handleClearAll}>🗑️</button>
            <div>Te quedan {todos.filter((todo) => !todo.complete).length} tareas por teminar</div>
        </React.Fragment>
    );
}