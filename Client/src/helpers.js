export const checkValidEntries = (boardValues) => {
    let valid = true;
    //For a 3x3 box
    for (let i = 0; i < boardValues.length; i++) {
        let check = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let j = 0; j < boardValues[i].length; j++) {
            check[boardValues[i][j]] += 1;
        }
        for (let k = 1; k < check.length; k++) {
            if (check[k] > 1) {
                valid = false;
                break;
            };
        }
    }
    if (!valid) {
        document.getElementById('error').textContent = 'Invalid entries in a block';
        return valid
    };
    //For a row
    const rowColumnChecker = (a, b) => {
        let check = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                check[boardValues[a[i]][b[j]]] += 1;
            }
        }
        for (let k = 1; k < check.length; k++) {
            if (check[k] > 1) {
                valid = false;
                break;
            };
        }
        return valid;
    }
    let i = 0;
    let j = 0;
    while (i <= 6) {
        let continueChecking = true;
        while (j <= 6) {
            continueChecking = rowColumnChecker([i, i + 1, i + 2], [j, j + 1, j + 2]);
            j += 3;
            if (!continueChecking) {
                break;
            }
        }
        j = 0;
        i += 3;
        if (!continueChecking) break;
    }
    if (!valid) {
        document.getElementById('error').textContent = 'Invalid entries in a row';
        return valid
    }
    //For a Column
    let a = 0;
    let b = 0;
    while (a <= 2) {
        let continueChecking = true;
        while (b <= 2) {
            continueChecking = rowColumnChecker([a, a + 3, a + 6], [b, b + 3, b + 6]);
            b++;
            if (!continueChecking) {
                break;
            }
        }
        b = 0;
        a++;
        if (!continueChecking) break;
    }
    if (!valid) {
        document.getElementById('error').textContent = 'Invalid entries in a column';
        return valid
    };
    let entries = 0;
    for (let i = 0; i < boardValues.length; i++) {
        for (let j = 0; j < boardValues[i].length; j++) {
            if (boardValues[i][j] !== 0 && Number(boardValues[i][j])) { entries++ };
        }
    }
    if (entries >= 16) {
        document.getElementById('error').textContent = 'Puzzle is valid';
        return true;
    }
    else {
        document.getElementById('error').textContent = 'Minimum 16 entires are required. You have entered ' + entries;
        return false;
    }

}

const unPackString = (k, a, b, str, values) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            values[a[i]][b[j]] = str[k];
            k++;
        }
    }
    return values;
}
export const retrieveSolution = (sol, setBoardValues) => {
    let i = 0;
    let j = 0;
    let k = 0;
    let unpacked = [
        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.']
    ];
    while (i <= 6) {
        while (j <= 6) {
            unpacked = unPackString(k, [i, i + 1, i + 2], [j, j + 1, j + 2], sol, unpacked);
            j += 3;
            k += 9;
        }
        j = 0;
        i += 3;
    }
    setBoardValues(unpacked);
}

export const solved = (classes) => {
    document.getElementById('error').textContent = 'Puzzle solved';
    document.getElementsByTagName('h1')[0].style.color = '#907b6c';
    document.getElementsByTagName('h1')[0].textContent = 'SOLVED';
    document.getElementsByTagName('body')[0].style.backgroundColor = 'rgb(26,21,21)';
    document.getElementById('main').style.backgroundColor = 'rgb(142 138 138)';
    const btns = document.getElementsByTagName('button')
    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.add(classes.solvedButton)
    }
}
export const clearBoard = (setBoardValues, setShow, classes) => {
    document.getElementById('error').textContent = 'Please enter minimum 16 entries';
    document.getElementsByTagName('h1')[0].style.color = 'chocolate';
    document.getElementsByTagName('h1')[0].textContent = 'SUDOKO SOLVER';
    document.getElementsByTagName('body')[0].style.backgroundColor = 'rgb(26,21,21)';
    document.getElementById('main').style.backgroundColor = 'rgb(142 138 138)';
    const btns = document.getElementsByTagName('button')
    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove(classes.solvedButton);
    }
    setBoardValues([
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
    setShow(false)
}

const a = '3.1.265..8..5...7...9.7.2.896.4.213....9.8..4.23....8.2...85.....71..46.1.6..78.3';
const b = '53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79';
const c = '.2.1......3.6...786...7.35...4..5...9.......2...8..9...91.3...685...6.2......7.9.';
const d = '3..8.1..22.1.3.6.4...2.4...8.9...1.6.6.....5.7.2...4.9...5.9...9.4.8.7.56..1.7..3';
const e = '...26.7.168..7..9.19...45..82.1...4...46.29...5...3.28..93...74.4..5..367.3.18...';

const f = '1...7.4...4.9.85..5..2...3..1.6...4.....8.3.74....9.1.8.13.62...7.....6....1.....';
const g = '..64813...2.....4.7.......98...9...46..342..15...6...23.......5.9.....7...57162..';
const h = '..............3.85..1.2.......5.7.....4...1...9.......5......73..2.1........4...9';
const i = '...7..............1..43.2..........6...5.9.........418....81.....2....5..4....3..';
const j = '4.............9..............7.48.5...13.......6.7....86....9.37....5.62..37.....';

export const hard = [a, b, c, d, e];
export const easy = [f, g, h, i, j];