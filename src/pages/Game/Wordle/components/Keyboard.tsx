import { Box, Flex } from "@chakra-ui/react";
import { theme } from "../../../../config/theme.config";
// import { TiBackspaceOutline } from "react-icons/ti/index";
// import { AiOutlineEnter } from "react-icons/ai/index";
import { useEffect, useState } from "react";
import Key from "./Key";

const keyboard = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const KeyBoard = (props: any) => {
  const [gotHit, setGotHit] = useState([
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
  ]);

  useEffect(() => {
    const listener = (e: any) => {
      if (e.code === "Enter") {
        props.onEnter();
      } else if (e.code === "Backspace") {
        props.onDelete();
      } else {
        const key = e.key;
        if (key.length === 1) {
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
          props.onKeyPress(key);
        }
      }
    };
    window.addEventListener("keyup", listener);
    return () => window.removeEventListener("keyup", listener);
  }, [props, gotHit]);

  return (
    <Box fontFamily={"quicksand"} fontSize="3xl" fontWeight={"bold"}>
      <Box
        bg={theme.bgColor}
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
              console.log(hit);
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
