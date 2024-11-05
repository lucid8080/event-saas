import { ImageGenerator } from "@/components/dashboard/image-generator";
import { DashboardHeader } from "@/components/dashboard/header";

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
        <div className="order-2 lg:order-1 min-h-[400px] bg-muted rounded-lg p-4 flex items-center justify-center">
          <p className="text-muted-foreground">Generated image will appear here</p>
        </div>
      </div>
    </div>
  );
}
