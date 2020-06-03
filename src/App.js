import './App.css';
import Board from './components/Board'
import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login';



export default class App extends Component {

  constructor(props){
    super(props)
    this.state={
      squares:Array(9).fill(null),
      isXNext: true,
      winner: null,
      history:[],
      topRank:[],
      facebook:{},
      isLogIn: false,
      startArray:[],
      final: null
    }
  }

  setTheState=(obj)=>{
    this.setState(obj)
}


  timeTravel = (index) =>{
    let newArray = this.state.history.slice()
    console.log(newArray)
    this.setState({squares:newArray[index].squares, isXNext:newArray[index].isXNext})
    
  }

  getData = async() =>{
    let url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`
    let data = await fetch(url)
    let result = await data.json()
    this.setState({...this.state,topRank:result.items})
}

reset = () =>{
  this.setState({squares:Array(9).fill(null),
    isXNext: true,
    winner: null,
    history:[],
    startArray:[],
    final: null})
}


componentDidMount(){
  this.getData();
}

responseFacebook = (response) => {
  console.log(response);
  this.setState({facebook:response})
  this.setState({isLogIn:true})
}
  render() {


    return (
<table className="container">
  <thead>
    <tr>
      <th><h1>Tic Tac Toe</h1></th>
      <th>
          {this.state.isLogIn ? <h3>{`User Name: ${this.state.facebook.name}`}</h3> : <FacebookLogin
          autoLoad={true}
          appId="931549237283892"
          fields="name,email,picture"
          callback={(resp) => this.responseFacebook(resp)}
          isDisabled={this.state.isDisabled}/>}
      </th>
    </tr>
  </thead>
  <tbody >
    <tr>
      <td><Board {...this.state} setTheState={this.setTheState}/></td>
      <td className="history"><h3>History</h3>
        {this.state.history.map((item, index)=> {return <button onClick={()=>this.timeTravel(index)}>move{index+1}</button>})}</td>
    </tr>
    <tr><td className="history"><button onClick={()=>this.reset()}>Reset</button></td>
      <td><h1>Top Rank</h1>
      {this.state.topRank.map(item => {return <div>{item.player}:{item.score}</div>})}</td>
    </tr>
  </tbody>
</table>

    )
  }
}
