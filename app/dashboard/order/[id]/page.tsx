'use client'
import React, { useEffect, useState } from "react";
import { Chip, Divider, Button } from "@heroui/react";
import { useParams } from "next/navigation";
import { orderService } from "@/lib/api/services";
import { OrderDetailsInterface, OrderItemInterface } from "@/lib/api/types";
import { LeftArrowIcon } from "@/components/icons";
import { useRouter } from "next/navigation";
import { OrderDetailCard } from "./OrderDetailCard";
import { OrderDetailCardBody } from "./OrderDetailCardBody";
import { OrderItemCard } from "./OrderItemCard";

export default function OrderDetail() {
    const [order, setOrder] = useState<OrderDetailsInterface | null>(null);
    const router = useRouter();
    const { id } = useParams();
    const totalPrice = order?.order_items?.reduce(
        (acc: number, item: OrderItemInterface) => acc + item.product.price,
        0
    );
    const totalOrderItems = order?.order_items?.reduce(
        (acc: number, item: OrderItemInterface) => acc + item.quantity,
        0
    );
    const orderStatus = [
        { id: 1, name: "Pending" },
        { id: 2, name: "Processing" },
        { id: 3, name: "Shipped" },
        { id: 4, name: "Delivered" },
        { id: 5, name: "Cancelled" },
    ];
    const shippingCost = (totalPrice ?? 0) * 0.1;
    const discount = (totalPrice ?? 0) * 0.05;

    useEffect(() => {
        orderService.getOrderDetails({ id: Number(id) }).then((res) => {
            setOrder(res.data.order);
        });
    }, []);

    return (
        <div className="p-4 mx-10">
            <div className="flex flex-col">
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
                {/* header  */}
                <div className="flex flex-row justify-between">
                    <div>
                        <div className="flex flex-row">
                            <h1 className="text-xl leading-7 font-semibold me-5">
                                Order ID : {order?.order_no}
                            </h1>
                            <Chip color="success" variant="solid">
                                {
                                    orderStatus.find(
                                        (status) => status.id === order?.status
                                    )?.name
                                }
                            </Chip>
                        </div>
                        <small>
                            <span> From </span>
                            <span className="text-primary">
                                {order?.website.title}
                            </span>
                        </small>
                    </div>
                    <div>
                        <Button variant="flat" color="default">
                            Download Invoice
                        </Button>
                    </div>
                </div>
                <Divider className="my-5" />

                {/* order content  */}
                <div className="flex flex-row gap-5">
                    <div className="w-5/12">
                        <div className="flex flex-col gap-5">
                            {/* order summary  */}
                            <OrderDetailCard
                                subtitle={null}
                                title="Order Summary"
                                children={
                                    <>
                                        <OrderDetailCardBody
                                            label="Subtotal"
                                            description={`${totalOrderItems} items`}
                                            value={`${(totalPrice ?? 0)} (Ks)`}
                                        />
                                        <OrderDetailCardBody
                                            label="Discount"
                                            description="New Customer Discount"
                                            value={`${(discount ?? 0)} (Ks)`}
                                        />
                                        <OrderDetailCardBody
                                            label="Shipping"
                                            description="Shipping Cost"
                                            value={`${(shippingCost ?? 0)} (Ks)`}
                                        />
                                        <Divider className="my-5" />
                                        <OrderDetailCardBody
                                            label="Total"
                                            description="Total Amount"
                                            value={`${(totalPrice ?? 0) + shippingCost - discount
                                                } (Ks)`}
                                        />
                                    </>
                                }
                            />

                            {/* Transaction details  */}
                            <OrderDetailCard
                                title="Transaction Details"
                                subtitle={null}
                                children={
                                    <>
                                        <OrderDetailCardBody
                                            description={null}
                                            label="Transaction ID"
                                            value={
                                                order?.transaction_no ?? ""
                                            }
                                        />
                                        <OrderDetailCardBody
                                            description={null}
                                            label="Transaction Date"
                                            value={
                                                order?.created_at ?? ""
                                            }
                                        />
                                        <Divider className="my-5" />
                                        <OrderDetailCardBody
                                            description={null}
                                            label="Transaction Status"
                                            value={order?.transaction_status ?? ""}
                                        />
                                        <OrderDetailCardBody
                                            description={null}
                                            label="Transaction Amount"
                                            value={`${(order?.transaction_amount ?? 0) - 0.5}`}
                                        />
                                        <OrderDetailCardBody
                                            description={null}
                                            label="Transaction Fee"
                                            value={"0.5"}
                                        />
                                        <Divider className="my-5" />
                                        <OrderDetailCardBody
                                            description={null}
                                            label="Your Balance"
                                            value={`${(order?.transaction_amount ?? 0) - 0.5}`}
                                        />
                                    </>
                                }
                            />
                        </div>
                    </div>
                    <div className="w-7/12">
                        <div className="flex flex-col gap-5">
                            {/* Order items  */}
                            <OrderDetailCard
                                title="Order Items"
                                subtitle={`${totalOrderItems} items`}
                                children={
                                    <>
                                        {order?.order_items?.map((item) => (
                                            <OrderItemCard
                                                key={item.id}
                                                item={item}
                                            />
                                        ))}
                                    </>
                                }
                            />
                            {/* customer details  */}
                            <OrderDetailCard
                                subtitle={null}
                                title="Customer Details"
                                children={
                                    <>
                                        <OrderDetailCardBody
                                            description={null}
                                            label="Customer ID"
                                            value={`${order?.customer.id}`}
                                        />
                                        <OrderDetailCardBody
                                            description={null}
                                            label="Customer Name"
                                            value={order?.customer.name ?? ""}
                                        />
                                        <OrderDetailCardBody
                                            description={null}
                                            label="Customer Email"
                                            value={order?.customer.email ?? ""}
                                        />
                                    </>
                                }
                            />

                            {/* Delivery Details  */}
                            <OrderDetailCard
                                subtitle={null}
                                title="Delivery Details"
                                children={
                                    <>
                                        <OrderDetailCardBody
                                            description={null}
                                            label="Delivery ID"
                                            value={"1234567890"}
                                        />
                                        <OrderDetailCardBody
                                            description={null}
                                            label="Customer Name"
                                            value={"John Doe"}
                                        />
                                        <OrderDetailCardBody
                                            description={null}
                                            label="Phone Number"
                                            value={"09977777777"}
                                        />
                                        <OrderDetailCardBody
                                            description={null}
                                            label="Address"
                                            value={"123 Main St, Anytown, USA"}
                                        />
                                        <OrderDetailCardBody
                                            description={null}
                                            label="Note"
                                            value="Please deliver to the front door"
                                        />
                                    </>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


