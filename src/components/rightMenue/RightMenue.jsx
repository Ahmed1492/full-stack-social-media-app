import FriendRequests from "@/components/rightMenue/FriendRequests";
import Birthdays from "@/components/Birthdays";
import Ads from "@/components/leftMenue/Ads";
import UserInfoCard from "@/components/rightMenue/UserInfoCard";
import Loading from "@/components/Loading";
import UserMediaCard from "@/components/rightMenue/UserMediaCard";
import { Suspense } from "react";

export default function RightMenue({ user }) {
  return (
    <div className="flex flex-col gap-6">
      {user && (
        <>
          <Suspense fallback={<Loading />}>
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <UserMediaCard user={user} />
          </Suspense>
        </>
      )}
      <FriendRequests />
      <Birthdays />
      <Ads />
    </div>
  );
}
