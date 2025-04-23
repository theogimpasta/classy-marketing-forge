
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SocialMediaGenerator from "@/components/generators/SocialMediaGenerator";
import BlogGenerator from "@/components/generators/BlogGenerator";
import FlyerGenerator from "@/components/generators/FlyerGenerator";
import RecentContentList from "@/components/content/RecentContentList";

const Dashboard = () => {
  return (
    <div className="container py-8 animate-fade-in">
      <h1 className="text-3xl font-serif font-bold mb-6">Content Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        <div className="md:col-span-2 lg:col-span-3 space-y-6">
          <Tabs defaultValue="social" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="blog">Blog Articles</TabsTrigger>
              <TabsTrigger value="flyer">Marketing Flyers</TabsTrigger>
            </TabsList>
            <TabsContent value="social" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Social Media Post Generator</CardTitle>
                  <CardDescription>
                    Create engaging posts for any social platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SocialMediaGenerator />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="blog" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Blog Article Generator</CardTitle>
                  <CardDescription>
                    Generate SEO-optimized blog content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BlogGenerator />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="flyer" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Marketing Flyer Generator</CardTitle>
                  <CardDescription>
                    Design professional marketing flyers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FlyerGenerator />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Content</CardTitle>
              <CardDescription>Your latest generated content</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentContentList />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
