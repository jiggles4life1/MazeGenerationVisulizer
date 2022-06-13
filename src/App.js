import React from 'react';
import './App.css';
import Board from './Maze/Components/Board'
import BoardComponent from './Maze/Components/BoardComponent';
import MazeGenerationDropdown from './Buttons/Menu/MazeGenerationDropdown'
import ChooseMazeGenerationAlgorithm from './Maze/Components/ChooseMazeGenerationAlgorithm';
function App() {
  var boardToPass = new Board(25, 40);
  let algorithmChoice = new ChooseMazeGenerationAlgorithm();
    return (
    <div className = 'Container'>
      <MazeGenerationDropdown algorithmChoice={algorithmChoice}/>
    

    <div className = "Center">
      <BoardComponent board={boardToPass}
      algorithmChoice={algorithmChoice}
                      />
    </div>
    </div>
  );
}

export default App;
