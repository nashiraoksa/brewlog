import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const grinders = await prisma.grinder.findMany();
    return NextResponse.json(grinders);
  } catch (error) {
    console.log("GRINDER API ERROR", error);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const grinder = await prisma.grinder.create({
    data: {
      userId: session.user.id,
      name: body.name,
      type: body.type,
      purchase_date: body.purchase_date,
      details: body.details,
    },
  });

  return NextResponse.json(grinder);
}
