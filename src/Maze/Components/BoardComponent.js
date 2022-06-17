import React from 'react'
import GridNode from './GridNode.css'
import Board from './Board'
import { kruskal } from './Algorithms/Kruskal';
import Node from './Node'
import { prim } from './Algorithms/Prim';
import { DFS } from './Algorithms/DFS';
import { wilson } from './Algorithms/Wilson'
import { cordsEqual } from './Algorithms/GridMethods';

class BoardComponent extends React.Component{
    constructor(props){
        super(props);
        //this.board = new Board(10, 10);
        this.board = props.board;
        //this.getMazeAlgorithm = props.getMazeAlgorithm;
        this.algorithmChoice = props.algorithmChoice;
        this.printState = this.printState.bind(this);
        this.resetBoard = this.resetBoard.bind(this);
        this.launch = this.launch.bind(this);
        this.showingGridNumbers = false;

        this.kruskal = "Kruskal";
        this.prim = "Prim";
        this.DFS = "DFS";
        this.wilson = "Wilson";

        this.isMaze = false;
        this.isGenerating = false;

        //this.animateKruskal = this.animateKruskal.bind(this);
        this.state={
          showGridNumbers: false,
          isMaze:false,
          board: this.board
        };
    }

    placeCell(props){
      const isCellRound = props.isCellRound;
      const i = props.i;
      const j = props.j
      console.log(isCellRound);
        return (
          <div className="GridNodeBorderless">
            <p>{this.board.grid[i][j]}</p>
          </div>
          );

    }


    render(){
      console.log('render board called');
      console.log(this.state.board.grid);
        return(
    <div className="App">

      <button id={'resetButton'}
            onClick={this.resetBoard}>
                <span class="button_top">
                    Reset  
                </span>
            </button>

      <button id={'launchButton'}
            onClick={this.launch}>
                <span class="button_top">
                    Launch  
                </span>
            </button>
      <div className="BoardContainer">
      {this.state.board.grid.map((row, i) => {
        return (
          <div className="GridRow">
            {this.state.board.grid[i].map((col, j) => {
              return(
                <div className="GridRow">
                  {/*
                <div className=
                {(this.board.grid[i][j] == 0)
                  ? ""
                  : (this.board.grid[i][j] == 1)
                    ? "GridNodeBorderless"
                    : (this.board.grid[i][j] == 2)
                      ? "GridNodeTopWall"
                      : (this.board.grid[i][j] == 3)
                        ? "GridNodeLeftWall"
                        : (this.board.grid[i][j] == 4)
                          ? "EmptyTopWall"
                          : (this.board.grid[i][j] == 5)
                            ? "EmptyLeftWall"
                            : ""
                      }>
                </div>  
                 */}
                 <Node
                  row={i}
                  col={j}
                  isTopWall={this.state.board.isTopWall(i, j)}
                  isSideWall={this.state.board.isLeftWall(i, j)}
                  isTopWallEmpty={this.state.board.isEmptyTopWall(i, j)}
                  isSideWallEmpty={this.state.board.isEmptyLeftWall(i, j)}
                  isNode={this.state.board.isNode(i, j)}
                  nodeValue={this.state.board.calculateGridNumber(i, j)}
                  isStartNode={this.state.board.isStartNode(i, j)}
                  isFinishNode={this.state.board.isFinishNode(i, j)}
                  showGridNumber={this.state.showGridNumbers}
                 ></Node>
                
                </div>
              );
            })}
          </div>
        );
      })}
      </div>
      </div>
        );
    }

    launch = function(){
      if(this.isMaze == true){
        return;
      }
      //this.isGenerating = true;
      //this.isMaze = true;
      let alg = this.algorithmChoice.getCurrent();
      console.log(alg);
      console.log(this.wilson);
      if(alg === this.kruskal){
        this.isGenerating = true;
        this.startKruskal();
        this.isMaze = true;
      }
      else if(alg === this.prim){
        this.isGenerating = true;
        this.startPrim();
        this.isMaze = true;
      }
      else if(alg === this.DFS){
        this.isGenerating = true;
        this.startDFS();
        this.isMaze = true;
      }
      else if(alg === this.wilson){
        this.isGenerating = true;
        this.startWilson();
        this.isMaze = true;
        //this.setState({isMaze: true});
      }
      else{
        console.log("ALG NOT FOUND IN: BoardComponent.launch()");
        this.isGenerating = false;
        this.isMaze = false;
      }
    }
    printState = function(){
      let dfs = DFS(this.board.grid);
      this.animateDFS(dfs);
    }

    startWilson(){
      this.stopShowGridNumbers();
      let w = wilson(this.board.grid);
      this.animateWilson(w[0], w[1]);
      console.log(w);
      console.log(this.board.grid);
    }
    
    startKruskal(){
      //USE THIS CODE TO CALL AND ANIMATE KRUSKAL
      this.startShowGridNumbers();
      let krusk = kruskal(this.board.grid);
      let removed = krusk[0];
      let groupOrder = krusk[1];
      this.animateKruskal(removed, groupOrder);
    }

