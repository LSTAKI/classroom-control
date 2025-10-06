import type { User, Student, Class, Complaint, Homework, CalendarEvent, Ranking } from './types';
import placeholderData from './placeholder-images.json';

const getImageUrl = (id: string) => placeholderData.placeholderImages.find(img => img.id === id)?.imageUrl || '';

export const MOCK_TEACHER: User = {
  id: 'teacher-1',
  name: 'Sarah Davis',
  email: 'sarah.davis@school.edu',
  role: 'teacher',
  avatarUrl: getImageUrl('teacher-avatar'),
};

export const MOCK_STUDENTS: Student[] = [
  {
    id: 'student-1',
    name: 'Liam Johnson',
    email: 'liam.j@school.edu',
    role: 'student',
    avatarUrl: getImageUrl('student-1'),
    classId: 'class-101',
    attendance: [
      { date: '2023-10-01', status: 'present' },
      { date: '2023-10-02', status: 'present' },
    ],
    marks: [
      { subject: 'Math', score: 85 },
      { subject: 'Science', score: 92 },
    ],
    activityScore: 88,
  },
  {
    id: 'student-2',
    name: 'Olivia Smith',
    email: 'olivia.s@school.edu',
    role: 'student',
    avatarUrl: getImageUrl('student-2'),
    classId: 'class-101',
    attendance: [],
    marks: [
      { subject: 'Math', score: 95 },
      { subject: 'Science', score: 98 },
    ],
    activityScore: 95,
  },
  {
    id: 'student-3',
    name: 'Noah Williams',
    email: 'noah.w@school.edu',
    role: 'student',
    avatarUrl: getImageUrl('student-3'),
    classId: 'class-101',
    attendance: [],
    marks: [
      { subject: 'Math', score: 72 },
      { subject: 'Science', score: 65 },
    ],
    activityScore: 60,
  },
  {
    id: 'student-4',
    name: 'Emma Brown',
    email: 'emma.b@school.edu',
    role: 'student',
    avatarUrl: getImageUrl('student-4'),
    classId: 'class-101',
    attendance: [],
    marks: [
      { subject: 'Math', score: 91 },
      { subject: 'Science', score: 89 },
    ],
    activityScore: 92,
  },
  {
    id: 'student-5',
    name: 'Oliver Jones',
    email: 'oliver.j@school.edu',
    role: 'student',
    avatarUrl: getImageUrl('student-5'),
    classId: 'class-101',
    attendance: [],
    marks: [
      { subject: 'Math', score: 88 },
      { subject: 'Science', score: 82 },
    ],
    activityScore: 85,
  },
    {
    id: 'student-6',
    name: 'Ava Garcia',
    email: 'ava.g@school.edu',
    role: 'student',
    avatarUrl: getImageUrl('student-6'),
    classId: 'class-101',
    attendance: [],
    marks: [
      { subject: 'Math', score: 78 },
      { subject: 'Science', score: 81 },
    ],
    activityScore: 79,
  },
];

export const MOCK_CLASS: Class = {
  classId: 'class-101',
  teacherId: 'teacher-1',
  students: MOCK_STUDENTS.map(s => s.id),
  avgAttendance: 95.5,
  avgMarks: 85.2,
  homeworkCompletionRate: 92.0,
};

export const MOCK_HOMEWORK: Homework[] = [
  {
    id: 'hw-1',
    title: 'Algebra II: Chapter 3 Problems',
    description: 'Complete all odd-numbered problems in Chapter 3.',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    attachments: [],
    assignedBy: 'teacher-1',
    assignedTo: ['class-101'],
    status: 'Assigned',
    subject: 'Math',
  },
  {
    id: 'hw-2',
    title: 'Photosynthesis Lab Report',
    description: 'Write a 2-page lab report on the photosynthesis experiment.',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    attachments: [{ name: 'Lab-Guidelines.pdf', url: '#' }],
    assignedBy: 'teacher-1',
    assignedTo: ['class-101'],
    status: 'Assigned',
    subject: 'Science',
  },
  {
    id: 'hw-3',
    title: 'Historical Essay on Ancient Rome',
    description: '5-page essay on the fall of the Roman Empire.',
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    attachments: [],
    assignedBy: 'teacher-1',
    assignedTo: ['class-101'],
    status: 'Checked',
    subject: 'History',
  },
];

export const MOCK_COMPLAINTS: Complaint[] = [
  {
    complaintId: 'complaint-1',
    studentId: 'student-3',
    studentName: 'Noah Williams',
    avatarUrl: getImageUrl('student-3'),
    teacherId: 'teacher-1',
    reason: 'Disruptive behavior in class',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'Pending',
  },
  {
    complaintId: 'complaint-2',
    studentId: 'student-5',
    studentName: 'Oliver Jones',
    avatarUrl: getImageUrl('student-5'),
    teacherId: 'teacher-1',
    reason: 'Incomplete assignments',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'Resolved',
  },
];

export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'event-1',
    type: 'homework',
    title: 'Algebra II Due',
    date: MOCK_HOMEWORK[0].dueDate,
  },
  {
    id: 'event-2',
    type: 'event',
    title: 'Parent-Teacher Conferences',
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Discuss student progress for the first semester.',
  },
  {
    id: 'event-3',
    type: 'holiday',
    title: 'Thanksgiving Break',
    date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'School closed for Thanksgiving holiday.',
  },
  {
    id: 'event-4',
    type: 'event',
    title: 'Science Fair',
    date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Annual school science fair. Projects due.',
  },
];

// Simplified ranking calculation for mock data
export const MOCK_RANKINGS: Ranking[] = MOCK_STUDENTS
  .map(student => {
    const homeworkCompletion = Math.random() * 50 + 50; // %
    const complaints = MOCK_COMPLAINTS.filter(c => c.studentId === student.id && c.status !== 'Withdrawn').length;
    const score = (homeworkCompletion * 0.5) - (complaints * 30) + (student.activityScore * 0.2);
    
    return {
      studentId: student.id,
      studentName: student.name,
      avatarUrl: student.avatarUrl,
      score: Math.max(0, Math.round(score)),
      homeworkCompletion: Math.round(homeworkCompletion),
      complaints,
      activityScore: student.activityScore,
      rank: 0,
    };
  })
  .sort((a, b) => b.score - a.score)
  .map((student, index) => ({ ...student, rank: index + 1 }));
