import React, { useState, useEffect } from "react";
import Question from "./Question";
import Confetti from "react-confetti";
import loadingGIF from "../images/Spinner-loading-1s-200px.gif";
import { useNavigate, useParams } from "react-router-dom";


export default function Quizz() {
    const [data, setData] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false)

    let params = useParams();

    useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=${params.numberOfQuestions}&difficulty=${params.difficulty}&encode=url3986`)
            .then(response => response.json())
            .then(data => setData(data['results']))
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            setIsAnswered(true)
        } else {
            alert('please answer all the questions first!')
        }
    }

    const navigate = useNavigate();
    function reset() {

        navigate(`/${params.numberOfQuestions}/${params.difficulty}`)
        //setUserAnswers([])
        //setIsAnswered(false)
        //setScore(0)
    }

    const { innerWidth, innerHeight } = window;

    const questionElements = data.map(x => <Question key={x.question} question={x} saveUserAnswers={saveUserAnswers} isAnswered={isAnswered} />)
    return (
        <main>
            {data.length > 0 && score === data.length && <Confetti width={innerWidth} height={innerHeight} />}
            {data < 1 ?
                <img src={loadingGIF} alt="loading gif" /> :
                <div>
                    {questionElements}
                    {isAnswered ? <div>You scored {score}/{userAnswers.length} correct answers.</div> : ''}
                    <button
                        className="btn-check-answer"
                        onClick={isAnswered ? reset : checkAnswers} >{isAnswered ? 'Play Again' : 'Check Answers'}
                    </button>
                </div>}
        </main>
    )
}