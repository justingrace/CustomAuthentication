import React from 'react';
import Layout from "./Hoc/Layout/Layout";
import {Route, Switch, withRouter} from "react-router-dom";
import Landing from "./pages/Landing/landing";
import Dashboard from "./pages/Dashboard/Dashboard";
import Auth from "./pages/Auth/Auth";
import * as actions from "./store/actions";
import {connect} from "react-redux";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import LoaderImg from "./assets/img/loader.svg";
import Modal from "./components/Modal/modal";
import classes from './App.scss'

class App extends React.Component {

    componentDidMount() {
        this.props.onCheckAuth();
    }

    render() {
        return (
            <Layout>

                <Switch>

                    <Route path="/forgot-password/:id" component={ForgotPassword}/>
                    <Route path="/authenticate" component={Auth}/>
                    {
                        this.props.isAuthenticated &&
                        <Route path="/dashboard" component={Dashboard}/>
                    }
                    <Route path="/" component={Landing}/>
                </Switch>

                <Modal customModal={classes.loadingModal} customModalActive={classes.active}  active={this.props.checkingAuth}>
                    <img src={LoaderImg} alt=""/>
                </Modal>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        checkingAuth: state.auth.checkingAuth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCheckAuth: () => dispatch(actions.checkAuth())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
