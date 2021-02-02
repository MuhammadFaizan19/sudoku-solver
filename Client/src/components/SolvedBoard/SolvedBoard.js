import React from 'react';
import classes from './SolvedBoard.module.css';

import Input from '../Input/Input';

const solvedBoard = ({boardValues,setShow}) => {
    let i=0;
    const newBoard = boardValues.map((val, index) => {
        const innerDiv = val.map((el, index, arr) => {
            i++;
            return <Input defaultValue={arr[index]} key={i} />
        });
        return (
            <div className={classes.SolBlock} id={'val' + index} key={index} >
                {innerDiv}
            </div>
        )
    })
    return (
        <div className={classes.SolBoard} >
            {newBoard}
        </div>
    )
}

export default solvedBoard;
