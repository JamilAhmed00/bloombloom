import { BloomDashboard } from "@/components/bloom-dashboard"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, RefreshCw, Settings } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
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
                <h1 className="text-2xl font-bold">Smart Dashboard</h1>
                <p className="text-sm text-muted-foreground">Bloom analytics and climate insights</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-balance">Bloom Intelligence Dashboard</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Real-time analytics, seasonal trends, and climate correlations powered by NASA Earth data and machine
              learning.
            </p>
          </div>

          <BloomDashboard />
        </div>
      </main>
    </div>
  )
}
