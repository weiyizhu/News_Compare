import { Schema, model } from "mongoose";

export interface savedNews {
  title: string;
  date: string;
  imgUrl: string;
  newsUrl: string;
}

export interface savedSearches {
  keywords: string;
  sources: string[];
}

export interface IUser {
  email: string;
  password: string;
  savedSearches?: savedSearches[] | null;
  savedNews?: savedNews[] | null;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    savedSearches: {
      type: [
        {
          keywords: String,
          sources: [String],
        },
      ],
      required: false,
    },
    savedNews: {
      type: [
        {
          title: String,
          date: String,
          imgUrl: String,
          newsUrl: String,
        },
      ],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);

export default User;
