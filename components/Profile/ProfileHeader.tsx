import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

type Props = {
  numberOfTweats: number;
  userName: string;
};

export default function ProfileHeader({ numberOfTweats, userName }: Props) {
  return (
    <div className="w-full flex gap-4 py-4 items-center">
      <Link href={"/"}>
        <div className="p-2 rounded-full cursor-pointer hover:bg-tweater-gray-medium">
          <AiOutlineArrowLeft size={25} />
        </div>
      </Link>
      <div className="flex-1">
        <p className="text-black font-semibold text-[1.8rem]">@{userName}</p>
        <p className="text-[1.4rem] text-tweater-gray-normal">
          {numberOfTweats} tweet{numberOfTweats === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
}
