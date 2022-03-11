import React, { useState, useEffect } from "react";
//import { nanoid } from "nanoid";


export default function Question(props) {
    console.log('#############Question Component rendered#############')
    const [allChoices, setAllChoices] = useState({
        question: '',
        choices: [],
        userAnswer: '',
        correctAnswer: ''
    });
    const [userChoice, setUserChoice] = useState('');


    function selectAnswer(userSelectedAnswer) {
        //console.log('userSelectedAnswer: ', userSelectedAnswer, 'allAnswers.correctAnswer: ', allAnswers.correctAnswer)
        setUserChoice(userSelectedAnswer);
        //testing
        props.saveUserAnswers(props.question.question, userSelectedAnswer, props.question.correct_answer)
    }

    useEffect(() => {
        function createAnswerObj(question, choices, correctAnswer) {
            return {
                question: question,
                choices: choices,
                userAnswer: '',
                correctAnswer: correctAnswer
            }
        }

        const shuffleArray = array => array.map(a => ({ sort: Math.random(), value: a })).sort((a, b) => a.sort - b.sort).map(a => a.value);
        let choices = [];
        if (props.question.type === 'multiple') {
            let answers = props.question.incorrect_answers;
            answers.push(props.question.correct_answer);
            let shuffledAnswers = shuffleArray(answers);
            for (let i = 0; i < shuffledAnswers.length; i++) {
                choices.push({ value: shuffledAnswers[i], isSelected: false })
            }

            setAllChoices(() => createAnswerObj(props.question.question, choices, props.question.correct_answer));

        } else {
            let answers = [{ value: 'True', isSelected: false }, { value: 'False', isSelected: false }];

            setAllChoices(() => createAnswerObj(props.question.question, answers, props.question.correct_answer))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    console.log(props.question.correct_answer)
    let content;
    if (props.isAnswered) {
        content = allChoices.choices && allChoices.choices.map(answer => <button
            key={answer.value}
            className={userChoice === props.question.correct_answer && userChoice === answer.value ?
                'btn-answer-correct' :
                userChoice === answer.value ? 'btn-answer-incorrect' : 'btn-answer'}
            onClick={() => selectAnswer(answer.value)} >{decodeURIComponent(answer.value)}</button>)

    } else {
        content = allChoices.choices && allChoices.choices.map(answer => <button
            key={answer.value}
            className={answer.value === userChoice ? 'btn-answer-selected' : 'btn-answer'}
            onClick={() => selectAnswer(answer.value)} >{decodeURIComponent(answer.value)}</button>)

    }

    return (
        <div>
            <p>{decodeURIComponent(props.question.question)}</p>
            {/*             {allChoices.choices && allChoices.choices.map(answer => <button
                key={answer.value}
                className={answer.value === userChoice ? 'btn-answer-selected' : 'btn-answer'}
                onClick={() => selectAnswer(answer.value)} >{decodeURIComponent(answer.value)}</button>)}
 */}

            {content}
            <hr />
        </div>
    )
}