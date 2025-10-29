'use server';

import { generateMedicalRecord } from '@/ai/generate-medical-record';
import type { GenerateMedicalRecordOutput } from '@/ai/generate-medical-record';

export async function getMedicalRecord(conversationHistory: string): Promise<GenerateMedicalRecordOutput | { error: string }> {
  if (!conversationHistory.trim()) {
    return { error: 'Conversation history is empty.' };
  }

  try {
    const result = await generateMedicalRecord({ conversationHistory });
    return result;
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { error: `Failed to generate medical record: ${errorMessage}` };
  }
}
