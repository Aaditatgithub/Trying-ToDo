import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";

// Create a context
export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

// Share the created context with other components
export default function AuthProvider({ children }) {

    // Put some state in context
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState(null)
    const [token, setToken] = useState(null)

    // async function login(username, password) {
    //     const baToken = 'Basic ' + window.btoa(username + ":" + password)

    //     try{
    //         const response = await executeBasicAuthenticationService(baToken)
    //         if (response.status === 200) {
    //             setAuthenticated(true)
    //             setToken(baToken)
    //             setUsername(username)
                
    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     console.log('intercepting and adding a token')
    //                     config.headers.Authorization = baToken
    //                     return config
    //                 }
    //             )

    //             return true
    //         } else {
    //             logout()
    //             return false
    //         }
    //     }
    //     catch (error){
    //         logout()
    //         return false
    //     }  
    // }


    async function login(username, password) {
        
        try{
            const response = await executeJwtAuthenticationService(username,password)
            if (response.status === 200) {
                const jwttoken = 'Bearer ' + response.data.token
                setAuthenticated(true)
                setUsername(username)
                setToken(jwttoken)
                
                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = jwttoken
                        return config
                    }
                )
                return true
            } 
            else {
                logout()
                return false
            }
        }
        catch (error){
            logout()
            return false
        }  
    }

    function logout() {
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token}}>
            {children}
        </AuthContext.Provider>
    );
}