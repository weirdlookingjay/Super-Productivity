import { getAuthSession } from "@/app/lib/auth";
import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  const session = await getAuthSession();
  if (!session?.user) {
    return new Response("Unauthorized", {
      status: 400,
      statusText: "Unauthorized User",
    });
  }

  const body: unknown = await request.json();

  const result = z
    .object({
      profileImage: z.string(),
    })
    .safeParse(body);

  if (!result.success) {
    return NextResponse.json("ERRORS.WRONG_DATA", { status: 401 });
  }

  const { profileImage } = result.data;

  try {
    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    if (!user) {
      return new NextResponse("User not found", {
        status: 404,
        statusText: "User not found",
      });
    }

    const updatedUser = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: profileImage,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json("ERRORS.DB_ERROR", { status: 405 });
  }
}
