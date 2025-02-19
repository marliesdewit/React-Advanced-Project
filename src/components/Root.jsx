import React, { useRef } from "react";
import Navigation from "./Navigation";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <Flex
      flexDir={{ base: "column", md: "row" }}
      p={4}
      gap={4}
      h={{ base: "100%", md: "100vh" }}
      w="100vw"
      overflow="hidden"
    >
      <Navigation />

      <Box position="relative" w="100%">
        <Outlet />
      </Box>
    </Flex>
  );
};
