
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Types for our content items
interface ContentItem {
  id: string;
  title: string;
  type: "social" | "blog" | "flyer";
  date: string;
  preview: string;
}

export default function RecentContentList() {
  // Mock data - in a real app this would come from a database or API
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: "1",
      title: "Summer Campaign Launch",
      type: "social",
      date: "2025-04-23",
      preview: "Ready to take your summer marketing to the next level? Our new campaign launches today with...",
    },
    {
      id: "2",
      title: "10 Digital Marketing Trends of 2025",
      type: "blog",
      date: "2025-04-21",
      preview: "In today's fast-paced digital landscape, understanding marketing trends has become essential...",
    },
    {
      id: "3",
      title: "Spring Sale Promotion",
      type: "flyer",
      date: "2025-04-18",
      preview: "SPRING SALE - 30% OFF EVERYTHING",
    },
    {
      id: "4",
      title: "Product Launch Announcement",
      type: "social",
      date: "2025-04-15",
      preview: "Excited to announce our newest product! After months of development...",
    },
  ]);

  // Function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Function to get icon based on content type
  const getTypeIcon = (type: ContentItem['type']) => {
    switch (type) {
      case 'social':
        return (
          <svg className="h-4 w-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
            <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
          </svg>
        );
      case 'blog':
        return (
          <svg className="h-4 w-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M8 12h8"></path>
            <path d="M8 8h4"></path>
            <path d="M8 16h6"></path>
          </svg>
        );
      case 'flyer':
        return (
          <svg className="h-4 w-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        );
    }
  };

  return (
    <div className="space-y-4">
      {contentItems.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No content generated yet.</p>
          <p className="text-sm">Use the generator tools to create content.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {contentItems.map((item) => (
            <li key={item.id} className="border rounded-md p-3 bg-background hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-primary">{getTypeIcon(item.type)}</span>
                  <span className="text-xs font-medium uppercase">{item.type}</span>
                </div>
                <span className="text-xs text-muted-foreground">{formatDate(item.date)}</span>
              </div>
              <h4 className="font-medium truncate">{item.title}</h4>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{item.preview}</p>
              <div className="flex gap-2 mt-2">
                <Button variant="ghost" size="sm" className="text-xs h-8">Edit</Button>
                <Button variant="ghost" size="sm" className="text-xs h-8">View</Button>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      <Button variant="outline" size="sm" className="w-full">
        View All Content
      </Button>
    </div>
  );
}
