import React from 'react';
import classes from "./Board.module.css";

import Input from '../Input/Input';

const board = ({ boardValues }) => {

    const changedHandler = (e, arr, innerIndex) => {
        const entry = Number(e.target.value);
        if (entry && entry < 10 && entry > 0) {
            arr[innerIndex] = entry;
        }
        else {
            arr[innerIndex] = '.'
            document.getElementById('error').textContent = 'Please enter a single digit number only';
        }
    }
    let i = 0;
    let sudokoBoard = boardValues.map((val, index) => {
        const innerDiv = val.map((el, innerIndex, arr) => {
            i++;
            return <Input defaultValue={Number(arr[innerIndex]) ? arr[innerIndex] : null} changedHandler={(e) => changedHandler(e, arr, innerIndex)} key={i} />
        });
        return (
            <div className={classes.Block} id={'val' + index} key={'val' + index} >
                {innerDiv}
            </div>
        )
    })
    return (
        <div className={classes.Board} >
            { sudokoBoard}
        </div>
    )
}

export default board;
