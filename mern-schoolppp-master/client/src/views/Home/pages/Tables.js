import React, { Component } from 'react';
import WidgetComponent from "../../../components/Widget";
import { authHeader } from "../../../helpers/auth-header";
import { Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';


class TablesPage extends Component {

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
    fetch('http://127.0.0.1:3003/user/', this.requestOptions)
      .then(response => response.json())
      .then(response => {
        let data = response.data.docs;
        this.setState({ users: data })
      });
  }

  delete(id) {
    fetch('http://127.0.0.1:3003/user/' + id, { method: 'delete' }, this.requestOptions)
      .then(response => {
        this.props.history.push("/")
      });
  }

  render() {
    const apis = this.state.users.map((item, i) => {
      return <tr key={item._id}>
        <td>{i + 1}</td>
        <td>
          <div className="d-inline-block mr-2">
            <img src={process.env.PUBLIC_URL + item.avatar} className="rounded-circle " height="32px" />
          </div>
        </td>
        <td>{item.username}</td>
        <td>{item.email}</td>
        <td>
          <div className="btn-toolbar button-center">

            <Link to={`/edit/${item._id}`} className="btn btn-success">Edit</Link>&nbsp;
                <button onClick={this.delete.bind(this, item._id)} className="btn btn-danger button-margin">Delete</button>
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
                    <th>User Name</th>
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

export default TablesPage;
