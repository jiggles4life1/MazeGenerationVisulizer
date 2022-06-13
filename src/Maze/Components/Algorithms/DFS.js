//goto 

import { cordsEqual, findEdges, findNodes, getEdgeBetweenNodes, getNeighbors, getRandomElement, removeEdge } from "./GridMethods";
import Stack from "./Stack";

export function DFS(grid){
    let nodes = findNodes(grid);
    let edges = findEdges(grid);
    let stack = new Stack();
    let visitedNodes = [];

    //to animate, each element of order will have two things 
    //0: the next node
    //1: the wall removed
    //if no wall removed (backtracking through the stack) then 1 = null
    let order = [];


    //random node to start
    let curNode = getRandomElement(nodes);
    stack.push(curNode);
    visitedNodes.push(curNode);
    order.push([curNode, null]);
    while (visitedNodes.length < nodes.length){
        //console.log(curNode);

        //get unvisited neighbors of current node
        let bors = getUnvisitedNeighbors(curNode, visitedNodes, grid);
        let nextNode = null;
        //if there are unvisited neighbors at curNode
        if(bors.length > 0){
            nextNode = getRandomElement(bors);
            let edge = getEdgeBetweenNodes(curNode, nextNode);
            removeEdge(grid, edge);
            visitedNodes.push(nextNode);
            order.push([nextNode, edge]);
            stack.push(nextNode);
        }
        //if there are no unvisitied neighbors
        else{
            nextNode = stack.pop();
            order.push([nextNode, null]);
        }

        curNode = nextNode;
    }

    return order;
}

function getUnvisitedNeighbors(node, visitedNodes, grid){
    let bors = getNeighbors(node, grid);
    for(let i = 0; i < visitedNodes.length; i++){
        for(let j = 0; j < bors.length; j++){
            if(cordsEqual(bors[j], visitedNodes[i])){
                bors.splice(j, 1);
            }
        }
    }
    return bors;
}