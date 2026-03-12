package com.mouli.emsbackend.service;

import com.mouli.emsbackend.entity.Employee;
import com.mouli.emsbackend.payload.ApiResponse;
import com.mouli.emsbackend.repository.EmployeeRepository;
import com.mouli.emsbackend.service.EmployeeService;
import com.mouli.emsbackend.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;


@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public ApiResponse getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return new ApiResponse("Employees fetched successfully", employees, HttpStatus.OK);
    }

    @Override
    public ApiResponse getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " + id));
        return new ApiResponse("Employee found", employee, HttpStatus.OK);
    }

    @Override
    public ApiResponse saveEmployee(Employee employee) {
        Employee saved = employeeRepository.save(employee);
        return new ApiResponse("Employee created successfully", saved, HttpStatus.CREATED);
    }

    @Override
    public ApiResponse updateEmployee(Long id, Employee employee) {
        Employee existing = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " + id));


        existing.setName(employee.getName());
        existing.setEmail(employee.getEmail());
        existing.setDepartment(employee.getDepartment());
        existing.setGender(employee.getGender());
        existing.setDob(employee.getDob());
        existing.setSalary(employee.getSalary());
        existing.setJoiningDate(employee.getJoiningDate());
        existing.setPhoneNumber(employee.getPhoneNumber());
        existing.setAddress(employee.getAddress());
        existing.setRole(employee.getRole());

        Employee updated = employeeRepository.save(existing);
        return new ApiResponse("Employee updated successfully", updated, HttpStatus.OK);
    }


    @Override
    public ApiResponse deleteEmployee(Long id) {
        Employee emp = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " + id));

        employeeRepository.delete(emp);
        return new ApiResponse("Employee deleted successfully", null, HttpStatus.NO_CONTENT);
    }
    @Override
    public ApiResponse getEmployeesWithPagination(int page, int size) {

        PageRequest pageable = PageRequest.of(page, size);

        Page<Employee> employees = employeeRepository.findAll(pageable);

        return new ApiResponse(
                "Employees fetched successfully",
                employees,
                HttpStatus.OK
        );
    }
}
