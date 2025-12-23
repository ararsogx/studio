'use server';

/**
 * @fileOverview An AI agent that summarizes a given module or document.
 *
 * - summarizeModule - A function that handles the module summarization process.
 * - SummarizeModuleInput - The input type for the summarizeModule function.
 * - SummarizeModuleOutput - The return type for the summarizeModule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeModuleInputSchema = z.object({
  documentContent: z
    .string()
    .describe('The content of the module or document to summarize.'),
});
export type SummarizeModuleInput = z.infer<typeof SummarizeModuleInputSchema>;

const SummarizeModuleOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the module or document.'),
});
export type SummarizeModuleOutput = z.infer<typeof SummarizeModuleOutputSchema>;

export async function summarizeModule(input: SummarizeModuleInput): Promise<SummarizeModuleOutput> {
  return summarizeModuleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeModulePrompt',
  input: {schema: SummarizeModuleInputSchema},
  output: {schema: SummarizeModuleOutputSchema},
  prompt: `You are an expert summarizer, able to distill complex documents into concise summaries.

  Please provide a summary of the following document:

  {{documentContent}}`,
});

const summarizeModuleFlow = ai.defineFlow(
  {
    name: 'summarizeModuleFlow',
    inputSchema: SummarizeModuleInputSchema,
    outputSchema: SummarizeModuleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
