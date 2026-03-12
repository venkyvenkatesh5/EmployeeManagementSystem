package com.mouli.emsbackend.service;

import com.mouli.emsbackend.entity.Employee;
import com.mouli.emsbackend.payload.ApiResponse;

import java.util.List;

public interface EmployeeService {
    ApiResponse getAllEmployees();
    ApiResponse getEmployeeById(Long id);
    ApiResponse saveEmployee(Employee employee);
    ApiResponse updateEmployee(Long id, Employee employee);
    ApiResponse deleteEmployee(Long id);
    ApiResponse getEmployeesWithPagination(int page, int size);
}
