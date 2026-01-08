import { useState } from "react";
import { api } from "@/api/client";
import { toast } from "sonner";
import { Users, Plus, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ClassManager() {
    const [classes, setClasses] = useState<any[]>([]);
    const [newClass, setNewClass] = useState({ classId: "", className: "", subjectCode: "", teacherId: "" });

    const handleCreateClass = async () => {
        try {
            await api.academic.createClass(newClass);
            toast.success("Class created successfully");
            setClasses([...classes, newClass]);
            setNewClass({ classId: "", className: "", subjectCode: "", teacherId: "" });
        } catch (error) {
            toast.error("Failed to create class");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Class & Section Management</h2>
                    <p className="text-sm text-muted-foreground">Assign teachers and subjects to classes.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <Card className="md:col-span-1 glass-card">
                    <CardHeader>
                        <CardTitle className="text-lg">Setup New Class</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Class ID / Section</Label>
                            <Input placeholder="SEC-A-2024" value={newClass.classId} onChange={(e) => setNewClass({ ...newClass, classId: e.target.value.toUpperCase() })} />
                        </div>
                        <div className="space-y-2">
                            <Label>Display Name</Label>
                            <Input placeholder="Computer Science Section A" value={newClass.className} onChange={(e) => setNewClass({ ...newClass, className: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label>Subject Code</Label>
                            <Input placeholder="CS101" value={newClass.subjectCode} onChange={(e) => setNewClass({ ...newClass, subjectCode: e.target.value.toUpperCase() })} />
                        </div>
                        <div className="space-y-2">
                            <Label>Teacher ID</Label>
                            <Input placeholder="TCH-001" value={newClass.teacherId} onChange={(e) => setNewClass({ ...newClass, teacherId: e.target.value })} />
                        </div>
                        <Button className="w-full" onClick={handleCreateClass}>
                            <Plus className="w-4 h-4 mr-2" /> Initialize Class
                        </Button>
                    </CardContent>
                </Card>

                <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
                    {classes.length === 0 ? (
                        <div className="col-span-2 flex flex-col items-center justify-center h-full text-muted-foreground border-2 border-dashed rounded-xl p-10">
                            <GraduationCap className="w-10 h-10 mb-2 opacity-50" />
                            <p>No classes initialized yet.</p>
                        </div>
                    ) : (
                        classes.map((cls) => (
                            <Card key={cls.classId} className="glass-card hover:shadow-md transition-shadow">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-md font-bold">{cls.className}</CardTitle>
                                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{cls.classId}</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="text-sm flex items-center gap-2">
                                        <Users className="w-4 h-4 text-muted-foreground" />
                                        <span>Teacher: {cls.teacherId}</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground italic">Subject: {cls.subjectCode}</div>
                                    <div className="pt-2">
                                        <Button variant="outline" size="sm" className="w-full">Manage Students</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
