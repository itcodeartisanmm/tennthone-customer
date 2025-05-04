import React from 'react'
import { OrderInterface, PaginationInterface, paymentStatusColorInterface, statusColorInterface } from '@/lib/api/types';
import { Button, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { Chip } from '@heroui/react';
import { orderService } from '@/lib/api/services';
import { useRouter } from 'next/navigation';

const OrderTable = ({ orders, setOrders, pagination, setPagination }:
    {
        orders: OrderInterface[],
        setOrders: (orders: OrderInterface[]) => void,
        pagination: PaginationInterface, setPagination:
        (pagination: PaginationInterface) => void
    }) => {
    const router = useRouter();
    const statusColorMap: statusColorInterface = {
        1: "success",
        0: "danger",
        2: "warning",
        3: "warning",
        4: "warning",
    };

    const statusTextMap = {
        1: "Active",
        0: "Inactive",
        2: "Pending",
        3: "Expired",
        4: "Expired",
    };

    const paymentStatusTextMap = {
        1: "Paid",
        0: "Unpaid",
        2: "Pending",
        3: "Expired",
        4: "Expired",
    };

    const paymentStatusColorMap: paymentStatusColorInterface = {
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

    const renderCell = React.useCallback((order: OrderInterface, columnKey: string) => {
        const cellValue = order[columnKey as keyof OrderInterface];

        switch (columnKey) {
            case "status":
                return (
                    <Chip
                        className="capitalize"
                        color={statusColorMap[order.status as keyof typeof statusColorMap]}
                        size="sm"
                        variant="flat"
                    >
                        {statusTextMap[order.status as keyof typeof statusTextMap]}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="flex justify-center items-center gap-2">
                        <Button
                            variant="bordered"
                            color="default"
                            size="sm"
                            radius="md"
                        >
                            Renew
                        </Button>
                    </div>
                );
            case "payment_status":
                return (
                    <Chip
                        className="capitalize"
                        color={paymentStatusColorMap[order.payment_status as keyof typeof paymentStatusColorMap]}
                        size="sm"
                        variant="flat"
                    >
                        {paymentStatusTextMap[order.payment_status as keyof typeof paymentStatusTextMap]}
                    </Chip>
                );
            case "payment_method":
                return (
                    <small className="text-sm leading-5 font-medium">
                        {paymentMethodTextMap[order.payment_method as keyof typeof paymentMethodTextMap]}
                    </small>
                );
            default:
                return cellValue;
        }
    }, []);

    const handlePageChange = (page: number) => {
        setPagination({ ...pagination, page });
        orderService.getOrders({ page, limit: pagination.limit }).then((res) => {
            setOrders(res.data.orders);
            setPagination({ ...res.data.pagination });
        });
    };
    return (
        <div className="flex flex-col gap-4">
            <Table
                aria-label="Example table with client side pagination"
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={pagination.page}
                            total={pagination.total_pages}
                            onChange={handlePageChange}
                        />
                    </div>
                }
                classNames={{
                    wrapper: "min-h-[222px]",
                }}
            >
                <TableHeader>
                    <TableColumn key="order_no">Order No</TableColumn>
                    <TableColumn key="created_at"> Date Time </TableColumn>
                    <TableColumn key="customer"> Customer Name </TableColumn>
                    <TableColumn key="website"> Website </TableColumn>
                    <TableColumn key="amount"> Amount (Ks) </TableColumn>
                    <TableColumn key="status"> Order Status </TableColumn>
                    <TableColumn key="payment_status">
                        Payment Status
                    </TableColumn>
                    <TableColumn key="payment_method">
                        Payment Method
                    </TableColumn>
                    <TableColumn key="fees"> Fees </TableColumn>
                    <TableColumn key="net_amount"> Net Amount </TableColumn>
                    <TableColumn key="actions">Action</TableColumn>
                </TableHeader>
                <TableBody items={orders}>
                    {(item) => (
                        <TableRow
                            key={item.id}
                            className="cursor-pointer"
                            onClick={() => {
                                router.push(`/dashboard/order/${item.id}`);
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

export default OrderTable
