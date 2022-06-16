import React from "react";

class ChoiceButton extends React.Component{
    constructor(props){
        super(props);
        this.name = props.name;
        this.unpressAllFunction = props.unpressAllFunction;
        this.algorithmChoice = props.algorithmChoice;
        this.state = {
            pressable: true,
            pressed: false,
        }

        this.unpress = this.unpress.bind(this);
        this.press = this.press.bind(this);
        this.isPressed = this.isPressed.bind(this);
    }

    render(){
        let buttonName = this.name + "Button";
        return(
            <button id={buttonName}
            onClick={this.press}>
                <span class="button_top">
                    {this.name}  
                </span>
            </button>
        )
    }

    
    press = function(){
        console.log(this.name);
        this.unpressAllFunction();
        this.algorithmChoice.chooseWithName(this.name);
        let buttonName = this.name + "Button";
        const button = document.getElementById(buttonName);
        button.style.setProperty('--button_color', 'rgb(192, 200, 76)');
        this.setState({pressed: true});
    }




    unpress = function(){
        let buttonName = this.name + "Button";
        const button = document.getElementById(buttonName);
        button.style.setProperty('--button_color', 'white');
        this.setState({pressed: false});
    }
    

    isPressed = function(){
        return this.state.pressed;
    }



}

export default ChoiceButton