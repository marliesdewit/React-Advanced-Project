import React, { useRef } from "react";
import Navigation from "./Navigation";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <Flex
      mx="auto"
      boxSizing="border-box"
      flexDir={{ base: "column", md: "row" }}
      overflow="hidden"
      maxH={{ base: "100%", md: "100vh" }}
      h={{ base: "100%", md: "100%" }}
      minH={{ base: "100vh", md: "100vh" }}
      p={2}
      gap={2}
    >
      <Box
        position="sticky"
        top={0}
        left={0}
        zIndex={10}
        flex={1}
        borderRadius={12}
      >
        <Navigation />
      </Box>
      <Box position="relative" flex={2}>
        <Outlet />
      </Box>
    </Flex>
  );
};
