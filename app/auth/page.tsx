import Profile from "@/components/profile/profile";
import { auth } from "@/lib/auth";
import SignInButton from "@/components/sign-in-button";

const AuthPage = async () => {
  const session = await auth();

  return (
    <>{session?.user ? <Profile session={session} /> : <SignInButton />}</>
  );
};

export default AuthPage;
