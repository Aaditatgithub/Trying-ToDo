package com.in28minutes.rest.webservices.restfulwebservices.basic;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

//@Configuration
public class BasicAuthenticationConfigAuthorization {

    //Filter Chain -> series of filters that are applied to an HTTP request before it is processed by a controller.
    //by def:: authenticate all requests
    //basic auth
    // disabling csrf -> only when you dont have session :: stateless rest api

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        //1. Response to preflight request doesnt pass access control check
//        2. basic auth to check if token is valid or not

        http.authorizeHttpRequests(
                auth -> auth
                        .mvcMatchers(HttpMethod.OPTIONS , "/**").permitAll()
                        .anyRequest().authenticated()
        );  // all requests should be authenticated

        http.httpBasic(Customizer.withDefaults());

        http.sessionManagement(
            session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        );

        http.csrf().disable();
        return http.build();
    }
}
// CORS is a mechanism that allows restricted resources
// on a web page to be requested from another domain outside
// the domain from which the first resource was served.

// With CORS preflight requests, servers can examine requests before they're executed
// and get a chance to indicate if they allow them.


