package com.mouli.emsbackend.controller;

import com.mouli.emsbackend.dto.DepartmentDTO;
import com.mouli.emsbackend.payload.ApiResponse;
import com.mouli.emsbackend.service.DepartmentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createDepartment(
            @Valid @RequestBody DepartmentDTO dto) {

        ApiResponse response = departmentService.createDepartment(dto);

        return ResponseEntity
                .status(response.getStatus())
                .body(response);
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllDepartments() {

        ApiResponse response = departmentService.getAllDepartments();

        return ResponseEntity
                .status(response.getStatus())
                .body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getDepartmentById(
            @PathVariable Long id) {

        ApiResponse response = departmentService.getDepartmentById(id);

        return ResponseEntity
                .status(response.getStatus())
                .body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateDepartment(
            @PathVariable Long id,
            @Valid @RequestBody DepartmentDTO dto) {

        ApiResponse response = departmentService.updateDepartment(id, dto);

        return ResponseEntity
                .status(response.getStatus())
                .body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteDepartment(
            @PathVariable Long id) {

        ApiResponse response = departmentService.deleteDepartment(id);

        return ResponseEntity
                .status(response.getStatus())
                .body(response);
    }
}