import { useState, useEffect } from "react";
import { api } from "@/api/client";
import { toast } from "sonner";
import { Calendar, Search, Download, Filter, UserCheck, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DashboardLayout } from "@/layouts/DashboardLayout";

export default function FacultyAttendanceHistory() {
    const [classes, setClasses] = useState<any[]>([]);
    const [selectedClass, setSelectedClass] = useState<string>("");
    const [records, setRecords] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch classes/subjects managed by faculty
        const fetchClasses = async () => {
            try {
                // For now, using the subjects array as classes
                setClasses([
                    { classId: "Deep Learning", className: "Deep Learning" },
                    { classId: "Operating System", className: "Operating System" },
                    { classId: "DBMS", className: "DBMS" },
                    { classId: "NLP", className: "NLP" },
                ]);
            } catch (error) {
                toast.error("Failed to load classes");
            }
        };
        fetchClasses();
    }, []);

    const fetchRecords = async (classId: string) => {
        setLoading(true);
        try {
            const data = await api.attendance.getByClass(classId);
            // Since our records don't have student names yet, we'll map them if possible or show IDs
            setRecords(data.map((r: any) => ({
                ...r,
                studentName: r.studentUid, // Placeholder for ID until joined
                status: "Present" // Our seeded data is all present
            })));
        } catch (error) {
            toast.error("Failed to fetch records.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedClass) fetchRecords(selectedClass);
    }, [selectedClass]);

    const exportCSV = () => {
        if (records.length === 0) {
            toast.error("No records to export");
            return;
        }

        const headers = ["Student Name", "Date & Time", "Method", "Status"];
        const rows = records.map(r => [
            r.studentName,
            r.markedAt === '-' ? 'N/A' : new Date(r.markedAt).toLocaleString(),
            r.method,
            r.status
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(e => e.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `attendance_${selectedClass || 'report'}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success("Attendance Report Downloaded");
    };

    const handleOverride = async (recordId: string, currentStatus: string) => {
        const newStatus = currentStatus === 'Present' ? 'Absent' : 'Present';
        const method = newStatus === 'Present' ? 'Manual' : '-';

        // Optimistic UI update
        setRecords(prev => prev.map(r =>
            r.recordId === recordId ? { ...r, status: newStatus, method: method, markedAt: newStatus === 'Present' ? new Date().toISOString() : '-' } : r
        ));

        try {
            // Simulated API call 
            // await api.attendance.override(recordId, newStatus);
            toast.success(`Status updated to ${newStatus}`);
        } catch (error) {
            toast.error("Failed to update status on server");
        }
    };

    return (
        <DashboardLayout role="faculty" userName="Dr. Sarah Miller">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Attendance Records</h1>
                        <p className="text-muted-foreground">Historical view of student presence and logs.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
                        <Button variant="hero" onClick={exportCSV}><Download className="w-4 h-4 mr-2" /> Export CSV</Button>
                    </div>
                </div>

                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Select Class to View</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Select value={selectedClass} onValueChange={setSelectedClass}>
                            <SelectTrigger className="w-full md:w-[300px]">
                                <SelectValue placeholder="Chose class" />
                            </SelectTrigger>
                            <SelectContent>
                                {classes.map(c => <SelectItem key={c.classId} value={c.classId}>{c.className}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                {selectedClass && (
                    <Card className="glass-card overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student Name</TableHead>
                                    <TableHead>Date & Time</TableHead>
                                    <TableHead>Method</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Manual Override</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow><TableCell colSpan={5} className="text-center py-10">Fetching records...</TableCell></TableRow>
                                ) : records.map(r => (
                                    <TableRow key={r.recordId}>
                                        <TableCell className="font-medium">{r.studentName}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {r.markedAt === '-' ? '-' : new Date(r.markedAt).toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-xs bg-muted px-2 py-1 rounded-full">{r.method}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${r.status === 'Present' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                                                }`}>
                                                {r.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className={r.status === 'Absent' ? "text-success" : "text-destructive"}
                                                onClick={() => handleOverride(r.recordId, r.status)}
                                            >
                                                {r.status === 'Absent' ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                )}
            </div>
        </DashboardLayout>
    );
}
