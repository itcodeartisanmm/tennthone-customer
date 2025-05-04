import { SelectItem, Select, Input } from '@heroui/react';
import React from 'react'

const OrderSearch = () => {
    return (
        <div className="flex justify-between items-center">
            <div className="w-1/2">
                <Input
                    placeholder="Search withdrawals"
                    labelPlacement="outside"
                    className="w-1/2"
                    variant="bordered"
                    radius="md"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            console.log("Enter key pressed");
                        }
                    }}
                />
            </div>
            <div className="w-1/2">
                <div className="flex flex-row gap-2">
                    <Select placeholder="Date">
                        <SelectItem key="all">All</SelectItem>
                        <SelectItem key="withdrawal">Withdrawal</SelectItem>
                        <SelectItem key="deposit">Deposit</SelectItem>
                    </Select>
                    <Select placeholder="Website">
                        <SelectItem key="all">All</SelectItem>
                        <SelectItem key="withdrawal">Withdrawal</SelectItem>
                        <SelectItem key="deposit">Deposit</SelectItem>
                    </Select>
                    <Select placeholder="Payment Status">
                        <SelectItem key="all">All</SelectItem>
                        <SelectItem key="withdrawal">Withdrawal</SelectItem>
                        <SelectItem key="deposit">Deposit</SelectItem>
                    </Select>
                    <Select placeholder="Payment Method">
                        <SelectItem key="all">All</SelectItem>
                        <SelectItem key="withdrawal">Withdrawal</SelectItem>
                        <SelectItem key="deposit">Deposit</SelectItem>
                    </Select>
                </div>
            </div>
        </div>
    )
}

export default OrderSearch
