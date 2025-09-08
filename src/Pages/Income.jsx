import { useEffect, useMemo, useState } from 'react'
import axiosInstance from '../utils/axiosInstance.js'
import { API } from '../utils/apiPath.js'
import toast from 'react-hot-toast'
import ConfirmDialog from '../Components/ConfirmDialog.jsx'
import { fmtMoney, fmtDate } from '../utils/format.js'
import { saveAs } from 'file-saver'

export default function Incomes() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ source: '', amount: '', date: '', icon: '' })
  const [deleteId, setDeleteId] = useState(null)

  const load = () =>
    axiosInstance.get(API.INCOME.LIST).then(res => setItems(res.data || []))
  useEffect(() => { load() }, [])

  const onAdd = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance.post(API.INCOME.ADD, {
        source: form.source,
        amount: Number(form.amount),
        date: form.date,
        icon: form.icon || null
      })
      toast.success('Income added')
      setForm({ source: '', amount: '', date: '', icon: '' })
      load()
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to add')
    }
  }

  const onDelete = async () => {
    try {
      await axiosInstance.delete(API.INCOME.DELETE(deleteId))
      toast.success('Deleted')
      setDeleteId(null)
      load()
    } catch (e) {
      toast.error('Delete failed')
    }
  }

  const onDownload = async () => {
    try {
      const res = await axiosInstance.get(API.INCOME.DOWNLOAD, { responseType: 'blob' })
      saveAs(res.data, 'incomes.xlsx')
    } catch {
      toast.error('Download failed')
    }
  }

  const total = useMemo(
    () => items.reduce((s, i) => s + (Number(i.amount) || 0), 0),
    [items]
  )

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-6">
      {/* --- Income List --- */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4 overflow-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold">All Incomes</div>
          <button onClick={onDownload} className="px-3 py-1.5 rounded-md bg-white/10">
            Download
          </button>
        </div>
        <table className="w-full text-sm">
          <thead className="text-slate-400">
            <tr>
              <th className="text-left p-2">Source</th>
              <th className="text-right p-2">Amount</th>
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Icon</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map(row => (
              <tr key={row._id} className="border-t border-white/10">
                <td className="p-2">{row.source}</td>
                <td className="p-2 text-right">{fmtMoney(row.amount)}</td>
                <td className="p-2">{fmtDate(row.date)}</td>
                <td className="p-2">{row.icon ? <img src={row.icon} alt="icon" className="w-6 h-6" /> : '-'}</td>
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
              <td colSpan={3}></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* --- Add Income Form --- */}
      <form
        onSubmit={onAdd}
        className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-3"
      >
        <div className="text-lg font-semibold">Add Income</div>
        <input
          className="w-full px-3 py-2 rounded-md bg-white/10"
          placeholder="Source"
          value={form.source}
          onChange={e => setForm(f => ({ ...f, source: e.target.value }))}
        />
        <input
          type="number"
          className="w-full px-3 py-2 rounded-md bg-white/10"
          placeholder="Amount"
          value={form.amount}
          onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
        />
        <input
          type="date"
          className="w-full px-3 py-2 rounded-md bg-white/10"
          value={form.date}
          onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
        />
        <input
          className="w-full px-3 py-2 rounded-md bg-white/10"
          placeholder="Icon URL (optional)"
          value={form.icon}
          onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}
        />
        <button className="w-full bg-emerald-600 hover:bg-emerald-500 rounded-md py-2">
          Add Income
        </button>
      </form>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete this income?"
        onCancel={() => setDeleteId(null)}
        onConfirm={onDelete}
      />
    </div>
  )
}
