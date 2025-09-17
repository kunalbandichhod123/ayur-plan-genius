import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Download, Edit, Check, Clock, Utensils, Leaf, Sun, Moon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DietPlanReviewProps {
  patient: any;
  onBack: () => void;
}

const DietPlanReview = ({ patient, onBack }: DietPlanReviewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState('');
  const { toast } = useToast();

  // Mock generated diet plan - in real app, this would come from AI processing
  const dietPlan = {
    patientInfo: {
      name: patient?.name || "Patient Name",
      constitution: "Vata-Pitta",
      generatedDate: new Date().toLocaleDateString()
    },
    morningRoutine: {
      wakeUp: "6:00 AM",
      activities: [
        "Drink warm water with lemon and honey",
        "Light meditation or pranayama (5-10 minutes)",
        "Oil pulling with sesame oil"
      ]
    },
    meals: {
      breakfast: {
        time: "7:30 - 8:30 AM",
        items: [
          "Oatmeal with almonds, dates, and cardamom",
          "Herbal tea (ginger or fennel)",
          "Fresh seasonal fruits (avoid citrus)"
        ],
        notes: "Eat slowly and mindfully. Avoid cold beverages."
      },
      lunch: {
        time: "12:00 - 1:00 PM",
        items: [
          "Basmati rice with ghee",
          "Dal (moong or masoor) with turmeric",
          "Seasonal vegetables (cooked with mild spices)",
          "Fresh buttermilk with cumin"
        ],
        notes: "Largest meal of the day. Eat in a calm environment."
      },
      snack: {
        time: "4:00 - 5:00 PM",
        items: [
          "Herbal tea with digestive biscuits",
          "Or handful of soaked almonds",
          "Or fresh coconut water"
        ],
        notes: "Light snack only if hungry."
      },
      dinner: {
        time: "7:00 - 8:00 PM",
        items: [
          "Light vegetable soup",
          "Chapati with cooked vegetables",
          "Small portion of dal",
          "Warm milk with turmeric before bed"
        ],
        notes: "Eat 2-3 hours before sleep. Keep portions smaller."
      }
    },
    guidelines: [
      "Eat at regular times daily",
      "Avoid ice-cold drinks and foods",
      "Include warming spices: ginger, cumin, fennel",
      "Practice mindful eating - chew slowly",
      "Stay hydrated with warm water throughout the day"
    ],
    restrictions: [
      "Reduce raw salads and cold foods",
      "Limit caffeine and alcohol",
      "Avoid processed and packaged foods",
      "Minimize spicy and oily foods"
    ],
    herbs: [
      "Triphala (before bed for digestion)",
      "Ashwagandha (for stress management)",
      "Fennel seeds (after meals for digestion)"
    ]
  };

  const handleSaveChanges = () => {
    toast({
      title: "Diet Plan Updated!",
      description: "Your changes have been saved successfully",
    });
    setIsEditing(false);
  };

  const handleDownload = () => {
    toast({
      title: "Downloading Diet Plan",
      description: "PDF will be generated and downloaded shortly",
    });
    // In real app, this would generate and download PDF
  };

  const handleApprove = () => {
    toast({
      title: "Diet Plan Approved!",
      description: "The patient will now be able to access their diet plan",
    });
    onBack();
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Diet Plan Review</h1>
              <p className="text-muted-foreground">
                Review and customize the AI-generated diet plan for {dietPlan.patientInfo.name}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "gold" : "gentle"}
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? "Save Changes" : "Edit Plan"}
              </Button>
              <Button
                onClick={handleDownload}
                variant="outline"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Patient Info Card */}
        <Card className="shadow-soft mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Patient Information</span>
              <Badge className="bg-primary/20 text-primary">
                Constitution: {dietPlan.patientInfo.constitution}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Patient:</span> {dietPlan.patientInfo.name}
              </div>
              <div>
                <span className="font-medium">Generated:</span> {dietPlan.patientInfo.generatedDate}
              </div>
              <div>
                <span className="font-medium">Status:</span> 
                <Badge variant="secondary" className="ml-2">Pending Review</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Morning Routine */}
        <Card className="shadow-soft mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-gold" />
              Morning Routine
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Wake up: {dietPlan.morningRoutine.wakeUp}</span>
              </div>
              <ul className="space-y-2 ml-6">
                {dietPlan.morningRoutine.activities.map((activity, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    {isEditing ? (
                      <Textarea
                        value={activity}
                        onChange={(e) => {/* Handle edit */}}
                        className="text-sm"
                      />
                    ) : (
                      <span>{activity}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Meal Plans */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {Object.entries(dietPlan.meals).map(([mealType, meal]) => (
            <Card key={mealType} className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 capitalize">
                  <Utensils className="h-5 w-5 text-primary" />
                  {mealType}
                  <Badge variant="outline" className="ml-auto text-xs">
                    {meal.time}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Food Items:</h4>
                    <ul className="space-y-1">
                      {meal.items.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                          {isEditing ? (
                            <Textarea
                              value={item}
                              onChange={(e) => {/* Handle edit */}}
                              className="text-sm"
                            />
                          ) : (
                            <span>{item}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> {meal.notes}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guidelines and Restrictions */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Check className="h-5 w-5" />
                Dietary Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {dietPlan.guidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">{guideline}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Clock className="h-5 w-5" />
                Foods to Limit/Avoid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {dietPlan.restrictions.map((restriction, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">{restriction}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Herbal Recommendations */}
        <Card className="shadow-soft mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              Herbal Supplements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {dietPlan.herbs.map((herb, index) => (
                <div key={index} className="bg-gradient-warm p-4 rounded-lg border border-primary/10">
                  <p className="text-sm font-medium">{herb}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card className="shadow-healing bg-gradient-warm border-primary/20">
          <CardContent className="p-6">
            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleApprove}
                variant="healing"
                size="lg"
              >
                <Check className="h-5 w-5 mr-2" />
                Approve & Send to Patient
              </Button>
              <Button
                onClick={onBack}
                variant="gentle"
                size="lg"
              >  
                Save Draft
              </Button>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Once approved, the patient will receive access to their personalized diet plan
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DietPlanReview;