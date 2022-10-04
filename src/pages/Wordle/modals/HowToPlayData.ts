const example7 = {
  main: "Guess the WORDLE in 7 tries.",
  sub: "Each guess must be a valid 7-letter word. Hit the enter button to submit.",
  text: "After each guess, the color of the tiles will change to show how close your guess was to the word.",
  example1: "The letter L is in the word and in the correct spot.",
  example2: "The letter O is in the word but in the wrong spot.",
  example3: "The letter S is not in the word in any spot.",
  1: [
    {
      isCompleted: true,
      keyPresence: "correct",
      letter: "L",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "A",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "D",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "D",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "E",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "R",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "S",
    },
  ],
  2: [
    {
      isCompleted: true,
      keyPresence: "",
      letter: "A",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "B",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "A",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "N",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "D",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "O",
    },
    {
      isCompleted: true,
      keyPresence: "present",
      letter: "N",
    },
  ],
  3: [
    {
      isCompleted: true,
      keyPresence: "",
      letter: "I",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "C",
    },
    {
      isCompleted: true,
      keyPresence: "absent",
      letter: "E",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "B",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "E",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "R",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "G",
    },
  ],
};

const example6 = {
  main: "Guess the WORDLE in 6 tries.",
  sub: "Each guess must be a valid 6-letter word. Hit the enter button to submit.",
  text: "After each guess, the color of the tiles will change to show how close your guess was to the word.",
  example1: "The letter F is in the word and in the correct spot.",
  example2: "The letter I is in the word but in the wrong spot.",
  example3: "The letter O is not in the word in any spot.",
  1: [
    {
      isCompleted: true,
      keyPresence: "correct",
      letter: "F",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "A",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "B",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "R",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "I",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "C",
    },
  ],
  2: [
    {
      isCompleted: true,
      keyPresence: "",
      letter: "R",
    },
    {
      isCompleted: true,
      keyPresence: "present",
      letter: "I",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "G",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "G",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "E",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "D",
    },
  ],
  3: [
    {
      isCompleted: true,
      keyPresence: "",
      letter: "P",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "R",
    },
    {
      isCompleted: true,
      keyPresence: "absent",
      letter: "O",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "P",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "E",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "R",
    },
  ],
};

const example5 = {
  main: "Guess the WORDLE in 5 tries.",
  sub: "Each guess must be a valid 5-letter word. Hit the enter button to submit.",
  text: "After each guess, the color of the tiles will change to show how close your guess was to the word.",
  example1: "The letter W is in the word and in the correct spot.",
  example2: "The letter I is in the word but in the wrong spot.",
  example3: "The letter U is not in the word in any spot.",
  1: [
    {
      isCompleted: true,
      keyPresence: "",
      letter: "P",
    },
    {
      isCompleted: true,
      keyPresence: "present",
      letter: "I",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "L",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "L",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "S",
    },
  ],
  2: [
    {
      isCompleted: true,
      keyPresence: "correct",
      letter: "W",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "E",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "A",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "R",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "Y",
    },
  ],
  3: [
    {
      isCompleted: true,
      keyPresence: "",
      letter: "V",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "A",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "G",
    },
    {
      isCompleted: true,
      keyPresence: "absent",
      letter: "U",
    },
    {
      isCompleted: true,
      keyPresence: "",
      letter: "E",
    },
  ],
};

export const getExample = (game: string) => {
  if (game === "wordle-5") return example5;
  if (game === "wordle-6") return example6;
  if (game === "wordle-7") return example7;
  return example5;
};
