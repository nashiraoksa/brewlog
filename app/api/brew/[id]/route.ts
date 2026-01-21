import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: "Brew ID is required" }, { status: 400 });
  }

  const brew = await prisma.brew.findUnique({
    where: { id },
    include: {
      steps: { orderBy: { order: "asc" } },
      grinder: true,
      dripper: true,
      espressoMachine: true,
      filter: true,
      kettle: true,
      scale: true,
      coffee: true,
    },
  });

  if (!brew || brew.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(brew);
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const session = await getServerSession({ req, ...authOptions });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: "Missing brew ID" }, { status: 400 });
  }

  const existing = await prisma.brew.findUnique({
    where: { id },
    include: { steps: true },
  });

  if (!existing || existing.userId !== session.user.id) {
    return NextResponse.json(
      { error: "Not found or unauthorized" },
      { status: 404 }
    );
  }

  const body = await req.json();

  try {
    const brew = await prisma.brew.update({
      where: { id },
      data: {
        // ---------- Required fields ----------
        method: body.method,
        coffeeId: body.coffeeId,
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

        // ---------- Steps (replace all) ----------
        steps: {
          deleteMany: {},
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
        coffee: true,
      },
    });

    return NextResponse.json(brew);
  } catch (error) {
    console.error("Update brew failed:", error);
    return NextResponse.json(
      { error: "Failed to update brew" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const session = await getServerSession({ req: _req, ...authOptions });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: "Missing brew ID" }, { status: 400 });
  }

  const existing = await prisma.brew.findUnique({
    where: { id },
  });

  if (!existing || existing.userId !== session.user.id) {
    return NextResponse.json(
      { error: "Not found or unauthorized" },
      { status: 404 }
    );
  }

  await prisma.step.deleteMany({
    where: { brewId: id },
  });

  await prisma.brew.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
