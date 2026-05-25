package com.app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello";
    }
    
    @GetMapping("/welcome")
    public String welcome() {
		return "Welcome";
	}
    
    @GetMapping("/home")
    public String home() {
        return "Dummy home data";
    }
    
}