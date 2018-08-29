import classes from './Toast.scss'
import React from 'react';
const Toast = () => {
  return (
    <div className={classes.Toast}>
      <p>This app has been <span className={classes.red}>upgraded</span>! <br/>Close & <span className={classes.red}>Re-open</span> to get the updates! </p>
    </div>
  );
}

export default Toast;
