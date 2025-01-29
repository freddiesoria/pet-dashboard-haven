import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import DashboardSidebar from "./DashboardSidebar";
import { useToast } from "./ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { addDays, isPast } from "date-fns";

const DashboardLayout = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [trialExpired, setTrialExpired] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication status
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (trialExpired) {
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
              onClick={() => {
                // This will be replaced with Stripe checkout in the next step
                toast({
                  title: "Coming Soon",
                  description: "Subscription functionality will be available soon!",
                });
              }}
            >
              Subscribe Now
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
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;