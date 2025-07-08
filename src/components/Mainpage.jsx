import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUsere,
  deleteUser,
  updateUser,
  setFilterDate,
} from "../redux/TimeLogReducer";

const Mainpage = () => {
  const [isID, setIsID] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [chack, setChack] = useState(false);
  const [work, setWork] = useState("Code");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const TimeLog = useSelector((state) => state.timeLog.data || []);
  const filterDate = useSelector((state) => state.timeLog.filterDate);

  const handleDateChange = (e) => {
    dispatch(setFilterDate(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const duration =
      parseInt(endTime.slice(0, 2)) - parseInt(startTime.slice(0, 2));

    const todayDate = new Date().toISOString().slice(0, 10);

    const newEntry = {
      id: isID || Date.now(),
      chack,
      startTime,
      endTime,
      house: duration,
      work,
      description,
      date: todayDate,
    };

    if (isID) {
      dispatch(updateUser(newEntry));
      setIsID(0);
    } else {
      dispatch(addUsere(newEntry));
    }

    setChack(false);
    setStartTime("");
    setEndTime("");
    setWork("Code");
    setDescription("");
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = (id) => {
    const userData = TimeLog.find((user) => user.id === id);
    if (userData) {
      setChack(userData.chack);
      setStartTime(userData.startTime);
      setEndTime(userData.endTime);
      setWork(userData.work);
      setDescription(userData.description);
      setIsID(id);
    }
  };

  const filteredLogs = filterDate
    ? TimeLog.filter((log) => log.date === filterDate)
    : TimeLog;

  return (
    <div className="p-4 flex flex-col items-center">
      <div className="mb-4">
        <input
          type="date"
          value={filterDate}
          onChange={handleDateChange}
          className="border px-2 py-1 rounded"
        />
      </div>

      <h1 className="text-3xl font-bold mb-4">Time Log</h1>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mb-6">
        <label>
          <input
            type="checkbox"
            checked={chack}
            onChange={(e) => setChack(e.target.checked)}
            className="mr-2"
          />
          Task
        </label>

        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="border px-2 py-1 rounded"
        />

        <select
          value={work}
          onChange={(e) => setWork(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="Code">Code</option>
          <option value="Learning">Learning</option>
          <option value="Eating">Eating</option>
        </select>

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-2 py-1 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          {isID ? "Update" : "Add"}
        </button>
      </form>

      <table className="w-full max-w-4xl text-sm border">
        <thead>
          <tr className="bg-gray-200">
            <th>Task</th>
            <th>Start</th>
            <th>End</th>
            <th>Hours</th>
            <th>Work</th>
            <th>Description</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center p-4 text-gray-500">
                No records found
              </td>
            </tr>
          ) : (
            filteredLogs.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="text-center">
                  <input type="checkbox" checked={user.chack} readOnly />
                </td>
                <td className="text-center">{user.startTime}</td>
                <td className="text-center">{user.endTime}</td>
                <td className="text-center">{user.house}</td>
                <td className="text-center">{user.work}</td>
                <td className="text-center">{user.description}</td>
                <td className="text-center">{user.date}</td>
                <td className="text-center">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Mainpage;
