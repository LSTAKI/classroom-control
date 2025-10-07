'use server';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {googleCloud} from '@genkit-ai/google-cloud';

export const ai = genkit({
  plugins: [
    googleAI(),
    googleCloud,
  ],
  // Log developer-friendly error messages and stack traces.
  // NOTE: This should be disabled in production.
  dev: {
    logLevel: 'debug',
  },
  // We recommend using a production-grade logger in production.
  logLevel: 'info',
  // Allow Genkit to store traces and other data in a local file.
  // NOTE: This should be disabled in production.
  enableLocalFlowState: true,
});
