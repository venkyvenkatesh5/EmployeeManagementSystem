package com.mouli.emsbackend.dto;

import jakarta.validation.constraints.NotBlank;

public class DepartmentDTO {

    @NotBlank(message = "Department name cannot be empty")
    private String name;

    private String description;

    public DepartmentDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}