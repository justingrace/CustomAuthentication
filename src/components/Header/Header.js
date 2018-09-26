import React from "react";
import classes from './Header.scss';
import {NavigationItem} from "../Navigation/NavigationItem/NavigationItem";
import Aux from "../../Hoc/Aux/Aux";
import {withRouter} from 'react-router-dom';

class Header extends React.Component {

    state = {
        showMenu: false
    }

    handleLogout = () => {
        this.props.logout();
        this.props.history.push('/');
    }

    componentDidMount(){
        document.onclick = (e) => {
            if(e.target.closest("#Ham") == null){
                if(this.state.showMenu) this.setState({showMenu: false})
            }
        }
    }

    render() {
        return (
            <header className={classes.Header}>
                <div className={classes.leftHeader}>
                    <div className={classes.Logo}>Logo</div>
                    <div id="Ham" onClick={() => this.setState(prevState => ({showMenu: !prevState.showMenu}))}
                         className={[classes.HamMenu, this.state.showMenu ? classes.toggledHam : null].join(' ')}>
                        <div className={classes.Ham}></div>
                        <div className={classes.Ham}></div>
                        <div className={classes.Ham}></div>
                    </div>
                </div>


                <div className={[classes.navigation, this.state.showMenu ? classes.activeMenu : null].join(' ')}>
                    <div className={[classes.navigationItems, this.state.showMenu ? classes.activeMenu : null].join(' ')}>
                        <NavigationItem link="/">Home</NavigationItem>
                        {!this.props.isAuthenticated
                            ?

                            <NavigationItem link="/authenticate">Authenticate</NavigationItem>
                            :
                            <Aux>
                                <NavigationItem link="/dashboard">Dashboard</NavigationItem>
                                <div className={classes.AuthSection}>
                                    <p onClick={this.handleLogout}>Logout</p>
                                </div>
                            </Aux>

                        }
                    </div>

                </div>


            </header>
        );
    }
}

export default withRouter(Header);