"use client";

import { Button } from "@chakra-ui/react";
/* for client hanlding */
import { signIn, signOut, useSession } from "next-auth/react";
/* for server side handling */
// import * as actions from "@/actions";

const SignInButton = () => {
  const session = useSession();

  return (
    <>
      {session.status === "loading" ? (
        <div>loading...</div>
      ) : session.status === "unauthenticated" ? (
        <Button
          colorPalette="teal"
          onClick={async () => await signIn("github", { redirectTo: "/" })}
        >
          Sign in with GitHub
        </Button>
      ) : (
        <>
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      )}
    </>
  );

  // return (
  //   <>
  //     <form action={actions.logIn}>
  //       <Button type="submit">Sign in </Button>
  //     </form>
  //   </>
  // );
};

export default SignInButton;
