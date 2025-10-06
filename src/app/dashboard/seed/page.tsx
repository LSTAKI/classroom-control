'use client';

import { useState } from 'react';
import { useFirestore, useUser, setDocumentNonBlocking, addDocumentNonBlocking } from '@/firebase';
import { doc, collection }from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import PageHeader from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import placeholderImages from '@/lib/placeholder-images.json';
import { Loader2 } from 'lucide-react';

const studentsData = [
    { id: 'student-1', name: 'Liam Johnson', email: 'liam.johnson@example.com', role: 'student', classId: 'class-101', attendance: [{date: '2023-10-01', status: 'present'}], marks: [{subject: 'Math', score: 92}, {subject: 'Science', score: 88}], activityScore: 95 },
    { id: 'student-2', name: 'Olivia Smith', email: 'olivia.smith@example.com', role: 'student', classId: 'class-101', attendance: [{date: '2023-10-01', status: 'present'}], marks: [{subject: 'Math', score: 85}, {subject: 'Science', score: 91}], activityScore: 90 },
    { id: 'student-3', name: 'Noah Williams', email: 'noah.williams@example.com', role: 'student', classId: 'class-101', attendance: [{date: '2023-10-01', status: 'absent'}], marks: [{subject: 'Math', score: 78}, {subject: 'Science', score: 82}], activityScore: 80 },
    { id: 'student-4', name: 'Emma Brown', email: 'emma.brown@example.com', role: 'student', classId: 'class-101', attendance: [{date: '2023-10-01', status: 'present'}], marks: [{subject: 'Math', score: 95}, {subject: 'Science', score: 96}], activityScore: 98 },
    { id: 'student-5', name: 'Oliver Jones', email: 'oliver.jones@example.com', role: 'student', classId: 'class-101', attendance: [{date: '2023-10-01', status: 'present'}], marks: [{subject: 'Math', score: 88}, {subject: 'Science', score: 85}], activityScore: 85 },
    { id: 'student-6', name: 'Ava Garcia', email: 'ava.garcia@example.com', role: 'student', classId: 'class-101', attendance: [{date: '2023-10-01', status: 'present'}], marks: [{subject: 'Math', score: 90}, {subject: 'Science', score: 92}], activityScore: 93 },
];

const classData = {
    id: 'class-101',
    teacherId: '', // Will be set to current user
    students: ['student-1', 'student-2', 'student-3', 'student-4', 'student-5', 'student-6'],
    avgAttendance: 91.7,
    avgMarks: 88.5,
    homeworkCompletionRate: 95,
};

const complaintsData = [
    { studentId: 'student-3', reason: 'Disturbing the class during the science lesson.', date: '2023-10-22T10:00:00Z', status: 'Pending' },
    { studentId: 'student-5', reason: 'Did not complete the assigned math homework.', date: '2023-10-20T14:30:00Z', status: 'Resolved' },
];

const homeworkData = [
    { id: 'hw-1', title: 'Algebra Chapter 5', subject: 'Math', description: 'Complete all exercises in chapter 5.', dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), status: 'Assigned', attachments: [] },
    { id: 'hw-2', title: 'Cell Biology Report', subject: 'Science', description: 'Write a 2-page report on cell mitosis.', dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), status: 'Assigned', attachments: [] },
    { id: 'hw-3', title: 'Geometry Proofs', subject: 'Math', description: 'Solve the provided worksheet on geometric proofs.', dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), status: 'Checked', attachments: [] },
];

const submissionsData = {
    'hw-1': [
        { studentId: 'student-1', status: 'Submitted', submittedAt: new Date().toISOString() },
        { studentId: 'student-2', status: 'Submitted', submittedAt: new Date().toISOString() },
        { studentId: 'student-3', status: 'Pending' },
        { studentId: 'student-4', status: 'Checked' },
        { studentId: 'student-5', status: 'Incomplete' },
        { studentId: 'student-6', status: 'Submitted', submittedAt: new Date().toISOString() },
    ],
    'hw-2': [
        { studentId: 'student-1', status: 'Pending' },
        { studentId: 'student-2', status: 'Submitted', submittedAt: new Date().toISOString() },
        { studentId: 'student-3', status: 'Pending' },
        { studentId: 'student-4', status: 'Pending' },
        { studentId: 'student-5', status: 'Submitted', submittedAt: new Date().toISOString() },
        { studentId: 'student-6', status: 'Submitted', submittedAt: new Date().toISOString() },
    ],
    'hw-3': [
        { studentId: 'student-1', status: 'Checked' },
        { studentId: 'student-2', status: 'Checked' },
        { studentId: 'student-3', status: 'Incomplete' },
        { studentId: 'student-4', status: 'Checked' },
        { studentId: 'student-5', status: 'Checked' },
        { studentId: 'student-6', status: 'Checked' },
    ]
};


const rankingsData = [
    { studentId: 'student-4', rank: 1, homeworkCompletion: 100, complaints: 0, activityScore: 98 },
    { studentId: 'student-1', rank: 2, homeworkCompletion: 95, complaints: 0, activityScore: 95 },
    { studentId: 'student-6', rank: 3, homeworkCompletion: 98, complaints: 0, activityScore: 93 },
    { studentId: 'student-2', rank: 4, homeworkCompletion: 92, complaints: 1, activityScore: 90 },
    { studentId: 'student-5', rank: 5, homeworkCompletion: 88, complaints: 1, activityScore: 85 },
    { studentId: 'student-3', rank: 6, homeworkCompletion: 80, complaints: 2, activityScore: 80 },
];

