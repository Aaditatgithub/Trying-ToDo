import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import AuthProvider from './components/security/AuthContenxt'
import { useAuth } from './components/security/AuthContenxt'

import {LogoutComponent } from './components/LogoutComponent'
import LoginComponent from './components/LoginComponent'
import { HeaderComponent } from './components/HeaderComponent'
import { WelcomeComponent } from './components/WelcomeComponent'
import { ErrorComponent } from './components/ErrorComponent'
import { FooterComponent } from './components/FooterComponent'
import { ListTodosComponent } from './components/ListTodosComponent'
import { TodoComponent } from './components/TodoComponent'

import './TodoApp.css';


function AuthenticatedRoute({children}){
    const authContext = useAuth()

    if(authContext.isAuthenticated)
        return children 
    return  <Navigate to="/" />
}


export default function TodoApp() {
    return (
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path='/' element={<LoginComponent />}></Route>
                        <Route path='/login' element={<LoginComponent />}></Route>

                            <Route path='/welcome/:username' element={
                                <AuthenticatedRoute>
                                    <WelcomeComponent />
                                </AuthenticatedRoute>
                            }></Route>
                         
                            <Route path='/todos' element={
                               <AuthenticatedRoute>
                                    <ListTodosComponent />
                                </AuthenticatedRoute>
                            } />

                            <Route path='/todo/:id' element={
                               <AuthenticatedRoute>
                                    <TodoComponent />
                                </AuthenticatedRoute>
                            } />    

                            <Route path='/logout' element={
                                <AuthenticatedRoute>
                                    <LogoutComponent />
                                </AuthenticatedRoute>
                            } />
                        <Route path='*' element={<ErrorComponent />}></Route>
                    </Routes>
                    <FooterComponent/>
                </BrowserRouter>  
            </AuthProvider>
        </div>
    );
}
