
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth';
import { Navigate } from 'react-router-dom';

interface ContentHistoryItem {
  id: string;
  content_type: 'social' | 'blog' | 'flyer';
  title: string;
  content: string;
  created_at: string;
}

export default function History() {
  const [history, setHistory] = useState<ContentHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth" />;
  }

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data, error } = await supabase
          .from('content_history')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setHistory(data as ContentHistoryItem[]);
      } catch (error: any) {
        console.error('Error fetching history:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchHistory();
    }
  }, [user]);

  if (isLoading) {
    return <div className="container py-8">Loading...</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-serif font-bold mb-6">Content History</h1>
      <div className="grid gap-6">
        {history.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No content history yet. Start creating content to see your history here.
            </CardContent>
          </Card>
        ) : (
          history.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{item.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(item.created_at), 'PPP')}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Type: {item.content_type.charAt(0).toUpperCase() + item.content_type.slice(1)}
                </p>
                <p className="whitespace-pre-wrap">{item.content}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
