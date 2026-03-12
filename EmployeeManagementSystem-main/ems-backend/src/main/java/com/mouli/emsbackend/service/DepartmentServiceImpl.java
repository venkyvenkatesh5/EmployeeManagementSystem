package com.mouli.emsbackend.service;

import com.mouli.emsbackend.dto.DepartmentDTO;
import com.mouli.emsbackend.entity.Department;
import com.mouli.emsbackend.exception.ResourceNotFoundException;
import com.mouli.emsbackend.payload.ApiResponse;
import com.mouli.emsbackend.repository.DepartmentRepository;
import com.mouli.emsbackend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {




    private final EmployeeRepository employeeRepository;

    private final DepartmentRepository departmentRepository;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository, EmployeeRepository employeeRepository) {
        this.departmentRepository = departmentRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public ApiResponse createDepartment(DepartmentDTO dto) {

        if (departmentRepository.existsByName(dto.getName())) {
            return new ApiResponse(
                    "Department already exists",
                    null,
                    HttpStatus.BAD_REQUEST
            );
        }

        Department department = new Department();
        department.setName(dto.getName());
        department.setDescription(dto.getDescription());

        Department savedDepartment = departmentRepository.save(department);

        return new ApiResponse(
                "Department created successfully",
                savedDepartment,
                HttpStatus.CREATED
        );
    }

    @Override
    public ApiResponse getAllDepartments() {

        List<Department> departments = departmentRepository.findAll();

        for(Department dep : departments){

            long count = employeeRepository.countByDepartmentId(dep.getId());

            dep.setEmployeeCount((int) count);
        }

        return new ApiResponse(
                "Departments fetched successfully",
                departments,
                HttpStatus.OK
        );
    }

    @Override
    public ApiResponse getDepartmentById(Long id) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department not found with id: " + id));

        return new ApiResponse(
                "Department fetched successfully",
                department,
                HttpStatus.OK
        );
    }

    @Override
    public ApiResponse updateDepartment(Long id, DepartmentDTO dto) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department not found with id: " + id));

        department.setName(dto.getName());
        department.setDescription(dto.getDescription());

        Department updatedDepartment = departmentRepository.save(department);

        return new ApiResponse(
                "Department updated successfully",
                updatedDepartment,
                HttpStatus.OK
        );
    }

    @Override
    public ApiResponse deleteDepartment(Long id) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department not found with id: " + id));

        departmentRepository.delete(department);

        return new ApiResponse(
                "Department deleted successfully",
                null,
                HttpStatus.NO_CONTENT
        );
    }


}
