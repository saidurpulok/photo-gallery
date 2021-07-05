import React, { Component } from "react";
import { Formik } from "formik";

import { connect } from "react-redux";
import { auth } from "../../redux/authActionCreators";

import { Alert } from "reactstrap";

const mapDispatchToProps = dispatch => {
  return {
    auth: (email, password, mode) => dispatch(auth(email, password, mode))
  }
}

const mapStateToProps = state => {
  return {
    authLoading: state.authLoading,
    authFailedMsg: state.authFailedMsg,
  }
}

export class Auth extends Component {
  state = {
    mode: "Sign Up"
  }
  switchModeHandler = () => {
    this.setState({mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up"})
  }
  render() {
    let err = null;
    if (this.props.authFailedMsg !== null){
      err = (<Alert color="danger">{this.props.authFailedMsg}</Alert>);
    }
    let form = null;
    if (this.props.authLoading){
      form = (<h4>Loading...</h4>)
    } else {
      form = (<Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        onSubmit={(values) => {
          this.props.auth(values.email, values.password, this.state.mode);
        }}
        validate={(values) => {
          const errors = {}

          if (!values.email){
              errors.email = 'Required'
          } else if (!/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(values.email)){
              errors.email = 'Invalid email'
          }

          if (!values.password){
              errors.password = 'Required'
          } else if (values.password.length < 6){
              errors.password = 'Must have at least 6 characters'
          }
          if (this.state.mode === "Sign Up") {
            if (!values.confirmPassword){
                errors.confirmPassword = 'Required'
            } else if (values.confirmPassword !== values.password){
                errors.confirmPassword = 'Password did not match'
            }
          }
          // console.log("Errors: ", errors);
          return errors;
        }}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <div
              style={{
                  border: "1px grey solid",
                  padding: "15px",
                  borderRadius: "7px",
                  width: "300px",
                  margin: "auto",
                  marginTop: "80px"
              }}
          >
            <p style={{marginTop: "-70px"}}>You must be logged in to view and give feedback.</p>
            <button style={{
              width: "100%",
              backgroundColor: "#AFE8DD",
              color: "#505050",
              marginBottom: "10px"
            }} className="btn btn-lg" onClick={this.switchModeHandler}>Switch to {this.state.mode === "Sign Up" ? "Login" : "Sign Up"}</button>
            <form onSubmit={handleSubmit}>
              <input
                name="email"
                placeholder="Enter your email"
                className="form-control"
                value={values.email || ''}
                onChange={handleChange}
              />
              <span style={{color: "red"}}>{errors.email}</span> 
              <br />
              <input
                name="password"
                placeholder="Enter your password"
                className="form-control"
                value={values.password}
                onChange={handleChange || ''}
              />
              <span style={{color: "red"}}>{errors.password}</span>
              <br />
              {this.state.mode === "Sign Up" ? <div>
              <input
                name="confirmPassword"
                placeholder="Confirm your password"
                className="form-control"
                value={values.confirmPassword || ''}
                onChange={handleChange}
              />
              <span style={{color: "red"}}>{errors.confirmPassword}</span>
              <br />
              </div>: null }
              
              <button type="submit" className="btn btn-info">
                {this.state.mode === "Sign Up" ? "Sign Up" : "Login"}
              </button>
            </form>
          </div>
        )}
      </Formik>)
    }
    return (
      <div>
        {err}
        {form}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
