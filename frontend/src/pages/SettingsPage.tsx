import { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Lock, User, Eye, ShieldCheck, Palette } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage({ role = "student" }: { role?: string }) {
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success("Settings updated successfully!");
        }, 1000);
    };

    return (
        <DashboardLayout role={role as any} userName="User Name">
            <div className="max-w-4xl mx-auto space-y-6 pb-10">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground">Manage your account preferences and system configurations.</p>
                </div>

                <div className="grid gap-6">
                    {/* Profile Section */}
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5 text-primary" />
                                Profile Information
                            </CardTitle>
                            <CardDescription>Update your personal details and public profile.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email Address</Label>
                                    <Input placeholder="john@example.com" disabled />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Bio</Label>
                                <Input placeholder="A brief description about yourself" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security Section */}
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lock className="w-5 h-5 text-warning" />
                                Security
                            </CardTitle>
                            <CardDescription>Secure your account with multi-factor authentication.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Two-Factor Authentication</Label>
                                    <p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Session Timeout</Label>
                                    <p className="text-xs text-muted-foreground">Automatically log out after inactivity.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <Button variant="outline" size="sm">Change Password</Button>
                        </CardContent>
                    </Card>

                    {/* Notifications Section */}
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="w-5 h-5 text-success" />
                                Notifications
                            </CardTitle>
                            <CardDescription>Choose how you want to be notified.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Attendance Alerts</Label>
                                    <p className="text-xs text-muted-foreground">Get notified when attendance sessions start.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Grade Warnings</Label>
                                    <p className="text-xs text-muted-foreground">Get notified when marks are below threshold.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>

                    {role === 'admin' && (
                        <Card className="glass-card border-primary/20 bg-primary/5">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-primary" />
                                    System Administration
                                </CardTitle>
                                <CardDescription>Global configuration for the entire ERP system.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Maintenance Mode</Label>
                                        <p className="text-xs text-muted-foreground">Disable student access for maintenance.</p>
                                    </div>
                                    <Switch />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>New Enrollments</Label>
                                        <p className="text-xs text-muted-foreground">Allow new student signups.</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <div className="flex justify-end gap-3">
                        <Button variant="ghost">Cancel</Button>
                        <Button onClick={handleSave} disabled={loading} className="bg-gradient-primary px-8">
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
