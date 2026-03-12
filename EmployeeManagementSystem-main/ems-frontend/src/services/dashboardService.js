import API from "../api/api";

export const getEmployees = (size = 200) => 
API.get(`/employees?page=0&size=${size}`);

export const getDepartments = () => API.get("/departments");