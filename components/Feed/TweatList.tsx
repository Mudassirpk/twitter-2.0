import React from "react";
import Tweat from "./Tweat";
import {getDocs, query, where} from "firebase/firestore";
import {tweatCollectionRef, usersCollectionRef} from "@/configs/firebase";
import {iTweat} from "@/types";

async function TweatList() {
    const response = await getDocs(tweatCollectionRef);
    const tweats = response.docs.map((doc) => {
        const tweat = doc.data();
        tweat.uid = doc.id;
        return tweat;
    });
    const tweatsWithUser: Array<iTweat> = [];
    for (let tweat of tweats) {
        const userId = tweat.from;
        try {
            const q = query(usersCollectionRef, where("uid", "==", userId));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.docs[0]) {
                tweat.from_data = querySnapshot.docs[0].data();
                tweatsWithUser.push(tweat as iTweat);
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="w-full">
            {tweatsWithUser ? tweatsWithUser.map((tweat: iTweat) => {
                const {uid} = tweat;
                return <Tweat key={uid} data={tweat}/>;
            }) : null}
        </div>
    );
}

export default TweatList;
