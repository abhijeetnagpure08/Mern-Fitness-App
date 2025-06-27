// import React, { useEffect, useState } from "react";
// import axios from "../../../api/axios";

// const Classes = () => {
//   const [classes, setClasses] = useState([]);
//   const [error, setError] = useState("");

//   const fetchClasses = async () => {
//     try {
//       const res = await axios.get("/classes");
//       setClasses(res.data);
//     } catch (err) {
//       setError("Failed to fetch classes.");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this class?")) return;
//     try {
//       await axios.delete(`/classes/${id}`);
//       setClasses(classes.filter((c) => c._id !== id));
//     } catch (err) {
//       setError("Failed to delete class.");
//     }
//   };

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Manage Classes</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       <table className="min-w-full bg-white border">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">Title</th>
//             <th className="border px-4 py-2">Description</th>
//             <th className="border px-4 py-2">Schedule</th>
//             <th className="border px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {classes.map((cls) => (
//             <tr key={cls._id}>
//               <td className="border px-4 py-2">{cls.title}</td>
//               <td className="border px-4 py-2">{cls.description}</td>
//               <td className="border px-4 py-2">{cls.schedule}</td>
//               <td className="border px-4 py-2 space-x-2">
//                 <button
//                   onClick={() => handleDelete(cls._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Classes;

import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [schedule, setSchedule] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchClasses = async () => {
    try {
      const res = await axios.get("/classes");
      setClasses(res.data);
    } catch (err) {
      setError("Failed to fetch classes.");
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this class?")) return;
    try {
      await axios.delete(`/classes/${id}`);
      setClasses(classes.filter((c) => c._id !== id));
    } catch (err) {
      setError("Failed to delete class.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !schedule) {
      setError("Please fill all fields.");
      return;
    }

    try {
      if (editId) {
        // Update
        await axios.put(`/classes/${editId}`, { title, description, schedule });
        setClasses(
          classes.map((c) =>
            c._id === editId ? { ...c, title, description, schedule } : c
          )
        );
      } else {
        // Create
        const res = await axios.post("/classes", { title, description, schedule });
        setClasses([...classes, res.data]);
      }

      // Reset form
      setTitle("");
      setDescription("");
      setSchedule("");
      setEditId(null);
      setError("");
    } catch (err) {
      setError("Failed to save class.");
    }
  };

  const handleEdit = (cls) => {
    setTitle(cls.title);
    setDescription(cls.description);
    setSchedule(cls.schedule);
    setEditId(cls._id);
  };

  const handleCancelEdit = () => {
    setTitle("");
    setDescription("");
    setSchedule("");
    setEditId(null);
    setError("");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {editId ? "Edit Class" : "Add New Class"}
      </h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="w-full p-2 border"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Schedule"
          className="w-full p-2 border"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
        />
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editId ? "Update" : "Create"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="text-xl font-semibold mb-4">Existing Classes</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Schedule</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => (
            <tr key={cls._id}>
              <td className="border px-4 py-2">{cls.title}</td>
              <td className="border px-4 py-2">{cls.description}</td>
              <td className="border px-4 py-2">{cls.schedule}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(cls)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cls._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Classes;

