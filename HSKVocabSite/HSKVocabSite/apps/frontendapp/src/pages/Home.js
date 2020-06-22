import React, { useState } from 'react';
import { Container, Row, Col, Card, ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home(){

  return(

    <Container fluid>
      <Row className="m-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>HSK Chinese Vocabulary Revision</Card.Title>
              <Card.Subtitle>Providing flashcard sessions for each HSK level for practice</Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>

        <Col>
        <Card>
          <Card.Body>
            <Card.Title>Start Learning</Card.Title>
            <Button href="/dash">Go to lessons</Button>
          </Card.Body>
        </Card>
        </Col>
      </Row>

      <Row>
      </Row>
    </Container>

  )
}

export default Home;