import React from 'react';
import classes from './Backdrop.scss';

const backdrop = (props) => {
  return (
    <div onClick={props.clicked} className={[classes.Backdrop, props.active ? classes.activeBackdrop : null, props.customBackdrop].join(' ')}>{props.children}</div>
  );
}
export default backdrop;
