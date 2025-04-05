"use client";
import React, { useEffect, useState } from "react";
import { authService } from "@/lib/api/services";
import UpdateProfileInfoForm from "./UpdateProfileInfoForm";
import UpdatePasswordForm from "./UpdatePasswordForm";
import { Toaster } from "react-hot-toast";
const Page = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    authService.getCurrentUser().then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex flex-wrap justify-between items-center mt-5 mx-5 lg:mx-10">
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-bold mb-3">Account Setting</h2>
          <p className="text-gray-500">Manage your account settings</p>
        </div>
      </div>
      <div className="mx-5 lg:mx-10">
        <div className="py-12">
          <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
            <div className="bg-[#18181B] p-4 shadow sm:rounded-lg sm:p-8">
              {user ? <UpdateProfileInfoForm user={user} /> : null}
            </div>

            {user?.register_type !== "google" && (
              <div className="bg-[#18181B] p-4 shadow sm:rounded-lg sm:p-8">
                <UpdatePasswordForm />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
