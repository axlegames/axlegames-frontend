import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { theme } from "../../../../config/theme.config";

const GameBanner = (props: any) => {
  return (
    <Box pb={16}>
      <Box display={"flex"} justifyContent="flex-end">
        <Text fontSize={"xl"} fontWeight="bold">
          Welcome,{localStorage.getItem("username")}{" "}
        </Text>
      </Box>
      <Flex flexDirection={"column"} p={{ base: "2" }}>
        <Text fontSize={"3xl"} fontWeight="bold">
          Welcome to Axle
        </Text>
        <Text color={theme.highLightColor} fontWeight={"bold"}>
          Web3 Games, NFT, Community & Earnings
        </Text>
      </Flex>
      <Box
        display={"flex"}
        columnGap="1rem"
        alignItems="center"
        flexDirection={{ base: "column", lg: "row" }}
        rowGap={{ base: "3rem", lg: "0" }}
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
        <Image
          borderRadius={"2xl"}
          height={172}
          src={"https://axlegames.s3.ap-south-1.amazonaws.com/banner_2.png"}
        />
      </Box>
    </Box>
  );
};

export default GameBanner;
