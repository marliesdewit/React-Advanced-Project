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
  Select,
} from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";
import { useEvents } from "../context/EventsContext";

function AddEventModal({ isOpen, onClose }) {
  const { categories, addEvent } = useEvents();
  const modalRef = useRef(null);
  const toast = useToast();
  const cancelRef = useRef();

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
    if (formData.categoryIds.length === 0)
      newErrors.categoryIds = "At least one category must be selected.";

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
      await addEvent({
        ...formData,
        categoryIds: formData.categoryIds.map((id) => parseInt(id)),
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

  const brandColors = {
    blue: "rgb(0, 39, 186)",
    pink: "rgb(255, 179, 193)",
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
        bg="gray.100"
        color={brandColors.blue}
        borderRadius={12}
        boxShadow="lg"
        p={5}
        maxW={{ base: "95%", md: "600px" }}
        fontFamily="Inter Tight"
      >
        <form onSubmit={handleSubmit}>
          <AlertDialogHeader
            fontSize="xl"
            fontWeight="medium"
            textTransform="uppercase"
          >
            Create New Event
          </AlertDialogHeader>
          <AlertDialogCloseButton _hover={{ bg: brandColors.pink }} />
          <AlertDialogBody>
            <Stack spacing={4}>
              <FormControl isInvalid={errors.title}>
                <FormLabel fontWeight="medium">Title</FormLabel>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Event Title"
                  _placeholder={{ color: "rgba(0, 40, 186, 0.42)" }}
                  borderColor={brandColors.pink}
                  focusBorderColor={brandColors.blue}
                  _hover={{ borderColor: "brand.pink" }}
                  _focus={{ borderColor: "brand.blue" }}
                  _active={{ borderColor: "transparent" }}
                />
                <FormErrorMessage>{errors.title}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.description}>
                <FormLabel fontWeight="medium">Description</FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Event Description"
                  _placeholder={{ color: "rgba(0, 40, 186, 0.42)" }}
                  borderColor={brandColors.pink}
                  focusBorderColor={brandColors.blue}
                  _hover={{ borderColor: "brand.pink" }}
                  _focus={{ borderColor: "brand.blue" }}
                  _active={{ borderColor: "transparent" }}
                />
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.image}>
                <FormLabel fontWeight="medium">Image URL</FormLabel>
                <Input
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Event Image URL"
                  borderColor={brandColors.pink}
                  _placeholder={{ color: "rgba(0, 40, 186, 0.42)" }}
                  focusBorderColor={brandColors.blue}
                  _hover={{ borderColor: "brand.pink" }}
                  _focus={{ borderColor: "brand.blue" }}
                  _active={{ borderColor: "transparent" }}
                />
                <FormErrorMessage>{errors.image}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.location}>
                <FormLabel fontWeight="medium">Location</FormLabel>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Event Location"
                  borderColor={brandColors.pink}
                  _placeholder={{ color: "rgba(0, 40, 186, 0.42)" }}
                  focusBorderColor={brandColors.blue}
                  _hover={{ borderColor: "brand.pink" }}
                  _focus={{ borderColor: "brand.blue" }}
                  _active={{ borderColor: "transparent" }}
                />
                <FormErrorMessage>{errors.location}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.startTime}>
                <FormLabel fontWeight="medium">Start Time</FormLabel>
                <Input
                  type="datetime-local"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  color="rgba(0, 40, 186, 0.42)"
                  borderColor={brandColors.pink}
                  focusBorderColor={brandColors.blue}
                  _hover={{ borderColor: "brand.pink" }}
                  _focus={{ borderColor: "brand.blue" }}
                  _active={{ borderColor: "transparent" }}
                />
                <FormErrorMessage>{errors.startTime}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.endTime}>
                <FormLabel fontWeight="medium">End Time</FormLabel>
                <Input
                  type="datetime-local"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  borderColor={brandColors.pink}
                  color="rgba(0, 40, 186, 0.42)"
                  focusBorderColor={brandColors.blue}
                  _hover={{ borderColor: "brand.pink" }}
                  _focus={{ borderColor: "brand.blue" }}
                  _active={{ borderColor: "transparent" }}
                />
                <FormErrorMessage>{errors.endTime}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.categoryIds}>
                <FormLabel fontWeight="medium">Category</FormLabel>
                <Select
                  name="categoryIds"
                  borderColor={brandColors.pink}
                  focusBorderColor={brandColors.blue}
                  // multiple
                  onChange={handleChange}
                  value={formData.categoryIds}
                  color="rgba(0, 40, 186, 0.42)"
                  size="md"
                  _hover={{ borderColor: "brand.pink" }}
                  _focus={{ borderColor: "brand.blue" }}
                  _active={{ borderColor: "transparent" }}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.categoryIds}</FormErrorMessage>
              </FormControl>
            </Stack>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              bg={brandColors.blue}
              color="white"
              _hover={{ bg: "rgba(0, 39, 186, 0.9)" }}
              type="submit"
              mr={3}
              borderRadius="full"
              fontWeight={450}
              textTransform="uppercase"
              size="sm"
            >
              Create Event
            </Button>
            <Button
              ref={cancelRef}
              variant="outline"
              borderColor={brandColors.pink}
              color={brandColors.blue}
              _hover={{ bg: brandColors.pink, color: "white" }}
              onClick={onClose}
              borderRadius="full"
              fontWeight={450}
              textTransform="uppercase"
              size="sm"
            >
              Cancel
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AddEventModal;
