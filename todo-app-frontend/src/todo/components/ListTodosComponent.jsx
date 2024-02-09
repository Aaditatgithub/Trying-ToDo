import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "./security/AuthContenxt";
import { deleteTodoApi, retrieveAllTodosForUsernameApi, retrieveTodoApi } from "./api/TodoApiService";

export function ListTodosComponent() {

    const today = new Date();
    const target_date = new Date(today.getFullYear(), today.getMonth() + 12, today.getDay())

    const authContext = useAuth()
    const username = authContext.username 

    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState()

    const navigate = useNavigate()


    useEffect (() => refreshTodos(),[])
    
    function refreshTodos(){
        retrieveAllTodosForUsernameApi(username)
        .then(response => setTodos(response.data))
        .catch(error => console.log(error))
    } 
    
    function deleteTodo(id){
       deleteTodoApi(username,id).then(
            //1: display message
            () => {
                setMessage(`Delete of todo with ${id} successful `)
                refreshTodos()
            }
       )
       .catch(

       )
    }

    function updateTodo(id){
        retrieveTodoApi(username,id).then(
             //1: display message
             () => {
                navigate(`/todo/${id}`) 
             }
        )
        .catch()
     }

    function addNewTodo(){
        navigate(`/todo/-1`) 
    }

    return (
        <div className='ListTodosComponent'>
            <h2>Things you want to do!</h2>
            {/* {<div className="alert alert-warning">{message}</div>} */}
            <table className='table' style={{ margin: 'auto', maxWidth:'80%', overflowX: 'auto' }}>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Is done?</th>
                        <th>Deadline</th>
                        <th>Delete</th>    
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.description}</td>
                            <td>{todo.done.toString()}</td>
                            <td>{todo.targetDate.toString()}</td>
                            <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                            <td><button className="btn btn-warning" onClick={() => updateTodo(todo.id)}>Update</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="btn btn-success m-5" onClick={addNewTodo}>Add new todo</div>
        </div>
    );
}
