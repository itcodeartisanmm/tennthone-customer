import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Select,
    SelectItem,
} from "@heroui/react";
import { useTranslation } from "react-i18next";
import { TopUpBalanceRequest } from "@/lib/api/types";
import { UseFormRegister, FieldErrors, UseFormHandleSubmit, UseFormSetError } from "react-hook-form";
import { topupService } from "@/lib/api/services";
import { toast } from "react-hot-toast";
interface TopupBalanceProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    handleSubmit: UseFormHandleSubmit<TopUpBalanceRequest>;
    register: UseFormRegister<TopUpBalanceRequest>;
    errors: FieldErrors<TopUpBalanceRequest>;
    setError: UseFormSetError<TopUpBalanceRequest>;
}

const TopUpBalanceModal = ({
    isOpen,
    onOpenChange,
    handleSubmit,
    register,
    errors,
    setError,
}: TopupBalanceProps) => {
    const { t } = useTranslation();

    const handleTopUpSubmit = async (data: TopUpBalanceRequest) => {
        const res = await topupService.topUpBalance(data);
        if (res.success) {
            toast.success('Top Up Successfully');
            onOpenChange(false);
        }
    };
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <form onSubmit={handleSubmit(handleTopUpSubmit)}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Top Up Balance
                            </ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-4">
                                    <Input
                                        label="Amount (Ks)"
                                        labelPlacement="outside"
                                        placeholder="Enter amount"
                                        type="number"
                                        isInvalid={errors.amount ? true : false}
                                        errorMessage={String(errors.amount?.message || "")}
                                        {...register("amount", {
                                            required: "Amount is required",
                                            min: {
                                                value: 1,
                                                message: "Amount must be greater than 0",
                                            },
                                        })}
                                    />
                                    <span className="text-sm leading-5 font-normal text-[#F31260]">
                                        {t(
                                            "dashboard.wallet.withdrawal.description"
                                        )}
                                    </span>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    type="button"
                                    color="default"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    {t("common.cancel")}
                                </Button>
                                <Button
                                    color="primary"
                                    type="submit"
                                >
                                    {t("common.submit")}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </form>
        </Modal>
    );
};

export default TopUpBalanceModal;
