import { Button, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import React from "react";
import { userService } from "@/lib/api/services";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { UpdatePasswordRequest } from "@/lib/api/types";
const UpdatePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UpdatePasswordRequest>();
  const { t } = useTranslation();
  const onSubmit = async (data: UpdatePasswordRequest) => {
    try {
      const res = await userService.updatePassword(data);

      if (res.success) {
        toast.success(t("common.password_updated_successfully"));
      } else {
        toast.error(t("common.password_update_failed"));
      }
    } catch (error: any) {
      if (error.response?.status === 422) {
        const responseErrors = error.response.data.errors;
        Object.entries(responseErrors).forEach(([field, messages]) => {
          setError(field as keyof UpdatePasswordRequest, {
            type: "server",
            message: (messages as string[])[0],
          });
        });
      } else {
        toast.error(t("common.something_went_wrong"));
      }
    }
  };

  return (
    <section>
      <header>
        <h2 className="text-lg font-bold leading-7 text-white">
          Update Password
        </h2>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <div className="flex flex-col gap-4">
          <Input
            label="Current Password"
            labelPlacement="outside"
            placeholder="Current Password"
            {...register("old_password")}
            type="password"
            className="mt-1 block w-full"
            isRequired
            errorMessage={String(errors.old_password?.message || "")}
            isInvalid={!!errors.old_password?.message}
          />

          <Input
            label="New Password"
            labelPlacement="outside"
            placeholder="New Password"
            {...register("password")}
            type="password"
            className="mt-1 block w-full"
            isRequired
            errorMessage={String(errors.password?.message || "")}
            isInvalid={!!errors.password?.message}
          />
          <Input
            label="Confirm Password"
            labelPlacement="outside"
            placeholder="Confirm Password"
            {...register("confirm_password")}
            type="password"
            className="mt-1 block w-full"
            isRequired
            errorMessage={String(errors.confirm_password?.message || "")}
            isInvalid={!!errors.confirm_password?.message}
          />
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit" className="bg-primary text-white rounded-full">
            Save
          </Button>
        </div>
      </form>
    </section>
  );
};

export default UpdatePasswordForm;
