import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

const OrganizationSettings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Citics Solutions S.L.</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pet-settings">Pet Settings</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="e-contracts">E-Contracts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Details</h2>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-muted-foreground">Name</span>
                      <p>Citics Solutions S.L.</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Website</span>
                      <p>-</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Phone</span>
                      <p>N/A</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Email</span>
                      <p className="text-primary">info@hoozzee.com</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Address</span>
                      <p>Joan de Joanes 1</p>
                      <p>Frankfurt, Hessen 60385</p>
                      <p>Germany</p>
                    </div>
                  </div>
                </div>
                <Button variant="link" className="text-primary">
                  Edit
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="pet-settings" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Pet Exports</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>PetFinder.com</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span>AdoptAPet.com</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span>HomeAgain Microchip Registrations</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span>AKC Reunite Microchip Registrations</span>
                <Switch />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Adoption Email Attachments</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Toggle the files you want to be sent automatically to the email of the adopter. All attachments below will be sent when an Outcome of "Adoption" is marked for a pet.
            </p>
            <div className="flex items-center justify-between mb-4">
              <span>Send Attachments to Adopters</span>
              <Switch />
            </div>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Files</h3>
                <p className="text-sm text-muted-foreground mb-4">Upload files to this organization's file</p>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Document
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Medical Settings</h2>
            <Button variant="outline">Set Default Vet Clinic and Vet</Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Text Templates</h2>
            <p className="text-sm text-muted-foreground mb-4">Set up text templates so you can skip the easy stuff!</p>
            <Button variant="outline">Create New Text Template</Button>
          </Card>
        </TabsContent>

        <TabsContent value="forms">
          <Card className="p-6">
            <h2 className="text-xl font-semibold">Forms Content</h2>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Localization Settings</h2>
              <Button variant="link" className="text-primary">
                Edit
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Address Style</h3>
                <p>United States</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Country Code</h3>
                <p>+1</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Currency</h3>
                <p>USD $</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Units of Measurement</h3>
                <p>Imperial</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="e-contracts">
          <Card className="p-6">
            <h2 className="text-xl font-semibold">E-Contracts Content</h2>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrganizationSettings;