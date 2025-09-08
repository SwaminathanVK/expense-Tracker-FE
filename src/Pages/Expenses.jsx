import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API } from "../utils/apiPath.js";
import toast from "react-hot-toast";
import ConfirmDialog from "../Components/ConfirmDialog.jsx";
import { fmtMoney, fmtDate } from "../utils/format.js";
import { saveAs } from "file-saver";

export default function Expenses() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Load expenses
  const load = async () => {
    try {
      const res = await axiosInstance.get(API.EXPENSE.LIST);
      setItems(res.data || []);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
      toast.error("Failed to load expenses");
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Add expense
  const onAdd = async (e) => {
    e.preventDefault();
    if (!form.category || !form.amount || !form.date) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post(API.EXPENSE.ADD, {
        ...form,
        amount: Number(form.amount),
      });
      toast.success("Expense added");
      setForm({ category: "", amount: "", date: "", icon: "" });
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add");
    } finally {
      setLoading(false);
    }
  };

  // Delete expense
  const onDelete = async () => {
    try {
      await axiosInstance.delete(API.EXPENSE.DELETE(deleteId));
      toast.success("Expense deleted");
      setDeleteId(null);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  // Download Excel
  const onDownload = async () => {
    setDownloading(true);
    try {
      const res = await axiosInstance.get(API.EXPENSE.DOWNLOAD, {
        responseType: "blob",
      });
      const fileName = `expenses_${new Date().toISOString().split("T")[0]}.xlsx`;
      saveAs(res.data, fileName);
    } catch {
      toast.error("Download failed");
    } finally {
      setDownloading(false);
    }
  };

  // Total amount
  const total = useMemo(
    () => items.reduce((sum, i) => sum + (Number(i.amount) || 0), 0),
    [items]
  );

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-6">
      {/* Expenses Table */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4 overflow-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold">All Expenses</div>
          <button
            onClick={onDownload}
            disabled={downloading}
            className="px-3 py-1.5 rounded-md bg-white/10 disabled:opacity-50"
          >
            {downloading ? "Downloading..." : "Download"}
          </button>
        </div>
        <table className="w-full text-sm">
          <thead className="text-slate-400">
            <tr>
              <th className="text-left p-2">Category</th>
              <th className="text-right p-2">Amount</th>
              <th className="text-left p-2">Date</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={row._id} className="border-t border-white/10">
                <td className="p-2">{row.category}</td>
                <td className="p-2 text-right">{fmtMoney(row.amount)}</td>
                <td className="p-2">{fmtDate(row.date)}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => setDeleteId(row._id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-white/10 font-semibold">
              <td className="p-2">Total</td>
              <td className="p-2 text-right">{fmtMoney(total)}</td>
              <td colSpan={2}></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Add Expense Form */}
      <form
        onSubmit={onAdd}
        className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-3"
      >
        <div className="text-lg font-semibold">Add Expense</div>
        <input
          className="w-full px-3 py-2 rounded-md bg-white/10"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          required
        />
        <input
          type="number"
          className="w-full px-3 py-2 rounded-md bg-white/10"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
          required
        />
        <input
          type="date"
          className="w-full px-3 py-2 rounded-md bg-white/10"
          value={form.date}
          onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
          required
        />
        <input
          className="w-full px-3 py-2 rounded-md bg-white/10"
          placeholder="Icon (optional)"
          value={form.icon}
          onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
        />
        <button
          disabled={loading}
          className="w-full bg-rose-600 hover:bg-rose-500 rounded-md py-2 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Expense"}
        </button>
      </form>

      {/* Confirm Delete */}
      <ConfirmDialog
        open={!!deleteId}
        title="Delete this expense?"
        onCancel={() => setDeleteId(null)}
        onConfirm={onDelete}
      />
    </div>
  );
}
