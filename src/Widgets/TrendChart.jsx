import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export default function TrendChart({ monthly }) {
  const data = (monthly || []).map(m => ({
    name: m.name, // ✅ changed from m.month → m.name
    income: m.income || 0,
    expense: m.expense || 0,
  }))

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="income" strokeWidth={2} fillOpacity={0.2} />
          <Area type="monotone" dataKey="expense" strokeWidth={2} fillOpacity={0.2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
