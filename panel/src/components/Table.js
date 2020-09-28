import React from "react";
import axios from "axios";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id) {
    axios
      .delete(`http://localhost:5000/${id}`)
      .then(() => this.props.handleUpdate());
  }

  render() {
    const users = this.props.users;
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => this.props.handleEdit(user._id)}
                >
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => this.handleDelete(user._id)}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Form;
