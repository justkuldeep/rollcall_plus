import axios from 'axios';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import app from '../config/firebase'; // Ensure app is exported default

const db = getFirestore(app);

// Base URL for Antigravity Backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const client = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add Auth Token via Firebase SDK
client.interceptors.request.use(async (config) => {
    // 1. Try to get token from Firebase Auth currentUser
    if (auth.currentUser) {
        try {
            const token = await auth.currentUser.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
        } catch (e) {
            console.warn("Failed to get ID token", e);
        }
    } else {
        // Fallback for mock/dev if needed, or just let it fail at backend
        const mockToken = localStorage.getItem('authToken');
        if (mockToken && mockToken === 'mock-token') { // Only send mock if strictly in mock mode
            config.headers.Authorization = `Bearer ${mockToken}`;
        }
    }
    return config;
});

export const api = {
    auth: {
        login: async (email: string, pass: string, role: string) => {
            const userCredential = await signInWithEmailAndPassword(auth, email, pass);

            // Check Role from Firestore
            const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                if (userData.role !== role) {
                    await signOut(auth);
                    throw new Error(`Unauthorized. You are not a ${role}.`);
                }
            } else {
                // Handle legacy/missing doc cases if needed, or strictly deny
                await signOut(auth);
                throw new Error("User profile not found.");
            }

            localStorage.setItem('userRole', role);
            sessionStorage.setItem('userProfile', JSON.stringify({
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: userDoc.data()?.name || userCredential.user.displayName,
                role: role,
                ...(userDoc.data()?.studentId && { studentId: userDoc.data().studentId }),
                ...(userDoc.data()?.teacherId && { teacherId: userDoc.data().teacherId }),
            }));

            return userCredential.user;
        },
        signup: async (email: string, pass: string, name: string, role: string) => {
            const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
            await updateProfile(userCredential.user, { displayName: name });

            // Store Role in Firestore
            await setDoc(doc(db, "users", userCredential.user.uid), {
                email,
                name,
                role,
                createdAt: new Date().toISOString()
            });

            localStorage.setItem('userRole', role);
            sessionStorage.setItem('userProfile', JSON.stringify({
                uid: userCredential.user.uid,
                email: email,
                displayName: name,
                role: role
            }));

            return userCredential.user;
        },
        logout: async () => {
            await signOut(auth);
            localStorage.removeItem('userRole');
            localStorage.removeItem('authToken'); // Cleanup old mock stuff
            sessionStorage.removeItem('userProfile');
        }
    },
    attendance: {
        startSession: async (classId: string, durationMinutes: number) => {
            const response = await client.post('/attendance/start-session', { classId, durationMinutes });
            return response.data;
        },
        markPresent: async (payload: string) => {
            const response = await client.post('/attendance/mark-present', { payload });
            return response.data;
        },
        getByClass: async (classId: string) => {
            const response = await client.get(`/attendance/class/${classId}`);
            return response.data;
        },
        getSession: async (sessionId: string) => {
            const response = await client.get(`/attendance/session/${sessionId}`);
            return response.data;
        },
        getStats: async (sessionId: string) => {
            const response = await client.get(`/attendance/stats/${sessionId}`);
            return response.data;
        },
        stopSession: async () => {
            const response = await client.post('/attendance/stop');
            return response.data;
        },
        // Legacy/Placeholder - keep if needed for compatibility with existing code till refactor
        detect: async (sessionId?: string, token?: string, sonicCode?: string) => {
            const response = await client.post('/attendance/mark-present', { payload: sonicCode });
            return response.data;
        },
    },
    admin: {
        getUsers: async () => {
            const response = await client.get('/admin/users');
            return response.data;
        },
        createUser: async (userData: any) => {
            const response = await client.post('/admin/users', userData);
            return response.data;
        },
        deactivateUser: async (uid: string) => {
            const response = await client.put(`/admin/users/${uid}/deactivate`);
            return response.data;
        },
        bulkImport: async (users: any[]) => {
            const response = await client.post('/admin/users/bulk-import', { users });
            return response.data;
        }
    },
    academic: {
        addSubject: async (subjectData: any) => {
            const response = await client.post('/academic/subjects', subjectData);
            return response.data;
        },
        createClass: async (classData: any) => {
            const response = await client.post('/academic/classes', classData);
            return response.data;
        },
        enrollStudent: async (enrollData: any) => {
            const response = await client.post('/academic/enroll', enrollData);
            return response.data;
        },
        enterMarks: async (marksData: any) => {
            const response = await client.post('/academic/marks', marksData);
            return response.data;
        },
        getMarks: async (classId: string) => {
            const response = await client.get(`/academic/marks/${classId}`);
            return response.data;
        }
    }
};

export default api;
