"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export function MasterPromptBox() {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async () => {
    // Add your master prompt handling logic here
    console.log("Master prompt:", prompt);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Master Prompt Box</h2>
      
      <Textarea
        placeholder="Enter master prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-[100px] mb-4"
      />
      
      <Button 
        className="w-full bg-purple-600 hover:bg-purple-700"
        size="lg"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Card>
  );
} 