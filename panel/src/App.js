import React from "react";
import Table from "./components/Table";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      name: "",
      email: "",
      password: "",
      _id: 0,
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:5000/").then((response) =>
      this.setState({
        users: response.data,
      })
    );
  }

  handleUpdate() {
    axios.get("http://localhost:5000/").then((response) =>
      this.setState({
        users: response.data,
      })
    );
  }

  handleEdit(id) {
    axios
      .get(`http://localhost:5000/getone/${id}`)
      .then((response) => {
        console.log(response.data);
        // console.log(this.state);
        this.setState({
          name: response.data.name,
          email: response.data.email,
          password: response.data.password,
          _id: response.data._id,
        });
        // console.log(this.state);
      })
      .then(console.log(this.state));
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(id, event) {
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    if (id === 0) {
      axios
        .post("http://localhost:5000/", user)
        .then(() => this.handleUpdate());
    } else {
      axios
        .put(`http://localhost:5000/${id}`, user)
        .then(() => this.handleUpdate());
    }
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6">
            {/* Form: cannot be separated because it shares states with App */}
            <form onSubmit={(e) => this.handleSubmit(this.state._id, e)}>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    type="text"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    type="text"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <div className="col-lg-6">
            <Table
              users={this.state.users}
              handleUpdate={this.handleUpdate}
              handleEdit={this.handleEdit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
