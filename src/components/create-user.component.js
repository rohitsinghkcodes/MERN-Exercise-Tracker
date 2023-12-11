import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onCreateUsername = this.onCreateUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // variables at initial stage
    this.state = {
      username: "",
      errorMessage: null,
      successMessage: null,
    };
  }

  onCreateUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    // wrapping all the data into a single object
    const user = {
      username: this.state.username,
    };

    // printing the data
    console.log(user);

    axios
      .post("https://exer-tracker-d8gf.onrender.com/users/add", user)
      .then((res) => {
        console.log(res.data);
        this.setState({
          username: "",
          errorMessage: null, // clear error message on success
          successMessage: 'New user "' + user.username + '" created!',
        });
        // alert('New user "' + user.username + '" created!');
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          successMessage: null,
          errorMessage: "Error! Enter a valid username\nmsg: " + err,
        });
      });
  }

  render() {
    return (
      <div>
        <div className="block1">
          <h3>
            <b>CREATE NEW USER</b>
          </h3>
        </div>

        <div className="block2">
          {this.state.errorMessage && (
            <div
              className="alert alert-danger"
              role="alert"
              style={{ whiteSpace: "pre-line" }}
            >
              {this.state.errorMessage}
            </div>
          )}

          {this.state.successMessage && (
            <div
              className="alert alert-success"
              role="alert"
              style={{ whiteSpace: "pre-line" }}
            >
              {this.state.successMessage}
            </div>
          )}

          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label className="label">Username</label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onCreateUsername}
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="Submit"
                defaultValue="Create new user"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
