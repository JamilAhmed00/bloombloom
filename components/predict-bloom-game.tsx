"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Medal,
  Award,
  Star,
  Target,
  Calendar,
  TrendingUp,
  Users,
  Flame,
  Lock,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import dayjs from "dayjs"
import { toast } from "sonner"

interface Challenge {
  id: string
  crop: string
  location: string
  question: string
  mlPrediction: string
  points: number
  difficulty: "easy" | "medium" | "hard"
  deadline: string
  type: "date" | "slider" | "radio"
  options?: string[]
}

interface LeaderboardEntry {
  rank: number
  name: string
  points: number
  accuracy: number
  streak: number
  badge: string
  delta: number
}

const ACTIVE_CHALLENGES: Challenge[] = [
  {
    id: "1",
    crop: "Mango",
    location: "Rajshahi",
    question: "When will mango trees reach peak bloom?",
    mlPrediction: "April 15, 2025",
    points: 100,
    difficulty: "medium",
    deadline: "2025-04-10",
    type: "date",
  },
  {
    id: "2",
    crop: "Rice",
    location: "Dhaka",
    question: "Predict the rice bloom intensity (0-100%)",
    mlPrediction: "85%",
    points: 75,
    difficulty: "easy",
    deadline: "2025-04-12",
    type: "slider",
  },
  {
    id: "3",
    crop: "Lotus",
    location: "Sylhet",
    question: "Will lotus bloom early, on-time, or late?",
    mlPrediction: "On-time",
    points: 150,
    difficulty: "hard",
    deadline: "2025-04-08",
    type: "radio",
    options: ["Early", "On-time", "Late"],
  },
]

const GLOBAL_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "Dr. Rahman", points: 2850, accuracy: 94, streak: 12, badge: "Bloom Master", delta: 0 },
  { rank: 2, name: "Sarah Chen", points: 2640, accuracy: 91, streak: 8, badge: "Phenology Expert", delta: 1 },
  { rank: 3, name: "Ahmed K.", points: 2420, accuracy: 89, streak: 15, badge: "Climate Guardian", delta: -1 },
  { rank: 4, name: "Maria Silva", points: 2180, accuracy: 87, streak: 6, badge: "Bloom Tracker", delta: 2 },
  { rank: 5, name: "You", points: 1950, accuracy: 85, streak: 5, badge: "Rising Star", delta: 0 },
  { rank: 6, name: "John Smith", points: 1820, accuracy: 83, streak: 4, badge: "Nature Observer", delta: -2 },
  { rank: 7, name: "Fatima Ali", points: 1650, accuracy: 81, streak: 7, badge: "Bloom Enthusiast", delta: 1 },
  { rank: 8, name: "Li Wei", points: 1480, accuracy: 79, streak: 3, badge: "Data Explorer", delta: 0 },
  { rank: 9, name: "Carlos Ruiz", points: 1320, accuracy: 77, streak: 2, badge: "Bloom Watcher", delta: -1 },
  { rank: 10, name: "Aisha Khan", points: 1180, accuracy: 75, streak: 6, badge: "Nature Fan", delta: 1 },
]

const BANGLADESH_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "Dr. Rahman", points: 2850, accuracy: 94, streak: 12, badge: "Bloom Master", delta: 0 },
  { rank: 2, name: "Ahmed K.", points: 2420, accuracy: 89, streak: 15, badge: "Climate Guardian", delta: -1 },
  { rank: 3, name: "You", points: 1950, accuracy: 85, streak: 5, badge: "Rising Star", delta: 0 },
  { rank: 4, name: "Fatima Ali", points: 1650, accuracy: 81, streak: 7, badge: "Bloom Enthusiast", delta: 1 },
  { rank: 5, name: "Karim Hassan", points: 1420, accuracy: 78, streak: 4, badge: "Nature Observer", delta: 0 },
]

const ACHIEVEMENTS = [
  { id: "1", name: "First Prediction", description: "Make your first bloom prediction", icon: Target, unlocked: true },
  { id: "2", name: "Perfect Week", description: "Get 7 predictions correct in a row", icon: Star, unlocked: true },
  { id: "3", name: "Bloom Guardian", description: "Reach 1000 points", icon: Award, unlocked: true },
  { id: "4", name: "Climate Expert", description: "Achieve 90% accuracy", icon: Trophy, unlocked: false },
  { id: "5", name: "Global Leader", description: "Reach top 10 globally", icon: Medal, unlocked: false },
  { id: "6", name: "Streak Master", description: "Maintain 30-day streak", icon: TrendingUp, unlocked: false },
]

function CountdownTimer({ deadline }: { deadline: string }) {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const updateCountdown = () => {
      const now = dayjs()
      const end = dayjs(deadline)
      const diff = end.diff(now)

      if (diff <= 0) {
        setTimeLeft("Expired")
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      setTimeLeft(`${days}d ${hours}h ${minutes}m`)
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 60000)

    return () => clearInterval(interval)
  }, [deadline])

  return <span>{timeLeft}</span>
}

function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = value
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value, duration])

  return <span>{count}</span>
}

export function PredictBloomGame() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
  const [userPrediction, setUserPrediction] = useState<string | number>("")
  const [compareWithML, setCompareWithML] = useState(false)
  const [howToPlayOpen, setHowToPlayOpen] = useState(false)
  const [sliderValue, setSliderValue] = useState([50])
  const [radioValue, setRadioValue] = useState("")

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-primary/10 text-primary border-primary/20"
      case "medium":
        return "bg-secondary/20 text-secondary border-secondary/20"
      case "hard":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      default:
        return "bg-muted"
    }
  }

  const handleSubmitPrediction = () => {
    if (!selectedChallenge) return

    let prediction = ""
    if (selectedChallenge.type === "date") {
      prediction = userPrediction as string
    } else if (selectedChallenge.type === "slider") {
      prediction = `${sliderValue[0]}%`
    } else if (selectedChallenge.type === "radio") {
      prediction = radioValue
    }

    if (!prediction) {
      toast.error("Please make a prediction")
      return
    }

    toast.success(`Prediction submitted for ${selectedChallenge.crop}!`, {
      description: `You predicted: ${prediction}`,
    })

    setSelectedChallenge(null)
    setUserPrediction("")
    setSliderValue([50])
    setRadioValue("")
  }

  const getRankDeltaIcon = (delta: number) => {
    if (delta > 0) return <ArrowUp className="w-4 h-4 text-green-500" />
    if (delta < 0) return <ArrowDown className="w-4 h-4 text-red-500" />
    return <Minus className="w-4 h-4 text-muted-foreground" />
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">Predict the Bloom</h1>
            <p className="text-lg text-muted-foreground">Gamified bloom prediction challenges</p>
          </div>

          <Collapsible open={howToPlayOpen} onOpenChange={setHowToPlayOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between bg-transparent">
                <span>How to Play</span>
                {howToPlayOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Select a Challenge</h4>
                      <p className="text-sm text-muted-foreground">
                        Choose from active bloom prediction challenges for different crops and locations.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Make Your Prediction</h4>
                      <p className="text-sm text-muted-foreground">
                        Submit your prediction before the deadline. Compare with our ML model for insights.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Earn Points & Climb the Leaderboard</h4>
                      <p className="text-sm text-muted-foreground">
                        Accurate predictions earn points. Build streaks, unlock achievements, and compete globally!
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Points</div>
              <Trophy className="w-4 h-4 text-secondary" />
            </div>
            <div className="text-3xl font-bold">
              <AnimatedCounter value={1950} />
            </div>
            <div className="text-xs text-muted-foreground mt-1">Total earned</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Rank</div>
              <Medal className="w-4 h-4 text-primary" />
            </div>
            <div className="text-3xl font-bold">#5</div>
            <div className="text-xs text-primary mt-1">Global</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Accuracy</div>
              <Target className="w-4 h-4 text-primary" />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={85}
                  text="85%"
                  styles={buildStyles({
                    textSize: "24px",
                    pathColor: "hsl(var(--primary))",
                    textColor: "hsl(var(--foreground))",
                    trailColor: "hsl(var(--muted))",
                  })}
                />
              </div>
              <div className="text-xs text-muted-foreground">42/50</div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Streak</div>
              <Flame className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-3xl font-bold flex items-center gap-2">
              <Flame className="w-8 h-8 text-orange-500" />5
            </div>
            <div className="text-xs text-muted-foreground mt-1">days (best: 8)</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Achievements</div>
              <Award className="w-4 h-4 text-accent" />
            </div>
            <div className="text-3xl font-bold">3/6</div>
            <Progress value={50} className="mt-2" />
          </Card>
        </motion.div>

        <Tabs defaultValue="challenges" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="challenges">Active Challenges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
          </TabsList>

          <TabsContent value="challenges" className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              {ACTIVE_CHALLENGES.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className="p-4 cursor-pointer transition-all hover:shadow-lg"
                    onClick={() => setSelectedChallenge(challenge)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-lg">{challenge.crop} Bloom Prediction</h4>
                        <Badge className={getDifficultyColor(challenge.difficulty)} variant="outline">
                          {challenge.difficulty}
                        </Badge>
                      </div>

                      <Badge variant="secondary" className="text-xs">
                        {challenge.location}
                      </Badge>

                      <p className="text-sm text-muted-foreground">{challenge.question}</p>

                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="text-2xl font-bold text-secondary">{challenge.points} pts</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <CountdownTimer deadline={challenge.deadline} />
                        </div>
                      </div>

                      <Button size="sm" className="w-full">
                        Select Challenge
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <Tabs defaultValue="global">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="global">
                  <Users className="w-4 h-4 mr-2" />
                  Global
                </TabsTrigger>
                <TabsTrigger value="bangladesh">Bangladesh</TabsTrigger>
              </TabsList>

              <TabsContent value="global" className="mt-4">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Top 10 Global</h3>
                  <div className="space-y-2">
                    {GLOBAL_LEADERBOARD.map((entry, index) => (
                      <motion.div
                        key={entry.rank}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                          entry.name === "You"
                            ? "bg-primary/10 border-2 border-primary sticky top-0 z-10"
                            : "bg-muted/30 hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background font-bold">
                            {entry.rank <= 3 ? (
                              <Medal
                                className={`w-6 h-6 ${
                                  entry.rank === 1
                                    ? "text-yellow-500"
                                    : entry.rank === 2
                                      ? "text-gray-400"
                                      : "text-orange-600"
                                }`}
                              />
                            ) : (
                              entry.rank
                            )}
                          </div>
                          {getRankDeltaIcon(entry.delta)}
                        </div>

                        <div className="flex-1">
                          <div className="font-semibold">{entry.name}</div>
                          <div className="text-sm text-muted-foreground">{entry.badge}</div>
                        </div>

                        <div className="text-right">
                          <div className="font-bold text-lg">{entry.points.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">{entry.accuracy}% accuracy</div>
                        </div>

                        <div className="flex items-center gap-1 text-sm">
                          <Flame className="w-4 h-4 text-orange-500" />
                          <span className="font-medium">{entry.streak}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="bangladesh" className="mt-4">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Bangladesh Leaderboard</h3>
                  <div className="space-y-2">
                    {BANGLADESH_LEADERBOARD.map((entry, index) => (
                      <motion.div
                        key={entry.rank}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                          entry.name === "You"
                            ? "bg-primary/10 border-2 border-primary sticky top-0 z-10"
                            : "bg-muted/30 hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background font-bold">
                            {entry.rank <= 3 ? (
                              <Medal
                                className={`w-6 h-6 ${
                                  entry.rank === 1
                                    ? "text-yellow-500"
                                    : entry.rank === 2
                                      ? "text-gray-400"
                                      : "text-orange-600"
                                }`}
                              />
                            ) : (
                              entry.rank
                            )}
                          </div>
                          {getRankDeltaIcon(entry.delta)}
                        </div>

                        <div className="flex-1">
                          <div className="font-semibold">{entry.name}</div>
                          <div className="text-sm text-muted-foreground">{entry.badge}</div>
                        </div>

                        <div className="text-right">
                          <div className="font-bold text-lg">{entry.points.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">{entry.accuracy}% accuracy</div>
                        </div>

                        <div className="flex items-center gap-1 text-sm">
                          <Flame className="w-4 h-4 text-orange-500" />
                          <span className="font-medium">{entry.streak}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Your Achievements</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ACHIEVEMENTS.map((achievement, index) => {
                  const Icon = achievement.icon
                  return (
                    <Tooltip key={achievement.id}>
                      <TooltipTrigger asChild>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                            achievement.unlocked ? "bg-primary/5 border-primary" : "bg-muted/30 border-muted opacity-60"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center relative ${
                                achievement.unlocked ? "bg-primary/10" : "bg-muted"
                              }`}
                            >
                              <Icon
                                className={`w-6 h-6 ${achievement.unlocked ? "text-primary" : "text-muted-foreground"}`}
                              />
                              {!achievement.unlocked && (
                                <Lock className="w-4 h-4 absolute -top-1 -right-1 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold mb-1">{achievement.name}</div>
                              <div className="text-sm text-muted-foreground">{achievement.description}</div>
                            </div>
                          </div>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{achievement.unlocked ? "Unlocked!" : "Keep playing to unlock"}</p>
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progress to Next Badge</span>
                  <span className="text-sm text-muted-foreground">50%</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">School Competition Active!</h3>
                      <p className="text-muted-foreground">
                        Join your school team and compete for the top spot. Prizes for top 3 schools!
                      </p>
                    </div>
                    <Button size="lg">Join Competition</Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <Card className="p-4">
                      <h4 className="font-semibold mb-2">Your Team Rank</h4>
                      <div className="text-4xl font-bold text-primary">#12</div>
                      <p className="text-sm text-muted-foreground mt-1">Out of 45 schools</p>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-semibold mb-2">Team Progress</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Points to Top 10</span>
                          <span className="font-medium">320 pts</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                    </Card>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        <Dialog open={!!selectedChallenge} onOpenChange={() => setSelectedChallenge(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedChallenge?.crop} Bloom Prediction</DialogTitle>
              <DialogDescription>
                {selectedChallenge?.location} • {selectedChallenge?.points} points
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <p className="text-sm mb-4">{selectedChallenge?.question}</p>

                {selectedChallenge?.type === "date" && (
                  <div>
                    <Label htmlFor="date-input">Select Date</Label>
                    <Input
                      id="date-input"
                      type="date"
                      value={userPrediction as string}
                      onChange={(e) => setUserPrediction(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                )}

                {selectedChallenge?.type === "slider" && (
                  <div>
                    <Label>Bloom Intensity: {sliderValue[0]}%</Label>
                    <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} className="mt-4" />
                  </div>
                )}

                {selectedChallenge?.type === "radio" && (
                  <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                    {selectedChallenge.options?.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <Label htmlFor="compare-ml" className="text-sm">
                  Compare with ML model
                </Label>
                <Switch id="compare-ml" checked={compareWithML} onCheckedChange={setCompareWithML} />
              </div>

              {compareWithML && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 rounded-lg bg-primary/10 border border-primary/20"
                >
                  <p className="text-sm">
                    <span className="font-medium">ML Prediction:</span> {selectedChallenge?.mlPrediction}
                  </p>
                </motion.div>
              )}

              <div className="flex gap-2">
                <Button onClick={handleSubmitPrediction} className="flex-1">
                  Submit Prediction
                </Button>
                <Button variant="outline" onClick={() => setSelectedChallenge(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}
