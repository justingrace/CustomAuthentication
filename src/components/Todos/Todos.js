import React from 'react';
import classes from './Todos.scss';
import uuidv4 from 'uuid/v4';

import Aux from '../../Hoc/Aux/Aux';
import addAudio from '../../assets/audio/add.mp3';


class Todos extends React.Component{
  state = {
    todo: '',
    todos: []
  }

  presentQuadrant = 0;
  tempTodos = [];
  inputAddTodo = React.createRef();
  moving = false;

  sortTodos = ()=> {
    this.tempTodos.map((t, index) => ({...t, priority: index}));
    this.setState(prevState => ({todos:this.tempTodos}));
  }

  startEditTodo = (id) => {
    const todo = document.getElementById(`todo-${id}`);
    if(todo.querySelector(`#todoText-${id}`).style.display=='none'){
      this.submitEditTodoForm(null, id);
    }
    else{
      todo.querySelector(`#editor-${id}`).style.display='block';
      todo.querySelector(`#todoText-${id}`).style.display='none';
      todo.querySelector(`#editor-${id}`).firstElementChild.firstElementChild.focus();
      todo.querySelector(`#editButton-${id}`).style.fill='#00bcd4';
    }


  }
  submitEditTodoForm = (e, id) => {
    if(e) e.preventDefault();
    const form = document.getElementById(`form-${id}`);
    const todo = document.getElementById(`todo-${id}`);
    todo.querySelector(`#editor-${id}`).style.display='none';
    todo.querySelector(`#todoText-${id}`).style.display='flex';
    todo.querySelector(`#editButton-${id}`).style.fill='#2b2b2b';

    this.setState((prevState) => ({
      todo: '',
      todos: prevState.todos.map(todo => {
        if(todo.id === id){
          return {
            ...todo,
            title: form.submit.value
          }
        }
        else{
          return todo
        }
      })
    }));

  }

  checkTodo = (id) => {
    this.setState((prevState) => ({
      todos: this.state.todos.map(todo => {
        if(todo.id === id){
          return {
            ...todo,
            completed: !todo.completed
          }
        }
        else{
          return todo
        }
      })
    }));
  }

  getClassNames = (element) => {
      let x="";
      for (var i = 0; i < element.classList.length; i++) {
        x+=(element.classList[i]);
      }
      return x;
      x.indexOf(className) != -1 ? element.classList.remove(className) : element.classList.add(className);
    }

  toggleAddTodoMenu = (e) => {
    if(this.getClassNames(addTodoMenu).indexOf("showMenu")!=-1){
      addTodoMenu.classList.remove("showMenu");
      this.inputAddTodo.current.blur();
    }
    else{
      addTodoMenu.classList.add("showMenu");
      this.inputAddTodo.current.focus();
    }
    let addTodoToggler = document.getElementById('addTodoToggler')
    this.getClassNames(addTodoToggler).indexOf("toggledOn") != -1 ? addTodoToggler.classList.remove('toggledOn') : addTodoToggler.classList.add('toggledOn');
  }

  changeTodo = (e) => {
    this.setState({todo:e.target.value});
  }

  addTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      title: e.target[0].value,
      id: uuidv4(),
      completed: false,
      priority: this.state.todos.length
    }
    this.toggleAddTodoMenu();
    const newTodos = (this.state.todos != null) ? this.state.todos.concat(newTodo) : [].concat(newTodo);
    this.setState((prevState)=>({todo: '', todos:newTodos}));
    document.getElementById("addTodo-audio").play();
    if(navigator.vibrate){
    	navigator.vibrate([100, 200, 200]);
    }

  }

  deleteTodo = (id) => {
    const todo = document.getElementById(`todo-${id}`);
    todo.classList.add('deleting');

    if(navigator.vibrate){
    	navigator.vibrate(200);
    }
    setTimeout(() => {this.setState((prevState) => ({todos:prevState.todos.filter(todo => todo.id !== id)}))}, 200);

  }

  preventScroll = () => {
    document.querySelector("body").style.overflow="hidden";
    document.querySelector("body").style.height="100%";
  }
  allowScroll = () => {
    document.querySelector("body").style.overflow="initial";
    document.querySelector("body").style.height="initial";
  }

  onTouchStart = (e, id) => {
    this.tempTodos = this.state.todos.map(todo => ({...todo}));
    this.presentQuadrant = Math.ceil((e.nativeEvent.targetTouches[0].pageY-160)/70)-1;

    if(!(e.target instanceof SVGElement)){
      this.moving = true;
      e.target.closest("li[class*=todo]").classList.add('movingTodo');
      this.preventScroll();
    }
  }

  swapTwoObjectsInTempTodos = (quadrant) => {
    let tempObject = {
      ...this.tempTodos[quadrant]
    };
    this.tempTodos[quadrant] = {
      ...this.tempTodos[this.presentQuadrant]
    };
    this.tempTodos[this.presentQuadrant] = {
      ...tempObject
    };
  }

  onTouchMove = (e, id) => {
    if(this.moving){
    const todo = document.getElementById(`todo-${id}`);
    let touchesObj = e.nativeEvent.targetTouches[0];
    if(touchesObj.pageY > 160 && touchesObj.pageY < (160 + (this.state.todos.length*70))){
      let quadrant = Math.ceil((touchesObj.pageY-160)/70)-1;

      todo.style.top = 170 + (quadrant*70) + 'px';
      let todoElements = document.querySelectorAll("li[class*='todo']");
      let todoElementsArr = Array.from(todoElements)

      let check = false;
      let elementToMove = todoElementsArr.filter(t => t.id == `todo-${this.tempTodos[quadrant].id}`)[0];

      if(quadrant < this.presentQuadrant){
        this.swapTwoObjectsInTempTodos(quadrant);
        elementToMove.style.top = `calc(70px + ${elementToMove.style.top})`;
      }
      else if(quadrant > this.presentQuadrant){
        this.swapTwoObjectsInTempTodos(quadrant);
        elementToMove.style.top = `calc(${elementToMove.style.top} - 70px)`;
      }

      this.presentQuadrant = quadrant;
      this.pageY = touchesObj.pageY;
    }
    }
  }



  onTouchEnd = (e) => {
    this.allowScroll();
    document.querySelector("body").style.overflow="initial";
    document.querySelector("body").style.height="initial";
    this.sortTodos();
    e.target.closest("li[class*=todo]").classList.remove('movingTodo');
    this.moving = false;
  }

  onTouchCancel = (e) => {
    e.target.closest("li[class*=todo]").classList.remove('movingTodo');
    this.moving = false;
  }

  onDragStart = (e) => {
    this.tempTodos = this.state.todos.map(todo => ({...todo}));
    this.presentQuadrant = Math.ceil((e.pageY-160)/70)-1;
    e.target.closest("li[class*=todo]").classList.add('movingTodo');
  }
  onDragEnd = (e) => {
    let newQuadrant = Math.ceil((e.pageY-160)/70)-1;

    if(newQuadrant<this.presentQuadrant){
      let temp = {...this.tempTodos[this.presentQuadrant]};
      for(let i=this.presentQuadrant-1;i>=newQuadrant;i--){
        this.tempTodos[i+1]={
          ...this.tempTodos[i]
        };
      }
      this.tempTodos[newQuadrant]={...temp};
      this.sortTodos();
    }
    else{
      let temp = {...this.tempTodos[this.presentQuadrant]};
      for(let i=this.presentQuadrant+1;i<=newQuadrant;i++){
        this.tempTodos[i-1]={
          ...this.tempTodos[i]
        };
      }
      this.tempTodos[newQuadrant]={...temp};
      this.sortTodos();
    }


    e.target.closest("li[class*=todo]").classList.remove('movingTodo');


  }


  componentDidUpdate(prevProps, prevState){
    if(prevState.todos != this.state.todos){
      localStorage.setItem("todos", JSON.stringify(this.state.todos));
    }
  }

  componentDidMount(){
    const localTodos = JSON.parse(localStorage.getItem("todos"));
    if(localTodos!=null){
      this.setState({todos:localTodos});
    }

    document.querySelector("input").blur();

  }

  render(){
    return(
      <Aux>
        <ul id="todoList" className={classes.todos}>
          {(this.state.todos != null && this.state.todos[0] != undefined)
            ? this.state.todos.map((todo, index) => {
              const top = (index*70) + 170;
              return (
                <li draggable="true" style={{'top':`${top}px`}} key={todo.id} id={`todo-${todo.id}`} className={todo.completed ? `${classes.todo} completed` : `${classes.todo}`} onTouchCancel={this.onTouchCancel} onTouchStart={(e)=>this.onTouchStart(e, todo.id)} onTouchMove={(e)=>this.onTouchMove(e, todo.id)} onTouchEnd={this.onTouchEnd} onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
                  <div className={classes.todoEditorholder}>
                    <p id={`todoText-${todo.id}`} className={todo.completed?`${classes.todoText} completed`: classes.todoText}>{todo.title}</p>
                  <div id={`editor-${todo.id}`} className={classes.editor}>
                      <form id={`form-${todo.id}`} className={classes.editTodoForm} name="editTodoForm" onSubmit={(e)=>this.submitEditTodoForm(e, todo.id)}>
                        <input name="submit" type="text" defaultValue={todo.title} className={classes.editTodoInput} />
                      </form>
                    </div>
                  </div>
                  <div className={classes.icons}>
                    <svg onClick={(e)=>this.checkTodo(todo.id)} className={classes.completeButton} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    <svg id={`editButton-${todo.id}`} onClick={()=>this.startEditTodo(todo.id)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                    <svg onClick={()=>this.deleteTodo(todo.id)} className={classes.deleteButton} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                  </div>
                </li>
              )
            })

            : <p className={`${classes.todo} ${classes.starterTodo}`}>You don't have any To-dos 🙌🏼. <br/> Good job!😎</p>
          }
        </ul>
        {this.state.todos.length >0 ? <p style={{'top':`calc(170px + ${this.state.todos.length} * 70px)`}} className={classes.todoCount}>You have <span>{this.state.todos.length}</span> to-do(s)</p> : null}

        <form id="addTodoMenu" className={classes.addTodoMenu} onSubmit={this.addTodo}>
            <h1>Add a To-do </h1>
            <input id="addTodoInput" ref={this.inputAddTodo} type="text" value={this.state.todo} onChange={this.changeTodo} placeholder="Be awesome! Oh wait...Done!"/>
            <input className="submit" type="submit"/>
        </form>
        <div id="addTodoToggler" className={classes.addTodoToggler} onClick={this.toggleAddTodoMenu}>
          <svg viewBox="0 0 50 50">
            <path d="M 25,0 L 25,50 M 0,25 L 50,25"></path>
          </svg>
        </div>
        <audio id="addTodo-audio" src={addAudio} autostart="false"></audio>
      </Aux>
    )
  }
}

export default Todos;
