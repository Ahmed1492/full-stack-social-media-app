import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full customHeight flex justify-center items-center">
      <SignUp />
    </div>
  );
}
