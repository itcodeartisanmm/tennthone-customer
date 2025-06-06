'use client'
import { orderService } from '@/lib/api/services';
import React, { useEffect, useState } from 'react'
import OrderSearch from './OrderSearch';
import OrderTable from './OrderTable';
import { OrderInterface, PaginationInterface } from '@/lib/api/types';
import { BackButtonIcon } from '@/components/icons';
import { Button, Link } from '@heroui/react';
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter();
    const [orders, setOrders] = useState<OrderInterface[]>([]);
    const [pagination, setPagination] = useState<PaginationInterface>({
        total: 0,
        page: 1,
        limit: 10,
        total_pages: 0,
    });

    useEffect(() => {
        orderService.getOrders({ page: pagination.page, limit: pagination.limit }).then((res) => {
            setOrders(res.data.orders);
            setPagination({ ...res.data.pagination });
        });
    }, [pagination.page, pagination.limit]);

    return (
        <div className="p-4 mx-10">
            <div className="flex flex-row justify-between">
                <Button variant="flat" color="primary" startContent={<BackButtonIcon />} onPress={() => router.back()}>Back</Button>
            </div>
            <div className="flex flex-col gap-4 mt-20">
                <div className="flex flex-col gap-2">
                    <h1 className="text-lg leading-7 font-medium"> Orders </h1>
                    <p className="text-xs leading-4 font-normal text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                        et massa mi. Aliquam in hendrerit urna. Pellentesque sit
                        amet sapien fringilla, mattis ligula consectetur.
                    </p>
                </div>
                <OrderSearch />
                <OrderTable orders={orders} setOrders={setOrders} pagination={pagination} setPagination={setPagination} />
            </div>
        </div>
    )
}

export default page
