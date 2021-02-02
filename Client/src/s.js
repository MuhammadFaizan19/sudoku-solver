from utils import *

rows = 'ABCDEFGHI'
cols = '123456789'

def cross(a,b):
    boxes = []
    for s in a:
        for t in b:
            boxes.append(s+t)

    return boxes

boxes = cross(rows, cols)
row_units = [cross(r, cols) for r in rows]
column_units = [cross(rows, c) for c in cols]
square_units = [cross(rows[x:x+3], cols[y:y+3]) for x in range(0,9,3) for y in range(0,9,3)]
unitList = row_units + column_units + square_units

def grid2values(grid):
    sodukoDict = {}
    for i in range(len(grid)):
        if grid[i] != '.':
            sodukoDict[boxes[i]] = grid[i]
        else:
            sodukoDict[boxes[i]] = '123456789'
    return sodukoDict

def display(values):
    width = 1+max(len(values[s]) for s in boxes)
    line = '+'.join(['-'*(width*3)]*3)
    for r in rows:
        print(''.join(values[r+c].center(width)+('|' if c in '36' else '')
                      for c in cols))
        if r in 'CF': print(line)
    return

def print_soduko(grid):
    display(dict(zip(boxes, grid)))

def intersection(A,B):
    return [value for value in A if value in B]

def naked_twins(values):
    for boxA in values.keys():
        if len(values[boxA]) == 2:
            for boxB in findPeers(boxA):
                if values[boxA] == values[boxB]:
                    for peer in intersection(findPeers(boxA), findPeers(boxB)):
                        for digit in values[boxA]:
                            # values[peer] = values[peer].replace(digit, '')
                            values = assign_value(values, peer, values[peer].replace(digit, ''))
    return values

def findPeers(pos):
    for row_unit in row_units:
        if pos in row_unit:
            row = row_unit
            break
    for col_unit in column_units:
        if pos in col_unit:
            col = col_unit
            break
    for square_unit in square_units:
        if pos in square_unit:
            square = square_unit
    peers = list(set(row + col + square))
    peers.remove(pos)
    peers = sorted(peers)
    return peers

def eliminate(values):
    solved_values = [box for box in values.keys() if len(values[box]) == 1]
    for boxPos in solved_values:
        boxVal = values[boxPos]
        peerPositions = findPeers(boxPos)
        for peerPos in peerPositions:
            values = assign_value(values, peerPos,values[peerPos].replace(boxVal, ''))
    return values

def only_choice(values):
    for unit in unitList:
        for digit in '123456789':
            dplaces = [box for box in unit if digit in values[box]]
            if len(dplaces) == 1:
                # values[dplaces[0]] = digit
                values = assign_value(values, dplaces[0], digit)
    return values

def reduce_puzzle(values):
    stalled = False
    while not stalled:
        solved_values_before = len([box for box in values.keys() if len(values[box]) == 1])
        values = eliminate(values)
        values = naked_twins(values)
        values = only_choice(values)
        solved_values_after = len([box for box in values.keys() if len(values[box]) == 1])
        stalled = solved_values_before == solved_values_after
        if len([box for box in values.keys() if len(values[box]) == 0]):
            return False
    return values

def search(values):
    values = reduce_puzzle(values)
    if not values:
        return False
    if all(len(values[s]) == 1 for s in boxes):
        return values 
    unsolved_boxes = [box for box in values.keys() if len(values[box]) > 1]
    s = unsolved_boxes[0]
    for box in unsolved_boxes:
        if values[box] < values[s]:
            s = box
    for value in values[s]:
        new_sudoku = values.copy()
        new_sudoku = assign_value(new_sudoku, s, value)
        attempt = search(new_sudoku)
        if attempt:
            return attempt

def solve(grid):
    values = grid2values(grid)
    values = search(values)
    return values

if __name__ == "__main__":
    diag_sudoku_grid = '2.............62....1....7...6..8...3...9...7...6..4...4....8....52.............3'
    print_soduko(diag_sudoku_grid)
    print('\n')
    result = solve(diag_sudoku_grid)
    display(result)
    try:
        import PySudoku
        PySudoku.play(grid2values(diag_sudoku_grid), result, history)

    except SystemExit:
        pass
    except:
        print('We could not visualize your board due to a pygame issue.')
