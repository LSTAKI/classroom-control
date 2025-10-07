import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {firebase} from '@genkit-ai/firebase';
import {googleCloud} from '@genkit-ai/google-cloud';

export const ai = genkit({
  plugins: [
    firebase(),
    googleAI(),
    googleCloud({
      // We recommend passing the project ID in as an environment
      // variable.
      projectId: process.env.GCLOUD_PROJECT,
    }),
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
