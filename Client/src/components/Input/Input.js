import React from 'react';
import classes from './Input.module.css';

const Input = ({changedHandler,defaultValue}) => {

    return (
        <input className={classes.Input} type='tel' pattern='[0-9]{1}' onChange={changedHandler} defaultValue={defaultValue?defaultValue:null} />
    )
}

export default Input;