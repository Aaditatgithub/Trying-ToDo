import { useParams, Link} from "react-router-dom";
import { useState } from "react";
import {retrieveHelloWorldPathVariable} from './api/HelloWorldApiService'
import { useAuth } from "./security/AuthContenxt";

export function WelcomeComponent() {
    const { username } = useParams();
    const [message, setMessage] = useState(null)
    const authContext = useAuth()
    const token = authContext.token
    

    function successfulResponse(response){
        console.log(response)
        setMessage(response.data.message)
    }

    function errorResponse(response){
        console.log(response)
    }

    // function callHelloWorldBean(){
    //     axios.get('http://localhost:8080/hello-world-bean')
    //     .then( (response) => successfulResponse(response) )
    //     .catch ( (error) => errorResponse(error))
    //     .finally(() =>  console.log('cleanup'))
    // }

    function callHelloWorldPathVariable(){
        retrieveHelloWorldPathVariable(username)
        .then( (response) => successfulResponse(response) )
        .catch ( (error) => errorResponse(error))
        .finally(() =>  console.log('cleanup'))
    } 

    return (
        <div>
            <div className="Welcome">
                <h1>Welcome {username}</h1>
                Wanna manage your todos? - <Link to="/todos">Go Here</Link>
                <div>
                    <button className="btn btn-success m-5" onClick={callHelloWorldPathVariable}>HelloWorld</button>
                        <div className="textInfo">{message}</div>
                </div>
            </div>
        </div>
    );
}
