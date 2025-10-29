'use server';

/**
 * @fileOverview A medical record generation AI agent.
 *
 * - generateMedicalRecord - A function that handles the generation of medical records from conversations.
 * - GenerateMedicalRecordInput - The input type for the generateMedicalRecord function.
 * - GenerateMedicalRecordOutput - The return type for the generateMedicalRecord function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMedicalRecordInputSchema = z.object({
  conversationHistory: z.string().describe('The complete conversation history between the doctor and patient.'),
});
export type GenerateMedicalRecordInput = z.infer<typeof GenerateMedicalRecordInputSchema>;

const GenerateMedicalRecordOutputSchema = z.object({
  chiefComplaint: z.string().describe('The main reason for the patient\u2019s visit.'),
  symptoms: z.string().describe('A list of symptoms the patient is experiencing.'),
  assessment: z.string().describe('The doctor\u2019s assessment of the patient\u2019s condition.'),
  plan: z.string().describe('The recommended treatment plan for the patient.'),
});
export type GenerateMedicalRecordOutput = z.infer<typeof GenerateMedicalRecordOutputSchema>;

export async function generateMedicalRecord(input: GenerateMedicalRecordInput): Promise<GenerateMedicalRecordOutput> {
  return generateMedicalRecordFlow(input);
}

const generateMedicalRecordPrompt = ai.definePrompt({
  name: 'generateMedicalRecordPrompt',
  input: {schema: GenerateMedicalRecordInputSchema},
  output: {schema: GenerateMedicalRecordOutputSchema},
  prompt: `You are an AI assistant that helps doctors generate medical records from conversations with patients.

  Given the following conversation history, please extract the key information and generate a medical record in the following format:

  Chief Complaint: [The main reason for the patient’s visit]
  Symptoms: [A list of symptoms the patient is experiencing]
  Assessment: [The doctor’s assessment of the patient’s condition]
  Plan: [The recommended treatment plan for the patient]

  Conversation History:
  {{conversationHistory}}`,
});

const generateMedicalRecordFlow = ai.defineFlow(
  {
    name: 'generateMedicalRecordFlow',
    inputSchema: GenerateMedicalRecordInputSchema,
    outputSchema: GenerateMedicalRecordOutputSchema,
  },
  async input => {
    const {output} = await generateMedicalRecordPrompt(input);
    return output!;
  }
);
