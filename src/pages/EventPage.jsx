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
        bg="teal.300"
        borderRadius={12}
        overflow="hidden"
        boxShadow="inner"
        color="gray.900"
        w="100%"
        height={{
          base: "calc(100vh - 2 * 4rem)",
          md: "calc(100vh - 2 * 1rem)",
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
            bgGradient="linear(to-br, rgb(255, 179, 193, 0.1),rgb(255, 179, 193, 0.5))"
            mixBlendMode="screen"
          />
        </Box>

        <Flex
          px={{ base: 5, sm: 7, md: 8 }}
          py={{ base: 2, sm: 6, md: 8, xl: 10 }}
          flexDirection="column"
          alignItems="stretch"
          justifyContent="center"
          flexWrap="nowrap"
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

          <Stack direction="row" spacing={2} my={{ base: 2, sm: 4, md: 6 }}>
            {event.categoryIds.map((id) => {
              const category = categories.find((cat) => cat.id === id);
              return (
                <Badge
                  key={id}
                  fontSize="1em"
                  borderRadius={12}
                  px={3}
                  bg="teal.400"
                  boxShadow="base"
                  color="gray.900"
                  fontWeight={400}
                >
                  {category?.name}
                </Badge>
              );
            })}
          </Stack>

          <Text color="gray.900" fontWeight={250} fontSize="lg" my={1}>
            Location: {event.location}
          </Text>
          <Text color="gray.900" fontWeight={250} fontSize="lg" my={1}>
            Date: {new Date(event.startTime).toLocaleDateString()} -{" "}
            {new Date(event.endTime).toLocaleDateString()}
          </Text>

          <Flex mt={4} justify="space-between">
            <Flex align="center">
              <Avatar src={creator?.image} />
              <Text
                color="gray.900"
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
                fontWeight={500}
                borderRadius="full"
                textTransform="uppercase"
                w="120px"
                onClick={onDeleteOpen}
                variant="ghost"
                _hover={{
                  transform: "scale(1.03)",
                  bg: "teal.800",
                  boxShadow: "lg",
                }}
                bg="teal.900"
                color="teal.50"
                transition="all 0.2s ease-in-out"
                size="lg"
                boxShadow="md"
              >
                Delete
              </Button>
              <Button
                boxShadow="md"
                borderRadius="full"
                fontWeight={500}
                textTransform="uppercase"
                w="120px"
                onClick={onEditOpen}
                variant="ghost"
                _hover={{
                  transform: "scale(1.03)",
                  bg: "teal.100",
                  boxShadow: "lg",
                }}
                size="lg"
                bg="teal.50"
                transition="all 0.2s ease-in-out"
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
          <AlertDialogContent bg="white" color="gray.900" textAlign="left">
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
                variant="ghost"
                _hover={{
                  transform: "scale(1.03)",
                  bg: "teal.100",
                }}
                size="md"
                bg="teal.50"
                boxShadow="base"
                transition="all 0.2s ease-in-out"
                borderRadius="full"
                fontWeight={450}
                textTransform="uppercase"
                mr={3}
              >
                Cancel
              </Button>

              <Button
                variant="ghost"
                onClick={handleDelete}
                _hover={{
                  transform: "scale(1.03)",
                  bg: "teal.800",
                }}
                size="md"
                bg="teal.900"
                color="teal.50"
                boxShadow="base"
                transition="all 0.2s ease-in-out"
                type="submit"
                borderRadius="full"
                fontWeight={450}
                textTransform="uppercase"
              >
                Delete Event{" "}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
}

export default EventPage;
