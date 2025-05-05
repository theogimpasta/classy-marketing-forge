
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, Image as ImageIcon } from "lucide-react";

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
      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-md text-destructive text-sm">
          {error}
        </div>
      )}
      
      <div className="flex justify-center">
        {imageUrl ? (
          <div className="relative group rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
            <img 
              src={imageUrl} 
              alt="Generated content" 
              className="rounded-lg object-cover"
              style={{ width: `${width}px`, height: `${height}px`, maxWidth: '100%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
            <Button 
              size="sm" 
              variant="secondary" 
              className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md"
              onClick={regenerateImage}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-1" />
              )}
              {isGenerating ? "Generating..." : "Regenerate"}
            </Button>
          </div>
        ) : (
          <div className="w-full">
            <Button
              onClick={generateImage}
              disabled={isGenerating || !prompt}
              className="w-full relative overflow-hidden group bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 transition-colors"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite] opacity-0 group-hover:opacity-100"/>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Image...
                </>
              ) : (
                <>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Generate Image
                </>
              )}
            </Button>
            {prompt && (
              <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-md text-sm text-muted-foreground border border-border">
                <p className="font-medium text-xs uppercase tracking-wider mb-1">Image Prompt</p>
                <p className="italic">{prompt}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
