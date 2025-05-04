'use client'
import { orderService, topupService } from '@/lib/api/services';
import React, { useEffect, useState } from 'react'
import { TopUpInterface, PaginationInterface } from '@/lib/api/types';
import { BackButtonIcon } from '@/components/icons';
import { Button, Link } from '@heroui/react';
import { useRouter } from 'next/navigation';
import TopupSearch from './TopupSearch';
import TopupTable from './TopupTable';

const page = () => {
    const router = useRouter();
    const [topups, setTopups] = useState<TopUpInterface[]>([]);
    const [pagination, setPagination] = useState<PaginationInterface>({
        total: 0,
        page: 1,
        limit: 10,
        total_pages: 0,
    });

    useEffect(() => {
        topupService.getTopups({ page: pagination.page, limit: pagination.limit }).then((res) => {
            setTopups(res.data.topups);
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
                    <h1 className="text-lg leading-7 font-medium"> Topups </h1>
                    <p className="text-xs leading-4 font-normal text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                        et massa mi. Aliquam in hendrerit urna. Pellentesque sit
                        amet sapien fringilla, mattis ligula consectetur.
                    </p>
                </div>
                <TopupSearch />
                <TopupTable topups={topups} setTopups={setTopups} pagination={pagination} setPagination={setPagination} />
            </div>
        </div>
    )
}

export default page
