import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full customHeight flex justify-center items-center">
      <SignIn />
    </div>
  );
}
