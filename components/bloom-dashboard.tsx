"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts"
import { TrendingUp, TrendingDown, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2, Droplets, Sun, Wind, ExternalLink, Database } from "lucide-react"

// Mock data for bloom intensity over time
const bloomIntensityData = [
  { month: "Jan", mango: 20, rice: 45, lotus: 30, sunflower: 25 },
  { month: "Feb", mango: 35, rice: 60, lotus: 40, sunflower: 35 },
  { month: "Mar", mango: 65, rice: 75, lotus: 55, sunflower: 50 },
  { month: "Apr", mango: 90, rice: 85, lotus: 70, sunflower: 75 },
  { month: "May", mango: 75, rice: 90, lotus: 85, sunflower: 80 },
  { month: "Jun", mango: 45, rice: 95, lotus: 90, sunflower: 65 },
  { month: "Jul", mango: 25, rice: 80, lotus: 85, sunflower: 45 },
  { month: "Aug", mango: 20, rice: 70, lotus: 75, sunflower: 35 },
  { month: "Sep", mango: 30, rice: 65, lotus: 60, sunflower: 40 },
  { month: "Oct", mango: 40, rice: 55, lotus: 50, sunflower: 55 },
  { month: "Nov", mango: 35, rice: 50, lotus: 40, sunflower: 45 },
  { month: "Dec", mango: 25, rice: 48, lotus: 35, sunflower: 30 },
]

// Seasonal anomaly data
const anomalyData = [
  { year: "2020", expected: 85, actual: 83, anomaly: -2 },
  { year: "2021", expected: 85, actual: 88, anomaly: 3 },
  { year: "2022", expected: 85, actual: 79, anomaly: -6 },
  { year: "2023", expected: 85, actual: 91, anomaly: 6 },
  { year: "2024", expected: 85, actual: 87, anomaly: 2 },
  { year: "2025", expected: 85, actual: 92, anomaly: 7 },
]

// Climate correlation data
const climateCorrelationData = [
  { temp: 25, rainfall: 120, bloomIntensity: 65 },
  { temp: 27, rainfall: 150, bloomIntensity: 75 },
  { temp: 29, rainfall: 180, bloomIntensity: 85 },
  { temp: 31, rainfall: 200, bloomIntensity: 90 },
  { temp: 28, rainfall: 160, bloomIntensity: 80 },
  { temp: 26, rainfall: 140, bloomIntensity: 70 },
  { temp: 30, rainfall: 190, bloomIntensity: 88 },
  { temp: 32, rainfall: 210, bloomIntensity: 92 },
  { temp: 28, rainfall: 170, bloomIntensity: 82 },
  { temp: 27, rainfall: 155, bloomIntensity: 77 },
]

// Before/After climate shift data
const climateShiftData = [
  { period: "1990-2000", spring: 75, summer: 85, monsoon: 90, winter: 45 },
  { period: "2000-2010", spring: 78, summer: 87, monsoon: 88, winter: 48 },
  { period: "2010-2020", spring: 82, summer: 90, monsoon: 85, winter: 52 },
  { period: "2020-2025", spring: 88, summer: 92, monsoon: 82, winter: 55 },
]

