import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function Home() {
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    const numberOfQuestionsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const numberOfQuestionsElements = numberOfQuestionsArray.map(number => <option key={number} value={number} >{number}</option>);

    numberOfQuestionsElements.unshift(<option key={0} value="5" >Select a number</option>)

    console.log(numberOfQuestionsElements)

    function handleChange(event) {
        setNumberOfQuestions(parseInt(event.target.value));
    }

    let navigate = useNavigate();

    function navigateToQuizz() {
        if (numberOfQuestions === 0) {
            alert("Please, select a number of questions.")
        } else {
            navigate(`/quizz/${numberOfQuestions}`)
        }
    }

    return (
        <section>
            <h1>Quizz</h1>
            <p>Test your knowledge with this Trivial Quizz.</p>
            <label htmlFor="numberOfQuestions">number of questions:</label>
            <select name="numberOfQuestions" id="numberOfQuestions" onChange={handleChange} >
                {numberOfQuestionsElements}
            </select>
            <button
                className="btn-start"
                onClick={navigateToQuizz}>Start Quiz</button>
        </section>
    )
}