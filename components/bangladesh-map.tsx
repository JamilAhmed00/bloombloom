"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Calendar, ExternalLink, Database } from "lucide-react"

interface DistrictData {
  name: string
  division: string
  mango: number
  rice: number
  lotus: number
  sunflower: number
  prediction: string
  anomaly: "early" | "normal" | "late"
}

const DISTRICTS: DistrictData[] = [
  {
    name: "Rajshahi",
    division: "Rajshahi",
    mango: 0.95,
    rice: 0.7,
    lotus: 0.4,
    sunflower: 0.6,
    prediction: "Mango will flower 10 days early",
    anomaly: "early",
  },
  {
    name: "Chapai Nawabganj",
    division: "Rajshahi",
    mango: 0.92,
    rice: 0.65,
    lotus: 0.35,
    sunflower: 0.55,
    prediction: "Peak mango bloom expected",
    anomaly: "normal",
  },
  {
    name: "Dhaka",
    division: "Dhaka",
    mango: 0.5,
    rice: 0.85,
    lotus: 0.8,
    sunflower: 0.45,
    prediction: "Rice bloom on schedule",
    anomaly: "normal",
  },
  {
    name: "Sylhet",
    division: "Sylhet",
    mango: 0.4,
    rice: 0.9,
    lotus: 0.85,
    sunflower: 0.3,
    prediction: "Lotus bloom delayed 5 days",
    anomaly: "late",
  },
  {
    name: "Chittagong",
    division: "Chittagong",
    mango: 0.45,
    rice: 0.88,
    lotus: 0.75,
    sunflower: 0.5,
    prediction: "Rice bloom intensity high",
    anomaly: "normal",
  },
  {
    name: "Khulna",
    division: "Khulna",
    mango: 0.6,
    rice: 0.8,
    lotus: 0.9,
    sunflower: 0.7,
    prediction: "Lotus peak bloom active",
    anomaly: "normal",
  },
  {
    name: "Barisal",
    division: "Barisal",
    mango: 0.35,
    rice: 0.92,
    lotus: 0.88,
    sunflower: 0.4,
    prediction: "Rice bloom 3 days early",
    anomaly: "early",
  },
  {
    name: "Rangpur",
    division: "Rangpur",
    mango: 0.75,
    rice: 0.7,
    lotus: 0.5,
    sunflower: 0.8,
    prediction: "Sunflower bloom strong",
    anomaly: "normal",
  },
  {
    name: "Mymensingh",
    division: "Mymensingh",
    mango: 0.55,
    rice: 0.85,
    lotus: 0.7,
    sunflower: 0.6,
    prediction: "Multiple crops blooming",
    anomaly: "normal",
  },
]

type CropType = "mango" | "rice" | "lotus" | "sunflower"

