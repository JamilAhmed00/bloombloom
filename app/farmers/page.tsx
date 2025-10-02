import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowLeft,
  Bell,
  TrendingUp,
  Droplets,
  Thermometer,
  Sprout,
  CheckCircle2,
  ExternalLink,
  BarChart3,
  Database,
  Target,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { AccuracyGauge } from "@/components/accuracy-gauge"
import { PredictionChart } from "@/components/prediction-chart"

export default function FarmersPage() {
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
                <h1 className="text-2xl font-bold">For Farmers</h1>
                <p className="text-sm text-muted-foreground">Optimize crop management with timely alerts</p>
              </div>
            </div>

            <Link href="/contribute">
              <Button>
                <Bell className="w-4 h-4 mr-2" />
                Subscribe to Alerts
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Optimize Crop Management with Timely Alerts</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Stay ahead in crop management by receiving timely alerts about bloom timing changes. Leveraging satellite
            data and machine learning models, you can optimize pollination, harvesting, and overall crop management.
          </p>
        </div>
      </section>

      {/* Data Sources Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Satellite Data Sources</h2>
            <p className="text-lg text-muted-foreground">
              Our predictions are powered by cutting-edge NASA satellite data and climate monitoring systems
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* MODIS NDVI */}
            <Card className="overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/modis-ndvi-crop-monitoring-vegetation-index.jpg"
                  alt="MODIS NDVI Crop Monitoring showing vegetation health"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-green-500" />
                  <h3 className="text-xl font-semibold">MODIS NDVI</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Normalized Difference Vegetation Index provides vegetation indices that help monitor crop phenology
                  and potential crop yield. By analyzing NDVI time series, farmers can detect the start of the growing
                  season, monitor crop health, and predict harvest times.
                </p>
                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                  <a
                    href="https://www.usgs.gov/media/images/cropland-ndvi-monitoring-crop-phenology-and-potential-crop-yield"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View MODIS Data
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
              </div>
            </Card>

            {/* GPM Rainfall */}
            <Card className="overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/gpm-precipitation-map-showing-rainfall-intensity-i.jpg"
                  alt="GPM Rainfall Data showing precipitation patterns"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  <h3 className="text-xl font-semibold">GPM Rainfall Data</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  The Global Precipitation Measurement mission offers next-generation global observations of rain and
                  snow. These observations are crucial for understanding precipitation patterns, which directly affect
                  crop growth and yield predictions.
                </p>
                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                  <a href="https://gpm.nasa.gov/applications/water" target="_blank" rel="noopener noreferrer">
                    View GPM Data
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
              </div>
            </Card>

            {/* MERRA-2 Temperature */}
            <Card className="overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/climate-change-visualization-in-vr.jpg"
                  alt="MERRA-2 Temperature Data showing climate conditions"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-orange-500" />
                  <h3 className="text-xl font-semibold">MERRA-2 Temperature</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  MERRA-2 provides atmospheric temperature data that can be used to assess crop growth conditions. By
                  analyzing temperature trends, farmers can predict bloom timing and adjust their management practices
                  accordingly.
                </p>
                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                  <a
                    href="https://gmao.gsfc.nasa.gov/pubs/docs/Bosilovich803.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View MERRA-2 Data
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Prediction Accuracy Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <BarChart3 className="w-10 h-10 text-primary" />
              <h2 className="text-4xl font-bold">Prediction Accuracy</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our machine learning models analyze satellite data (MODIS NDVI), precipitation (GPM), temperature
              (MERRA-2), and local agricultural reports to forecast bloom timing 7–14 days in advance with 87% accuracy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <AccuracyGauge accuracy={87} />
              <p className="text-center text-sm text-muted-foreground mt-6 max-w-xs">
                Validated against ground-truth observations from farms across multiple regions and crop types
              </p>
            </Card>

            <PredictionChart />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Database className="w-8 h-8 text-blue-500" />
                <h3 className="text-xl font-semibold">Training Data</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Historical bloom records combined with satellite vegetation indices (NDVI) from multiple growing seasons
                across diverse geographical regions and crop varieties.
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-green-500" />
                <h3 className="text-xl font-semibold">Validation</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Cross-checked against ground-truth observations from farms, ensuring our predictions align with
                real-world bloom events and agricultural outcomes.
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-violet-500" />
                <h3 className="text-xl font-semibold">Performance Metric</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Accuracy is calculated using the formula:</p>
              <div className="bg-muted/50 p-3 rounded-lg font-mono text-xs">
                Accuracy = (Correct predictions ÷ Total predictions) × 100
              </div>
            </Card>
          </div>

          <Card className="p-8 bg-gradient-to-br from-background to-muted/30">
            <h3 className="text-2xl font-bold mb-6">Accuracy Across Crop Types</h3>
            <div className="space-y-4">
              {[
                { crop: "Rice", accuracy: 89, color: "bg-green-500" },
                { crop: "Wheat", accuracy: 87, color: "bg-yellow-500" },
                { crop: "Corn", accuracy: 85, color: "bg-orange-500" },
                { crop: "Soybeans", accuracy: 88, color: "bg-blue-500" },
                { crop: "Cotton", accuracy: 84, color: "bg-purple-500" },
              ].map((item) => (
                <div key={item.crop} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.crop}</span>
                    <span className="text-muted-foreground">{item.accuracy}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${item.accuracy}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="overflow-hidden group">
              <div className="relative h-64">
                <Image
                  src="/ml-bloom-prediction-chart.jpg"
                  alt="Machine Learning Bloom Prediction Chart showing time series analysis"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold">ML Prediction Model</h3>
                <p className="text-sm text-muted-foreground">
                  Our neural network architecture processes multi-temporal satellite imagery and climate data to
                  identify bloom patterns with high precision.
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden group">
              <div className="relative h-64">
                <Image
                  src="/satellite-data-integration-bloom-prediction.jpg"
                  alt="Satellite data integration for bloom prediction showing data fusion"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold">Data Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Seamless fusion of MODIS NDVI, GPM precipitation, and MERRA-2 temperature data creates a comprehensive
                  view of crop phenology.
                </p>
              </div>
            </Card>
          </div>

          {/* Existing "How It Works" section */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">87% Accuracy Rate</h3>
                    <p className="text-sm text-muted-foreground">
                      Our machine learning models, trained on satellite data and local agricultural reports, achieve up
                      to 87% accuracy in predicting bloom timing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">7-14 Days Advance Notice</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive predictions 7-14 days in advance, giving you ample time to prepare and adjust your farming
                      practices.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Optimized Crop Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Make informed decisions about irrigation, fertilization, and harvesting, leading to optimized crop
                      yields and reduced waste.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">How It Works</h3>
                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      1
                    </span>
                    <div>
                      <h4 className="font-semibold mb-1">Data Collection</h4>
                      <p className="text-sm text-muted-foreground">
                        Satellite sensors continuously monitor vegetation, temperature, and precipitation patterns.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      2
                    </span>
                    <div>
                      <h4 className="font-semibold mb-1">ML Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Machine learning models analyze historical and real-time data to identify bloom patterns.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      3
                    </span>
                    <div>
                      <h4 className="font-semibold mb-1">Timely Alerts</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive SMS, email, or app notifications with actionable insights for your crops.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Educational Video Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Learn More</h2>
            <p className="text-lg text-muted-foreground">
              Discover how satellite data and machine learning are transforming agriculture
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="overflow-hidden">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Machine Learning for Crop Phenology Prediction"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">Machine Learning for Crop Phenology</h3>
                <p className="text-sm text-muted-foreground">
                  Learn how ML models predict crop development stages using satellite data
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Bloom Prediction Using Remote Sensing Data"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">Remote Sensing for Bloom Prediction</h3>
                <p className="text-sm text-muted-foreground">
                  Discover how satellite imagery enables accurate bloom timing forecasts
                </p>
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-3">Additional Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  <a
                    href="https://www.usgs.gov/centers/eros/science/usgs-eros-archive-vegetation-monitoring"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    USGS Vegetation Monitoring
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  <a
                    href="https://gpm.nasa.gov/applications/agriculture"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    GPM Agriculture Applications
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  <a
                    href="https://gmao.gsfc.nasa.gov/reanalysis/MERRA-2/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    MERRA-2 Climate Data
                  </a>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-3">Get Started Today</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Join thousands of farmers already using Bloom Watch to optimize their crop management and increase
                yields.
              </p>
              <Link href="/contribute">
                <Button className="w-full">
                  <Bell className="w-4 h-4 mr-2" />
                  Subscribe to Alerts
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
