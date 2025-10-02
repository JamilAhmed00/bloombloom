import { NextResponse } from "next/server"

// Mock bloom data - in production, this would fetch from NASA Earth data APIs
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const region = searchParams.get("region")
  const crop = searchParams.get("crop")
  const month = searchParams.get("month")

  // Simulate bloom data from NASA Earth observations
  const bloomData = {
    region: region || "global",
    crop: crop || "all",
    month: month || new Date().getMonth() + 1,
    intensity: Math.random() * 100,
    temperature: 20 + Math.random() * 15,
    rainfall: Math.random() * 200,
    ndvi: 0.3 + Math.random() * 0.5, // Normalized Difference Vegetation Index
    prediction: {
      peakDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      confidence: 0.7 + Math.random() * 0.3,
      anomaly: Math.random() > 0.7 ? "early" : Math.random() > 0.5 ? "late" : "normal",
    },
    timestamp: new Date().toISOString(),
  }

  return NextResponse.json(bloomData)
}
