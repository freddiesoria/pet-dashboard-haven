import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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
            description: "Could not check subscription status",
            variant: "destructive",
          });
        }
      }
    };

    checkSubscriptionStatus();
  }, [session, toast]);

  useEffect(() => {
    const checkTrialStatus = async () => {
      if (session?.user) {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("trial_start")
          .eq("id", session.user.id)
          .single();

        if (error) {
          toast({
            title: "Error",
            description: "Could not check trial status",
            variant: "destructive",
          });
          return;
        }

        if (profile) {
          const trialEnd = addDays(new Date(profile.trial_start), 7);
          setTrialExpired(isPast(trialEnd));
        }
      }
    };

    checkTrialStatus();
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
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Error",
        description: "Could not initiate checkout process",
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
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;