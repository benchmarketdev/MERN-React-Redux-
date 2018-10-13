import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Collapse } from 'reactstrap';
import { authHeader } from "../../helpers/auth-header";

class MainNavComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNavItem: { root: 0, sub: 0 },
      schools: []
    };
    this.requestOptions = {
      method: 'GET',
      headers: authHeader()
    };
  }

  componentWillMount() {
    this.loadSchoolData();
  }

  loadSchoolData() {
    fetch('http://127.0.0.1:3003/api/schools', { method: 'get' }, this.requestOptions)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        this.setState({ schools: response })
      });
  }

  menuToggle(e) {
    let navRoot = +e.currentTarget.dataset.navRoot || 0;
    let navSub = +e.currentTarget.dataset.navSub || 0;

    if (this.state.showNavItem.root === navRoot && navSub === 0) {
      this.setState({ showNavItem: { root: 0, sub: 0 } });
    } else if (this.state.showNavItem.sub >= navSub) {
      this.setState({ showNavItem: { root: navRoot, sub: --navSub } });
    } else {
      this.setState({ showNavItem: { root: navRoot, sub: navSub } });
    }
  }



  render() {

    const lists = this.state.schools.map(function (item, i) {
      return <li key={item._id} className="nav-item">
        <Link className="nav-link" to={`/schools/${item._id}`} >
          <i className="fa fa-id-card" aria-hidden="true" />
          <span className="d-none d-lg-inline">{item.schoolName}</span>
        </Link>
      </li>
    })

    return (
      <nav className="sidebar-nav">
        <div className="mb-1 text-uppercase d-none d-lg-block text-muted">
          <small>General</small>
        </div>
        <ul id="sidebarNav" className="nav nav-dark flex-column">
          <li className="nav-item">
            <Link className="nav-link" to={`${process.env.PUBLIC_URL}/dashboard`}>
              <i className="fa fa-tachometer" aria-hidden="true" />
              <span className="d-none d-lg-inline">Dashboards</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to={`${process.env.PUBLIC_URL}/tables`}>
              <i className="fa fa-table" aria-hidden="true" />
              <span className="d-none d-lg-inline">Users</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`${process.env.PUBLIC_URL}/addSchool`}>
              <i className="fa fa-table" aria-hidden="true" />
              <span className="d-none d-lg-inline">Add School</span>
            </Link>
          </li>
        </ul>

        <div className="mt-4 mb-1 text-uppercase d-none d-lg-block text-muted">
          <small>schools</small>
        </div>

        <ul className="nav nav-dark flex-column">
          {/* <li className="nav-item">
            <a className="nav-link" onClick={this.menuToggle.bind(this)} aria-expanded={this.state.showNavItem.root === 2}
               data-nav-root="2">
              <i className="fa fa-files-o" aria-hidden="true"/>
              <span className="d-none d-lg-inline">Schools</span>
            </a>
            <Collapse isOpen={this.state.showNavItem.root === 2} tag="ul" className="nav flex-column bg-dark">
              <li className="nav-item">
                <Link className="nav-link nav-level-1" to={`${process.env.PUBLIC_URL}/login`}>Login</Link>
              </li>
            </Collapse>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={this.menuToggle.bind(this)} aria-expanded={this.state.showNavItem.root === 3}
               data-nav-root="3">
              <i className="fa fa-suitcase" aria-hidden="true"/>
              <span className="d-none d-lg-inline">UI Elements</span>
            </a>
            <Collapse isOpen={this.state.showNavItem.root === 3} tag="ul" className="nav flex-column bg-dark">
              <li className="nav-item">
                <Link className="nav-link nav-level-1" to={`${process.env.PUBLIC_URL}/buttons`}>Buttons</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-level-1" to={`${process.env.PUBLIC_URL}/typography`}>Typography</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-level-1" to={`${process.env.PUBLIC_URL}/icons`}>Icons</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-level-1" to={`${process.env.PUBLIC_URL}/navs`}>Navs</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-level-1" to={`${process.env.PUBLIC_URL}/badges`}>Badges, Labels</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-level-1" to={`${process.env.PUBLIC_URL}/progress`}>Progress</Link>
              </li>
            </Collapse>
          </li> */}

          {lists}

        </ul>

      </nav>
    );
  }
}

export default MainNavComponent;
