export default function DepartmentModal({
  showModal,
  setShowModal,
  departmentName,
  setDepartmentName,
  saveDepartment,
  editId
}) {

  if (!showModal) return null;

  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">

      <div className="bg-white p-6 rounded w-80">

        <h2 className="text-xl font-bold mb-4">
          {editId ? "Edit Department" : "Add Department"}
        </h2>

        <input
          value={departmentName}
          placeholder="Department Name"
          className="border p-2 w-full mb-4"
          onChange={(e) => setDepartmentName(e.target.value)}
        />

        <div className="flex justify-end space-x-2">

          <button
            onClick={()=>{
setShowModal(false);
setDepartmentName("");
}}
            className="bg-gray-400 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>

          <button
            onClick={saveDepartment}
            className="bg-indigo-600 text-white px-3 py-1 rounded"
          >
            Save
          </button>

        </div>

      </div>

    </div>

  );
}