const calendarEventsData = [
    { type: 'homework', title: 'Algebra Chapter 5 due', date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), description: 'Due at the beginning of class.' },
    { type: 'event', title: 'Parent-Teacher Meeting', date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), description: 'Discuss student progress.' },
    { type: 'holiday', title: 'Thanksgiving Break', date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(), description: 'School closed.' },
];

const teacherData = {
    name: 'Sophia Chen',
    email: 'teacher@school.edu',
    role: 'teacher',
}

export default function SeedPage() {
    const firestore = useFirestore();
    const { user } = useUser();
    const { toast } = useToast();
    const [isSeeding, setIsSeeding] = useState(false);

    const getImage = (id: string) => {
        return placeholderImages.placeholderImages.find(img => img.id === id)?.imageUrl || '';
    }

    const handleSeedData = async () => {
        if (!firestore || !user) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "You must be logged in to seed data.",
            });
            return;
        }

        setIsSeeding(true);
        toast({
            title: "Seeding data...",
            description: "This may take a moment.",
        });

        try {
            // Seed Students
            studentsData.forEach(student => {
                const studentRef = doc(firestore, 'students', student.id);
                const studentDocData = { ...student, avatarUrl: getImage(student.id) };
                setDocumentNonBlocking(studentRef, studentDocData, { merge: true });

                const userRef = doc(firestore, 'users', student.id);
                const userDocData = {
                    id: student.id,
                    name: student.name,
                    email: student.email,
                    role: student.role,
                    avatarUrl: getImage(student.id),
                };
                setDocumentNonBlocking(userRef, userDocData, { merge: true });
            });

            // Seed Class
            const classDocData = { ...classData, teacherId: user.uid };
            const classRef = doc(firestore, 'classes', classDocData.id);
            setDocumentNonBlocking(classRef, classDocData, { merge: true });
            
            // Seed Teacher (User)
            const teacherRef = doc(firestore, 'users', user.uid);
            const teacherDocData = { ...teacherData, id: user.uid, avatarUrl: getImage('teacher-avatar') };
            setDocumentNonBlocking(teacherRef, teacherDocData, { merge: true });


            // Seed Complaints
            complaintsData.forEach(complaint => {
                const complaintRef = doc(collection(firestore, 'complaints'));
                const student = studentsData.find(s => s.id === complaint.studentId);
                const complaintDocData = {
                    ...complaint,
                    teacherId: user.uid,
                    studentName: student?.name,
                    avatarUrl: getImage(complaint.studentId),
                };
                addDocumentNonBlocking(complaintRef, complaintDocData);
            });

            // Seed Homework
            homeworkData.forEach(hw => {
                const homeworkRef = doc(firestore, 'homeworks', hw.id);
                const homeworkDocData = {
                    ...hw,
                    assignedBy: user.uid,
                    assignedTo: studentsData.map(s => s.id),
                };
                setDocumentNonBlocking(homeworkRef, homeworkDocData, { merge: true });

                // Seed Submissions for this homework
                const hwSubmissions = submissionsData[hw.id as keyof typeof submissionsData];
                if (hwSubmissions) {
                    hwSubmissions.forEach(sub => {
                        const submissionRef = doc(collection(firestore, `homeworks/${hw.id}/submissions`));
                        const submissionDocData = {
                            ...sub,
                            homeworkId: hw.id,
                        };
                        addDocumentNonBlocking(submissionRef, submissionDocData);
                    })
                }
            });
            
            // Seed Rankings
            rankingsData.forEach(ranking => {
                const rankingRef = doc(collection(firestore, 'rankings'));
                const student = studentsData.find(s => s.id === ranking.studentId);
                const rankingDocData = { ...ranking, studentName: student?.name, avatarUrl: getImage(ranking.studentId) };
                addDocumentNonBlocking(rankingRef, rankingDocData);
            });
            
            // Seed Calendar Events
            calendarEventsData.forEach(event => {
                const eventRef = doc(collection(firestore, 'calendar_events'));
                const eventDocData = { ...event, classId: 'class-101' };
                addDocumentNonBlocking(eventRef, eventDocData);
            });

            toast({
                title: "Success!",
                description: "Sample data has been seeded to your database.",
            });
        } catch (error) {
            console.error("Error seeding data:", error);
            toast({
                variant: "destructive",
                title: "Seeding failed",
                description: "An error occurred while seeding the database.",
            });
        } finally {
            setIsSeeding(false);
        }
    };


    return (
        <div>
            <PageHeader title="Seed Database" description="Populate your Firestore database with sample data." />
            <Card>
                <CardHeader>
                    <CardTitle>Sample Data</CardTitle>
                    <CardDescription>
                        Click the button below to add sample students, classes, homework, and more to your project. 
                        This will help you demonstrate the app's features.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={handleSeedData} disabled={isSeeding}>
                        {isSeeding ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Seeding...
                            </>
                        ) : (
                           "Seed Sample Data"
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
