// src/components/CalendarView.js
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

const CalendarView = () => {
  const [tasks, setTasks] = useState([]); // ✅ initialize as array
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/tasks/"); // adjust API URL
        console.log("API Response:", res.data);

        // ✅ normalize response
        if (Array.isArray(res.data)) {
          setTasks(res.data);
        } else if (res.data?.tasks) {
          setTasks(res.data.tasks);
        } else {
          setTasks([]);
        }
      } catch (err) {
        console.error("Error fetching tasks", err);
        setTasks([]);
      }
    };

    fetchTasks();
  }, []);

  // ✅ safe reduce
  const tasksByDate = (tasks || []).reduce((acc, task) => {
    const dateKey = task.due_date ? task.due_date.split("T")[0] : null;
    if (dateKey) {
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(task);
    }
    return acc;
  }, {});

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">📅 Task Calendar</h1>

      {/* Calendar full screen */}
      <div className="flex-1 flex">
        <div className="w-2/3 flex items-center justify-center">
          <Calendar
            onChange={setDate}
            value={date}
            className="w-full h-full rounded-lg shadow-lg p-4"
          />
        </div>

        {/* Task list for selected date */}
        <div className="w-1/3 p-4 overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">
            Tasks on {date.toISOString().split("T")[0]}
          </h2>
          <ul className="space-y-2">
            {tasksByDate[date.toISOString().split("T")[0]]?.length > 0 ? (
              tasksByDate[date.toISOString().split("T")[0]].map((task, idx) => (
                <li
                  key={idx}
                  className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md shadow-sm"
                >
                  <span className="font-medium">{task.title || "Untitled Task"}</span>
                  <p className="text-sm">{task.description || ""}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-500 italic">No tasks for this date</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
