import Profile from "@/models/profile";
import { connectMongoDB } from "@/lib/mongoDB";

export async function GET(req) {
  connectMongoDB();

  const profile = await Profile.find({}).lean();

  return Response.json({ ...profile });
}
