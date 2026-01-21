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
    return NextResponse.json({ error: "Missing kettle ID" });
  }

  const existing = await prisma.kettle.findUnique({
    where: { id },
  });

  if (!existing || existing.userId !== session.user.id) {
    return NextResponse.json(
      { error: "Not found or unauthorized" },
      { status: 404 }
    );
  }

  const body = await req.json();

  const kettle = await prisma.kettle.update({
    where: { id },
    data: {
      name: body.name,
      type: body.type,
      purchase_date: body.purchase_date,
      details: body.details,
    },
  });

  return NextResponse.json(kettle);
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
    return NextResponse.json({ error: "Missing kettle ID" }, { status: 400 });
  }

  const existing = await prisma.kettle.findUnique({
    where: { id },
  });

  if (!existing || existing.userId !== session.user.id) {
    return NextResponse.json(
      { error: "Not found or unauthorized" },
      { status: 404 }
    );
  }

  await prisma.kettle.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
