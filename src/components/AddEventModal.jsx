import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
  Button,
  Stack,
  useToast,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";

import { useRef, useState } from "react";
import { useEvents } from "../context/EventsContext";
import { useNavigate } from "react-router-dom";

function AddEventModal({ isOpen, onClose }) {
  const { categories, addEvent } = useEvents();
  const toast = useToast();
  const cancelRef = useRef();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    startTime: "",
    endTime: "",
    location: "",
    categoryIds: [],
    createdBy: 1,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (!formData.image) newErrors.image = "Image URL is required.";
    if (!formData.startTime) newErrors.startTime = "Start time is required.";
    if (!formData.endTime) newErrors.endTime = "End time is required.";
    if (new Date(formData.startTime) >= new Date(formData.endTime)) {
      newErrors.endTime = "End time must be after start time.";
    }
    if (formData.categoryIds.length === 0) {
      newErrors.categoryIds = "At least one category must be selected.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast({
        title: "Validation Error",
        description: "Fix errors and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const newEvent = await addEvent({
        ...formData,
        categoryIds: formData.categoryIds.map(Number),
      });

      toast({
        title: "Event created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      onClose();
      setFormData({
        title: "",
        description: "",
        image: "",
        startTime: "",
        endTime: "",
        location: "",
        categoryIds: [],
        createdBy: 1,
      });
      setErrors({});
      navigate(`/event/${newEvent.id}`);
    } catch (error) {
      toast({
        title: "Error creating event.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
      fontFamily="Inter Tight"
      _hover={{ borderColor: "transparent" }}
      _focus={{ borderColor: "transparent" }}
      _active={{ borderColor: "transparent" }}
    >
      <AlertDialogOverlay />
      <AlertDialogContent
        bg="white"
        color="gray.900"
        borderRadius={12}
        boxShadow="lg"
        p={5}
        mt={2}
        maxW={{ base: "95%", md: "600px" }}
        fontFamily="Inter Tight"
      >
        <form onSubmit={handleSubmit}>
          <AlertDialogHeader
            fontSize="2xl"
            fontWeight="medium"
            textTransform="uppercase"
          >
            Create New Event
          </AlertDialogHeader>
          <AlertDialogCloseButton
            _hover={{
              transform: "scale(1.1)",
              bg: "teal.100",
            }}
            m={6}
            size="lg"
            bg="teal.50"
            boxShadow="base"
            transition="all 0.2s ease-in-out"
          />
          <AlertDialogBody>
            <Stack spacing={4}>
              <FormControl isInvalid={errors.title}>
                <FormLabel>Title</FormLabel>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Event Title"
                />
                <FormErrorMessage>{errors.title}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.description}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Event Description"
                />
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.image}>
                <FormLabel>Image URL</FormLabel>
                <Input
                  name="image"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="Event Image URL"
                />
                <FormErrorMessage>{errors.image}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.location}>
                <FormLabel>Location</FormLabel>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Event Location"
                />
                <FormErrorMessage>{errors.location}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.startTime}>
                <FormLabel>Start Time</FormLabel>
                <Input
                  type="datetime-local"
                  name="startTime"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                />
                <FormErrorMessage>{errors.startTime}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.endTime}>
                <FormLabel>End Time</FormLabel>
                <Input
                  type="datetime-local"
                  name="endTime"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                />
                <FormErrorMessage>{errors.endTime}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.categoryIds}>
                <FormLabel>Categories</FormLabel>
                <CheckboxGroup
                  colorScheme="teal"
                  value={formData.categoryIds.map(String)}
                  onChange={(selected) =>
                    setFormData((prev) => ({
                      ...prev,
                      categoryIds: selected.map(Number),
                    }))
                  }
                >
                  {categories.map((category) => (
                    <Checkbox
                      key={category.id}
                      p={1}
                      value={String(category.id)}
                    >
                      {category.name}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
                <FormErrorMessage>{errors.categoryIds}</FormErrorMessage>
              </FormControl>
            </Stack>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              variant="ghost"
              onClick={onClose}
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
              colorScheme="teal"
              type="submit"
              variant="ghost"
              _hover={{
                transform: "scale(1.03)",
                bg: "teal.800",
              }}
              size="md"
              bg="teal.900"
              color="teal.50"
              mr={2}
              boxShadow="base"
              transition="all 0.2s ease-in-out"
              borderRadius="full"
              fontWeight={450}
              textTransform="uppercase"
            >
              Create Event
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AddEventModal;
