import React from 'react';
import classes from './Form.module.css';

const form = ({ setImage, clickHandler, cl, error }) => {
    return (
        <form className={classes.form} encType='multipart/form-data'>
            <p>{error ?? 'Solve sudoko using an image'}</p>
            <p>Upload a clear picture of only<br /> the sudoko board</p>
            <label className={classes.Upload} >
                <input type='file' className={classes.hide} name='image' onChange={(e) => {
                    setImage(e.target.files[0]);
                    document.getElementById('imageName').textContent = e.target.files[0].name;
                    setTimeout(() => {
                        document.getElementById('imageName').textContent = 'Upload Image';
                    }, 10000);
                }}
                    accept='image/jpeg,image/png' />
                <span>+</span>
            </label>
            <label id='imageName' >Upload Image</label>
            <button className={cl} type='submit' onClick={(e) => clickHandler(e)} >submit</button>
        </form>
    )
}

export default form;