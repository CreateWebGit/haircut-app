import { connectMongoDB } from "@/lib/mymongodb";
import Profile from "@/models/profile";

export async function GET(req, context) {
  console.log(context.params.id);

  const profileID = context.params.id;
  //const session = await getServerSession(authOptions);
  //const email = session?.user?.email;

  connectMongoDB();

  const profile = await Profile.findOne({ _id: profileID }).lean();

  return Response.json(profile);
}
