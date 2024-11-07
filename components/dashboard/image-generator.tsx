"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

const stylePresets = [
  { id: 1, thumbnail: "/styles/1_Cyberpunk.jpg", name: "Cyberpunk" },
  { id: 2, thumbnail: "/styles/2_Pop_Art.jpg", name: "Pop Art" },
  { id: 3, thumbnail: "/styles/3_children_book.jpg", name: "Children Book" },
  { id: 4, thumbnail: "/styles/4_Political_Satire.jpg", name: "Political Satire" },
  { id: 5, thumbnail: "/styles/5_Vintage_Film_Poster.jpg", name: "Vintage Film Poster" },
];

const shapes = [
  { id: 1, aspect: "16:9", width: 1920, height: 1080 },
  { id: 2, aspect: "4:3", width: 1600, height: 1200 },
  { id: 3, aspect: "1:1", width: 1024, height: 1024 },
  { id: 4, aspect: "9:16", width: 1080, height: 1920 },
  { id: 5, aspect: "3:4", width: 1200, height: 1600 },
];

interface ImageGeneratorProps {
  masterPrompts?: string[];
}

export function ImageGenerator({ masterPrompts = [] }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedMasterPrompt, setSelectedMasterPrompt] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null);
  const [selectedShape, setSelectedShape] = useState(shapes[2]); // Default to 1:1
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateImage = async () => {
    try {
      const finalPrompt = selectedMasterPrompt 
        ? `${selectedMasterPrompt} ${prompt}`
        : prompt;
        
      // Convert the selected shape's aspect ratio to the format expected by the API
      const getAspectRatio = () => {
        const [width, height] = selectedShape.aspect.split(':');
        return `ASPECT_${width}_${height}`;
      };

      const response = await fetch("https://api.ideogram.ai/generate", {
        method: "POST",
        headers: {
          "Api-Key": "m8ngdGXq5dtR9UCkchGs2jcoLgJycMrEUfx3JbLIrRFWYfvDAOUNbBPSRaA4yE-46q_mkUFolEzKYXGrxZ8IBQ",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "image_request": {
            "prompt": finalPrompt,
            "aspect_ratio": getAspectRatio(), // Convert selected shape to API format
            "model": "V_2",
            "magic_prompt_option": "AUTO"
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Update the generated image URL if the response contains an image
      if (data.data && data.data[0]?.url) {
        setGeneratedImageUrl(data.data[0].url);
      }
    } catch (error) {
      console.error("Error generating image:", error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Create an image from text prompt</h2>
        
        {masterPrompts.length > 0 && (
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">
              Select Master Prompt Template (Optional)
            </label>
            <select 
              className="w-full rounded-md border p-2"
              onChange={(e) => setSelectedMasterPrompt(e.target.value || null)}
              value={selectedMasterPrompt || ""}
            >
              <option value="">None</option>
              {masterPrompts.map((mp, idx) => (
                <option key={idx} value={mp}>{mp}</option>
              ))}
            </select>
          </div>
        )}
        
        <Textarea
          placeholder="Enter your image description..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[100px] mb-4"
        />
        
        <Button 
          className="w-full bg-purple-600 hover:bg-purple-700"
          size="lg"
          onClick={handleGenerateImage}
        >
          Generate
        </Button>
      </Card>

      {generatedImageUrl && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Generated Image</h2>
          <img src={generatedImageUrl} alt="Generated" className="w-full h-auto" />
        </Card>
      )}

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Choose a style</h2>
        
        <div className="grid grid-cols-5 gap-4 mb-4">
          {stylePresets.map((style) => (
            <div key={style.id} className="flex flex-col">
              <button
                onClick={() => setSelectedStyle(style.id)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  selectedStyle === style.id ? 'border-purple-600' : 'border-transparent'
                }`}
              >
                <img
                  src={style.thumbnail}
                  alt={style.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error(`Failed to load image: ${style.thumbnail}`);
                    e.currentTarget.src = "/placeholder.png"
                  }}
                />
              </button>
              <div className="mt-2 text-center">
                <h3 className="font-semibold text-sm">{style.name}</h3>
              </div>
            </div>
          ))}
        </div>

        <Button 
          variant="outline" 
          className="w-full"
        >
          Choose more styles
        </Button>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Choose Shape</h2>
        
        <div className="flex gap-4">
          {shapes.map((shape) => (
            <button
              key={shape.id}
              onClick={() => setSelectedShape(shape)}
              className={`relative flex items-center justify-center border-2 rounded-lg transition-all ${
                selectedShape.id === shape.id ? 'border-purple-600' : 'border-gray-200'
              }`}
              style={{
                width: '60px',
                height: `${(60 * shape.height) / shape.width}px`,
              }}
            >
              <span className="text-xs">{shape.aspect}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
} 