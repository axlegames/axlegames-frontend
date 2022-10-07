import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { theme } from "../../../../config/theme.config";

const GameBanner = (props: any) => {
  return (
    <Box pb={16}>
      <Flex flexDirection={"column"} py={{ base: "8" }} px={{ base: "4" }}>
        <Text fontSize={"3xl"} fontWeight="bold">
          Welcome to Axle
        </Text>
        <Text color={theme.highLightColor} fontWeight={"bold"}>
          A skill based web3 gaming platform
        </Text>
      </Flex>
      <Box
        display={"flex"}
        columnGap="1rem"
        alignItems="center"
        flexDirection={{ base: "column", lg: "row" }}
        rowGap={{ base: "1rem", lg: "0" }}
        justifyContent={"start"}
      >
        <Image
          borderRadius={"2xl"}
          height={172}
          src={"https://axlegames.s3.ap-south-1.amazonaws.com/banner_1.png"}
        />
        <Image
          borderRadius={"2xl"}
          height={172}
          src={"https://axlegames.s3.ap-south-1.amazonaws.com/banner_3.png"}
        />
        {/* <Image
          borderRadius={"2xl"}
          height={172}
          src={"https://axlegames.s3.ap-south-1.amazonaws.com/banner_2.png"}
        /> */}
      </Box>
    </Box>
  );
};

export default GameBanner;
