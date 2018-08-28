import React from 'react';
import classes from './Header.scss';

class Header extends React.Component{
  state = {
    person: ''
  };

  editName = (e) => {
    const newName = prompt("What is your name?", "New Name");
    if(newName.length >= 3){
      localStorage.setItem("person", newName);
      this.setState(()=>({person:newName}));
    }
  }

  componentDidMount() {
    console.log("[Header] Component Did Mount");
    let localPerson = localStorage.getItem("person");
    if(localPerson != "undefined" && localPerson != "null" && localPerson != "" && localPerson != null){
      if(this.state.person == ''){
        this.setState(()=>({person:localPerson}));
      }
    }
    else{
      const person = prompt("What is your name?", "John Doe");
      localStorage.setItem("person", person);
      this.setState(()=>({person}));
    }
  }

  render(){
    return(
      <div className={classes.Header}>
        {`${this.state.person}'s To-dos`}
        <svg className={classes.editName} onClick={(e)=>this.editName(e)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
      </div>
    )
  }
}

export default Header;
