import React from 'react';
import './BtnChangeTheme.css';
import solImg from './assets/Sol.jpg'; // Ruta a tu imagen del sol
import lunaImg from './assets/Luna.png'; 

const BtnChangeTheme = ({ isDark, handlerClick }) => {
  return (
    <span
      className={`change-theme-btn ${isDark ? 'dark-theme' : 'light-theme'}`}
      onClick={handlerClick}
      role="button"
      tabIndex={0}
    >
      <span className="sr-only"></span>
      <img
        src={isDark ? lunaImg : solImg} // Reemplaza lunaImg y solImg con las URL de tus imágenes
        alt={isDark ? 'Modo claro' : 'Modo oscuro'}
        className="icon-img"
      />
    </span>
  );
};

export default BtnChangeTheme;