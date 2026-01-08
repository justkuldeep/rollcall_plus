import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Volume2, CheckCircle2, Clock, Calendar,
  BookOpen, Mic, TrendingUp, Award,
  Book, ChevronRight, AlertCircle, Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/StatusBadge";

// Mock Data
const upcomingClasses = [
  { id: 1, subject: "Data Structures", room: "LT-102", time: "10:00 AM", instructor: "Dr. Sarah Miller", status: "Active" },
  { id: 2, subject: "Algorithms", room: "LT-201", time: "12:00 PM", instructor: "Prof. Richard Fey", status: "Upcoming" },
  { id: 3, subject: "Operating Systems", room: "Lab-3", time: "02:00 PM", instructor: "Dr. Alan Turing", status: "Upcoming" },
];

const recentPerformance = [
  { subject: "Data Structures", score: 85, total: 100, label: "Midterm" },
  { subject: "DBMS", score: 92, total: 100, label: "Quiz 2" },
];

export default function StudentDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('userProfile') || '{}');
  const firstName = user.displayName?.split(' ')[0] || "Student";

  return (
    <DashboardLayout role="student" userName={user.displayName || "Student"}>
      <div className="space-y-8 pb-10">
        {/* Welcome & Highlights */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-bold tracking-tight mb-2">Hello, {firstName}!</h1>
            <p className="text-muted-foreground text-lg">
              Your average attendance is <span className="text-primary font-bold">92%</span>. Keep it up!
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3"
          >
            <Button variant="hero" onClick={() => navigate('/student/attendance')} className="h-12 shadow-lg shadow-primary/20">
              <Mic className="w-4 h-4 mr-2" /> Mark Attendance
            </Button>
          </motion.div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card overflow-hidden border-none shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Attendance Goal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-3xl font-bold">92%</span>
                <span className="text-xs text-success bg-success/10 px-2 py-0.5 rounded-full font-medium">Safe</span>
              </div>
              <Progress value={92} className="h-2 bg-muted/50" />
              <p className="text-xs text-muted-foreground">Threshold: 75% • Total Classes: 120</p>
            </CardContent>
          </Card>

          <Card className="glass-card overflow-hidden border-none shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Academic Standing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-3xl font-bold">8.84</span>
                <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full font-medium">Top 5%</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Award className="w-3 h-3 text-warning" />
                Cumulative Grade Point Average
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card overflow-hidden border-none shadow-xl bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-primary uppercase tracking-wider">Active Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">24</div>
              <p className="text-xs text-muted-foreground mt-1">6 Subjects • Spring 2024</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-7 gap-8">
          {/* Upcoming Schedule */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" /> Today's Schedule
              </h2>
              <Button variant="ghost" size="sm" className="text-primary">View Calendar</Button>
            </div>

            <div className="space-y-4">
              {upcomingClasses.map((cls, idx) => (
                <motion.div
                  key={cls.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-5 rounded-2xl border flex items-center justify-between group transition-all hover:shadow-md ${cls.status === 'Active' ? 'bg-primary/5 border-primary/20 ring-1 ring-primary/20' : 'bg-card/50'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cls.status === 'Active' ? 'bg-primary text-primary-foreground animate-pulse' : 'bg-muted text-muted-foreground'
                      }`}>
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{cls.subject}</h3>
                        {cls.status === 'Active' && <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">Live Now</span>}
                      </div>
                      <p className="text-xs text-muted-foreground">{cls.time} • Room {cls.room} • {cls.instructor}</p>
                    </div>
                  </div>
                  {cls.status === 'Active' ? (
                    <Link to="/student/attendance">
                      <Button size="sm" className="rounded-xl shadow-md">Check-In</Button>
                    </Link>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Performance Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" /> Performance
            </h2>

            <div className="space-y-4">
              <Card className="glass-card border-none shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Recent Grades</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentPerformance.map((p, i) => (
                    <div key={i} className="flex justify-between items-center bg-muted/20 p-3 rounded-xl border border-border/40">
                      <div>
                        <div className="text-sm font-medium">{p.subject}</div>
                        <div className="text-[10px] text-muted-foreground font-bold uppercase">{p.label}</div>
                      </div>
                      <div className="text-lg font-bold text-primary">{p.score}/{p.total}</div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full text-xs h-9 rounded-xl" onClick={() => navigate('/student/performance')}>
                    View Performance Analytics
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-card border-none shadow-lg bg-primary/5 border-primary/10">
                <CardContent className="p-4 flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-primary mt-1" />
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-foreground">Course Space</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Access notes and syllabus for your current semester.
                    </p>
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs mt-2" onClick={() => navigate('/student/materials')}>
                      Browse Materials
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-none shadow-lg bg-warning/5 border-warning/10">
                <CardContent className="p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-warning mt-1" />
                  <div>
                    <h4 className="text-sm font-bold text-warning-foreground">Submission Warning</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your Algorithms assignment is due in <span className="font-bold text-foreground">4 hours</span>.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
