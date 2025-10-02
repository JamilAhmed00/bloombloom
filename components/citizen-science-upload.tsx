"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, MapPin, Camera, CheckCircle2, Star, Award, ImageIcon } from "lucide-react"

interface Observation {
  id: string
  user: string
  crop: string
  location: string
  date: string
  status: "pending" | "validated" | "rejected"
  points: number
  image: string
}

const RECENT_OBSERVATIONS: Observation[] = [
  {
    id: "1",
    user: "Sarah M.",
    crop: "Mango",
    location: "Rajshahi",
    date: "2 hours ago",
    status: "validated",
    points: 50,
    image: "/mango-blossom.jpg",
  },
  {
    id: "2",
    user: "Ahmed K.",
    crop: "Rice",
    location: "Dhaka",
    date: "5 hours ago",
    status: "validated",
    points: 50,
    image: "/rice-flower.jpg",
  },
  {
    id: "3",
    user: "Fatima A.",
    crop: "Lotus",
    location: "Sylhet",
    date: "1 day ago",
    status: "pending",
    points: 0,
    image: "/lotus-bloom.jpg",
  },
  {
    id: "4",
    user: "John D.",
    crop: "Sunflower",
    location: "Rangpur",
    date: "2 days ago",
    status: "validated",
    points: 50,
    image: "/single-sunflower.png",
  },
]

export function CitizenScienceUpload() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [formData, setFormData] = useState({
    crop: "",
    location: "",
    latitude: "",
    longitude: "",
    notes: "",
  })

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would upload to the backend
    alert("Observation submitted! You'll earn points once validated.")
    // Reset form
    setSelectedImage(null)
    setPreviewUrl("")
    setFormData({
      crop: "",
      location: "",
      latitude: "",
      longitude: "",
      notes: "",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "validated":
        return (
          <Badge className="bg-primary/10 text-primary">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Validated
          </Badge>
        )
      case "pending":
        return <Badge variant="outline">Pending Review</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Your Contributions</div>
            <Camera className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-bold">24</div>
          <div className="text-xs text-muted-foreground mt-1">18 validated</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Points Earned</div>
            <Star className="w-4 h-4 text-secondary" />
          </div>
          <div className="text-3xl font-bold">900</div>
          <div className="text-xs text-secondary mt-1">+50 this week</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Validation Rate</div>
            <CheckCircle2 className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-bold">75%</div>
          <div className="text-xs text-muted-foreground mt-1">18 of 24 approved</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Contributor Rank</div>
            <Award className="w-4 h-4 text-accent" />
          </div>
          <div className="text-3xl font-bold">#12</div>
          <div className="text-xs text-muted-foreground mt-1">In Bangladesh</div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upload form */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6">Submit Bloom Observation</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image upload */}
            <div className="space-y-2">
              <Label>Photo of Bloom</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" id="image-upload" />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {previewUrl ? (
                    <div className="space-y-4">
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-lg"
                      />
                      <Button type="button" variant="outline" size="sm">
                        Change Photo
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                      <div>
                        <p className="font-medium">Click to upload or drag and drop</p>
                        <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                      </div>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Crop selection */}
            <div className="space-y-2">
              <Label htmlFor="crop">Crop Type</Label>
              <Select value={formData.crop} onValueChange={(value) => setFormData({ ...formData, crop: value })}>
                <SelectTrigger id="crop">
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mango">Mango</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="lotus">Lotus</SelectItem>
                  <SelectItem value="sunflower">Sunflower</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="e.g., Rajshahi, Bangladesh"
                  className="pl-10"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </div>

            {/* GPS coordinates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  placeholder="24.3636"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  placeholder="88.6241"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Describe bloom stage, weather conditions, or other observations..."
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            {/* Submit button */}
            <Button type="submit" className="w-full" disabled={!selectedImage || !formData.crop || !formData.location}>
              <Upload className="w-4 h-4 mr-2" />
              Submit Observation
            </Button>

            {/* Info */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-sm">
              <p className="font-medium mb-2">Earn Rewards:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• 50 points for validated observations</li>
                <li>• Bonus points for rare species or early detections</li>
                <li>• Help improve ML model accuracy</li>
                <li>• Contribute to climate research</li>
              </ul>
            </div>
          </form>
        </Card>

        {/* Recent observations */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Recent Community Observations</h3>

            <div className="space-y-4">
              {RECENT_OBSERVATIONS.map((obs) => (
                <div key={obs.id} className="flex gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <img
                    src={obs.image || "/placeholder.svg"}
                    alt={obs.crop}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold">{obs.crop}</div>
                        <div className="text-sm text-muted-foreground">{obs.location}</div>
                      </div>
                      {getStatusBadge(obs.status)}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="text-muted-foreground">
                        by {obs.user} • {obs.date}
                      </div>
                      {obs.status === "validated" && (
                        <div className="flex items-center gap-1 text-secondary font-medium">
                          <Star className="w-3 h-3" />+{obs.points}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Guidelines */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Submission Guidelines</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium">Clear Photos</div>
                  <div className="text-muted-foreground">Take well-lit, focused photos of blooms</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium">Accurate Location</div>
                  <div className="text-muted-foreground">Enable GPS or manually enter coordinates</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium">Correct Identification</div>
                  <div className="text-muted-foreground">Ensure crop type is accurately identified</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium">Timely Submission</div>
                  <div className="text-muted-foreground">Submit within 24 hours of observation</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Impact section */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Your Impact</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your observations help validate NASA predictions and improve our ML models. Together, we're building the
              world's largest bloom database!
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div>
                <div className="text-2xl font-bold text-primary">2,450</div>
                <div className="text-muted-foreground">Total observations</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">87%</div>
                <div className="text-muted-foreground">Model accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">45</div>
                <div className="text-muted-foreground">Countries</div>
              </div>
            </div>
          </div>
          <ImageIcon className="w-24 h-24 text-primary/20" />
        </div>
      </Card>
    </div>
  )
}
