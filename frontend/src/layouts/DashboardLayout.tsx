import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Waves, LogOut, Home, Clock, Settings, Users, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationPanel } from "@/components/NotificationPanel";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "student" | "faculty" | "admin";
  userName: string;
}

const studentLinks = [
  { icon: Home, label: "Dashboard", href: "/student" },
  { icon: Clock, label: "Attendance", href: "/student/attendance" },
  { icon: Award, label: "Performance", href: "/student/performance" },
  { icon: BookOpen, label: "Materials", href: "/student/materials" },
  { icon: Settings, label: "Settings", href: "/student/settings" },
];

const facultyLinks = [
  { icon: Home, label: "Dashboard", href: "/faculty" },
  { icon: Users, label: "Attendance History", href: "/faculty/history" },
  { icon: BookOpen, label: "Marks Entry", href: "/faculty/marks" },
  { icon: Settings, label: "Settings", href: "/faculty/settings" },
];

const adminLinks = [
  { icon: Home, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "User Management", href: "/admin/users" },
  { icon: BookOpen, label: "Academic Info", href: "/admin/academic" },
  { icon: Clock, label: "Audit Logs", href: "/admin/logs" },
  { icon: Award, label: "Reports", href: "/admin/reports" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export function DashboardLayout({ children, role: propRole, userName: propUserName }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // Try to get from session storage if not provided or to ensure persistence
  const sessionData = JSON.parse(sessionStorage.getItem('userProfile') || '{}');
  const role = propRole || sessionData.role || "student";
  const userName = propUserName || sessionData.displayName || "User";

  const links = role === "student" ? studentLinks : role === "admin" ? adminLinks : facultyLinks;

  const handleLogout = () => {
    sessionStorage.removeItem('userProfile');
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden lg:flex flex-col w-64 p-4"
      >
        <div className="glass-card p-4 flex flex-col h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:shadow-glow transition-shadow duration-300">
              <Waves className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">SonicAttend</span>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {links.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                    ? "bg-gradient-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="pt-4 border-t border-border mt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-semibold text-primary-foreground">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{userName}</p>
                  <p className="text-xs text-muted-foreground capitalize">{role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <NotificationPanel />
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6 overflow-auto">
        {/* Mobile Header */}
        <div className="lg:hidden glass-card p-4 mb-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Waves className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">SonicAttend</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <NotificationPanel />
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}
