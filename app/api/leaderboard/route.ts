import { NextResponse } from "next/server"

// Leaderboard API for prediction game
export async function GET() {
  // Mock leaderboard data
  const leaderboard = [
    { rank: 1, name: "Farmer Karim", country: "Bangladesh", points: 2450, accuracy: 94, streak: 12 },
    { rank: 2, name: "Student Maya", country: "India", points: 2380, accuracy: 92, streak: 10 },
    { rank: 3, name: "Dr. Chen", country: "China", points: 2290, accuracy: 91, streak: 8 },
    { rank: 4, name: "Prof. Silva", country: "Brazil", points: 2150, accuracy: 89, streak: 7 },
    { rank: 5, name: "Researcher Ali", country: "Egypt", points: 2080, accuracy: 88, streak: 9 },
  ]

  return NextResponse.json(leaderboard)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { userId, prediction, actual } = body

  // Calculate accuracy and points
  const daysDifference = Math.abs(new Date(prediction).getTime() - new Date(actual).getTime()) / (1000 * 60 * 60 * 24)

  const accuracy = Math.max(0, 100 - daysDifference * 5)
  const points = Math.round(accuracy * 10)

  return NextResponse.json({
    accuracy,
    points,
    message: accuracy > 90 ? "Excellent prediction!" : accuracy > 70 ? "Good job!" : "Keep trying!",
  })
}
