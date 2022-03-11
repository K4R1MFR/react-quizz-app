import React, { useState, useEffect } from "react";
import Question from "./Question";
import Confetti from "react-confetti";

export default function Quizz() {
    const [data, setData] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(false)

    console.log('window rendered')

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&encode=url3986")
            .then(response => response.json())
            .then(data => setData(data['results']))
        console.log('data fetched')
    }, [])

    function saveUserAnswers(question, userAnswer, correctAnswer) {
        if (userAnswers.length < 1) {
            setUserAnswers([{
                question: question,
                userAnswer: userAnswer,
                correctAnswer: correctAnswer
            }])
        }
        else if (userAnswers.some(answer => answer.question === question)) {
            setUserAnswers(prevState => prevState.map(answer => {
                return answer.question === question ? { ...answer, userAnswer: userAnswer } : answer
            }))
        }
        else {
            setUserAnswers(prevState => [...prevState, {
                question: question,
                userAnswer: userAnswer,
                correctAnswer: correctAnswer
            }])
        }
    }

    function checkAnswers() {
        if (userAnswers.length === data.length) {
            for (let i = 0; i < userAnswers.length; i++) {
                if (userAnswers[i].userAnswer === userAnswers[i].correctAnswer) {
                    setScore(prevScore => prevScore + 1)
                }
            }
            setAnswered(true)
        } else {
            alert('please answer all the questions first!')
        }
    }

    function reset() {
        window.location.reload(false);
    }

    const { innerWidth, innerHeight } = window;

    const questionElements = data.map(x => <Question key={x.question} question={x} saveUserAnswers={saveUserAnswers} />)
    return (
        <section>
            {data.length > 1 && score === data.length && <Confetti width={innerWidth} height={innerHeight} />}
            {data < 1 ?
                'loading' :
                <div>
                    {questionElements}
                    {answered ? <div>You scored {score}/{userAnswers.length} correct answers.</div> : ''}
                    <button
                        className="btn-check-answer"
                        onClick={answered ? reset : checkAnswers} >{answered ? 'Play Again' : 'Check Answers'}</button>
                </div>}
        </section>
    )
}