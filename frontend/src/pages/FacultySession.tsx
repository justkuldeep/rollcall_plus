import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "@/api/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { transmitSimpleWave, SONIC_CONFIG } from "@/lib/sonic";

export default function FacultySession() {
    const { sessionId } = useParams();
    const navigate = useNavigate();
    const [sessionData, setSessionData] = useState<any>(null);
    const [isTransmitting, setIsTransmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const transmissionRequested = useRef(false);
    const audioCtxRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            if (!sessionId) return;
            try {
                const data = await api.attendance.getSession(sessionId);
                setSessionData(data);
                setIsLoading(false);
            } catch (e) {
                toast.error("Failed to load session");
                navigate('/faculty');
            }
        };
        fetchSession();
    }, [sessionId, navigate]);

    const startTransmission = async () => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        transmissionRequested.current = true;
        setIsTransmitting(true);
        toast.info("Starting Wave Emission...");
        transmitLoop();
    };

    const stopTransmission = () => {
        transmissionRequested.current = false;
        setIsTransmitting(false);
    };

    const transmitLoop = async () => {
        if (!transmissionRequested.current || !audioCtxRef.current) return;

        try {
            const duration = await transmitSimpleWave(audioCtxRef.current);
            setTimeout(() => {
                if (transmissionRequested.current) transmitLoop();
            }, (duration * 1000) + 1000); // 1s gap
        } catch (e) {
            console.error("Emission failed", e);
            setIsTransmitting(false);
        }
    };

    if (isLoading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <DashboardLayout role="faculty" userName="Faculty">
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
                <h1 className="text-2xl font-bold mb-4">{sessionData?.subject || "Attendance Session"}</h1>
                <p className="text-gray-600 mb-6 font-mono">Session ID: {sessionId}</p>

                <div className="border-t pt-6 text-center">
                    <div className={`p-10 rounded-lg mb-6 ${isTransmitting ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'} border-2`}>
                        <p className="text-lg font-semibold mb-4">
                            {isTransmitting ? "Status: EMITTING FREQUENCY WAVES" : "Status: PAUSED"}
                        </p>

                        {isTransmitting ? (
                            <Button variant="destructive" onClick={stopTransmission} className="w-full h-16 text-xl">
                                STOP EMISSION
                            </Button>
                        ) : (
                            <Button variant="default" onClick={startTransmission} className="w-full h-16 text-xl">
                                START FREQUENCY EMISSION
                            </Button>
                        )}
                    </div>

                    <p className="text-sm text-gray-500">
                        Frequency: {SONIC_CONFIG.FREQ_0}Hz / {SONIC_CONFIG.FREQ_1}Hz
                        ({SONIC_CONFIG.FREQ_0 > 15000 ? "Ultrasonic" : "Audible"})
                    </p>
                </div>

                <div className="mt-10 pt-6 border-t text-center">
                    <Button variant="outline" onClick={() => navigate('/faculty')}>
                        Back to Dashboard
                    </Button>
                </div>
            </div>
        </DashboardLayout>
    );
}
