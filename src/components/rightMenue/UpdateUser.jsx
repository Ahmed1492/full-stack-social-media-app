"use client";

import { updateProfile } from "@/lib/actions";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import UpdateButton from "@/components/rightMenue/UpdateButton";
export default function UpdateUser({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cover, setCover] = useState();
  const router = useRouter();
  const [state, formAction] = useActionState(updateProfile, {
    sucess: false,
    error: false,
  });

  const handleClose = () => {
    setIsOpen(false);
    state.success && router.refresh();
  };

  if (!user) return;

  return (
    <div className="">
      <span
        onClick={() => setIsOpen(true)}
        className="text-sm text-blue-500 cursor-pointer"
      >
        update
      </span>

      {isOpen && (
        <div className="absolute w-full h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50">
          <form
            className="p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative"
            action={(formData) =>
              formAction({ formData, cover: cover?.secure_url })
            }
          >
            <h2 className="text-xl font-bold text-center mb-3">
              Update Profile
            </h2>
            <p className="text-sm text-gray-500 ">
              Use the navbar to change the avatar or usename .
            </p>

            {/* Change Image  Using Cloudinary*/}
            <CldUploadWidget
              uploadPreset="social"
              onSuccess={(result) => setCover(result?.info)}
            >
              {({ open }) => {
                return (
                  <div
                    className=""
                    onClick={open ? () => open() : console.log("notValid")}
                  >
                    <label className="mt-4 text-lg font-bold " htmlFor="">
                      Cover Picture
                    </label>
                    <div className="flex items-center gap-3 text-sm  cursor-pointe mt-4">
                      <Image
                        src={user?.cover}
                        alt=""
                        width={56}
                        height={56}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                      <span className="text-gray-500 cursor-pointer">
                        Change
                      </span>
                    </div>
                  </div>
                );
              }}
            </CldUploadWidget>

            {/* INPUTS */}
            <div className="flex flex-wrap justify-between">
              {/*  First name */}
              <div className="flex flex-col gap-1 mt-5">
                <label className="text-sm text-gray-500" htmlFor="">
                  First name
                </label>
                <input
                  className="border-slate-300 text-sm border py-2 px-3 rounded-md outline-none"
                  name="name"
                  type="text"
                  placeholder="Ahmed"
                />
              </div>
              {/*  Surname*/}
              <div className="flex flex-col gap-1 mt-5">
                <label className="text-sm text-gray-500" htmlFor="">
                  Surname
                </label>
                <input
                  className="border-slate-300 text-sm border py-2 px-3 rounded-md outline-none"
                  name="surname"
                  type="text"
                  placeholder="Mohamed"
                />
              </div>
              {/*  Description*/}
              <div className="flex flex-col gap-1 mt-5">
                <label className="text-sm text-gray-500" htmlFor="">
                  Desc
                </label>
                <input
                  className="border-slate-300 text-sm border py-2 px-3 rounded-md outline-none"
                  name="description"
                  type="text"
                  placeholder="Life Is Beautiful"
                />
              </div>
              {/*  City*/}
              <div className="flex flex-col gap-1 mt-5">
                <label className="text-sm text-gray-500" htmlFor="">
                  City
                </label>
                <input
                  className="border-slate-300 text-sm border py-2 px-3 rounded-md outline-none"
                  name="city"
                  type="text"
                  placeholder="Cairo"
                />
              </div>
              {/*  School*/}
              <div className="flex flex-col gap-1 mt-5">
                <label className="text-sm text-gray-500" htmlFor="">
                  School
                </label>
                <input
                  className="border-slate-300 text-sm border py-2 px-3 rounded-md outline-none"
                  name="school"
                  type="text"
                  placeholder="High Scool"
                />
              </div>
              {/*  Work*/}
              <div className="flex flex-col gap-1 mt-5">
                <label className="text-sm text-gray-500" htmlFor="">
                  Work
                </label>
                <input
                  className="border-slate-300 text-sm border py-2 px-3 rounded-md outline-none"
                  name="work"
                  type="text"
                  placeholder="Software Engineer ."
                />
              </div>
              {/*  Web site*/}
              <div className="flex flex-col gap-1 mt-5">
                <label className="text-sm text-gray-500" htmlFor="">
                  Website
                </label>
                <input
                  className="border-slate-300 text-sm border py-2 px-3 rounded-md outline-none"
                  name="website"
                  type="text"
                  placeholder="ahmed.Dev"
                />
              </div>
              {/*  Update Button*/}

              <UpdateButton />
              {state.success && (
                <span className="text-green-500">
                  Profile has been Updated !
                </span>
              )}
              {state.error && (
                <span className="text-red-500">Some Thing Went Wrong </span>
              )}
            </div>
            <span
              onClick={handleClose}
              className="absolute right-3 top-3 cursor-pointer text-lg"
            >
              X
            </span>
          </form>
        </div>
      )}
    </div>
  );
}
