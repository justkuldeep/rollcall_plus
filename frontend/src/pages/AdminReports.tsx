import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { Download, FileText, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const attendanceData = [
    { name: "CS101", value: 92 },
    { name: "MA202", value: 85 },
    { name: "PH103", value: 78 },
    { name: "EE204", value: 88 },
];

const trendData = [
    { week: "W1", attendance: 82 },
    { week: "W2", attendance: 85 },
    { week: "W3", attendance: 88 },
    { week: "W4", attendance: 90 },
];

const COLORS = ["#0ea5e9", "#f59e0b", "#ef4444", "#10b981"];

export default function AdminReports() {
    return (
        <DashboardLayout role="admin" userName="Admin User">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
                        <p className="text-muted-foreground">In-depth insights into attendance trends and academic performance.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
                        <Button variant="hero"><Download className="w-4 h-4 mr-2" /> Export PDF</Button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle>Attendance by Subject</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={attendanceData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {attendanceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle>Monthly Attendance Trend</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trendData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="week" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="attendance" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>Detailed Reports</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl border bg-card/50">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-5 h-5 text-primary" />
                                        <div>
                                            <div className="font-medium">Monthly Attendance Report - December 2024</div>
                                            <div className="text-xs text-muted-foreground">Generated on Jan 05, 2025 • 2.4 MB</div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm">Download</Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
