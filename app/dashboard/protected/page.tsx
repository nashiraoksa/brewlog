"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (status === "loading") return; // Wait for the session status to finish loading

    // If the session does not exist, trigger a redirect to the login page
    if (!session) {
      setIsRedirecting(true); // Flag to prevent rendering content while redirecting
      router.push("/auth/login");
    }
  }, [session, status, router]);

  // Show a loading state while waiting for the session or redirection
  if (status === "loading" || isRedirecting) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Protected Content</h1>
      <p>Welcome, {session?.user?.email}</p>
    </div>
  );
}
