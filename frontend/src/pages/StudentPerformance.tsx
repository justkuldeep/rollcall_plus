import { useState, useEffect } from "react";
import { api } from "@/api/client";
import { toast } from "sonner";
import { TrendingUp, Award, BookOpen, Clock, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from "recharts";
import { DashboardLayout } from "@/layouts/DashboardLayout";

const marksData = [
    { subject: "Data Structures", marks: 85, avg: 72 },
    { subject: "Algorithms", marks: 78, avg: 65 },
    { subject: "DBMS", marks: 92, avg: 78 },
    { subject: "OS", marks: 88, avg: 74 },
];

const attendanceTrends = [
    { month: "Aug", rate: 95 },
    { month: "Sep", rate: 88 },
    { month: "Oct", rate: 92 },
    { month: "Nov", rate: 85 },
    { month: "Dec", rate: 94 },
];

export default function StudentPerformance() {
    return (
        <DashboardLayout role="student" userName="Alex Johnson">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Academic Performance</h1>
                        <p className="text-muted-foreground">Track your progress, grades, and attendance metrics.</p>
                    </div>
                    <Button variant="hero">
                        <Download className="w-4 h-4 mr-2" /> Download Report Card
                    </Button>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                    <Card className="glass-card">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">CGPA</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-primary">8.84</div>
                            <p className="text-xs text-success flex items-center mt-1">
                                <TrendingUp className="w-3 h-3 mr-1" /> +0.2 from last sem
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="glass-card">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Rank</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">#5 / 120</div>
                            <p className="text-xs text-muted-foreground mt-1">Top 5 percentile</p>
                        </CardContent>
                    </Card>
                    <Card className="glass-card">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Credits</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">24 / 28</div>
                            <p className="text-xs text-muted-foreground mt-1">Current Semester</p>
                        </CardContent>
                    </Card>
                    <Card className="glass-card">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Certificates</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4</div>
                            <p className="text-xs text-muted-foreground mt-1">Earned this year</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="w-5 h-5 text-warning" />
                                Subject-wise Performance
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={marksData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="subject" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="marks" fill="hsl(var(--primary))" name="Your Marks" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="avg" fill="hsl(var(--muted))" name="Class Average" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-success" />
                                Attendance Trend
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={attendanceTrends}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="month" />
                                    <YAxis domain={[60, 100]} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="rate" stroke="hsl(var(--success))" strokeWidth={3} dot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="text-md">Recent Grades</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { name: "Assignment 1 - DS", grade: "A", date: "Jan 10" },
                                    { name: "Midterm - Algorithms", grade: "B+", date: "Jan 05" },
                                    { name: "Project Draft - DBMS", grade: "A-", date: "Jan 02" },
                                ].map((m, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 rounded-lg border bg-card/50">
                                        <div>
                                            <div className="text-sm font-medium">{m.name}</div>
                                            <div className="text-xs text-muted-foreground">{m.date}</div>
                                        </div>
                                        <div className="text-lg font-bold text-primary">{m.grade}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="text-md">Teacher's Remarks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl border bg-primary/5 border-primary/20">
                                    <p className="text-sm italic">"Alex shows great enthusiasm in Data Structures. Keep up the logic building!"</p>
                                    <p className="text-xs text-right mt-2 font-medium">- Prof. Richard Fey</p>
                                </div>
                                <div className="p-4 rounded-xl border bg-muted/20">
                                    <p className="text-sm italic">"Needs to focus more on complexity analysis in Algorithms."</p>
                                    <p className="text-xs text-right mt-2 font-medium">- Dr. Sarah Miller</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
