package com.mouli.emsbackend.exception;

import com.mouli.emsbackend.payload.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse> handleValidationException(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );

        ApiResponse response = new ApiResponse(
                "Validation failed",
                errors,
                HttpStatus.BAD_REQUEST
        );

        return ResponseEntity.status(response.getStatus()).body(response);
    }


    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse> handleResourceNotFound(
            ResourceNotFoundException ex) {

        ApiResponse response = new ApiResponse(
                ex.getMessage(),
                null,
                HttpStatus.NOT_FOUND
        );

        return ResponseEntity.status(response.getStatus()).body(response);
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleGeneralException(Exception ex) {

        ApiResponse response = new ApiResponse(
                "Something went wrong: " + ex.getMessage(),
                null,
                HttpStatus.INTERNAL_SERVER_ERROR
        );

        return ResponseEntity.status(response.getStatus()).body(response);
    }
}

