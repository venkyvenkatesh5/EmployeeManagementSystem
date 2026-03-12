import { FaUser, FaEnvelope, FaBuilding } from "react-icons/fa";
import "./EmployeeModal.css";

export default function EmployeeModal({
showModal,
setShowModal,
employee,
setEmployee,
departments,
saveEmployee,
editMode
}){

if(!showModal) return null;

return(

<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">

<div className="bg-white p-6 rounded w-96">

<h2 className="text-xl font-bold mb-4">
{editMode?"Edit Employee":"Add Employee"}
</h2>

<input
value={employee.name}
placeholder="Name"
className="border p-2 w-full mb-3"
onChange={(e)=>setEmployee({...employee,name:e.target.value})}
/>

<input
value={employee.email}
placeholder="Email"
className="border p-2 w-full mb-3"
onChange={(e)=>setEmployee({...employee,email:e.target.value})}
/>

<select
value={employee.departmentId}
className="border p-2 w-full mb-3"
onChange={(e)=>setEmployee({...employee,departmentId:e.target.value})}
>

<option value="">Select Department</option>

{departments?.map(dep=>(
<option key={dep.id} value={dep.id}>
{dep.name}
</option>
))}

</select>

<div className="flex justify-end space-x-2">

<button
onClick={()=>setShowModal(false)}
className="bg-gray-400 text-white px-3 py-1 rounded"
>
Cancel
</button>

<button
onClick={saveEmployee}
className="bg-indigo-600 text-white px-3 py-1 rounded"
>
Save
</button>

</div>

</div>

</div>

);
}