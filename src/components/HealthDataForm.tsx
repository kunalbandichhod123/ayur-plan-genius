import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Activity, Sparkles, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HealthDataFormProps {
  patient: any;
  onBack: () => void;
  onPlanGenerated: (planData: any) => void;
}

const HealthDataForm = ({ patient, onBack, onPlanGenerated }: HealthDataFormProps) => {
  const [healthData, setHealthData] = useState({
    age: '',
    weight: '',
    height: '',
    bloodPressure: '',
    bodyType: '',
    digestiveFire: '',
    sleepPattern: '',
    stressLevel: '',
    foodPreferences: '',
    allergies: '',
    currentDiet: '',
    physicalActivity: '',
    medicalConditions: '',
    symptoms: '',
    constitution: '',
    lifestyle: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setHealthData(prev => ({ ...prev, [field]: value }));
  };

  const handleGeneratePlan = async () => {
    // Validate required fields
    const requiredFields = ['age', 'weight', 'height', 'bodyType', 'constitution'];
    const missingFields = requiredFields.filter(field => !healthData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Mock AI plan generation - in real app, this would call Supabase Edge Function
    setTimeout(() => {
      const planData = {
        patient,
        healthData,
        generatedAt: new Date().toISOString(),
        plan: "AI-generated diet plan based on patient data"
      };
      
      onPlanGenerated(planData);
      setIsGenerating(false);
    }, 3000);

    toast({
      title: "Generating Diet Plan...",
      description: "AI is analyzing the patient data to create a personalized plan",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-4xl font-bold text-foreground mb-2">Health Assessment</h1>
          <p className="text-muted-foreground">
            Collect comprehensive health data for {patient?.name || 'patient'} to generate personalized diet plan
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Patient Info Sidebar */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Name:</span> {patient?.name || 'New Patient'}
                </div>
                <div>
                  <span className="font-medium">Phone:</span> {patient?.phone || 'Not provided'}
                </div>
                <div>
                  <span className="font-medium">Constitution:</span> {patient?.constitution || 'To be determined'}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Data Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Metrics */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Basic Health Metrics</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="35"
                    value={healthData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg) *</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={healthData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm) *</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="170"
                    value={healthData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodPressure">Blood Pressure</Label>
                  <Input
                    id="bloodPressure"
                    placeholder="120/80"
                    value={healthData.bloodPressure}
                    onChange={(e) => handleInputChange('bloodPressure', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Ayurvedic Assessment */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Ayurvedic Constitution Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="constitution">Prakriti (Constitution) *</Label>
                    <Select onValueChange={(value) => handleInputChange('constitution', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select constitution" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vata">Vata</SelectItem>
                        <SelectItem value="pitta">Pitta</SelectItem>
                        <SelectItem value="kapha">Kapha</SelectItem>
                        <SelectItem value="vata-pitta">Vata-Pitta</SelectItem>
                        <SelectItem value="pitta-kapha">Pitta-Kapha</SelectItem>
                        <SelectItem value="vata-kapha">Vata-Kapha</SelectItem>
                        <SelectItem value="tridosha">Tridosha</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bodyType">Body Type *</Label>
                    <Select onValueChange={(value) => handleInputChange('bodyType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select body type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="thin">Thin/Lean</SelectItem>
                        <SelectItem value="medium">Medium Build</SelectItem>
                        <SelectItem value="heavy">Heavy/Solid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="digestiveFire">Digestive Fire (Agni)</Label>
                    <Select onValueChange={(value) => handleInputChange('digestiveFire', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select digestive strength" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="strong">Strong (Good appetite)</SelectItem>
                        <SelectItem value="variable">Variable (Irregular)</SelectItem>
                        <SelectItem value="weak">Weak (Poor appetite)</SelectItem>
                        <SelectItem value="excessive">Excessive (Always hungry)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sleepPattern">Sleep Pattern</Label>
                    <Select onValueChange={(value) => handleInputChange('sleepPattern', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sleep pattern" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light sleeper</SelectItem>
                        <SelectItem value="sound">Sound sleeper</SelectItem>
                        <SelectItem value="irregular">Irregular sleep</SelectItem>
                        <SelectItem value="insomnia">Insomnia/Disturbed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lifestyle & Diet */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Lifestyle & Dietary Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentDiet">Current Diet Pattern</Label>
                  <Textarea
                    id="currentDiet"
                    placeholder="Describe current eating habits, meal timings, food preferences..."
                    value={healthData.currentDiet}
                    onChange={(e) => handleInputChange('currentDiet', e.target.value)}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="physicalActivity">Physical Activity Level</Label>
                    <Select onValueChange={(value) => handleInputChange('physicalActivity', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select activity level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedentary">Sedentary</SelectItem>
                        <SelectItem value="light">Light activity</SelectItem>
                        <SelectItem value="moderate">Moderate activity</SelectItem>
                        <SelectItem value="high">High activity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stressLevel">Stress Level</Label>
                    <Select onValueChange={(value) => handleInputChange('stressLevel', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select stress level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="chronic">Chronic stress</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="allergies">Food Allergies & Intolerances</Label>
                  <Input
                    id="allergies"
                    placeholder="List any food allergies or intolerances"
                    value={healthData.allergies}
                    onChange={(e) => handleInputChange('allergies', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Medical History */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Medical History & Symptoms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="medicalConditions">Current Medical Conditions</Label>
                  <Textarea
                    id="medicalConditions"
                    placeholder="List any ongoing medical conditions, medications, or treatments..."
                    value={healthData.medicalConditions}
                    onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="symptoms">Current Symptoms or Concerns</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Describe any digestive issues, energy levels, skin problems, etc..."
                    value={healthData.symptoms}
                    onChange={(e) => handleInputChange('symptoms', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Generate Plan Button */}
            <Card className="shadow-healing bg-gradient-warm border-primary/20">
              <CardContent className="p-6 text-center">
                <Button
                  onClick={handleGeneratePlan}
                  variant="healing"
                  size="lg"
                  className="w-full"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Activity className="h-5 w-5 mr-2 animate-spin" />
                      Generating Personalized Plan...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Generate AI-Powered Diet Plan
                    </>
                  )}
                </Button>
                <p className="text-sm text-muted-foreground mt-3">
                  Our AI will analyze all the provided information to create a personalized Ayurvedic diet plan
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthDataForm;