import React from 'react'

class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        message: '¡Hola, Nicolás!' 
      };
    }
  
    render() {
      return (
        <div>
          <h1>{this.state.message}</h1>
        </div>
      );
    }
  }
  
  export default Home;