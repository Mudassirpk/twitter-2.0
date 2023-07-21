import { tweatCollectionRef, usersCollectionRef } from "@/configs/firebase";
import { iTweat } from "@/types";
import { query, where, getDocs } from "firebase/firestore";

export async function get_user_tweats(userId: string): Promise<iTweat[]> {
  const tweetsQuery = query(tweatCollectionRef, where("from", "==", userId));

  const tweets = (await getDocs(tweetsQuery)).docs.map((doc) => {
    const tweat = doc.data();
    tweat.uid = doc.id;
    return tweat;
  });

  const tweatsWithUser: Array<iTweat> = [];

  for (let tweat of tweets) {
    try {
      const q = query(usersCollectionRef, where("uid", "==", userId));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs[0]) {
        tweat.from_data = {
          ...querySnapshot.docs[0].data(),
          docId: querySnapshot.docs[0].id,
        };
        tweatsWithUser.push(tweat as iTweat);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return tweatsWithUser;
}
