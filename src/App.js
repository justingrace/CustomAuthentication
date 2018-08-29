import React from 'react';
import Header from './components/Header/Header';
import Todos from './components/Todos/Todos';
import Aux from './Hoc/Aux/Aux';
import Toast from './components/Toast/Toast';

class App extends React.Component {
  state = {
    updateAvailable: false
  }
  componentDidMount(){
    console.log("[App] Component Did Mount");
    window['isUpdateAvailable']
    	.then(isAvailable => {
    		if (isAvailable) {
    		  this.setState(prevState => ({updateAvailable:true}));
    		}
    	});
  }

  render() {
    return (
        <Aux>
          <Header />
          <Todos />
          {this.state.updateAvailable && <Toast />}
        </Aux>
    );
  }
}

export default App;
