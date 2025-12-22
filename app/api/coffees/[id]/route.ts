import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

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
    return NextResponse.json({ error: "Missing coffee ID" }, { status: 400 });
  }

  const existing = await prisma.coffee.findUnique({
    where: { id },
  });

  if (!existing || existing.userId !== session.user.id) {
    return NextResponse.json(
      { error: "Not found or unauthorized" },
      { status: 404 }
    );
  }

  const body = await req.json();

  const coffee = await prisma.coffee.update({
    where: { id },
    data: {
      roastery: body.roastery,
      country: body.country,
      name: body.name,
      roast_level: body.roast_level,
      roast_date: body.roast_date ? new Date(body.roast_date) : null,
      weight: body.weight,
      flavor_profile: body.flavor_profile,
    },
  });

  return NextResponse.json(coffee);
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
    return NextResponse.json({ error: "Missing coffee ID" }, { status: 400 });
  }

  const existing = await prisma.coffee.findUnique({
    where: { id },
  });

  if (!existing || existing.userId !== session.user.id) {
    return NextResponse.json(
      { error: "Not found or unauthorized" },
      { status: 404 }
    );
  }

  await prisma.coffee.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
