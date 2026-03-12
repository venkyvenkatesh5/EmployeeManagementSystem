import { FaEdit, FaTrash } from "react-icons/fa";
import "./EmployeeTable.css";

export default function EmployeeTable({employees,handleEdit,deleteEmployee}){

return(

<div className="employee-table-wrapper">

<table className="employee-table">

<thead>

<tr>
<th>Name</th>
<th>Email</th>
<th>Role</th>
<th>Salary</th>
<th>Actions</th>
</tr>

</thead>

<tbody>

{employees.length>0?(
employees.map(emp=>(

<tr key={emp.id}>

<td>{emp.name}</td>
<td>{emp.email}</td>
<td>{emp.role}</td>
<td>₹ {emp.salary}</td>

<td className="actions">

<button
onClick={()=>handleEdit(emp)}
className="edit-btn"
>
<FaEdit/>
</button>

<button
onClick={()=>deleteEmployee(emp.id)}
className="delete-btn"
>
<FaTrash/>
</button>

</td>

</tr>

))
):( 

<tr>
<td colSpan="5" className="no-data">
No Employees Found
</td>
</tr>

)}

</tbody>

</table>

</div>

);
}