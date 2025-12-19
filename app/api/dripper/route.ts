import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const drippers = await prisma.dripper.findMany();
    return NextResponse.json(drippers);
  } catch (error) {
    console.log("DRIPPER API ERROR", error);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const dripper = await prisma.dripper.create({
    data: {
      userId: session.user.id,
      name: body.name,
      material: body.material,
      type: body.type,
      purchase_date: body.purchase_date,
      details: body.details,
    },
  });

  return NextResponse.json(dripper);
}
