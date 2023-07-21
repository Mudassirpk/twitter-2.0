import { User } from "firebase/auth";
import { SetStateAction } from "react";

export interface iAuthContext {
  user: tTwitterUser | null;
  setUser: React.Dispatch<SetStateAction<tTwitterUser | null>>;
  signIn: (email: string, password: string) => void;
}

type tTwitterUser = User & {
  name: string;
  email: string;
  uid: string;
  photo: string;
  followers: [string] | [];
  following: [string] | [];
  docId: string;
};

interface iComment {
  from: string;
  text: string;
}

interface iCommentWithUser extends iComment {
  from_data: {
    email: string;
    name: string;
    photo: string;
    uid: string;
  };
}

interface iTweat {
  description: string;
  image: null | { fileKey: string; fileUrl: string } | undefined;
  from_data: {
    email: string;
    name: string;
    uid: string;
    photo: string;
    followers: [string] | [];
    following: [string] | [];
    docId: string;
  };
  from: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  likes: [string] | never[];
  uid: string;
  comments: [iComment] | never[];
}
