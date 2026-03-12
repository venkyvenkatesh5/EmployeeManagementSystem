import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import "./Departments.css";
import { FaSearch } from "react-icons/fa";
import DepartmentCard from "../components/department/DepartmentCard";
import DepartmentTable from "../components/department/DepartmentTable";
import DepartmentModal from "../components/department/DepartmentModal";

import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment as removeDepartment
} from "../services/departmentService";

export default function Departments() {

  const [departments,setDepartments] = useState([]);
  const [showModal,setShowModal] = useState(false);
  const [departmentName,setDepartmentName] = useState("");
  const [editId,setEditId] = useState(null);

  useEffect(()=>{
    fetchDepartments();
  },[]);

  const fetchDepartments = async () => {
    const res = await getDepartments();
    setDepartments(res.data.data);
  };

  const saveDepartment = async () => {

    if(editId){
      await updateDepartment(editId,departmentName);
    }else{
      await createDepartment(departmentName);
    }

    setShowModal(false);
    setDepartmentName("");
    setEditId(null);

    fetchDepartments();
  };

  const editDepartment = (dep) => {
    setDepartmentName(dep.name);
    setEditId(dep.id);
    setShowModal(true);
  };

  const deleteDepartment = async (id) => {

    if(!window.confirm("Delete department?")) return;

    await removeDepartment(id);

    fetchDepartments();
  };

  return (

    <div className="departments-page">

<Sidebar/>

<div className="departments-content">

<div className="departments-header">

<h1 className="departments-title">
Departments
</h1>

<button
onClick={()=>setShowModal(true)}
className="add-btn"
>
+ Add Department
</button>

</div>

<div className="search-box">
<label htmlFor="searchIcon">
<FaSearch  className="search-icon"/>
</label>


<input
id="searchIcon"
placeholder="Search department..."
className="search-input"
/>

</div>


<div className="department-grid">

{departments.map(dep => (

<DepartmentCard
key={dep.id}
department={dep}
editDepartment={editDepartment}
deleteDepartment={deleteDepartment}
/>

))}

</div>
<DepartmentModal
showModal={showModal}
setShowModal={setShowModal}
departmentName={departmentName}
setDepartmentName={setDepartmentName}
saveDepartment={saveDepartment}
editId={editId}
/>

</div>

</div>

  );
}