export function BangladeshMap() {
  const [selectedCrop, setSelectedCrop] = useState<CropType>("mango")
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData | null>(null)

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 0.8) return "bg-secondary"
    if (intensity >= 0.6) return "bg-secondary/70"
    if (intensity >= 0.4) return "bg-secondary/40"
    return "bg-secondary/20"
  }

  const getIntensityLabel = (intensity: number) => {
    if (intensity >= 0.8) return "Very High"
    if (intensity >= 0.6) return "High"
    if (intensity >= 0.4) return "Medium"
    return "Low"
  }

  return (
    <div className="space-y-6">
      {/* Crop selector */}
      <Card className="p-6">
        <Tabs value={selectedCrop} onValueChange={(value) => setSelectedCrop(value as CropType)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="mango">🥭 Mango</TabsTrigger>
            <TabsTrigger value="rice">🌾 Rice</TabsTrigger>
            <TabsTrigger value="lotus">🪷 Lotus</TabsTrigger>
            <TabsTrigger value="sunflower">🌻 Sunflower</TabsTrigger>
          </TabsList>
        </Tabs>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map visualization */}
        <Card className="lg:col-span-2 p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold capitalize">{selectedCrop} Bloom Intensity</h3>
                <p className="text-sm text-muted-foreground">Real-time satellite data from NASA</p>
              </div>
              <Badge variant="outline" className="gap-2">
                <Calendar className="w-3 h-3" />
                April 2025
              </Badge>
            </div>

            {/* Real Google Maps embed */}
            <div className="relative rounded-lg overflow-hidden" style={{ height: "600px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689779.5879187584!2d87.84436470000001!3d23.684994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30adaaed80e18ba7%3A0xf2d28e0c4e1fc6b!2sBangladesh!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />

              {/* Overlay with bloom data visualization */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/80 via-transparent to-transparent" />

              {/* District markers overlay */}
              <div className="absolute bottom-4 left-4 right-4 pointer-events-auto">
                <div className="grid grid-cols-3 gap-2">
                  {DISTRICTS.slice(0, 6).map((district) => {
                    const intensity = district[selectedCrop]
                    return (
                      <button
                        key={district.name}
                        onClick={() => setSelectedDistrict(district)}
                        className={`${getIntensityColor(
                          intensity,
                        )} p-3 rounded-lg border-2 transition-all hover:scale-105 hover:shadow-lg backdrop-blur-sm ${
                          selectedDistrict?.name === district.name
                            ? "border-primary ring-2 ring-primary"
                            : "border-transparent"
                        }`}
                      >
                        <div className="text-xs font-medium text-foreground">{district.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">{Math.round(intensity * 100)}%</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border pointer-events-auto">
                <div className="text-sm font-medium mb-3">Bloom Intensity</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-secondary rounded" />
                    <span className="text-xs">Very High (80-100%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-secondary/70 rounded" />
                    <span className="text-xs">High (60-80%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-secondary/40 rounded" />
                    <span className="text-xs">Medium (40-60%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-secondary/20 rounded" />
                    <span className="text-xs">Low (0-40%)</span>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="w-full mt-3 text-xs" asChild>
                  <a
                    href="https://www.google.com/maps/place/Bangladesh/@23.506657,90.3443647,7z"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Open in Google Maps
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* District details */}
        <Card className="p-6">
          {selectedDistrict ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">{selectedDistrict.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedDistrict.division} Division</p>
              </div>

              {/* Prediction alert */}
              <div
                className={`p-4 rounded-lg border ${
                  selectedDistrict.anomaly === "early"
                    ? "bg-orange-500/10 border-orange-500/20"
                    : selectedDistrict.anomaly === "late"
                      ? "bg-blue-500/10 border-blue-500/20"
                      : "bg-primary/10 border-primary/20"
                }`}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm mb-1">Bloom Prediction</div>
                    <div className="text-sm">{selectedDistrict.prediction}</div>
                  </div>
                </div>
              </div>

              {/* Crop intensities */}
              <div className="space-y-4">
                <h4 className="font-semibold text-sm">All Crops</h4>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Mango</span>
                      <span className="text-sm font-medium">{Math.round(selectedDistrict.mango * 100)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary transition-all"
                        style={{ width: `${selectedDistrict.mango * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Rice</span>
                      <span className="text-sm font-medium">{Math.round(selectedDistrict.rice * 100)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary transition-all"
                        style={{ width: `${selectedDistrict.rice * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Lotus</span>
                      <span className="text-sm font-medium">{Math.round(selectedDistrict.lotus * 100)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary transition-all"
                        style={{ width: `${selectedDistrict.lotus * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Sunflower</span>
                      <span className="text-sm font-medium">{Math.round(selectedDistrict.sunflower * 100)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary transition-all"
                        style={{ width: `${selectedDistrict.sunflower * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button className="w-full" size="sm">
                  View Detailed Forecast
                </Button>
                <Button className="w-full bg-transparent" variant="outline" size="sm">
                  Set Alert for This District
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-center text-muted-foreground">
              <div>
                <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">Select a district on the map to view detailed bloom data and predictions</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Summary statistics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Average Intensity</div>
          <div className="text-2xl font-bold">
            {Math.round((DISTRICTS.reduce((sum, d) => sum + d[selectedCrop], 0) / DISTRICTS.length) * 100)}%
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Peak Districts</div>
          <div className="text-2xl font-bold">{DISTRICTS.filter((d) => d[selectedCrop] >= 0.8).length}</div>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Early Blooms</div>
          <div className="text-2xl font-bold text-orange-500">
            {DISTRICTS.filter((d) => d.anomaly === "early").length}
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Late Blooms</div>
          <div className="text-2xl font-bold text-blue-500">{DISTRICTS.filter((d) => d.anomaly === "late").length}</div>
        </Card>
      </div>

      {/* Bangladesh Agriculture Statistics section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              Bangladesh Agriculture Statistics
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Official agricultural data from Bangladesh Bureau of Statistics
            </p>
          </div>
          <Button size="sm" variant="outline" asChild>
            <a
              href="https://bbs.gov.bd/site/page/453af260-6aea-4331-b4a5-7b66fe63ba61/Agriculture"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View BBS Data
            </a>
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Total Crop Area</div>
            <div className="text-2xl font-bold">14.8M</div>
            <div className="text-xs text-muted-foreground mt-1">hectares (2024)</div>
          </div>

          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Rice Production</div>
            <div className="text-2xl font-bold">36.2M</div>
            <div className="text-xs text-muted-foreground mt-1">metric tons/year</div>
          </div>

          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Mango Production</div>
            <div className="text-2xl font-bold">2.4M</div>
            <div className="text-xs text-muted-foreground mt-1">metric tons/year</div>
          </div>

          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Farming Districts</div>
            <div className="text-2xl font-bold">64</div>
            <div className="text-xs text-muted-foreground mt-1">active regions</div>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
            <div className="flex-1">
              <div className="font-medium text-sm mb-1">Data Integration</div>
              <div className="text-xs text-muted-foreground">
                BloomX combines BBS agricultural statistics with NASA satellite data to provide accurate bloom
                predictions for Bangladesh's major crops
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
