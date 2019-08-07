import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Task = (props) => (
    <tr>
        <td>{props.task.name}</td>
        <td>{props.task.description}</td>
        <td>
            <Link style={{marginRight : 5}} to={"/edit/"+ props.task._id}>Edit</Link>
            <Link to="#" taskid={props.task._id} onClick={props.onClick}>Delete</Link>
        </td>
    </tr>
)

const Tasks = ({ onHandleClick, tasksState }) => tasksState.map(function(currentTask, i){
    return <Task onClick={onHandleClick} task={currentTask} key={i} />;
});

class TasksList extends Component {
    constructor(props) {
        super(props);
        this.state = {tasks: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/tasks/')
            .then(response => {
                this.setState({ tasks: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    deleteTask(e) {
        const taskId = e.target.getAttribute("taskId");
        console.log(e.target.getAttribute("taskId"));
        // console.log("id=======>>>" + JSON.parse(id));
        // alert(JSON.stringify(id));
        axios.post('http://localhost:4000/tasks/delete/'+ taskId)
            .then(response => {
                alert("task deleted successfully");
                window.location = "/"
                // this.props.history.push('tasks/');
                //this.setState({ tasks: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }


    render() {
        return (
            <div>
                <h3>Tasks List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <Tasks onHandleClick={this.deleteTask} tasksState={this.state.tasks || []} />
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TasksList;