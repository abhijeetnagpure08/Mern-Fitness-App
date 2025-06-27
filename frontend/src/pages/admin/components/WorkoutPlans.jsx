import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";

const WorkoutPlans = () => {
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [error, setError] = useState("");

  const fetchMembers = async () => {
    try {
      const res = await axios.get("/members");
      setMembers(res.data);
    } catch {
      setError("Failed to fetch members.");
    }
  };

  const fetchPlans = async () => {
    try {
      const res = await axios.get("/plans");
      setPlans(res.data);
    } catch {
      setError("Failed to fetch plans.");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !assignedTo || !title) {
      setError("Please fill all fields.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("assignedTo", assignedTo);
    formData.append("title", title);

    try {
      await axios.post("/plans", formData);
      setTitle("");
      setFile(null);
      setAssignedTo("");
      fetchPlans();
      setError("");
    } catch {
      setError("Failed to upload plan.");
    }
  };

  useEffect(() => {
    fetchMembers();
    fetchPlans();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Upload Workout Plan</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleUpload} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Plan Title"
          className="w-full p-2 border"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="w-full p-2 border"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="">Select Member</option>
          {members.map((m) => (
            <option key={m._id} value={m._id}>
              {m.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          className="cursor-pointer"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
          Upload
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-2">Uploaded Plans</h3>
      <ul className="list-disc ml-6">
        {plans.map((p) => (
          <li key={p._id}>
            {p.title} -{" "}
            <a
              href={`http://localhost:5000${p.fileUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutPlans;
