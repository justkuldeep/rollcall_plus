import { Bell, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const notifications = [
    { id: 1, type: 'info', title: 'Admin Announcement', message: 'The system will be down for maintenance on Sunday.', time: '1 hour ago' },
    { id: 2, type: 'warning', title: 'Low Attendance Alert', message: 'Student Alex Johnson has dropped below 75% attendance.', time: '3 hours ago' },
    { id: 3, type: 'success', title: 'Attendance Marked', message: 'Your attendance for Physics 101 has been confirmed.', time: '1 day ago' },
];

const IconMap = {
    info: <Info className="w-4 h-4 text-blue-500" />,
    warning: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
    success: <CheckCircle className="w-4 h-4 text-green-500" />,
};

export function NotificationPanel() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 glass-card" align="end">
                <div className="p-4 border-b">
                    <h4 className="font-semibold">Notifications</h4>
                </div>
                <div className="max-h-[300px] overflow-auto">
                    {notifications.map((n) => (
                        <div key={n.id} className="p-4 border-b last:border-0 hover:bg-muted/50 transition-colors cursor-pointer">
                            <div className="flex gap-3">
                                <div className="mt-1">{(IconMap as any)[n.type]}</div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">{n.title}</p>
                                    <p className="text-xs text-muted-foreground">{n.message}</p>
                                    <p className="text-[10px] text-muted-foreground">{n.time}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-2 border-t text-center">
                    <Button variant="ghost" size="sm" className="w-full text-xs">View all notifications</Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
