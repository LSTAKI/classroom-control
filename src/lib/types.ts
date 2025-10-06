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
  classId: string;
  teacherId: string;
  students: string[]; // array of studentIds
  avgAttendance: number;
  avgMarks: number;
  homeworkCompletionRate: number;
};

export type Complaint = {
  complaintId: string;
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

export type CalendarEvent = {
  id: string;
  type: 'homework' | 'event' | 'holiday';
  title: string;
  date: string; // ISO string
  description?: string;
  classId?: string;
};

export type Ranking = {
  studentId: string;
  studentName: string;
  avatarUrl: string;
  rank: number;
  score: number;
  homeworkCompletion: number;
  complaints: number;
  activityScore: number;
};
