module.exports = function solveSudoku(map, clues = [1,2,3,4,5,6,7,8,9]) {
  const gap = 0;
  const locInRow = (map, row, clue) => {
    let loc = null;
    for (const [col, cl] of map[row].entries())
        if (cl == clue) return null;
        else if (cl == gap && !loc) loc = { row: row, col: col };
    return loc;
  };
  const locInCol = (map, col, clue) => {
    let loc = null;
    for (const [row, entry] of map.entries())
        if (entry[col] == clue) return null;
        else if (entry[col] == gap && !loc) loc = { row: row, col: col };
    return loc;
  };
  const locInSq = (map, loc, clue) => {
    let len = Math.floor(Math.sqrt(map[0].length));
		let row = loc.row - loc.row % len;
		let col = loc.col - loc.col % len;
    let colLen = col + len;
    let l = null;
    for (let rowLen=row+len; row < rowLen; row++)
      for (let c=col; c < colLen; c++)
        if (map[row][c] == clue) return null;
        else if (map[row][c] == gap && !l) l = { row: row, col: c };
    return l;
  };
	const locIsEmpty = (map, loc, clue) => {
		if (locInRow(map, loc.row, clue) && locInCol(map, loc.col, clue) && locInSq(map, loc, clue))
			return true;
		return false;
	};
	const locInMap = (map) => {
		const len = map.length;
		for (let r=0; r < len; r++)
			for (let c=0; c < len; c++)
				if (map[r][c] == gap)
					return { row: r, col: c };
		return null;
	};

	const solve = (map) => {
		let loc = locInMap(map);
		if (!loc)
			return null;
		for (const clue of clues) {
			if (locIsEmpty(map, loc, clue)) {
				map[loc.row][loc.col] = clue;

				if (!solve(map))
					return null;
				map[loc.row][loc.col] = gap;
			}
		}
		return loc;
	};

	if (solve(map))
		throw "No solution found!"
	return map;
}
