
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
import { Slider } from "@/components/ui/slider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Copy, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters long" }),
  keywords: z.string().min(3, { message: "Please enter at least one keyword" }),
  audience: z.string().min(3, { message: "Please describe your target audience" }),
  tone: z.string().min(1, { message: "Please select a tone" }),
  length: z.number().min(300).max(2000),
  outline: z.string().optional(),
});

export default function BlogGenerator() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      keywords: "",
      audience: "",
      tone: "",
      length: 800,
      outline: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    
    // Simulate AI generation with a delay
    setTimeout(() => {
      // This would normally be an API call to an AI service
      const tones: Record<string, string> = {
        professional: "professional",
        conversational: "conversational",
        academic: "academic",
        persuasive: "persuasive",
        informative: "informative",
      };
      
      const tone = tones[data.tone] || data.tone;
      
      // Generate sample blog content
      const content = generateSampleBlog(data.title, data.keywords, tone, data.audience, data.length, data.outline);
      
      setGeneratedContent(content);
      setIsGenerating(false);
      
      toast({
        title: "Blog Content Generated!",
        description: "Your article has been created.",
      });
    }, 3000);
  };
  
  const generateSampleBlog = (title: string, keywords: string, tone: string, audience: string, length: number, outline?: string) => {
    // Generate a sample blog post based on inputs
    const keywordsList = keywords.split(',').map(k => k.trim());
    
    let content = `# ${title}\n\n`;
    
    // Introduction
    content += `## Introduction\n\n`;
    content += `In today's fast-paced digital landscape, understanding ${keywordsList[0]} has become essential for ${audience}. This comprehensive guide explores the fundamentals of ${title} and provides actionable insights for implementing these strategies in your own marketing efforts.\n\n`;
    
    // Add sections based on keywords
    keywordsList.forEach((keyword, index) => {
      if (index < 3) { // Limit to 3 sections for the sample
        content += `## Understanding ${keyword}\n\n`;
        content += `When exploring ${keyword}, it's important to consider how it impacts your overall marketing strategy. For ${audience}, this means focusing on the specific challenges and opportunities that arise in their unique context.\n\n`;
        content += `Here are some key considerations for ${keyword}:\n\n`;
        content += `- Analyze your current approach to ${keyword}\n`;
        content += `- Identify opportunities for improvement\n`;
        content += `- Implement best practices tailored to ${audience}\n`;
        content += `- Measure and optimize your results\n\n`;
      }
    });
    
    // Best practices section
    content += `## Best Practices for ${title}\n\n`;
    content += `To maximize your success with ${title}, consider implementing these proven strategies:\n\n`;
    content += `1. **Start with clear objectives**: Define what success looks like for your specific needs.\n`;
    content += `2. **Know your audience**: Understanding ${audience} is critical for tailoring your approach.\n`;
    content += `3. **Stay consistent**: Regular implementation of these strategies yields the best results.\n`;
    content += `4. **Measure and adjust**: Use analytics to track performance and make data-driven improvements.\n\n`;
    
    // Conclusion
    content += `## Conclusion\n\n`;
    content += `Implementing effective ${title} strategies can significantly enhance your marketing outcomes. By focusing on ${keywordsList.join(', ')}, you'll be well-positioned to connect with ${audience} and achieve your business objectives.\n\n`;
    content += `Remember that success doesn't happen overnight. Test different approaches, measure your results, and continuously refine your strategy based on what works best for your unique situation.\n\n`;
    
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 10 Effective Social Media Strategies for 2024" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keywords (comma separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., social media, marketing, engagement" {...field} />
                  </FormControl>
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
                    <Input placeholder="e.g., Small business owners" {...field} />
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
                      <SelectItem value="conversational">Conversational</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
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
              name="length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Article Length: {field.value} words</FormLabel>
                  <FormControl>
                    <Slider 
                      defaultValue={[field.value]} 
                      min={300} 
                      max={2000} 
                      step={100}
                      onValueChange={(vals) => field.onChange(vals[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="outline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Article Outline (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter a brief outline or specific points to include" 
                      className="min-h-[100px]"
                      {...field} 
                    />
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
                  Generating Article...
                </>
              ) : (
                "Generate Blog Article"
              )}
            </Button>
          </form>
        </Form>
      ) : (
        <div className="space-y-4">
          <div className="border rounded-md p-4 bg-card">
            <h3 className="font-medium mb-2">Generated Blog Article</h3>
            <div className="whitespace-pre-line text-sm max-h-[400px] overflow-y-auto">
              {generatedContent}
            </div>
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
