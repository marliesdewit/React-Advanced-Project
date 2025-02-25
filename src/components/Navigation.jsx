import { useState, useEffect, useRef } from "react";
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Flex,
  Button,
  Link,
  useBreakpointValue,
  Box,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import gsap from "gsap";
import React from "react";
import { useGSAP } from "@gsap/react";
import { useEvents } from "../context/EventsContext";
import { useLocation, useNavigate } from "react-router-dom";
import "../index.css";
import { MdHomeFilled } from "react-icons/md";

gsap.registerPlugin(useGSAP);

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const itemsRef = useRef([]);
  const { events } = useEvents();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const containerRef = useRef();

  const [activeEvent, setActiveEvent] = useState(location.pathname);

  const handleClick = (path) => {
    setActiveEvent(path);
    navigate(path);
    setIsOpen(false);
  };

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (!menuRef.current) return;
      if (isOpen) {
        gsap.to(menuRef.current, {
          autoAlpha: 1,

          height: "100vh",
          duration: 0.4,
          ease: "power2.out",
        });

        gsap.fromTo(
          itemsRef.current,
          { opacity: 0, yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.3,
            stagger: 0.12,
            opacity: 1,
            ease: "power2.out",
          }
        );
      } else {
        gsap.to(menuRef.current, {
          autoAlpha: 1,
          height: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  return (
    <>
      {isMobile ? (
        <Flex
          as="nav"
          w="100%"
          h="80px"
          top={0}
          left={0}
          alignItems="center"
          justifyContent="space-between"
          direction="row"
          p={2}
          borderRadius={12}
          transition="height 0.3s ease-in-out"
        >
          <IconButton
            icon={<MdHomeFilled />}
            size="md"
            fontSize="2rem"
            aria-label="Home"
            variant="ghost"
            colorScheme="teal"
            color="gray.50"
            zIndex={10000}
            transition="all 0.2s ease-in-out"
            _hover={{
              bg: "teal.200",
              color: "teal.50",
              transform: "scale(1.05)",
            }}
            boxShadow="base"
            borderRadius="inherit"
            bg="teal.400"
            onClick={() => handleClick("/")}
          />
          <Button
            as={Link}
            to="/"
            variant="ghost"
            color="teal.50"
            colorScheme="teal"
            fontWeight="350"
            fontSize="3xl"
            lineHeight={1}
            letterSpacing="-0.02em"
            transition="all 0.3s ease-in-out"
            zIndex={999}
            _hover={{
              color: "teal.500",
              bg: "transparent",
              textDecoration: "none",
            }}
            onClick={() => handleClick("/")}
          >
            <Text textShadow="2px 2px 4px rgba(0, 0, 0, 0.1)">EVENT/Z</Text>
          </Button>

          <Menu onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)}>
            <MenuButton
              as={IconButton}
              aria-label="Open Menu"
              variant="solid"
              zIndex={999}
              mr={2}
              colorScheme="teal"
              size="lg"
              borderRadius="full"
              transition="all 0.3s ease-in-out"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <CloseIcon /> : <HamburgerIcon />}
            </MenuButton>

            <Flex
              ref={menuRef}
              bg="teal.200"
              position="absolute"
              top={0}
              left={0}
              right={0}
              display={isOpen ? "flex" : "none"}
              w="100%"
              flexDirection="column"
              alignItems="flex-start"
              justifyContent="center"
              px={6}
              borderRadius={12}
              minH="100vh"
              h="100%"
              border="none"
              zIndex={998}
            >
              {events.map((event, index) => (
                <MenuItem
                  key={event.id}
                  ref={(el) => (itemsRef.current[index] = el)}
                  borderBottom="2px"
                  borderColor="teal.800"
                  width="80%"
                  textTransform="uppercase"
                  fontSize="1.4em"
                  fontWeight="450"
                  position="relative"
                  display="inline-block"
                  className="menuItem"
                  transition="all 0.2s ease-in-out"
                  onClick={() => handleClick(`/event/${event.id}`)}
                  _hover={{
                    color: "teal.600",
                  }}
                  _focus={{
                    color: "teal.600",
                  }}
                  _active={{
                    color: "teal.600",
                  }}
                >
                  {event.title}
                </MenuItem>
              ))}
            </Flex>
          </Menu>
        </Flex>
      ) : (
        <Flex
          as="nav"
          maxH="100vh"
          h="100%"
          w="auto"
          maxW="100%"
          position="relative"
          align="flex-start"
          justify="center"
          mx="auto"
          direction="column"
          gap={4}
        >
          <Button
            as={Link}
            to="/"
            variant="solid"
            h="100%"
            w="100%"
            colorScheme="teal"
            bg="teal.300"
            color="gray.900"
            fontSize="8rem"
            border="none"
            textDecoration="none"
            fontWeight="500"
            transition="all 0.2s ease-in-out"
            className="logoButton"
            _hover={{
              textDecoration: "none",
            }}
            lineHeight={0.8}
            letterSpacing="-0.01em"
            onClick={() => handleClick("/")}
            ref={containerRef}
          >
            <Flex direction="column" className="logoBox" p={4}>
              <Text textShadow="2px 2px 4px rgba(0, 0, 0, 0.1)">
                EVE
                <br />
                <span>NT/Z</span>
              </Text>
            </Flex>
            <IconButton
              icon={<MdHomeFilled />}
              size="lg"
              fontSize="3rem"
              aria-label="Home"
              variant="ghost"
              colorScheme="teal"
              color="gray.900"
              position="absolute"
              top="3"
              left="3"
              transition="all 0.2s ease-in-out"
              _hover={{
                bg: "teal.200",
                color: "teal.50",
                transform: "scale(1.05)",
              }}
              boxShadow="base"
              borderRadius="inherit"
              bg="teal.400"
              onClick={() => handleClick("/")}
            />
          </Button>

          <Flex
            gap={0.3}
            fontWeight="400"
            textTransform="uppercase"
            direction="column"
            w="100%"
            flex={1}
            align="flex-start"
            justify="center"
            borderRadius={12}
            p={4}
            textAlign="left"
            bg="teal.300"
          >
            {events.map((event) => (
              <Button
                key={event.id}
                as={Link}
                to={`/event/${event.id}`}
                variant="ghost"
                className="menuItems"
                colorScheme="teal"
                fontSize="1.4rem"
                fontWeight="normal"
                transform={
                  activeEvent === `/event/${event.id}`
                    ? "scale(1.05)"
                    : "scale(1)"
                }
                color={
                  activeEvent === `/event/${event.id}` ? "teal.50" : "gray.900"
                }
                transition="all 0.2s ease-in-out"
                _hover={{
                  color: "teal.50",
                  transform: "scale(1.05)",
                }}
                _focus={{
                  color: "teal.50",
                  transform: "scale(1.05)",
                }}
                _active={{
                  transform: "scale(1.05)",
                }}
                onClick={() => handleClick(`/event/${event.id}`)}
              >
                {event.title}
              </Button>
            ))}
          </Flex>
        </Flex>
      )}
    </>
  );
}
