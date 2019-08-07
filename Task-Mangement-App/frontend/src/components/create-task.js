import React, { Component } from 'react';
import axios from 'axios';

class CreateTask extends Component {
    constructor(props){
        super(props);

        this.onChangeTaskName = this.onChangeTaskName.bind(this);
        this.onChangeTaskDescription = this.onChangeTaskDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            description: ''
        }
    }

    onChangeTaskDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangeTaskName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Task Name: ${this.state.name}`);
        console.log(`Task Description: ${this.state.description}`);

        const newTask = {
            name: this.state.name,
            description: this.state.description,
        };

        axios.post('http://localhost:4000/tasks/add', newTask)
            .then(res => {
                    console.log(res.data);
                    alert("record added successfully");
                    window.location = "/";
                });

        this.setState({
            name: '',
            description: ''
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Task</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeTaskName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeTaskDescription}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Task" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateTask;