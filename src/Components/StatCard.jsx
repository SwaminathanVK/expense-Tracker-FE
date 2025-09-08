export default function StatCard({ title, value, hint }) {
    return (
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
        <div className="text-sm text-slate-400">{title}</div>
        <div className="text-2xl font-semibold mt-2">{value}</div>
        {hint && <div className="text-xs text-slate-500 mt-1">{hint}</div>}
      </div>
    )
  }
  