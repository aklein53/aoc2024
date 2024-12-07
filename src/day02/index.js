import run from "aocrunner";

const parseInput = (rawInput) => {
  let list1 = [];
  let list2 = [];
  return rawInput.split('\n').map((x) => {
    return x.split(' ').map(y => parseInt(y));
  });

  return [list1, list2];
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let count = 0;
  
  for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
    let currentRow = input[rowIndex];
    if (isValidSequence(currentRow)) count++;
  }

  return count;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let count = 0;
  
  for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
    let currentRow = input[rowIndex];
    if (isValidSequence(currentRow)) {
      count++;
      continue;
    }

    for (let columnIndex = 0; columnIndex < currentRow.length; columnIndex++)
    {
      if (isValidSequence(currentRow.filter((_, index) => index !== columnIndex ))){
        count++;
        break;;
      } 
    }
  }
  
  return count;
};

const isValidSequence = (sequence) => {
    let prev = null;
    let isIncreasing = null;

    let currentRow = sequence;
    for (let columnIndex = 0; columnIndex < currentRow.length; columnIndex++) {
      const current = currentRow[columnIndex];

      // If it's the first element, just set the previous and continue
      if (prev == null) {
        prev = current;
        continue;
      }
  
      let delta = current - prev;
      
      // If the delta is not -3, -2, -1, 1, 2, or 3, break
      if (delta == 0 || delta > 3  || delta < -3) {
        return false;
      }
  
      // If isIncreasing isn't set yet, set it
      if (isIncreasing == null)
      {
        isIncreasing = delta > 0;
      }
  
      // If we're changing directions, break
      if ((delta < 0 && isIncreasing == true) || (delta > 0 && isIncreasing == false)) {
        return false;
      }
      
      // If we are at the end, add to count and done
      if (columnIndex == currentRow.length - 1)
      {
        return true;
      }
      prev = current;
    }

    return true;
}

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: "2",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: "4",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
