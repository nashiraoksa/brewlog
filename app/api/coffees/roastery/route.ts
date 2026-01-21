import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const roasteries = await prisma.roastery.findMany({
      where: {
        coffees: {
          some: {
            userId: session.user.id,
          },
        },
      },
      include: {
        coffees: {
          where: {
            userId: session.user.id,
          },
        },
      },
    });

    return NextResponse.json(roasteries);
  } catch (error) {
    console.error("COFFEE GET API ERROR:", error);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
