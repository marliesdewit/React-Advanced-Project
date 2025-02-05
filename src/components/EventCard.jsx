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
      { opacity: 0, scale: 0.8, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
        ease: "back.out(1.6)",
      }
    );

    const hoverIn = () => {
      gsap.to(card, {
        scale: 0.99,
        duration: 0.2,
        ease: "power1.out",
        transformOrigin: "center center",
      });
    };

    const hoverOut = () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.15,
        ease: "power1.in",
        transformOrigin: "center center",
      });
    };

    card.addEventListener("mouseenter", hoverIn);
    card.addEventListener("mouseleave", hoverOut);

    return () => {
      card.removeEventListener("mouseenter", hoverIn);
      card.removeEventListener("mouseleave", hoverOut);
    };
  }, []);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
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
    <Link to={`/event/${event.id}`} style={{ width: "100%", height: "100%" }}>
      <Flex
        ref={cardRef}
        className="card"
        borderRadius="12px"
        // boxShadow="base"
        boxShadow="0px 4px 6px -2px rgba(0, 0, 0, 0.1)" // Alleen onderkant schaduw
        // _hover={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" }}
        overflow="hidden"
        bg="brand.blue"
        flexDirection="column"
        width="100%"
        opacity="0"
        transform="scale(0.8) translateY(30px)"
        position="relative"
        height="100%"
        maxH={{ base: "70vh", md: "55vh" }}
      >
        <Box
          position="relative"
          width="100%"
          height="100%"
          maxH={{ base: "250px", md: "200px" }}
        >
          <Image
            src={event.image}
            alt={event.title}
            width="100%"
            height="100%"
            objectFit="cover"
            maxH={{ base: "250px", md: "200px" }}
          />
          <Box
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            backdropFilter="grayscale(100%)"
            bgColor="rgba(0, 39, 186, 0.8)"
            bgGradient="linear(to-br, rgb(255, 179, 193, 0.1),rgb(255, 179, 193, 0.5))"
            mixBlendMode="screen"
            maxH={{ base: "250px", md: "200px" }}
          />
          <Stack
            direction="row"
            position="absolute"
            top={3}
            left={3}
            spacing={2}
          >
            {getEventCategories().map((category, index) => (
              <Badge
                key={index}
                fontSize="0.8em"
                borderRadius={12}
                px={3}
                bg="brand.pink"
                color="brand.blue"
                boxShadow="base"
                fontWeight={400}
              >
                {category}
              </Badge>
            ))}
          </Stack>
        </Box>
        <Box p={6} flex="1">
          <Heading
            size="md"
            mb={1}
            noOfLines={2}
            color="brand.pink"
            fontWeight={550}
            textTransform="uppercase"
          >
            {event.title}
          </Heading>
          <Text noOfLines={2} mb={4} color="brand.pink" fontWeight={250}>
            {event.description}
          </Text>
          <Flex
            direction="column"
            gap={1}
            fontSize="sm"
            color="brand.pink"
            fontWeight={200}
          >
            <Text>Start: {formatDate(event.startTime)}</Text>
            <Text>Einde: {formatDate(event.endTime)}</Text>
          </Flex>
        </Box>
      </Flex>
    </Link>
  );
}

export default EventCard;
