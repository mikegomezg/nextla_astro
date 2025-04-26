import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Theme configuration                                                */
/* ------------------------------------------------------------------ */
const THEMES = {
    dark: {
        background: "#070D18", // Deep space black
        primary: "#007C5F",    // Jade green
        accent: "#A65A49",     // Terracotta red  
        highlight: "#E6B35A",  // Mayan gold
        secondary: "#3A6BC7",  // Deep blue
        text: "#F0F4F8",       // Ice white
    },
    light: {
        background: "#E5E9F0", // Soft blue-gray
        primary: "#00A176",    // Bright jade
        accent: "#A65A49",     // Terracotta red (consistent)
        highlight: "#E6B35A",  // Mayan gold (consistent)
        secondary: "#3A6BC7",  // Deep blue (consistent)
        text: "#1E293B",       // Deep slate
    },
};

/* ------------------------------------------------------------------ */
/*  Static planet layout                                               */
/* ------------------------------------------------------------------ */
const PLANETS = [
    // These planet paths are directly from cosmic_vector.svg
    {
        path: "M1242.06 429.44C1244.27 430.44 1245.55 432.063 1245.9 434.31C1246.93 440.76 1239.16 443.85 1235.27 438.74C1231.97 433.81 1236.27 427.83 1242.06 429.44Z",
        key: 'accent'
    },
    {
        path: "M1239.81 565.91C1253.77 567.9 1252.43 588.38 1237.72 588.19C1222.88 586.58 1224.99 565.22 1239.81 565.91Z",
        key: 'accent'
    },
    {
        path: "M1187.88 594.13C1181.33 592.81 1178.41 588.79 1179.11 582.07C1179.49 578.49 1181.63 575.9 1185.54 574.3C1191.35 571.99 1197.21 576.45 1198.39 581.86C1199.89 588.8 1194.95 594.48 1187.88 594.13Z",
        key: 'accent'
    },
    {
        path: "M1212.81 609.9C1218.95 609.78 1223.08 612.53 1225.21 618.15C1226.63 621.883 1226.3 625.4 1224.22 628.7C1220.1 635.25 1211.44 636.44 1205.59 631.24C1198.49 623.19 1202.09 611.54 1212.81 609.9Z",
        key: 'accent'
    },
    {
        path: "M1234.81 653.54C1236.25 652.573 1237.83 651.853 1239.56 651.38C1245.67 650.267 1250.36 652.19 1253.63 657.15C1258.51 664.54 1254.54 675.18 1245.76 677.32C1230.9 680.96 1222.07 662.01 1234.81 653.54Z",
        key: 'accent'
    },
];

/* ------------------------------------------------------------------ */
/*  Tiny deterministic PRNG – keeps stars pinned in place              */
/* ------------------------------------------------------------------ */
class RNG {
    constructor(seed = 1) { this.seed = seed; }
    next() { return (Math.sin(this.seed++) + 1) / 2; }
}

const makeStars = (count = 250, seed = 42) => {
    const r = new RNG(seed);

    // Generate base stars across the canvas
    const baseStars = Array.from({ length: count }, () => ({
        cx: r.next() * 1536,
        cy: r.next() * 1024,
        r: r.next() * 2 + 0.5,
        key: r.next() > 0.7 ? 'accent' :
            r.next() > 0.4 ? 'highlight' : 'text',
        twinkleOffset: r.next() * 10,
        twinkleSpeed: 2 + r.next() * 3,
    }));

    // Generate a cluster of stars on the right side
    const clusterStars = Array.from({ length: 150 }, () => ({
        cx: 900 + r.next() * 600,
        cy: 100 + r.next() * 600,
        r: r.next() * 3 + 0.5,
        key: 'accent',
        opacity: r.next() * 0.15 + 0.05,
        twinkleOffset: r.next() * 10,
        twinkleSpeed: 1 + r.next() * 2,
    }));

    return [...baseStars, ...clusterStars];
};

