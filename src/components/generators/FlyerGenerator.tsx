
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
import { Loader2, Copy, Check, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageGenerator from "./ImageGenerator";

const formSchema = z.object({
  headline: z.string().min(5, { message: "Headline must be at least 5 characters long" }),
  subheading: z.string().optional(),
  description: z.string().min(20, { message: "Description must be at least 20 characters long" }),
  businessName: z.string().min(2, { message: "Business name is required" }),
  color: z.string().min(1, { message: "Please select a color scheme" }),
  callToAction: z.string().min(3, { message: "Call to action is required" }),
  contactInfo: z.string().min(5, { message: "Contact information is required" }),
  style: z.string().min(1, { message: "Please select a flyer style" }),
});

export default function FlyerGenerator() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFlyer, setGeneratedFlyer] = useState<{html: string, text: string} | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("flyer");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      headline: "",
      subheading: "",
      description: "",
      businessName: "",
      color: "blue",
      callToAction: "",
      contactInfo: "",
      style: "modern",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    
    // Simulate AI generation with a delay
    setTimeout(() => {
      // Generate flyer content and HTML
      const flyerContent = generateSampleFlyer(data);
      
      setGeneratedFlyer(flyerContent);
      setIsGenerating(false);
      
      toast({
        title: "Flyer Generated!",
        description: "Your marketing flyer has been created.",
      });
    }, 2500);
  };
  
  const generateSampleFlyer = (data: z.infer<typeof formSchema>) => {
    // Generate color scheme based on selection
    const colorSchemes: Record<string, {bg: string, accent: string, text: string}> = {
      blue: {
        bg: "from-marketing-100 to-marketing-300",
        accent: "bg-marketing-600",
        text: "text-marketing-800",
      },
      green: {
        bg: "from-green-100 to-green-300",
        accent: "bg-green-600",
        text: "text-green-800",
      },
      purple: {
        bg: "from-purple-100 to-purple-300", 
        accent: "bg-purple-600",
        text: "text-purple-800",
      },
      orange: {
        bg: "from-orange-100 to-orange-300",
        accent: "bg-orange-600",
        text: "text-orange-800",
      },
      gray: {
        bg: "from-gray-100 to-gray-300",
        accent: "bg-gray-600",
        text: "text-gray-800",
      },
    };
    
    const colors = colorSchemes[data.color] || colorSchemes.blue;
    
    // Different layout based on style
    const layouts: Record<string, string> = {
      modern: `
        <div class="p-8 h-full flex flex-col">
          <div class="text-center mb-6">
            <h1 class="text-3xl font-bold mb-2">${data.headline}</h1>
            ${data.subheading ? `<h2 class="text-xl">${data.subheading}</h2>` : ''}
          </div>
          <div class="flex-1 mb-6">
            <p class="text-lg mb-4">${data.description}</p>
          </div>
          <div class="${colors.accent} text-white py-3 px-4 rounded text-center mb-6">
            <p class="font-bold text-lg">${data.callToAction}</p>
          </div>
          <div class="mt-auto">
            <p class="text-lg font-bold mb-1">${data.businessName}</p>
            <p>${data.contactInfo}</p>
          </div>
        </div>
      `,
      classic: `
        <div class="p-8 h-full border-8 border-double ${colors.accent} flex flex-col">
          <div class="text-center mb-6">
            <h1 class="text-3xl font-serif font-bold mb-2">${data.headline}</h1>
            ${data.subheading ? `<h2 class="text-xl font-serif">${data.subheading}</h2>` : ''}
          </div>
          <div class="flex-1 mb-6">
            <p class="text-lg mb-4">${data.description}</p>
          </div>
          <div class="mb-6 text-center">
            <p class="font-bold text-2xl">${data.callToAction}</p>
          </div>
          <div class="mt-auto text-center">
            <p class="text-lg font-bold font-serif mb-1">${data.businessName}</p>
            <p>${data.contactInfo}</p>
          </div>
        </div>
      `,
      minimal: `
        <div class="p-8 h-full flex flex-col">
          <div class="mb-8 ${colors.accent} h-2 w-24"></div>
          <h1 class="text-4xl font-bold mb-2">${data.headline}</h1>
          ${data.subheading ? `<h2 class="text-xl mb-8">${data.subheading}</h2>` : '<div class="mb-6"></div>'}
          <div class="flex-1 mb-8">
            <p class="text-lg">${data.description}</p>
          </div>
          <div class="mb-8">
            <p class="font-bold text-xl">${data.callToAction}</p>
          </div>
          <div class="mt-auto flex items-center justify-between">
            <p class="text-lg font-bold">${data.businessName}</p>
            <p>${data.contactInfo}</p>
          </div>
        </div>
      `,
    };
    
    const layout = layouts[data.style] || layouts.modern;
    
    // Create HTML
    const html = `
      <div class="w-[600px] h-[800px] bg-gradient-to-b ${colors.bg} ${colors.text} rounded-lg overflow-hidden shadow-lg">
        ${layout}
      </div>
    `;
    
    // Plain text version
    const text = `
${data.headline.toUpperCase()}
${data.subheading || ''}

${data.description}

${data.callToAction.toUpperCase()}

${data.businessName}
${data.contactInfo}
    `.trim();
    
    return { html, text };
  };
  
  const copyToClipboard = () => {
    if (generatedFlyer) {
      navigator.clipboard.writeText(generatedFlyer.text);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  const handleImageGenerated = (imageUrl: string) => {
    setGeneratedImage(imageUrl);
  };

  const getImagePrompt = () => {
    const data = form.getValues();
    return `Marketing flyer for ${data.businessName} about ${data.headline} with ${data.style} design style and ${data.color} color scheme`;
  };

  return (
    <div className="space-y-6">
      {!generatedFlyer ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="headline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Headline</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Summer Sale - 50% Off Everything" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="subheading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subheading (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Limited Time Offer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your offer or event" 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Acme Marketing" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color Scheme</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select color scheme" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="purple">Purple</SelectItem>
                        <SelectItem value="orange">Orange</SelectItem>
                        <SelectItem value="gray">Gray</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="callToAction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Call to Action</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Call Now to Reserve Your Spot!" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contactInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Information</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 555-123-4567 or www.example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Flyer Style</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select flyer style" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
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
                  Generating Flyer...
                </>
              ) : (
                "Generate Marketing Flyer"
              )}
            </Button>
          </form>
        </Form>
      ) : (
        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="flyer">Flyer Design</TabsTrigger>
              <TabsTrigger value="image">Supporting Image</TabsTrigger>
            </TabsList>
            
            <TabsContent value="flyer" className="mt-4">
              <div className="border rounded-md bg-card overflow-hidden">
                <div 
                  className="w-full p-4 flex justify-center"
                  dangerouslySetInnerHTML={{ __html: generatedFlyer.html }}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="image" className="mt-4">
              <div className="border rounded-md p-4 bg-card">
                <h3 className="font-medium mb-2">Promotional Image</h3>
                <ImageGenerator 
                  prompt={getImagePrompt()} 
                  width={500}
                  height={500}
                  onImageGenerated={handleImageGenerated}
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setGeneratedFlyer(null);
                setGeneratedImage(null);
                setActiveTab("flyer");
              }}
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
