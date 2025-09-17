import heroImage from "@/assets/hero-ayurveda.jpg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { UserCheck, Stethoscope, Leaf, Heart, Users, Calendar } from "lucide-react";
import LoginModal from "@/components/LoginModal";
import DoctorDashboard from "@/components/DoctorDashboard";
import PatientDashboard from "@/components/PatientDashboard";

const Index = () => {
  const [loginType, setLoginType] = useState<'doctor' | 'patient' | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'doctor' | 'patient' | null>(null);

  const handleLoginSuccess = (type: 'doctor' | 'patient') => {
    setIsLoggedIn(true);
    setUserType(type);
    setLoginType(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
  };

  // If logged in, show appropriate dashboard
  if (isLoggedIn && userType === 'doctor') {
    return <DoctorDashboard />;
  }

  if (isLoggedIn && userType === 'patient') {
    return <PatientDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            <Leaf className="h-5 w-5 text-white animate-gentle-bounce" />
            <span className="text-white/90 text-sm font-medium">Ancient Wisdom, Modern Care</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Ayurvedic
            <span className="block bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent animate-lotus-bloom">
              Diet Plans
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Personalized nutrition guidance rooted in 5000 years of Ayurvedic wisdom, 
            crafted by certified practitioners for optimal health and balance.
          </p>

          {/* Login Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 group cursor-pointer animate-healing-pulse"
                  onClick={() => setLoginType('doctor')}>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Stethoscope className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">Doctor Portal</h3>
                <p className="text-white/80 mb-6">
                  Manage patients, create personalized diet plans, and track health progress
                </p>
                <Button variant="doctor" size="lg" className="w-full">
                  Login as Doctor
                </Button>
              </div>
            </Card>

            <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 group cursor-pointer"
                  onClick={() => setLoginType('patient')}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <UserCheck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">Patient Portal</h3>
                <p className="text-white/80 mb-6">
                  Access your personalized diet plan and track your wellness journey
                </p>
                <Button variant="patient" size="lg" className="w-full">
                  Login as Patient
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose Ayurvedic Diet Plans?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the perfect blend of ancient wisdom and modern healthcare technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center shadow-soft hover:shadow-healing transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-healing rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-healing-pulse">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Personalized Care</h3>
              <p className="text-muted-foreground">
                Each diet plan is carefully crafted based on your unique constitution, health conditions, and lifestyle
              </p>
            </Card>

            <Card className="p-8 text-center shadow-soft hover:shadow-healing transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-healing-pulse">
                <Users className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Expert Guidance</h3>
              <p className="text-muted-foreground">
                Work directly with certified Ayurvedic practitioners who understand your individual needs
              </p>
            </Card>

            <Card className="p-8 text-center shadow-soft hover:shadow-healing transition-all duration-300 group">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-healing-pulse">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor your wellness journey with detailed tracking and regular plan adjustments
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {loginType && (
        <LoginModal 
          type={loginType} 
          onClose={() => setLoginType(null)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default Index;