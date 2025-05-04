import { OrderInterface, PaginationInterface, statusColorInterface, TopUpInterface } from '@/lib/api/types'
import { Button } from '@heroui/react';
import { Chip } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { topupService } from '@/lib/api/services';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from '@heroui/react';
const TopupTable = ({ topups, setTopups, pagination, setPagination }:
    {
        topups: TopUpInterface[],
        setTopups: (topups: TopUpInterface[]) => void,
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

    const paymentMethodTextMap = {
        1: "Bank Transfer",
        2: "Cash on Delivery",
        3: "Dinger",
        4: "Paypal",
        5: "Stripe",
    };
    const renderCell = React.useCallback((topup: TopUpInterface, columnKey: string) => {
        const cellValue = topup[columnKey as keyof TopUpInterface];

        switch (columnKey) {
            case "status":
                return (
                    <Chip
                        className="capitalize"
                        color={statusColorMap[topup.status as keyof typeof statusColorMap]}
                        size="sm"
                        variant="flat"
                    >
                        {statusTextMap[topup.status as keyof typeof statusTextMap]}
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
            case "payment_method":
                return (
                    <small className="text-sm leading-5 font-medium">
                        {paymentMethodTextMap[topup.payment_method as keyof typeof paymentMethodTextMap]}
                    </small>
                );
            default:
                return cellValue;
        }
    }, []);

    const handlePageChange = (page: number) => {
        setPagination({ ...pagination, page });
        topupService.getTopups({ page, limit: pagination.limit }).then((res) => {
            setTopups(res.data.topups);
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
                    <TableColumn key="transaction_no">Transaction No</TableColumn>
                    <TableColumn key="created_at"> Date Time </TableColumn>
                    <TableColumn key="amount"> Amount (Ks) </TableColumn>
                    <TableColumn key="status"> Status </TableColumn>
                    <TableColumn key="payment_method">
                        Payment Method
                    </TableColumn>
                    <TableColumn key="actions">Action</TableColumn>
                </TableHeader>
                <TableBody items={topups}>
                    {(item) => (
                        <TableRow
                            key={item.id}
                            className="cursor-pointer"
                            onClick={() => {
                                router.push(`/dashboard/topup/${item.id}`);
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

export default TopupTable
