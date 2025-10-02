"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Eye,
  Leaf,
  Globe,
  Sparkles,
  ExternalLink,
  Play,
  BookOpen,
  Users,
  Flower2,
  Bug,
  CloudRain,
  TreePine,
  ArrowLeft,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export default function ARVREducationPage() {
  const [activeExperience, setActiveExperience] = useState<string | null>(null)

  const pollinatorExperiences = [
    {
      id: "pollinator-park",
      title: "Pollinator Park VR",
      subtitle: "A Journey to 2050",
      description:
        "Experience a futuristic park in 2050 showcasing a world without pollinators. Navigate through this immersive VR experience to understand the critical importance of pollinators and the devastating consequences of their decline.",
      icon: Bug,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      features: ["Time Travel to 2050", "Interactive Scenarios", "Educational Narratives", "Impact Visualization"],
      link: "https://www.provideocoalition.com/pollinator-park-vr-experience/",
      image: "/futuristic-park-with-pollinators-vr-experience.jpg",
      type: "VR Headset",
    },
    {
      id: "pollinator-eye-view",
      title: "Pollinator's-Eye View AR",
      subtitle: "See Through Their Eyes",
      description:
        "Use mobile AR to experience the world from a pollinator's perspective. Follow flight paths, see UV patterns on flowers invisible to human eyes, and understand how pollinators navigate their environment.",
      icon: Eye,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      features: ["Mobile AR", "UV Vision Simulation", "Flight Path Tracking", "Flower Recognition"],
      link: "https://blog.siggraph.org/2020/08/exploring-biodiversity-through-mobile-ar.html/",
      image: "/bee-eye-view-of-flowers-with-uv-patterns.jpg",
      type: "Mobile AR",
    },
    {
      id: "natures-pollinators",
      title: "Nature's Pollinators AR",
      subtitle: "Interactive Flashcards for Kids",
      description:
        "An AR project designed for children to learn about pollinating insects through interactive flashcards. Explore the fascinating relationships between specific insects and flowers in an engaging, educational format.",
      icon: Flower2,
      color: "text-pink-400",
      bgColor: "bg-pink-400/10",
      features: ["AR Flashcards", "Kid-Friendly", "Insect-Flower Matching", "Educational Games"],
      link: "https://riyamahajan.com/natures-pollinators",
      image: "/children-learning-about-bees-and-flowers-with-ar.jpg",
      type: "Mobile AR",
    },
  ]

  const climateExperiences = [
    {
      id: "climate-vr",
      title: "Climate Science VR",
      subtitle: "Collaborative Learning",
      description:
        "A comprehensive VR program promoting collaborative learning about climate science. Brings together diverse voices to co-create educational resources addressing climate and sociopolitical challenges.",
      icon: Globe,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      features: [
        "Collaborative Learning",
        "Climate Data Visualization",
        "Interactive Scenarios",
        "Global Perspectives",
      ],
      link: "https://climetime.org/",
      image: "/climate-change-visualization-in-vr.jpg",
      type: "VR Headset",
    },
    {
      id: "ar-sustainability",
      title: "AR Climate Awareness",
      subtitle: "Sustainability in Action",
      description:
        "Explore AR applications in environmental science offering immersive and interactive experiences that enhance climate awareness and promote sustainability through real-world overlays.",
      icon: TreePine,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      features: ["Environmental AR", "Sustainability Metrics", "Real-World Overlays", "Action Tracking"],
      link: "https://vrwiki.cs.brown.edu/",
      image: "/augmented-reality-showing-climate-data-on-environm.jpg",
      type: "Mobile AR",
    },
    {
      id: "immersive-climate",
      title: "Immersive Climate Learning",
      subtitle: "VR Field Trips",
      description:
        "Take students on exciting VR field trips to explore climate change firsthand. Experience melting glaciers, rising sea levels, and ecosystem changes through immersive virtual reality.",
      icon: CloudRain,
      color: "text-cyan-400",
      bgColor: "bg-cyan-400/10",
      features: ["Virtual Field Trips", "Climate Simulations", "Ecosystem Exploration", "Educational Curriculum"],
      link: "https://www.classvr.com/",
      image: "/students-exploring-melting-glaciers-in-vr.jpg",
      type: "VR Headset",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            <Leaf className="w-8 h-8 text-primary animate-wave" />
            <span className="text-2xl font-bold">
              Bloom<span className="text-primary">Watch</span>
            </span>
          </Link>
          <Badge variant="secondary" className="text-sm">
            AR/VR Education
          </Badge>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-float" />
          <div
            className="absolute top-40 right-20 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-20 left-1/3 w-44 h-44 bg-green-500/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Immersive Learning Experiences</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
              AR/VR <span className="text-primary">Education</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Step into the world of pollinators and climate science through cutting-edge augmented and virtual reality
              experiences. Learn, explore, and take action.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                <Eye className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium">Pollinator Perspectives</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                <Globe className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium">Climate Simulations</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                <BookOpen className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium">Interactive Learning</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="pollinators" className="max-w-7xl mx-auto">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="pollinators" className="text-base">
                <Bug className="w-4 h-4 mr-2" />
                Pollinators
              </TabsTrigger>
              <TabsTrigger value="climate" className="text-base">
                <Globe className="w-4 h-4 mr-2" />
                Climate Science
              </TabsTrigger>
            </TabsList>

            {/* Pollinator Experiences */}
            <TabsContent value="pollinators" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Pollinator's-Eye View Experiences</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Discover the world through the eyes of bees, butterflies, and other vital pollinators. Understand
                  their crucial role in our ecosystem.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pollinatorExperiences.map((exp) => (
                  <Card
                    key={exp.id}
                    className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={exp.image || "/placeholder.svg"}
                        alt={exp.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                      <Badge className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm">{exp.type}</Badge>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-12 h-12 ${exp.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}
                        >
                          <exp.icon className={`w-6 h-6 ${exp.color}`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                          <p className="text-sm text-muted-foreground">{exp.subtitle}</p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {exp.features.map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1" onClick={() => setActiveExperience(exp.id)}>
                          <Play className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button variant="outline" asChild>
                          <a href={exp.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Climate Experiences */}
            <TabsContent value="climate" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Immersive Climate Science</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Experience climate change firsthand through virtual reality. Witness the impact, understand the
                  science, and inspire action.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {climateExperiences.map((exp) => (
                  <Card
                    key={exp.id}
                    className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={exp.image || "/placeholder.svg"}
                        alt={exp.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                      <Badge className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm">{exp.type}</Badge>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-12 h-12 ${exp.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}
                        >
                          <exp.icon className={`w-6 h-6 ${exp.color}`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                          <p className="text-sm text-muted-foreground">{exp.subtitle}</p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {exp.features.map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1" onClick={() => setActiveExperience(exp.id)}>
                          <Play className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button variant="outline" asChild>
                          <a href={exp.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why AR/VR Education?</h2>
            <p className="text-lg text-muted-foreground">
              Immersive technologies transform abstract concepts into tangible experiences, making learning more
              engaging and memorable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="p-6 space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Experiential Learning</h3>
              <p className="text-muted-foreground">
                Students don't just read about pollinators—they become them, experiencing the world from a completely
                new perspective.
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Collaborative Discovery</h3>
              <p className="text-muted-foreground">
                VR brings students together to explore climate challenges, fostering teamwork and diverse perspectives.
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <div className="w-12 h-12 bg-accent/30 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Lasting Impact</h3>
              <p className="text-muted-foreground">
                Immersive experiences create emotional connections that inspire real-world action and environmental
                stewardship.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Education?</h2>
            <p className="text-lg text-muted-foreground">
              Bring these immersive experiences to your classroom or explore them on your own. The future of learning is
              here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  View Dashboard
                </Button>
              </Link>
              <Link href="/contribute">
                <Button size="lg" variant="outline">
                  <Users className="w-5 h-5 mr-2" />
                  Join Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
