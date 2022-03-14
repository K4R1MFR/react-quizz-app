import React, { useState, useEffect } from "react";


export default function Question(props) {
    const [allChoices, setAllChoices] = useState([]);
    const [userChoice, setUserChoice] = useState('');


    function selectAnswer(userSelectedAnswer) {
        setUserChoice(userSelectedAnswer);
        props.saveUserAnswers(props.question.question, userSelectedAnswer, props.question.correct_answer)
    }

    useEffect(() => {

        const shuffleArray = array => array.map(a => ({ sort: Math.random(), value: a })).sort((a, b) => a.sort - b.sort).map(a => a.value);
        let choices = [];
        if (props.question.type === 'multiple') {
            let answers = props.question.incorrect_answers;
            answers.push(props.question.correct_answer);
            let shuffledAnswers = shuffleArray(answers);
            for (let i = 0; i < shuffledAnswers.length; i++) {
                choices.push({ value: shuffledAnswers[i], isSelected: false })
            }

            setAllChoices(choices);

        } else {
            let answers = [{ value: 'True', isSelected: false }, { value: 'False', isSelected: false }];

            setAllChoices(answers)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let answerElements;
    if (props.isAnswered) {
        answerElements = allChoices.length > 1 && allChoices.map(answer => <button
            key={answer.value}
            className={userChoice === props.question.correct_answer && userChoice === answer.value ?
                'btn-answer-correct' :
                userChoice === answer.value ? 'btn-answer-incorrect' :
                    userChoice !== props.question.correct_answer && answer.value === props.question.correct_answer ? 'btn-answer-correct' : 'btn-answer'}
            onClick={() => selectAnswer(answer.value)} >{decodeURIComponent(answer.value)}</button>)

    } else {
        answerElements = allChoices.length > 1 && allChoices.map(answer => <button
            key={answer.value}
            className={answer.value === userChoice ? 'btn-answer-selected' : 'btn-answer'}
            onClick={() => selectAnswer(answer.value)} >{decodeURIComponent(answer.value)}</button>)

    }

    return (
        <div>
            <p>{decodeURIComponent(props.question.question)}</p>
            {answerElements}
            <hr />
        </div>
    )
}