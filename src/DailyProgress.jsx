import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './DailyProgress.css';

function GoalItem({ goal, index, toggleGoal, deleteGoal }) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = () => {
    deleteGoal(index);
    setShowDeleteConfirmation(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className={`goal-item ${goal.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={goal.completed}
        onChange={() => toggleGoal(index)}
      />
      <span style={{ textDecoration: goal.completed ? 'line-through' : 'none' }}>
        {goal.text}
      </span>
      <button onClick={handleDeleteClick}>
        <FontAwesomeIcon icon={faTrash} />
      </button>

      {/* Modal de confirmación */}
      {showDeleteConfirmation && (
        <div className="delete-confirmation">
          <p>¿Estás seguro de eliminar esta tarea?</p>
          <button onClick={handleDeleteConfirm}>Sí</button>
          <button onClick={handleDeleteCancel}>Cancelar</button>
        </div>
      )}
    </div>
  );
}

function DailyProgress({ goals, toggleGoal, deleteGoal }) {
  const totalGoals = goals.length;
  const completedGoals = goals.filter((goal) => goal.completed).length;
  const progress = totalGoals === 0 ? 0 : (completedGoals / totalGoals) * 100;

  return (
    <div>
      <h2>Progreso Diario</h2>
      <div>
        <progress value={progress} max="100"></progress>
        <span>{progress}% completado</span>
      </div>
      <div className="goals-container">
        {goals.map((goal, index) => (
          <GoalItem
            key={index}
            goal={goal}
            index={index}
            toggleGoal={toggleGoal}
            deleteGoal={deleteGoal}
          />
        ))}
      </div>
    </div>
  );
}

export default DailyProgress;