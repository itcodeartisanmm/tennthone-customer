"use client";
import OverLayEffect from "@/components/overlay-effect";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import React, { useEffect, useState, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Link } from "@heroui/link";
import {
  GoogleIcon,
  EyeFilledIcon,
  EyeSlashFilledIcon,
} from "@/components/icons";
import { authService } from "@/lib/api/services";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

// Client component that uses useSearchParams
const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [showPage, setShowPage] = useState(false);

  interface IFormInput {
    email: string;
    password: string;
    token: string | null;
  }

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      token: token,
    },
  });

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleGoogleLogin = () => {
    console.log("google login");
  };

  const submit = (data: IFormInput) => {
    authService.login(data);
  };

  useEffect(() => {
    const websiteToken = searchParams.get("token");
    if (websiteToken) {
      authService.loginWithToken({ token: websiteToken });
      return;
    }
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/dashboard/wallet"); // redirect if already logged in
    } else {
      setShowPage(true);
    }
  }, [searchParams, router]);

  if (!showPage) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative w-full h-screen bg-gray-800 flex justify-center items-center">
      <OverLayEffect />
      <form onSubmit={handleSubmit(submit)}>
        <div className="absolute inset-0 flex justify-center items-center text-white text-4xl font-bold z-20">
          <div className="flex justify-center items-center h-screen w-full">
            <div className="w-full lg:w-1/3 z-100 m-2 lg:m-0">
              <div className="rounded-[14px] bg-[rgba(0,0,0,0.7)] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.06),0px_2px_30px_0px_rgba(0,0,0,0.22),0px_0px_1px_0px_rgba(255,255,255,0.15)_inset] backdrop-blur-[25px] border border-white/50 p-4">
                <div className="flex flex-col gap-4">
                  <h1 className="text-xl font-normal">
                    {t("auth.log_into_your_account")}
                  </h1>
                  <Input
                    label={t("auth.email")}
                    type="email"
                    size="md"
                    labelPlacement="outside"
                    isRequired
                    placeholder={t("auth.enter_your_email")}
                    variant="bordered"
                    className="mt-10"
                    isInvalid={errors.email ? true : false}
                    errorMessage={String(errors.email?.message || "")}
                    {...register("email")}
                  />
                  <Input
                    endContent={
                      <button
                        aria-label="toggle password visibility"
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    isRequired
                    labelPlacement="outside"
                    {...register("password")}
                    label={t("auth.password")}
                    type={isVisible ? "text" : "password"}
                    variant="bordered"
                    placeholder={t("auth.enter_your_password")}
                    className="mt-10"
                    isInvalid={errors.password ? true : false}
                    errorMessage={String(errors.password?.message || "")}
                  />
                </div>
                <div className="flex justify-end">
                  {true && (
                    <Link
                      href={"/auth/forgot-password"}
                      className="text-[12px] font-normal text-primary underline"
                    >
                      {t("auth.forgot_password")}
                    </Link>
                  )}
                </div>
                <Button
                  color="primary"
                  className="mt-4 w-full"
                  radius="full"
                  type="submit"
                >
                  {t("auth.continue")}
                </Button>

                <div className="flex justify-center items-center mt-4">
                  <p className="text-sm font-normal text-white">
                    {t("auth.or")}
                  </p>
                </div>
                <Button
                  color="default"
                  className="mt-4 w-full bg-black text-white dark:bg-white dark:text-black"
                  radius="full"
                  onPress={handleGoogleLogin}
                  type="button"
                >
                  <div className="flex justify-between items-center">
                    <GoogleIcon />
                    <p className="text-sm font-normal">
                      {t("auth.google_login")}
                    </p>
                  </div>
                </Button>
                <div className="flex justify-center items-center mt-4">
                  <p className="text-sm font-normal text-white">
                    {t("auth.dont_have_account")}
                    <Link
                      href={"/auth/register"}
                      className="text-sm font-normal text-primary underline ms-2"
                    >
                      {t("auth.register")}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

// Main page component with Suspense boundary
const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
};

export default Page;