export function BloomDashboard() {
  return (
    <div className="space-y-6">
      {/* Key metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Current Bloom Index</div>
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-bold">87.5</div>
          <div className="text-xs text-primary mt-1">+5.2% from last month</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Active Anomalies</div>
            <AlertTriangle className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-3xl font-bold">3</div>
          <div className="text-xs text-muted-foreground mt-1">2 early, 1 late bloom</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
            <CheckCircle2 className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-bold">87%</div>
          <div className="text-xs text-primary mt-1">+2% improvement</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Climate Impact</div>
            <Sun className="w-4 h-4 text-secondary" />
          </div>
          <div className="text-3xl font-bold">High</div>
          <div className="text-xs text-orange-500 mt-1">+1.5°C above avg</div>
        </Card>
      </div>

      {/* Main charts */}
      <Tabs defaultValue="intensity" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="intensity">Bloom Intensity</TabsTrigger>
          <TabsTrigger value="anomaly">Anomaly Tracker</TabsTrigger>
          <TabsTrigger value="correlation">Climate Correlation</TabsTrigger>
          <TabsTrigger value="shift">Climate Shift</TabsTrigger>
        </TabsList>

        {/* Bloom Intensity Chart */}
        <TabsContent value="intensity" className="space-y-4">
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Bloom Intensity Index</h3>
              <p className="text-sm text-muted-foreground">
                Monthly bloom intensity trends across major crops in Bangladesh
              </p>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={bloomIntensityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    color: "#0f172a",
                  }}
                />
                <Legend wrapperStyle={{ color: "#0f172a" }} />
                <Line type="monotone" dataKey="mango" stroke="#f59e0b" strokeWidth={3} name="Mango" />
                <Line type="monotone" dataKey="rice" stroke="#10b981" strokeWidth={3} name="Rice" />
                <Line type="monotone" dataKey="lotus" stroke="#ec4899" strokeWidth={3} name="Lotus" />
                <Line
                  type="monotone"
                  dataKey="sunflower"
                  stroke="#eab308"
                  strokeWidth={3}
                  name="Sunflower"
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="grid md:grid-cols-4 gap-4 mt-6">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/10">
                <div className="w-3 h-3 rounded-full bg-secondary" />
                <div>
                  <div className="text-sm font-medium">Mango</div>
                  <div className="text-xs text-muted-foreground">Peak: April</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <div>
                  <div className="text-sm font-medium">Rice</div>
                  <div className="text-xs text-muted-foreground">Peak: June</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/20">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <div>
                  <div className="text-sm font-medium">Lotus</div>
                  <div className="text-xs text-muted-foreground">Peak: June</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-chart-4/20">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--chart-4))" }} />
                <div>
                  <div className="text-sm font-medium">Sunflower</div>
                  <div className="text-xs text-muted-foreground">Peak: May</div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Seasonal Anomaly Tracker */}
        <TabsContent value="anomaly" className="space-y-4">
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Seasonal Anomaly Tracker</h3>
              <p className="text-sm text-muted-foreground">
                Comparing expected vs actual bloom intensity over the years
              </p>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={anomalyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" stroke="#64748b" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    color: "#0f172a",
                  }}
                />
                <Legend wrapperStyle={{ color: "#0f172a" }} />
                <Bar dataKey="expected" fill="#94a3b8" name="Expected" />
                <Bar dataKey="actual" fill="#3b82f6" name="Actual" />
              </BarChart>
            </ResponsiveContainer>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-lg border border-orange-500/20 bg-orange-500/5">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  <div className="text-sm font-medium">Early Blooms</div>
                </div>
                <div className="text-2xl font-bold">+7 days</div>
                <div className="text-xs text-muted-foreground mt-1">2025 average shift</div>
              </div>

              <div className="p-4 rounded-lg border border-blue-500/20 bg-blue-500/5">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-4 h-4 text-blue-500" />
                  <div className="text-sm font-medium">Late Blooms</div>
                </div>
                <div className="text-2xl font-bold">-3 days</div>
                <div className="text-xs text-muted-foreground mt-1">Monsoon delay</div>
              </div>

              <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <div className="text-sm font-medium">On Schedule</div>
                </div>
                <div className="text-2xl font-bold">65%</div>
                <div className="text-xs text-muted-foreground mt-1">Districts normal</div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Climate Correlation */}
        <TabsContent value="correlation" className="space-y-4">
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Climate Correlation Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Relationship between temperature, rainfall, and bloom intensity
              </p>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  type="number"
                  dataKey="temp"
                  name="Temperature"
                  unit="°C"
                  stroke="#64748b"
                  style={{ fontSize: '12px' }}
                  label={{ value: "Temperature (°C)", position: "insideBottom", offset: -5, fill: "#64748b" }}
                />
                <YAxis
                  type="number"
                  dataKey="bloomIntensity"
                  name="Bloom Intensity"
                  unit="%"
                  stroke="#64748b"
                  style={{ fontSize: '12px' }}
                  label={{ value: "Bloom Intensity (%)", angle: -90, position: "insideLeft", fill: "#64748b" }}
                />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    color: "#0f172a",
                  }}
                />
                <Scatter name="Bloom vs Temperature" data={climateCorrelationData} fill="#3b82f6" />
              </ScatterChart>
            </ResponsiveContainer>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <Sun className="w-4 h-4 text-secondary" />
                  <div className="text-sm font-medium">Temperature</div>
                </div>
                <div className="text-2xl font-bold">+0.85</div>
                <div className="text-xs text-muted-foreground mt-1">Strong positive correlation</div>
              </div>

              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-4 h-4 text-primary" />
                  <div className="text-sm font-medium">Rainfall</div>
                </div>
                <div className="text-2xl font-bold">+0.72</div>
                <div className="text-xs text-muted-foreground mt-1">Moderate positive correlation</div>
              </div>

              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="w-4 h-4 text-accent" />
                  <div className="text-sm font-medium">Humidity</div>
                </div>
                <div className="text-2xl font-bold">+0.68</div>
                <div className="text-xs text-muted-foreground mt-1">Moderate positive correlation</div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Climate Shift Comparison */}
        <TabsContent value="shift" className="space-y-4">
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Before/After Climate Shift</h3>
              <p className="text-sm text-muted-foreground">Comparing bloom patterns across different time periods</p>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={climateShiftData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="period" stroke="#64748b" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    color: "#0f172a",
                  }}
                />
                <Legend wrapperStyle={{ color: "#0f172a" }} />
                <Area
                  type="monotone"
                  dataKey="spring"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.7}
                  name="Spring"
                />
                <Area
                  type="monotone"
                  dataKey="summer"
                  stackId="1"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.7}
                  name="Summer"
                />
                <Area
                  type="monotone"
                  dataKey="monsoon"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.7}
                  name="Monsoon"
                />
                <Area
                  type="monotone"
                  dataKey="winter"
                  stackId="1"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.7}
                  name="Winter"
                />
              </AreaChart>
            </ResponsiveContainer>

            <div className="mt-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <div className="font-medium mb-1">Key Findings</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Spring blooms have increased by 17% since 1990</li>
                    <li>• Monsoon bloom intensity has decreased by 9% in recent years</li>
                    <li>• Winter blooms show gradual increase due to warmer temperatures</li>
                    <li>• Overall bloom season is extending by approximately 2 weeks per decade</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Additional insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-500/10">
              <TrendingUp className="w-4 h-4 text-orange-500 mt-1" />
              <div className="flex-1">
                <div className="text-sm font-medium">Rajshahi Mango Early Bloom</div>
                <div className="text-xs text-muted-foreground">Expected 10 days earlier than normal</div>
                <Badge variant="outline" className="mt-2 text-xs">
                  2 days ago
                </Badge>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10">
              <TrendingDown className="w-4 h-4 text-blue-500 mt-1" />
              <div className="flex-1">
                <div className="text-sm font-medium">Sylhet Lotus Delayed</div>
                <div className="text-xs text-muted-foreground">5 days behind schedule due to rainfall</div>
                <Badge variant="outline" className="mt-2 text-xs">
                  5 days ago
                </Badge>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10">
              <CheckCircle2 className="w-4 h-4 text-primary mt-1" />
              <div className="flex-1">
                <div className="text-sm font-medium">Dhaka Rice On Schedule</div>
                <div className="text-xs text-muted-foreground">Bloom intensity matches predictions</div>
                <Badge variant="outline" className="mt-2 text-xs">
                  1 week ago
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Data Quality</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Satellite Coverage</span>
                <span className="text-sm font-medium">98%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "98%" }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Ground Validation</span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "85%" }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Citizen Science Data</span>
                <span className="text-sm font-medium">72%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "72%" }} />
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                Last updated: <span className="font-medium text-foreground">2 hours ago</span>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Next update: <span className="font-medium text-foreground">in 4 hours</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* NASA Data Sources section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              NASA Data Sources
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Real-time satellite and climate data powering BloomX predictions
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* MODIS Vegetation Index */}
          <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold text-sm mb-1">MODIS Vegetation Index</div>
                <div className="text-xs text-muted-foreground">MOD13 Product Suite</div>
              </div>
              <Badge variant="outline" className="text-xs">
                Active
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              16-day composite vegetation indices at 250m-1km resolution for bloom intensity monitoring
            </p>
            <Button size="sm" variant="ghost" className="w-full text-xs" asChild>
              <a href="https://modis.gsfc.nasa.gov/data/dataprod/mod13.php" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3 mr-1" />
                View MODIS Data
              </a>
            </Button>
          </div>

          {/* MERRA-2 Climate Data */}
          <div className="p-4 rounded-lg border border-secondary/20 bg-secondary/5 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold text-sm mb-1">MERRA-2 Climate Data</div>
                <div className="text-xs text-muted-foreground">Modern-Era Retrospective</div>
              </div>
              <Badge variant="outline" className="text-xs">
                Active
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Temperature, humidity, and atmospheric data for climate correlation analysis
            </p>
            <Button size="sm" variant="ghost" className="w-full text-xs" asChild>
              <a
                href="https://gmao.gsfc.nasa.gov/gmao-products/merra-2/data-access_merra-2/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                View MERRA-2 Data
              </a>
            </Button>
          </div>

          {/* GPM Precipitation */}
          <div className="p-4 rounded-lg border border-accent/20 bg-accent/5 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold text-sm mb-1">GPM Precipitation</div>
                <div className="text-xs text-muted-foreground">Global Precipitation Mission</div>
              </div>
              <Badge variant="outline" className="text-xs">
                Active
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              High-resolution rainfall data for monsoon and bloom timing predictions
            </p>
            <Button size="sm" variant="ghost" className="w-full text-xs" asChild>
              <a href="https://gpm.nasa.gov/data/directory" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3 mr-1" />
                View GPM Data
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
            <div className="flex-1">
              <div className="font-medium text-sm mb-1">Data Integration Status</div>
              <div className="text-xs text-muted-foreground">
                All NASA datasets are actively streaming and updating every 6 hours. Last sync: 2 hours ago
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
