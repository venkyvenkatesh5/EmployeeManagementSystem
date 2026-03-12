export default function RecentEmployees({ employees }) {

  return (

    <div className="bg-white p-6 rounded-lg shadow mt-8">

      <h2 className="text-xl font-bold mb-4">
        Recent Employees
      </h2>

      <table className="w-full">

        <thead>
          <tr className="text-left border-b">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
          </tr>
        </thead>

        <tbody>

          {employees.map(emp => (

            <tr key={emp.id} className="border-b">

              <td className="p-2">{emp.name}</td>
              <td className="p-2">{emp.email}</td>
              <td className="p-2">{emp.role}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}