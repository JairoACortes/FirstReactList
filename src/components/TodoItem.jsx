import React from 'react'

export function TodoItem({ todo, toggleTodo }) {
    const { id, task, complete } = todo;
    const handleTodoClick = () => {
      toggleTodo(id);
    };
    return (
    <li>
    <input type="checkbox" checked={complete} onChange={handleTodoClick}/>
    {task}
    </li>
  );
}
