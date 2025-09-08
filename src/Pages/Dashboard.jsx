import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import { API } from "../utils/apiPath.js";
import StatCard from "../Components/StatCard.jsx";
import { fmtMoney } from "../utils/format.js";
import BalanceChart from "../Widgets/BalanceChart.jsx";
import TrendChart from "../Widgets/TrendChart.jsx";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axiosInstance.get(API.DASHBOARD.GET);
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard:", err);
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading…</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  const { totalIncome, totalExpense, totalBalance, last60daysIncome, last30daysExpense } = stats;

  // Build "monthly" array for charts from backend data
  const monthly = [
    { name: "Last 60d Income", income: last60daysIncome.total },
    { name: "Last 30d Expense", expense: last30daysExpense.total },
  ];

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard title="Total Income" value={fmtMoney(totalIncome)} />
        <StatCard title="Total Expense" value={fmtMoney(totalExpense)} />
        <StatCard title="Balance" value={fmtMoney(totalBalance)} />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <div className="mb-3 font-semibold">Balance Overview</div>
          <BalanceChart monthly={monthly} />
        </div>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <div className="mb-3 font-semibold">Income vs Expense</div>
          <TrendChart monthly={monthly} />
        </div>
      </div>
    </div>
  );
}
