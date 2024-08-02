import React, { useEffect, useState } from "react";
import { useToken } from "./context";
function OrdersList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken } = useToken(); // Replace with actual brand ID if dynamic
  useEffect(() => {
    const fetchTasks = async () => {
      const url = `http://localhost:3000/brand/getAllTasks?brandId=${accessToken.id}`;
console.log(accessToken);
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken.token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setTasks(result.isBrandExsit);
          console.log(result.isBrandExsit);
        } else {
          setError("Failed to fetch tasks");
        }
      } catch (error) {
        setError("Error: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [accessToken]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>All Tasks</h2>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <p>Task ID: {task._id}</p>
              <p>User ID: {task.userId}</p>
              <p>Brand ID: {task.brandId}</p>
              <p>Service ID: {task.serviceId}</p>
              <p>Task Status: {task.taskStatus}</p>
              <p>Created At: {new Date(task.createdAt).toLocaleString()}</p>
              <p>Updated At: {new Date(task.updatedAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
}

export default OrdersList;
