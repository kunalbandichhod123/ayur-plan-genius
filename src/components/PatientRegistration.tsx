import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Phone, Send, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PatientRegistrationProps {
  onBack: () => void;
}

const PatientRegistration = ({ onBack }: PatientRegistrationProps) => {
  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const { toast } = useToast();

  const handleSendOTP = () => {
    if (phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return;
    }

    // Mock OTP sending - in real app, this would use Supabase
    toast({
      title: "OTP Sent!",
      description: `Verification code sent to ${phoneNumber}`,
    });
    setStep('otp');
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit verification code",
        variant: "destructive",
      });
      return;
    }

    // Mock OTP verification - in real app, this would verify with Supabase
    setStep('success');
    toast({
      title: "Patient Registered Successfully!",
      description: "The patient can now login using their phone number",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-2xl mx-auto">
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Add New Patient</h1>
          <p className="text-muted-foreground">Register a new patient for Ayurvedic diet consultation</p>
        </div>

        <Card className="shadow-healing">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary" />
              Patient Registration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 'phone' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Enter Patient's Phone Number</h3>
                  <p className="text-muted-foreground">
                    We'll send an OTP to verify and register the patient
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="text-lg text-center"
                    />
                  </div>

                  <Button
                    onClick={handleSendOTP}
                    variant="healing"
                    size="lg"
                    className="w-full"
                    disabled={phoneNumber.length < 10}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send OTP to Patient
                  </Button>
                </div>

                <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> The patient will receive an OTP on their phone. 
                    Once verified, they can access their personalized diet plans using this number.
                  </p>
                </div>
              </div>
            )}

            {step === 'otp' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Verify OTP</h3>
                  <p className="text-muted-foreground">
                    Ask the patient to share the 6-digit code sent to {phoneNumber}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="123456"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="text-center text-2xl tracking-widest"
                    />
                  </div>

                  <Button
                    onClick={handleVerifyOTP}
                    variant="gold"
                    size="lg"
                    className="w-full"
                    disabled={otp.length !== 6}
                  >
                    Verify & Register Patient
                  </Button>

                  <Button
                    onClick={() => setStep('phone')}
                    variant="ghost"
                    className="w-full"
                  >
                    Change Phone Number
                  </Button>
                </div>
              </div>
            )}

            {step === 'success' && (
              <div className="space-y-6 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-healing-pulse">
                  <UserPlus className="h-10 w-10 text-primary" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-3">
                    Patient Registered Successfully!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    The patient can now login using their phone number: <br />
                    <strong className="text-foreground">{phoneNumber}</strong>
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={onBack}
                    variant="healing"
                    size="lg"
                    className="flex-1"
                  >
                    Create Diet Plan
                  </Button>
                  <Button
                    onClick={() => {
                      setStep('phone');
                      setPhoneNumber('');
                      setOtp('');
                    }}
                    variant="gentle"
                    size="lg"
                    className="flex-1"
                  >
                    Add Another Patient
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientRegistration;