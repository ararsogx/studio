'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating study guides from module content.
 *
 * The flow takes module content as input and returns a generated study guide.
 *
 * @exported
 * - `generateStudyGuide`: Asynchronous function to generate a study guide.
 * - `GenerateStudyGuideInput`: Interface defining the input schema for the function.
 * - `GenerateStudyGuideOutput`: Interface defining the output schema for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStudyGuideInputSchema = z.object({
  moduleContent: z.string().describe('The content of the module to generate a study guide from.'),
});
export type GenerateStudyGuideInput = z.infer<typeof GenerateStudyGuideInputSchema>;

const GenerateStudyGuideOutputSchema = z.object({
  studyGuide: z.string().describe('The generated study guide.'),
});
export type GenerateStudyGuideOutput = z.infer<typeof GenerateStudyGuideOutputSchema>;

export async function generateStudyGuide(input: GenerateStudyGuideInput): Promise<GenerateStudyGuideOutput> {
  return generateStudyGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStudyGuidePrompt',
  input: {schema: GenerateStudyGuideInputSchema},
  output: {schema: GenerateStudyGuideOutputSchema},
  prompt: `You are an expert study guide creator. Please generate a comprehensive study guide from the following module content:\n\n{{{moduleContent}}}`,
});

const generateStudyGuideFlow = ai.defineFlow(
  {
    name: 'generateStudyGuideFlow',
    inputSchema: GenerateStudyGuideInputSchema,
    outputSchema: GenerateStudyGuideOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
