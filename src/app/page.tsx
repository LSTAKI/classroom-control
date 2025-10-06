import { redirect } from 'next/navigation';

export default function Home() {
  // In a real application, you would check for authentication status here.
  // For this demo, we redirect directly to the dashboard.
  redirect('/dashboard');
}
