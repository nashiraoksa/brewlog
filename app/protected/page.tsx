// app/protected/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Unauthorized. Please login.</p>;
  }

  return (
    <div>
      <h1>Protected Content</h1>
      <p>Welcome, {session.user?.email}</p>
    </div>
  );
}
