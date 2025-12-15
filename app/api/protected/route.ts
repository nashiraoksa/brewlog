import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request) {
  const session = await getServerSession({ req, ...authOptions });

  console.log("Session:", session);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  return new Response(
    JSON.stringify({ message: "Protected content", user: session.user })
  );
}
