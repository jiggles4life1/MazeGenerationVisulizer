class Board{
    constructor(height, width){
        this.height = height;
        this.width = width;
        this.grid = [];
        this.walls = []
        this.wallCords = [];
        this.wallBufferSpace = this.height-2;

        //this.startNodeLocation = [0, 0];
        //this.finishNodeLocation = [this.width, this.height];
        this.startNodeLocation = [-1, -1];
        this.finishNodeLocation = [this.width + 1, this.height + 1];
        //because the walls have to be included in the grid,
        //it has to be even so that there doesn't end up being
        //an extra wall at the border of the grid
        if (this.height % 2 == 0){
            this.height++;
        }
        if(this.width % 2 == 0){
            this.width++;
        }
        var cur = 0;

        //in grid:
        //0 = null space (no class or div)
        //1 = gridSpace
        //2 = Top Wall
        //3 = Side Wall
        //4 = Empty Top Wall
        //5 = Empty Side Wall
        for(let i = 0; i < this.height; i++){
            var row = []
            for (let j = 0; j < this.width; j++){
                //grid spaces go on even i iterations
                //EVEN ROWS
                if(i % 2 == 0){
                    if (j % 2 == 0){
                        row.push(1);
                    }
                    else{
                        row.push(3);
                        this.wallCords.push([i, j]);
                    }
                }
                //NON-EVEN ROWS
                else{
                    if(j % 2 == 0){
                        row.push(2)
                        this.wallCords.push([i, j]);
                    }
                    else{
                        row.push(0);
                    }
                }
            }
            this.grid.push(row);
        }

    }
    addLeftWall(i, j){
        if (i == 0){
            return;
        }
        const wallCords = [i, j, i-1, j];
        this.walls.push(wallCords);
    }

    addTopWall(i, j){
        if(j == 0){
            return;
        }
        const wallCords = [i, j, i, j-1];
        this.walls.push(wallCords);
    }

    isTopWall = function(i, j){
        return this.grid[i][j] == 2;
    }

    isLeftWall = function(i, j){
        return this.grid[i][j] == 3;
    }

    isEmptyTopWall = function(i, j){
        return this.grid[i][j] == 4;
    }

    isEmptyLeftWall = function(i, j){
        return this.grid[i][j] == 5;
    }

    isWall = function(i, j){
        return this.isLeftWall(i, j) || this.isTopWall(i, j);
    }

    isNode = function(i, j){
        if(this.isStartNode(i, j)){
            return false;
        }
        if(this.isFinishNode(i, j)){
            return false;
        }

        return this.grid[i][j] == 1;
    }

    isStartNode = function(i, j){
        return (this.startNodeLocation[0] == i && this.startNodeLocation[1] == j);
    }

    isFinishNode = function(i, j){
        return (this.finishNodeLocation[0] == i && this.finishNodeLocation[1] == j);
    }

    removeRandomWall = function(){
        const random = Math.floor(Math.random() * this.wallCords.length);
        const el = this.wallCords.splice(random, 1)[0];
        var i = el[0];
        var j = el[1];
        var newVal = 0;
        if (this.isLeftWall(i, j)){
            newVal = 5
        }
        else if (this.isTopWall(i, j)){
            newVal = 4;
        }
        this.grid[i][j] = newVal;
    }

    totalLengthOfGrid = function(){
        var total = 0;
        for (let i = 0; i < this.width; i++){
            total += this.grid[i].length;
        }
        return total;
    }

    reset = function(){
        this.grid = [];
        let newGrid = [];
        for(let i = 0; i < this.height; i++){
            var row = []
            for (let j = 0; j < this.width; j++){
                //grid spaces go on even i iterations
                //EVEN ROWS
                if(i % 2 == 0){
                    if (j % 2 == 0){
                        row.push(1);
                    }
                    else{
                        row.push(3);
                        this.wallCords.push([i, j]);
                    }
                }
                //NON-EVEN ROWS
                else{
                    if(j % 2 == 0){
                        row.push(2)
                        this.wallCords.push([i, j]);
                    }
                    else{
                        row.push(0);
                    }
                }
            }
            newGrid.push(row);
        }
        this.grid = newGrid;
        return newGrid;
    }

    //calculates the "index" of each space in the grid for show
    calculateGridNumber = function(i, j){
        if (i % 2 == 1){
            return;
        }
        if (j % 2 == 2){
            return;
        }
        let w = (this.width + 1) / 2;
        let x = i / 2;
        let y = j / 2;
        return (w * x) + y;
    }

}

export default Board