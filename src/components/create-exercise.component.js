import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class CreateExercise extends Component {
  constructor(props) {
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

  //hard code 1 user
  componentDidMount() {
    axios.get("https://exer-tracker-d8gf.onrender.com/users/").then((res) => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map((user) => user.username),
          username: res.data[0].username,
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
      .post("https://exer-tracker-d8gf.onrender.com/exercises/add", exercise)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    //redirect to home after pushing the data successfully
    window.location = "/";
    alert("new exercise log created!");
  }

  render() {
    return (
      <div>
        <div className="block1">
          <h3>
            <b>CREATE NEW EXERCISE LOG</b>
          </h3>
        </div>

        <div className="block2">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className="label">Username</label>
            <select
              ref="userInput"
              required
              className="form-control input"
              defaultValue={this.state.username}
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
            <label className="label">Description</label>
            <input
              type="text"
              required
              className="form-control input"
              defaultValue={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>

          <div className="form-group">
            <label className="label">Duration (in minutes)</label>
            <input
              type="number"
              required
              className="form-control input"
              defaultValue={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>

          <div className="form-group">
            <label className="label">Date</label>
            <div>
              <DatePicker
              className="input date-picker"
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <br />
          <div className="form-group">
            <input
              type="Submit"
              defaultValue="Create Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
        </div>
      </div>
    );
  }
}
