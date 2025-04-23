
import { useState } from "react";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Copy, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  platform: z.string().min(1, { message: "Please select a platform" }),
  topic: z.string().min(3, { message: "Topic must be at least 3 characters long" }),
  tone: z.string().min(1, { message: "Please select a tone" }),
  audience: z.string().min(3, { message: "Please describe your target audience" }),
  callToAction: z.string().optional(),
});

export default function SocialMediaGenerator() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platform: "",
      topic: "",
      tone: "",
      audience: "",
      callToAction: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    
    // Simulate AI generation with a delay
    setTimeout(() => {
      // This would normally be an API call to an AI service
      const platforms: Record<string, string> = {
        instagram: "Instagram",
        facebook: "Facebook",
        twitter: "Twitter",
        linkedin: "LinkedIn",
      };
      
      const tones: Record<string, string> = {
        professional: "professional",
        friendly: "friendly",
        humorous: "humorous",
        persuasive: "persuasive",
        informative: "informative",
      };
      
      const platform = platforms[data.platform] || data.platform;
      const tone = tones[data.tone] || data.tone;
      
      // Generate sample content
      const content = generateSampleContent(platform, data.topic, tone, data.audience, data.callToAction);
      
      setGeneratedContent(content);
      setIsGenerating(false);
      
      toast({
        title: "Content Generated!",
        description: "Your social media post has been created.",
      });
    }, 2000);
  };
  
  const generateSampleContent = (platform: string, topic: string, tone: string, audience: string, callToAction?: string) => {
    let content = "";
    
    switch (platform) {
      case "Instagram":
        content = `✨ Ready to take your ${topic} skills to the next level? \n\n`;
        content += `We know how important ${topic} is for ${audience}. That's why we've created the ultimate guide to mastering it! \n\n`;
        content += `Double tap if you're ready to transform your approach to ${topic}. \n\n`;
        content += `#${topic.replace(/\s+/g, '')} #Marketing #Growth`;
        break;
      case "LinkedIn":
        content = `I'm excited to share some insights about ${topic} that can help ${audience} achieve better results. \n\n`;
        content += `Throughout my career, I've seen how proper understanding of ${topic} can transform business outcomes. Here are three key takeaways: \n\n`;
        content += `1. Always start with clear objectives\n`;
        content += `2. Measure what matters\n`;
        content += `3. Iterate based on data\n\n`;
        if (callToAction) content += `${callToAction} \n\n`;
        content += `What strategies have worked for you with ${topic}? I'd love to hear your thoughts in the comments.`;
        break;
      case "Twitter":
        content = `Just discovered a game-changing approach to ${topic} that's perfect for ${audience}. \n\n`;
        content += `The key insight? Focus on quality over quantity. \n\n`;
        if (callToAction) content += `${callToAction} \n\n`;
        content += `#${topic.replace(/\s+/g, '')} #MarketingTips`;
        break;
      default:
        content = `Excited to share this ${tone} post about ${topic}! \n\n`;
        content += `If you're part of ${audience}, you know how important this is. Let's dive deeper into this topic together. \n\n`;
        if (callToAction) content += `${callToAction} \n\n`;
        content += `#${topic.replace(/\s+/g, '')} #Content #Marketing`;
    }
    
    return content;
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {!generatedContent ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Platform</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a platform" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Digital Marketing Trends" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="tone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tone</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a tone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="humorous">Humorous</SelectItem>
                      <SelectItem value="persuasive">Persuasive</SelectItem>
                      <SelectItem value="informative">Informative</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="audience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Audience</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Marketing professionals" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="callToAction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Call to Action (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Click the link in bio to learn more" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Social Media Post"
              )}
            </Button>
          </form>
        </Form>
      ) : (
        <div className="space-y-4">
          <div className="border rounded-md p-4 bg-card">
            <h3 className="font-medium mb-2">Generated Post</h3>
            <div className="whitespace-pre-line text-sm">{generatedContent}</div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setGeneratedContent("")}
            >
              Back to Form
            </Button>
            <Button 
              className="flex-1"
              onClick={copyToClipboard}
              disabled={isCopied}
            >
              {isCopied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Text
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
