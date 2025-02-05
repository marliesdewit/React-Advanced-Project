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

gsap.registerPlugin(useGSAP);

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const itemsRef = useRef([]);
  const { events } = useEvents();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const logoRef = useRef(null);
  const containerRef = useRef();
  const rotateRef = useRef();

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
          opacity: 1,
          height: "calc(100vh - 2 * 0.5rem)",
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
          opacity: 0,
          height: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  let box = document.querySelector(".rotate");
  gsap.set(box, {
    transformPerspective: 500,
  });
  gsap.to(box, {
    rotateY: 360,
    repeat: -1,
    duration: 5,
    yoyoEase: true,
    force3D: true,
  });

  return (
    <>
      {isMobile ? (
        <Flex
          as="nav"
          w="100%"
          h="150px"
          position="sticky"
          top={0}
          left={0}
          alignItems="center"
          justifyContent="space-between"
          direction="row"
          p={2}
          bg="brand.pink"
          borderRadius={12}
          transition="height 0.3s ease-in-out"
        >
          {/* Logo */}
          <Button
            as={Link}
            to="/"
            variant="ghost"
            color="brand.blue"
            fontWeight="3500"
            fontSize="3xl"
            lineHeight={1}
            letterSpacing="-0.05em"
            transition="all 0.2s ease-in-out"
            _hover={{
              color: "brand.blueHover",
              bg: "brand.pink",
              textDecoration: "none",
              fontWeight: "350",
            }}
            onClick={() => handleClick("/")}
          >
            <Text textShadow="2px 2px 4px rgba(0, 0, 0, 0.1)">EVENT/Z</Text>
          </Button>

          <Menu onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)}>
            <MenuButton
              as={IconButton}
              aria-label="Open Menu"
              variant="subtle"
              bg="brand.blue"
              mr={2}
              color="brand.pink"
              size="lg"
              borderRadius="full"
              transition="all 0.3s ease-in-out"
              _hover={{ bg: "brand.blueHover" }}
              _expanded={{ bg: "brand.blueHover" }}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <CloseIcon /> : <HamburgerIcon />}
            </MenuButton>

            <Box
              ref={menuRef}
              bg="brand.pink"
              position="absolute"
              top={0}
              left={0}
              right={0}
              h="0"
              display="flex"
              w="100%"
              flexDirection="column"
              alignItems="flex-start"
              justifyContent="center"
              p={4}
              zIndex={-1}
              borderRadius={12}
              border="none"
              opacity={0}
            >
              {events.map((event, index) => (
                <MenuItem
                  key={event.id}
                  ref={(el) => (itemsRef.current[index] = el)}
                  borderBottom="2px"
                  borderColor="brand.blue"
                  bg="brand.pink"
                  width="80%"
                  h=""
                  textTransform="uppercase"
                  color="brand.blue"
                  fontSize="1.8em"
                  fontWeight="450"
                  onClick={() => handleClick(`/event/${event.id}`)}
                  _hover={{
                    bg: "none",
                    color: "brand.blueHover",
                    fontWeight: "500",
                  }}
                >
                  {event.title}
                </MenuItem>
              ))}
            </Box>
          </Menu>
        </Flex>
      ) : (
        <Flex
          as="nav"
          maxH="100vh"
          h="100%"
          w="100%"
          maxW="100%"
          position="relative"
          align="flex-start"
          justify="center"
          mx="auto"
          direction="column"
          gap={2}
        >
          <Flex
            position="relative"
            borderRadius={12}
            bg="brand.pink"
            flex={2}
            w="100%"
            ref={logoRef}
            align="center"
            justify="center"
            transition="all 0.2s ease-in-out"
            _hover={{
              transform: "scale(0.99)",
              bg: "brand.pink",
              textDecoration: "none",
            }}
          >
            <Button
              as={Link}
              to="/"
              variant="ghost"
              color="brand.blue"
              fontSize="8rem"
              border="none"
              textDecoration="none"
              fontWeight="500"
              transition="all 0.2s ease-in-out"
              _hover={{
                bg: "transparent",
                textDecoration: "none",
              }}
              lineHeight={0.8}
              letterSpacing="-0.01em"
              onClick={() => handleClick("/")}
              ref={containerRef}
            >
              <Flex direction="column" className="logoBox">
                <Text textShadow="2px 2px 4px rgba(0, 0, 0, 0.1)">EVE</Text>
                <Text textShadow="2px 2px 4px rgba(0, 0, 0, 0.1)">
                  NT/
                  <span
                    ref={rotateRef}
                    style={{ display: "inline-block" }}
                    className="rotate"
                  >
                    Z
                  </span>
                </Text>
              </Flex>
            </Button>
          </Flex>

          <Flex
            gap={0.3}
            fontSize="1.3em"
            fontWeight="300"
            textTransform="uppercase"
            direction="column"
            w="full"
            flex={1}
            align="flex-start"
            justify="center"
            bg="brand.blue"
            borderRadius={12}
            p={2}
            color="brand.pink"
            textAlign="left"
          >
            {events.map((event) => (
              <Button
                key={event.id}
                as={Link}
                to={`/event/${event.id}`}
                variant="ghost"
                className="menuItems"
                fontSize="1.2rem"
                fontWeight={
                  activeEvent === `/event/${event.id}` ? "500" : "300"
                }
                color={
                  activeEvent === `/event/${event.id}`
                    ? "brand.pinkHover"
                    : "brand.pink"
                }
                transition="all 0.2s ease-in-out"
                _hover={{
                  color: "brand.pinkHover",
                  fontWeight: "500",
                  textDecoration: "none",
                  bg: "transparent",
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
