// import React, { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import LogoutButton from "../../components/LogoutButton";

// const MemberDashboard = () => {
//   const [classes, setClasses] = useState([]);
//   const [plans, setPlans] = useState([]);
//   const [error, setError] = useState("");

//   const userId = JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [classRes, planRes] = await Promise.all([
//           axios.get("/classes"),
//           axios.get(`/plans/${userId}`),
//         ]);
//         setClasses(classRes.data);
//         setPlans(planRes.data);
//       } catch (err) {
//         setError("Failed to load data");
//       }
//     };
//     fetchData();
//   }, [userId]);

//   return (
//     <div className="p-8">
//       {/* <h1 className="text-3xl font-bold mb-4">Member Dashboard</h1> */}
//       <div className="flex justify-between items-center mb-6">
//   <h1 className="text-3xl font-bold">Member Dashboard</h1>
//   <LogoutButton />
// </div>

//       {error && <p className="text-red-500">{error}</p>}

//       <h2 className="text-xl font-semibold mt-6">Available Classes</h2>
//       <ul className="list-disc ml-6">
//         {classes.map((cls) => (
//           <li key={cls._id}>
//             <p className="font-semibold">{cls.title}</p>
//             <p className="text-sm">{cls.description}</p>
//             <p className="text-sm italic">{cls.schedule}</p>
//           </li>
//         ))}
//       </ul>

//       <h2 className="text-xl font-semibold mt-6">Your Workout Plans</h2>
//       <ul className="list-disc ml-6">
//         {plans.map((plan) => (
//           <li key={plan._id}>
//             <a
//               href={`http://localhost:5000${plan.fileUrl}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 underline"
//             >
//               {plan.title}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MemberDashboard;
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import LogoutButton from "../../components/LogoutButton";

const MemberDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState("");

  const userId = JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classRes, planRes] = await Promise.all([
          axios.get("/classes"),
          axios.get(`/plans/${userId}`),
        ]);
        setClasses(classRes.data);
        setPlans(planRes.data);
        setError("");
      } catch (err) {
        setError("Failed to load data.");
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
              <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold">Member Dashboard</h1>
  <LogoutButton />
 </div>
      <div className="max-w-5xl mx-auto">

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Available Classes</h2>
          {classes.length === 0 ? (
            <p className="text-gray-600">No classes available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {classes.map((cls) => (
                <div
                  key={cls._id}
                  className="bg-white p-4 rounded shadow hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-bold text-gray-800">{cls.title}</h3>
                  <p className="text-gray-600 mb-2">{cls.description}</p>
                  <p className="text-sm text-gray-500 italic">{cls.schedule}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Workout Plans</h2>
          {plans.length === 0 ? (
            <p className="text-gray-600">No workout plans assigned yet.</p>
          ) : (
            <ul className="space-y-3">
              {plans.map((plan) => (
                <li
                  key={plan._id}
                  className="bg-white p-4 rounded shadow hover:shadow-lg transition flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-lg font-medium text-gray-800">{plan.title}</h4>
                    <p className="text-sm text-gray-500">
                      Assigned on {new Date(plan.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <a
                    href={`http://localhost:5000${plan.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View PDF
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default MemberDashboard;

