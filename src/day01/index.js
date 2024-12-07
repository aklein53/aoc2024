import run from "aocrunner";

// Split on spaces and get pairs of numbers from each line
const parseInput = (rawInput) => {
  let list1 = [];
  let list2 = [];
  rawInput.split('\n').map((x) => {
    var splits = x.split(' ');
    list1.push(parseInt(splits[0]));
    list2.push(parseInt(splits[3]));
  });

  return [list1, list2];
};

const part1 = (rawInput) => {
  const inputs = parseInput(rawInput);
  let list1 = inputs[0];
  let list2 = inputs[1];
  list1.sort();
  list2.sort();

  console.log(list1);
  console.log(list2);
  let sum = 0;
  for (let index = 0; index < list1.length; index++) {
    const element1 = list1[index];
    const element2 = list2[index];
    
    sum += Math.abs(element1 - element2);
  }

  return sum;
};

const part2 = (rawInput) => {
  const inputs = parseInput(rawInput);
  let list1 = inputs[0];
  let list2 = inputs[1];

  let sum = 0;

  list1.map(x => {
    sum += x * list2.filter(y => y == x).length;
  });

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: "11",
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
