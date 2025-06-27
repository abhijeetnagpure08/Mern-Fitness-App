// import React from "react";

// const AdminDashboard = () => {
//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
//       <p>Manage Members, Classes, and Workout Plans here.</p>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState } from "react";
import Members from "./components/Members";
import Classes from "./components/Classes";
import WorkoutPlans from "./components/WorkoutPlans";
import LogoutButton from "../../components/LogoutButton";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("members");
    const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="p-6">
      {/* <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1> */}
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <LogoutButton />
    </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("members")}
          className={`px-4 py-2 rounded ${
            activeTab === "members"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Members
        </button>
        <button
          onClick={() => setActiveTab("classes")}
          className={`px-4 py-2 rounded ${
            activeTab === "classes"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Classes
        </button>
        <button
          onClick={() => setActiveTab("plans")}
          className={`px-4 py-2 rounded ${
            activeTab === "plans"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Workout Plans
        </button>
      </div>

      <div>
        {activeTab === "members" && <Members />}
        {activeTab === "classes" && <Classes />}
        {activeTab === "plans" && <WorkoutPlans />}
      </div>
    </div>
  );
};

export default AdminDashboard;

