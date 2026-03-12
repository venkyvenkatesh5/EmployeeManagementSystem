import API from "../api/api";

export const getDepartments = () => API.get("/departments");

export const createDepartment = (name) =>
  API.post(`/departments?name=${name}`);

export const updateDepartment = (id, name) =>
  API.put(`/departments/${id}?name=${name}`);

export const deleteDepartment = (id) =>
  API.delete(`/departments/${id}`);