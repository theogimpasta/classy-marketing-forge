
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="animate-fade-in">
      <section className="py-20 md:py-28 bg-gradient-to-b from-background to-secondary/20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Craft Perfect Marketing Content with <span className="bg-gradient-to-r from-marketing-600 to-marketing-800 bg-clip-text text-transparent">AI</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Generate engaging social media posts, compelling blog articles, and eye-catching flyers—all powered by advanced AI.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/dashboard">Start Creating</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/templates">View Templates</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                <svg
                  className="h-8 w-8 text-primary"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Social Media Posts</h3>
                <p className="text-muted-foreground">
                  Generate engaging social posts for any platform that drive engagement and conversions.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                <svg
                  className="h-8 w-8 text-primary"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                  <path d="M8 12h8"></path>
                  <path d="M8 8h4"></path>
                  <path d="M8 16h6"></path>
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Blog Articles</h3>
                <p className="text-muted-foreground">
                  Create SEO-optimized blog content that resonates with your audience and ranks.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                <svg
                  className="h-8 w-8 text-primary"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Marketing Flyers</h3>
                <p className="text-muted-foreground">
                  Design professional flyers with compelling copy that converts prospects to customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl">
              How it Works
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl">
              Three simple steps to create perfect marketing content
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col space-y-4">
              <div className="inline-flex h-10 w-10 rounded-full items-center justify-center bg-primary text-primary-foreground text-lg font-bold">1</div>
              <h3 className="text-xl font-semibold">Choose Content Type</h3>
              <p className="text-muted-foreground">
                Select whether you need social posts, blog articles, or marketing flyers.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="inline-flex h-10 w-10 rounded-full items-center justify-center bg-primary text-primary-foreground text-lg font-bold">2</div>
              <h3 className="text-xl font-semibold">Define Your Brief</h3>
              <p className="text-muted-foreground">
                Tell our AI about your brand, target audience, and specific content goals.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="inline-flex h-10 w-10 rounded-full items-center justify-center bg-primary text-primary-foreground text-lg font-bold">3</div>
              <h3 className="text-xl font-semibold">Generate & Edit</h3>
              <p className="text-muted-foreground">
                Review AI-generated content, make edits if needed, and export for use.
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <Button size="lg" asChild>
              <Link to="/dashboard">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Save Time & Boost Your Marketing Results
              </h2>
              <p className="text-muted-foreground md:text-xl">
                ContentForge helps marketing professionals create high-quality content in minutes, not hours. Our AI understands marketing principles and creates content that converts.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <polyline points="9 11 12 14 22 4"></polyline>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  </svg>
                  <span>Create content 10x faster</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <polyline points="9 11 12 14 22 4"></polyline>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  </svg>
                  <span>Maintain consistent brand voice</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <polyline points="9 11 12 14 22 4"></polyline>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  </svg>
                  <span>Improve engagement and conversion rates</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/dashboard">Try For Free</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-marketing-50 to-marketing-100 p-6 flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="text-5xl font-bold text-marketing-800 mb-4">85%</div>
                <p className="text-lg text-marketing-700">
                  of marketers report saving at least 10 hours per week with ContentForge
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
