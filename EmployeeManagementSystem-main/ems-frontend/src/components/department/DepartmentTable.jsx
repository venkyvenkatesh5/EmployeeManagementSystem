import { FaEdit, FaTrash } from "react-icons/fa";

export default function DepartmentTable({
  departments,
  editDepartment,
  deleteDepartment
}) {

  return (

    <table className="department-table">

      <thead className="bg-gray-200">
        <tr>
          <th className="p-3 text-left">Department Name</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>

        {departments.length > 0 ? (

          departments.map(dep => (

            <tr key={dep.id} className="department-row">

              <td className="p-3">{dep.name}</td>

              <td className="p-3 space-x-2">

                <button
                  onClick={()=>editDepartment(dep)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                  <FaEdit/>
                  </button>

                  <button
                  onClick={()=>deleteDepartment(dep.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                  <FaTrash/>
                  </button>

              </td>

            </tr>

          ))

        ) : (

          <tr>
            <td colSpan="2" className="text-center p-4">
              No Departments Found
            </td>
          </tr>

        )}

      </tbody>

    </table>

  );
}