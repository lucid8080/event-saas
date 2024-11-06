"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/shared/icons";
import { useToast } from "@/components/ui/use-toast";

interface SavedPrompt {
  id: string;
  text: string;
  createdAt: Date;
}

export function MasterPromptBox() {
  const [prompt, setPrompt] = useState("");
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);
  const { toast } = useToast();

  // Load saved prompts from localStorage on component mount
  useEffect(() => {
    const storedPrompts = localStorage.getItem("masterPrompts");
    if (storedPrompts) {
      setSavedPrompts(JSON.parse(storedPrompts));
    }
  }, []);

  // Save prompts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("masterPrompts", JSON.stringify(savedPrompts));
  }, [savedPrompts]);

  const handleSavePrompt = async () => {
    if (!prompt.trim()) return;

    const newPrompt: SavedPrompt = {
      id: crypto.randomUUID(),
      text: prompt.trim(),
      createdAt: new Date(),
    };

    setSavedPrompts([newPrompt, ...savedPrompts]);
    setPrompt("");
    
    toast({
      title: "Prompt Saved",
      description: "Your master prompt has been saved successfully.",
    });
  };

  const handleDeletePrompt = (id: string) => {
    setSavedPrompts(savedPrompts.filter(p => p.id !== id));
    
    toast({
      title: "Prompt Deleted",
      description: "The master prompt has been removed.",
      variant: "destructive",
    });
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
          <h2 className="text-xl font-semibold mb-4">
            Saved Prompts ({savedPrompts.length})
          </h2>
          <div className="space-y-4">
            {savedPrompts.map((savedPrompt) => (
              <div 
                key={savedPrompt.id} 
                className="flex items-start justify-between p-3 border rounded-lg hover:bg-muted/50"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-sm">{savedPrompt.text}</p>
                  <span className="text-xs text-muted-foreground">
                    {new Date(savedPrompt.createdAt).toLocaleDateString()}
                  </span>
                </div>
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