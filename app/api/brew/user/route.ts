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

    const brews = await prisma.brew.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        steps: {
          orderBy: { order: "asc" },
        },
        grinder: true,
        dripper: true,
        espressoMachine: true,
        filter: true,
        kettle: true,
        scale: true,
        coffee: true,
      },
    });

    return NextResponse.json(brews);
  } catch (error) {
    console.error("BREW GET API ERROR:", error);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
