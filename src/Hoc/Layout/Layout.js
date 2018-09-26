import React from 'react';
import Aux from "../Aux/Aux";
import Header from "../../components/Header/Header";
import * as actions from "../../store/actions";
import {connect} from "react-redux";



class Layout extends React.Component{
    render(){
        return(
            <Aux>
                <Header logout={this.props.onLogout} isAuthenticated={this.props.isAuthenticated}/>
                <div className="mainContent">{this.props.children}</div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
