import React from 'react';
import Header from './components/Header/Header';
import Todos from './components/Todos/Todos';
import Aux from './Hoc/Aux/Aux';


class App extends React.Component {
  componentDidMount(){
    console.log("[App] Component Did Mount");
  }

  render() {
    return (
        <Aux>
          <Header />
          <Todos />
        </Aux>
    );
  }
}

export default App;
