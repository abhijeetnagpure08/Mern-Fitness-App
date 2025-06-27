// import React, { useEffect, useState } from "react";
// import axios from "../../../api/axios";

// const Members = () => {
//   const [members, setMembers] = useState([]);
//   const [error, setError] = useState("");

//   const fetchMembers = async () => {
//     try {
//       const res = await axios.get("/members");
//       setMembers(res.data);
//     } catch (err) {
//       setError("Failed to fetch members.");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this member?")) return;
//     try {
//       await axios.delete(`/members/${id}`);
//       setMembers(members.filter((m) => m._id !== id));
//     } catch (err) {
//       setError("Failed to delete member.");
//     }
//   };

//   useEffect(() => {
//     fetchMembers();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Manage Members</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       <table className="min-w-full bg-white border">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">Name</th>
//             <th className="border px-4 py-2">Email</th>
//             <th className="border px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {members.map((member) => (
//             <tr key={member._id}>
//               <td className="border px-4 py-2">{member.name}</td>
//               <td className="border px-4 py-2">{member.email}</td>
//               <td className="border px-4 py-2 space-x-2">
//                 <button
//                   onClick={() => handleDelete(member._id)}
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

// export default Members;

import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchMembers = async () => {
    try {
      const res = await axios.get("/members");
      setMembers(res.data);
    } catch (err) {
      setError("Failed to fetch members.");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this member?")) return;
    try {
      await axios.delete(`/members/${id}`);
      setMembers(members.filter((m) => m._id !== id));
    } catch (err) {
      setError("Failed to delete member.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || (!password && !editId)) {
      setError("Please fill all fields.");
      return;
    }

    try {
      if (editId) {
        // Update
        await axios.put(`/members/${editId}`, { name, email });
        setMembers(
          members.map((m) =>
            m._id === editId ? { ...m, name, email } : m
          )
        );
      } else {
        // Create
        const res = await axios.post("/members", {
          name,
          email,
          password,
        });
        setMembers([...members, res.data]);
      }

      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setEditId(null);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to save member."
      );
    }
  };

  const handleEdit = (m) => {
    setName(m.name);
    setEmail(m.email);
    setPassword("");
    setEditId(m._id);
  };

  const handleCancelEdit = () => {
    setName("");
    setEmail("");
    setPassword("");
    setEditId(null);
    setError("");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {editId ? "Edit Member" : "Add New Member"}
      </h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!editId && (
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
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

      <h2 className="text-xl font-semibold mb-4">Existing Members</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m._id}>
              <td className="border px-4 py-2">{m.name}</td>
              <td className="border px-4 py-2">{m.email}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(m)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(m._id)}
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

export default Members;

