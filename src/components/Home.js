import React from "react";
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <section>
            <h1>Quizz</h1>
            <p>Test your knowledge with this Trivial Quizz.</p>
            <Link to="/quizz" >
                <button
                    className="btn-start">Start Quiz</button>
            </Link>
        </section>
    )
}