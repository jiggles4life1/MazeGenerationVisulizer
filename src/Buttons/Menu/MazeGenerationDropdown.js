import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';
import React from 'react'
import { kruskal } from '../../Maze/Components/Algorithms/Kruskal';
import ChoiceButton from './ChoiceButton'
import ChooseMazeGenerationAlgorithm from '../../Maze/Components/ChooseMazeGenerationAlgorithm';

//import Dropdown from 'react-bootstrap/Dropdown'
class MazeGenerationDropdown extends React.Component{
  constructor(props){
    super(props);
    this.algorithmChoice = props.algorithmChoice;
    this.buttonNames = [
      'Kruskal',
      'DFS',
      'Prim'
    ];

    this.buttonRefs = {
      kruskal: React.createRef(),
      DFS: React.createRef(),
      prim: React.createRef()
  };
    this.unpressAllButtons = this.unpressAllButtons.bind(this);
    this.getPressedButton = this.getPressedButton.bind(this);
  }

    render(){
      return (
        <div>


          <ChoiceButton
            ref={this.buttonRefs.kruskal}
            name={this.buttonNames[0]}
            algorithmChoice={this.algorithmChoice}
            unpressAllFunction={this.unpressAllButtons}
            id={this.buttonNames[0] + 'Choice'} 
            />


          <ChoiceButton 
            ref={this.buttonRefs.DFS}
            name={this.buttonNames[1]}
            algorithmChoice={this.algorithmChoice}
            unpressAllFunction={this.unpressAllButtons}
            id={this.buttonNames[1] + 'Choice'} 
            />


          <ChoiceButton 
            ref={this.buttonRefs.prim}
            name={this.buttonNames[2]}
            algorithmChoice={this.algorithmChoice}
            unpressAllFunction={this.unpressAllButtons}
            id={this.buttonNames[2] + 'Choice'} 
            />


        </div>
      )
    }


    unpressAllButtons = function(){
      //console.log(this.buttonRefs.kruskal.current.unpress());
      this.buttonRefs.kruskal.current.unpress();
      this.buttonRefs.DFS.current.unpress();
      this.buttonRefs.prim.current.unpress();
    }

    getPressedButton = function(){
    if(this.buttonRefs.kruskal.current.isPressed()){
      return "kruskal";
    }
    else if (this.buttonRefs.DFS.current.isPressed()){
      return "DFS";
    }
    else if (this.buttonRefs.prim.current.isPressed()){
      return "prim";
    }
    }

}



export default MazeGenerationDropdown