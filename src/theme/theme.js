import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const styles = {
  global: {
    body: {
      bg: "blackAlpha.100",
      fontFamily: "Inter Tight",
    },
  },
};
const colors = {
  brand: {
    blueHover: "rgb(0, 32, 153)",
    blue: "rgb(0, 39, 186)",
    pink: "rgb(255, 179, 193)",
    pinkHover: "rgb(253, 192, 203)",
  },
};

const theme = extendTheme({ config, styles, colors });

export default theme;
