import { Box, Flex, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Key from "./Key";

const keyboard = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const alphaBets = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const KeyBoard = (props: any) => {
  const [gotHit, setGotHit] = useState([
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
  ]);

  const toast = useToast();

  useEffect(() => {
    const listener = (e: any) => {
      if (e.code === "Enter") {
        props.onEnter();
      } else if (e.code === "Backspace") {
        props.onDelete();
      } else {
        const key = e.key;
        if (key.length === 1) {
          let isAlphaBet = false;
          for (let k = 0; k < alphaBets.length; k++) {
            if (alphaBets[k] === key) {
              isAlphaBet = true;
            }
          }

          if (!isAlphaBet) {
            return toast({
              title: "Enter only alphabets",
              status: "warning",
              duration: 4000,
              isClosable: true,
              position: "top",
            });
          }

          for (let i = 0; i < keyboard.length; i++)
            for (let j = 0; j < keyboard[i].length; j++) {
              if (key.toUpperCase() === keyboard[i][j]) {
                let _gotHit = gotHit;
                _gotHit[i][j] = true;
                setGotHit(_gotHit);
                setTimeout(() => {
                  setGotHit([
                    [
                      false,
                      false,
                      false,
                      false,
                      false,
                      false,
                      false,
                      false,
                      false,
                      false,
                    ],
                    [
                      false,
                      false,
                      false,
                      false,
                      false,
                      false,
                      false,
                      false,
                      false,
                    ],
                    [false, false, false, false, false, false, false],
                  ]);
                }, 250);
              }
            }
          props.onKeyPress(key.toUpperCase());
        }
      }
    };
    window.addEventListener("keyup", listener);
    return () => window.removeEventListener("keyup", listener);
  }, [props, gotHit, toast]);

  return (
    <Box fontFamily={"quicksand"} fontSize="3xl" fontWeight={"bold"}>
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems="center"
        rowGap={{ base: "1rem" }}
        maxWidth="100vw"
      >
        {keyboard.map((row: any, indexX: number) => (
          <Box
            key={indexX}
            columnGap={{ base: ".8rem" }}
            display={"flex"}
            flexDirection="row"
          >
            {row.map((letter: any, indexY: number) => {
              const hit = gotHit[indexX][indexY];
              return (
                <Key
                  gotHit={hit}
                  key={indexY}
                  letter={letter}
                  onKeyPress={props.onKeyPress}
                />
              );
            })}
          </Box>
        ))}
        <Flex columnGap={"4rem"}>
          <Key letter="Ent" onKeyPress={props.onEnter} />
          <Key letter="Del" onKeyPress={props.onDelete} />
        </Flex>
      </Box>
    </Box>
  );
};

export default KeyBoard;
