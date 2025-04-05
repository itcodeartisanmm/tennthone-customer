import React, { Key, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tabs,
  Tab,
} from "@heroui/react";
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  LockedIcon,
  InfoIcon,
  TaxesIcon,
} from "@/components/icons";
import BalanceBgImage from "../../../public/assets/images/backgrounds/light/balance-bg.svg";
import { walletService } from "@/lib/api/services";
import { DashboardResponse } from "@/lib/api/types";
import Image from "next/image";

const Balance = ({
  dashboardData,
  setDashboardData,
}: {
  dashboardData: DashboardResponse;
  setDashboardData: (data: DashboardResponse) => void;
}) => {
  const [showBalance, setShowBalance] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const handleTabChange = async (key: Key) => {
    const tab = await walletService.getDashboardData({ date: key as string });
    setDashboardData(tab.data);
    setActiveTab(key as string);
  };
  const tabs = [
    {
      key: "1",
      title: "Today",
      component: (
        <MetrixCards
          totalEarnings={dashboardData?.totalEarnings || 0}
          totalOrders={dashboardData?.totalOrders || 0}
          avgOrderValue={dashboardData?.avgOrderValue || 0}
          conversionRate={dashboardData?.conversionRate || 0}
        />
      ),
    },
    {
      key: "2",
      title: "Last 7 Days",
      component: (
        <MetrixCards
          totalEarnings={dashboardData?.totalEarnings || 0}
          totalOrders={dashboardData?.totalOrders || 0}
          avgOrderValue={dashboardData?.avgOrderValue || 0}
          conversionRate={dashboardData?.conversionRate || 0}
        />
      ),
    },
    {
      key: "3",
      title: "This Month",
      component: (
        <MetrixCards
          totalEarnings={dashboardData?.totalEarnings || 0}
          totalOrders={dashboardData?.totalOrders || 0}
          avgOrderValue={dashboardData?.avgOrderValue || 0}
          conversionRate={dashboardData?.conversionRate || 0}
        />
      ),
    },
    {
      key: "4",
      title: "This Year",
      component: (
        <MetrixCards
          totalEarnings={dashboardData?.totalEarnings || 0}
          totalOrders={dashboardData?.totalOrders || 0}
          avgOrderValue={dashboardData?.avgOrderValue || 0}
          conversionRate={dashboardData?.conversionRate || 0}
        />
      ),
    },
    {
      key: "5",
      title: "All Time",
      component: (
        <MetrixCards
          totalEarnings={dashboardData?.totalEarnings || 0}
          totalOrders={dashboardData?.totalOrders || 0}
          avgOrderValue={dashboardData?.avgOrderValue || 0}
          conversionRate={dashboardData?.conversionRate || 0}
        />
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-2 mx-10">
      <h1 className="text-base leading-6 font-medium">Balance</h1>
      <p className="text-xs leading-4 font-normal text-gray-500">
        Your balance is the total amount of money in your wallet.
      </p>
      <div className="flex flex-row justify-between gap-2">
        {/* your balance */}
        <div className="w-1/3">
          <div className="relative bg-white rounded-lg">
            <Image src={BalanceBgImage} alt="balance" />
            <div className="absolute top-5 left-5 z-10">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                  <p className="text-sm leading-5 font-normal text-black">
                    Balance (KS)
                  </p>
                  <span
                    role="button"
                    className="cursor-pointer"
                    onClick={() => setShowBalance(!showBalance)}
                  >
                    {showBalance ? <EyeFilledIcon /> : <EyeSlashFilledIcon />}
                  </span>
                </div>
                <p className="text-3xl leading-9 font-bold text-black">
                  {showBalance ? dashboardData?.balance : "********"}
                </p>
                <Button
                  variant="solid"
                  color="primary"
                  radius="md"
                  size="md"
                  className="mt-5"
                  onPress={() => { }}
                >
                  <LockedIcon /> Top Up Balance
                </Button>
              </div>
            </div>
            <div className="absolute bottom-5 right-5 z-10">
              <div className="flex flex-row gap-4">
                <div className="flex flex-row gap-2">
                  <p className="text-sm leading-5 font-normal text-gray-500">
                    Notice
                  </p>
                  <Popover placement="right">
                    <PopoverTrigger>
                      <span className="cursor-pointer">
                        <InfoIcon />
                      </span>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="px-1 py-2">
                        <div className="text-small font-bold text-black">
                          Popover Content
                        </div>
                        <div className="text-tiny text-gray-500">
                          This is the popover content
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/3">
          <p className="text-sm leading-5 font-medium">
            Your Earnings Overview
          </p>
          <div className="flex w-full flex-col mt-5">
            <Tabs
              aria-label="Options"
              size="sm"
              radius="md"
              selectedKey={activeTab}
              onSelectionChange={handleTabChange}
            >
              {tabs.map((tab) => (
                <Tab key={tab.key} title={tab.title}>
                  <Card>
                    <CardBody>{tab.component}</CardBody>
                  </Card>
                </Tab>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;

interface MetrixCardsProps {
  totalEarnings: number;
  totalOrders: number;
  avgOrderValue: number;
  conversionRate: number;
}

const MetrixCards = ({
  totalEarnings,
  totalOrders,
  avgOrderValue,
  conversionRate,
}: MetrixCardsProps) => {
  return (
    <MetricCard
      totalEarnings={totalEarnings}
      totalOrders={totalOrders}
      avgOrderValue={avgOrderValue}
      conversionRate={conversionRate}
    />
  );
};

const MetricCard = ({
  totalEarnings,
  totalOrders,
  avgOrderValue,
  conversionRate,
}: MetrixCardsProps) => {
  return (
    <div className="flex flex-row justify-between gap-2">
      <MetricCardItem title="Total Earnings (Ks)" value={totalEarnings} />
      <MetricCardItem title="Total Orders" value={totalOrders} />
      <MetricCardItem title="Average Order Value" value={avgOrderValue} />
      <MetricCardItem title="Conversion Rate" value={conversionRate} />
    </div>
  );
};

interface MetricCardItemProps {
  title: string;
  value: number;
}

const MetricCardItem = ({ title, value }: MetricCardItemProps) => {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg bg-[#27272A] w-1/4">
      <p className="text-sm leading-5 font-medium">{title}</p>
      <p className="text-xl leading-7 font-medium">{value}</p>
    </div>
  );
};
