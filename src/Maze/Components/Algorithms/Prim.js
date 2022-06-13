import { findNodes, shuffle, calculateGridNumber, cordsEqual, getRandomElement, getAndRemoveRandomElement } from "./GridMethods";
import { findEdges, removeCordsFromArray, removeEdge, cellsAreNeighbors, getEdgeBetweenNodes } from "./GridMethods";


/*
Get and remove Random Wall from neighbors
remove if from nodesNotInMaze
add neighbor node to maze
calculate its neighbors and add them to neighboring array

*/
export function prim(grid){
    let edges = findEdges(grid);
    let nodesNotInMaze = findNodes(grid);
    let nodesInMaze = [];
    let bors = [];

    //for animation
    let orderOfNodesAddedToMaze = [];
    let orderOfEdgesRemoved = [];
    let neighborsAtEachStep = [];

    let curNode = getRandomElement(nodesNotInMaze);
    console.log("calling remove chords on nodesNotInMaze");
    removeCordsFromArray(curNode, nodesNotInMaze);
    addNeighbors(bors, curNode, grid, nodesInMaze);
    copyNeighbors(neighborsAtEachStep, bors);
    nodesInMaze.push(curNode);
    orderOfNodesAddedToMaze.push(curNode);
    orderOfEdgesRemoved.push([null]);
    let counter = 0;
    while(nodesNotInMaze.length > 0){
        console.log(curNode);
        curNode = getAndRemoveRandomElement(bors);
        orderOfNodesAddedToMaze.push(curNode);
        findAndRemoveEdge(curNode, nodesInMaze, grid, orderOfEdgesRemoved);
        removeCordsFromArray(curNode, nodesNotInMaze);
        nodesInMaze.push(curNode);
        addNeighbors(bors, curNode, grid, nodesInMaze);
        copyNeighbors(neighborsAtEachStep, bors);
    }

    //remember that there will always be an extra index to start at nodesAdded and neighbors
    //since to start the algorithm you have to get a random node and there's no edges
    //to be removed
    return[orderOfNodesAddedToMaze, neighborsAtEachStep, orderOfEdgesRemoved];



}

function copyNeighbors(step, bor){
    let toPush = [];
    for(let i = 0; i < bor.length; i++){
        toPush.push(bor[i]);
    }
    step.push(toPush);
}

function findAndRemoveEdge(node, nodesInMaze, grid, edges){
    let choices = getAllNeighborsInMaze(node, nodesInMaze, grid);
    let choice = getRandomElement(choices);
    let edge = getEdgeBetweenNodes(node, choice);
    removeEdge(grid, edge);
    edges.push(edge);

}

function addNeighbors(borArray, node, grid, mazeNodes){
    let b = getNeighbors(node, grid);
    for (let i = 0; i < b.length; i++){
        let add = true;

        for(let j = 0; j < borArray.length; j++){
            if (cordsEqual(b[i], borArray[j])){
                add = false;
                break;
            }
        }

        for(let j = 0; j < mazeNodes.length; j++ ){
            if(cordsEqual(b[i], mazeNodes[j])){
                add = false;
                break;
            }
        }

        if (add){
            borArray.push(b[i]);
        }
    }
}

function getNeighbors(cell, grid){
    let neighbors = [];
    let i = cell[0];
    let j = cell[1];
    let height = grid.length;
    let width = grid[0].length;
    //north
    if (i-2 >= 0){
        neighbors.push([i-2, j]);
    }

    //south
    if (i+2 < height){
        neighbors.push([i+2, j]);
    }

    //east
    if(j+2 < width){
        neighbors.push([i, j+2]);
    }

    //west
    if(j-2 >= 0){
        neighbors.push([i, j-2]);
    }

    return neighbors;
}


function addNeighborCellsToSet(newCells, curBors){
    let add = true;
    for(let i = 0; i < newCells.length; i++){
        add = true;
        for(let j = 0; j < curBors.length; j++){
            if(cordsEqual(newCells[i], curBors[j])){
                add = false;
                break;
            }
        }
        if (add){
            curBors.push(newCells[i]);
        }
    }
}

function getAllNeighborsInMaze(curNode, mazeNodes, grid){
    let n = getNeighbors(curNode, grid);
    let neighborsInMaze = [];
    for (let i = 0; i < n.length; i++){
        for(let j = 0; j < mazeNodes.length; j++){
            if(cordsEqual(n[i], mazeNodes[j])){
                neighborsInMaze.push(n[i]);
            }
        }
    }
    return neighborsInMaze;
}
