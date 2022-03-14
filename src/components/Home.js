import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function Home() {
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    const [difficulty, setDifficulty] = useState("")
    const numberOfQuestionsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const difficultyLevelArray = ["easy", "medium", "hard"]

    const numberOfQuestionsElements = numberOfQuestionsArray.map(number => <option key={number} value={number} >{number}</option>);
    numberOfQuestionsElements.unshift(<option key={0} >Select a number</option>)

    const difficultyLevelElements = difficultyLevelArray.map(level => <option key={level} value={level} >{level}</option>);
    difficultyLevelElements.unshift(<option key={0} >Select a level of difficulty</option>)


    function handleNumberChange(event) {
        setNumberOfQuestions(parseInt(event.target.value));
    }

    function handleDifficultyChange(event) {
        setDifficulty(event.target.value)
    }

    let navigate = useNavigate();

    function navigateToQuizz() {
        if (numberOfQuestions === 0 || difficulty === "") {
            alert("Please, make sure to select all options.")
        } else {
            navigate(`/quizz/${numberOfQuestions}/${difficulty}`)
        }
    }

    return (
        <section>
            <h1 className="title" >Quizz</h1>

            <h2>Test your knowledge with this Trivial Quizz.</h2>

            <label htmlFor="difficulty" className="label" >difficulty: </label>
            <select name="difficulty" id="difficulty" onChange={handleDifficultyChange} >
                {difficultyLevelElements}
            </select>

            <br />

            <label htmlFor="numberOfQuestions">number of questions: </label>
            <select name="numberOfQuestions" id="numberOfQuestions" onChange={handleNumberChange} >
                {numberOfQuestionsElements}
            </select>

            <br />

            <button
                className="btn-start"
                onClick={navigateToQuizz}>Start Quiz</button>
        </section>
    )
}