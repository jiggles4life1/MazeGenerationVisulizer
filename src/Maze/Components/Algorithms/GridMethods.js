export function findEdges(grid){
    let edgeLocations = [];
    for (let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[i].length; j++){
            if ((grid[i][j] == 2) || (grid[i][j] == 3)){
                edgeLocations.push([i, j]);
            }
        }
    }
    return edgeLocations;
}

export function findNodes(grid){
    let nodeLocations = [];
    for (let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[i].length; j++){
            if (grid[i][j] == 1){
                nodeLocations.push([i, j]);
            }
        }
    }
    return nodeLocations;
}


export function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

export function removeEdge(grid, edge){
    let i = edge[0];
    let j = edge[1];
    //since wall and empty wall are 2 apart in mapping
    grid[i][j] += 2;
}

export function cordsEqual(cordOne, cordTwo){
    return(cordOne[0] == cordTwo[0]) && (cordOne[1] == cordTwo[1]);
}


export function calculateGridNumber(i, j, width){
    if (i % 2 == 1){
        return;
    }
    if (j % 2 == 2){
        return;
    }
    let w = (width + 1) / 2;
    let x = i / 2;
    let y = j / 2;
    return (w * x) + y;
}

export function getRandomElement(array){
    var item = array[Math.floor(Math.random()*array.length)];
    return item;
}

export function getAndRemoveRandomElement(array){
    let rand = Math.floor(Math.random()*array.length)
    var item = array[rand];
    array.splice(rand, 1);
    return item;
}

export function removeCordsFromArray(cords, array){
    for(let i = 0; i < array.length; i++){
        if (cordsEqual(cords, array[i])){
            array.splice(i, 1);
            return;
        }
    }
    console.log("cords not in array");
}

export function cellsAreNeighbors(nodeOne, nodeTwo){
    let totalX = Math.abs(nodeOne[1] - nodeTwo[1]);
    let totalY = Math.abs(nodeOne[0] - nodeTwo[0]);
    if (totalX + totalY > 2){
        return false;
    }
    else{
        return true;
    }
}

export function getEdgeBetweenNodes(nodeOne, nodeTwo){
    //checks that the two nodes are next to each other
    let totalX = Math.abs(nodeOne[1] - nodeTwo[1]);
    let totalY = Math.abs(nodeOne[0] - nodeTwo[0]);
    if (totalX + totalY > 2){
        console.log("Error, nodes are not next to each other");
        return null;
    }

    let i = 0;
    let j = 0;
    //if i index is equal
    if (nodeOne[0] == nodeTwo[0]){
        if (nodeOne[1] > nodeTwo[1]){
            j = nodeOne[1] - 1;
        }
        else{
            j = nodeTwo[1] - 1;
        }
        i = nodeOne[0];
    }
    else{
        if (nodeOne[0] > nodeTwo[0]){
            i = nodeOne[0] - 1;
        }
        else{
            i = nodeTwo[0] - 1;
        }
        j = nodeOne[1];
    }
    return [i, j];

}


export function getNeighbors(cell, grid){
    console.log(cell);
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
