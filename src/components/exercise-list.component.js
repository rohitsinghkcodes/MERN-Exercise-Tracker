import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

const Exercise = (props) => (
  <tr className="tr-color">
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration + " minutes"}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link
        to={"/edit/" + props.exercise._id}
        className="btn btn-outline-primary"
      >
        Edit
      </Link>
    </td>
    <td>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => {
          props.deleteExercise(props.exercise._id);}}>
        Delete
      </button>
    </td>
  </tr>
);

export default class ExerciseList extends Component {
  constructor(props) {
    super(props);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = { exercises: [] };
  }

  componentDidMount() {
    axios
      .get("https://exer-tracker-d8gf.onrender.com/exercises/")
      .then((res) => {
        this.setState({
          exercises: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  deleteExercise(id) {
    const isConfirmed = window.confirm("Are you sure you want to delete this exercise?");
    
    if(isConfirmed){  
        axios
        .delete("https://exer-tracker-d8gf.onrender.com/exercises/" + id)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));

      this.setState({
        exercises: this.state.exercises.filter((exerList) => exerList._id !== id),
      });
    }
  }

  //exerciseList function
  exerciseList() {
    return this.state.exercises.map((curExer) => {
      return (
        <Exercise
          exercise={curExer}
          deleteExercise={this.deleteExercise}
          key={curExer._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
       <div className="block1">
          <h3>
            <b>LOGGED EXERCISES</b>
          </h3>
        </div>

        <div className="block2">

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration (in minutes)</th>
              <th>Date (YYYY-MM-DD)</th>
              <th>Edit Exercise</th>
              <th>Delete Exercise</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
        </div>
      </div>
    );
  }
}
