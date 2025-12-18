import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const espressoMachines = await prisma.espressoMachine.findMany();
    return NextResponse.json(espressoMachines);
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

  const espressoMachine = await prisma.espressoMachine.create({
    data: {
      userId: session.user.id,
      name: body.name,
      type: body.type,
      purchase_date: body.purchase_date,
      details: body.details,
    },
  });

  return NextResponse.json(espressoMachine);
}
