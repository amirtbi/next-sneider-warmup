"use client";

import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Header = () => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <Box as="header" bg="black" minH="100vh" color="white">
      <nav>
        <Box
          as="ul"
          p="10"
          display="flex"
          flexDir="column"
          fontSize={20}
          gap="5"
          listStyleType="none"
        >
          <Box
            as="li"
            color={isActive("/") ? "teal.300" : "white"}
            _hover={{
              color: "teal.300",
              textDecoration: "underline",
            }}
          >
            <Link href="/">Home</Link>
          </Box>

          <Box
            as="li"
            color={isActive("/auth") ? "teal.300" : "white"}
            _hover={{
              color: "teal.300",
              textDecoration: "underline",
            }}
          >
            <Link href="/auth">Profile</Link>
          </Box>
        </Box>
      </nav>
    </Box>
  );
};
export default Header;
