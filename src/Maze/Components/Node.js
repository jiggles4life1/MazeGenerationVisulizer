import React from 'react'
class Node extends React.Component{

    render(){
        const{
            row,
            col,
            isTopWall,
            isSideWall,
            isTopWallEmpty,
            isSideWallEmpty,
            isNode,
            nodeValue,
            isStartNode,
            isFinishNode,
            showGridNumber
        } = this.props;



        const nodeClassName = isNode
            ? 'GridNodeBorderless'
            : isTopWall
                ? 'GridNodeTopWall'
                : isSideWall
                    ? 'GridNodeLeftWall'
                    : isTopWallEmpty
                        ? 'EmptyTopWall'
                        : isSideWallEmpty
                            ? 'EmptyLeftWall'
                            : isStartNode
                                ? 'StartNode'
                                : isFinishNode
                                    ? 'FinishNode'
                                    : 'NullNode';

        return(
            showGridNumber
            ?
            <div className={nodeClassName}
                 id={`node-${row}-${col}`}>
                {(isNode || isStartNode || isFinishNode) ? (<p id={`nodeValue-${row}-${col}`}>{nodeValue}</p>) : null}
            </div>
            :
            <div className={nodeClassName}
            id={`node-${row}-${col}`}>
            </div>

        )
    }
}

export default Node