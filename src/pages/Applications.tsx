import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";

const Applications = () => {
  const [selectedFilter, setSelectedFilter] = useState("Adoption");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(["All"]);

  const filters = ["Adoption", "Foster", "Volunteer", "Surrender"];
  const statuses = [
    "All",
    "New",
    "Read",
    "Reviewed",
    "Contacted",
    "In Progress",
    "On Hold",
    "Pending",
    "Pending Reference Or Vet",
    "Pending Meet And Greet",
    "Pending Approval",
    "Approved",
    "Approved: Adopted",
    "Approved: No Match",
    "Denied",
    "Withdrawn",
    "Cancelled",
  ];

  const handleStatusChange = (status: string) => {
    setSelectedStatuses((current) => {
      if (status === "All") {
        return ["All"];
      }
      
      const withoutAll = current.filter((s) => s !== "All");
      if (withoutAll.includes(status)) {
        return withoutAll.filter((s) => s !== status);
      }
      return [...withoutAll, status];
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
            <path d="M22 12A10 10 0 0 0 12 2v10z" />
          </svg>
          Applications
        </h1>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search by Applicant Name"
            className="pl-10 w-full max-w-md"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              onClick={() => setSelectedFilter(filter)}
              className={selectedFilter === filter ? "bg-primary" : ""}
            >
              {filter}
            </Button>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Status <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {statuses.map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={selectedStatuses.includes(status)}
                  onCheckedChange={() => handleStatusChange(status)}
                >
                  {status}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {selectedFilter === "Surrender" && (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <p className="text-xl text-purple-700 mb-2">
              Your organization doesn't have Surrender enabled.
            </p>
            <p className="text-gray-600">
              Go to Organization Settings → Form Settings or click{" "}
              <a href="/organization-settings" className="text-blue-400 hover:underline">
                here
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;