import AddNewTweat from "@/components/Feed/AddNewTweat";
import UserTweets from "@/components/General/UserTweets";
import ProfileContent from "@/components/Profile/ProfileContent";
import ProfileDetails from "@/components/Profile/ProfileDetails";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import { get_user_tweats } from "@/services/tweats/usertweats";
import { get_user } from "@/services/users/getuser";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Profile({ searchParams }: Props) {
  const tweats = await get_user_tweats(searchParams.user as string);
  const user = await get_user(searchParams.user as string);

  return (
    <main className="min-h-screen flex-1">
      <ProfileHeader
        numberOfTweats={tweats.length}
        userName={user?.name as string}
      />
      <ProfileDetails currentProfile={searchParams.user as string} />
      <div className="px-4 w-full">
        <AddNewTweat currentProfileId={searchParams.user as string} />
      </div>
      <ProfileContent />
      <UserTweets tweats={tweats} />
    </main>
  );
}