    startPrim(){
      //USE THIS CODE TO ANIMATE PRIM 
      this.stopShowGridNumbers();
      let p = prim(this.board.grid);
      let nodes = p[0];
      let neighbors = p[1];
      let edges = p[2];
      this.addClassNameToAllNodes('NodeNotInMaze');
      this.stopShowGridNumbers();
      this.animatePrim(nodes, neighbors, edges);
    }

    startDFS(){
      this.stopShowGridNumbers();
      let dfs = DFS(this.board.grid);
      this.animateDFS(dfs);
    }

    resetBoard = function(){
      if(this.isGenerating){
        return;
      }
      let newGrid = this.state.board.reset();
      this.setState({board: this.board});

      for (let i = 0; i < this.state.board.grid.length; i++){
        for(let j = 0; j < this.state.board.grid[i].length; j++){
          let newClassName = "";
          if(this.state.board.isTopWall(i, j)){
            newClassName = 'GridNodeTopWall';
          }
          else if (this.state.board.isLeftWall(i, j)){
            newClassName = 'GridNodeLeftWall';
          }
          else if(this.state.board.isNode(i, j)){
            newClassName = 'GridNodeBorderless';
          }
          else{
            newClassName = 'NullNode';
          }
          document.getElementById(`node-${i}-${j}`).className = newClassName;
        }
        this.isMaze = false;
      }

    }

    getElementalValueAt(i, j){
      let val = this.board.grid[i][j]
      if(val == 1){
        return(<p>{this.board.calculateGridNumber(i, j)}</p>);
      }
      else{
        return null;
      }
    }

    printThings(x){
      console.log(x);
    }

    animateWilson(nodes, edges){
      this.isGenerating = true;
      let nodeInMaze = 'NodeInMaze';
      let nodeNotInMaze = 'NodeNotInMaze';
      let pathNode = 'NeighborNode';
      let removedTopWall = 'EmptyTopWall';
      let removedLeftWall = 'EmptyLeftWall';
      this.addClassNameToAllNodes(nodeNotInMaze);

      let edgeIteration = -1;
      let emptyWall = false;
      for(let k = 0; k <= nodes.length; k++){
        setTimeout(() => {
          if(k == nodes.length){
            this.isGenerating = false;
            this.addClassNameToAllNodes(nodeInMaze);
            this.setState({board: this.board});
          }
          else{
            if(cordsEqual([-1, -1], nodes[k][0])){
              //animate full iteration here

              //animates nodes
              for(let p = 0; p < nodes[k-1].length; p++){
                let i = nodes[k-1][p][0];
                let j = nodes[k-1][p][1];
                document.getElementById(`node-${i}-${j}`).className = nodeInMaze;
              }

              //animates edges
              console.log("edge iteration: " + edgeIteration);
              if(edgeIteration >= 0){
                for(let p = 0; p < edges[edgeIteration].length; p++){
                  let i = edges[edgeIteration][p][0];
                  let j = edges[edgeIteration][p][1];
                  let name = ''
                  if(this.board.isEmptyTopWall(i, j)){
                    name = "EmptyTopWall";
                  }
                  else if(this.board.isEmptyLeftWall(i, j)){
                    name = "EmptyLeftWall";
                  }
                  else{
                    emptyWall = true;
                  }
                
                  document.getElementById(`node-${i}-${j}`).className = name;
                }
              }
              edgeIteration++;
            }


            //animates the paths of each walk 
            else{
              //removes previous path
              if(k > 0){
                for(let p = 0; p < nodes[k-1].length; p++){
                  let i = nodes[k-1][p][0];
                  let j = nodes[k-1][p][1];
                  document.getElementById(`node-${i}-${j}`).className = nodeNotInMaze;
                }
              }
              //shows new path
              for(let p = 0; p < nodes[k].length; p++){
                let i = nodes[k][p][0];
                let j = nodes[k][p][1];
                document.getElementById(`node-${i}-${j}`).className = pathNode;

              }
            }
          }



        }, 50 * k);
      }
      console.log("NULL WALL: " + emptyWall);

    }

    animateDFS(nodes){
      this.isGenerating = true;
      let nodeInMaze = 'GridNodeBorderless';
      let nodeNotInMaze = 'NodeNotInMaze';
      let neighborNode = 'NeighborNode';
      let removedTopWall = 'EmptyTopWall';
      let removedLeftWall = 'EmptyLeftWall';
      let currentNode = neighborNode;
      this.addClassNameToAllNodes(nodeNotInMaze);
      for(let k = 0; k <= nodes.length; k++){
        setTimeout(() => {
          if (k == nodes.length){
            document.getElementById(`node-${nodes[nodes.length-1][0][0]}-${nodes[nodes.length-1][0][1]}`).className = nodeInMaze;
            this.isGenerating = false;
          }
          if (k == 0){
            let i = nodes[k][0][0];
            let j = nodes[k][0][1];
            document.getElementById(`node-${i}-${j}`).className = currentNode;
          }
          else if (k < nodes.length){
            let i = nodes[k][0][0];
            let j = nodes[k][0][1];
            document.getElementById(`node-${nodes[k-1][0][0]}-${nodes[k-1][0][1]}`).className = nodeInMaze;
            document.getElementById(`node-${i}-${j}`).className = currentNode;
            if(nodes[k][1] != null){
              i = nodes[k][1][0];
              j = nodes[k][1][1];
              let name = '';
              if(this.board.isEmptyTopWall(i, j)){
                name = "EmptyTopWall";
              }
              else if(this.board.isEmptyLeftWall(i, j)){
                name = "EmptyLeftWall";
              }
              document.getElementById(`node-${nodes[k][1][0]}-${nodes[k][1][1]}`).className = name;
            }
          }

        }, 100 * k);
      }
    }


