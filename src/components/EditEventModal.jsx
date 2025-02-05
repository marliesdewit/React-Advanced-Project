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
  Select,
  FormErrorMessage,
  Button,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useEvents } from "../context/EventsContext";

function EditEventModal({ isOpen, onClose, event }) {
  const { categories, updateEvent } = useEvents();
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

  useEffect(() => {
    if (event) {
      setFormData({
        ...event,
        startTime: new Date(event.startTime).toISOString().slice(0, 16),
        endTime: new Date(event.endTime).toISOString().slice(0, 16),
      });
    }
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEvent(event.id, {
        ...formData,
        categoryIds: formData.categoryIds.map((id) => parseInt(id)),
      });
      toast({
        title: "Event updated.",
        description: "We've updated your event for you.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
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
            Edit Event
          </AlertDialogHeader>
          <AlertDialogCloseButton _hover={{ bg: brandColors.pink }} />
          <AlertDialogBody>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel fontWeight="medium">Title</FormLabel>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Event Title"
                  _placeholder={{ color: "rgba(0, 40, 186, 0.42)" }}
                  borderColor={brandColors.pink}
                  focusBorderColor={brandColors.blue}
                  _hover={{ borderColor: brandColors.pink }}
                  _focus={{ borderColor: brandColors.blue }}
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
                  _placeholder={{ color: "rgba(0, 40, 186, 0.42)" }}
                  borderColor={brandColors.pink}
                  focusBorderColor={brandColors.blue}
                  _hover={{ borderColor: brandColors.pink }}
                  _focus={{ borderColor: brandColors.blue }}
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
                  borderColor={brandColors.pink}
                  _placeholder={{ color: "rgba(0, 40, 186, 0.42)" }}
                  focusBorderColor={brandColors.blue}
                  _hover={{ borderColor: brandColors.pink }}
                  _focus={{ borderColor: brandColors.blue }}
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
                  borderColor={brandColors.pink}
                  _placeholder={{ color: "rgba(0, 40, 186, 0.42)" }}
                  focusBorderColor={brandColors.blue}
                  _hover={{ borderColor: brandColors.pink }}
                  _focus={{ borderColor: brandColors.blue }}
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
                  color="rgba(0, 40, 186, 0.42)"
                  borderColor={brandColors.pink}
                  focusBorderColor={brandColors.blue}
                  _hover={{ borderColor: brandColors.pink }}
                  _focus={{ borderColor: brandColors.blue }}
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
                  borderColor={brandColors.pink}
                  color="rgba(0, 40, 186, 0.42)"
                  focusBorderColor={brandColors.blue}
                  _hover={{ borderColor: brandColors.pink }}
                  _focus={{ borderColor: brandColors.blue }}
                  _active={{ borderColor: "transparent" }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight="medium">Category</FormLabel>
                <Select
                  name="categoryIds"
                  value={formData.categoryIds}
                  onChange={handleChange}
                  color="rgba(0, 40, 186, 0.42)"
                  size="md"
                  borderColor={brandColors.pink}
                  focusBorderColor={brandColors.blue}
                  _hover={{ borderColor: brandColors.pink }}
                  _focus={{ borderColor: brandColors.blue }}
                  _active={{ borderColor: "transparent" }}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
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
              Update Event
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

export default EditEventModal;
