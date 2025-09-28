'use client'

import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface BarChartProps {
  data: Array<{
    name: string
    value: number
    [key: string]: any
  }>
  bars: Array<{
    dataKey: string
    fill: string
    name: string
  }>
  height?: number
  showGrid?: boolean
  showTooltip?: boolean
}

export default function BarChart({
  data,
  bars,
  height = 300,
  showGrid = true,
  showTooltip = true
}: BarChartProps) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
          <XAxis 
            dataKey="name" 
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
          )}
          {bars.map((bar, index) => (
            <Bar
              key={index}
              dataKey={bar.dataKey}
              fill={bar.fill}
              radius={[4, 4, 0, 0]}
              name={bar.name}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}



