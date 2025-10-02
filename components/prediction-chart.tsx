"use client"

import { Card } from "@/components/ui/card"

interface DataPoint {
  date: string
  predicted: number
  actual: number
}

const sampleData: DataPoint[] = [
  { date: "Week 1", predicted: 15, actual: 14 },
  { date: "Week 2", predicted: 22, actual: 23 },
  { date: "Week 3", predicted: 28, actual: 27 },
  { date: "Week 4", predicted: 35, actual: 36 },
  { date: "Week 5", predicted: 42, actual: 41 },
  { date: "Week 6", predicted: 48, actual: 49 },
]

export function PredictionChart() {
  const maxValue = Math.max(...sampleData.flatMap((d) => [d.predicted, d.actual]))

  return (
    <Card className="p-6 bg-white border-slate-200">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Bloom Timing Predictions vs Actual</h3>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-600" />
              <span className="text-slate-600">Predicted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-600" />
              <span className="text-slate-600">Actual</span>
            </div>
          </div>
        </div>

        <div className="relative h-64">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-slate-600 font-medium">
            <span>{maxValue}</span>
            <span>{Math.floor(maxValue / 2)}</span>
            <span>0</span>
          </div>

          {/* Chart area */}
          <div className="ml-8 h-full flex items-end justify-between gap-2">
            {sampleData.map((point, index) => {
              const predictedHeight = (point.predicted / maxValue) * 100
              const actualHeight = (point.actual / maxValue) * 100

              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center gap-1 h-56">
                    {/* Predicted bar */}
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all hover:opacity-80 cursor-pointer relative group shadow-sm"
                      style={{ height: `${predictedHeight}%` }}
                    >
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">
                        {point.predicted}
                      </span>
                    </div>
                    {/* Actual bar */}
                    <div
                      className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t transition-all hover:opacity-80 cursor-pointer relative group shadow-sm"
                      style={{ height: `${actualHeight}%` }}
                    >
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">
                        {point.actual}
                      </span>
                    </div>
                  </div>
                  {/* X-axis label */}
                  <span className="text-xs text-slate-600 font-medium">{point.date}</span>
                </div>
              )
            })}
          </div>
        </div>

        <p className="text-xs text-slate-600 text-center font-medium">Days from planting to bloom onset</p>
      </div>
    </Card>
  )
}