    animatePrim(nodes, neighbors, edges){
      let nodeInMaze = 'NodeInMaze';
      let nodeNotInMaze = 'NodeNotInMaze';
      let neighborNode = 'NeighborNode';
      let removedTopWall = 'EmptyTopWall';
      let removedLeftWall = 'EmptyLeftWall';
      for(let k = 0; k <= nodes.length; k++){
        setTimeout(() => {
          if(k==nodes.length){
            this.isGenerating = false;
          }
          //animate the node added
          let i = nodes[k][0];
          let j = nodes[k][1];

          document.getElementById(`node-${i}-${j}`).className = nodeInMaze;
          
          for(let l = 0; l < neighbors[k].length; l++){
            i = neighbors[k][l][0];
            j = neighbors[k][l][1];
            document.getElementById(`node-${i}-${j}`).className = neighborNode;
          }

          if(k > 0){
            i = edges[k][0];
            j = edges[k][1];
            let name = "";
            if(this.board.isEmptyTopWall(i, j)){
              name = "EmptyTopWall";
            }
            else if(this.board.isEmptyLeftWall(i, j)){
              name = "EmptyLeftWall";
            }
            document.getElementById(`node-${i}-${j}`).className = name;
          }
          

        }, 100 * k);
      }
    }


    animateKruskal(orderOfWallsRemoved, groupOrder){
      for(let k = 0; k <= orderOfWallsRemoved.length; k++){
        setTimeout(() => {
          if(k == orderOfWallsRemoved.length){
            this.setState({showGridNumbers: false});
            this.stopShowGridNumbers();
            this.isGenerating = false;
          }
          else{
          let i = orderOfWallsRemoved[k][0];
          let j = orderOfWallsRemoved[k][1];
  
          console.log([i, j]);
          let name = "";
          if(this.board.isEmptyTopWall(i, j)){
            name = "EmptyTopWall";
          }
          else if(this.board.isEmptyLeftWall(i, j)){
            name = "EmptyLeftWall";
          }
          //starts the wall animation
          document.getElementById(`node-${i}-${j}`).className = name;

          let groupVal = document.getElementById(`node-${groupOrder[k][0][0]}-${groupOrder[k][0][1]}`).innerText;
          for(let p = 0; p < groupOrder[k].length; p++){
            console.log(groupOrder[p]);
            let x = groupOrder[k][p][0];
            let y = groupOrder[k][p][1];

            document.getElementById(`node-${x}-${y}`).innerHTML = groupVal;
            var newone = document.getElementById(`node-${x}-${y}`).cloneNode(true);
            //document.getElementById(`nodeValue-${x}-${y}`).parentNode.replaceChild(newone, document.getElementById(`nodeValue-${x}-${y}`));
            //document.getElementById(`nodeValue-${x}-${y}`).className='GroupNumberAnimation';
            document.getElementById(`node-${x}-${y}`).parentNode.replaceChild(newone, document.getElementById(`node-${x}-${y}`));
            document.getElementById(`node-${x}-${y}`).className = 'GridNodeBorderless';
          }
        }
        }, 100 * k);
      }
    }


    stopShowGridNumbers(){
      if(this.showingGridNumbers == false){
        return;
      }
      for(let i = 0; i < this.board.height; i++){
        for(let j = 0; j < this.board.width; j++){
          document.getElementById(`node-${i}-${j}`).innerHTML = null;
        }
      }
      this.showingGridNumbers = false;
    }
    startShowGridNumbers(){
      if(this.showingGridNumbers){
        return;
      }
      for(let i = 0; i < this.board.height; i++){
        for(let j = 0; j < this.board.width; j++){
          if(this.board.isNode(i, j)){
            document.getElementById(`node-${i}-${j}`).innerHTML = this.board.calculateGridNumber(i, j);
          }
        }
      }
      this.showingGridNumbers = true;
    }

    addClassNameToAllNodes(name){
      for(let i = 0; i < this.board.height; i++){
        for(let j = 0; j < this.board.width; j++){
          if(this.board.isNode(i, j)){
            document.getElementById(`node-${i}-${j}`).className = name;
          }
        }
      }
    }


}

export default BoardComponent