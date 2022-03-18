import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Quizz from './components/Quizz';


function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:numOfQuestionsParam/:difficultyParam' element={<Home />} />
          <Route path='/quizz/:numberOfQuestions/:difficulty' element={<Quizz />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
