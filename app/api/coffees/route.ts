import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const coffees = await prisma.coffee.findMany();
    return NextResponse.json(coffees);
  } catch (error) {
    console.error("COFFEE API ERROR:", error);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const coffee = await prisma.coffee.create({
    data: {
      userId: session.user.id,
      roastery: body.roastery,
      country: body.country,
      name: body.name,
      altitude: body.altitude,
      varietals: body.varietals,
      processings: body.processings,
      roast_level: body.roast_level,
      roast_date: body.roast_date ? new Date(body.roast_date) : null,
      weight: body.weight,
      price: body.price,
      flavor_profile: body.flavor_profile || [],
    },
  });

  return NextResponse.json(coffee);
}
