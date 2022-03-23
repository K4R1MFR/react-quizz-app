import React, { useState, useEffect } from "react";
import Question from "./Question";
import Confetti from "react-confetti";
import loadingGIF from "../images/Spinner-loading-1s-200px.gif";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";


export default function Quizz() {
    const [data, setData] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false)
    const [userName, setUserName] = useState("");
    const [isSaved, setIsSaved] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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

    async function saveOnLeaderboard(userName, userScore, userScoreOutOf) {
        if (userName.length > 1) {
            let { data, error, status } = await supabase
                .from('Leaderboard')
                .insert([
                    { name: userName, score: userScore, outOf: userScoreOutOf }
                ]);

            setIsSaved(true);
            console.log('data: ', data, 'error: ', error, 'status: ', status);
        } else {
            setErrorMessage('please enter your name first.');
        }
    }

    const navigate = useNavigate();
    function reset() {

        navigate(`/${params.numberOfQuestions}/${params.difficulty}`)
        //setUserAnswers([])
        //setIsAnswered(false)
        //setScore(0)
    }

    function userInputHandler(event) {
        setUserName(event.target.value)
    }


    const questionElements = data.map(x => <Question key={x.question} question={x} saveUserAnswers={saveUserAnswers} isAnswered={isAnswered} />)

    const inputLeaderboard =
        <div>
            {isSaved === false ?
                <div className="leaderboardInput" >
                    <div> If you would like, you can save your score into the leaderboard.</div>
                    <div>Enter your name here to do so:</div>
                    <input
                        type="text"
                        value={userName}
                        onChange={userInputHandler} ></input>
                    <input
                        type="submit"
                        onClick={() => saveOnLeaderboard(userName, score, userAnswers.length)} ></input>
                    <div className="errorMessage" >{errorMessage}</div>
                </div> :
                <div>Your score is saved!</div>}
        </div>

    const { innerWidth, innerHeight } = window;
    return (
        <main>
            {data.length > 0 && score === data.length && <Confetti width={innerWidth} height={innerHeight} />}
            {data < 1 ?
                <img src={loadingGIF} alt="loading gif" /> :
                <div>
                    {questionElements}
                    {isAnswered ?
                        <div>You scored {score} out of {userAnswers.length} correct answers.</div> :
                        ''}
                    <button
                        className="btn-check-answer"
                        onClick={isAnswered ? reset : checkAnswers} >{isAnswered ? 'Play Again' : 'Check Answers'}
                    </button>
                </div>}
            {isAnswered && score !== 0 ? inputLeaderboard : ''}
        </main>
    )
}