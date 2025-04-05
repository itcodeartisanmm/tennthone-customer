"use client";
import { authService, walletService } from "@/lib/api/services";
import { useEffect, useState } from "react";
import Balance from "./Balance";
import RecentIncome from "./RecentIncome";
import { DashboardResponse } from "@/lib/api/types";

export default function Page() {
  const [user, setUser] = useState<any>(null);
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(
    null,
  );
  useEffect(() => {
    authService.getCurrentUser().then((res) => {
      setUser(res.data);
    });
    walletService.getDashboardData({ date: "1" }).then((res: any) => {
      setDashboardData(res.data);
    });
  }, []);

  return (
    <div>
      <div className="text-center p-20">
        <h1 className="text-6xl font-bold">
          {" "}
          Hello , <span className="text-primary"> {user?.name} </span>
        </h1>
        <p className="text-gray-500"> Welcome to your wallet </p>
      </div>
      {dashboardData && (
        <div className="flex flex-col gap-4">
          <Balance
            dashboardData={dashboardData}
            setDashboardData={setDashboardData}
          />
          {dashboardData?.recentOrders && (
            <RecentIncome recentIncome={dashboardData?.recentOrders} />
          )}
        </div>
      )}
    </div>
  );
}
