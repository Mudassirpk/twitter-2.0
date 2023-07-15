import {
  doc,
  updateDoc,
  arrayUnion,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {  db, usersCollectionRef } from "@/configs/firebase";
import { iComment, iCommentWithUser } from "@/types";
import { User } from "firebase/auth";

export async function addComment(
  user: User,
  tweatId: string,
  commentContent: string
): Promise<iCommentWithUser | undefined | null> {
  const docRef = doc(db, "tweats", tweatId);
  try {
    if (user) {
      await updateDoc(docRef, {
        comments: arrayUnion({
          from: user.uid,
          text: commentContent,
        }),
      });
      return {
        from: user.uid,
        text: commentContent,
        from_data: {
          uid: user.uid,
          email: user.email as string,
          name: user.displayName as string,
          photo: user.photoURL as string,
        },
      };
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getCommentsWithUser(
  currentComments: iComment[]
): Promise<iCommentWithUser[]> {
  const commentsWithUser: iCommentWithUser[] = [];
  for (let currentComment of currentComments) {
    let tempComment: iCommentWithUser = {
      from: currentComment.from,
      text: currentComment.text,
      from_data: {
        email: "",
        name: "",
        photo: "",
        uid: "",
      },
    };
    const userId = currentComment.from;
    try {
      const q = query(usersCollectionRef, where("uid", "==", userId));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs[0]) {
        const user: any = querySnapshot.docs[0].data();
        tempComment.from_data = {
          name: user.name,
          email: user.email,
          photo: user.photo,
          uid: user.uid,
        };
        commentsWithUser.push(tempComment);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return commentsWithUser;
}
