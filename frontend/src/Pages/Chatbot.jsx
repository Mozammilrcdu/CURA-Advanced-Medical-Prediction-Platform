import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Send, Sparkles } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      content:
        "Hello! I'm CURA's AI Health Assistant. I can help you understand medical conditions, symptoms, and provide general health guidance. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Ref to chat container
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }
};


  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    'What are the early signs of diabetes?',
    'How can I improve my heart health?',
    'What causes high blood pressure?',
    'Tell me about thyroid disorders',
    'How to prevent brain health issues?',
    'What are breast cancer risk factors?',
  ];

  const handleSendMessage = async (content) => {
  if (!content.trim()) return;

  const userMessage = {
    id: Date.now().toString(),
    content: content.trim(),
    sender: 'user',
    timestamp: new Date(),
  };
  setMessages((prev) => [...prev, userMessage]);
  setInputMessage('');
  setIsLoading(true);

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: content.trim() }),
    });

    if (!response.body) throw new Error("No response body");

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let botMessage = "";
    const botId = (Date.now() + 1).toString();

    // Insert empty bot message placeholder
    setMessages((prev) => [
      ...prev,
      { id: botId, content: "", sender: "bot", timestamp: new Date() },
    ]);

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      chunk.split("\n").forEach((line) => {
        if (line.startsWith("data: ")) {
          try {
            const json = JSON.parse(line.replace(/^data: /, ""));
            if (json.chunk) {
              botMessage += json.chunk;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === botId ? { ...msg, content: botMessage } : msg
                )
              );
            }
            if (json.done && json.reply) {
              botMessage = json.reply;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === botId ? { ...msg, content: botMessage } : msg
                )
              );
            }
          } catch (err) {
            console.error("Error parsing SSE JSON:", err);
          }
        }
      });
    }
  } catch (error) {
    console.error("Error sending message:", error);
    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 2).toString(),
        content: "⚠️ Something went wrong. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  } finally {
    setIsLoading(false);
  }
};

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputMessage);
    }
  };

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-medical">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            AI Health Assistant
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Chat with CURA&apos;s
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Medical AI Assistant
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Get instant answers to your health questions and personalized
            guidance from our AI assistant
          </p>
        </div>
      </section>

      {/* Chat Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-elevated border-border/50 h-[600px] flex flex-col">
            <CardHeader className="border-b border-border bg-gradient-medical">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bot className="h-8 w-8 text-primary" />
                  <Sparkles className="h-4 w-4 text-primary-glow absolute -top-1 -right-1 animate-pulse" />
                </div>
                <div>
                  <CardTitle className="text-xl">
                    CURA Health Assistant
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Online • Ready to help
                  </p>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
              <div className="flex-1 flex flex-col overflow-hidden">
                <ScrollArea className="flex-1 p-4">
                  <div
                    ref={chatContainerRef}
                    className="space-y-4 max-h-[520px] overflow-y-auto"
                  >
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`flex max-w-[80%] ${
                            message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                          } items-start space-x-2`}
                        >
                          <div
                            className={`flex-shrink-0 ${
                              message.sender === 'user' ? 'ml-2' : 'mr-2'
                            }`}
                          >
                            {message.sender === 'user' ? (
                              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                                <User className="h-4 w-4 text-primary-foreground" />
                              </div>
                            ) : (
                              <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
                                <Bot className="h-4 w-4 text-primary-foreground" />
                              </div>
                            )}
                          </div>
                          <div
                            className={`rounded-lg px-4 py-2 ${
                              message.sender === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-foreground'
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>


              {/* Footer + Quick Questions */}
              <div className="p-4 border-t border-border flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendMessage(question)}
                      disabled={isLoading}
                      className="text-xs h-8"
                    >
                      {question}
                    </Button>
                  ))}
                </div>

                <div className="flex space-x-2 mt-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask me about health conditions, symptoms, or our AI models..."
                    className="flex-1 focus:ring-primary focus:border-primary"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={() => handleSendMessage(inputMessage)}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-gradient-primary hover:opacity-90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Chatbot;
