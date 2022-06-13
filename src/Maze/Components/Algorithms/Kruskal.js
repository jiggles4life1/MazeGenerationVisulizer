
//this function performs kruskal's algorithm on a grid
export function kruskal(grid){
    //initializes the needed information for the algorithm
    let edges = findEdges(grid);
    let nodes = findNodes(grid);
    let groups = initGroups(nodes);
    let changedGroupOrder = [];
    let orderOfEdgesRemoved = [];

    shuffle(edges);
    while(edges.length){
        console.log("iterating");
        let edge = edges.pop();
        let edgeNodes = getEdgeNodes(grid, edge);
        let nodeOne = edgeNodes[0];
        let nodeTwo = edgeNodes[1];
        let indexOne = findGroup(groups, nodeOne);
        let indexTwo = findGroup(groups, nodeTwo);


        //if the groups are different join groups and remove wall
        if(!groupsAreSame(indexOne, indexTwo)){
            changedGroupOrder.push(joinGroups(groups, indexOne, indexTwo));
            orderOfEdgesRemoved.push(edge);
            removeEdge(grid, edge);
        }

    }

    return [orderOfEdgesRemoved, changedGroupOrder];


}


function getEdgeNodes(grid, edge){
    let x = edge[0];
    let y = edge[1];

    //horizontal wall
    if (grid[x][y] == 2){
        return [[x-1, y],[x+1, y]];
    }
    //vertical wall
    else if (grid[x][y] == 3){
        return [[x, y-1],[x,y+1]];
    }

    else{
        console.log("EDGE CORDINATES DID NOT POINT TO WALL");
        return null;
    }
}

//finds the edges in a grid and returns their locaitons [x, y]
function findEdges(grid){
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

function findNodes(grid){
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


//initializes each edge into a respective group
function initGroups(nodes){
    let group = []
    for (let i = 0; i < nodes.length; i++){
        let newGroup = []
        newGroup.push([nodes[i][0], nodes[i][1]]);
        group.push(newGroup);
    }
    return group;
}

function findGroup(groups, node){
    for (let i = 0; i < groups.length; i++){
        for (let j = 0; j < groups[i].length; j++){
            //console.log(node);
            //console.log(groups[i][j]);
            if(node[0] == groups[i][j][0] && node[1] == groups[i][j][1]){
                return i;
            }
        }
    }
}

function groupsAreSame(indexOne, indexTwo){
    return indexOne == indexTwo;
}

//joins two groups 
//(puts the values of the second indexed group into the first, then removes the second)
//indexOne/indexTwo = the index of the GROUP, no
function joinGroups(groups, indexOne, indexTwo){
    for (let i = 0; i < groups[indexTwo].length; i++){
        groups[indexOne].push([groups[indexTwo][i][0], groups[indexTwo][i][1]]);
    }
    let groupToAddToOrder = [];
    for(let i = 0; i < groups[indexOne].length; i++){
        groupToAddToOrder.push(groups[indexOne][i]);
    }
    //removes the second group from the array
    groups.splice(indexTwo, 1);

    return groupToAddToOrder;
}

function removeEdge(grid, edge){
    let i = edge[0];
    let j = edge[1];
    //since wall and empty wall are 2 apart in mapping
    grid[i][j] += 2;
}


function shuffle(array) {
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

