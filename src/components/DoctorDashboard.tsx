import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  UserPlus, 
  Users, 
  Calendar, 
  FileText, 
  Phone, 
  Download,
  Eye,
  Edit
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PatientRegistration from "@/components/PatientRegistration";
import HealthDataForm from "@/components/HealthDataForm";
import DietPlanReview from "@/components/DietPlanReview";

const DoctorDashboard = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'addPatient' | 'healthData' | 'reviewPlan'>('dashboard');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const { toast } = useToast();

  // Mock data - in real app, this would come from Supabase
  const recentPatients = [
    {
      id: 1,
      name: "Priya Sharma",
      phone: "+91 98765 43210",
      age: 34,
      lastPlan: "2024-01-15",
      status: "Active",
      constitution: "Vata-Pitta"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      phone: "+91 87654 32109",
      age: 42,
      lastPlan: "2024-01-12",
      status: "Review Pending",
      constitution: "Kapha-Vata"
    },
    {
      id: 3,
      name: "Meera Patel",
      phone: "+91 76543 21098",
      age: 28,
      lastPlan: "2024-01-10",
      status: "Active",
      constitution: "Pitta"
    }
  ];

  const handleAddPatient = () => {
    setActiveView('addPatient');
  };

  const handleCreatePlan = (patient: any) => {
    setSelectedPatient(patient);
    setActiveView('healthData');
  };

  const handlePlanGenerated = (planData: any) => {
    setActiveView('reviewPlan');
    toast({
      title: "Diet Plan Generated!",
      description: "AI has created a personalized plan ready for your review",
    });
  };

  if (activeView === 'addPatient') {
    return <PatientRegistration onBack={() => setActiveView('dashboard')} />;
  }

  if (activeView === 'healthData') {
    return (
      <HealthDataForm 
        patient={selectedPatient} 
        onBack={() => setActiveView('dashboard')}
        onPlanGenerated={handlePlanGenerated}
      />
    );
  }

  if (activeView === 'reviewPlan') {
    return (
      <DietPlanReview 
        patient={selectedPatient}
        onBack={() => setActiveView('dashboard')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Doctor Dashboard</h1>
          <p className="text-muted-foreground">Manage your patients and create personalized Ayurvedic diet plans</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft hover:shadow-healing transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Patients</p>
                  <p className="text-3xl font-bold text-primary">24</p>
                </div>
                <Users className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-healing transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Plans This Month</p>
                  <p className="text-3xl font-bold text-gold">12</p>
                </div>
                <FileText className="h-8 w-8 text-gold opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-healing transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Pending Reviews</p>
                  <p className="text-3xl font-bold text-destructive">3</p>
                </div>
                <Calendar className="h-8 w-8 text-destructive opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-healing transition-all duration-300">
            <CardContent className="p-6">
              <Button 
                onClick={handleAddPatient}
                variant="healing" 
                className="w-full h-full flex flex-col gap-2"
              >
                <UserPlus className="h-6 w-6" />
                Add New Patient
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Patients */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Recent Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between p-4 bg-gradient-warm rounded-lg border border-primary/10 hover:shadow-soft transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{patient.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {patient.phone}
                        </span>
                        <span>Age: {patient.age}</span>
                        <span>Constitution: {patient.constitution}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={patient.status === 'Active' ? 'default' : 'secondary'}
                      className={patient.status === 'Active' ? 'bg-primary/20 text-primary' : ''}
                    >
                      {patient.status}
                    </Badge>
                    <Button
                      onClick={() => handleCreatePlan(patient)}
                      variant="gentle"
                      size="sm"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Create Plan
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDashboard;