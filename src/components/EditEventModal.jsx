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
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useEvents } from "../context/EventsContext";
import { useNavigate } from "react-router-dom";

function EditEventModal({ isOpen, onClose, event }) {
  const { categories, updateEvent } = useEvents();
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

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        description: event.description || "",
        image: event.image || "",
        startTime: event.startTime || "",
        endTime: event.endTime || "",
        location: event.location || "",
        categoryIds: event.categoryIds ? event.categoryIds.map(String) : [],
        createdBy: event.createdBy || 1,
      });
    }
  }, [event]);

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
      await updateEvent(event.id, {
        ...formData,
        categoryIds: formData.categoryIds.map(Number),
      });

      toast({
        title: "Event updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      onClose();
      navigate(`/event/${event.id}`);
    } catch (error) {
      toast({
        title: "Error updating event.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryIds") {
      const selectedOptions = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setFormData((prev) => ({ ...prev, [name]: selectedOptions }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
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
            Edit Event
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
              <FormControl isRequired>
                <FormLabel fontWeight="medium">Title</FormLabel>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Event Title"
                  borderColor="teal.200"
                  focusBorderColor="teal.800"
                  colorScheme="teal"
                  _hover={{ borderColor: "teal.800" }}
                  _focus={{ borderColor: "teal.800" }}
                  _active={{ borderColor: "transparent" }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight="medium">Description</FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Event Description"
                  borderColor="teal.200"
                  focusBorderColor="teal.800"
                  colorScheme="teal"
                  _hover={{ borderColor: "teal.800" }}
                  _focus={{ borderColor: "teal.800" }}
                  _active={{ borderColor: "transparent" }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight="medium">Image URL</FormLabel>
                <Input
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Event Image URL"
                  borderColor="teal.200"
                  focusBorderColor="teal.800"
                  colorScheme="teal"
                  _hover={{ borderColor: "teal.800" }}
                  _focus={{ borderColor: "teal.800" }}
                  _active={{ borderColor: "transparent" }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight="medium">Location</FormLabel>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Event Location"
                  borderColor="teal.200"
                  focusBorderColor="teal.800"
                  colorScheme="teal"
                  _hover={{ borderColor: "teal.800" }}
                  _focus={{ borderColor: "teal.800" }}
                  _active={{ borderColor: "transparent" }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight="medium">Start Time</FormLabel>
                <Input
                  type="datetime-local"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  borderColor="teal.200"
                  focusBorderColor="teal.800"
                  colorScheme="teal"
                  _hover={{ borderColor: "teal.800" }}
                  _focus={{ borderColor: "teal.800" }}
                  _active={{ borderColor: "transparent" }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight="medium">End Time</FormLabel>
                <Input
                  type="datetime-local"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  borderColor="teal.200"
                  focusBorderColor="teal.800"
                  colorScheme="teal"
                  _hover={{ borderColor: "teal.800" }}
                  _focus={{ borderColor: "teal.800" }}
                  _active={{ borderColor: "transparent" }}
                />
              </FormControl>

              <FormControl isInvalid={errors.categoryIds}>
                <FormLabel fontWeight="medium">Category</FormLabel>
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
                      p={1}
                      key={category.id}
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
              _hover={{
                transform: "scale(1.03)",
                bg: "teal.100",
              }}
              size="md"
              bg="teal.50"
              boxShadow="base"
              transition="all 0.2s ease-in-out"
              onClick={onClose}
              borderRadius="full"
              fontWeight={450}
              textTransform="uppercase"
              mr={3}
            >
              Cancel
            </Button>
            <Button
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
              type="submit"
              borderRadius="full"
              fontWeight={450}
              textTransform="uppercase"
            >
              Update Event
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default EditEventModal;
