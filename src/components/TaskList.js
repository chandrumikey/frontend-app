import React, { useState, useEffect } from 'react';
import { tasksAPI } from '../services/api';
import TaskForm from './TaskForm';
import TaskStats from './TaskStats';
import { useNavigate } from 'react-router-dom';



const TaskList = () => {
    const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    completed: '',
    priority: '',
    due_date: ''
  });
  const [showStats, setShowStats] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.completed !== '') params.completed = filters.completed;
      if (filters.priority) params.priority = filters.priority;
      if (filters.due_date) params.due_date = filters.due_date;

      const response = await tasksAPI.getTasks(params);
      setTasks(response.data);
    } catch (error) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = (newTask) => {
    setTasks([newTask, ...tasks]);
    setEditingTask(null);
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await tasksAPI.deleteTask(taskId);
        setTasks(tasks.filter(task => task.id !== taskId));
      } catch (error) {
        setError('Failed to delete task');
      }
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const updatedTask = await tasksAPI.updateTask(task.id, {
        completed: !task.completed
      });
      setTasks(tasks.map(t => t.id === task.id ? updatedTask.data : t));
    } catch (error) {
      setError('Failed to update task');
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="task-list-container">
      <div className="task-header">

        <h2>My Tasks</h2>
        <div className="header-actions">
          <button 
            onClick={() => setShowStats(!showStats)} 
            className="btn-subtle"
          >
            {showStats ? 'Hide Stats' : 'Show Stats'}
          </button>
          <button type="button" onClick={() => setShowStats(!showStats)} className="btn-primary">
            + New Task
          </button>
          
            <button
  className="btn btn-primary"
  onClick={() => navigate('/calendar')}
>
  Calendar
</button>

        </div>
      </div>

      {showStats && tasks.length > 0 && (
        <TaskStats tasks={tasks} />
      )}

      {editingTask && (
        <TaskForm
          editingTask={editingTask.id ? editingTask : null}
          onTaskCreated={handleTaskCreated}
          onCancelEdit={() => setEditingTask(null)}
        />
      )}

      <div className="filters">
        <select
          value={filters.completed}
          onChange={(e) => handleFilterChange('completed', e.target.value)}
        >
          <option value="">All Status</option>
          <option value="false">Active</option>
          <option value="true">Completed</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          value={filters.due_date}
          onChange={(e) => handleFilterChange('due_date', e.target.value)}
          placeholder="Filter by date"
        />
      </div>

      <div className="tasks-grid">
        {tasks.map(task => (
          <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
            <div className="task-header">
              <h3>{task.title}</h3>
              <span className={`priority-badge ${task.priority}`}>
                {task.priority}
              </span>
            </div>
            
            <p className="task-description">{task.description}</p>
            
            <div className="task-details">
              {task.due_date && (
                <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
              )}
              <span>Created: {new Date(task.created_at).toLocaleDateString()}</span>
            </div>

            <div className="task-actions">
              <button
                onClick={() => handleToggleComplete(task)}
                className={task.completed ? 'btn-secondary' : 'btn-primary'}
              >
                {task.completed ? 'Mark Active' : 'Complete'}
              </button>
              
              <button
                onClick={() => setEditingTask(task)}
                className="btn-secondary"
              >
                Edit
              </button>
              
              <button
                onClick={() => handleDelete(task.id)}
                className="btn-danger"
              >
                Delete
              </button>
            
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="empty-state">
          <p>No tasks found. Create your first task!</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;