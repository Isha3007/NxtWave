import { useState } from "react";
import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Users, 
  MessageSquare, 
  ThumbsUp, 
  Plus, 
  Clock, 
  TrendingUp,
  Search
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  timestamp: Date;
  likes: number;
  comments: Comment[];
}

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: Date;
}

const categories = [
  "General Discussion",
  "Healthcare Schemes",
  "Education Schemes",
  "Agriculture",
  "Financial Assistance",
  "Housing",
  "Employment",
];

const initialPosts: Post[] = [
  {
    id: 1,
    title: "How to apply for PM Kisan scheme?",
    content: "I'm a farmer with 1.5 hectares of land. Can someone guide me through the PM Kisan application process? What documents are needed?",
    category: "Agriculture",
    author: "Ramesh Kumar",
    timestamp: new Date(Date.now() - 3600000),
    likes: 24,
    comments: [
      {
        id: 1,
        author: "Suresh Patel",
        content: "You need your land records, Aadhaar card, and bank account details. Apply through the official PM Kisan portal or CSC center.",
        timestamp: new Date(Date.now() - 1800000),
      },
      {
        id: 2,
        author: "Admin",
        content: "You can also use the SchemesConnect chatbot for step-by-step guidance!",
        timestamp: new Date(Date.now() - 900000),
      },
    ],
  },
  {
    id: 2,
    title: "Ayushman Bharat eligibility doubt",
    content: "My family income is around ₹3 Lakhs per year. Are we eligible for Ayushman Bharat? The official website is confusing.",
    category: "Healthcare Schemes",
    author: "Priya Sharma",
    timestamp: new Date(Date.now() - 7200000),
    likes: 18,
    comments: [
      {
        id: 1,
        author: "Health Expert",
        content: "PMJAY eligibility is based on SECC 2011 data. You can check your eligibility on the mera.pmjay.gov.in portal using your Aadhaar or ration card.",
        timestamp: new Date(Date.now() - 3600000),
      },
    ],
  },
  {
    id: 3,
    title: "Success Story: Got my first house under PMAY!",
    content: "After 6 months of application process, finally received approval for Pradhan Mantri Awas Yojana. Thanks to this community for all the guidance! 🏠",
    category: "Housing",
    author: "Meera Devi",
    timestamp: new Date(Date.now() - 86400000),
    likes: 156,
    comments: [
      {
        id: 1,
        author: "Rajesh",
        content: "Congratulations! Can you share what documents you submitted?",
        timestamp: new Date(Date.now() - 43200000),
      },
      {
        id: 2,
        author: "Meera Devi",
        content: "I submitted income certificate, Aadhaar, bank statement, and land ownership proof. The process was smooth at the municipal office.",
        timestamp: new Date(Date.now() - 21600000),
      },
    ],
  },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("");
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreatePost = () => {
    if (!newPostTitle || !newPostContent || !newPostCategory) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const newPost: Post = {
      id: Date.now(),
      title: newPostTitle,
      content: newPostContent,
      category: newPostCategory,
      author: "You",
      timestamp: new Date(),
      likes: 0,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostContent("");
    setNewPostCategory("");
    setIsDialogOpen(false);

    toast({
      title: "Post Created",
      description: "Your post has been published to the community.",
    });
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleAddComment = (postId: number) => {
    const commentContent = newComment[postId];
    if (!commentContent?.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: "You",
      content: commentContent,
      timestamp: new Date(),
    };

    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, comments: [...post.comments, comment] }
        : post
    ));

    setNewComment({ ...newComment, [postId]: "" });
  };

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  return (
    <MainLayout>
      <div className="container py-8 md:py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              Community Forum
            </h1>
            <p className="text-muted-foreground">
              Connect with others, share experiences, and get advice about government schemes
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="postTitle">Title</Label>
                  <Input
                    id="postTitle"
                    placeholder="What's your question or topic?"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postCategory">Category</Label>
                  <Select value={newPostCategory} onValueChange={setNewPostCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postContent">Content</Label>
                  <Textarea
                    id="postContent"
                    placeholder="Share your question, experience, or advice..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button variant="hero" className="w-full" onClick={handleCreatePost}>
                  Publish Post
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Posts", value: posts.length, icon: MessageSquare },
            { label: "Active Members", value: "2.5K", icon: Users },
            { label: "This Week", value: "48", icon: TrendingUp },
            { label: "Avg Response", value: "2h", icon: Clock },
          ].map((stat, index) => (
            <Card key={index}>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="card-gradient animate-fade-in">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {post.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{post.author}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatTime(post.timestamp)}
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">{post.category}</Badge>
                </div>
                <CardTitle className="text-lg mt-3">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{post.content}</p>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-2 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className="gap-2"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    {post.comments.length} Comments
                  </Button>
                </div>

                {/* Comments */}
                {post.comments.length > 0 && (
                  <div className="space-y-3 pl-4 border-l-2 border-border">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="text-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(comment.timestamp)}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Comment */}
                <div className="flex gap-2 pt-2">
                  <Input
                    placeholder="Write a comment..."
                    value={newComment[post.id] || ""}
                    onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && handleAddComment(post.id)}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleAddComment(post.id)}
                    disabled={!newComment[post.id]?.trim()}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredPosts.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground/30 mb-4" />
                <h3 className="font-display font-semibold text-lg mb-2">
                  No Posts Found
                </h3>
                <p className="text-muted-foreground text-sm max-w-sm">
                  {searchQuery
                    ? "Try adjusting your search query or category filter."
                    : "Be the first to start a discussion!"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
