import {
  Box,
  Image,
  Heading,
  Text,
  Badge,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useEvents } from "../context/EventsContext";
import { useGSAP } from "@gsap/react";
import React from "react";
import "../index.css";

gsap.registerPlugin(useGSAP);

function EventCard({ event }) {
  const { categories } = useEvents();
  const cardRef = useRef(null);

  useGSAP(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      { opacity: 0, scale: 0.9, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      }
    );
  });

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("nl-NL", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getEventCategories = () =>
    event.categoryIds
      .map((id) => categories.find((cat) => cat.id === id)?.name)
      .filter(Boolean);

  return (
    <Link to={`/event/${event.id}`} className="eventCard">
      <Flex
        ref={cardRef}
        flexDirection="column"
        borderRadius="16px"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
        overflow="hidden"
        bg="white"
        width="100%"
        h="auto"
        maxW="350px"
      >
        <Box position="relative" height="210px" p={2}>
          <Image
            src={event.image}
            alt={event.title}
            width="100%"
            height="100%"
            objectFit="cover"
            borderRadius={12}
            boxShadow="base"
          />
          <Stack
            direction="row"
            position="absolute"
            top={4}
            left={4}
            spacing={2}
          >
            {getEventCategories().map((category, index) => (
              <Badge
                key={index}
                fontSize="0.8em"
                borderRadius="12px"
                px={2}
                py={1}
                color="black"
                fontWeight="600"
                colorScheme="teal"
                boxShadow="inner"
              >
                {category}
              </Badge>
            ))}
          </Stack>
        </Box>

        <Box px={5} py={2} mb={2}>
          <Heading size="md" mb={2} color="gray.800">
            {event.title}
          </Heading>
          <Text fontSize="sm" mb={3} color="gray.600">
            {event.description}
          </Text>
          <Flex direction="column" fontSize="sm" color="gray.500">
            <Text>Start: {formatDate(event.startTime)}</Text>
            <Text>Einde: {formatDate(event.endTime)}</Text>
          </Flex>
        </Box>
      </Flex>
    </Link>
  );
}

export default EventCard;
