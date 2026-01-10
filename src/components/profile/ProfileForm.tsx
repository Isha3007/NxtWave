import { useState } from "react";
import { UserProfile } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, MapPin, Briefcase, IndianRupee, Save, Sparkles } from "lucide-react";

interface ProfileFormProps {
  initialProfile?: UserProfile | null;
  onSave: (profile: UserProfile) => void;
  onRecommend: (profile: UserProfile) => void;
  isLoading?: boolean;
}

const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];
const incomeOptions = ["Below 2.5L", "2.5L - 5L", "5L - 10L", "Above 10L"];
const casteOptions = ["General", "OBC", "SC", "ST", "EWS", "Other"];
const disabilityOptions = ["Yes", "No"];

export function ProfileForm({ initialProfile, onSave, onRecommend, isLoading }: ProfileFormProps) {
  const [profile, setProfile] = useState<UserProfile>({
    fullName: initialProfile?.fullName || "",
    age: initialProfile?.age || "",
    gender: initialProfile?.gender || "",
    income: initialProfile?.income || "",
    occupation: initialProfile?.occupation || "",
    location: initialProfile?.location || "",
    casteCategory: initialProfile?.casteCategory || "",
    disability: initialProfile?.disability || "",
  });

  const handleChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(profile);
  };

  const handleRecommend = () => {
    onSave(profile);
    onRecommend(profile);
  };

  const isValid = 
    profile.age && 
    profile.gender && 
    profile.income && 
    profile.occupation && 
    profile.location && 
    profile.casteCategory && 
    profile.disability;

  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Citizen Profile
        </CardTitle>
        <CardDescription>
          Fill in your details to get personalized scheme recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name (Optional)</Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            value={profile.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
        </div>

        {/* Age & Gender Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age *</Label>
            <Input
              id="age"
              type="number"
              placeholder="25"
              value={profile.age}
              onChange={(e) => handleChange("age", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender *</Label>
            <Select
              value={profile.gender}
              onValueChange={(value) => handleChange("gender", value)}
            >
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {genderOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Income */}
        <div className="space-y-2">
          <Label htmlFor="income" className="flex items-center gap-2">
            <IndianRupee className="h-4 w-4" />
            Annual Income Range *
          </Label>
          <Select
            value={profile.income}
            onValueChange={(value) => handleChange("income", value)}
          >
            <SelectTrigger id="income">
              <SelectValue placeholder="Select income range" />
            </SelectTrigger>
            <SelectContent>
              {incomeOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Occupation */}
        <div className="space-y-2">
          <Label htmlFor="occupation" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Occupation *
          </Label>
          <Input
            id="occupation"
            placeholder="e.g., Farmer, Student, Self-employed"
            value={profile.occupation}
            onChange={(e) => handleChange("occupation", e.target.value)}
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location (State/City) *
          </Label>
          <Input
            id="location"
            placeholder="e.g., Maharashtra, Mumbai"
            value={profile.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>

        {/* Caste Category & Disability Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="caste">Caste Category *</Label>
            <Select
              value={profile.casteCategory}
              onValueChange={(value) => handleChange("casteCategory", value)}
            >
              <SelectTrigger id="caste">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {casteOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="disability">Disability *</Label>
            <Select
              value={profile.disability}
              onValueChange={(value) => handleChange("disability", value)}
            >
              <SelectTrigger id="disability">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {disabilityOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleSave}
            className="flex-1"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Profile
          </Button>
          <Button
            variant="hero"
            onClick={handleRecommend}
            disabled={!isValid || isLoading}
            className="flex-1"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isLoading ? "Finding Schemes..." : "Get Recommendations"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
