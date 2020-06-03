import React, { Component } from 'react'
import Square from './Square'


export default class Board extends Component {

    renderSquare = (num) => {
        return <Square id={num} boxClick={this.boxClick} value={this.props.squares[num]}/>
    }



    boxClick = (id) =>{
        let start
        let end
        let difference

        if (this.calculateWinner(this.props.squares) || this.props.squares[id]) {
            return;
        }    
        let squaresFromApp = this.props.squares
        squaresFromApp[id]=this.props.isXNext? 'X':'O'
        if (squaresFromApp.some(item => item == null)){
            start=(Date.now())
        }
        if (this.calculateWinner(this.props.squares)){
            end=(Date.now())
           difference = (Math.floor((this.props.startArray[0] - end)/(-1000)))

        } 
        this.props.startArray.push(start);
  
        this.props.setTheState({
            squares:squaresFromApp, 
            isXNext:!this.props.isXNext, 
            history:[...this.props.history,{squares:squaresFromApp.slice(), isXNext:!this.props.isXNext}],
            winner:this.props.winner,
            final:difference,
          })

    }

   

    calculateWinner = (squares) =>{
        const lines = [
          [0,1,2],
          [3,4,5],
          [6,7,8],
          [0,3,6],
          [1,4,7],
          [2,5,8],
          [0,4,8],
          [2,4,6],
        ]
        for (let i = 0; i<lines.length; i++){
          const [a,b,c] = lines[i]
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a]}
        }
        return null;
      }

      postData = async () =>{
        let data = new URLSearchParams();
        data.append("player", `${this.props.facebook.name}`);
        console.log("Score:", `${this.props.final}`)
        data.append("score", (this.props.final));

        const url = await `https://ftw-highscores.herokuapp.com/tictactoe-dev`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: data.toString(),
          json: true
        });
      }

    render() {
        const winner = this.calculateWinner(this.props.squares)
        let status = ''
      
        if (winner) {
            status = 'Winner: ' + winner + ' Score: ' + this.props.final
            this.postData()
          } else {
            status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
          }

        return (
            <div>
                <div><h2>{status}</h2></div>
                <div className="row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}
