import { useEffect, useState } from "react";
import API from "../api/api";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import EmployeeTable from "../components/employee/EmployeeTable";
import EmployeeModal from "../components/employee/EmployeeModal";
import './Employees.css'
export default function Employees() {

  const [employees,setEmployees] = useState([]);
  const [departments,setDepartments] = useState([]);

  const [showModal,setShowModal] = useState(false);
  const [editMode,setEditMode] = useState(false);
  const [search,setSearch] = useState("");
  const [page,setPage] = useState(0);
const [totalPages,setTotalPages] = useState(0);
  const [employee,setEmployee] = useState({
    name:"",
    email:"",
    departmentId:"",
    salary:"",
    gender:"",
    dob:"",
    joiningDate:"",
    phoneNumber:"",
    address:"",
    role:""
  });

  useEffect(()=>{
  fetchEmployees();
},[page]);

useEffect(()=>{
  fetchDepartments();
},[]);

  const filteredEmployees = employees.filter(emp =>
  emp.name.toLowerCase().includes(search.toLowerCase())
);

  const fetchEmployees = async () => {

  try {

    const res = await API.get("/employees");

    const allEmployees = res?.data?.data || [];

    const start = page * 5;
    const end = start + 5;

    const paginatedEmployees = allEmployees.slice(start, end);

    setEmployees(paginatedEmployees);

    setTotalPages(Math.ceil(allEmployees.length / 5));

  } catch (error) {

    console.log(error);

  }

};
  const fetchDepartments = async ()=>{
    const res = await API.get("/departments");
    setDepartments(res.data.data);
  };

  const saveEmployee = async () => {

  try {

    const payload = {
      ...employee,
      department: { id: employee.departmentId }
    };

    if (editMode) {

      await API.put(`/employees/${employee.id}`, payload);
      toast.success("Employee updated successfully");

    } else {

      await API.post("/employees", payload);
      toast.success("Employee created successfully");

    }

    setShowModal(false);
    setEditMode(false);
    fetchEmployees();

  } catch (error) {

    console.log(error);
    toast.error("Something went wrong");

  }

};

  const handleEdit=(emp)=>{
    setEmployee({
      ...emp,
      departmentId:emp.department?.id || ""
    });

    setEditMode(true);
    setShowModal(true);
  };

  const deleteEmployee = async (id) => {

  if (!window.confirm("Delete this employee?")) return;

  try {

    await API.delete(`/employees/${id}`);

    toast.success("Employee deleted successfully");

    fetchEmployees();

  } catch (error) {

    toast.error("Failed to delete employee");

  }

};
  return(

<div className="employees-page">

<Sidebar/>

<div className="employees-content">

{/* Header */}

<div className="employees-header">

<h1>Employees</h1>

<button
onClick={()=>setShowModal(true)}
className="add-btn"
>
+ Add Employee
</button>

</div>

{/* Search */}

<div className="search-box">

<input
placeholder="Search employees..."
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

{/* Table */}

<div className="table-container">

<EmployeeTable
employees={filteredEmployees}
handleEdit={handleEdit}
deleteEmployee={deleteEmployee}
/>

</div>

{/* Pagination */}

<div className="pagination">

<button
disabled={page === 0}
onClick={()=>setPage(page-1)}
>
Previous
</button>

<span>
Page {page+1} of {totalPages}
</span>

<button
disabled={page === totalPages-1}
onClick={()=>setPage(page+1)}
>
Next
</button>

</div>

<EmployeeModal
showModal={showModal}
setShowModal={setShowModal}
employee={employee}
setEmployee={setEmployee}
departments={departments}
saveEmployee={saveEmployee}
editMode={editMode}
/>

</div>

</div>

);
}