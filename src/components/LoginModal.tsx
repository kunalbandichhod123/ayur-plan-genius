import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Stethoscope, UserCheck, Phone, Mail, KeyRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginModalProps {
  type: 'doctor' | 'patient';
  onClose: () => void;
  onLoginSuccess: (type: 'doctor' | 'patient') => void;
}

const LoginModal = ({ type, onClose, onLoginSuccess }: LoginModalProps) => {
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    otp: ''
  });
  const { toast } = useToast();

  const handleLogin = () => {
    // Mock login - in real app, this would connect to Supabase
    toast({
      title: "OTP Sent!",
      description: `Verification code sent to your ${loginMethod}`,
    });
    setStep('otp');
  };

  const handleOTPVerification = () => {
    // Mock OTP verification - in real app, this would verify with Supabase
    toast({
      title: "Login Successful!",
      description: `Welcome to your ${type} dashboard`,
    });
    onLoginSuccess(type);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gradient-subtle border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            {type === 'doctor' ? (
              <Stethoscope className="h-6 w-6 text-primary" />
            ) : (
              <UserCheck className="h-6 w-6 text-gold" />
            )}
            {type === 'doctor' ? 'Doctor Login' : 'Patient Login'}
          </DialogTitle>
        </DialogHeader>

        {step === 'login' ? (
          <div className="space-y-6">
            {type === 'doctor' && (
              <div className="flex gap-2 p-1 bg-muted rounded-lg">
                <Button
                  variant={loginMethod === 'phone' ? 'default' : 'ghost'}
                  size="sm"
                  className="flex-1"
                  onClick={() => setLoginMethod('phone')}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Phone
                </Button>
                <Button
                  variant={loginMethod === 'email' ? 'default' : 'ghost'}
                  size="sm"
                  className="flex-1"
                  onClick={() => setLoginMethod('email')}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </div>
            )}

            <div className="space-y-4">
              {loginMethod === 'phone' ? (
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="text-lg"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="doctor@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="text-lg"
                  />
                </div>
              )}

              <Button
                onClick={handleLogin}
                variant={type === 'doctor' ? 'doctor' : 'patient'}
                size="lg"
                className="w-full"
              >
                Send OTP
              </Button>
            </div>

            {type === 'patient' && (
              <Card className="p-4 bg-gold/10 border-gold/30">
                <p className="text-sm text-muted-foreground text-center">
                  <strong>Note:</strong> Patients can only login using the phone number registered by their doctor
                </p>
              </Card>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <KeyRound className="h-8 w-8 text-primary" />
              </div>
              <p className="text-muted-foreground">
                Enter the 6-digit code sent to your {loginMethod}
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
                  value={formData.otp}
                  onChange={(e) => setFormData({...formData, otp: e.target.value})}
                  className="text-center text-2xl tracking-widest"
                />
              </div>

              <Button
                onClick={handleOTPVerification}
                variant={type === 'doctor' ? 'healing' : 'gold'}
                size="lg"
                className="w-full"
                disabled={formData.otp.length !== 6}
              >
                Verify & Login
              </Button>

              <Button
                onClick={() => setStep('login')}
                variant="ghost"
                className="w-full"
              >
                Back to Login
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;