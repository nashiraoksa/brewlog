import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const roasteries = await prisma.roastery.findMany();
    return NextResponse.json(roasteries);
  } catch (error) {
    console.error("ROASTERY API ERROR", error);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const roastery = await prisma.roastery.create({
    data: {
      userId: session.user.id,
      name: body.name,
      address: body.address,
      city: body.city,
      country: body.country,
    },
  });

  return NextResponse.json(roastery);
}
