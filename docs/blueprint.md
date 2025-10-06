# **App Name**: Classroom Command Center

## Core Features:

- Teacher Authentication: Secure teacher login via email/password or Google, managed with Firebase Auth.
- Real-time Analytics Dashboard: Visualize class performance, attendance trends, and homework completion rates using Recharts and data pulled from Firestore.
- Complaint Management: File, track, and withdraw complaints with status updates reflected across all relevant user dashboards in real-time.
- Homework Assignment and Submission: Assign homework, manage student submissions, and provide feedback with live updates for students and parents.
- Automated Ranking System: Dynamically generate and display student rankings based on homework completion, complaints, and activity scores, using data stored in Firestore.
- AI Event Suggestion: Use the information stored on the Firestore Calendar to create personalized suggestions about upcoming events related to the teacher's curriculum. An AI tool will make a decision on which events can best improve the curriculum's retention.
- Interactive Calendar: Implement an interactive calendar with color-coded entries for homework deadlines, events, and holidays, synced across teacher, student, and parent dashboards.

## Style Guidelines:

- Primary color: Calm blue (#64B5F6) to convey trust and stability, complementing the educational environment.
- Background color: Light blue (#E3F2FD), a desaturated version of the primary, creating a gentle backdrop.
- Accent color: Warm orange (#FFB74D) to highlight important actions and information.
- Headline font: 'Space Grotesk' sans-serif, for a computerized and techy look. Body text: 'Inter' sans-serif for a modern neutral style
- Code font: 'Source Code Pro' for displaying code snippets (e.g., in homework descriptions).
- Use a consistent set of flat, geometric icons to represent different sections and actions in the dashboard.
- Employ a card-based layout with rounded corners for a modern, friendly feel. Use a sidebar for main navigation and a header for profile information and notifications.