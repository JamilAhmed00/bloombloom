import { GlobeViewer } from "@/components/globe-viewer"
import { InteractiveBloomMap } from "@/components/interactive-bloom-map"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, Share2, Globe, Map } from "lucide-react"
import Link from "next/link"

export default function GlobePage() {
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
                <h1 className="text-2xl font-bold">Interactive Global Bloom Explorer</h1>
                <p className="text-sm text-muted-foreground">Explore bloom zones and seasonal patterns worldwide</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-balance">Explore Global Bloom Patterns</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Visualize bloom hotspots across the globe with real-time NASA satellite data. Use the timeline to see how
              bloom patterns shift throughout the year.
            </p>
          </div>

          <Tabs defaultValue="interactive" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="interactive">
                <Map className="w-4 h-4 mr-2" />
                Interactive Map
              </TabsTrigger>
              <TabsTrigger value="satellite">
                <Globe className="w-4 h-4 mr-2" />
                Satellite View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="interactive" className="mt-6">
              <InteractiveBloomMap />
            </TabsContent>

            <TabsContent value="satellite" className="mt-6">
              <GlobeViewer />
            </TabsContent>
          </Tabs>

          {/* Info cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
              <h3 className="font-semibold mb-2">Data Sources</h3>
              <p className="text-sm text-muted-foreground">
                MODIS, VIIRS, Landsat satellite imagery combined with ground observations from GLOBE Observer.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-secondary/10 border border-secondary/20">
              <h3 className="font-semibold mb-2">Update Frequency</h3>
              <p className="text-sm text-muted-foreground">
                Bloom data is updated daily with 3-day forecasts and historical comparisons.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-accent/20 border border-accent/30">
              <h3 className="font-semibold mb-2">Coverage</h3>
              <p className="text-sm text-muted-foreground">
                Tracking 50+ species across 100+ regions with district-level precision in Bangladesh.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
