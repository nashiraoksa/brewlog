import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const brews = await prisma.brew.findMany({
      orderBy: { createdAt: "desc" },

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
      },
    });

    return NextResponse.json(brews);
  } catch (error) {
    console.error("BREW API ERROR:", error);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  try {
    const brew = await prisma.brew.create({
      data: {
        // ---------- Required fields ----------
        method: body.method,
        coffeeAmount: body.coffeeAmount,
        waterAmount: body.waterAmount,
        waterTemperature: body.waterTemperature,
        temperatureMetric: body.temperatureMetric,
        brewMinutes: body.brewMinutes,
        brewSeconds: body.brewSeconds,

        // ---------- Optional fields ----------
        date: body.date ? new Date(body.date) : null,
        grindSetting: body.grindSetting ?? null,
        notes: body.notes ?? null,

        // ---------- Optional FK relations ----------
        grinderId: body.grinderId ?? null,
        dripperId: body.dripperId ?? null,
        espressoMachineId: body.espressoMachineId ?? null,
        filterId: body.filterId ?? null,
        kettleId: body.kettleId ?? null,
        scaleId: body.scaleId ?? null,

        // ---------- Ratings ----------
        aroma: body.aroma,
        sweetness: body.sweetness,
        acidity: body.acidity,
        bitterness: body.bitterness,
        body: body.body,
        overall: body.overall,

        // ---------- If your Brew has userId ----------
        userId: session.user.id,

        // ---------- Steps ----------
        steps: {
          create:
            body.steps?.map((s: any) => ({
              order: s.order,
              session: s.session,
              water: s.water,
              time: s.time,
            })) ?? [],
        },
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
      },
    });

    return NextResponse.json(brew);
  } catch (error) {
    console.error("Create brew failed:", error);
    return NextResponse.json(
      { error: "Failed to create brew" },
      { status: 500 }
    );
  }
}
