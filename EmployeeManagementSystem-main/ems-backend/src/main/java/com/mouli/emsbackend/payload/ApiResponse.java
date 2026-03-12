package com.mouli.emsbackend.payload;

import org.springframework.http.HttpStatus;

public class ApiResponse {
    private String message;
    private Object data;
    private HttpStatus status;

    public ApiResponse(String message, Object data, HttpStatus status) {
        this.message = message;
        this.data = data;
        this.status = status;
    }

    // Getters and setters
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Object getData() { return data; }
    public void setData(Object data) { this.data = data; }

    public HttpStatus getStatus() { return status; }
    public void setStatus(HttpStatus status) { this.status = status; }
}
