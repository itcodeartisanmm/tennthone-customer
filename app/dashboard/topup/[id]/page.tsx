'use client'
import { Button, Card, CardBody, CardHeader } from '@heroui/react';
import { topupService } from '@/lib/api/services';
import { TopUpInterface } from '@/lib/api/types';
import { format } from 'date-fns';
import { LeftArrowIcon } from '@/components/icons';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const page = () => {
    const { id } = useParams();
    const router = useRouter();
    const [topup, setTopup] = useState<TopUpInterface | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        topupService.getTopupById(id as string).then((res) => {
            setTopup(res.data.topup);
            setIsLoading(false);
        });
    }, []);

    if (isLoading || !topup) {
        return <div className="p-4">Loading...</div>;
    }

    const statusColorMap = {
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

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Top-up Details</h1>
            {/* back button  */}
            <Button
                startContent={<LeftArrowIcon />}
                variant="flat"
                color="default"
                className="mb-5 w-fit"
                onPress={() => {
                    router.back();
                }}
            >
                Back
            </Button>
            <div className="grid gap-4">
                <Card>
                    <CardHeader className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Transaction Information</h2>
                        <span className={`px-3 py-1 rounded-full text-sm ${statusColorMap[topup.status as keyof typeof statusColorMap] === 'success' ? 'bg-green-100 text-green-800' :
                            statusColorMap[topup.status as keyof typeof statusColorMap] === 'danger' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                            }`}>
                            {statusTextMap[topup.status as keyof typeof statusTextMap]}
                        </span>
                    </CardHeader>
                    <CardBody>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-500">Transaction No</p>
                                <p className="font-medium">{topup.transaction_no}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Date & Time</p>
                                <p className="font-medium">{format(new Date(topup.created_at), 'PPP p')}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Amount</p>
                                <p className="font-medium">{topup.amount} Ks</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Payment Method</p>
                                <p className="font-medium">
                                    {paymentMethodTextMap[topup.payment_method as keyof typeof paymentMethodTextMap]}
                                </p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );

};

export default page; 