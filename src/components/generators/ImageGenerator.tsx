
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";

interface ImageGeneratorProps {
  prompt: string;
  width?: number;
  height?: number;
  autoGenerate?: boolean;
  onImageGenerated?: (imageUrl: string) => void;
}

export default function ImageGenerator({ 
  prompt, 
  width = 512, 
  height = 512,
  autoGenerate = false,
  onImageGenerated 
}: ImageGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Auto-generate image when prompt changes and autoGenerate is true
  useEffect(() => {
    if (autoGenerate && prompt && !imageUrl) {
      generateImage();
    }
  }, [prompt, autoGenerate]);
  
  const generateImage = async () => {
    if (!prompt) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      // In a real implementation, this would call an AI image generation API
      // For now, we're using a placeholder image generation with random parameters to simulate the process
      
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a unique identifier for the image to prevent caching
      const timestamp = new Date().getTime();
      const seed = Math.floor(Math.random() * 1000);
      
      // Encode prompt for URL safety and truncate if needed
      const encodedPrompt = encodeURIComponent(prompt.substring(0, 100));
      
      // Use a placeholder service - in production this would be your actual AI image generation API
      const generatedImageUrl = `https://picsum.photos/seed/${seed}-${encodedPrompt}/${width}/${height}?t=${timestamp}`;
      
      setImageUrl(generatedImageUrl);
      if (onImageGenerated) {
        onImageGenerated(generatedImageUrl);
      }
    } catch (err) {
      console.error("Error generating image:", err);
      setError("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const regenerateImage = () => {
    setImageUrl(null); // Clear current image
    generateImage();
  };
  
  return (
    <div className="space-y-4">
      {error && <p className="text-destructive text-sm">{error}</p>}
      
      <div className="flex justify-center">
        {imageUrl ? (
          <div className="relative">
            <img 
              src={imageUrl} 
              alt="Generated content" 
              className="rounded-md object-cover"
              style={{ width: `${width}px`, height: `${height}px`, maxWidth: '100%' }}
            />
            <Button 
              size="sm" 
              variant="secondary" 
              className="absolute bottom-2 right-2 opacity-80"
              onClick={regenerateImage}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-1" />
              )}
              {isGenerating ? "Generating..." : "Regenerate"}
            </Button>
          </div>
        ) : (
          <Button
            onClick={generateImage}
            disabled={isGenerating || !prompt}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Image...
              </>
            ) : (
              "Generate Image"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
