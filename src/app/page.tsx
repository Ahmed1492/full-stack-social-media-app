import LeftMenue from "@/components/leftMenue/LeftMenue";
import RightMenue from "@/components/rightMenue/RightMenue";
import Stories from "@/components/Stories";
import AddPost from "@/components/AddPost";
import Feed from "@/components/feed/Feed";

export const dynamic = "force-dynamic";

const Homepage = () => {
  return (
    <div className="flex gap-6 pt-6">
      {/* Left */}
      <div className="hidden xl:block w-[30%]">
        <div className="sticky top-20">
          <LeftMenue type="home" />
        </div>
      </div>
      {/* Center */}
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <Stories />
          <AddPost />
          <Feed  />
        </div>
      </div>
      {/* Right */}
      <div className="hidden lg:block w-[33%]">
        <div className="sticky top-20">
          <RightMenue user={null} />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
