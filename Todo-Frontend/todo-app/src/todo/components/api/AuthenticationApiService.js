import { apiClient } from "./ApiClient";

export const executeBasicAuthenticationService = 
    () =>  apiClient.get(`/basicauth`);


export const executeJwtAuthenticationService = 
    (username, password) =>  apiClient.post(`/authenticate`, {username,password});