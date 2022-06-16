class ChooseMazeGenerationAlgorithm{
    constructor(){
        this.kruskal = "Kruskal";
        this.prim = "Prim";
        this.DFS = "DFS";
        this.Wilson = "Wilson";
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
    chooseWilson = function(){
        this.current = this.Wilson;
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
        else if(name === this.Wilson){
            this.chooseWilson();
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