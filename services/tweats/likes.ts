import {doc, updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore'
import {User} from "firebase/auth";
import {db} from "@/configs/firebase";

export async function addLike(tweatId: string, user: User): Promise<string | null> {
    const docRef = doc(db, "tweats", tweatId);
    try {
        const response = await updateDoc(docRef, {
            likes: arrayUnion(user.uid),
        });
        return user.uid
    } catch (err) {
        return null
    }
}

export async function updateLike(tweatId: string, user: User, currentLikes: Array<string>): Promise<Array<string> | null> {
    try {
        const docRef = doc(db, "tweats", tweatId);
        const updatedLikes = currentLikes.filter(
            (like) => like !== user?.uid
        );
        await updateDoc(docRef, {likes: arrayRemove(user.uid)});
        return updatedLikes
    } catch (err) {
        return null
    }

}