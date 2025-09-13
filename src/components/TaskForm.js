import React, { useState } from 'react';
import { tasksAPI } from '../services/api';

const TaskForm = ({ onTaskCreated, editingTask, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    title: editingTask?.title || '',
    description: editingTask?.description || '',
    due_date: editingTask?.due_date || '',
    priority: editingTask?.priority || 'medium'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;
      if (editingTask && editingTask.id) {
        response = await tasksAPI.updateTask(editingTask.id, formData);
      } else {
        response = await tasksAPI.createTask(formData);
      }
      
      onTaskCreated(response.data);
      setFormData({
        title: '',
        description: '',
        due_date: '',
        priority: 'medium'
      });
    } catch (error) {
      setError(error.response?.data?.detail || 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form">
      <h3>{editingTask && editingTask.id ? 'Edit Task' : 'Create New Task'}</h3>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength="200"
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Priority:</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : (editingTask && editingTask.id ? 'Update Task' : 'Create Task')}
          </button>
          {editingTask && editingTask.id && (
            <button type="button" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;