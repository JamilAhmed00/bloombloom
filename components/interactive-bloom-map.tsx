"use client"

import { useState, useEffect } from "react"
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
  Sun,
  Wind,
  Thermometer,
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
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)

  const currentSeason = selectedCountry.bloomSeasons[currentMonth]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAnimating) {
      interval = setInterval(() => {
        setCurrentMonth((prev) => (prev + 1) % 12)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isAnimating])

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
            <p className="text-sm text-muted-foreground">Select a country to explore bloom patterns throughout the year</p>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            <MapPin className="w-3 h-3 mr-1" />
            {COUNTRIES.length} Countries
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="relative rounded-lg border-2 border-primary/20 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-6 min-h-[500px]">
              <svg viewBox="0 0 800 500" className="w-full h-full">
                <defs>
                  <radialGradient id="bloomGradient">
                    <stop offset="0%" stopColor={getIntensityColor(currentSeason.intensity)} stopOpacity="0.8" />
                    <stop offset="100%" stopColor={getIntensityColor(currentSeason.intensity)} stopOpacity="0.2" />
                  </radialGradient>
                </defs>

                <rect width="800" height="500" fill="url(#oceanGradient)" />

                {COUNTRIES.map((country) => {
                  const x = ((country.coordinates.lng + 180) / 360) * 800
                  const y = ((90 - country.coordinates.lat) / 180) * 500
                  const season = country.bloomSeasons[currentMonth]
                  const isSelected = selectedCountry.id === country.id
                  const isHovered = hoveredCountry === country.id
                  const size = isSelected ? 60 : isHovered ? 50 : 40

                  return (
                    <g
                      key={country.id}
                      onMouseEnter={() => setHoveredCountry(country.id)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      onClick={() => setSelectedCountry(country)}
                      className="cursor-pointer transition-all"
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={size}
                        fill={getIntensityColor(season.intensity)}
                        opacity={isSelected ? 0.6 : 0.4}
                        className="transition-all duration-300"
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r={size * 0.7}
                        fill={getIntensityColor(season.intensity)}
                        opacity={isSelected ? 0.8 : 0.6}
                        className="transition-all duration-300"
                      >
                        {(isSelected || isHovered) && (
                          <animate
                            attributeName="r"
                            from={size * 0.7}
                            to={size * 1.2}
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        )}
                      </circle>
                      <circle
                        cx={x}
                        cy={y}
                        r={size * 0.4}
                        fill="white"
                        opacity={isSelected ? 1 : 0.8}
                      />

                      {isSelected && (
                        <text
                          x={x}
                          y={y - size - 10}
                          textAnchor="middle"
                          fill="white"
                          fontSize="14"
                          fontWeight="bold"
                          className="pointer-events-none"
                        >
                          {country.name}
                        </text>
                      )}
                    </g>
                  )
                })}
              </svg>

              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 text-white">
                <div className="text-xs font-medium mb-2">Bloom Intensity Scale</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "rgb(239, 68, 68)" }} />
                    <span className="text-xs">Peak (80-100%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "rgb(249, 115, 22)" }} />
                    <span className="text-xs">High (60-80%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "rgb(234, 179, 8)" }} />
                    <span className="text-xs">Moderate (40-60%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "rgb(34, 197, 94)" }} />
                    <span className="text-xs">Low (20-40%)</span>
                  </div>
                </div>
              </div>

              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
                <div className="text-sm font-medium">{MONTHS[currentMonth]}</div>
                <div className="text-xs text-white/70">{getIntensityLabel(currentSeason.intensity)}</div>
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
                    className={currentMonth === index ? "text-primary font-medium" : ""}
                  >
                    {month}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-12 gap-1 mt-2">
                {selectedCountry.bloomSeasons.map((season, index) => (
                  <div
                    key={index}
                    className={`h-8 rounded cursor-pointer transition-all ${
                      currentMonth === index ? "ring-2 ring-primary ring-offset-2" : ""
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
            <Card className="p-4 bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">{selectedCountry.name}</h4>
                <Badge>{selectedCountry.continent}</Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-background/50 rounded">
                  <div className="flex items-center gap-2">
                    <Flower2 className="w-4 h-4 text-primary" />
                    <span className="text-sm">Bloom Level</span>
                  </div>
                  <Badge style={{ backgroundColor: getIntensityColor(currentSeason.intensity) }}>
                    {Math.round(currentSeason.intensity * 100)}%
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-2 bg-background/50 rounded">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">Temperature</span>
                  </div>
                  <span className="text-sm font-medium">{currentSeason.temperature}°C</span>
                </div>

                <div className="flex items-center justify-between p-2 bg-background/50 rounded">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Rainfall</span>
                  </div>
                  <span className="text-sm font-medium">{currentSeason.rainfall}mm</span>
                </div>

                <div className="flex items-center justify-between p-2 bg-background/50 rounded">
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-cyan-500" />
                    <span className="text-sm">Humidity</span>
                  </div>
                  <span className="text-sm font-medium">{currentSeason.humidity}%</span>
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
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: getIntensityColor(currentSeason.intensity) }}
                    />
                    <span className="text-sm">{flower}</span>
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
                  <Badge key={index} variant="outline">
                    {flower}
                  </Badge>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              <Card className="p-3 text-center">
                <div className="text-2xl font-bold text-primary">{selectedCountry.avgTemperature}°C</div>
                <div className="text-xs text-muted-foreground">Avg Temperature</div>
              </Card>
              <Card className="p-3 text-center">
                <div className="text-2xl font-bold text-blue-500">{selectedCountry.avgRainfall}mm</div>
                <div className="text-xs text-muted-foreground">Annual Rainfall</div>
              </Card>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="font-semibold mb-4">Select Country</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {COUNTRIES.map((country) => (
            <Button
              key={country.id}
              variant={selectedCountry.id === country.id ? "default" : "outline"}
              className="justify-start"
              onClick={() => setSelectedCountry(country)}
            >
              <div
                className="w-2 h-2 rounded-full mr-2 animate-pulse"
                style={{ backgroundColor: getIntensityColor(country.bloomSeasons[currentMonth].intensity) }}
              />
              {country.name}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  )
}
