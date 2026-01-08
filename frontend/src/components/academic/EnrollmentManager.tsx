import { useState, useEffect } from "react";
import { api } from "@/api/client";
import { toast } from "sonner";
import { UserPlus, Search, GraduationCap, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EnrollmentManager() {
    const [classes, setClasses] = useState<any[]>([]);
    const [students, setStudents] = useState<any[]>([]);
    const [selectedClass, setSelectedClass] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState("");
    const [enrolledStudents, setEnrolledStudents] = useState<string[]>([]);

    useEffect(() => {
        // In a real app, we'd fetch these from API
        // Mocking for now to show UI
        setStudents([
            { uid: "s1", name: "Alex Johnson", email: "alex@school.edu" },
            { uid: "s2", name: "Maria Garcia", email: "maria@school.edu" },
            { uid: "s3", name: "Sam Wilson", email: "sam@school.edu" },
        ]);
        setClasses([
            { classId: "CS101", className: "Intro to CS" },
            { classId: "MAT202", className: "Linear Algebra" },
        ]);
    }, []);

    const handleEnroll = async (studentUid: string) => {
        if (!selectedClass) {
            toast.error("Please select a class first");
            return;
        }
        try {
            await api.academic.enrollStudent({ classId: selectedClass, studentUid });
            toast.success("Student enrolled successfully");
            setEnrolledStudents([...enrolledStudents, studentUid]);
        } catch (error) {
            toast.error("Enrollment failed");
        }
    };

    return (
        <div className="space-y-6">
            <Card className="glass-card">
                <CardHeader>
                    <CardTitle className="text-lg">Class Selection</CardTitle>
                </CardHeader>
                <CardContent>
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                        <SelectTrigger className="w-full md:w-[300px]">
                            <SelectValue placeholder="Choose a class to manage" />
                        </SelectTrigger>
                        <SelectContent>
                            {classes.map(cls => (
                                <SelectItem key={cls.classId} value={cls.classId}>{cls.className} ({cls.classId})</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="text-md font-bold">Available Students</CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                            <Search className="w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search students..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="h-8"
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) && !enrolledStudents.includes(s.uid)).map(student => (
                                    <TableRow key={student.uid}>
                                        <TableCell>
                                            <div className="text-sm font-medium">{student.name}</div>
                                            <div className="text-xs text-muted-foreground">{student.email}</div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm" variant="ghost" onClick={() => handleEnroll(student.uid)}>
                                                <UserPlus className="w-4 h-4 text-primary" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="text-md font-bold">Enrolled in {selectedClass || "..."}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {enrolledStudents.length === 0 ? (
                            <div className="text-center py-10 text-muted-foreground italic text-sm">
                                No students enrolled in this class yet.
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {students.filter(s => enrolledStudents.includes(s.uid)).map(s => (
                                    <div key={s.uid} className="flex justify-between items-center p-2 rounded border bg-muted/20">
                                        <span className="text-sm font-medium">{s.name}</span>
                                        <Button size="sm" variant="ghost" className="text-destructive h-7 w-7 p-0">
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
