import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Navbar, Nav, } from 'react-bootstrap';
import Home from '../pages/Home'
import Dash from '../pages/Dash'
import Lesson from '../pages/Lesson'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(){
  
  return(
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">HSK Vocab</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/dash">Lessons</Nav.Link>
        </Nav>
      </Navbar>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/dash" component={Dash} />
          <Route path="/lesson" component={Lesson} />
        </Switch>
      </BrowserRouter>
    </div>
  );

}
export default App;

const container = document.getElementById("app");
render(<App />, container);