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
    <Flex direction="column" w="100%" minH="100vh" mx="auto" ref={filterRef}>
      <VStack spacing={2} align="stretch" w="100%">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={2}>
          <InputGroup
            borderRadius={12}
            color="brand.pink"
            transition="all 0.25s ease-in-out"
            _hover={{
              transform: "scale(0.99)",
              color: "brand.blue",
              bg: "brand.pink",
              _placeholder: { color: "brand.blue" },
            }}
          >
            <Input
              boxShadow="xl"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              transition="all 0.25s ease-in-out"
              variant="filled"
              color="brand.pink"
              bg="brand.blue"
              fontWeight={400}
              _placeholder={{ color: "inherit" }}
              textTransform="uppercase"
              _hover={{
                // transform: "scale(1.02)",
                color: "brand.blue",
                bg: "brand.pink",
                _placeholder: { color: "inherit" },
              }}
              focusBorderColor="transparent"
              borderRadius={12}
              _active={{ bg: "brand.pink", color: "brand.blue" }}
              _focus={{ bg: "brand.pink", color: "brand.blue" }}
            />
            <InputLeftElement>{<Search2Icon />}</InputLeftElement>
          </InputGroup>

          <StatGroup
            transition="all 0.25s ease-in-out"
            borderRadius={12}
            _hover={{
              transform: "scale(0.99)",
              color: "brand.blue",
              bg: "brand.pink",
              _placeholder: { color: "brand.blue" },
            }}
          >
            <Select
              placeholder="Filter by category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              variant="filled"
              borderRadius={12}
              color="brand.pink"
              fontWeight={400}
              bg="brand.blue"
              textTransform="uppercase"
              boxShadow="xl"
              transition="all 0.25s ease-in-out"
              _hover={{
                // transform: "scale(1.02)",
                color: "brand.blue",
                bg: "brand.pink",
              }}
              focusBorderColor="transparent"
              _active={{ bg: "brand.pink", color: "brand.blue" }}
              _focus={{ bg: "brand.pink", color: "brand.blue" }}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </StatGroup>

          <Button
            bg="brand.blue"
            color="brand.pink"
            onClick={onOpen}
            textTransform="uppercase"
            fontSize="1rem"
            boxShadow="xl"
            p={2}
            display="flex"
            fontWeight={400}
            justifyContent="flex-start"
            borderRadius={12}
            overflow="hidden"
            transition="all 0.25s ease-in-out"
            _active={{ bg: "brand.pink", color: "brand.blue" }}
            _hover={{
              bg: "brand.pink",
              color: "brand.blue",
              transform: "scale(0.99)",
            }}
            _focus={{ bg: "brand.pink", color: "brand.blue" }}
          >
            + Add Event
          </Button>
        </SimpleGrid>

        <SimpleGrid
          columns={{ base: 1, sm: 2, xl: 3 }}
          spacing={2}
          height="calc(100vh - 2 * 2rem)"
          overflow="auto"
          borderRadius={12}
        >
          {filteredEvents.length ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <Text>No events found.</Text>
          )}
        </SimpleGrid>
      </VStack>

      <AddEventModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}

export default EventsPage;
