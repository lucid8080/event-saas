import { ImageGenerator } from "@/components/dashboard/image-generator";
import { DashboardHeader } from "@/components/dashboard/header";
import { Home } from "lucide-react";

export default async function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        heading="AI Image Generator"
        text="Create unique images for your events using AI"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="order-1">
          <ImageGenerator />
        </div>
      </div>
    </div>
  );
}