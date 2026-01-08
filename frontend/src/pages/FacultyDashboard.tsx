import { useState, useEffect } from "react";
import { api } from "@/api/client";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Users, Play, Calendar, BookOpen, Book,
  TrendingUp, Clock, Plus, ArrowRight,
  FileText, CheckCircle, BarChart3, Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate, Link } from "react-router-dom";

// Mock Data
const managedClasses = [
  { id: 1, name: "Data Structures", code: "CS101", students: 120, avgAttendance: "92%", color: "bg-blue-500" },
  { id: 2, name: "Algorithms", code: "CS202", students: 84, avgAttendance: "88%", color: "bg-purple-500" },
  { id: 3, name: "Operating Systems", code: "CS303", students: 96, avgAttendance: "85%", color: "bg-orange-500" },
];

const todaySessions = [
  { id: 1, subject: "Data Structures", time: "10:00 AM", status: "Ready", type: "Lecture" },
  { id: 2, subject: "Algorithms", time: "12:00 PM", status: "Upcoming", type: "Lecture" },
  { id: 3, subject: "Graduate Seminar", time: "04:00 PM", status: "Upcoming", type: "Seminar" },
];

export default function FacultyDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('userProfile') || '{}');

  const [sessionConfig, setSessionConfig] = useState({
    subject: "Data Structures",
    duration: 15,
  });

  const handleStartSession = async () => {
    try {
      const response = await api.attendance.startSession(sessionConfig.subject, sessionConfig.duration);
      toast.success("Attendance Session Initialized");
      navigate(`/faculty/session/${response.sessionId}`);
    } catch (error) {
      toast.error("Failed to start session");
      // Fallback for dev/mock
      navigate(`/faculty/session/mock-session-id`);
    }
  };

  return (
    <DashboardLayout role="faculty" userName={user.displayName || "Faculty Member"}>
      <div className="space-y-8 pb-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold tracking-tight">Faculty Portal</h1>
            <p className="text-muted-foreground mt-1">
              Manage your classes, track attendance, and evaluate performance.
            </p>
          </motion.div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/faculty/history')}>
              <FileText className="w-4 h-4 mr-2" /> View Records
            </Button>
            <Button variant="hero" onClick={() => navigate('/faculty/marks')}>
              <Plus className="w-4 h-4 mr-2" /> Enter Marks
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-card border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Students</p>
                  <h3 className="text-2xl font-bold">250</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-success/10 flex items-center justify-center text-success">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Avg Presence</p>
                  <h3 className="text-2xl font-bold">89%</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-warning/10 flex items-center justify-center text-warning">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Sessions This Month</p>
                  <h3 className="text-2xl font-bold">42</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Grading Progress</p>
                  <h3 className="text-2xl font-bold">75%</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Session Starter Panel */}
          <Card className="lg:col-span-1 glass-card border-none shadow-2xl bg-primary/5 ring-1 ring-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5 text-primary" /> Start Attendance
              </CardTitle>
              <CardDescription>Setup a new ultrasonic session for your current class.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <select
                    className="w-full bg-background border rounded-xl h-11 px-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                    value={sessionConfig.subject}
                    onChange={(e) => setSessionConfig({ ...sessionConfig, subject: e.target.value })}
                  >
                    {managedClasses.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Duration (Minutes)</Label>
                  <Input
                    type="number"
                    value={sessionConfig.duration}
                    onChange={(e) => setSessionConfig({ ...sessionConfig, duration: parseInt(e.target.value) || 15 })}
                    className="h-11 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <Button variant="hero" size="xl" onClick={handleStartSession} className="w-full shadow-lg shadow-primary/30">
                  Initialize Session
                </Button>
                <p className="text-[10px] text-center text-muted-foreground">
                  This will play a unique ultrasonic signal that students' devices will detect in the classroom.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Managed Classes & Today's Schedule */}
          <div className="lg:col-span-2 space-y-8">
            {/* Managed Classes */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" /> Managed Classes
                </h2>
                <Button variant="ghost" size="sm" onClick={() => navigate('/faculty/history')}>View All</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {managedClasses.map((cls, idx) => (
                  <motion.div
                    key={cls.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-card p-5 rounded-2xl border transition-all hover:shadow-lg cursor-pointer group"
                    onClick={() => navigate('/faculty/history')}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-10 h-10 rounded-xl ${cls.color} flex items-center justify-center text-white`}>
                        <Book className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-muted-foreground bg-muted p-1 rounded px-2">{cls.code}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{cls.name}</h3>
                    <p className="text-xs text-muted-foreground">{cls.students} Students Enrolled</p>
                    <div className="mt-4 pt-4 border-t flex justify-between items-center text-sm font-semibold">
                      <span className="text-muted-foreground">Attendance</span>
                      <span className="text-primary">{cls.avgAttendance}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" /> Today's Schedule
              </h2>
              <div className="space-y-3">
                {todaySessions.map((ts, idx) => (
                  <div key={ts.id} className="bg-card/50 border rounded-2xl p-4 flex items-center justify-between transition-hover">
                    <div className="flex items-center gap-4">
                      <div className="text-xs font-bold text-muted-foreground min-w-[70px]">{ts.time}</div>
                      <div className="w-1 h-8 bg-muted rounded-full" />
                      <div>
                        <h4 className="font-bold text-sm">{ts.subject}</h4>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">{ts.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${ts.status === 'Ready' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                        }`}>
                        {ts.status}
                      </span>
                      <Button variant="ghost" size="icon" className="group">
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
