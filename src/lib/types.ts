export type User = {
  id: string;
  name: string;
  email: string;
  role: 'teacher' | 'student' | 'parent' | 'admin';
  avatarUrl: string;
};

export type Student = User & {
  role: 'student';
  classId: string;
  attendance: { date: string; status: 'present' | 'absent' }[];
  marks: { subject: string; score: number }[];
  activityScore: number;
};

export type Class = {
  id: string;
  teacherId: string;
  students: string[]; // array of studentIds
  avgAttendance: number;
  avgMarks: number;
  homeworkCompletionRate: number;
};

export type Complaint = {
  id: string;
  studentId: string;
  studentName: string;
  avatarUrl: string;
  teacherId: string;
  reason: string;
  date: string;
  status: 'Pending' | 'Resolved' | 'Withdrawn';
};

export type Homework = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  attachments: { name: string; url: string }[];
  assignedBy: string;
  assignedTo: string[];
  status: 'Assigned' | 'Submitted' | 'Checked' | 'Pending';
  subject: string;
};

export type Submission = {
    id: string;
    homeworkId: string;
    studentId: string;
    status: 'Pending' | 'Submitted' | 'Checked' | 'Incomplete';
    submittedAt?: string;
}

export type CalendarEvent = {
  id: string;
  type: 'homework' | 'event' | 'holiday' | 'meeting';
  title: string;
  date: string; // ISO string
  description?: string;
  classId?: string;
};

export type Ranking = {
  id: string;
  studentId: string;
  studentName: string;
  avatarUrl: string;
  rank: number;
  homeworkCompletion: number;
  compl