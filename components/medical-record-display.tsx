"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { GenerateMedicalRecordOutput } from "@/ai/generate-medical-record";
import { Stethoscope, ClipboardList, List, Activity, FileText } from "lucide-react";

interface MedicalRecordDisplayProps {
  record: GenerateMedicalRecordOutput | null;
  isLoading: boolean;
}

export default function MedicalRecordDisplay({ record, isLoading }: MedicalRecordDisplayProps) {
  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="text-primary" />
            Generating Medical Record...
          </CardTitle>
          <CardDescription>The AI is summarizing the conversation.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/5" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!record) {
    return (
      <Card className="h-full flex flex-col items-center justify-center p-8 text-center border-dashed">
        <CardHeader className="w-full">
          <CardTitle className="flex items-center justify-center gap-2 font-bold text-2xl">
            <FileText className="text-primary" />
            Medical Record
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The generated medical record will appear here once you click "Generate Medical Record".
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2 font-bold text-2xl">
            <FileText className="text-primary" />
            Medical Record
        </CardTitle>
        <CardDescription className="text-center">This is a summary of the conversation.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-sm">
        <div className="space-y-1">
          <h3 className="font-semibold text-base flex items-center gap-2 text-foreground">
            <Activity className="text-accent" />
            Chief Complaint
          </h3>
          <p className="text-muted-foreground">{record.chiefComplaint}</p>
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-base flex items-center gap-2 text-foreground">
            <List className="text-accent" />
            Symptoms
          </h3>
          <p className="text-muted-foreground">{record.symptoms}</p>
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-base flex items-center gap-2 text-foreground">
            <Stethoscope className="text-accent" />
            Assessment
          </h3>
          <p className="text-muted-foreground">{record.assessment}</p>
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-base flex items-center gap-2 text-foreground">
            <ClipboardList className="text-accent" />
            Plan
          </h3>
          <p className="text-muted-foreground">{record.plan}</p>
        </div>
      </CardContent>
    </Card>
  );
}
