import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    img: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Profile = models.Profile || mongoose.model("Profile", userSchema);
export default Profile;
