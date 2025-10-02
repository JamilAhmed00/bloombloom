import { NextResponse } from "next/server"

// Citizen science photo upload API
export async function POST(request: Request) {
  const formData = await request.formData()
  const photo = formData.get("photo")
  const location = formData.get("location")
  const crop = formData.get("crop")
  const notes = formData.get("notes")

  // In production, this would:
  // 1. Upload photo to storage (Vercel Blob)
  // 2. Extract metadata and GPS coordinates
  // 3. Run ML validation on the image
  // 4. Store in database
  // 5. Award points to user

  const submission = {
    id: Math.random().toString(36).substr(2, 9),
    status: "validated",
    points: 50,
    location,
    crop,
    notes,
    timestamp: new Date().toISOString(),
    validation: {
      isBloom: true,
      confidence: 0.85 + Math.random() * 0.15,
      matchesPrediction: Math.random() > 0.3,
    },
  }

  return NextResponse.json(submission)
}

export async function GET() {
  // Return recent community observations
  const observations = [
    {
      id: "1",
      user: "Farmer Rahman",
      crop: "Mango",
      location: "Rajshahi, Bangladesh",
      photo: "/mango-blossom.jpg",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      points: 50,
    },
    {
      id: "2",
      user: "Student Priya",
      crop: "Lotus",
      location: "Sylhet, Bangladesh",
      photo: "/lotus-bloom.jpg",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      points: 50,
    },
  ]

  return NextResponse.json(observations)
}
