'use client';
import PageHeader from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GoldMedalIcon, SilverMedalIcon, BronzeMedalIcon } from "@/components/icons";
import { useRankings } from "@/hooks/use-rankings";

export default function RankingsPage() {
    const { rankings, isLoading } = useRankings();

    const getMedal = (rank: number) => {
        if (rank === 1) return <GoldMedalIcon className="h-6 w-6" />;
        if (rank === 2) return <SilverMedalIcon className="h-6 w-6" />;
        if (rank === 3) return <BronzeMedalIcon className="h-6 w-6" />;
        return <span className="text-sm font-semibold w-6 text-center">{rank}</span>;
    };

    if (isLoading) {
        return <div>Loading...</div>
    }
    
    const sortedRankings = [...rankings].sort((a, b) => a.rank - b.rank);
    
    return (
        <div>
            <PageHeader title="Rankings" description="Student leaderboard based on performance and activity." />
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-amber-500" />
                        Class Leaderboard
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Rank</TableHead>
                                <TableHead>Student</TableHead>
                                <TableHead className="text-center">Homework %</TableHead>
                                <TableHead className="text-center">Complaints</TableHead>
                                <TableHead className="text-center">Activity Score</TableHead>
                                <TableHead className="text-right font-bold">Total Score</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedRankings.map(student => (
                                <TableRow key={student.studentId} className={student.rank <= 3 ? 'bg-primary/5' : ''}>
                                    <TableCell className="font-bold text-lg">
                                        <div className="flex items-center justify-center h-full">
                                            {getMedal(student.rank)}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={student.avatarUrl} alt={student.studentName} />
                                                <AvatarFallback>{student.studentName.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{student.studentName}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">{student.homeworkCompletion}%</TableCell>
                                    <TableCell className="text-center">{student.complaints}</TableCell>
                                    <TableCell className="text-center">{student.activityScore}</TableCell>
                                    <TableCell className="text-right font-bold text-lg text-primary">{student.rank * 100}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
