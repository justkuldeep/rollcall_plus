import { DashboardLayout } from "@/layouts/DashboardLayout";
import UserManagement from "@/components/admin/UserManagement";

export default function AdminUsers() {
    return (
        <DashboardLayout role="admin" userName="Admin User">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">System Users</h1>
                    <p className="text-muted-foreground">Manage accounts and permissions for the entire institution.</p>
                </div>
                <UserManagement />
            </div>
        </DashboardLayout>
    );
}
