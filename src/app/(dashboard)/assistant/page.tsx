'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { users } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { answerAcademicQuestion } from '@/ai/flows/answer-academic-questions';
import { Send, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const user = users.find((u) => u.role === 'Admin')!;
  const userAvatar = PlaceHolderImages.find((p) => p.id === user.avatar);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await answerAcademicQuestion({ question: input });
      const aiMessage: Message = { sender: 'ai', text: result.answer };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        sender: 'ai',
        text: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error('Error answering question:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const questionLimit = 5;
  const questionsAsked = messages.filter(m => m.sender === 'user').length;


  return (
    <div className="grid h-[calc(100vh-8rem)] grid-cols-1">
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Sparkles className="text-accent" />
            AI Study Assistant
          </CardTitle>
          <CardDescription>
            Ask me any academic question. I'm here to help you learn.
            {user.role === 'Standard' && (
                 <div className="mt-2">
                    <Badge variant="secondary">
                        {questionsAsked} / {questionLimit} questions asked today.
                    </Badge>
                </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {messages.length === 0 && (
                <div className="text-center text-muted-foreground">
                    <p>No messages yet. Start by asking a question below.</p>
                </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 ${
                  message.sender === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.sender === 'ai' && (
                  <Avatar className="h-9 w-9 border">
                    <AvatarFallback>
                        <Sparkles />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-xs rounded-lg p-3 text-sm md:max-w-md ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.text}
                </div>
                 {message.sender === 'user' && (
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={userAvatar?.imageUrl} />
                        <AvatarFallback>YOU</AvatarFallback>
                    </Avatar>
                 )}
              </div>
            ))}
             {isLoading && (
              <div className="flex items-start gap-4">
                <Avatar className="h-9 w-9 border">
                  <AvatarFallback><Sparkles /></AvatarFallback>
                </Avatar>
                <div className="max-w-xs rounded-lg p-3 text-sm md:max-w-md bg-muted flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-foreground" />
                  <div className="h-2 w-2 animate-pulse rounded-full bg-foreground [animation-delay:0.2s]" />
                  <div className="h-2 w-2 animate-pulse rounded-full bg-foreground [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
            <Input
              id="message"
              placeholder="Type your question..."
              className="flex-1"
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading || (user.role === 'Standard' && questionsAsked >= questionLimit)}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim() || (user.role === 'Standard' && questionsAsked >= questionLimit)}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
