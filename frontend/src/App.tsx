import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import FacultySession from "./pages/FacultySession";
import FacultyAttendanceHistory from "./pages/FacultyAttendanceHistory";
import MarksEntry from "./pages/MarksEntry";
import StudentPerformance from "./pages/StudentPerformance";
import StudentAttendance from "./pages/StudentAttendance";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AcademicAdmin from "./pages/AcademicAdmin";
import AdminReports from "./pages/AdminReports";
import AuditLogs from "./pages/AuditLogs";
import SettingsPage from "./pages/SettingsPage";
import CourseMaterials from "./pages/CourseMaterials";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ThemeInitializer() {
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      document.documentElement.classList.add(stored);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    }
  }, []);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeInitializer />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/performance" element={<StudentPerformance />} />
          <Route path="/student/materials" element={<CourseMaterials />} />
          <Route path="/student/settings" element={<SettingsPage role="student" />} />
          <Route path="/student/*" element={<StudentDashboard />} />
          <Route path="/faculty" element={<FacultyDashboard />} />
          <Route path="/faculty/history" element={<FacultyAttendanceHistory />} />
          <Route path="/faculty/marks" element={<MarksEntry />} />
          <Route path="/faculty/settings" element={<SettingsPage role="faculty" />} />
          <Route path="/faculty/session/:sessionId" element={<FacultySession />} />
          <Route path="/faculty/*" element={<FacultyDashboard />} />
          <Route path="/student/attendance" element={<StudentAttendance />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/academic" element={<AcademicAdmin />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/logs" element={<AuditLogs />} />
          <Route path="/admin/settings" element={<SettingsPage role="admin" />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
