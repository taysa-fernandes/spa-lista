import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TaskApp from './lista'; // Corrigido o nome do arquivo de importação
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <Route exact path="/" component={TaskApp} /> {/* Renderiza o componente TaskApp na rota principal */}
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
