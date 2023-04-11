import { Box, Grid, Text } from "@chakra-ui/react";

import { theme } from "../config/theme.config";

interface Props {
  title: string;
  text: string;
  img: string;
  slide: string;
}

export const nfts = [
  {
    title: "Zeus",
    text: "Thunder NFT",
    img: `https://axlegames.s3.ap-south-1.amazonaws.com/zeus.mp4`,
  },
  {
    title: "Poseidon",
    text: "Trident NFT",
    img: `https://axlegames.s3.ap-south-1.amazonaws.com/poseidon.mp4`,
  },
  {
    title: "Hades",
    text: "Fire NFT",
    img: `https://axlegames.s3.ap-south-1.amazonaws.com/hades.mp4`,
  },
];

const NFT = (props: Props) => {
  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      data-aos={props.slide}
    >
      <Box
        minW={{ base: "270px" }}
        maxW={{ base: "270px" }}
        justifyContent={"center"}
        alignItems="center"
        display="flex"
        flexDirection="column"
        zIndex={300}
      >
        <video
          muted
          loop
          src={props.img}
          width="320"
          autoPlay
          height="240"
        ></video>
        <Box
          py={3}
          borderBottomRadius="xl"
          backgroundImage={`radial-gradient(circle, #4609c3, #330fa0, #220f7e, #160d5d, #0e063d)`}
          width={"100%"}
          mx="auto"
          my={2}
          boxShadow={`2xl`}
        >
          <Text
            color={theme.primaryTextColor}
            fontSize={{ base: "lg", lg: "xl" }}
            textAlign={"center"}
            fontWeight="bold"
          >
            {props.title}
          </Text>
          <Text
            color={theme.secondaryTextColor}
            fontWeight={"bold"}
            fontSize={{ base: "sm", md: "md", lg: "lg" }}
            textAlign={"center"}
          >
            {props.text}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

const NFTs = () => {
  return (
    <Box
      minH="100vh"
      px={{ base: "4", lg: "16" }}
      py={{ base: "8", lg: "16" }}
      bg={theme.bgColor}
      backgroundImage="https://axlegames.s3.ap-south-1.amazonaws.com/theme_assets/images/players-week-bg.png"
    >
      <Grid
        columnGap={{ base: "1rem", xl: "1rem" }}
        justifyContent={"space-evenly"}
        alignItems="center"
        gridTemplateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
        py={12}
        rowGap={{ base: "4rem" }}
        width={{ base: "65%" }}
        mx="auto"
      >
        {nfts.map((nft, index) => (
          <NFT
            slide={index % 2 === 0 ? `fade-down` : `fade-up`}
            {...nft}
            key={index}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default NFTs;
