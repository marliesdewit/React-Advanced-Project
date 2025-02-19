import React, { useRef, useState } from "react";
import gsap from "gsap";
import {
  useDisclosure,
  Button,
  SimpleGrid,
  Input,
  Select,
  Center,
  Flex,
  VStack,
  Heading,
  Text,
  InputGroup,
  InputLeftElement,
  StatGroup,
  Box,
  Divider,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useEvents } from "../context/EventsContext";
import EventCard from "../components/EventCard";
import AddEventModal from "../components/AddEventModal";
import { useGSAP } from "@gsap/react";
import "../index.css";

gsap.registerPlugin(useGSAP);

function EventsPage() {
  const { events, categories, loading, error } = useEvents();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const filterRef = useRef(null);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory ||
      event.categoryIds.includes(parseInt(selectedCategory));
    return matchesSearch && matchesCategory;
  });

  if (error) {
    return (
      <Center h="100vh">
        <VStack spacing={4}>
          <Heading size="lg">Error</Heading>
          <Text>{error}</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Flex
      direction="column"
      w="100%"
      h="100%"
      align="center"
      justify="center"
      gap={4}
      ref={filterRef}
      zIndex={10}
      position="relative"
    >
      <Box
        p={4}
        borderRadius="lg"
        w="100%"
        flexShrink={1}
        position="relative"
        h="fit-content"
        zIndex={10000}
      >
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          <InputGroup>
            <InputLeftElement>{<Search2Icon />}</InputLeftElement>
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="filled"
              color="black"
              bg="teal.100"
              focusBorderColor="transparent"
              transition="all 0.3s ease-in-out"
              borderRadius="md"
              _hover={{ bg: "teal.200" }}
              _focus={{ bg: "teal.300" }}
            />
          </InputGroup>

          <Select
            placeholder="Filter by category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            variant="filled"
            borderRadius="md"
            color="black"
            focusBorderColor="transparent"
            bg="teal.100"
            _hover={{ bg: "teal.200" }}
            _focus={{ bg: "teal.300" }}
            transition="all 0.3s ease-in-out"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>

          <Button
            colorScheme="teal"
            color="white"
            onClick={onOpen}
            borderRadius="md"
            fontWeight={400}
            transition="all 0.3s ease-in-out"
          >
            + Add Event
          </Button>
        </SimpleGrid>
        <Divider mt={6} />
      </Box>

      <Flex overflowY="auto" flexDirection="column" w="100%" flexGrow={1} p={2}>
        <SimpleGrid
          spacing={4}
          borderRadius={12}
          h={{ base: "100%", md: "100%" }}
          minH={{ base: "100vh", md: "fit-content" }}
          w="100%"
          gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        >
          {filteredEvents.length ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <Text>No events found.</Text>
          )}
        </SimpleGrid>
      </Flex>

      <AddEventModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}

export default EventsPage;
