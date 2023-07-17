import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/configs/firebase";
import { getFirestore } from "firebase/firestore";
export async function addfollowing(followerDocId: string, targetDocId: string) {
  console.log("fdi: ", followerDocId);
  console.log("tdi : ", targetDocId);
  try {
    // first we append the followers array of target user
    console.log("start");
    const targetDocRef = doc(db, "users", targetDocId);

    const res = await updateDoc(targetDocRef, {
      followers: arrayUnion(followerDocId),
    });
    console.log("res: ", res);

    // now we append the following array of following user

    const followingDocRef = doc(db, "users", followerDocId);
    const res2 = await updateDoc(followingDocRef, {
      following: arrayUnion(targetDocId),
    });
    console.log("res2: ", res2);
    console.log("end");
    return true;
  } catch (err) {
    console.log(err);
  }
}
