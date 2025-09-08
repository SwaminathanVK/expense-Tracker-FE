export default function ConfirmDialog({ open, title, onCancel, onConfirm }) {
    if (!open) return null
    return (
      <div className="fixed inset-0 bg-black/50 grid place-items-center z-50">
        <div className="bg-slate-900 border border-white/10 rounded-xl p-6 w-[90%] max-w-md">
          <div className="text-lg font-semibold">{title}</div>
          <div className="mt-4 flex justify-end gap-3">
            <button onClick={onCancel} className="px-3 py-1.5 rounded-md bg-white/10">Cancel</button>
            <button onClick={onConfirm} className="px-3 py-1.5 rounded-md bg-red-600">Delete</button>
          </div>
        </div>
      </div>
    )
  }
  