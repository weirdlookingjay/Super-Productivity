import bcrypt from "bcrypt";
import { db } from "@/app/lib/db";
import { signUpSchema } from "@/schema/signUpSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body: unknown = await request.json();
  const result = signUpSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json("Missing fields", { status: 203 });
  }

  const { email, password, username } = result.data;

  try {
    const existingUsername = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUsername)
      return NextResponse.json("Username is already taken", { status: 203 });

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser)
      return NextResponse.json("Email is already taken", { status: 203 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(newUser, { status: 200 });
  } catch (error) {
    return NextResponse.json("Seomething went wrong", { status: 500 });
  }
}
