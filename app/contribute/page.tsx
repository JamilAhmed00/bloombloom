import { CitizenScienceUpload } from "@/components/citizen-science-upload"
import { Button } from "@/components/ui/button"
import { ArrowLeft, HelpCircle, Award } from "lucide-react"
import Link from "next/link"

export default function ContributePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Citizen Science</h1>
                <p className="text-sm text-muted-foreground">Contribute bloom observations and earn rewards</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <HelpCircle className="w-4 h-4 mr-2" />
                Guidelines
              </Button>
              <Button variant="outline" size="sm">
                <Award className="w-4 h-4 mr-2" />
                My Rewards
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-balance">Help Map Global Bloom Patterns</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Upload photos of blooming plants in your area to validate NASA predictions and contribute to climate
              research. Every observation helps!
            </p>
          </div>

          <CitizenScienceUpload />
        </div>
      </main>
    </div>
  )
}
