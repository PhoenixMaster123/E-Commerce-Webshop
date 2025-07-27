import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { MoveDirection, type IOptions, type RecursivePartial } from '@tsparticles/engine';

const NoPage = () => {
    const [init, setInit] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX - left - width / 2) / (width / 2);
        const y = (clientY - top - height / 2) / (height / 2);
        setMousePos({ x, y });
    };

    const handleMouseLeave = () => {
        setMousePos({ x: 0, y: 0 });
    };

    const particleOptions = useCallback<() => RecursivePartial<IOptions>>(() => ({
        background: {
            color: { value: '#0d1117' },
        },
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: 'repulse',
                },
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: { value: '#aaa' },
            links: {
                color: '#888',
                distance: 140,
                enable: true,
                opacity: 0.04,
                width: 1,
            },
            move: {
                direction: MoveDirection.none,
                enable: true,
                outModes: { default: 'out' },
                speed: 0.3,
                random: false,
                straight: false,
            },
            number: {
                density: { enable: true, area: 1100 },
                value: 45,
            },
            opacity: { value: 0.1 },
            shape: { type: 'circle' },
            size: { value: { min: 1, max: 2 } },
        },
        detectRetina: true,
    }), []);

    const transformStyle: React.CSSProperties = {
        transform: `perspective(1000px) rotateY(${mousePos.x * 10}deg) rotateX(${-mousePos.y * 10}deg) scale3d(1, 1, 1)`,
        transition: 'transform 0.2s ease-out',
    };

    if (!init) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-950 text-gray-400">
                Loading cosmic anomaly...
            </div>
        );
    }

    return (
        <div
            className="relative flex items-center justify-center min-h-screen bg-gray-950 overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <Particles
                id="tsparticles"
                options={particleOptions()}
                className="absolute inset-0 z-0 pointer-events-none"
            />

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 w-[30rem] h-[30rem] bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-500 rounded-full blur-3xl opacity-25 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-10 right-10 w-[20rem] h-[20rem] bg-gradient-to-tr from-cyan-400 via-blue-500 to-teal-500 rounded-full blur-3xl opacity-20"></div>
            </div>

            <div
                style={transformStyle}
                className="relative z-10 flex flex-col items-center text-center p-10 bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 max-w-xl mx-auto transform-gpu overflow-hidden"
            >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

                <div className="relative z-10">
                    <h1 className="relative text-[10rem] sm:text-[14rem] lg:text-[16rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-400 to-orange-600 animate-pulse drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                        404
                    </h1>
                    <h1
                        aria-hidden="true"
                        className="absolute top-0 left-0 text-[10rem] sm:text-[14rem] lg:text-[16rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 animate-text-glitch opacity-30 pointer-events-none"
                        style={{ WebkitTextStroke: '2px rgba(255,255,255,0.15)' }}
                    >
                        404
                    </h1>
                </div>

                <h2 className="mt-4 text-3xl sm:text-5xl font-bold text-white tracking-wide">
                    Oops! This page vanished.
                </h2>
                <p className="mt-4 text-base sm:text-lg text-gray-300/90 leading-relaxed max-w-md">
                    It looks like you crossed into a digital void. This page doesn't exist in this timeline.
                </p>

                <Link
                    to="/"
                    className="group relative mt-10 inline-flex items-center justify-center px-8 py-3 font-semibold text-white bg-gradient-to-br from-indigo-600 to-purple-700 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <FaArrowLeft className="mr-2 text-lg group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="relative z-10">Back to Homepage</span>
                </Link>
            </div>
        </div>
    );
};

export default NoPage;