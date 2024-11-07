"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

const stylePresets = [
  { id: 1, thumbnail: "/styles/1_Cyberpunk.jpg", name: "Cyberpunk", description: "Futuristic and neon-lit style." },
  { id: 2, thumbnail: "/styles/2_Pop_Art.jpg", name: "Pop Art", description: "vibrant pop art-style portrait reminiscent of the works of artists like Roy Lichtenstein." },
  { id: 3, thumbnail: "/styles/3_children_book.jpg", name: "Children Book", description: "Whimsical and playful illustrations." },
  { id: 4, thumbnail: "/styles/4_Political_Satire.jpg", name: "Political Satire", description: "Detailed political caricature, formal government office backdrop, realistic shading, and satirical tone" },
  { id: 5, thumbnail: "/styles/5_Vintage_Film_Poster.jpg", name: "Vintage Film Poster", description: "Classic and nostalgic look." },
];

const shapes = [
  { id: 1, aspect: "16:9", width: 1920, height: 1080 },
  { id: 2, aspect: "4:3", width: 1600, height: 1200 },
  { id: 3, aspect: "1:1", width: 1024, height: 1024 },
  { id: 4, aspect: "9:16", width: 1080, height: 1920 },
  { id: 5, aspect: "3:4", width: 1200, height: 1600 },
];

const eventTypes = [
  { id: 1, name: "Birthday Party", description: "A celebration of someone's birth anniversary." },
  { id: 2, name: "Wedding", description: "A ceremony where two people are united in marriage." },
  { id: 3, name: "Corporate Event", description: "A gathering organized by a business for its employees, clients, or partners." },
  { id: 4, name: "Holiday Celebration", description: "Festivities to mark a holiday or special occasion." },
  { id: 5, name: "Concert", description: "A live music performance in front of an audience." },
  { id: 6, name: "Sports Event", description: "A competitive event involving physical activity and skill." },
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
  const [selectedEventType, setSelectedEventType] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    try {
      // Find the description of the selected event type
      const eventDescription = selectedEventType
        ? eventTypes.find(event => event.name === selectedEventType)?.description
        : "";

      // Find the description of the selected style
      const styleDescription = selectedStyle !== null
        ? stylePresets.find(style => style.id === selectedStyle)?.description
        : "";

      // Construct the final prompt
      const finalPrompt = selectedMasterPrompt 
        ? `${selectedMasterPrompt} ${prompt} ${eventDescription} ${styleDescription}`
        : `${prompt} ${eventDescription} ${styleDescription}`;

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
        
        <div className="mb-4">
          <label className="text-sm font-medium mb-2 block">
            Select Event Type
          </label>
          <select 
            className="w-full rounded-md border p-2"
            onChange={(e) => setSelectedEventType(e.target.value || null)}
            value={selectedEventType || ""}
          >
            <option value="">Select an event type...</option>
            {eventTypes.map((event) => (
              <option key={event.id} value={event.name}>{event.name}</option>
            ))}
          </select>
          {selectedEventType && (
            <p className="mt-2 text-sm text-gray-600">
              {eventTypes.find(event => event.name === selectedEventType)?.description}
            </p>
          )}
        </div>
        
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
                {/* <p className="text-xs text-gray-600">{style.description}</p> */}
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