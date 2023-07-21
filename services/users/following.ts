import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/configs/firebase";

export async function addfollowing(followerDocId: string, targetDocId: string) {
  try {
    // first we append the followers array of target user
    const targetDocRef = doc(db, "users", targetDocId);

    const res = await updateDoc(targetDocRef, {
      followers: arrayUnion(followerDocId),
    });

    // now we append the following array of following user

    const followingDocRef = doc(db, "users", followerDocId);
    const res2 = await updateDoc(followingDocRef, {
      following: arrayUnion(targetDocId),
    });
    return true;
  } catch (err) {
    console.log(err);
  }
}
