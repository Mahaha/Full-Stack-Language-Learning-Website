import React, {Component, useState, useEffect} from 'react';
import { Container, Row, Col, Card, Spinner, ToggleButton, ToggleButtonGroup, Button } from 'react-bootstrap';
import { Route, Link } from "react-router-dom";

function Dash(){

    const [levels, setlevels] = useState(null);
    const [levelcontent, setlevelcontent] = useState(
        <div>
            <Card.Subtitle>Levels loading</Card.Subtitle>
            <Spinner animation="border"/>
        </div>
    );
    const [lessoncontent,setlessoncontent] = useState(
        <div>
            <Card.Title>Levels loading</Card.Title>
            <Card.Subtitle>When levels have loaded, select a level from the selector on the left to start a lesson.</Card.Subtitle>
        </div>
    );
    const [level, setlevel] = useState(null);

    useEffect(
        ()=> {
            fetch("api/hsklevels")
            .then(response => response.json())
            .then(response => {setlevels(response)})
        },
        []
    );
    useEffect(
        () => { 
            if (levels){
                setlevelcontent(

                    <ToggleButtonGroup vertical type="radio" name="levels" className="d-flex" 
                    onChange={
                        (e) => 
                        levels.forEach((value) => {
                            if(value.idhsklevel == e) setlevel(value);
                        })
                    }
                    >
                        {levels.map(
                            (level) => 
                            <ToggleButton 
                                variant="dark" 
                                type="radio" 
                                block 
                                key={level.idhsklevel} 
                                value={level.idhsklevel} 
                                className="my-2"
                            >
                                {level.idhsklevel.toUpperCase()}
                            </ToggleButton>
                        )}
                    </ToggleButtonGroup>
                )
                setlessoncontent(
                    <div>
                        <Card.Title>Start a lesson</Card.Title>
                        <Card.Subtitle>Select a level from the choices on the left to view more information about or start a revision session.</Card.Subtitle>
                    </div>
                )
            }
        },
        [levels]
    );
    useEffect(
        () => {
        if(level){
            setlessoncontent(
                <div>
                    <Card.Title>{level.idhsklevel.toUpperCase()}</Card.Title>
                    <Card.Subtitle>Total wordcount for this level: {level.wordcount} words</Card.Subtitle>
                    <Card.Text className="my-2">{level.description}</Card.Text>
                    <Link to={{
                        pathname: "/lesson",
                        level:level,
                    }}>
                        <Button variant="success">Start lesson</Button>
                    </Link>
                </div>
            )
        }},
        [level]
    );

    return(
        <Container fluid>
            <Row className="m-3">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Select a set of vocabulary to revise:</Card.Title>
                            {levelcontent}
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            {lessoncontent}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );

}

export default Dash;