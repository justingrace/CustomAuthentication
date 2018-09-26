import React from 'react';
import * as classes from './Auth.scss';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import Modal from "../../components/Modal/modal";
import LoaderImg from '../../assets/img/loader.svg'

class Auth extends React.Component {

    state = {
        email: '',
        password: '',
        isSignUp: false,
        fpEmail: '',
        fpStatus: null,
        showModal: false,
        fpError: null,
        showSignedModal: false
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.email, this.state.password, this.state.isSignUp);
    }

    changeSignMethod = () => {
        this.setState({isSignUp: !this.state.isSignUp})
    }

    forgotPasswordModalClicked = (e) => {
        if (e.target.closest("#Modal") == null) {
            this.setState({showModal: false})
        }
    }

    forgotPasswordHandler = (e) => {
        e.preventDefault();
        let fpStatus = null;
        const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (typeof this.state.fpEmail == 'string' && this.state.fpEmail.trim().length > 0 && emailRegEx.test(String(this.state.fpEmail).toLowerCase())) {
            fpStatus = {
                success: true,
                message: 'Received! Check your email for the reset link! You have 10mins!'
            }

            this.props.onForgotPasswordInit(this.state.fpEmail);

        }
        else {
            fpStatus = {
                success: false,
                message: 'Invalid email!'
            }
        }
        this.setState({fpStatus})

    }


    render() {
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to="/dashboard"/>
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                <div className={classes.innerContent}>


                    <form onSubmit={this.handleSubmit}>
                        <h1>Auth</h1>

                        <p className={[classes.errorMessage, this.props.error ? classes.active : null].join(' ')}>
                            {this.props.error ? this.props.error : null}
                        </p>

                        <input placeholder={"cool_email@email.com"} type="email" onChange={(e) => {
                            this.setState({email: e.target.value})
                        }} value={this.state.email}/>
                        <input placeholder={"Secretive secret password"} type="password" onChange={(e) => {
                            this.setState({password: e.target.value})
                        }} value={this.state.password}/>
                        <input type="submit" value={this.state.isSignUp ? 'Sign Up' : 'Sign In'}/>
                        <div className={classes.smallText}>
                            <div id={"changeButton"} className={classes.changeSignMethodButton}
                                 onClick={this.changeSignMethod}>Switch
                                to {this.state.isSignUp ? 'Sign In?' : 'Sign Up?'}</div>
                            <div onClick={() => this.setState({showModal: true})}
                                 className={classes.forgotPassword}>Forgot Password?
                            </div>
                        </div>
                    </form>
                </div>
                <Modal clicked={this.forgotPasswordModalClicked} active={this.state.showModal}>
                    <form onSubmit={this.forgotPasswordHandler} className={classes.forgotPasswordForm}>
                        <h3>Forgot Your Password? No worries!</h3>
                        <p className={[classes.fpStatus,
                            (this.state.fpStatus && !this.props.fpeError)
                                ? ((this.state.fpStatus.success)
                                ? `${classes.success} ${classes.active}`
                                : `${classes.fail} ${classes.active}`) : null].join(' ')}
                        >{this.state.fpStatus ? this.state.fpStatus.message : null}</p>
                        <p className={[classes.fpStatus,
                            (this.props.fpeError)
                                ? `${classes.fail} ${classes.active}`
                                : null].join(' ')}

                        >{this.props.fpeError? this.props.fpeError: null}</p>
                        <input placeholder={"cool_email@email.com"} type="email" onChange={(e) => {
                            this.setState({fpEmail: e.target.value})
                        }} value={this.state.fpEmail}/>
                        <input type="submit" value='Submit'/>
                    </form>
                </Modal>


                <Modal customModal={classes.signUpModal} customModalActive={classes.active} active={this.props.signedUp} >
                    <div>
                        Successfully signed up! Check your email!
                        <p className={classes.redirectingMessage}>Redirecting to Authenticate page!</p>
                    </div>

                    {this.props.signedUp && setTimeout(() => {
                        this.props.onSignUp();
                        this.props.history.push(`/authenticate`);
                    }, 3000)}
                </Modal>

                <Modal customModal={classes.loadingModal} customModalActive={classes.active}  active={this.props.loading}>
                    <img src={LoaderImg} alt=""/>
                </Modal>

            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        fpeError: state.auth.fpeError,
        signedUp: state.auth.signedUp
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: () => dispatch(actions.signUpRestart()),
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onForgotPasswordInit: (email) => dispatch(actions.onChangePassword(email))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
