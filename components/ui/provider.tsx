"use client";

import {
  ChakraProvider,
  defineConfig,
  createSystem,
  defaultConfig,
} from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { SessionProvider } from "next-auth/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        red: {
          50: { value: "#ffe5e5" },
          100: { value: "#fbbaba" },
          200: { value: "#f28f8f" },
          300: { value: "#e86565" },
          400: { value: "#df3a3a" },
          500: { value: "#d51010" },
          600: { value: "#a90c0c" },
          700: { value: "#7d0808" },
          800: { value: "#520505" },
          900: { value: "#260202" },
        },
      },
    },
  },
});

const system = createSystem(defaultConfig, config);

export function Provider({ children, ...props }: ColorModeProviderProps) {
  return (
    <SessionProvider>
      <ChakraProvider value={system}>
        <ColorModeProvider {...props}>{children}</ColorModeProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}
