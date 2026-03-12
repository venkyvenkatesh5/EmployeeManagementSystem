package com.mouli.emsbackend.controller;

import com.mouli.emsbackend.entity.Employee;
import com.mouli.emsbackend.payload.ApiResponse;
import com.mouli.emsbackend.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import java.util.Map;
import com.mouli.emsbackend.repository.EmployeeRepository;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllEmployees() {
        ApiResponse response = employeeService.getAllEmployees();
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getEmployee(@PathVariable Long id) {
        ApiResponse response = employeeService.getEmployeeById(id);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createEmployee(
            @Valid @RequestBody Employee employee) {

        ApiResponse response = employeeService.saveEmployee(employee);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody Employee employee) {

        ApiResponse response = employeeService.updateEmployee(id, employee);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteEmployee(@PathVariable Long id) {

        ApiResponse response = employeeService.deleteEmployee(id);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
    @GetMapping("/employees")
    public ResponseEntity<?> getEmployees(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<Employee> employees = employeeRepository.findAll(pageable);

        return ResponseEntity.ok(
                Map.of(
                        "message", "Employees fetched successfully",
                        "data", employees,
                        "status", "OK"
                )
        );
    }
}
