"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFirebaseContext } from "@/contexts/FirebaseContext";

import { Button } from "./ui/button";

const SignInWithGoogleButton = () => {
  const navigate = useRouter();
  const { signInWithGoogle } = useFirebaseContext();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSignInWithGoogle = async () => {
    setIsPending(true);
    setErrorMessage("");

    try {
      await signInWithGoogle();
      navigate.push("/");
    } catch (error) {
      const { message } = error as { message: string };
      setErrorMessage(`Failed to sign in with Google. ${message}`);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleSignInWithGoogle}
        disabled={isPending}
        className="w-full"
      >
        Sign In with Google
      </Button>
      {errorMessage && (
        <div className="text-red-500 text-center">{errorMessage}</div>
      )}
    </>
  );
};

export default SignInWithGoogleButton;
