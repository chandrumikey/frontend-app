import React from "react";
import { useNavigate } from "react-router-dom";

const CalendarButton = () => {
  const navigate = useNavigate();

  const goToCalendar = () => {
    navigate("/calendar"); // Make sure /calendar route points to CalendarView
  };

  return (
    <button
      onClick={goToCalendar}
      className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
    >
      Go to Calendar
    </button>
  );
};

export default CalendarButton;
