import { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Download, FileText, FileCode, ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const currentCourses = [
    { id: "CS101", name: "Data Structures", instructor: "Dr. Miller", progress: 65 },
    { id: "CS202", name: "Algorithms", instructor: "Prof. Fey", progress: 40 },
    { id: "CS303", name: "Operating Systems", instructor: "Dr. Alan", progress: 20 },
];

const materials = [
    { id: 1, title: "Linked Lists & Arrays", type: "PDF", size: "1.2 MB", course: "Data Structures", date: "Jan 10, 2024" },
    { id: 2, title: "Binary Search Trees", type: "Slide", size: "4.5 MB", course: "Data Structures", date: "Jan 12, 2024" },
    { id: 3, title: "Big O Notation Guide", type: "Doc", size: "800 KB", course: "Algorithms", date: "Jan 15, 2024" },
    { id: 4, title: "Lab 1: Sorting Algorithms", type: "Code", size: "12 KB", course: "Algorithms", date: "Jan 18, 2024" },
];

export default function CourseMaterials() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <DashboardLayout role="student" userName="Alex Johnson">
            <div className="space-y-8 pb-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Academic Materials</h1>
                        <p className="text-muted-foreground">Access your syllabus, lecture notes, and assignments.</p>
                    </div>
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search materials..."
                            className="pl-10 rounded-xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <Tabs defaultValue="courses" className="space-y-6">
                    <TabsList className="bg-muted/50 p-1 rounded-xl">
                        <TabsTrigger value="courses" className="rounded-lg">My Courses</TabsTrigger>
                        <TabsTrigger value="materials" className="rounded-lg">All Materials</TabsTrigger>
                        <TabsTrigger value="syllabus" className="rounded-lg">Syllabus</TabsTrigger>
                    </TabsList>

                    <TabsContent value="courses" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {currentCourses.map(course => (
                                <Card key={course.id} className="glass-card border-none shadow-lg overflow-hidden group">
                                    <div className="h-2 w-full bg-primary" />
                                    <CardHeader>
                                        <CardTitle className="text-lg">{course.name}</CardTitle>
                                        <CardDescription>{course.id} • {course.instructor}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs font-medium">
                                                <span>Course Completion</span>
                                                <span>{course.progress}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                                <div className="h-full bg-primary" style={{ width: `${course.progress}%` }} />
                                            </div>
                                        </div>
                                        <Button className="w-full rounded-xl group-hover:bg-primary group-hover:text-primary-foreground" variant="outline">
                                            Open Course Space
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="materials">
                        <Card className="glass-card border-none shadow-xl">
                            <CardContent className="p-0">
                                <div className="divide-y">
                                    {materials.map(item => (
                                        <div key={item.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                                                    {item.type === 'PDF' && <FileText className="w-5 h-5" />}
                                                    {item.type === 'Slide' && <BookOpen className="w-5 h-5" />}
                                                    {item.type === 'Code' && <FileCode className="w-5 h-5" />}
                                                    {item.type === 'Doc' && <FileText className="w-5 h-5" />}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold">{item.title}</h4>
                                                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
                                                        {item.course} • {item.size} • Uploaded {item.date}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="icon">
                                                <Download className="w-4 h-4 text-muted-foreground" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="syllabus">
                        <Card className="glass-card border-none shadow-xl">
                            <CardHeader>
                                <CardTitle>Session 2023-2024 Syllabus</CardTitle>
                                <CardDescription>Official curriculum for Computer Science Engineering.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-6 rounded-2xl border-2 border-dashed border-muted flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                                        <BookOpen className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                    <h3 className="font-bold">Semester 4 Curriculum</h3>
                                    <p className="text-sm text-muted-foreground max-w-sm mt-2">
                                        Download the comprehensive syllabus for all courses in the current semester.
                                    </p>
                                    <Button className="mt-6 gap-2 px-8 rounded-xl">
                                        <Download className="w-4 h-4" /> Download PDF (2.4 MB)
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
}
