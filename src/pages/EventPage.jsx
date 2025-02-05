import React from "react";

import {
  Container,
  Box,
  Image,
  Heading,
  Text,
  Badge,
  Button,
  Stack,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Spinner,
  Center,
  Avatar,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EditEventModal from "../components/EditEventModal";

function EventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { events, categories, users, deleteEvent, loading } = useEvents();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const cancelRef = useRef();

  const event = events.find((e) => e.id === parseInt(id));
  const creator = users.find((user) => user.id === event?.createdBy);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!event) {
    return (
      <Container>
        <Heading size="lg">Event not found</Heading>
      </Container>
    );
  }

  const handleDelete = async () => {
    try {
      await deleteEvent(event.id);
      toast({
        title: "Event deleted",
        status: "success",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error deleting event",
        status: "error",
      });
    } finally {
      onDeleteClose();
    }
  };

  return (
    <Flex w="100%" maxH="100vh">
      <Box
        bg="brand.blue"
        borderRadius={12}
        overflow="hidden"
        boxShadow="lg"
        color="brand.pink"
        w="100%"
        height={{
          base: "calc(100vh - 2 * 4rem)",
          md: "calc(100vh - 2 * 0.5rem)",
        }}
      >
        <Box
          position="relative"
          width="100%"
          height="100%"
          maxH={{ base: "30vh", sm: "42vh", xl: "50vh", "2xl": "60vh" }}
        >
          <Image
            src={event.image}
            alt={event.title}
            objectFit="cover"
            w="100%"
            h="100%"
            // h="300px"
            maxH={{ base: "30vh", sm: "42vh", xl: "50vh", "2xl": "60vh" }}
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
          />
        </Box>

        <Flex
          px={{ base: 5, sm: 7, md: 8 }}
          py={{ base: 2, sm: 6, md: 8 }}
          flexDirection="column"
          alignItems="stretch"
          justifyContent="center"
          flexWrap="nowrap"
          // h="100%"
          h="max-content"
          w="100%"
          maxW="100%"
          mx="auto"
        >
          <Heading size="2xl" fontWeight={500}>
            {event.title}
          </Heading>
          <Text fontSize="xl" my={2} fontWeight={300}>
            {event.description}
          </Text>

          <Stack direction="row" spacing={2} my={{ base: 2, sm: 4, md: 8 }}>
            {event.categoryIds.map((id) => {
              const category = categories.find((cat) => cat.id === id);
              return (
                <Badge
                  key={id}
                  fontSize="1em"
                  borderRadius={12}
                  px={3}
                  bg="brand.pink"
                  color="brand.blue"
                  fontWeight={400}
                >
                  {category?.name}
                </Badge>
              );
            })}
          </Stack>

          <Text color="brand.pink" fontWeight={250} fontSize="lg" my={1}>
            Location: {event.location}
          </Text>
          <Text color="brand.pink" fontWeight={250} fontSize="lg" my={1}>
            Date: {new Date(event.startTime).toLocaleDateString()} -{" "}
            {new Date(event.endTime).toLocaleDateString()}
          </Text>

          <Flex mt={4} justify="space-between">
            <Flex align="center">
              <Avatar src={creator?.image} />
              <Text
                color="brand.pink"
                fontWeight={250}
                fontSize="md"
                my={2}
                ml={2}
              >
                {creator?.name}
              </Text>
            </Flex>

            <Flex direction={{ base: "column", md: "row" }} gap={3}>
              <Button
                bg="brand.blue"
                color="brand.pink"
                fontWeight={400}
                borderRadius="full"
                textTransform="uppercase"
                fontSize="md"
                w="120px"
                size="md"
                borderWidth="2px"
                borderColor="brand.pink"
                onClick={onDeleteOpen}
                transition="all 0.2s ease-in-out"
                _hover={{
                  bg: "brand.pink",
                  color: "brand.blue",
                  borderColor: "brand.pink",
                  borderWidth: "2px",
                  textDecoration: "none",
                }}
              >
                Delete
              </Button>
              <Button
                bg="brand.pink"
                color="brand.blue"
                borderRadius="full"
                fontWeight={500}
                textTransform="uppercase"
                w="120px"
                fontSize="md"
                size="md"
                onClick={onEditOpen}
                transition="all 0.2s ease-in-out"
                _hover={{
                  color: "brand.pink",
                  bg: "brand.blue",
                  borderWidth: "2px",
                  borderColor: "brand.pink",
                  textDecoration: "none",
                }}
              >
                Edit
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>

      <EditEventModal isOpen={isEditOpen} onClose={onEditClose} event={event} />

      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="gray.100" color="brand.blue" textAlign="left">
            <AlertDialogHeader fontWeight={450} pb={0}>
              Delete Event
            </AlertDialogHeader>
            <AlertDialogBody fontWeight={350}>
              Are you sure you want to delete this event?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onDeleteClose}
                borderRadius="full"
                bg="brand.blue"
                color="white"
                fontWeight={500}
                textTransform="uppercase"
                fontSize="sm"
                w="100px"
                size="sm"
                transition="all 0.2s ease-in-out"
                _hover={{
                  color: "white",
                  bg: "rgba(0, 39, 186, 0.9)",
                  borderWidth: "2px",
                  borderColor: "brand.blue",
                  textDecoration: "none",
                }}
              >
                Cancel
              </Button>
              <Button
                // bg="brand.blue"
                color="brand.blue"
                onClick={handleDelete}
                ml={2}
                borderRadius="full"
                fontWeight={500}
                textTransform="uppercase"
                fontSize="sm"
                w="100px"
                borderWidth="2px"
                borderColor="brand.pink"
                size="sm"
                transition="all 0.2s ease-in-out"
                _hover={{
                  color: "white",
                  bg: "brand.pink",

                  textDecoration: "none",
                }}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
}

export default EventPage;
