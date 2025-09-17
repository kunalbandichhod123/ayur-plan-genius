import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Download, 
  Printer,
  Utensils,
  Leaf,
  Sun,
  Moon,
  Clock,
  CheckCircle,
  Calendar,
  Phone,
  MapPin,
  LogOut
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PatientDashboardProps {
  onLogout: () => void;
}

const PatientDashboard = ({ onLogout }: PatientDashboardProps) => {
  const { toast } = useToast();

  // Mock patient data - in real app, this would come from Supabase
  const patientInfo = {
    name: "Priya Sharma",
    phone: "+91 98765 43210",
    age: 34,
    constitution: "Vata-Pitta",
    location: "Mumbai, Maharashtra",
    doctor: "Dr. Ravi Kumar",
    lastUpdated: "2024-01-15",
    status: "Active"
  };

  // Mock diet plan data
  const dietPlan = {
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

  const handleDownload = () => {
    toast({
      title: "Downloading Diet Plan",
      description: "Your personalized plan will be downloaded as PDF",
    });
    // In real app, this would generate and download PDF
  };

  const handlePrint = () => {
    toast({
      title: "Printing Diet Plan",
      description: "Print dialog will open shortly",
    });
    // In real app, this would open print dialog
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">My Diet Plan</h1>
            <p className="text-muted-foreground">Your personalized Ayurvedic wellness journey</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleDownload}
              variant="healing"
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button
              onClick={handlePrint}
              variant="gentle"
              className="gap-2"
            >
              <Printer className="h-4 w-4" />
              Print Plan
            </Button>
            <Button
              onClick={onLogout}
              variant="ghost"
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Patient Info Card */}
        <Card className="shadow-soft mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <p className="font-semibold text-lg">{patientInfo.name}</p>
                <p className="text-sm text-muted-foreground">Age: {patientInfo.age}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{patientInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{patientInfo.location}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium">Constitution:</span>
                  <Badge className="ml-2 bg-primary/20 text-primary">
                    {patientInfo.constitution}
                  </Badge>
                </div>
                <div>
                  <span className="text-sm font-medium">Doctor:</span>
                  <span className="ml-2 text-sm">{patientInfo.doctor}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium">Status:</span>
                  <Badge className="ml-2 bg-primary/20 text-primary">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {patientInfo.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Updated: {patientInfo.lastUpdated}</span>
                </div>
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
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Wake up: {dietPlan.morningRoutine.wakeUp}</span>
              </div>
              <ul className="space-y-2 ml-6">
                {dietPlan.morningRoutine.activities.map((activity, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>{activity}</span>
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
                          <span>{item}</span>
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
                <CheckCircle className="h-5 w-5" />
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

        {/* Footer Note */}
        <Card className="shadow-healing bg-gradient-warm border-primary/20">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold">Important Note</span>
            </div>
            <p className="text-muted-foreground">
              This diet plan is personalized for your constitution and health needs. 
              Please follow the guidelines consistently and consult your doctor for any concerns or modifications.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;