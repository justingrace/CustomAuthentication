import React from 'react';
import Aux from "../../Hoc/Aux/Aux";
import * as classes from './landing.scss';

class Landing extends React.Component{
    render(){
        return(
            <Aux>
                <div className={classes.Landing}>
                    <div className={classes.innerContent}>
                        Landing Page
                    </div>

                </div>
            </Aux>

        );
    }
}


export default Landing;