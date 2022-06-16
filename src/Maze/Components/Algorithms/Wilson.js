import {copyNodesArray, cordsEqual, findEdges, findNodes, getAndRemoveRandomElement, getEdgeBetweenNodes, getRandomElement, removeCordsFromArray, removeEdge} from './GridMethods'



const Direction = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
}


//1: pick random cell node to put in the 'in maze'
//2: pick random cell node
//3: walk from cell node until an 'in maze' node is encountered. 
//3a: as you walk, store the direction on each node encountered thats not in maze.
//3b: if a node is encountered twice, override its direction with the newest direction.
//4: when an 'in maze' node is found, go back to starting cell and add path to 'in maze' node to 'in maze'
//4a: remove walls according to direction on node (remove wall to right if direction is RIGHT)
//5 repeat 2-4 untill all nodes are 'in maze'

/*for the animation, each time the 'walk' finds a loop, the nodes in that
iteration are pushed to hte orderOfNodesVisitedArray. Then, after each 
successful walk, those nodes are pushed followed by the push of [-1, -1] to indicate
for the animation function that the last index are the nodes that were
added to the maze that iteration. This should be enough info to animate the algorithm.
For the edges, each iteration of removals will be stored in an array and one iteration should
be removed at each finding of the [-1, -1] array. */
export function wilson(grid){
    let nodes = findNodes(grid);
    let edges = findEdges(grid);
    let totalLength = nodes.length;
    let edgesRemoved = [];

    let inMaze = [];
    let orderOfNodesVisited = [];
    let orderOfEdgesRemoved = [];

    inMaze.push(getAndRemoveRandomElement(nodes));
    orderOfNodesVisited.push(copyNodesArray(inMaze));
    orderOfNodesVisited.push([[-1, -1]]);
    //while all nodes aren't in inMaze
    let counter = 0;
    while(!(inMaze.length == totalLength)){
        let curWalkNodes = [];
        let curWalkMoves = [];
        let curNode = getAndRemoveRandomElement(nodes);
        curWalkNodes.push(curNode);

        //walk until a node in the maze is found
        let nodeInMazeFound = false;
        let c = 0;
        while(!nodeInMazeFound){
            walk(curWalkNodes[curWalkNodes.length-1], grid, curWalkMoves, curWalkNodes, orderOfNodesVisited);
            console.log("curNode: " + curNode);
            console.log("inMaze: " + inMaze);
            console.log("curWalkNodes: " + curWalkNodes);
            console.log("curWalkMoves: "  + curWalkMoves);

            nodeInMazeFound = nodeIsInMaze(curWalkNodes[curWalkNodes.length-1], inMaze);

            c++;
        }
        inMaze.pop();
        orderOfNodesVisited.push(copyNodesArray(curWalkNodes));
        orderOfNodesVisited.push([[-1, -1]]);

        //add nodes in path to nodes in maze
        for (let i = 0; i < curWalkNodes.length; i++){
            inMaze.push(curWalkNodes[i]);
            removeCordsFromArray(curWalkNodes[i], nodes);
        }

        //remove edges in the current path
        let iterationOfEdges = [];
        for(let i = 0; i < curWalkNodes.length-1; i++){
            let edge = getEdgeBetweenNodes(curWalkNodes[i], curWalkNodes[i+1]);

            let edgeIsReal = false;
            for(let j = 0; j < edges.length; j++){
                if(cordsEqual(edge, edges[j])){
                    edgeIsReal = true;
                }
            }
            if(!edgeIsReal){
                console.log("Warning: removing object that is not edge");
            }
            iterationOfEdges.push(edge);
            removeEdge(grid, edge);
            if(grid[edge[0]][edge[1]] > 4){
                console.log("WARNING: removed edge twice. edge = " + edge);
            }
            edgesRemoved.push(edge);
        }
        orderOfEdgesRemoved.push(iterationOfEdges);
        console.log(curNode);
        console.log(inMaze);
        console.log(curWalkNodes);
        console.log(curWalkMoves);
        console.log("if you're seeing this the node was found");
        console.log(nodes.length);
        counter++;
    }
    return [orderOfNodesVisited, orderOfEdgesRemoved];
}


function walk(curNode, grid, moveArray, nodesArray, order){
    let moves = getValidMoves(curNode, grid);
    let moveChoice = getRandomElement(moves);

    moveArray.push(moveChoice);
    nodesArray.push(getNodeAfterMove(curNode, moveChoice));

    //loop detection
    dealWithLoops(nodesArray, moveArray, order);
    
}


function dealWithLoops(nodesArray, movesArray, order){
    if(nodesArray.length < 3){
        return;
    }
    let curNode = nodesArray[nodesArray.length-1];
    for (let i = 0; i < nodesArray.length-1; i++){
        if(cordsEqual(curNode, nodesArray[i])){
            order.push(copyNodesArray(nodesArray));
            while(!(i==nodesArray.length)){
                nodesArray.pop();
                if(movesArray.length > 0){
                    movesArray.pop();
                }
            }
            nodesArray.push(curNode);

            return;
        }
    }
}



function nodeIsInMaze(curNode, nodesInMaze){
    for(let i = 0; i < nodesInMaze.length; i++){
        if(cordsEqual(curNode, nodesInMaze[i])){
            return true;
        }
    }
    return false;
}

function getNodeAfterMove(curNode, move){
    let i = -1;
    let j = -1;
    if (move == Direction.UP){
        i = curNode[0] - 2;
        j = curNode[1];
    }
    else if (move == Direction.DOWN){
        i = curNode[0] + 2;
        j = curNode[1];
    }
    else if (move == Direction.LEFT){
        i = curNode[0];
        j = curNode[1] - 2;
    }
    else if(move == Direction.RIGHT){
        i = curNode[0];
        j = curNode[1] + 2;
    }
    else{
        console.log("ERROR: Incorrect parameter 'move' in getNodeAfterMove: Wilson.js");
    }
    return [i, j];
}


function getValidMoves(curNode, grid){
    let moves = [];
    if(curNode[1] > 0){
        moves.push(Direction.LEFT);
    }
    if(curNode[1] < grid[0].length - 1){
        moves.push(Direction.RIGHT);
    }
    if(curNode[0] > 0){
        moves.push(Direction.UP);
    }
    if(curNode[0] < grid.length-1){
        moves.push(Direction.DOWN);
    }
    return moves;
}


