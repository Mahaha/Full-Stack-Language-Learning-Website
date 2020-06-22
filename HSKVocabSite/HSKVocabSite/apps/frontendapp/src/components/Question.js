import React, { useState, useEffect } from "react";
import { Container, Jumbotron, Spinner, Row, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

function Question(props){

    function shuffle(sourceArray) {
        for (var i = 0; i < sourceArray.length - 1; i++) {
            var j = i + Math.floor(Math.random() * (sourceArray.length - i));
    
            var temp = sourceArray[j];
            sourceArray[j] = sourceArray[i];
            sourceArray[i] = temp;
        }
        return sourceArray;
    }

    function cap(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const char = props.content.char;
    const ans = props.content.ans;
    const question = props.question;
    const setQuestion = props.setQuestion;

    const [result, setResult] = useState();
    useEffect(
        () => {
            if(!(result === undefined)){
                console.log("TODO");
            }
        },
        [result]
    );

    function handleAns(e, val){
        e.preventDefault();
        console.log(val);
        Object.keys(ans).forEach(
            (an) => {
                    ans[val] ? setResult(true) : setResult(false);
                }
            );
    }

    const [questionContent, setQuestionContent] = useState(
        <div>
            {content && question !== undefined && setQuestion ?

                <Container className="my-4">
                    <Jumbotron>
                        <Row>
                            <h2>Question {question + 1}</h2>
                        </Row>
                        <Row className="my-5">
                            <Col>
                                <h1 className="text-center">
                                    {char}
                                </h1>
                            </Col>
                        </Row>
                            {shuffle(Object.keys(ans)).map(
                                (x) => 
                                    <Row key={x} className="my-5">
                                        <Button block key={x} type="button" size="lg" variant="primary"
                                        onClick={(e) => handleAns(e, x) }>
                                            {cap(x)}
                                        </Button>
                                    </Row>
                            )}
                    </Jumbotron>
                </Container>

            : <Redirect to="/dash"/>
            }
        </div>
    );

    
    return(
        <div>
            {questionContent}
        </div>
    );
}

export default Question;