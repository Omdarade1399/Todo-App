import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoForm() {
    
    const [todo, setTodo] = useState("")
    const {addTodo} = useTodo()

    const add = (e) => {
        e.preventDefault()
        if(!todo) return

        addTodo({todo, completed:false})
        setTodo("")
    }

    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Your Todo..."
                className="w-full border border-none font-semibold rounded-l-lg px-3 outline-none duration-200 text-white placeholder:text-black bg-white py-3 focus:bg-black/70 focus:placeholder:text-white"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-7 py-1 bg-green-600 hover:bg-green-500 font-semibold text-white shrink-0">
                Add
            </button>
        </form>
    );
}


export default TodoForm