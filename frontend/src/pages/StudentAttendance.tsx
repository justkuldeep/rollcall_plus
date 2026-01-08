import { useState, useRef } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Smartphone, Mic, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/api/client";

export default function StudentAttendance() {
    const [status, setStatus] = useState<'idle' | 'listening' | 'success' | 'failed'>('idle');
    const [isLoading, setIsLoading] = useState(false);

    // Mock attendance marking for now
    const markAttendance = async () => {
        setIsLoading(true);
        setStatus('listening');

        // Simulating detection for 5 seconds
        setTimeout(async () => {
            try {
                // In a real scenario, the detected code would be passed here
                await api.attendance.markPresent("MOCK_CODE");
                setStatus('success');
                toast.success("Attendance Marked Successfully!");
            } catch (error) {
                setStatus('failed');
                toast.error("Attendance Failed");
            } finally {
                setIsLoading(false);
            }
        }, 5000);
    };

    return (
        <DashboardLayout role="student" userName="Student">
            <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10 text-center">
                <div className="mb-8">
                    {status === 'success' ? (
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-12 h-12 text-green-600" />
                        </div>
                    ) : (
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Smartphone className="w-10 h-10 text-slate-600" />
                        </div>
                    )}
                    <h1 className="text-2xl font-bold">Sonic Attendance</h1>
                    <p className="text-gray-500 mt-2">
                        {status === 'listening' ? "Detecting sound pulse..." :
                            status === 'success' ? "Attendance recorded" :
                                "Press button to listen for faculty signal"}
                    </p>
                </div>

                <div className="space-y-4">
                    {status === 'idle' || status === 'failed' ? (
                        <Button
                            className="w-full h-16 text-lg gap-3"
                            disabled={isLoading}
                            onClick={markAttendance}
                        >
                            <Mic className="w-6 h-6" />
                            Start Listening
                        </Button>
                    ) : status === 'listening' ? (
                        <div className="h-16 flex items-center justify-center gap-2 text-primary font-medium animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                            Listening for Signal...
                        </div>
                    ) : (
                        <Button
                            variant="outline"
                            className="w-full h-16 text-lg"
                            onClick={() => setStatus('idle')}
                        >
                            Done
                        </Button>
                    )}
                </div>

                <p className="text-xs text-gray-400 mt-10">
                    Make sure your microphone is allowed and you are close to the faculty device.
                </p>
            </div>
        </DashboardLayout>
    );
}
