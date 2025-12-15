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

    const coffees = await prisma.coffee.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        roasteryRef: true,
      },
    });

    return NextResponse.json(coffees);
  } catch (error) {
    console.error("COFFEE GET API ERROR:", error);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
