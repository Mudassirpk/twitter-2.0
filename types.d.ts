import { User } from "firebase/auth";
import { SetStateAction } from "react";

export interface iAuthContext {
  user: User | null;
  setUser: React.Dispatch<SetStateAction<User | null>>;
  signIn: (email: string, password: string) => void;
}

type twitterUser = User & {};

interface iComment {
  from: string;
  text: string;
}

interface iCommentWithUser extends iComment {
  from_data: {
    email: string;
    name: string;
    photo: string;
    uid:string
  };
}

interface iTweat {
  description: string;
  image: {
    fileurl: string;
    filekey: string;
  };
  from_data: {
    email: string;
    name: string;
    uid: string;
    photo: string;
    followers: [string] | [];
    following: [string] | [];
  };
  from: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  likes: [string] | never[];
  uid: string;
  comments: [Comment] | never[];
}
