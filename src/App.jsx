import { useState, useEffect } from "react"
import { TodoProvider } from "./contexts/TodoContext"
import TodoForm from "./components/TodoForm"
import TodoItem from "./components/TodoItem"

function App() {
  
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev])
  }

  const updatedTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  

  return (
    <TodoProvider value={{todos, addTodo, updatedTodo, deleteTodo, toggleComplete}}>
    <div className="min-h-screen py-8 bg-cover bg-no-repeat" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)),url(https://cdn.pixabay.com/photo/2022/09/22/08/41/forest-7471935_640.jpg)`}}>
                <div className="w-full max-w-3xl mx-auto shadow-md rounded-lg px-4 py-3 text-white bg-[#1b4b93]">
                    <h1 className="text-2xl font-bold text-center mb-5 mt-5">Manage Your Todos</h1>
                    <div className="mb-10 mt-5">
                        <TodoForm /> 
                    </div>
                    <div className="flex flex-wrap gap-y-3 mt-5">
                        {todos.map((todo) => (
                          <div key={todo.id} className="w-full font-semibold">
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
