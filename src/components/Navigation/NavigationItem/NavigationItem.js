import React from 'react';
import { NavLink }from "react-router-dom";
import * as classes from './NavigationItem.scss';

export const NavigationItem = (props) => {
    return(
        <div className={classes.NavigationItem}>
            <NavLink
                exact
                to={props.link}
                activeClassName={classes.active}
            >
                {props.children}
            </NavLink>
        </div>

    );
}