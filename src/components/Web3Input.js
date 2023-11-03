import React, { useState } from "react";

const GlassmorphismBox = () => {
  const [address, setAddress] = useState("");
  const [taskCompleted, setTaskCompleted] = useState(false);

  const checkTaskCompletion = async () => {
    try {
      const response = await fetch(`/checkTaskCompletion/${address}`);
      const data = await response.json();
      setTaskCompleted(data.taskCompleted);
    } catch (error) {
      console.error(error);
    }
  };

  const confirmTaskCompletion = async () => {
    try {
      await fetch(`/confirmTaskCompletion/${address}`, { method: "POST" });
      checkTaskCompletion(); // Refresh task completion status
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex flex-column pt-5 align-items-center min-vh-100">
      <div className="glassmorphism-box p-4">
        <h1 className="text-white mb-4 text-center">Reward Pool</h1>
        <input
          type="text"
          placeholder="Ethereum Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="form-control mb-3"
        />
        <button onClick={checkTaskCompletion} className="btn btn-primary m-4">
          Check Task Completion
        </button>
        {taskCompleted ? (
          <p className="text-white">Task has been confirmed as completed.</p>
        ) : (
          <button
            onClick={confirmTaskCompletion}
            className="btn btn-primary">
            Confirm Task Completion
          </button>
        )}
      </div>
    </div>
  );
};

export default GlassmorphismBox;
