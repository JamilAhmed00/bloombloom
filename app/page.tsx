"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Menu, Globe, Map, Trophy, Upload, ChartBar as BarChart3, Sparkles, Leaf, Sun, Droplets, Bell, GraduationCap, MapPin, Database, ExternalLink, TrendingUp, CloudRain, Flower2 } from "lucide-react"
import Link from "next/link"
import { HeroCarousel } from "@/components/hero-carousel"

function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!hasAnimated) {
      let startTime: number | null = null
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setHasAnimated(true)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [end, duration, hasAnimated])

  return count
}

export default function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [impactVisible, setImpactVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = (window.scrollY / totalScroll) * 100
      setScrollProgress(currentProgress)

      const impactSection = document.getElementById("impact-section")
      if (impactSection) {
        const rect = impactSection.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.75 && !impactVisible) {
          setImpactVisible(true)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [impactVisible])

  const farmersCount = useCounter(impactVisible ? 10000 : 0, 2000)
  const studentsCount = useCounter(impactVisible ? 50000 : 0, 2000)
  const districtsCount = useCounter(impactVisible ? 100 : 0, 2000)
  const dataPointsCount = useCounter(impactVisible ? 1000000 : 0, 2000)

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`
    return num.toString()
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-primary animate-wave" />
            <span className="text-2xl font-bold text-balance">
              Bloom<span className="text-primary">Watch</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/globe" className="text-sm font-medium hover:text-primary transition-colors">
              Globe
            </Link>
            <Link href="/bangladesh" className="text-sm font-medium hover:text-primary transition-colors">
              Maps
            </Link>
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/game" className="text-sm font-medium hover:text-primary transition-colors">
              Game
            </Link>
            <Link href="/contribute" className="text-sm font-medium hover:text-primary transition-colors">
              Contribute
            </Link>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-muted">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${scrollProgress}%` }} />
        </div>
      </nav>

      {/* Hero Section - Immersive Storytelling */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated background elements - custom gradient */}
        <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#cc95c0] via-[#dbd4b4] to-[#7aa1d2]">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-float" />
          <div
            className="absolute top-40 right-20 w-80 h-80 bg-white/15 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-20 left-1/3 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-radial from-primary/30 via-primary/10 to-transparent blur-3xl" />
              <h1
                className="relative text-5xl md:text-7xl font-bold text-balance leading-tight animate-bloom"
                style={{ animationDelay: "0.2s" }}
              >
                The World's First{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Gamified
                </span>{" "}
                Global Bloom Observatory
              </h1>
            </div>

            <p
              className="text-xl md:text-2xl text-muted-foreground text-pretty max-w-3xl mx-auto animate-bloom"
              style={{ animationDelay: "0.4s" }}
            >
              Transform NASA Earth data, citizen science, and crop cycles into interactive maps, bloom predictions, and
              immersive storytelling. A digital guardian of nature's calendar.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-bloom"
              style={{ animationDelay: "0.6s" }}
            >
              <Link href="/globe">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 hover:scale-105 focus-visible:scale-105 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 text-lg px-8 transition-all duration-300"
                >
                  <Globe className="w-5 h-5 mr-2" />
                  Explore the Globe
                </Button>
              </Link>
              <Link href="/bangladesh">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 bg-transparent hover:bg-muted hover:scale-105 focus-visible:scale-105 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-300"
                >
                  <Map className="w-5 h-5 mr-2" />
                  View Bangladesh Map
                </Button>
              </Link>
            </div>

            <div className="mt-12 animate-bloom" style={{ animationDelay: "0.8s" }}>
              <HeroCarousel />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Story Section - Silent Signals */}
      <section className="py-24 bg-gradient-to-b from-[#dbd4b4]/20 via-white to-[#dbd4b4]/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Silent Signals from Nature</h2>
              <p className="text-xl text-muted-foreground text-pretty">
                Every spring, nature sends signals. Flowers bloom, crops awaken, and ecosystems pulse with life. But
                these signals are changing—shifting earlier, arriving later, or disappearing altogether. Climate change
                is rewriting nature's calendar.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="group p-6 space-y-4 hover:shadow-xl transition-all hover:-translate-y-2 duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center animate-pulse-glow mb-4">
                    <Sun className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    Rising Temperatures & Bloom Cycles
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Climate change is causing plants to bloom earlier. In the U.S., lilacs and honeysuckles are blooming
                    weeks ahead of historical patterns, disrupting crop yields and food security worldwide.
                  </p>
                  <img
                    src="/early-blooming-flowers-due-to-climate-change-with-.jpg"
                    alt="Early blooming patterns"
                    className="w-full h-32 object-cover rounded-lg mb-4 opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="space-y-2">
                    <a
                      href="https://www.epa.gov/climate-indicators/climate-change-indicators-leaf-and-bloom-dates"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      EPA Climate Indicators: Leaf & Bloom Dates
                    </a>
                    <p className="text-xs text-muted-foreground">
                      View trends across the contiguous 48 states showing earlier blooming patterns since 1970.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="group p-6 space-y-4 hover:shadow-xl transition-all hover:-translate-y-2 duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                    <Droplets className="w-6 h-6 text-secondary animate-wave" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    Changing Rainfall Patterns
                    <CloudRain className="w-4 h-4 text-secondary" />
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Hourly rainfall intensity has increased since 1970 in cities across the U.S. Global precipitation
                    analysis from 1891-2019 shows significant changes in rainfall distribution, affecting when and how
                    plants bloom.
                  </p>
                  <img
                    src="/rainfall-patterns-and-precipitation-changes-affect.jpg"
                    alt="Changing rainfall patterns"
                    className="w-full h-32 object-cover rounded-lg mb-4 opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="space-y-2">
                    <a
                      href="https://www.climatecentral.org/climate-matters/changing-rainfall-patterns"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-secondary hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Climate Central: Changing Rainfall Patterns
                    </a>
                    <a
                      href="https://www.nature.com/articles/s41598-020-67228-7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-secondary hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Nature: Global Precipitation Trends (1891-2019)
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="group p-6 space-y-4 hover:shadow-xl transition-all hover:-translate-y-2 duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 bg-accent/30 rounded-lg flex items-center justify-center mb-4">
                    <Leaf className="w-6 h-6 text-accent-foreground animate-float" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    Ecosystem Impacts
                    <Flower2 className="w-4 h-4 text-accent-foreground" />
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Climate change is altering the timing of plant blooming and pollinator activity, creating dangerous
                    mismatches. Flower traits like size, color, scent, and nectar production are changing, threatening
                    biodiversity and food systems.
                  </p>
                  <img
                    src="/bees-and-pollinators-on-flowers-showing-ecosystem-.jpg"
                    alt="Pollinator ecosystem impacts"
                    className="w-full h-32 object-cover rounded-lg mb-4 opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="space-y-2">
                    <a
                      href="https://earth.org/climate-change-is-altering-the-timing-of-plant-blooming-and-pollinator-activity/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-accent-foreground hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Earth.Org: Plant-Pollinator Mismatches
                    </a>
                    <a
                      href="https://www.pollinator.org/pollinators-climate-change"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-accent-foreground hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Pollinator.org: Climate Change Effects
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            <div className="text-center mt-12">
              <p className="text-lg text-muted-foreground mb-6">
                Bloom Watch uses NASA satellite data to track these changes in real-time, helping communities adapt to
                our changing climate.
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Explore Climate Data
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Our Solution: <span className="text-primary">Bloom Watch</span>
            </h2>
            <p className="text-xl text-muted-foreground text-pretty">
              We transform NASA satellite data into actionable insights, connecting farmers, students, and global
              citizens through an interactive platform that makes climate science accessible and engaging.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Link href="/globe">
              <Card className="p-6 space-y-4 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Globe className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">3D Interactive Globe</h3>
                <p className="text-muted-foreground">
                  Explore global bloom hotspots with animated seasonal progressions and NASA Blue Marble textures.
                </p>
              </Card>
            </Link>

            <Link href="/bangladesh">
              <Card className="p-6 space-y-4 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
                <div className="w-14 h-14 bg-secondary/20 rounded-xl flex items-center justify-center">
                  <Map className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">Bangladesh Maps</h3>
                <p className="text-muted-foreground">
                  District-level heatmaps for mango, rice, lotus, and sunflower with real-time bloom predictions.
                </p>
              </Card>
            </Link>

            <Link href="/dashboard">
              <Card className="p-6 space-y-4 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
                <div className="w-14 h-14 bg-accent/30 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Smart Dashboards</h3>
                <p className="text-muted-foreground">
                  Bloom intensity index, seasonal anomaly tracking, and climate correlation visualizations.
                </p>
              </Card>
            </Link>

            <Link href="/game">
              <Card className="p-6 space-y-4 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Trophy className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Predict the Bloom</h3>
                <p className="text-muted-foreground">
                  Gamified challenges with leaderboards, achievements, and school competitions.
                </p>
              </Card>
            </Link>

            <Link href="/arvr">
              <Card className="p-6 space-y-4 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
                <div className="w-14 h-14 bg-secondary/20 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">AR/VR Education</h3>
                <p className="text-muted-foreground">
                  Interactive lessons, pollinator's-eye view, and immersive climate science experiences.
                </p>
              </Card>
            </Link>

            <Link href="/contribute">
              <Card className="p-6 space-y-4 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
                <div className="w-14 h-14 bg-accent/30 rounded-xl flex items-center justify-center">
                  <Upload className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Citizen Science</h3>
                <p className="text-muted-foreground">
                  Upload local bloom photos, validate NASA predictions, and earn rewards for contributions.
                </p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact-section" className="py-24 bg-gradient-to-br from-[#cc95c0]/15 via-[#dbd4b4]/20 to-[#7aa1d2]/15">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">From Local Fields to Global Awareness</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Bloom Watch empowers communities around the world to monitor nature's rhythms, turning data into action.
              Through alerts, educational programs, and interactive maps, we are fostering a generation of informed
              citizens, resilient farmers, and passionate students.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Farmers Alerted */}
            <Link href="/contribute">
              <Card className="group relative overflow-hidden p-6 space-y-4 hover:shadow-2xl transition-all hover:-translate-y-2 duration-500 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Bell className="w-8 h-8 text-primary animate-pulse-glow" />
                  </div>
                  <div className="text-5xl font-bold text-primary mb-2">{formatNumber(farmersCount)}+</div>
                  <div className="text-lg font-semibold mb-2">Farmers Alerted</div>
                  <p className="text-sm text-muted-foreground">
                    Real-time alerts help farmers make critical decisions for crops and biodiversity.
                  </p>
                  <img
                    src="/farmer-checking-mobile-phone-in-field-with-notifica.jpg"
                    alt="Farmer receiving alerts"
                    className="w-full h-32 object-cover rounded-lg mt-4 opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </Card>
            </Link>

            {/* Students Learning */}
            <Link href="/arvr">
              <Card className="group relative overflow-hidden p-6 space-y-4 hover:shadow-2xl transition-all hover:-translate-y-2 duration-500 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-16 h-16 bg-secondary/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-8 h-8 text-secondary animate-wave" />
                  </div>
                  <div className="text-5xl font-bold text-secondary mb-2">{formatNumber(studentsCount)}+</div>
                  <div className="text-lg font-semibold mb-2">Students Learning</div>
                  <p className="text-sm text-muted-foreground">
                    Interactive lessons and immersive experiences inspire future environmental leaders.
                  </p>
                  <img
                    src="/students-using-tablets-and-ar-headsets-for-outdoor.jpg"
                    alt="Students learning"
                    className="w-full h-32 object-cover rounded-lg mt-4 opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </Card>
            </Link>

            {/* Districts Mapped */}
            <Link href="/bangladesh">
              <Card className="group relative overflow-hidden p-6 space-y-4 hover:shadow-2xl transition-all hover:-translate-y-2 duration-500 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-16 h-16 bg-accent/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-8 h-8 text-accent-foreground animate-float" />
                  </div>
                  <div className="text-5xl font-bold text-accent-foreground mb-2">{districtsCount}+</div>
                  <div className="text-lg font-semibold mb-2">Districts Mapped</div>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive mapping of flowering patterns, climate data, and local ecosystems.
                  </p>
                  <img
                    src="/interactive-map-with-color-coded-districts-showing.jpg"
                    alt="Districts mapped"
                    className="w-full h-32 object-cover rounded-lg mt-4 opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </Card>
            </Link>

            {/* Data Points Shared */}
            <Link href="/dashboard">
              <Card className="group relative overflow-hidden p-6 space-y-4 hover:shadow-2xl transition-all hover:-translate-y-2 duration-500 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Database className="w-8 h-8 text-primary animate-pulse-glow" />
                  </div>
                  <div className="text-5xl font-bold text-primary mb-2">{formatNumber(dataPointsCount)}+</div>
                  <div className="text-lg font-semibold mb-2">Data Points Shared</div>
                  <p className="text-sm text-muted-foreground">
                    Every observation contributes to a global understanding of climate and biodiversity trends.
                  </p>
                  <img
                    src="/earth-with-connected-nodes-representing-global-obs.jpg"
                    alt="Global data points"
                    className="w-full h-32 object-cover rounded-lg mt-4 opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </Card>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link href="/contribute">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                Join the Bloom Watch Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Ready to Explore Nature's Calendar?</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Join thousands of farmers, students, and citizens tracking bloom patterns worldwide.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/globe">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                  <Globe className="w-5 h-5 mr-2" />
                  Launch Globe View
                </Button>
              </Link>
              <Link href="/bangladesh">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                  <Map className="w-5 h-5 mr-2" />
                  Explore Bangladesh
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-gradient-to-b from-[#dbd4b4]/10 to-[#7aa1d2]/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Leaf className="w-6 h-6 text-primary" />
                <span className="text-lg font-bold">BloomWatch</span>
              </div>
              <p className="text-sm text-muted-foreground">
                A digital guardian of nature's calendar, powered by NASA Earth data.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/globe" className="hover:text-primary transition-colors">
                    3D Globe
                  </Link>
                </li>
                <li>
                  <Link href="/bangladesh" className="hover:text-primary transition-colors">
                    Interactive Maps
                  </Link>
                </li>
                <li>
                  <a href="#dashboard" className="hover:text-primary transition-colors">
                    Dashboards
                  </a>
                </li>
                <li>
                  <a href="#game" className="hover:text-primary transition-colors">
                    Games
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Data Sources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Research
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Citizen Science
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Education
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2025 Bloom Watch. Powered by NASA Earth Data.</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                English
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                বাংলা
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
