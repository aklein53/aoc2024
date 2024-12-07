import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

  const matches = [...input.matchAll(regex)];

  let sum = 0;
  matches.forEach((match) => {
    sum += parseInt(match[1])*parseInt(match[2]);
  });

  return sum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const regex = /(mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\))/g;

  const matches = [...input.matchAll(regex)];

  let sum = 0;
  let isEnabled = true;
  matches.forEach((match) => {
    if (match[0] === "do()") {
      console.log("enable");
      isEnabled = true;
      return;
    }
    if (match[0] === "don't()") {
      isEnabled = false;
      console.log("disable");
      return;
    }

    if (isEnabled) {
      sum += parseInt(match[2])*parseInt(match[3]);
      console.log(match[2] + "*" + match[3]);
    }
  });

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: "161",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: "48",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
