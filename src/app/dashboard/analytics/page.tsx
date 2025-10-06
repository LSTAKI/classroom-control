import PageHeader from "@/components/page-header";
import StudentPerformanceChart from "@/components/charts/student-performance-chart";
import HomeworkCompletionChart from "@/components/charts/homework-completion-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_CLASS, MOCK_STUDENTS } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export default function AnalyticsPage() {
    return (
        <div>
            <PageHeader title="Analytics" description="Deep dive into class and student performance data." />
            <div className="grid gap-8 mt-6">
                <div className="grid md:grid-cols-2 gap-8">
                    <StudentPerformanceChart />
                    <HomeworkCompletionChart />
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Student Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {MOCK_STUDENTS.map(student => {
                                const avgScore = student.marks.reduce((acc, m) => acc + m.score, 0) / student.marks.length;
                                return (
                                <div key={student.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted">
                                    <Avatar>
                                        <AvatarImage src={student.avatarUrl} alt={student.name} />
                                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="font-semibold">{student.name}</p>
                                        <p className="text-sm text-muted-foreground">{student.email}</p>
                                    </div>
                                    <div className="w-1/3">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>Performance</span>
                                            <span className="font-semibold">{avgScore.toFixed(1)}%</span>
                                        </div>
                                        <Progress value={avgScore} className="h-2" />
                                    </div>
                                </div>
                            )})}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
