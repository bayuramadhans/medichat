"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Wand2, Send, Loader2 } from "lucide-react";
import MedicalRecordDisplay from "./medical-record-display";
import { getMedicalRecord } from "@/app/actions";
import { toast } from "sonner"
import type { GenerateMedicalRecordOutput } from "@/ai/generate-medical-record";

type Message = {
  sender: 'Doctor' | 'Patient';
  text: string;
};

const conversation: Message[] = [
    // Example conversation data
    // { sender: 'Doctor', text: 'What brings you in today?' },
    // { sender: 'Patient', text: 'I have fever and cough for 3 days.' },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(conversation);
  const [doctorInput, setDoctorInput] = useState("");
  const [patientInput, setPatientInput] = useState("");
  const [record, setRecord] = useState<GenerateMedicalRecordOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (sender: 'Doctor' | 'Patient') => {
    const text = sender === 'Doctor' ? doctorInput : patientInput;
    if (text.trim()) {
      setMessages([...messages, { sender, text }]);
      if (sender === 'Doctor') {
        setDoctorInput("");
      } else {
        setPatientInput("");
      }
    }
  };

  const handleGenerateRecord = async () => {
    setIsGenerating(true);
    setRecord(null);

    const conversationHistory = messages.map(msg => `${msg.sender}: ${msg.text}`).join('\n');
    
    const result = await getMedicalRecord(conversationHistory);

    if ('error' in result) {
      toast.warning(result.error);
    } else {
      setRecord(result);
      toast.success("Medical record generated successfully.");
    }
    setIsGenerating(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Chat Interface</CardTitle>
          <CardDescription>Simulate a conversation between a doctor and a patient.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <ScrollArea className="h-96 w-full pr-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${
                    message.sender === 'Doctor' ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {message.sender === 'Doctor' && (
                    <Avatar className="h-8 w-8 border">
                      <AvatarFallback className="bg-muted">D</AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`rounded-xl px-4 py-2.5 max-w-[75%] shadow-sm ${
                      message.sender === 'Doctor'
                        ? 'bg-card text-card-foreground'
                        : 'bg-primary text-primary-foreground'
                    }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                  {message.sender === 'Patient' && (
                    <Avatar className="h-8 w-8 border">
                      <AvatarFallback className="bg-primary text-primary-foreground">P</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
               <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4 pt-6">
            <div className="w-full space-y-2">
                <Label htmlFor="doctor-input" className="font-semibold">Doctor</Label>
                <div className="flex gap-2">
                    <Input
                        id="doctor-input"
                        value={doctorInput}
                        onChange={(e) => setDoctorInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage('Doctor')}
                        placeholder="Type doctor's message..."
                    />
                    <Button variant="outline" size="icon" onClick={() => handleSendMessage('Doctor')} aria-label="Send doctor message">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="w-full space-y-2">
                <Label htmlFor="patient-input" className="font-semibold">Patient</Label>
                <div className="flex gap-2">
                    <Input
                        id="patient-input"
                        value={patientInput}
                        onChange={(e) => setPatientInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage('Patient')}
                        placeholder="Type patient's message..."
                    />
                    <Button onClick={() => handleSendMessage('Patient')} size="icon" aria-label="Send patient message">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </CardFooter>
      </Card>
      
      <div className="space-y-4 sticky top-8">
        <Button onClick={handleGenerateRecord} disabled={isGenerating || messages.length === 0} className="w-full text-base py-6">
            {isGenerating ? <Loader2 className="animate-spin mr-2" /> : <Wand2 className="mr-2" />}
            Generate Medical Record
        </Button>
        <MedicalRecordDisplay record={record} isLoading={isGenerating} />
      </div>
    </div>
  );
}
