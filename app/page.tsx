"use client";
import { authService } from "@/lib/api/services";
import { useEffect, useState } from "react";
export default function Home() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    authService.getCurrentUser().then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <p>{user?.email}</p>
    </div>
  );
}
