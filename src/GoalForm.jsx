import React, { useState } from 'react';

function GoalForm({ addGoal }) {
  const [newGoal, setNewGoal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newGoal.trim() !== '') {
      const uppercaseGoal = newGoal.toUpperCase(); // Convierte la meta a mayúsculas
      addGoal(uppercaseGoal);
      setNewGoal('');
    } else {
      console.log('Por favor, ingresa una meta válida.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <input
        type="text"
        value={newGoal}
        onChange={(e) => setNewGoal(e.target.value)}
        placeholder="Ingrese su meta diaria"
      />
      <button className='meta' type="submit">Agregar Meta</button>
    </form>
  );
}

export default GoalForm;