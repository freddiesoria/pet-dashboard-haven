
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import DashboardSidebar from "./DashboardSidebar";
import { useToast } from "./ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { addDays, isPast } from "date-fns";
import { SidebarProvider } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [trialExpired, setTrialExpired] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Check URL parameters for payment status messages
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentStatus = queryParams.get('payment');
    
    if (paymentStatus === 'success') {
      toast({
        title: "Payment Successful",
        description: "Thank you for your subscription!",
      });
      navigate('/dashboard', { replace: true });
    } else if (paymentStatus === 'cancelled') {
      toast({
        title: "Payment Cancelled",
        description: "Your payment was cancelled. You can try again anytime.",
        variant: "destructive",
      });
      navigate('/dashboard', { replace: true });
    }
  }, [location, toast, navigate]);

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      if (session?.access_token) {
        try {
          const { data, error } = await supabase.functions.invoke('check-subscription', {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          });

          if (error) throw error;
          setIsSubscribed(data.subscribed);
        } catch (error) {
          console.error('Error checking subscription:', error);
          toast({
            title: "Error",
            description: "Could not check subscription status. Please try again later.",
            variant: "destructive",
          });
        }
      }
    };

    if (session) {
      checkSubscriptionStatus();
    }
  }, [session, toast]);

  useEffect(() => {
    const checkTrialStatus = async () => {
      if (session?.user) {
        try {
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("trial_start")
            .eq("id", session.user.id)
            .maybeSingle();

          if (error) {
            console.error("Error fetching profile:", error);
            toast({
              title: "Error",
              description: "Could not check trial status. Please try again later.",
              variant: "destructive",
            });
            return;
          }

          if (profile) {
            const trialEnd = addDays(new Date(profile.trial_start), 7);
            setTrialExpired(isPast(trialEnd));
          }
        } catch (error) {
          console.error("Unexpected error:", error);
          toast({
            title: "Error",
            description: "An unexpected error occurred. Please try again later.",
            variant: "destructive",
          });
        }
      }
    };

    if (session) {
      checkTrialStatus();
    }
  }, [session, toast]);

  const handleSubscribe = async () => {
    if (!session?.access_token) return;

    setCheckoutLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Error",
        description: error.message || "Could not initiate checkout process. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (trialExpired && !isSubscribed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Trial Period Expired</CardTitle>
            <CardDescription>
              Your 7-day free trial has ended. Please subscribe to continue using our application.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full" 
              onClick={handleSubscribe}
              disabled={checkoutLoading}
            >
              {checkoutLoading ? "Loading..." : "Subscribe Now"}
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                supabase.auth.signOut();
                navigate("/login");
              }}
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <main className="flex-1 md:ml-64 transition-all duration-200 ease-in-out">
          <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
