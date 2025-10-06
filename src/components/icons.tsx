import type { SVGProps } from 'react';

export const GoldMedalIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16.5 8.4a5 5 0 1 0-9 0 5 5 0 0 0 9 0z" fill="hsl(var(--accent))" stroke="hsl(var(--accent-foreground))" />
    <path d="M8.5 16.8 12 22l3.5-5.2" stroke="hsl(var(--accent-foreground))" />
    <path d="m10 13.7 2-1.5 2 1.5" stroke="hsl(var(--accent-foreground))" />
  </svg>
);

export const SilverMedalIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16.5 8.4a5 5 0 1 0-9 0 5 5 0 0 0 9 0z" fill="hsl(var(--muted))" stroke="hsl(var(--muted-foreground))" />
    <path d="M8.5 16.8 12 22l3.5-5.2" stroke="hsl(var(--muted-foreground))" />
    <path d="m10 13.7 2-1.5 2 1.5" stroke="hsl(var(--muted-foreground))" />
  </svg>
);

export const BronzeMedalIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16.5 8.4a5 5 0 1 0-9 0 5 5 0 0 0 9 0z" fill="hsl(var(--chart-1))" stroke="hsl(var(--destructive))" />
    <path d="M8.5 16.8 12 22l3.5-5.2" stroke="hsl(var(--destructive))" />
    <path d="m10 13.7 2-1.5 2 1.5" stroke="hsl(var(--destructive))" />
  </svg>
);
