import React from 'react'
import { Chip, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { IncomeInterface, statusColorInterface, paymentStatusColorInterface, paymentMethodColorInterface } from '@/lib/api/types'

const RecentIncome = ({ recentIncome }: { recentIncome: IncomeInterface[] }) => {
    const columns = [
        {
            key: "order_no",
            label: "Order ID",
        },
        {
            key: "created_at",
            label: "Date Time",
        },
        {
            key: "customer",
            label: "Customer",
        },
        {
            key: "website",
            label: "Website",
        },
        {
            key: "amount",
            label: "Amount",
        },
        {
            key: "status",
            label: "Status",
        },
        {
            key: "payment_status",
            label: "Payment Status",
        },
        {
            key: "payment_method",
            label: "Payment Method",
        },
        {
            key: "transaction_no",
            label: "Transaction No",
        },
        {
            key: "note",
            label: "Notes",
        }
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
        2: "Pending",
        3: "Processing",
        4: "Shipped",
        1: "Delivered",
        0: "Canceled",
        5: "Refunded",
    };

    const paymentStatusColorMap: paymentStatusColorInterface = {
        1: "success",
        0: "danger",
        2: "warning",
    };

    const paymentStatusTextMap = {
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

    const renderCell = React.useCallback((recentIncome: IncomeInterface, columnKey: string) => {
        const cellValue = recentIncome[columnKey as keyof IncomeInterface];
        switch (columnKey) {
            case "payment_status":
                return (
                    <Chip
                        className="capitalize"
                        color={paymentStatusColorMap[cellValue as keyof typeof paymentStatusColorMap]}
                        size="sm"
                        variant="flat"
                    >
                        {paymentStatusTextMap[cellValue as keyof typeof paymentStatusTextMap]}
                    </Chip>
                );
            case "payment_method":
                return (
                    <Chip
                        className="capitalize"
                        color={paymentMethodColorMap[cellValue as keyof typeof paymentMethodColorMap]}
                        size="sm"
                        variant="flat"
                    >
                        {paymentMethodTextMap[cellValue as keyof typeof paymentMethodTextMap]}
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
    }, []);
    return (
        <div className='mx-10'>
            <div className="flex flex-row justify-between items-center mb-4">
                <h3 className="text-base leading-6 font-medium">
                    Recent Incomes
                </h3>
                <Button size="sm" radius="sm" variant="solid" color="default">
                    View All Incomes
                </Button>
            </div>
            <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.key}
                            align={
                                column.key === "actions" ? "center" : "start"
                            }
                        >
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={recentIncome}>
                    {(item) => (
                        <TableRow
                            key={item.id}
                            className="cursor-pointer"
                            onClick={() => {
                                console.log(item);
                            }}
                        >
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(item, columnKey as string)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default RecentIncome
