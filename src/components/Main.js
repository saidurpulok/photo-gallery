import React, { Component } from 'react';
import Header from './Header/Header';
import Photos from './Photos/Photos';
import { Route, Switch, Redirect } from 'react-router-dom';
import Categories from './Categories/Categories';
import Auth from './Auth/Auth';
import Logout from './Auth/Logout';

import { connect } from 'react-redux';
import { authCheck } from '../redux/authActionCreators';
import UploadFrom from './UploadForm/UploadFrom';
import View from './Photos/View';

const mapStateToProps = state => {
    return {
        token: state.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck()),
    }
}

class Main extends Component {
    componentDidMount(){
        this.props.authCheck();
    }
    render() {
        let routes = null;
        if (this.props.token === null){
            routes = (
            <Switch>
                <Route path="/" exact component={Photos} />
                <Route path="/auth" exact component={Auth} />
                <Redirect to="/auth" />
            </Switch>)
        } else {
            routes = (
            <Switch>
                <Route path="/" exact component={Photos} />
                <Route path="/categories" exact component={Categories} />
                <Route path="/upload" exact component={UploadFrom} />
                <Route path="/view" exact component={View} />
                <Route path="/logout" exact component={Logout} />
                <Redirect to="/" />
            </Switch>)
        }
        return (
            <div className="container">
                <Header />
                {routes}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
