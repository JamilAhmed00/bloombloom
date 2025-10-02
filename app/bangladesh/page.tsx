import { BangladeshMap } from "@/components/bangladesh-map"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Download, Bell, Share2 } from "lucide-react"
import Link from "next/link"

export default function BangladeshPage() {
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
                <h1 className="text-2xl font-bold">Bangladesh Bloom Map</h1>
                <p className="text-sm text-muted-foreground">District-level crop bloom tracking and predictions</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Set Alerts
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-balance">Track Crop Blooms Across Bangladesh</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Real-time bloom intensity maps for mango, rice, lotus, and sunflower with district-level predictions and
              anomaly detection.
            </p>
          </div>

          <BangladeshMap />

          {/* Info section */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6">
              <h3 className="font-semibold mb-3">For Farmers</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get timely alerts about bloom timing changes to optimize pollination, harvesting, and crop management.
              </p>
              <Link href="/farmers">
                <Button size="sm" variant="outline" className="w-full bg-transparent">
                  Learn More
                </Button>
              </Link>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-3">Data Sources</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Combines MODIS NDVI, GPM rainfall data, MERRA-2 temperature, and local agricultural reports.
              </p>
              <Button size="sm" variant="outline" className="w-full bg-transparent">
                View Methodology
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-3">Prediction Accuracy</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our ML models achieve 87% accuracy in predicting bloom timing 7-14 days in advance.
              </p>
              <Button size="sm" variant="outline" className="w-full bg-transparent">
                Learn More
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
