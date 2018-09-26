import React from 'react';
import * as classes from './ForgotPassword.scss';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import Modal from "../../components/Modal/modal";

class ForgotPassword extends React.Component {

    state = {
        email: '',
        password1: '',
        password2: '',
        showModal: false
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let changeable=false;
        console.log(new Date().getTime() <= new Date(localStorage.getItem('e')).getTime())
        if(new Date().getTime() <= new Date(localStorage.getItem('e')).getTime() ){
            changeable = true;
        }
        else{
            localStorage.removeItem('e');
        }
        this.props.onForgotPassword(this.state.email, this.state.password1, this.state.password2, this.props.match.params.id, changeable);
    }

    render() {
        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to="/dashboard" />
        }

        return (
            <div className={classes.ForgotPassword}>
                {authRedirect}
                <div className={classes.innerContent}>

                    <form onSubmit={this.handleSubmit}>
                        <h1>Change Password!</h1>

                        <p className={[classes.errorMessage, this.props.fpError ? classes.active : null].join(' ')}>
                            {this.props.fpError ? this.props.fpError : null}
                        </p>

                        <input placeholder={"cool_email@email.com"} type="email" onChange={(e) => {
                            this.setState({email: e.target.value})
                        }} value={this.state.email}/>
                        <input placeholder={"Secretive secret password"} type="password" onChange={(e) => {
                            this.setState({password1: e.target.value})
                        }} value={this.state.password1}/>
                        <input placeholder={"Secretive secret password"} type="password" onChange={(e) => {
                            this.setState({password2: e.target.value})
                        }} value={this.state.password2}/>
                        <input type="submit" value='Submit'/>

                    </form>
                </div>

                <Modal customModal={classes.Modal} customModalActive={classes.active}  clicked={() => this.props.closeForgotPassword()} active={this.props.showModal} >
                    Password successfully changed! Redirecting to Log-In page!
                    {this.props.showModal && setTimeout(() => {
                        this.props.history.push(`/authenticate`);
                    }, 3000)}
                </Modal>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        fpError: state.auth.fpError,
        isAuthenticated: state.auth.token !== null,
        showModal: state.auth.passwordChanged
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onForgotPassword: (email, password1, password2, id, c) => dispatch(actions.onForgotPassword(email, password1, password2, id, c)),
        closeForgotPassword: () => dispatch(actions.closeForgotPassword())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
