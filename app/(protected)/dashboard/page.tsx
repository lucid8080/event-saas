import { ImageGenerator } from "@/components/dashboard/image-generator";
import { MasterPromptBox } from "@/components/dashboard/master-prompt-box";
import { DashboardHeader } from "@/components/dashboard/header";
import { getCurrentUser } from "@/lib/session";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const isAdmin = user?.role === "ADMIN";

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
        {isAdmin && (
          <div className="order-2">
            <MasterPromptBox />
          </div>
        )}
      </div>
    </div>
  );
}