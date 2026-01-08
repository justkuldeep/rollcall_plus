import { useState, useEffect } from "react";
import { api } from "@/api/client";
import { toast } from "sonner";
import { Save, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DashboardLayout } from "@/layouts/DashboardLayout";

export default function MarksEntry() {
    const [classes, setClasses] = useState<any[]>([]);
    const [selectedClass, setSelectedClass] = useState<string>("");
    const [students, setStudents] = useState<any[]>([]);
    const [marks, setMarks] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch subjects
        setClasses([
            { classId: "Deep Learning", className: "Deep Learning" },
            { classId: "Operating System", className: "Operating System" },
            { classId: "DBMS", className: "DBMS" },
            { classId: "NLP", className: "NLP" },
        ]);
    }, []);

    const fetchMarks = async (classId: string) => {
        setLoading(true);
        try {
            const data = await api.academic.getMarks(classId);
            const initialMarks: any = {};
            data.forEach((m: any) => {
                initialMarks[m.studentUid] = {
                    mst1: m.mst1 || 0,
                    mst2: m.mst2 || 0,
                    name: m.studentName || "Unknown Student",
                    id: m.studentUid
                };
            });
            setStudents(data.map((m: any) => ({ uid: m.studentUid, name: m.studentName, id: m.studentUid })));
            setMarks(initialMarks);
        } catch (error) {
            toast.error("Failed to fetch marks");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedClass) fetchMarks(selectedClass);
    }, [selectedClass]);

    const handleSave = async (studentUid: string) => {
        const sm = marks[studentUid];
        if (!sm) return;
        try {
            await api.academic.enterMarks({
                studentUid,
                classId: selectedClass,
                mst1: sm.mst1,
                mst2: sm.mst2,
                totalMarks: 50
            });
            toast.success(`Marks saved for ${sm.name}`);
        } catch (error) {
            toast.error("Failed to save marks");
        }
    };

    const saveAll = async () => {
        toast.promise(Promise.all(Object.keys(marks).map(uid => handleSave(uid))), {
            loading: 'Saving all marks...',
            success: 'All marks saved successfully!',
            error: 'Error saving some marks',
        });
    };

    return (
        <DashboardLayout role="faculty" userName="Faculty Member">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Academic Grading</h1>
                        <p className="text-muted-foreground">Manage MST 1 and MST 2 performance for your classes.</p>
                    </div>
                    {selectedClass && (
                        <Button onClick={saveAll} size="lg" className="bg-gradient-primary">
                            <Save className="w-4 h-4 mr-2" /> Save All Changes
                        </Button>
                    )}
                </div>

                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Select Subject</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Select value={selectedClass} onValueChange={setSelectedClass}>
                            <SelectTrigger className="w-full md:w-[300px]">
                                <SelectValue placeholder="Chose subject to grade" />
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
                                    <TableHead>Student</TableHead>
                                    <TableHead>Enrollment No.</TableHead>
                                    <TableHead>MST 1 (30)</TableHead>
                                    <TableHead>MST 2 (30)</TableHead>
                                    <TableHead>Best of Two (30)</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow><TableCell colSpan={6} className="text-center py-10">Loading marks roster...</TableCell></TableRow>
                                ) : students.map(s => (
                                    <TableRow key={s.uid}>
                                        <TableCell className="font-medium">{s.name}</TableCell>
                                        <TableCell className="text-xs text-muted-foreground">{s.id}</TableCell>
                                        <TableCell>
                                            <Input
                                                type="number"
                                                className="w-24 h-8"
                                                value={marks[s.uid]?.mst1}
                                                onChange={(e) => setMarks({ ...marks, [s.uid]: { ...marks[s.uid], mst1: parseInt(e.target.value) || 0 } })}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                type="number"
                                                className="w-24 h-8"
                                                value={marks[s.uid]?.mst2}
                                                onChange={(e) => setMarks({ ...marks, [s.uid]: { ...marks[s.uid], mst2: parseInt(e.target.value) || 0 } })}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-bold text-primary">
                                                {Math.max(marks[s.uid]?.mst1 || 0, marks[s.uid]?.mst2 || 0)}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" onClick={() => handleSave(s.uid)}>
                                                <Save className="w-4 h-4 text-primary" />
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

function calculateGrade(marks: number, total: number) {
    if (!total) return "N/A";
    const percent = (marks / total) * 100;
    if (percent >= 90) return 'A+';
    if (percent >= 80) return 'A';
    if (percent >= 70) return 'B';
    if (percent >= 60) return 'C';
    if (percent >= 50) return 'D';
    return 'F';
}
