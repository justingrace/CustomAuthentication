import React from 'react';
import classes from './Dashboard.scss';

class Dashboard extends React.Component {
    render(){
        return(
            <div className={classes.Dashboard}>
                <div className={classes.innerContent}>
                    <p>Welcome to your Dashboard!</p>
                </div>

            </div>

        );
    }
}

export default Dashboard;