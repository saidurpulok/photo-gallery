import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap';
import './Header.css';
import Logo from '../../assets/logo.png';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
      token: state.token,
  }
}

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  let links = null;
  if (props.token === null) {
    links = (
      <Nav className="justify-content-end" style={{ width: "100%" }}>
        <NavItem>
          <NavLink exact to="/auth" className="NavLink">Login/Signup</NavLink>
        </NavItem>
      </Nav>
    )
  } else {
    links = (
      <Nav className="justify-content-end" style={{ width: "100%" }}>
        <NavItem>
          <NavLink exact to="/upload" className="NavLink">Upload</NavLink>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="NavLink" style={{paddingTop: "25px", color: "rgb(78, 75, 75)"}}>
              Categories
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink className="NavLink Dropdown" to={{
                    pathname: "/categories",
                    catProp: {
                      type: "Nature"
                    }
                  }}>Nature</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink className="NavLink Dropdown" to={{
                    pathname: "/categories",
                    catProp: {
                      type: "Technology"
                    }
                  }}>Technology</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink className="NavLink Dropdown" to={{
                    pathname: "/categories",
                    catProp: {
                      type: "Cars"
                    }
                  }}>Cool Cars</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink className="NavLink Dropdown" to={{
                    pathname: "/categories",
                    catProp: {
                      type: "Grocery"
                    }
                  }}>Grocery</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink className="NavLink Dropdown" to={{
                    pathname: "/categories",
                    catProp: {
                      type: "Others"
                    }
                  }}>Others</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
        <NavItem>
          <NavLink exact to="/logout" className="NavLink">Logout</NavLink>
        </NavItem>
      </Nav>
    )
  }
  return (
    <div>
      <Navbar color="white" light expand="md">
        <NavLink exact to="/" className="mr-auto ml-md-5 Brand">
            <img src={Logo} alt="Logo" width="50px" />
        </NavLink>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {links}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default connect(mapStateToProps)(Header);
