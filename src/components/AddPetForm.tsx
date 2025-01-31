import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export function AddPetForm() {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    petName: "",
    status: "",
    dateOfBirth: "",
    gender: "",
    altered: "",
    weight: "",
    weightUnit: "lbs",
    species: "",
    breed: "",
    microchipNumber: "",
    intakeType: "",
    intakeDate: "",
    conditionOnIntake: "",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsUploading(true);

    try {
      let imageUrl = null;
      if (selectedFile) {
        const fileExt = selectedFile.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("pets")
          .upload(fileName, selectedFile);

        if (uploadError) throw uploadError;
        imageUrl = fileName;
      }

      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { error: insertError } = await supabase.from("pets").insert({
        name: formData.petName,
        internal_id: `D-${Math.random().toString().slice(2, 11)}`,
        status: formData.status,
        date_of_birth: formData.dateOfBirth || null,
        gender: formData.gender || null,
        altered: formData.altered === "yes" ? true : formData.altered === "no" ? false : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        weight_unit: formData.weightUnit,
        species: formData.species || null,
        breed: formData.breed || null,
        microchip_number: formData.microchipNumber || null,
        intake_type: formData.intakeType || null,
        intake_date: formData.intakeDate || null,
        condition_on_intake: formData.conditionOnIntake || null,
        image_url: imageUrl,
        user_id: userData.user.id,
      });

      if (insertError) throw insertError;

      queryClient.invalidateQueries({ queryKey: ["pets"] });

      toast({
        title: "Success",
        description: "Pet added successfully",
      });

      setOpen(false);
      setSelectedFile(null);
      setFormData({
        petName: "",
        status: "",
        dateOfBirth: "",
        gender: "",
        altered: "",
        weight: "",
        weightUnit: "lbs",
        species: "",
        breed: "",
        microchipNumber: "",
        intakeType: "",
        intakeDate: "",
        conditionOnIntake: "",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="gap-2">
        <PlusCircle className="h-4 w-4" />
        Add New Pet
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <PlusCircle className="h-5 w-5" />
              Add New Pet
            </DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new pet to the system.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="petName">Pet Name</Label>
                <Input 
                  id="petName" 
                  placeholder="Enter pet name"
                  value={formData.petName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="internalId">Internal ID</Label>
                <Input id="internalId" value="D-000093452" readOnly className="bg-muted" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={(value) => handleSelectChange(value, 'status')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="adopted">Adopted</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="quarantine">Quarantine</SelectItem>
                    <SelectItem value="sanctuary">Sanctuary</SelectItem>
                    <SelectItem value="pending_transfer">Pending Transfer</SelectItem>
                    <SelectItem value="pending_adoption">Pending Adoption</SelectItem>
                    <SelectItem value="reclaimed">Reclaimed</SelectItem>
                    <SelectItem value="medical_hold">Medical Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input 
                  id="dateOfBirth" 
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(value) => handleSelectChange(value, 'gender')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="altered">Altered</Label>
                <Select onValueChange={(value) => handleSelectChange(value, 'altered')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight</Label>
                  <Input 
                    id="weight" 
                    type="number" 
                    min="0" 
                    step="0.1"
                    value={formData.weight}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weightUnit">Unit</Label>
                  <Select 
                    defaultValue="lbs"
                    onValueChange={(value) => handleSelectChange(value, 'weightUnit')}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lbs">lbs</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="species">Species</Label>
                <Select onValueChange={(value) => handleSelectChange(value, 'species')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a species" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Dog</SelectItem>
                    <SelectItem value="cat">Cat</SelectItem>
                    <SelectItem value="rabbit">Rabbit</SelectItem>
                    <SelectItem value="guinea_pig">Guinea Pig</SelectItem>
                    <SelectItem value="small_animal">Small Animal</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="breed">Breed</Label>
                <Select onValueChange={(value) => handleSelectChange(value, 'breed')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a breed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mixed">Mixed</SelectItem>
                    <SelectItem value="purebred">Purebred</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="microchipNumber">Microchip Number</Label>
                <Input 
                  id="microchipNumber" 
                  placeholder="Enter microchip number"
                  value={formData.microchipNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="intakeType">Intake Type</Label>
                <Select onValueChange={(value) => handleSelectChange(value, 'intakeType')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stray">Stray</SelectItem>
                    <SelectItem value="surrender">Surrender</SelectItem>
                    <SelectItem value="transfer">Transfer</SelectItem>
                    <SelectItem value="born_in_care">Born in Care</SelectItem>
                    <SelectItem value="return_to_rescue">Return to Rescue</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2 border-2 border-dashed border-muted rounded-lg p-6 text-center space-y-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="pet-image"
                />
                <Label
                  htmlFor="pet-image"
                  className="flex flex-col items-center gap-2 cursor-pointer"
                >
                  <div className="bg-muted/50 p-4 rounded-full">
                    <Upload className="h-6 w-6" />
                  </div>
                  <div className="text-sm">
                    {selectedFile ? (
                      <span className="text-primary">{selectedFile.name}</span>
                    ) : (
                      <>Click to upload or drag and drop</>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    PNG, JPG or GIF (max. 5MB)
                  </div>
                </Label>
                {selectedFile && (
                  <div className="mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedFile(null)}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <Button 
                  type="submit" 
                  variant="secondary"
                  disabled={isUploading}
                >
                  {isUploading ? "Saving..." : "Save"}
                </Button>
                <Button 
                  type="button"
                  disabled={isUploading}
                >
                  Save and Add Another
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
