import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { tasksAPI } from '../services/api';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useTheme } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 
                 text-gray-800 dark:text-gray-200 hover:bg-gray-300 
                 dark:hover:bg-gray-600 transition"
    >
      {isDarkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
};
const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarView = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await tasksAPI.getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const events = tasks
    .filter(task => task.due_date)
    .map(task => ({
      id: task.id,
      title: task.title,
      start: new Date(task.due_date),
      end: new Date(task.due_date),
      allDay: true,
      completed: task.completed,
      priority: task.priority,
    }));

  const eventStyleGetter = (event) => {
    let backgroundColor = '#3174ad';
    if (event.completed) {
      backgroundColor = '#4CAF50';
    } else if (event.priority === 'high') {
      backgroundColor = '#e74c3c';
    } else if (event.priority === 'medium') {
      backgroundColor = '#f39c12';
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: event.completed ? 0.7 : 1,
        color: 'white',
        border: 'none',
      },
    };
  };
}

  

export default CalendarView;