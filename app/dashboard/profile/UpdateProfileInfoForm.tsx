'use client'
import { useForm } from "react-hook-form";
import { Input, Button } from "@heroui/react";
import { Link } from "@heroui/link";
import { userService } from "@/lib/api/services";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
interface IFormInput {
    name: string;
    email: string;
}

const UpdateProfileInfoForm = ({ user }: { user: any }) => {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm<IFormInput>({
        defaultValues: {
            name: user?.name,
            email: user?.email
        }
    });

    const onSubmit = async (data: IFormInput) => {
        try {
            const res = await userService.updateProfile(data);
            if (res.success) {
                toast.success(t("common.profile_updated_successfully"));
            } else {
                toast.error(t("common.profile_update_failed"));
            }
        } catch (error: any) {
            if (error.response?.status === 422) {
                const responseErrors = error.response.data.errors;
                Object.entries(responseErrors).forEach(([field, messages]) => {
                    setError(field as keyof IFormInput, {
                        type: "server",
                        message: (messages as string[])[0],
                    });
                });
            } else {
                toast.error(t("common.something_went_wrong"));
            }
        }
    }

    useEffect(() => {
        setTimeout(() => {
            reset({
                name: user?.name,
                email: user?.email
            });
        }, 2000);
    }, [reset]);

    return (
        <section>
            <header>
                <h2 className="text-lg font-bold leading-7 text-white">
                    Account Info
                </h2>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                <div className="flex flex-col gap-4">
                    <Input
                        label="Your Name"
                        labelPlacement="outside"
                        id="name"
                        {...register("name", { required: true })}
                        isRequired
                        errorMessage={String(errors.name?.message || "")}
                        isInvalid={!!errors.name?.message}
                    />

                    <Input
                        label="Your Email"
                        labelPlacement="outside"
                        id="email"
                        {...register("email", { required: true })}
                        isRequired
                        errorMessage={String(errors.email?.message || "")}
                        isInvalid={!!errors.email?.message}
                    />
                </div>

                {user?.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={"/dashboard/verification/send"}
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <Button
                        type="submit"
                        className="bg-primary text-white rounded-full"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </section>
    );
};

export default UpdateProfileInfoForm;