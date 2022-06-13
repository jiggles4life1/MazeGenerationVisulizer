class ChooseMazeGenerationAlgorithm{
    constructor(){
        this.kruskal = "Kruskal";
        this.prim = "Prim";
        this.DFS = "DFS";
        this.current = "";
    }


    chooseKruskal = function(){
        this.current = this.kruskal;
    }

    choosePrim = function(){
        this.current = this.prim;
    }

    chooseDFS = function(){
        this.current = this.DFS;
    }

    chooseWithName = function(name){
        if (name === this.kruskal){
            this.chooseKruskal();
        }
        else if (name === this.prim){
            this.choosePrim();
        }
        else if (name === this.DFS){
            this.chooseDFS();
        }
        else{
            console.log("ALGORITHM NOT FOUND IN chooseWithName()");
        }

        console.log(this.current);
    }

    getCurrent = function(){
        return this.current;
    }



}

export default ChooseMazeGenerationAlgorithm