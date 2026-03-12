package com.mouli.emsbackend.service;

import com.mouli.emsbackend.dto.DepartmentDTO;
import com.mouli.emsbackend.payload.ApiResponse;

public interface DepartmentService {

    ApiResponse createDepartment(DepartmentDTO dto);

    ApiResponse getAllDepartments();

    ApiResponse getDepartmentById(Long id);

    ApiResponse updateDepartment(Long id, DepartmentDTO dto);

    ApiResponse deleteDepartment(Long id);
}