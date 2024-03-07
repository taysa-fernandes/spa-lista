import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/tasks/");
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async () => {
    try {
      const response = await axios.post("http://localhost:8000/tasks/", { title: newTask });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/tasks/${taskId}/`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTask = async (taskId, newTitle) => {
    try {
      await axios.put(`http://localhost:8000/tasks/${taskId}/`, { title: newTitle });
      setTasks(tasks.map(task => task.id === taskId ? { ...task, title: newTitle } : task));
      setEditingTaskId(null);
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleStartEditing = (taskId, title) => {
    setEditingTaskId(taskId);
    setEditedTaskTitle(title);
  };

  const handleCancelEditing = () => {
    setEditingTaskId(null);
    setEditedTaskTitle('');
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Digite uma nova tarefa"
      />
      <button onClick={handleAddTask}>Adicionar Tarefa</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
              <div>
                <input
                  type="text"
                  value={editedTaskTitle}
                  onChange={(e) => setEditedTaskTitle(e.target.value)}
                />
                <button onClick={() => handleEditTask(task.id, editedTaskTitle)}>Salvar</button>
                <button onClick={handleCancelEditing}>Cancelar</button>
              </div>
            ) : (
              <div>
                {task.title}
                <button onClick={() => handleStartEditing(task.id, task.title)}>Editar</button>
                <button onClick={() => handleDeleteTask(task.id)}>Excluir</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskApp;
