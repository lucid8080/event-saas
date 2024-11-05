"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const stylePresets = [
  { id: 1, thumbnail: "/style1.png", name: "Panda" },
  { id: 2, thumbnail: "/style2.png", name: "Forest" },
  { id: 3, thumbnail: "/style3.png", name: "Cyber" },
  { id: 4, thumbnail: "/style4.png", name: "Anime" },
  { id: 5, thumbnail: "/style5.png", name: "Nature" },
];

const shapes = [
  { id: 1, aspect: "16:9", width: 1920, height: 1080 },
  { id: 2, aspect: "4:3", width: 1600, height: 1200 },
  { id: 3, aspect: "1:1", width: 1024, height: 1024 },
  { id: 4, aspect: "9:16", width: 1080, height: 1920 },
  { id: 5, aspect: "3:4", width: 1200, height: 1600 },
];

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null);
  const [selectedShape, setSelectedShape] = useState(shapes[2]); // Default to 1:1

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Create an image from text prompt</h2>
        
        <Textarea
          placeholder="Enter your image description..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[100px] mb-4"
        />
        
        <Button 
          className="w-full bg-purple-600 hover:bg-purple-700"
          size="lg"
        >
          Generate
        </Button>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Choose a style</h2>
        
        <div className="grid grid-cols-5 gap-4 mb-4">
          {stylePresets.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                selectedStyle === style.id ? 'border-purple-600' : 'border-transparent'
              }`}
            >
              <img
                src={style.thumbnail}
                alt={style.name}
                className="w-full h-full object-cover"
              />
            </button>
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