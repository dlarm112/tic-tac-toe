import './App.css';
import Board from './components/Board'
import React, { Component } from 'react'

export default class App extends Component {

  constructor(props){
    super(props)
    this.state={
      squares:Array(9).fill(null),
      isXNext: true,
      winner: null,
      history:[],
    }
  }

  setTheState=(obj)=>{
    this.setState(obj)
}

  timeTravel = (index) =>{
    console.log(index)
    
  }

  render() {

    return (
    <div className="app">
      <table className="padme">
      <tr>
        <td>
        <h1>Tic Tac Toe</h1>
        <Board {...this.state} setTheState={this.setTheState}/>
        </td>
     
        <div className="padme">
        History
        {this.state.history.map((item, index)=> {return <p><button onClick={()=>this.timeTravel(index)}>move{index+1}</button></p>})}
        </div>
      </tr>
      </table>

    </div>

    )
  }
}
