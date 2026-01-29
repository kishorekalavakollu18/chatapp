import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Falling Cherry Blossom Component
const FallingPetal = ({ delay }) => {
    const randomX = Math.random() * 100; // Random horizontal start
    const duration = 5 + Math.random() * 5; // Long fall duration

    return (
        <motion.div
            initial={{ y: -20, x: `${randomX}vw`, opacity: 0, rotate: 0 }}
            animate={{
                y: '100vh',
                x: `${randomX + (Math.random() * 20 - 10)}vw`, // Drift
                opacity: [0, 1, 0],
                rotate: 360
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear"
            }}
            className="absolute top-0 w-3 h-3 bg-sakura-light/60 rounded-full blur-[1px] pointer-events-none"
            style={{
                borderRadius: '50% 0 50% 0' // Petal shape
            }}
        />
    );
};

const Login = () => {
    const { loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const [petals, setPetals] = useState([]);

    useEffect(() => {
        // Create 20 petals
        const p = Array.from({ length: 20 }).map((_, i) => i * 0.5);
        setPetals(p);
    }, []);

    const handleSuccess = async (credentialResponse) => {
        try {
            await loginWithGoogle(credentialResponse.credential);
            navigate('/');
        } catch (error) {
            console.error('Login Failed', error);
        }
    };

    return (
        <div className="h-dvh w-full flex items-center justify-center relative overflow-hidden bg-dark-900">
            {/* Background Gradient & Pattern handled in CSS, but adding a glow here */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-dark-900/90 z-0"></div>

            {/* The Moon */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-100/10 rounded-full blur-3xl" />

            {/* Falling Petals */}
            {petals.map((delay, i) => <FallingPetal key={i} delay={delay} />)}

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="glass-panel p-10 rounded-3xl w-full max-w-sm text-center z-10 relative shadow-2xl shadow-black/40 flex flex-col items-center"
            >
                {/* Minimal Logo / Kanji */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                >
                    <h1 className="text-6xl font-japanese font-bold text-white mb-2 tracking-widest text-shadow">
                        話す
                    </h1>
                    <h2 className="text-xl text-sakura uppercase tracking-[0.3em] font-light">
                        Hanasu
                    </h2>
                </motion.div>

                <p className="text-gray-400 mb-10 text-sm font-light leading-relaxed">
                    Connect instantly.<br />
                    Speak freely.<br />
                    <span className="text-xs text-gray-500 mt-2 block">Minimal AI Chat Experience</span>
                </p>

                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-sakura to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative">
                        <GoogleLogin
                            onSuccess={handleSuccess}
                            onError={() => console.log('Login Failed')}
                            theme="filled_black"
                            shape="pill"
                            size="large"
                            text="continue_with"
                        />
                    </div>
                </div>

                <div className="mt-12 text-[10px] text-gray-600 uppercase tracking-widest font-mono">
                    Secure · Fast · Minimal
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
