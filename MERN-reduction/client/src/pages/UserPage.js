import React, { Component } from 'react';
import  WidgetComponent  from "../components/Widgett";
import { authHeader } from "../helpers/auth-header";
// import { Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
// import {UserListPage} from './UserListPage';
import defaultImage from '../assets/img/users/default.jpg'

class UserPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.requestOptions = {
      method: 'GET',
      headers: authHeader()
    };
  }
  componentWillMount() {
    this.loadUserData();
  }

  loadUserData() {
    fetch('http://127.0.0.1:4200/users', this.requestOptions)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({ users : response });
      });
  }

  delete(id) {
    fetch('http://127.0.0.1:4200/users/' + id, { method: 'delete' }, this.requestOptions)
      .then(response => {
        // this.props.history.push("/user");
        window.location.reload();
      });
  }

  render() {
    const apis = this.state.users.map((item, i) => {
      return <tr key={item._id}>
        <td className="">{i + 1}</td>
        <td>
          <div className="d-inline-block mr-2">
            <img src={ process.env.PUBLIC_URL + item.avatar } className="rounded-circle" height="45px" alt="" ></img>
          </div>
        </td>
        <td>{item.username}</td>
        <td className="">{item.email}</td>
        <td>
           <div className="">
           <Link to={`/users/${item._id}`} className="btn btn-outline-primary">Edit</Link>&nbsp;
            <span style={{width:50}}></span>
            <button onClick={this.delete.bind(this, item._id)} className="btn btn-outline-secondary button-margin">Delete</button>
            </div>
        </td>
      </tr>
    });

    return (
      <div className="content-wrapper container-fluid px-5 mb-4 trans-03-in-out">

        <div className="row">

          <div className="col-lg-12 mb-3">
            <WidgetComponent header='Users Table' className='shadow-01' excerpt=''>
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Avatar</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {apis}
                </tbody>
              </table>
            </WidgetComponent>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPage;