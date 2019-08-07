import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

class EditTask extends Component {
    constructor(props) {
        super(props);
        this.onChangeTaskName = this.onChangeTaskName.bind(this);
        this.onChangeTaskDescription = this.onChangeTaskDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: '',
            description: '',
        }
    }
    componentDidMount() {
        axios.get('http://localhost:4000/tasks/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    description: response.data.description,
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeTaskName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeTaskDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onSubmit =(e) => {
        e.preventDefault();
        const obj = {
            name: this.state.name,
            description: this.state.description,
        };
        console.log(obj);
        axios.post('http://localhost:4000/tasks/update/'+this.props.match.params.id, obj)
            .then(res => {
                console.log(res.data);
                alert("record updated successfully");
                window.location = "/";
            });
        // this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Task</h3>
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
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Update Task" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default EditTask;