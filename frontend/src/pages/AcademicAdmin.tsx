import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubjectManager from "@/components/academic/SubjectManager";
import ClassManager from "@/components/academic/ClassManager";
import EnrollmentManager from "@/components/academic/EnrollmentManager";

export default function AcademicAdmin() {
    return (
        <DashboardLayout role="admin" userName="Admin User">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Academic Administration</h1>
                    <p className="text-muted-foreground">Configure subjects, classes, and enrollment across the institution.</p>
                </div>

                <Tabs defaultValue="subjects" className="w-full">
                    <TabsList className="bg-muted/50 p-1 rounded-xl">
                        <TabsTrigger value="subjects" className="rounded-lg">Subjects</TabsTrigger>
                        <TabsTrigger value="classes" className="rounded-lg">Classes & Sections</TabsTrigger>
                        <TabsTrigger value="enrollment" className="rounded-lg">Enrollment</TabsTrigger>
                    </TabsList>
                    <TabsContent value="subjects" className="mt-6">
                        <SubjectManager />
                    </TabsContent>
                    <TabsContent value="classes" className="mt-6">
                        <ClassManager />
                    </TabsContent>
                    <TabsContent value="enrollment" className="mt-6">
                        <EnrollmentManager />
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
}
