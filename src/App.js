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
    <div>
      <h1>Tic Tac Toe</h1>

      <Board {...this.state} setTheState={this.setTheState}/>
      <div>
        History
        {this.state.history.map((item, index)=> {return <button onClick={()=>this.timeTravel(index)}>move{index+1}</button>})}
      </div>
    </div>

    )
  }
}
