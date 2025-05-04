import React from "react";
import {
    Chip,
    Button,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@heroui/react";
import {
    statusColorInterface,
    paymentMethodColorInterface,
    TopUpInterface,
} from "@/lib/api/types";
import { useRouter } from "next/navigation";

const RecentTopUpHistory = ({
    recentTopUpHistory,
}: {
    recentTopUpHistory: TopUpInterface[];
}) => {
    const router = useRouter();
    const columns = [
        {
            key: "transaction_no",
            label: "Transaction No",
        },
        {
            key: "created_at",
            label: "Date Time",
        },
        {
            key: "amount",
            label: "Amount",
        },
        {
            key: "payment_method",
            label: "Payment Method",
        },
        {
            key: "status",
            label: "Status",
        },
    ];

    const statusColorMap: statusColorInterface = {
        1: "success",
        0: "danger",
        2: "warning",
        3: "warning",
        4: "warning",
        5: "warning",
    };

    const statusTextMap = {
        1: "Success",
        0: "Failed",
        2: "Pending",
    };

    const paymentMethodColorMap: paymentMethodColorInterface = {
        1: "success",
        0: "danger",
        2: "warning",
        3: "warning",
        4: "warning",
    };

    const paymentMethodTextMap = {
        1: "Bank Transfer",
        2: "Cash on Delivery",
        3: "Dinger",
        4: "Paypal",
        5: "Stripe",
    };

    const renderCell = React.useCallback(
        (recentTopUpHistory: TopUpInterface, columnKey: string) => {
            const cellValue = recentTopUpHistory[columnKey as keyof TopUpInterface];
            switch (columnKey) {
                case "payment_method":
                    return (
                        <Chip
                            className="capitalize"
                            color={
                                paymentMethodColorMap[
                                cellValue as keyof typeof paymentMethodColorMap
                                ]
                            }
                            size="sm"
                            variant="flat"
                        >
                            {
                                paymentMethodTextMap[
                                cellValue as keyof typeof paymentMethodTextMap
                                ]
                            }
                        </Chip>
                    );
                case "status":
                    return (
                        <Chip
                            className="capitalize"
                            color={statusColorMap[cellValue as keyof typeof statusColorMap]}
                            size="sm"
                            variant="flat"
                        >
                            {statusTextMap[cellValue as keyof typeof statusTextMap]}
                        </Chip>
                    );
                default:
                    return cellValue;
            }
        },
        [],
    );
    return (
        <div className="mx-10">
            <div className="flex flex-row justify-between items-center mb-4">
                <h3 className="text-base leading-6 font-medium">Recent Top Ups</h3>
                <Button onPress={() => router.push("/dashboard/topup")} size="sm" radius="sm" variant="solid" color="default">
                    View All Top Ups
                </Button>
            </div>
            <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.key}
                            align={column.key === "actions" ? "center" : "start"}
                        >
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={recentTopUpHistory}>
                    {(item) => (
                        <TableRow
                            key={item.id}
                            className="cursor-pointer"
                            onClick={() => {
                                router.push(`/dashboard/topup/${item.id}`);
                            }}
                        >
                            {(columnKey) => (
                                <TableCell>{renderCell(item, columnKey as string)}</TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default RecentTopUpHistory;
