class Stack{
    constructor(){
        this.array = [];
        this.length = 0;
    }

    push(value){
        this.array.push(value);
        this.length += 1;
    }
    pop(){
        if(this.length <= 0){
            return;
        }
        this.length -= 1;
        return this.array.pop();
    }
}
export default Stack