"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Flower2,
  MapPin,
  TrendingUp,
  Calendar,
  Droplets,
  Wind,
  Thermometer,
  Layers,
  Navigation,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Satellite,
} from "lucide-react"

interface Country {
  id: string
  name: string
  continent: string
  coordinates: { lat: number; lng: number }
  bloomSeasons: BloomSeason[]
  avgTemperature: number
  avgRainfall: number
  topFlowers: string[]
}

interface BloomSeason {
  month: number
  intensity: number
  flowers: string[]
  temperature: number
  rainfall: number
  humidity: number
}

const COUNTRIES: Country[] = [
  {
    id: "bangladesh",
    name: "Bangladesh",
    continent: "Asia",
    coordinates: { lat: 23.8103, lng: 90.4125 },
    avgTemperature: 28,
    avgRainfall: 2200,
    topFlowers: ["Rice Flower", "Mango Blossom", "Lotus", "Water Lily"],
    bloomSeasons: [
      { month: 0, intensity: 0.3, flowers: ["Mustard"], temperature: 18, rainfall: 15, humidity: 72 },
      { month: 1, intensity: 0.5, flowers: ["Mustard", "Marigold"], temperature: 21, rainfall: 30, humidity: 68 },
      { month: 2, intensity: 0.8, flowers: ["Mango Blossom", "Litchi"], temperature: 26, rainfall: 75, humidity: 65 },
      { month: 3, intensity: 0.9, flowers: ["Rice Flower", "Mango"], temperature: 29, rainfall: 150, humidity: 72 },
      { month: 4, intensity: 0.7, flowers: ["Jasmine", "Lotus"], temperature: 30, rainfall: 280, humidity: 78 },
      { month: 5, intensity: 0.6, flowers: ["Water Lily", "Lotus"], temperature: 30, rainfall: 400, humidity: 85 },
      { month: 6, intensity: 0.5, flowers: ["Kadam", "Lotus"], temperature: 29, rainfall: 420, humidity: 87 },
      { month: 7, intensity: 0.6, flowers: ["Kadam", "Jasmine"], temperature: 29, rainfall: 350, humidity: 86 },
      { month: 8, intensity: 0.7, flowers: ["Jasmine", "Lotus"], temperature: 29, rainfall: 300, humidity: 84 },
      { month: 9, intensity: 0.8, flowers: ["Shiuli", "Marigold"], temperature: 27, rainfall: 180, humidity: 82 },
      { month: 10, intensity: 0.6, flowers: ["Chrysanthemum"], temperature: 23, rainfall: 60, humidity: 78 },
      { month: 11, intensity: 0.4, flowers: ["Rose", "Marigold"], temperature: 19, rainfall: 10, humidity: 75 },
    ],
  },
  {
    id: "japan",
    name: "Japan",
    continent: "Asia",
    coordinates: { lat: 35.6762, lng: 139.6503 },
    avgTemperature: 16,
    avgRainfall: 1530,
    topFlowers: ["Cherry Blossom", "Plum Blossom", "Wisteria", "Azalea"],
    bloomSeasons: [
      { month: 0, intensity: 0.2, flowers: ["Plum Blossom"], temperature: 5, rainfall: 50, humidity: 60 },
      { month: 1, intensity: 0.4, flowers: ["Plum Blossom"], temperature: 7, rainfall: 60, humidity: 58 },
      { month: 2, intensity: 0.7, flowers: ["Cherry Blossom"], temperature: 11, rainfall: 120, humidity: 62 },
      { month: 3, intensity: 0.95, flowers: ["Cherry Blossom", "Azalea"], temperature: 15, rainfall: 130, humidity: 65 },
      { month: 4, intensity: 0.8, flowers: ["Wisteria", "Azalea"], temperature: 19, rainfall: 140, humidity: 68 },
      { month: 5, intensity: 0.6, flowers: ["Iris", "Hydrangea"], temperature: 23, rainfall: 180, humidity: 75 },
      { month: 6, intensity: 0.5, flowers: ["Hydrangea"], temperature: 26, rainfall: 170, humidity: 78 },
      { month: 7, intensity: 0.4, flowers: ["Morning Glory"], temperature: 28, rainfall: 140, humidity: 77 },
      { month: 8, intensity: 0.6, flowers: ["Cosmos"], temperature: 26, rainfall: 210, humidity: 75 },
      { month: 9, intensity: 0.7, flowers: ["Cosmos", "Spider Lily"], temperature: 20, rainfall: 180, humidity: 70 },
      { month: 10, intensity: 0.5, flowers: ["Chrysanthemum"], temperature: 14, rainfall: 100, humidity: 65 },
      { month: 11, intensity: 0.3, flowers: ["Camellia"], temperature: 8, rainfall: 55, humidity: 62 },
    ],
  },
  {
    id: "usa",
    name: "United States",
    continent: "North America",
    coordinates: { lat: 37.0902, lng: -95.7129 },
    avgTemperature: 13,
    avgRainfall: 715,
    topFlowers: ["Sunflower", "California Poppy", "Bluebonnet", "Goldenrod"],
    bloomSeasons: [
      { month: 0, intensity: 0.2, flowers: ["Winter Jasmine"], temperature: 2, rainfall: 70, humidity: 65 },
      { month: 1, intensity: 0.3, flowers: ["Crocus"], temperature: 4, rainfall: 65, humidity: 63 },
      { month: 2, intensity: 0.5, flowers: ["Daffodil", "Tulip"], temperature: 9, rainfall: 80, humidity: 60 },
      { month: 3, intensity: 0.8, flowers: ["Magnolia", "Cherry"], temperature: 14, rainfall: 90, humidity: 62 },
      { month: 4, intensity: 0.9, flowers: ["Bluebonnet", "Poppy"], temperature: 19, rainfall: 100, humidity: 65 },
      { month: 5, intensity: 0.85, flowers: ["Rose", "Lily"], temperature: 24, rainfall: 90, humidity: 68 },
      { month: 6, intensity: 0.7, flowers: ["Sunflower", "Coneflower"], temperature: 27, rainfall: 85, humidity: 70 },
      { month: 7, intensity: 0.65, flowers: ["Sunflower", "Black-eyed Susan"], temperature: 28, rainfall: 80, humidity: 72 },
      { month: 8, intensity: 0.6, flowers: ["Goldenrod", "Aster"], temperature: 25, rainfall: 90, humidity: 70 },
      { month: 9, intensity: 0.5, flowers: ["Chrysanthemum"], temperature: 19, rainfall: 75, humidity: 68 },
      { month: 10, intensity: 0.3, flowers: ["Pansies"], temperature: 12, rainfall: 80, humidity: 66 },
      { month: 11, intensity: 0.2, flowers: ["Poinsettia"], temperature: 5, rainfall: 75, humidity: 68 },
    ],
  },
  {
    id: "india",
    name: "India",
    continent: "Asia",
    coordinates: { lat: 20.5937, lng: 78.9629 },
    avgTemperature: 25,
    avgRainfall: 1175,
    topFlowers: ["Lotus", "Marigold", "Jasmine", "Hibiscus"],
    bloomSeasons: [
      { month: 0, intensity: 0.4, flowers: ["Marigold", "Rose"], temperature: 17, rainfall: 20, humidity: 60 },
      { month: 1, intensity: 0.6, flowers: ["Jasmine", "Marigold"], temperature: 20, rainfall: 25, humidity: 55 },
      { month: 2, intensity: 0.8, flowers: ["Marigold", "Hibiscus"], temperature: 25, rainfall: 30, humidity: 50 },
      { month: 3, intensity: 0.7, flowers: ["Jasmine", "Lotus"], temperature: 30, rainfall: 15, humidity: 45 },
      { month: 4, intensity: 0.6, flowers: ["Lotus"], temperature: 33, rainfall: 40, humidity: 50 },
      { month: 5, intensity: 0.7, flowers: ["Lotus", "Jasmine"], temperature: 32, rainfall: 140, humidity: 70 },
      { month: 6, intensity: 0.9, flowers: ["Lotus", "Monsoon Lily"], temperature: 29, rainfall: 280, humidity: 80 },
      { month: 7, intensity: 0.95, flowers: ["Lotus", "Monsoon Lily"], temperature: 28, rainfall: 300, humidity: 82 },
      { month: 8, intensity: 0.85, flowers: ["Lotus", "Jasmine"], temperature: 28, rainfall: 240, humidity: 80 },
      { month: 9, intensity: 0.7, flowers: ["Marigold", "Hibiscus"], temperature: 27, rainfall: 150, humidity: 75 },
      { month: 10, intensity: 0.6, flowers: ["Chrysanthemum"], temperature: 23, rainfall: 50, humidity: 65 },
      { month: 11, intensity: 0.5, flowers: ["Marigold", "Rose"], temperature: 19, rainfall: 15, humidity: 62 },
    ],
  },
  {
    id: "brazil",
    name: "Brazil",
    continent: "South America",
    coordinates: { lat: -14.235, lng: -51.9253 },
    avgTemperature: 25,
    avgRainfall: 1761,
    topFlowers: ["Ipê", "Orchid", "Heliconia", "Bromeliad"],
    bloomSeasons: [
      { month: 0, intensity: 0.7, flowers: ["Orchid", "Bromeliad"], temperature: 27, rainfall: 240, humidity: 80 },
      { month: 1, intensity: 0.6, flowers: ["Heliconia"], temperature: 27, rainfall: 200, humidity: 78 },
      { month: 2, intensity: 0.5, flowers: ["Heliconia"], temperature: 27, rainfall: 180, humidity: 77 },
      { month: 3, intensity: 0.4, flowers: ["Orchid"], temperature: 26, rainfall: 120, humidity: 75 },
      { month: 4, intensity: 0.3, flowers: ["Orchid"], temperature: 24, rainfall: 80, humidity: 70 },
      { month: 5, intensity: 0.3, flowers: ["Orchid"], temperature: 23, rainfall: 60, humidity: 68 },
      { month: 6, intensity: 0.4, flowers: ["Ipê"], temperature: 23, rainfall: 50, humidity: 65 },
      { month: 7, intensity: 0.6, flowers: ["Ipê"], temperature: 24, rainfall: 50, humidity: 64 },
      { month: 8, intensity: 0.85, flowers: ["Ipê", "Jacaranda"], temperature: 26, rainfall: 70, humidity: 65 },
      { month: 9, intensity: 0.9, flowers: ["Ipê", "Heliconia"], temperature: 27, rainfall: 130, humidity: 72 },
      { month: 10, intensity: 0.8, flowers: ["Heliconia", "Orchid"], temperature: 27, rainfall: 180, humidity: 76 },
      { month: 11, intensity: 0.75, flowers: ["Orchid", "Bromeliad"], temperature: 27, rainfall: 220, humidity: 79 },
    ],
  },
  {
    id: "australia",
    name: "Australia",
    continent: "Oceania",
    coordinates: { lat: -25.2744, lng: 133.7751 },
    avgTemperature: 21,
    avgRainfall: 534,
    topFlowers: ["Wattle", "Waratah", "Kangaroo Paw", "Banksia"],
    bloomSeasons: [
      { month: 0, intensity: 0.7, flowers: ["Wattle"], temperature: 26, rainfall: 65, humidity: 65 },
      { month: 1, intensity: 0.6, flowers: ["Wattle"], temperature: 26, rainfall: 70, humidity: 66 },
      { month: 2, intensity: 0.5, flowers: ["Waratah"], temperature: 24, rainfall: 85, humidity: 68 },
      { month: 3, intensity: 0.4, flowers: ["Banksia"], temperature: 21, rainfall: 75, humidity: 70 },
      { month: 4, intensity: 0.3, flowers: ["Banksia"], temperature: 17, rainfall: 60, humidity: 72 },
      { month: 5, intensity: 0.3, flowers: ["Grevillea"], temperature: 14, rainfall: 55, humidity: 74 },
      { month: 6, intensity: 0.4, flowers: ["Grevillea"], temperature: 13, rainfall: 50, humidity: 75 },
      { month: 7, intensity: 0.5, flowers: ["Kangaroo Paw"], temperature: 13, rainfall: 45, humidity: 73 },
      { month: 8, intensity: 0.7, flowers: ["Wattle", "Kangaroo Paw"], temperature: 16, rainfall: 40, humidity: 68 },
      { month: 9, intensity: 0.85, flowers: ["Wattle", "Wildflowers"], temperature: 19, rainfall: 45, humidity: 65 },
      { month: 10, intensity: 0.8, flowers: ["Wildflowers"], temperature: 22, rainfall: 50, humidity: 63 },
      { month: 11, intensity: 0.75, flowers: ["Jacaranda"], temperature: 24, rainfall: 60, humidity: 64 },
    ],
  },
]

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function InteractiveBloomMap() {
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0])
  const [currentMonth, setCurrentMonth] = useState(3)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mapType, setMapType] = useState<"roadmap" | "satellite" | "hybrid" | "terrain">("satellite")
  const [showBloomLayer, setShowBloomLayer] = useState(true)
  const [showWeatherLayer, setShowWeatherLayer] = useState(true)
  const [mapZoom, setMapZoom] = useState(6)
  const [mapKey, setMapKey] = useState(0)
  const mapRef = useRef<HTMLDivElement>(null)

  const currentSeason = selectedCountry.bloomSeasons[currentMonth]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAnimating) {
      interval = setInterval(() => {
        setCurrentMonth((prev) => (prev + 1) % 12)
      }, 1500)
    }
    return () => clearInterval(interval)
  }, [isAnimating])

  useEffect(() => {
    setMapKey((prev) => prev + 1)
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      }, 100)
    }
  }, [selectedCountry, mapType, mapZoom])

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 0.8) return "rgb(239, 68, 68)"
    if (intensity >= 0.6) return "rgb(249, 115, 22)"
    if (intensity >= 0.4) return "rgb(234, 179, 8)"
    if (intensity >= 0.2) return "rgb(34, 197, 94)"
    return "rgb(156, 163, 175)"
  }

  const getIntensityLabel = (intensity: number) => {
    if (intensity >= 0.8) return "Peak Bloom"
    if (intensity >= 0.6) return "High Activity"
    if (intensity >= 0.4) return "Moderate"
    if (intensity >= 0.2) return "Low Activity"
    return "Minimal"
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold">Interactive Bloom Zone Map</h3>
            <p className="text-sm text-muted-foreground">Real-time Google Maps with bloom data overlays</p>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            <MapPin className="w-3 h-3 mr-1" />
            {COUNTRIES.length} Countries
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex gap-1 bg-muted rounded-lg p-1">
                <Button
                  size="sm"
                  variant={mapType === "roadmap" ? "default" : "ghost"}
                  onClick={() => setMapType("roadmap")}
                  className="text-xs h-8"
                >
                  Map
                </Button>
                <Button
                  size="sm"
                  variant={mapType === "satellite" ? "default" : "ghost"}
                  onClick={() => setMapType("satellite")}
                  className="text-xs h-8"
                >
                  <Satellite className="w-3 h-3 mr-1" />
                  Satellite
                </Button>
                <Button
                  size="sm"
                  variant={mapType === "hybrid" ? "default" : "ghost"}
                  onClick={() => setMapType("hybrid")}
                  className="text-xs h-8"
                >
                  Hybrid
                </Button>
                <Button
                  size="sm"
                  variant={mapType === "terrain" ? "default" : "ghost"}
                  onClick={() => setMapType("terrain")}
                  className="text-xs h-8"
                >
                  Terrain
                </Button>
              </div>
              <Button
                size="sm"
                variant={showBloomLayer ? "default" : "outline"}
                onClick={() => setShowBloomLayer(!showBloomLayer)}
                className="text-xs h-8"
              >
                <Layers className="w-3 h-3 mr-1" />
                Bloom Layer
              </Button>
              <Button
                size="sm"
                variant={showWeatherLayer ? "default" : "outline"}
                onClick={() => setShowWeatherLayer(!showWeatherLayer)}
                className="text-xs h-8"
              >
                <Thermometer className="w-3 h-3 mr-1" />
                Weather
              </Button>
            </div>

            <div ref={mapRef} className="relative rounded-xl border-2 border-primary/20 overflow-hidden min-h-[650px] shadow-2xl bg-slate-900">
              <iframe
                key={mapKey}
                src={`https://maps.google.com/maps?q=${selectedCountry.coordinates.lat},${selectedCountry.coordinates.lng}&t=${mapType === "roadmap" ? "m" : mapType === "satellite" ? "k" : mapType === "hybrid" ? "h" : "p"}&z=${mapZoom}&output=embed`}
                width="100%"
                height="650"
                style={{ border: 0 }}
                loading="lazy"
                className="w-full"
                title={`Google Map of ${selectedCountry.name}`}
              />

              {showBloomLayer && (
                <div className="absolute inset-0 pointer-events-none">
                  <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                      <radialGradient id={`bloom-${selectedCountry.id}-${currentMonth}`}>
                        <stop offset="0%" stopColor={getIntensityColor(currentSeason.intensity)} stopOpacity="0.6" />
                        <stop offset="40%" stopColor={getIntensityColor(currentSeason.intensity)} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={getIntensityColor(currentSeason.intensity)} stopOpacity="0" />
                      </radialGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <circle
                      cx="50"
                      cy="50"
                      r="30"
                      fill={`url(#bloom-${selectedCountry.id}-${currentMonth})`}
                      className="animate-pulse"
                      style={{ animationDuration: "3s" }}
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="4"
                      fill="white"
                      filter="url(#glow)"
                      className="drop-shadow-lg"
                    >
                      <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
                    </circle>
                  </svg>

                  {COUNTRIES.filter((c) => c.id !== selectedCountry.id).map((country) => {
                    const season = country.bloomSeasons[currentMonth]
                    const deltaLng = country.coordinates.lng - selectedCountry.coordinates.lng
                    const deltaLat = country.coordinates.lat - selectedCountry.coordinates.lat
                    const distance = Math.sqrt(deltaLng * deltaLng + deltaLat * deltaLat)

                    if (distance > 50) return null

                    const x = 50 + (deltaLng / 30) * 50
                    const y = 50 - (deltaLat / 30) * 50

                    if (x < 0 || x > 100 || y < 0 || y > 100) return null

                    return (
                      <div
                        key={country.id}
                        className="absolute cursor-pointer hover:scale-125 transition-transform z-10"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedCountry(country)
                        }}
                      >
                        <div className="relative pointer-events-auto">
                          <div
                            className="w-10 h-10 rounded-full animate-ping absolute opacity-30"
                            style={{
                              backgroundColor: getIntensityColor(season.intensity),
                              animationDuration: "2s",
                            }}
                          />
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center relative shadow-lg border-2 border-white"
                            style={{ backgroundColor: getIntensityColor(season.intensity) }}
                          >
                            <Flower2 className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md rounded-xl p-4 text-white pointer-events-none shadow-2xl border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <div className="text-base font-bold">{selectedCountry.name}</div>
                </div>
                <div className="text-xs text-white/70 mb-3">{MONTHS[currentMonth]} • {selectedCountry.continent}</div>
                <div className="flex items-center gap-2 p-2 bg-white/10 rounded-lg">
                  <div
                    className="w-4 h-4 rounded-full animate-pulse"
                    style={{ backgroundColor: getIntensityColor(currentSeason.intensity) }}
                  />
                  <div>
                    <div className="text-xs font-medium">{getIntensityLabel(currentSeason.intensity)}</div>
                    <div className="text-xs text-white/70">{Math.round(currentSeason.intensity * 100)}% Intensity</div>
                  </div>
                </div>
              </div>

              {showWeatherLayer && (
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md rounded-xl p-3 text-white text-xs space-y-2 pointer-events-none shadow-2xl border border-white/10">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/20">
                    <Thermometer className="w-4 h-4 text-orange-400" />
                    <span className="font-medium">Weather Data</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-white/70">Temperature</span>
                    <span className="font-bold text-orange-400">{currentSeason.temperature}°C</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-white/70">Rainfall</span>
                    <span className="font-bold text-blue-400">{currentSeason.rainfall}mm</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-white/70">Humidity</span>
                    <span className="font-bold text-cyan-400">{currentSeason.humidity}%</span>
                  </div>
                </div>
              )}

              <div className="absolute bottom-4 right-4 flex flex-col gap-2 pointer-events-auto z-20">
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-10 h-10 p-0 shadow-xl hover:scale-110 transition-transform"
                  onClick={() => setMapZoom(Math.min(18, mapZoom + 1))}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-10 h-10 p-0 shadow-xl hover:scale-110 transition-transform"
                  onClick={() => setMapZoom(Math.max(2, mapZoom - 1))}
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-10 h-10 p-0 shadow-xl hover:scale-110 transition-transform"
                  onClick={() => setMapZoom(6)}
                  title="Reset zoom"
                >
                  <Navigation className="w-4 h-4" />
                </Button>
              </div>

              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md rounded-xl p-3 text-white text-xs pointer-events-none shadow-2xl border border-white/10">
                <div className="font-medium mb-2 flex items-center gap-2">
                  <Layers className="w-3 h-3" />
                  Bloom Intensity Scale
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border-2 border-white shadow-lg" style={{ backgroundColor: "rgb(239, 68, 68)" }} />
                    <span>Peak 80-100%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border-2 border-white shadow-lg" style={{ backgroundColor: "rgb(249, 115, 22)" }} />
                    <span>High 60-80%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border-2 border-white shadow-lg" style={{ backgroundColor: "rgb(234, 179, 8)" }} />
                    <span>Moderate 40-60%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border-2 border-white shadow-lg" style={{ backgroundColor: "rgb(34, 197, 94)" }} />
                    <span>Low 20-40%</span>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 right-4 -translate-y-1/2 bg-primary/95 backdrop-blur-md rounded-full px-4 py-2 text-white text-xs font-bold pointer-events-none shadow-2xl">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span>LIVE</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Season Timeline
                </label>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsAnimating(!isAnimating)}
                  >
                    {isAnimating ? "Pause" : "Play"} Animation
                  </Button>
                  <Badge variant="secondary">{MONTHS[currentMonth]}</Badge>
                </div>
              </div>

              <Slider
                value={[currentMonth]}
                onValueChange={(value) => setCurrentMonth(value[0])}
                min={0}
                max={11}
                step={1}
                className="w-full"
              />

              <div className="flex justify-between text-xs text-muted-foreground px-1">
                {MONTH_SHORT.map((month, index) => (
                  <span
                    key={month}
                    className={currentMonth === index ? "text-primary font-bold" : ""}
                  >
                    {month}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-12 gap-1 mt-2">
                {selectedCountry.bloomSeasons.map((season, index) => (
                  <button
                    key={index}
                    className={`h-10 rounded cursor-pointer transition-all hover:scale-105 ${
                      currentMonth === index ? "ring-2 ring-primary ring-offset-2 shadow-lg" : "hover:opacity-80"
                    }`}
                    style={{ backgroundColor: getIntensityColor(season.intensity) }}
                    onClick={() => setCurrentMonth(index)}
                    title={`${MONTHS[index]}: ${Math.round(season.intensity * 100)}% intensity`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="p-4 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">{selectedCountry.name}</h4>
                <Badge>{selectedCountry.continent}</Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-background/70 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2">
                    <Flower2 className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Bloom Level</span>
                  </div>
                  <Badge className="font-bold" style={{ backgroundColor: getIntensityColor(currentSeason.intensity) }}>
                    {Math.round(currentSeason.intensity * 100)}%
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-background/70 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium">Temperature</span>
                  </div>
                  <span className="text-sm font-bold text-orange-500">{currentSeason.temperature}°C</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-background/70 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">Rainfall</span>
                  </div>
                  <span className="text-sm font-bold text-blue-500">{currentSeason.rainfall}mm</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-background/70 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-cyan-500" />
                    <span className="text-sm font-medium">Humidity</span>
                  </div>
                  <span className="text-sm font-bold text-cyan-500">{currentSeason.humidity}%</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Flower2 className="w-4 h-4 text-primary" />
                <h4 className="font-semibold">Blooming Now</h4>
              </div>
              <div className="space-y-2">
                {currentSeason.flowers.map((flower, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                    <div
                      className="w-3 h-3 rounded-full animate-pulse"
                      style={{ backgroundColor: getIntensityColor(currentSeason.intensity), animationDuration: "2s" }}
                    />
                    <span className="text-sm font-medium">{flower}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <h4 className="font-semibold">Top Flowers</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedCountry.topFlowers.map((flower, index) => (
                  <Badge key={index} variant="outline" className="font-medium">
                    {flower}
                  </Badge>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              <Card className="p-3 text-center bg-gradient-to-br from-orange-500/10 to-orange-500/5">
                <div className="text-2xl font-bold text-orange-500">{selectedCountry.avgTemperature}°C</div>
                <div className="text-xs text-muted-foreground font-medium">Avg Temperature</div>
              </Card>
              <Card className="p-3 text-center bg-gradient-to-br from-blue-500/10 to-blue-500/5">
                <div className="text-2xl font-bold text-blue-500">{selectedCountry.avgRainfall}mm</div>
                <div className="text-xs text-muted-foreground font-medium">Annual Rainfall</div>
              </Card>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Select Country to Explore
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {COUNTRIES.map((country) => (
            <Button
              key={country.id}
              variant={selectedCountry.id === country.id ? "default" : "outline"}
              className="justify-start hover:scale-105 transition-transform"
              onClick={() => setSelectedCountry(country)}
            >
              <div
                className="w-3 h-3 rounded-full mr-2 animate-pulse shadow-lg"
                style={{ backgroundColor: getIntensityColor(country.bloomSeasons[currentMonth].intensity), animationDuration: "2s" }}
              />
              <span className="font-medium">{country.name}</span>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  )
}
