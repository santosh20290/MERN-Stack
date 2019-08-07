import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateTask from "./components/create-task";
import EditTask from "./components/edit-task";
import TasksList from "./components/tasks-list";

class App extends Component {
  render() {
    return (
        <Router>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#" target="_blank">
                        <img src={logo} width="30" height="30" alt="Logo" />
                    </a>
                    <Link to="/" className="navbar-brand">Task-Management App(MERN-Stack)</Link>
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">Tasks</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/create" className="nav-link">Create Task</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br/>
                <Route path="/" exact component={TasksList} />
                <Route path="/edit/:id" component={EditTask} />
                <Route path="/create" component={CreateTask} />
            </div>
        </Router>
    );
  }
}

export default App;
