import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function BalanceChart({ monthly }) {
  const data = (monthly || []).map(m => ({
    name: m.name, // ✅ changed from m.month → m.name
    balance: (m.income || 0) - (m.expense || 0),
  }))

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="balance" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
