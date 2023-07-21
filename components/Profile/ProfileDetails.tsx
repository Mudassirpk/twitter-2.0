import avatar from "@/public/profile.jpg";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import Link from "next/link";
import EditProfile from "./EditProfile";

type Props = {
  currentProfile: string;
};

export default function ProfileDetails({ currentProfile }: Props) {
  return (
    <div className="w-full">
      <div className="relative w-full h-[20rem] bg-tweater-gray-medium">
        <div className="w-full absolute -bottom-[6rem] items-center px-4 flex justify-between">
          <div className="relative opacity-95 hover:opacity-100 cursor-pointer w-[10rem] h-[10rem] rounded-full overflow-hidden border-4 border-white">
            <Image alt="avatar" src={avatar} fill={true} />
          </div>
          <div className="pt-10">
            <EditProfile currentProfile={currentProfile} />
          </div>
        </div>
      </div>
      <div className="mt-[8rem]">
        <div className="w-full px-4 text-start">
          <p className="font-semibold text-[1.8rem] text-black">Mnew</p>
          <p className="text-[1.4rem] text-tweater-gray-normal my-1">@Mnew</p>
          <p className="my-4 text-[1.4rem] text-black">
            A MS Made twitter user
          </p>
          <p className="flex gap-2 items-center text-[1.4rem] text-tweater-gray-normal">
            <SlCalender /> Joined april 2022
          </p>
          <div className="flex gap-4 text-[1.4rem] my-4">
            <Link href={"/friends"} className="hover:underline font-semibold">
              186{" "}
              <span className="text-tweater-gray-normal font-normal">
                Following
              </span>
            </Link>
            <Link href={"/friends"} className="hover:underline font-semibold">
              11{" "}
              <span className="text-tweater-gray-normal font-normal">
                Followers
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
