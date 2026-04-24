import LeftMenue from "@/components/leftMenue/LeftMenue";
import SettingsClient from "@/components/SettingsClient";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[30%]">
        <div className="sticky top-20"><LeftMenue type="home" /></div>
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <SettingsClient />
      </div>
    </div>
  );
}
