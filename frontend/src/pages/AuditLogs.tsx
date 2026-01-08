import { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Shield, Activity, UserCog } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mockLogs = [
    { id: 1, action: "User Deactivated", user: "Admin", target: "STU-009", time: "2024-01-16 10:45 AM", severity: "high" },
    { id: 2, action: "Class Created", user: "Admin", target: "CS-101", time: "2024-01-16 09:30 AM", severity: "medium" },
    { id: 3, action: "Settings Updated", user: "Dr. Miller", target: "System", time: "2024-01-15 04:20 PM", severity: "low" },
    { id: 4, action: "Bulk Import", user: "Admin", target: "50 Students", time: "2024-01-15 11:15 AM", severity: "high" },
    { id: 5, action: "Login Failed", user: "Unknown", target: "admin@school.edu", time: "2024-01-14 11:59 PM", severity: "warning" },
];

export default function AuditLogs() {
    return (
        <DashboardLayout role="admin" userName="System Administrator">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">System Audit logs</h1>
                        <p className="text-muted-foreground">Comprehensive tracking of all administrative and security actions.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Filter Logs</Button>
                        <Button variant="hero"><Shield className="w-4 h-4 mr-2" /> Export Logs</Button>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="glass-card">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase flex items-center gap-2">
                                <Activity className="w-4 h-4" /> System Health
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-success">Optimal</div>
                            <p className="text-xs text-muted-foreground">All services operational</p>
                        </CardContent>
                    </Card>
                    <Card className="glass-card">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase flex items-center gap-2">
                                <UserCog className="w-4 h-4" /> Admin Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">124</div>
                            <p className="text-xs text-muted-foreground">In the last 24 hours</p>
                        </CardContent>
                    </Card>
                    <Card className="glass-card border-destructive/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase flex items-center gap-2 text-destructive">
                                <Shield className="w-4 h-4" /> Security Alerts
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-destructive">3</div>
                            <p className="text-xs text-muted-foreground">Requires attention</p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="glass-card overflow-hidden">
                    <CardHeader className="pb-0 border-b">
                        <div className="flex items-center gap-4 pb-4">
                            <Search className="w-4 h-4 text-muted-foreground" />
                            <Input placeholder="Search logs by action, user or target..." className="bg-transparent border-none focus-visible:ring-0" />
                        </div>
                    </CardHeader>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Action</TableHead>
                                <TableHead>Performed By</TableHead>
                                <TableHead>Target</TableHead>
                                <TableHead>Timestamp</TableHead>
                                <TableHead>Severity</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockLogs.map((log) => (
                                <TableRow key={log.id} className="hover:bg-muted/30">
                                    <TableCell className="font-medium">{log.action}</TableCell>
                                    <TableCell className="text-sm">{log.user}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{log.target}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{log.time}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${log.severity === 'high' ? 'bg-destructive/10 text-destructive' :
                                                log.severity === 'warning' ? 'bg-orange-500/10 text-orange-500' :
                                                    log.severity === 'medium' ? 'bg-warning/10 text-warning' :
                                                        'bg-primary/10 text-primary'
                                            }`}>
                                            {log.severity}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </DashboardLayout>
    );
}
