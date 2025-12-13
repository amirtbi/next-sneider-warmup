"use client";

import { Avatar, Box, Button, Flex, Input, Link } from "@chakra-ui/react";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import * as actions from "@/actions";
import CustomButton from "../button/button";

const Header = () => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  const session = useSession();

  return (
    <Box h="100%" as="header" bg="black" color="white">
      <nav>
        <Box
          as="ul"
          p="10"
          display="flex"
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
          fontSize={20}
          gap="5"
          listStyleType="none"
        >
          <Flex justify="space-between">
            <Flex justify={"flex-start"}>
              <Box>
                <Link href="/">Discuss</Link>
              </Box>
            </Flex>
          </Flex>

          <Flex margin={"auto"} flexGrow={1}>
            <Box width={"75%"}>
              <Input width={"100%"} placeholder="search" />
            </Box>
          </Flex>
          <Flex alignSelf="center" justify="space-between" gap="4">
            {session.status === "authenticated" ? (
              <Box>
                <Flex gap="3" alignItems="center">
                  <Avatar.Root>
                    <Avatar.Fallback name="User" />
                    <Avatar.Image src={session.data.user?.image || ""} />
                  </Avatar.Root>
                  <form action={actions.logOut}>
                    <CustomButton type="submit" variant="plain">
                      Sign Out
                    </CustomButton>
                  </form>
                </Flex>
              </Box>
            ) : (
              <form action={actions.logIn}>
                <CustomButton variant="outline" type="submit">
                  Sign In
                </CustomButton>
              </form>
            )}
          </Flex>
        </Box>
      </nav>
    </Box>
  );
};
export default Header;
