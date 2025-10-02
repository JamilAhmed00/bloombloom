"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Play,
  Pause,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  ExternalLink,
  Globe2,
  Satellite,
  Database,
  Droplets,
  Thermometer,
  Leaf,
  TrendingUp,
} from "lucide-react"

interface BloomHotspot {
  lat: number
  lng: number
  intensity: number
  name: string
  season: string
}

const BLOOM_HOTSPOTS: BloomHotspot[] = [
  { lat: 23.8103, lng: 90.4125, intensity: 0.9, name: "Bangladesh - Rice & Mango", season: "Spring" },
  { lat: 35.6762, lng: 139.6503, intensity: 0.95, name: "Japan - Cherry Blossoms", season: "Spring" },
  { lat: 52.52, lng: 13.405, intensity: 0.7, name: "Germany - Wildflowers", season: "Spring" },
  { lat: -33.8688, lng: 151.2093, intensity: 0.8, name: "Australia - Wattle", season: "Spring" },
  { lat: 37.7749, lng: -122.4194, intensity: 0.75, name: "California - Poppies", season: "Spring" },
  { lat: 51.5074, lng: -0.1278, intensity: 0.65, name: "UK - Bluebells", season: "Spring" },
  { lat: 40.7128, lng: -74.006, intensity: 0.7, name: "New York - Magnolias", season: "Spring" },
  { lat: -22.9068, lng: -43.1729, intensity: 0.85, name: "Brazil - Ipê Trees", season: "Spring" },
  { lat: 28.6139, lng: 77.209, intensity: 0.8, name: "India - Lotus", season: "Monsoon" },
  { lat: 1.3521, lng: 103.8198, intensity: 0.6, name: "Singapore - Orchids", season: "Year-round" },
]

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function GlobeViewer() {
  const [currentMonth, setCurrentMonth] = useState(3) // April
  const [viewMode, setViewMode] = useState<"3d" | "nasa" | "satellite">("nasa")
  const [isPlaying, setIsPlaying] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [dataLayer, setDataLayer] = useState<"chlorophyll" | "temperature" | "precipitation" | "vegetation">(
    "chlorophyll",
  )

  const handleReset = () => {
    // Reset logic here
  }

  return (
    <div className="space-y-6">
      {/* View mode selector */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Global Bloom Observatory</h3>
            <p className="text-sm text-muted-foreground">Explore bloom patterns worldwide with real NASA data</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant={viewMode === "nasa" ? "default" : "outline"} onClick={() => setViewMode("nasa")}>
              <Satellite className="w-4 h-4 mr-2" />
              NASA Eyes
            </Button>
            <Button size="sm" variant={viewMode === "3d" ? "default" : "outline"} onClick={() => setViewMode("3d")}>
              <Globe2 className="w-4 h-4 mr-2" />
              3D Earth
            </Button>
            <Button
              size="sm"
              variant={viewMode === "satellite" ? "default" : "outline"}
              onClick={() => setViewMode("satellite")}
            >
              Satellite Data
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="relative">
          {viewMode === "nasa" ? (
            <div className="relative rounded-lg overflow-hidden" style={{ height: "700px" }}>
              <iframe
                src="https://eyes.nasa.gov/apps/earth/#/"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-lg"
                title="NASA Eyes on Earth"
              />

              {/* Overlay info */}
              <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-4 space-y-2 pointer-events-auto border border-primary/20">
                <div className="flex items-center gap-2">
                  <Satellite className="w-4 h-4 text-primary" />
                  <div className="text-sm font-medium">NASA Eyes on Earth</div>
                </div>
                <div className="text-2xl font-bold text-primary">{MONTHS[currentMonth]}</div>
                <div className="text-xs text-muted-foreground">Real-time satellite visualization</div>
                <div className="text-xs text-muted-foreground pt-2 border-t border-border space-y-1">
                  <div>• MODIS Vegetation Index</div>
                  <div>• Landsat Surface Reflectance</div>
                  <div>• VIIRS Day/Night Band</div>
                  <div>• Terra & Aqua Satellites</div>
                </div>
                <Button size="sm" variant="ghost" className="w-full mt-2 text-xs" asChild>
                  <a href="https://eyes.nasa.gov/apps/earth/#/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Open Full Screen
                  </a>
                </Button>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur-sm rounded-lg p-4 space-y-2 pointer-events-auto border border-primary/20">
                <div className="text-sm font-medium mb-2">NASA Data Layers</div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-muted-foreground">Vegetation Index</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-xs text-muted-foreground">Water Bodies</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />
                  <span className="text-xs text-muted-foreground">Bloom Hotspots</span>
                </div>
              </div>
            </div>
          ) : viewMode === "3d" ? (
            <div className="relative rounded-lg overflow-hidden" style={{ height: "700px" }}>
              <iframe
                src="https://earth3dmap.com/"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-lg"
                title="3D Earth Map"
              />

              {/* Overlay info */}
              <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-4 space-y-2 pointer-events-auto">
                <div className="text-sm font-medium">Current View</div>
                <div className="text-2xl font-bold text-primary">{MONTHS[currentMonth]}</div>
                <div className="text-xs text-muted-foreground">{BLOOM_HOTSPOTS.length} Active Bloom Zones</div>
                <Button size="sm" variant="ghost" className="w-full mt-2 text-xs" asChild>
                  <a href="https://earth3dmap.com/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Open Full Screen
                  </a>
                </Button>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-4 space-y-2 pointer-events-auto">
                <div className="text-sm font-medium mb-2">Bloom Intensity</div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary/50" />
                  <span className="text-xs text-muted-foreground">Low</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary" />
                  <span className="text-xs text-muted-foreground">Medium</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
                  <span className="text-xs text-muted-foreground">High</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Data layer selector */}
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant={dataLayer === "chlorophyll" ? "default" : "outline"}
                  onClick={() => setDataLayer("chlorophyll")}
                >
                  <Leaf className="w-4 h-4 mr-2" />
                  Chlorophyll
                </Button>
                <Button
                  size="sm"
                  variant={dataLayer === "temperature" ? "default" : "outline"}
                  onClick={() => setDataLayer("temperature")}
                >
                  <Thermometer className="w-4 h-4 mr-2" />
                  Temperature
                </Button>
                <Button
                  size="sm"
                  variant={dataLayer === "precipitation" ? "default" : "outline"}
                  onClick={() => setDataLayer("precipitation")}
                >
                  <Droplets className="w-4 h-4 mr-2" />
                  Precipitation
                </Button>
                <Button
                  size="sm"
                  variant={dataLayer === "vegetation" ? "default" : "outline"}
                  onClick={() => setDataLayer("vegetation")}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Vegetation Index
                </Button>
              </div>

              {/* NASA Worldview iframe */}
              <div className="relative rounded-lg overflow-hidden" style={{ height: "600px" }}>
                <iframe
                  src="https://worldview.earthdata.nasa.gov/?v=-180,-90,180,90&l=Reference_Labels_15m,Reference_Features_15m,Coastlines_15m,VIIRS_NOAA20_CorrectedReflectance_TrueColor,MODIS_Aqua_CorrectedReflectance_TrueColor,MODIS_Terra_CorrectedReflectance_TrueColor"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="rounded-lg"
                  title="NASA Worldview Satellite Data"
                />

                {/* Data info overlay */}
                <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-4 space-y-3 pointer-events-auto border border-primary/20 max-w-xs">
                  <div className="flex items-center gap-2">
                    <Satellite className="w-4 h-4 text-primary" />
                    <div className="text-sm font-medium">NASA Worldview</div>
                  </div>

                  <Button size="sm" variant="default" className="w-full text-xs" asChild>
                    <a href="https://www.earthdata.nasa.gov/" target="_blank" rel="noopener noreferrer">
                      <Database className="w-3 h-3 mr-1" />
                      Access NASA Earthdata Portal
                    </a>
                  </Button>

                  {dataLayer === "chlorophyll" && (
                    <>
                      <div className="text-lg font-bold text-green-500">Chlorophyll-a Concentration</div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>• MODIS Aqua Ocean Color</div>
                        <div>• Bloom indicator (phytoplankton)</div>
                        <div>• Updated daily</div>
                        <div>• Resolution: 4km</div>
                      </div>
                      <div className="pt-2 border-t border-border">
                        <div className="text-xs font-medium mb-1">Current Reading</div>
                        <div className="text-2xl font-bold text-green-500">12.5 mg/m³</div>
                        <div className="text-xs text-muted-foreground">Bay of Bengal</div>
                      </div>
                    </>
                  )}

                  {dataLayer === "temperature" && (
                    <>
                      <div className="text-lg font-bold text-orange-500">Sea Surface Temperature</div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>• MODIS Terra/Aqua SST</div>
                        <div>• Thermal infrared bands</div>
                        <div>• Updated twice daily</div>
                        <div>• Resolution: 1km</div>
                      </div>
                      <div className="pt-2 border-t border-border">
                        <div className="text-xs font-medium mb-1">Current Reading</div>
                        <div className="text-2xl font-bold text-orange-500">28.3°C</div>
                        <div className="text-xs text-muted-foreground">Bay of Bengal</div>
                      </div>
                    </>
                  )}

                  {dataLayer === "precipitation" && (
                    <>
                      <div className="text-lg font-bold text-blue-500">Precipitation Rate</div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>• GPM IMERG Final Run</div>
                        <div>• Global Precipitation Mission</div>
                        <div>• Updated every 30 minutes</div>
                        <div>• Resolution: 10km</div>
                      </div>
                      <div className="pt-2 border-t border-border">
                        <div className="text-xs font-medium mb-1">Current Reading</div>
                        <div className="text-2xl font-bold text-blue-500">8.2 mm/hr</div>
                        <div className="text-xs text-muted-foreground">Bangladesh Region</div>
                      </div>
                    </>
                  )}

                  {dataLayer === "vegetation" && (
                    <>
                      <div className="text-lg font-bold text-emerald-500">Vegetation Index (NDVI)</div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>• MODIS Terra Vegetation</div>
                        <div>• Normalized Difference Index</div>
                        <div>• Updated every 16 days</div>
                        <div>• Resolution: 250m</div>
                      </div>
                      <div className="pt-2 border-t border-border">
                        <div className="text-xs font-medium mb-1">Current Reading</div>
                        <div className="text-2xl font-bold text-emerald-500">0.78</div>
                        <div className="text-xs text-muted-foreground">High vegetation density</div>
                      </div>
                    </>
                  )}

                  <Button size="sm" variant="ghost" className="w-full text-xs" asChild>
                    <a href="https://worldview.earthdata.nasa.gov/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Open Full NASA Worldview
                    </a>
                  </Button>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur-sm rounded-lg p-4 space-y-2 pointer-events-auto border border-primary/20">
                  <div className="text-sm font-medium mb-2">Data Scale</div>

                  {dataLayer === "chlorophyll" && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-3 rounded bg-gradient-to-r from-blue-900 to-blue-500" />
                        <span className="text-xs text-muted-foreground">0.01 - 1 mg/m³</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-3 rounded bg-gradient-to-r from-green-500 to-yellow-500" />
                        <span className="text-xs text-muted-foreground">1 - 10 mg/m³</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-3 rounded bg-gradient-to-r from-orange-500 to-red-500 animate-pulse" />
                        <span className="text-xs text-muted-foreground">10+ mg/m³ (Bloom)</span>
                      </div>
                    </div>
                  )}

                  {dataLayer === "temperature" && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-3 rounded bg-gradient-to-r from-blue-500 to-cyan-500" />
                        <span className="text-xs text-muted-foreground">0 - 15°C</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-3 rounded bg-gradient-to-r from-green-500 to-yellow-500" />
                        <span className="text-xs text-muted-foreground">15 - 25°C</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-3 rounded bg-gradient-to-r from-orange-500 to-red-500" />
                        <span className="text-xs text-muted-foreground">25 - 35°C</span>
                      </div>
                    </div>
                  )}

                  {dataLayer === "precipitation" && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-3 rounded bg-gradient-to-r from-gray-300 to-blue-300" />
                        <span className="text-xs text-muted-foreground">0 - 2 mm/hr</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-3 rounded bg-gradient-to-r from-blue-400 to-blue-600" />
                        <span className="text-xs text-muted-foreground">2 - 10 mm/hr</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-3 rounded bg-gradient-to-r from-blue-700 to-purple-700 animate-pulse" />
                        <span className="text-xs text-muted-foreground">10+ mm/hr (Heavy)</span>
                      </div>
                    </div>
                  )}

                  {dataLayer === "vegetation" && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-3 rounded bg-gradient-to-r from-yellow-700 to-yellow-500" />
                        <span className="text-xs text-muted-foreground">-0.1 - 0.2 (Sparse)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-3 rounded bg-gradient-to-r from-yellow-400 to-green-500" />
                        <span className="text-xs text-muted-foreground">0.2 - 0.5 (Moderate)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-3 rounded bg-gradient-to-r from-green-600 to-green-900" />
                        <span className="text-xs text-muted-foreground">0.5 - 1.0 (Dense)</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Real satellite images grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">MODIS True Color</div>
                    <div className="text-xs text-muted-foreground">Today</div>
                  </div>
                  <img
                    src="/satellite-view-of-earth-showing-green-vegetation-a.jpg"
                    alt="MODIS True Color Satellite Image"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="text-xs text-muted-foreground">
                    Terra & Aqua satellites capture visible light imagery showing true colors of Earth's surface
                  </div>
                </Card>

                <Card className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Chlorophyll Concentration</div>
                    <div className="text-xs text-muted-foreground">Today</div>
                  </div>
                  <img
                    src="/satellite-chlorophyll-concentration-map-showing-al.jpg"
                    alt="Chlorophyll Concentration Map"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="text-xs text-muted-foreground">
                    Ocean color data reveals phytoplankton blooms and water quality indicators
                  </div>
                </Card>

                <Card className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Vegetation Index (NDVI)</div>
                    <div className="text-xs text-muted-foreground">16-day composite</div>
                  </div>
                  <img
                    src="/ndvi-vegetation-index-map-showing-dense-green-fore.jpg"
                    alt="NDVI Vegetation Index"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="text-xs text-muted-foreground">
                    Normalized Difference Vegetation Index tracks plant health and bloom timing
                  </div>
                </Card>

                <Card className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Precipitation Rate</div>
                    <div className="text-xs text-muted-foreground">30-min update</div>
                  </div>
                  <img
                    src="/gpm-precipitation-map-showing-rainfall-intensity-i.jpg"
                    alt="GPM Precipitation Data"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="text-xs text-muted-foreground">
                    Global Precipitation Measurement mission tracks rainfall patterns affecting blooms
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Controls */}
      <Card className="p-6">
        <div className="space-y-6">
          {/* Playback controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button size="sm" variant="outline" onClick={handleReset}>
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium min-w-16 text-center">{Math.round(zoom * 100)}%</span>
              <Button size="sm" variant="outline" onClick={() => setZoom(Math.min(2, zoom + 0.1))}>
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Month slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Season Timeline</label>
              <span className="text-sm text-muted-foreground">{MONTHS[currentMonth]}</span>
            </div>
            <Slider
              value={[currentMonth]}
              onValueChange={(value) => setCurrentMonth(value[0])}
              min={0}
              max={11}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Jan</span>
              <span>Apr</span>
              <span>Jul</span>
              <span>Oct</span>
              <span>Dec</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Hotspot list */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Active Bloom Zones</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {BLOOM_HOTSPOTS.map((hotspot, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div>
                <div className="font-medium text-sm">{hotspot.name}</div>
                <div className="text-xs text-muted-foreground">{hotspot.season}</div>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{
                    backgroundColor: `rgba(255, 180, 50, ${hotspot.intensity})`,
                  }}
                />
                <span className="text-xs font-medium">{Math.round(hotspot.intensity * 100)}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <div className="flex items-start gap-4">
          <Database className="w-8 h-8 text-primary mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Powered by NASA Earth Science</h3>
            <p className="text-sm text-muted-foreground mb-4">
              BloomX integrates multiple NASA satellite missions to track global bloom patterns in real-time. Access the
              full NASA Earthdata portal for comprehensive Earth observation datasets.
            </p>
            <div className="grid md:grid-cols-4 gap-3 mb-4">
              <Button size="sm" variant="outline" className="text-xs bg-transparent" asChild>
                <a href="https://www.earthdata.nasa.gov/" target="_blank" rel="noopener noreferrer">
                  <Database className="w-3 h-3 mr-1" />
                  NASA Earthdata
                </a>
              </Button>
              <Button size="sm" variant="outline" className="text-xs bg-transparent" asChild>
                <a href="https://modis.gsfc.nasa.gov/data/dataprod/mod13.php" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  MODIS Data
                </a>
              </Button>
              <Button size="sm" variant="outline" className="text-xs bg-transparent" asChild>
                <a
                  href="https://gmao.gsfc.nasa.gov/gmao-products/merra-2/data-access_merra-2/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  MERRA-2 Climate
                </a>
              </Button>
              <Button size="sm" variant="outline" className="text-xs bg-transparent" asChild>
                <a href="https://gpm.nasa.gov/data/directory" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  GPM Precipitation
                </a>
              </Button>
            </div>
            <div className="p-3 rounded-lg bg-card/50 border border-border">
              <div className="text-xs font-medium mb-1 text-primary">About NASA Earthdata</div>
              <div className="text-xs text-muted-foreground">
                NASA's Earthdata portal provides free and open access to NASA's Earth observation data from over 70
                missions. Download raw datasets, use APIs, and explore visualization tools for climate research, bloom
                monitoring, and environmental analysis.
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
