import React, { useState } from "react";
import {
  Clock,
  Calendar,
  Edit2,
  Trash2,
  Plus,
  Filter,
  CheckCircle,
  Circle,
} from "lucide-react";

const Mainpage = () => {
  const [isID, setIsID] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [chack, setChack] = useState(false);
  const [work, setWork] = useState("Code");
  const [description, setDescription] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [TimeLog, setTimeLog] = useState([]);

  const handleDateChange = (e) => {
    setFilterDate(e.target.value);
  };

  const handleSubmit = () => {
    if (!startTime || !endTime) {
      alert("Please enter both start and end times");
      return;
    }

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
      setTimeLog((prev) =>
        prev.map((entry) => (entry.id === isID ? newEntry : entry))
      );
      setIsID(0);
    } else {
      setTimeLog((prev) => [...prev, newEntry]);
    }

    setChack(false);
    setStartTime("");
    setEndTime("");
    setWork("Code");
    setDescription("");
  };

  const handleDelete = (id) => {
    setTimeLog((prev) => prev.filter((entry) => entry.id !== id));
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

  const getWorkTypeColor = (workType) => {
    switch (workType) {
      case "Code":
        return "bg-blue-100 text-blue-800";
      case "Learning":
        return "bg-green-100 text-green-800";
      case "Eating":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalHours = filteredLogs.reduce((sum, log) => sum + log.house, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                TimeTracker Pro
              </h1>
            </div>
            <div className="text-sm text-gray-600">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Hours Today
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalHours}h
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Completed Tasks
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredLogs.filter((log) => log.chack).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Entries
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredLogs.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Form */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              {isID ? "Edit Time Entry" : "Add New Time Entry"}
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={chack}
                    onChange={(e) => setChack(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Mark as Completed</span>
                </label>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  End Time
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Work Type
                </label>
                <select
                  value={work}
                  onChange={(e) => setWork(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Code">Code</option>
                  <option value="Learning">Learning</option>
                  <option value="Eating">Eating</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="Enter task description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
              >
                {isID ? "Update Entry" : "Add Entry"}
              </button>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filter Entries
            </h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Filter by Date
                </label>
                <input
                  type="date"
                  value={filterDate}
                  onChange={handleDateChange}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {filterDate && (
                <button
                  onClick={() => setFilterDate("")}
                  className="mt-7 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Time Log Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Time Log Entries
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium mb-2">
                        No time entries found
                      </p>
                      <p className="text-sm">
                        Add your first time entry to get started!
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.chack ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-400" />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.startTime} - {user.endTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.house}h
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getWorkTypeColor(
                            user.work
                          )}`}
                        >
                          {user.work}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                        {user.description || "No description"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(user.id)}
                          className="text-blue-600 hover:text-blue-900 mr-4 inline-flex items-center"
                        >
                          <Edit2 className="h-4 w-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-900 inline-flex items-center"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
