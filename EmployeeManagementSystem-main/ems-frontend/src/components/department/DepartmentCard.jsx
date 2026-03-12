import { FaEdit, FaTrash, FaUsers } from "react-icons/fa";

export default function DepartmentCard({
  department,
  editDepartment,
  deleteDepartment
}){

const employeeCount = department.employeeCount || 0;

return(

<div className="department-card">

<div className="department-top">

<h3 className="department-name">
{department.name}
</h3>

<div className="employee-badge">
<FaUsers/>
<span>{employeeCount}</span>
</div>

</div>

<div className="department-actions">

<button
onClick={()=>editDepartment(department)}
className="icon-btn edit-btn"
>
<FaEdit/>
</button>

<button
onClick={()=>deleteDepartment(department.id)}
className="icon-btn delete-btn"
>
<FaTrash/>
</button>

</div>

</div>

);

}