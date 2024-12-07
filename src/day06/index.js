import run from "aocrunner";

const parseInput = (rawInput) => {
  let rows = rawInput.split('\n');

  let size = [rows.length, rows[0].length];
  let obstacles = new Set();
  let startPos = [];
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    let row = rows[rowIndex];
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      let character = row[columnIndex];
      if (character === "#") obstacles.add(`${rowIndex},${columnIndex}`);
      if (character === "^") startPos = [rowIndex, columnIndex];
    }
  }
  return {size: size, startPos: startPos, obstacles: obstacles };
}

const Direction = {
  Up: 0,
  Right: 1,
  Down: 2,
  Left: 3,
};

let kill = false;

const part1 = (rawInput) => {
  let {size: size, startPos: currentPosition, obstacles: obstacles} = parseInput(rawInput);

  let direction = Direction.Up;
  let visited = new Set();

  while(true) {
    //console.log(`${currentPosition[0]},${currentPosition[1]}, count is ${count}`);
    let nextPosition = [currentPosition[0] - 1, currentPosition[1]];

    if (direction == Direction.Down) {
      nextPosition = [currentPosition[0] + 1, currentPosition[1]];
    }
    else if (direction == Direction.Left)
    {
      nextPosition = [currentPosition[0], currentPosition[1] - 1];
    }
    else if (direction == Direction.Right) {
      nextPosition = [currentPosition[0], currentPosition[1] + 1];
    }

    if (nextPosition[0] < 0 || nextPosition[1] < 0 || nextPosition[0] >= size[0] || nextPosition[1] >= size[1])
    {
      visited.add(`${currentPosition[0]},${currentPosition[1]}`);
      return visited.size;
    }

    if (obstacles.has(`${nextPosition[0]},${nextPosition[1]}`))
    {
      direction = (direction + 1) % 4;
      continue;
    }

    currentPosition = nextPosition;
    visited.add(`${currentPosition[0]},${currentPosition[1]}`);
  }

  return visited.size;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: "41",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
