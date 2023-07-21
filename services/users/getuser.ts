import { usersCollectionRef } from "@/configs/firebase";
import { tTwitterUser } from "@/types";
import { query, where, getDocs } from "firebase/firestore";

export async function get_user(userId: string): Promise<tTwitterUser | null> {
  try {
    const user_query = query(usersCollectionRef, where("uid", "==", userId));

    const user = (await getDocs(user_query)).docs[0].data() as tTwitterUser;
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}
