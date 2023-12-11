import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

var exerciseId = window.location.href.split("/")[4];

export default class EditExercise extends Component {
  constructor(props) {
    console.log(props.username);
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //variables at initial stage
    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    exerciseId = window.location.href.split("/")[4];
    if (exerciseId) {
      axios
        .get("https://exer-tracker-d8gf.onrender.com/exercises/" + exerciseId)
        .then((res) =>
          this.setState({
            username: res.data.username,
            description: res.data.description,
            duration: res.data.duration,
            date: new Date(res.data.date),
          })
        )
        .catch((err) => console.log(err));
    } else {
      console.log("invalid ererciseId");
    }

    axios.get("https://exer-tracker-d8gf.onrender.com/users/").then((res) => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map((user) => user.username),
        });
      }
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    // wrapping all the data into a single object
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    //printing the data
    console.log(exercise);

    axios
      .post(
        "https://exer-tracker-d8gf.onrender.com/exercises/update/" + exerciseId,
        exercise
      )
      .then((res) => {
        console.log(res.data);
        alert('Exercise log edited successfully!')
        window.location = "/";
      })
      .catch((err) => console.log(err));

    //redirect to home after pushing the data successfully
  }

  render() {
    return (
      <div>
        <div className="block1">
          <h3>
            <b>EDIT EXERCISE LOG</b>
          </h3>
        </div>

        <div className="block2">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              required
              className="form-control"
              defaultValue={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>

          <div className="form-group">
            <label>Duration (in minutes)</label>
            <input
              type="number"
              required
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <br />
          <div className="form-group">
            <input
              type="Submit"
              defaultValue="Edit Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
        </div>
      </div>
    );
  }
}
