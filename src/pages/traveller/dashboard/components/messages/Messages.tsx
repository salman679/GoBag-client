"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/Button";
import { Input } from "@/components/ui/Input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Check,
  MapPin,
  Package,
  PaperclipIcon,
  Send,
} from "lucide-react";

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(conversations[0]);

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col space-y-6 md:h-[calc(100vh-7rem)]">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          Communicate with senders about their packages
        </p>
      </div>

      <div className="grid flex-1 gap-6 md:grid-cols-[300px_1fr]">
        <Card className="hidden md:block">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <CardDescription>Your recent message threads</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-16rem)]">
              {conversations.map((conversation) => (
                <div key={conversation.id}>
                  <button
                    className={`flex w-full items-start gap-3 p-4 text-left hover:bg-muted ${
                      selectedConversation?.id === conversation.id
                        ? "bg-muted"
                        : ""
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <Avatar>
                      <AvatarImage
                        src={conversation.sender.image}
                        alt={conversation.sender.name}
                      />
                      <AvatarFallback>
                        {conversation.sender.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">
                          {conversation.sender.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {conversation.lastMessageTime}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {conversation.lastMessage}
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <MapPin className="h-3 w-3" />
                        <span>
                          {conversation.trip.from} to {conversation.trip.to}
                        </span>
                      </div>
                    </div>
                  </button>
                  <Separator />
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {selectedConversation ? (
          <Card className="flex flex-col">
            <CardHeader className="flex-row items-center gap-4 space-y-0 border-b px-6">
              <Avatar>
                <AvatarImage
                  src={selectedConversation.sender.image}
                  alt={selectedConversation.sender.name}
                />
                <AvatarFallback>
                  {selectedConversation.sender.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle>{selectedConversation.sender.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Package className="h-3 w-3" />
                  <span>{selectedConversation.package.description}</span>
                  <span>•</span>
                  <MapPin className="h-3 w-3" />
                  <span>
                    {selectedConversation.trip.from} to{" "}
                    {selectedConversation.trip.to}
                  </span>
                  <span>•</span>
                  <Calendar className="h-3 w-3" />
                  <span>{selectedConversation.trip.date}</span>
                </CardDescription>
              </div>
            </CardHeader>
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {selectedConversation.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="mt-1 text-right text-xs opacity-70">
                        {message.time}
                        {message.sender === "user" && message.read && (
                          <Check className="ml-1 inline h-3 w-3" />
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Button variant="outline" className="shrink-0">
                  <PaperclipIcon className="h-4 w-4" />
                </Button>
                <Input placeholder="Type your message..." className="flex-1" />
                <Button className="shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium">No conversation selected</h3>
              <p className="text-muted-foreground">
                Select a conversation from the list to start messaging
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

interface Conversation {
  id: string;
  sender: {
    name: string;
    image: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  trip: {
    from: string;
    to: string;
    date: string;
  };
  package: {
    description: string;
  };
  messages: {
    sender: "user" | "other";
    content: string;
    time: string;
    read?: boolean;
  }[];
}

const conversations: Conversation[] = [
  {
    id: "1",
    sender: {
      name: "Alice Smith",
      image: "/placeholder.svg?height=40&width=40",
    },
    lastMessage:
      "Great! I'll make sure it's well packed. Can you confirm the pickup location?",
    lastMessageTime: "10:23 AM",
    trip: {
      from: "New York",
      to: "London",
      date: "Mar 15, 2025",
    },
    package: {
      description: "Gift package with local souvenirs",
    },
    messages: [
      {
        sender: "other",
        content:
          "Hi there! I'm interested in sending a package with you on your trip to London.",
        time: "Yesterday, 2:30 PM",
      },
      {
        sender: "user",
        content:
          "Hello! I'd be happy to help. Can you tell me more about what you're sending?",
        time: "Yesterday, 2:45 PM",
        read: true,
      },
      {
        sender: "other",
        content:
          "It's a gift package with some local souvenirs for my sister who lives in London. Nothing fragile, just some New York themed items.",
        time: "Yesterday, 3:00 PM",
      },
      {
        sender: "user",
        content:
          "That sounds fine. The package size and weight are within my available space. I can take it with me.",
        time: "Yesterday, 3:15 PM",
        read: true,
      },
      {
        sender: "other",
        content:
          "Great! I'll make sure it's well packed. Can you confirm the pickup location?",
        time: "10:23 AM",
      },
    ],
  },
  {
    id: "2",
    sender: {
      name: "Bob Johnson",
      image: "/placeholder.svg?height=40&width=40",
    },
    lastMessage:
      "I've sent you the details of the documents I need delivered. Please confirm when you receive them.",
    lastMessageTime: "Yesterday",
    trip: {
      from: "New York",
      to: "London",
      date: "Mar 15, 2025",
    },
    package: {
      description: "Documents and small electronics",
    },
    messages: [
      {
        sender: "other",
        content:
          "Hello, I need to send some important documents to London. Are you available?",
        time: "2 days ago, 1:15 PM",
      },
      {
        sender: "user",
        content:
          "Yes, I am. I'll be traveling on March 15th. What kind of documents?",
        time: "2 days ago, 1:30 PM",
        read: true,
      },
      {
        sender: "other",
        content:
          "Business contracts and a small USB drive. Nothing big or heavy.",
        time: "2 days ago, 2:00 PM",
      },
      {
        sender: "user",
        content:
          "That should be fine. I can take those with me. Do you need them delivered to a specific address?",
        time: "2 days ago, 2:15 PM",
        read: true,
      },
      {
        sender: "other",
        content:
          "I've sent you the details of the documents I need delivered. Please confirm when you receive them.",
        time: "Yesterday, 10:00 AM",
      },
    ],
  },
  {
    id: "3",
    sender: {
      name: "Carol Williams",
      image: "/placeholder.svg?height=40&width=40",
    },
    lastMessage:
      "Thank you for accepting my request! I'm excited to get this birthday gift to my sister on time.",
    lastMessageTime: "2 days ago",
    trip: {
      from: "London",
      to: "Paris",
      date: "Mar 22, 2025",
    },
    package: {
      description: "Birthday gift for my sister",
    },
    messages: [
      {
        sender: "other",
        content:
          "Hi! I saw you're traveling to Paris next week. I have a birthday gift I need to send to my sister.",
        time: "3 days ago, 4:20 PM",
      },
      {
        sender: "user",
        content:
          "Hello Carol! Yes, I'll be going to Paris on the 22nd. Tell me about the gift.",
        time: "3 days ago, 4:35 PM",
        read: true,
      },
      {
        sender: "other",
        content:
          "It's a small jewelry box, nothing valuable but sentimental. It's her 30th birthday and I want to surprise her.",
        time: "3 days ago, 4:50 PM",
      },
      {
        sender: "user",
        content:
          "I'd be happy to help with that. I have plenty of space for something small like that.",
        time: "3 days ago, 5:05 PM",
        read: true,
      },
      {
        sender: "other",
        content:
          "Thank you for accepting my request! I'm excited to get this birthday gift to my sister on time.",
        time: "2 days ago, 9:15 AM",
      },
    ],
  },
];
