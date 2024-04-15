import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    company: {
      type: String,
      required: true,
    },
    desription: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Profile = models.Profile || mongoose.model("Profile", userSchema);
export default Profile;
