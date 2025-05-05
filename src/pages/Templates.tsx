
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Palette, FileCode, MessageSquare, ShoppingBag, PenTool, Coffee } from "lucide-react";

export default function Templates() {
  const templates = [
    {
      title: "Product Launch",
      description: "A complete suite of content for launching a new product or service",
      category: "Marketing",
      icon: <ShoppingBag className="h-8 w-8 text-primary" />,
      popular: true,
    },
    {
      title: "Brand Story",
      description: "Tell your brand's story across multiple channels",
      category: "Branding",
      icon: <Coffee className="h-8 w-8 text-primary" />,
      popular: false,
    },
    {
      title: "Blog Series",
      description: "Generate a cohesive series of blog posts on a specific topic",
      category: "Content",
      icon: <PenTool className="h-8 w-8 text-primary" />,
      popular: true,
    },
    {
      title: "Social Campaign",
      description: "Multi-platform social media campaign with coordinated messaging",
      category: "Social Media",
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      popular: false,
    },
    {
      title: "Website Copy",
      description: "Professional copy for your website's main pages",
      category: "Web",
      icon: <FileCode className="h-8 w-8 text-primary" />,
      popular: false,
    },
    {
      title: "Brand Refresh",
      description: "Update your visual identity and messaging",
      category: "Design",
      icon: <Palette className="h-8 w-8 text-primary" />,
      popular: false,
    }
  ];

  return (
    <div className="container py-12 animate-fade-in">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-serif font-bold mb-4 bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">Content Templates</h1>
        <p className="text-muted-foreground text-lg">Choose from our curated templates to jumpstart your content creation process. Each template is designed for specific marketing goals and can be customized to match your brand.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template, index) => (
          <Card key={index} className="group overflow-hidden border-border/40 bg-gradient-card hover:shadow-soft transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  {template.icon}
                </div>
                {template.popular && (
                  <Badge variant="secondary" className="bg-primary-50 text-primary-700 hover:bg-primary-100">Popular</Badge>
                )}
              </div>
              <CardTitle className="mt-4 font-serif text-xl">{template.title}</CardTitle>
              <CardDescription className="text-sm">{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary-500"></span>
                <span className="text-muted-foreground">{template.category}</span>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" className="w-full justify-between group-hover:text-primary transition-colors duration-300">
                <span>Use Template</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
