import React, { useState, useEffect } from "react";
import { Spinner, Jumbotron, Container, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom"
import Question from "../components/Question";

function Lesson(props) {
    
    const results = {};
    const level = props.location.level;
    const [lessonContent, setLessonContent] = useState(
        <div>
            {level ?

            <Container className="my-4">
                <Jumbotron>
                    <h1>Lesson - {level.idhsklevel.toUpperCase()}</h1>
                    <p>Loading Lesson </p><Spinner animation="border"/>
                </Jumbotron>
            </Container>

            : <Redirect to="/dash"/>
            }
        </div>
    );
    const [lesson, setLesson] = useState(
        () => {
            if(level){
                let returning = null;
                fetch("/api/test",{
                    method:"post",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({hsklevel:level.idhsklevel})
                })
                .then(response => response.json())
                .then(response => setLesson(response))
                .catch((error) => {
                    console.error("Issue with connection. Try again later.")
                    alert("Issue with connection. Try again later.")
                    props.history.push("/dash")
                });
            }
        },
        []
    );
    const [question, setQuestion] = useState()

    function startLesson(e){
        e.preventDefault();
        setQuestion(0);
    }

    useEffect(
        ()=>{
            if(lesson){
                setLessonContent(
                    <Container className="my-4">
                        <Jumbotron>
                            <h1>Lesson - {level.idhsklevel.toUpperCase()}</h1>
                            <p>Set of {Object.keys(lesson.questions).length} questions.</p><p>Each question is multiple choice from 3 possible anwswers.</p>
                            <Button variant="success" onClick={startLesson}>Start Lesson</Button>
                        </Jumbotron>
                    </Container> 
                )
            }
        },
        [lesson]
    )
    useEffect(
        () => {
            if(lesson && lesson.questions[question]){
                setLessonContent(<Question content={lesson.questions[question]} question={question} setQuestion={setQuestion}/>);
            }
        },
        [question]
    )

    return(
        <div>

            {lessonContent}

        </div>
    );
}

export default Lesson;