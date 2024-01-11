// App.js
import React, { useState, useEffect } from 'react';
import GoalForm from './GoalForm';
import DailyProgress from './DailyProgress';
import BtnChangeTheme from './BtnChangeTheme';
import './App.css';


function App() {
  const storedGoals = JSON.parse(localStorage.getItem('goals')) || [];
  const [goals, setGoals] = useState(storedGoals);
  const [allCompleted, setAllCompleted] = useState(false);
  const [showCongratsMessage, setShowCongratsMessage] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGoals, setFilteredGoals] = useState([]);

  useEffect(() => {
    // Filtra las metas según el término de búsqueda
    const filtered = goals.filter(goal =>
      goal.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGoals(filtered);
  }, [searchTerm, goals]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    if (!isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  };

  const addGoal = (newGoal) => {
    setGoals([...goals, { text: newGoal, completed: false }]);
    setShowCongratsMessage(false);
  };

  const deleteGoal = (index) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
  };

  const toggleGoal = (index) => {
    const updatedGoals = goals.map((goal, i) =>
      i === index ? { ...goal, completed: !goal.completed } : goal
    );
    setGoals(updatedGoals);
  };

  useEffect(() => {
    const areAllGoalsCompleted = goals.length > 0 && goals.every((goal) => goal.completed);
    setAllCompleted(areAllGoalsCompleted);
    setShowCongratsMessage(areAllGoalsCompleted);
    localStorage.setItem('goals', JSON.stringify(goals)); // Guarda las tareas en localStorage
  }, [goals]);

  const handlerClick = () => {
    // Lógica para cambiar el tema
    console.log('Cambio de tema ejecutado');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  return (
    <div className={`app-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <h1>Rutina Diaria</h1>
      <BtnChangeTheme handlerClick={toggleTheme} isDark={isDarkTheme} />      
      <GoalForm addGoal={addGoal} /><br />
      <input 
        type="text"
        placeholder="Buscar tarea..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <DailyProgress
        goals={filteredGoals} // Muestra las metas filtradas en lugar de todas las metas
        toggleGoal={toggleGoal}
        deleteGoal={deleteGoal}
      />      
      {allCompleted && showCongratsMessage && (
        <p className='mensaje'>¡Felicidades! Has completado todas las tareas.</p>
      )}
      {!allCompleted && goals.length === 0 && (
        <p>Agrega nuevas tareas para comenzar.</p>
      )}
    </div>
  );
}

export default App;