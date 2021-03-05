/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import classes from './App.module.css';

import Board from './components/Board/Board';
import SolvedBoard from './components/SolvedBoard/SolvedBoard';

import { checkValidEntries, retrieveSolution, solved, clearBoard, hard, easy } from "./helpers";
import axios from 'axios';
import Form from './components/Form/Form';


const App = () => {
  const [boardValues, setBoardValues] = useState([
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.']
  ]);
  const [data, setData] = useState(null)
  const [image, setImage] = useState(null)
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);


  const imageSubmited=()=>{
    setLoad(true)
    const buttons=document.getElementsByTagName('button')
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('disabled',true) 
      buttons[i].style.cursor='not-allowed'
    }
    setTimeout(() => {
      setLoad(false)
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].removeAttribute('disabled') 
        buttons[i].style.cursor='pointer'
      }
    }, 15000)
    setImage(null)
  }

  const clickHandler = (e) => {
    e.preventDefault();
    if (image) {
      let formData = new FormData();
      formData.append('imagePath', image)
      imageSubmited()
      setData(formData);
    }
    else {
      setError('Please Upload An Image')
    }
  }


  useEffect(() => {
    if (data) {
      axios.post('http://localhost:3002/api/images', data)
        .then(res => console.log(res))
        .catch(err => console.error(err))
    }
    return () => {
      setData(null)
    }
  }, [data])


  const createString = (a, b, result) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        result += boardValues[a[i]][b[j]];
      }
    }
    return result;
  }


  const onClick = () => {
    if (checkValidEntries(boardValues)) {
      let i = 0;
      let j = 0;
      let result = '';
      while (i <= 6) {
        while (j <= 6) {
          result = createString([i, i + 1, i + 2], [j, j + 1, j + 2], result);
          j += 3;
        }
        j = 0;
        i += 3;
      }
      console.log(result);
      document.getElementById('input').value = result;
      document.getElementById('input').click();
    }
  }

  const generatePuzzleHandler = (arr) => {
    const selectedPuzzle = arr[parseInt(Math.random() * 5)];
    retrieveSolution(selectedPuzzle, setBoardValues);
  }
  const checkSolution = () => {
    if (checkValidEntries) {
      let entries = 0;
      for (let i = 0; i < boardValues.length; i++) {
        for (let j = 0; j < boardValues[i].length; j++) {
          if (boardValues[i][j] !== 0 && Number(boardValues[i][j])) { entries++ };
        }
      }
      if (entries === 81) {
        setShow(true);
        solved(classes);
      }
      else {
        document.getElementById('error').textContent = 'Try harder :)';
      }
    }
  }

  return (
    <>
      <div className={load ?classes.Modal:null} >
        <div className={classes.App}>
          <h1>SUDOKO SOLVER</h1>
          <div className={classes.Main} id='main' >

            {!show && <Board boardValues={boardValues} />}
            {show && <SolvedBoard boardValues={boardValues} setShow={setShow} />}
            <div className={classes.Controls} >
              <p id='error' >Please enter min. 16 entires</p>
              {!show && <>
                <button className={classes.button} onClick={checkSolution} >Check Solution</button>
                <p>Generate Puzzle</p>
                <div className={classes.generate} >
                  <button onClick={() => generatePuzzleHandler(easy)} className={classes.button} >Easy</button>
                  <button onClick={() => generatePuzzleHandler(hard)} className={classes.button} >Hard</button>
                </div>
                <button className={classes.button} onClick={onClick}> Solve</button> </>}
              {show && <button className={classes.solvedButton} onClick={() => clearBoard(setBoardValues, setShow, classes)} >Clear Board</button>}
            </div>

            <Form error={error} setImage={setImage} clickHandler={clickHandler} cl={classes.button} />

          </div>

          <input type='text' hidden id='input' className={classes.hide} onClick={(e) => {
            const sol = e.target.value;
            retrieveSolution(sol, setBoardValues);
            setShow(true);
            solved(classes);
          }
          } />
        </div>
      </div>
      {load && <div className={classes.loading} ></div>}
    </>
  );
}


export default App;
