"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/shared/icons";

interface SavedPrompt {
  id: string;
  text: string;
  createdAt: Date;
}

export function MasterPromptBox() {
  const [prompt, setPrompt] = useState("");
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);

  const handleSavePrompt = async () => {
    if (!prompt.trim()) return;

    const newPrompt: SavedPrompt = {
      id: crypto.randomUUID(),
      text: prompt.trim(),
      createdAt: new Date(),
    };

    // Here you would typically save to your database
    setSavedPrompts([newPrompt, ...savedPrompts]);
    setPrompt("");
  };

  const handleDeletePrompt = (id: string) => {
    setSavedPrompts(savedPrompts.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Master Prompt Box</h2>
        
        <Textarea
          placeholder="Enter master prompt template..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[100px] mb-4"
        />
        
        <Button 
          className="w-full bg-purple-600 hover:bg-purple-700"
          size="lg"
          onClick={handleSavePrompt}
        >
          Save Prompt Template
        </Button>
      </Card>

      {savedPrompts.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Saved Prompts</h2>
          <div className="space-y-4">
            {savedPrompts.map((savedPrompt) => (
              <div 
                key={savedPrompt.id} 
                className="flex items-start justify-between p-3 border rounded-lg"
              >
                <p className="text-sm">{savedPrompt.text}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeletePrompt(savedPrompt.id)}
                >
                  <Icons.trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
} 