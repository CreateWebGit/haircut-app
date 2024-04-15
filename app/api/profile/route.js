import { connectMongoDB } from "@/lib/mymongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Profile from "@/models/profile";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    console.log("haha");

    const session = await getServerSession(authOptions);
    const email = session.user.email;
    const { company, description } = await req.json();

    let query = {
      company: company,
      desription: description,
      email: email,
    };
    let update = { expire: new Date() };
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };

    connectMongoDB();

    console.log(email);

    await Profile.findOneAndUpdate({ email: email }, query, options);

    console.log("yes");
    return Response.json(true);
    //return NextResponse.json({ message: "User registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  connectMongoDB();

  const profile = await Profile.findOne({ email }).lean();

  return Response.json({ ...profile });
}
