import { motion } from "framer-motion";
import { Users, BookOpen, Clock, Activity, TrendingUp, AlertTriangle } from "lucide-react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from "recharts";

const data = [
    { name: "Mon", attendance: 85 },
    { name: "Tue", attendance: 88 },
    { name: "Wed", attendance: 92 },
    { name: "Thu", attendance: 84 },
    { name: "Fri", attendance: 90 },
];

const activityLogs = [
    { id: 1, action: "New student enrolled", user: "Admin", time: "2 hours ago" },
    { id: 2, action: "Class CS101 created", user: "Admin", time: "4 hours ago" },
    { id: 3, action: "System update applied", user: "System", time: "1 day ago" },
    { id: 4, action: "Bulk import successful", user: "Admin", time: "2 days ago" },
];

const StatCard = ({ title, value, icon: Icon, description, trend }: any) => (
    <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-gradient-primary/10 flex items-center justify-center">
                <Icon className="w-4 h-4 text-primary" />
            </div>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                {trend && <span className="text-green-500 flex items-center"><TrendingUp className="w-3 h-3" /> {trend}</span>}
                {description}
            </p>
        </CardContent>
    </Card>
);

export default function AdminDashboard() {
    const user = JSON.parse(sessionStorage.getItem('userProfile') || '{}');

    return (
        <DashboardLayout role="admin" userName={user.displayName || "Admin User"}>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Admin Console</h1>
                    <p className="text-muted-foreground">Manage your institution's resources and users.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard title="Total Students" value="1,284" icon={Users} description="Active Students" trend="+12%" />
                    <StatCard title="Total Teachers" value="84" icon={Users} description="Qualified Staff" trend="+2%" />
                    <StatCard title="Active Classes" value="42" icon={BookOpen} description="Running this semester" />
                    <StatCard title="Avg Attendance" value="88.5%" icon={Clock} description="Overall performance" />
                </div>

                {/* Charts & Activity */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="lg:col-span-4 glass-card">
                        <CardHeader>
                            <CardTitle>Attendance Trends</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="attendance" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
                                    <defs>
                                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                                        </linearGradient>
                                    </defs>
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-3 glass-card">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {activityLogs.map((log) => (
                                    <div key={log.id} className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                            <Activity className="w-4 h-4 text-muted-foreground" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-none">{log.action}</p>
                                            <p className="text-xs text-muted-foreground">by {log.user} • {log.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