/* ------------------------------------------------------------------ */
/*  SVG paths data from cosmic_vector.svg                              */
/* ------------------------------------------------------------------ */
const SVG_PATHS = {
    // Main nebula paths from cosmic_vector.svg
    NEBULA_PATHS: [
        {
            path: "M571.16 191.3C574.553 191.907 577.78 193.01 580.84 194.61C577.527 196.47 574.35 198.533 571.31 200.8C567.117 203.933 564.333 205.757 562.96 206.27C558.873 207.817 554.567 208.353 550.04 207.88C540.01 206.83 531.43 205.14 522.57 201.99C520.683 201.323 517.81 200.567 513.95 199.72C501.857 197.073 490.713 195.99 480.52 196.47C460.67 197.4 442.4 202.26 424.24 210.53C410.347 216.857 398.207 225.53 387.82 236.55C377.96 247.01 370.51 256.81 365.47 265.95C362.99 270.457 360 276.72 356.5 284.74C350.86 297.65 347.97 311.63 345.72 325.55C344.67 332.02 344.75 340.5 343.52 348L342.06 354.12",
            key: "secondary",
            type: "stroke",
            width: 4,
            linecap: "round",
            opacity: 0.7
        }
    ],
    // Constellation paths from cosmic_vector.svg
    CONSTELLATION_PATHS: [
        {
            path: "M500.37 249.74L498.28 255.77C498.11 256.25 498.36 256.78 498.84 256.96C501.1 257.82 503.427 258.383 505.82 258.65C508.42 258.93 510.28 259.55 513.56 260.44C516.97 261.38 520 262.94 523.56 263.77C524.08 263.89 524.58 264.05 525.07 264.26C533.637 267.88 538.753 269.977 540.42 270.55C549.153 273.55 557.42 272.6 565.22 267.7C568.853 265.42 572.413 263.127 575.9 260.82C581.04 265.513 585.243 270.947 588.51 277.12C581.343 280.973 576.42 283.843 573.74 285.73C563.647 292.85 556.857 297.607 553.37 300C552.99 300.26 552.57 300.46 552.13 300.59L549.05 301.5C548.73 301.59 548.5 301.86 548.45 302.19L548.17 304.15C532.57 288.337 514.113 280.84 492.8 281.66C451.65 283.24 421.57 316.54 423.17 357.51C424.21 384.1 439.91 407.83 463.83 419.38C474.643 424.6 486.363 426.863 498.99 426.17C546.5 423.55 576.5 379.15 564.74 333.95C566.067 333.397 566.87 333.59 567.15 334.53C567.3 335.05 567.97 335.18 568.31 334.76C569.577 333.153 570.973 331.653 572.5 330.26C578.313 324.953 584.65 320.443 591.51 316.73L594.63 315.13C598.81 327.837 600.823 340.71 600.67 353.75C600.603 359.39 600.413 364.96 600.1 370.46C598.087 369.767 595.763 369.627 593.13 370.04C592.62 370.12 592.21 370.52 592.12 371.03C591.167 376.45 590.057 381.8 588.79 387.08C586.563 396.333 582.627 405.397 576.98 414.27C574.367 418.377 572.293 421.283 570.76 422.99C563.733 428.483 558.413 432.397 554.8 434.73C541.873 443.07 528 448.297 513.18 450.41C475.59 455.77 436.13 443.34 417.46 408.06C406.533 387.4 401.383 365.697 402.01 342.95C402.217 335.37 403.24 325.77 405.08 314.15C405.13 313.85 404.98 313.55 404.72 313.4L399.63 310.46C399.01 310.1 398.76 309.34 399.05 308.69C399.83 306.943 400.823 305.14 402.03 303.28C404.67 299.193 408.95 293.387 414.87 285.86C422.21 276.52 431.66 267.78 441.95 262.12C443.79 261.107 446.17 260.203 449.09 259.41C466.03 254.81 483.123 251.587 500.37 249.74Z",
            key: "secondary"
        }
    ],
    // Blue planet paths from cosmic_vector.svg
    BLUE_PLANET: [
        {
            path: "M548.17 304.15L551.34 307.8C556.033 313.887 559.967 320.923 563.14 328.91L564.74 333.95C576.5 379.15 546.5 423.55 498.99 426.17C486.363 426.863 474.643 424.6 463.83 419.38C439.91 407.83 424.21 384.1 423.17 357.51C421.57 316.54 451.65 283.24 492.8 281.66C514.113 280.84 532.57 288.337 548.17 304.15Z",
            key: "primary"
        }
    ],
    // Deep space path from cosmic_vector.svg
    DEEP_SPACE_PATHS: [
        {
            path: "M571.16 191.3C574.553 191.907 577.78 193.01 580.84 194.61C577.527 196.47 574.35 198.533 571.31 200.8C567.117 203.933 564.333 205.757 562.96 206.27C558.873 207.817 554.567 208.353 550.04 207.88C540.01 206.83 531.43 205.14 522.57 201.99C520.683 201.323 517.81 200.567 513.95 199.72C501.857 197.073 490.713 195.99 480.52 196.47C460.67 197.4 442.4 202.26 424.24 210.53C410.347 216.857 398.207 225.53 387.82 236.55C377.96 247.01 370.51 256.81 365.47 265.95C362.99 270.457 360 276.72 356.5 284.74C350.86 297.65 347.97 311.63 345.72 325.55C344.67 332.02 344.75 340.5 343.52 348L342.06 354.12C341.85 354.99 340.8 355.33 340.12 354.75C337.13 352.21 337.07 342.59 337.1 338.95C337.44 320.69 341.05 304.75 347.02 287.27C348.64 282.53 350.45 278.247 352.45 274.42C355.03 269.49 357.57 263.37 360.98 257.84C369.12 244.63 379.87 231.26 392.33 221.36C397.39 217.34 400.983 214.67 403.11 213.35C408.097 210.263 410.6 208.713 410.62 208.7C415.46 205.38 418.86 204.25 424.91 201.12C428.2 199.41 431.56 198.49 434.71 197.14C436.023 196.587 437.373 196.18 438.76 195.92C442.18 195.29 446.93 193.13 451.33 192.08C460.877 189.8 468.447 188.55 474.04 188.33C484.38 187.93 491.367 187.9 495 188.24C502.867 188.98 507.723 189.637 509.57 190.21C512.41 191.097 515.127 191.713 517.72 192.06C522.82 192.73 526.18 193.51 530.79 194.82C537.923 196.84 543.99 198.13 548.99 198.69C553.203 199.157 557.4 198.61 561.58 197.05C564.65 195.9 567.91 193.07 571.16 191.3Z",
            key: "secondary",
            opacity: 0.4
        }
    ]
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function CosmicBackdrop({
    width = '100%',
    height = '100vh',
    seed = 42,
    theme: initialTheme = 'dark',
    onThemeToggle = null,
    fixed = true,
    className = ''
}) {
    // Initialize theme state based on document theme if available
    const getInitialTheme = () => {
        if (typeof document !== 'undefined') {
            const dataTheme = document.documentElement.getAttribute('data-theme');
            if (dataTheme === 'light' || dataTheme === 'dark') {
                return dataTheme;
            }
        }
        return initialTheme;
    };

    const [currentTheme, setCurrentTheme] = useState(getInitialTheme);
    const dark = currentTheme === 'dark';

    // Generate stars based on the current theme
    const stars = useMemo(() => makeStars(250, seed), [seed]);

    // Sync with document theme changes
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    const newTheme = document.documentElement.getAttribute('data-theme');
                    if (newTheme === 'light' || newTheme === 'dark') {
                        setCurrentTheme(newTheme);
                    }
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => {
            observer.disconnect();
        };
    }, []);

    /* ---------- twinkle animation ---------- */
    const [t, setT] = useState(0);
    const raf = useRef(null);
    useEffect(() => {
        const loop = (time) => { setT(time); raf.current = requestAnimationFrame(loop); };
        raf.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf.current);
    }, []);

    /* ---------- theme toggle ---------- */
    const toggleTheme = () => {
        const newTheme = dark ? 'light' : 'dark';
        setCurrentTheme(newTheme);

        // Update document theme if window is available
        if (typeof window !== 'undefined' && window.toggleTheme) {
            window.toggleTheme();
        } else if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', newTheme);
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('theme', newTheme);
            }
        }

        if (onThemeToggle) onThemeToggle(newTheme);
    };

    /* ---------- markup ---------- */
    return (
        <div
            className={`cosmic-bg ${fixed ? 'fixed inset-0 -z-10 pointer-events-none' : ''} ${className}`.trim()}
            style={{ width, maxWidth: '100%', margin: '0 auto' }}
        >
            {/* theme toggle */}
            <button
                aria-label="Toggle theme"
                onClick={toggleTheme}
                className="absolute top-4 right-4 z-100 flex items-center justify-center border-2 border-highlight text-highlight bg-transparent rounded-full w-11 h-11 mb-4 cursor-pointer"
            >
                {dark ? <Sun size={22} /> : <Moon size={22} />}
            </button>

            {/* illustration - using the cosmic_vector.svg content */}
            <svg
                width={width}
                height={height}
                viewBox="0 0 1536 1024"
                preserveAspectRatio="xMidYMid slice"
                className="bg-background transition-all duration-500"
                style={{ borderRadius: fixed ? 0 : 12 }}
            >
                <defs>
                    <filter id="glow"><feGaussianBlur stdDeviation="6" /></filter>
                    <filter id="glow-small"><feGaussianBlur stdDeviation="1.5" /></filter>
                    <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" className="text-primary" stopOpacity="0.2" />
                        <stop offset="50%" className="text-secondary" stopOpacity="0.7" />
                        <stop offset="100%" className="text-accent" stopOpacity="0.2" />
                    </linearGradient>
                </defs>

                {/* Rect background */}
                <rect width="1536" height="1024" className="fill-background" />

                {/* Deep space paths */}
                {SVG_PATHS.DEEP_SPACE_PATHS.map((item, i) => (
                    <path
                        key={`deepspace-${i}`}
                        d={item.path}
                        className={`fill-${item.key}`}
                        opacity={item.opacity || 0.4}
                    />
                ))}

                {/* Planets from SVG file */}
                {PLANETS.map((planet, i) => (
                    <path
                        key={`planet-${i}`}
                        d={planet.path}
                        className={`fill-${planet.key}`}
                    />
                ))}

                {/* Main nebula paths */}
                {SVG_PATHS.NEBULA_PATHS.map((item, i) => (
                    <path
                        key={`nebula-${i}`}
                        d={item.path}
                        className={`stroke-${item.key}`}
                        strokeWidth={item.width || 2}
                        strokeLinecap={item.linecap || "round"}
                        fill="none"
                        opacity={item.opacity || 0.7}
                    />
                ))}

                {/* Orbital elements */}
                <ellipse
                    cx="300" cy="250" rx="200" ry="130"
                    fill="none" className="stroke-primary"
                    strokeWidth="1"
                    strokeDasharray="3 3" opacity="0.35"
                    transform="rotate(-15 300 250)"
                />

                {/* Primary constellations */}
                {SVG_PATHS.CONSTELLATION_PATHS.map((item, i) => (
                    <path
                        key={`constellation-${i}`}
                        d={item.path}
                        className={`fill-${item.key}`}
                        opacity={item.opacity || 1}
                    />
                ))}

                {/* Central blue planet */}
                <ellipse cx="484.67" cy="353.23" rx="75" ry="75" className="fill-secondary" fillOpacity="0.2" filter="url(#glow)" />
                <circle cx="484.67" cy="353.23" r="65" className="fill-primary" fillOpacity="0.2" filter="url(#glow-small)" />
                {SVG_PATHS.BLUE_PLANET.map((item, i) => (
                    <path
                        key={`blue-planet-${i}`}
                        d={item.path}
                        className={`fill-${item.key}`}
                        opacity={0.8}
                    />
                ))}

                {/* Stars - dynamically generated based on theme */}
                {stars.map((star, i) => {
                    const twinkleOpacity = 0.3 + Math.sin((t / 1000) * star.twinkleSpeed + star.twinkleOffset) * 0.2;
                    return (
                        <circle
                            key={`star-${i}`}
                            cx={star.cx}
                            cy={star.cy}
                            r={star.r}
                            className={`fill-${star.key}`}
                            opacity={star.opacity || twinkleOpacity}
                            filter="url(#glow-small)"
                        />
                    );
                })}

                {/* Additional dynamic stars with different animations */}
                {Array.from({ length: 30 }).map((_, i) => {
                    const x = Math.sin(i * 234.5) * 700 + 800;
                    const y = Math.cos(i * 123.4) * 500 + 500;
                    const size = Math.abs(Math.sin(i * 45.67) * 3 + 1);
                    const starColor = i % 3 === 0
                        ? 'accent'
                        : i % 4 === 0
                            ? 'highlight'
                            : 'text';
                    const twinkleOffset = i * 0.5;
                    const twinkleOpacity = 0.3 + Math.sin((t / 1000) * 0.5 + twinkleOffset) * 0.2;

                    return (
                        <circle
                            key={`extra-${i}`}
                            cx={x}
                            cy={y}
                            r={size}
                            className={`fill-${starColor} twinkle`}
                            opacity={twinkleOpacity}
                            filter="url(#glow-small)"
                        />
                    );
                })}
            </svg>

            <style jsx="true">{`
                .twinkle {
                    animation: twinkle 3s infinite ease-in-out alternate;
                }
                @keyframes twinkle {
                    0% { opacity: 0.3; }
                    100% { opacity: 0.8; }
                }
            `}</style>
        </div>
    );
}
