import logo200Image from 'assets/img/logo/logo_200.png';
import sidebarBgImage from 'assets/img/sidebar/sidebar-10.jpg';
import SourceLink from 'components/SourceLink';
import React from 'react';
import FaGithub from 'react-icons/lib/fa/github';
import {
  MdAccountCircle,
  // MdArrowDropDownCircle,
  MdBorderAll,
  // MdBrush,
  // MdChromeReaderMode,
  // MdDashboard,
  MdExtension,
  // MdGroupWork,
  // MdInsertChart,
  MdKeyboardArrowDown,
  // MdNotificationsActive,
  // MdPages,
  // MdRadioButtonChecked,
  // MdSend,
  // MdStar,
  // MdTextFields,
  // MdViewCarousel,
  // MdViewDay,
  MdViewList,
  // MdWeb,
  // MdWidgets,
  MdSave,
  MdAdd,
  // MdGroup,
} from 'react-icons/lib/md';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

var navSchools = [];
// const navComponents = [
  //   { to: '/buttons', name: 'buttons', exact: false, Icon: MdRadioButtonChecked },
  //   {
  //     to: '/button-groups',
  //     name: 'button groups',
  //     exact: false,
  //     Icon: MdGroupWork,
  //   },
  //   { to: '/forms', name: 'forms', exact: false, Icon: MdChromeReaderMode },
  // { to: '/input-groups', name: 'input groups', exact: false, Icon: MdStar },
//   {
//     to: '/dropdowns',
//     name: 'dropdowns',
//     exact: false,
//     Icon: MdArrowDropDownCircle,
//   },
//   { to: '/badges', name: 'badges', exact: false, Icon: MdStar },
//   { to: '/alerts', name: 'alerts', exact: false, Icon: MdNotificationsActive },
//   { to: '/progress', name: 'progress', exact: false, Icon: MdBrush },
//   { to: '/modals', name: 'modals', exact: false, Icon: MdViewDay },
// ];

// const navContents = [
//   { to: '/data', name: 'data', exact: false, Icon: MdTextFields },
//   { to: '/chart', name: 'chart', exact: false, Icon: MdBorderAll },
// ];

// const pageContents = [
//   { to: '/login', name: 'login / signup', exact: false, Icon: MdAccountCircle },
// ];

const navItems = [
  { to: '/login', name: 'login / signup', exact: false, Icon: MdAccountCircle },
  { to: '/users', name: 'users', exact: true, Icon: MdViewList },
  { to: '/add', name: 'add school name', exact: true, Icon: MdAdd },
  { to: '/save', name: 'save school', exact: true, Icon: MdSave },
  // { to: '/forms', name: 'forms', exact: false, Icon: MdChromeReaderMode },
  //  { to: '/', name: 'dashboard', exact: true, Icon: MdDashboard },
  //  { to: '/cards', name: 'cards', exact: false, Icon: MdWeb },
  //  { to: '/charts', name: 'charts', exact: false, Icon: MdInsertChart },
  //  { to: '/widgets', name: 'widgets', exact: false, Icon: MdWidgets },
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
  };

  constructor(props) {
    super(props);
    this.state = { value: '', schools: [] };
    // this.addSchoolService = new SchoolService();
  }

  componentDidMount() {
    axios.get('http://localhost:4200/api/schools')
      .then(response => {
        this.setState({ schools: response.data });
        this.setNavSchools(this.state.schools);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  setNavSchools(schools) {
    navSchools = [];
    if (schools) {
      schools.map(function (school, i) {
        var navSchool = {
          to: '/statistics/' + school._id, name: school.name, exact: false, Icon: MdBorderAll
        };
        navSchools.push(navSchool);
        return navSchools;
      });

    }
  }

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img
                src={logo200Image}
                width="40"
                height="30"
                className="pr-2"
                alt=""
              />
              <span className="text-white">
                School PPP <FaGithub />
              </span>
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}>
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Components')}>
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">SCHOOLS</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenComponents
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
              <Collapse isOpen={this.state.isOpenComponents}>
                {navSchools.map(({ to, name, exact, Icon }, index) => (
                  <NavItem key={index} className={bem.e('nav-item')}>
                    <BSNavLink
                      id={`navItem-${name}-${index}`}
                      className=""
                      tag={NavLink}
                      to={to}
                      activeClassName="active"
                      exact={exact}>
                      <Icon className={bem.e('nav-item-icon')} />
                      <span className="">{name}</span>
                    </BSNavLink>
                  </NavItem>
                ))}
              </Collapse>
            </NavItem>
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
