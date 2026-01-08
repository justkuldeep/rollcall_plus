import { useState } from "react";
import { api } from "@/api/client";
import { toast } from "sonner";
import { Book, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function SubjectManager() {
    const [subjects, setSubjects] = useState<any[]>([]);
    const [newSubject, setNewSubject] = useState({ code: "", name: "", department: "" });

    const handleCreateSubject = async () => {
        try {
            await api.academic.addSubject(newSubject);
            toast.success("Subject added successfully");
            setSubjects([...subjects, newSubject]);
            setNewSubject({ code: "", name: "", department: "" });
        } catch (error) {
            toast.error("Failed to add subject");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Subject Catalog</h2>
                    <p className="text-sm text-muted-foreground">Manage the list of subjects offered.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <Card className="md:col-span-1 glass-card">
                    <CardHeader>
                        <CardTitle className="text-lg">Add New Subject</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Subject Code</Label>
                            <Input placeholder="CS101" value={newSubject.code} onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value.toUpperCase() })} />
                        </div>
                        <div className="space-y-2">
                            <Label>Name</Label>
                            <Input placeholder="Data Structures" value={newSubject.name} onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label>Department</Label>
                            <Input placeholder="Computer Science" value={newSubject.department} onChange={(e) => setNewSubject({ ...newSubject, department: e.target.value })} />
                        </div>
                        <Button className="w-full" onClick={handleCreateSubject}>
                            <Plus className="w-4 h-4 mr-2" /> Add Subject
                        </Button>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 glass-card">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Search className="w-4 h-4 text-muted-foreground" />
                            <Input placeholder="Filter subjects..." className="bg-transparent border-none focus-visible:ring-0" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {subjects.length === 0 ? (
                                <p className="text-center py-10 text-muted-foreground">No subjects added yet.</p>
                            ) : (
                                subjects.map((sub) => (
                                    <div key={sub.code} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                                        <div>
                                            <div className="font-bold">{sub.code}: {sub.name}</div>
                                            <div className="text-xs text-muted-foreground">{sub.department}</div>
                                        </div>
                                        <Book className="w-4 h-4 text-primary opacity-50" />
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
