/**
 * Simple Sonic Utility
 * Focus: Basic Frequency Emission
 */

// Toggle this for 18.5kHz (Production) or 5kHz (Audible Demo)
const IS_PRODUCTION = true;

export const SONIC_CONFIG = {
    FREQ_0: 19000,
    FREQ_1: 20000,
    BIT_DURATION: 0.2, // Slower for stability
    VOLUME: 0.5,
};

/**
 * Basic FSK Wave Emission (No data, just 1010 pattern)
 */
export const transmitSimpleWave = async (audioCtx: AudioContext) => {
    if (audioCtx.state === "suspended") {
        await audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    gain.gain.value = SONIC_CONFIG.VOLUME;

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const pattern = "10101010"; // Simple alternating pulse
    let t = audioCtx.currentTime;

    for (const bit of pattern) {
        osc.frequency.setValueAtTime(
            bit === "1" ? SONIC_CONFIG.FREQ_1 : SONIC_CONFIG.FREQ_0,
            t
        );
        t += SONIC_CONFIG.BIT_DURATION;
    }

    osc.start();
    osc.stop(t);

    console.log(`[Sonic] Emitting simple wave pattern...`);
    return t - audioCtx.currentTime;
};

/**
 * Simple FSK (Minimal logic)
 */
export const transmitFSK = async (payload: string, audioCtx: AudioContext) => {
    if (audioCtx.state === "suspended") {
        await audioCtx.resume();
    }

    // Direct binary conversion (No encryption, no headers)
    const binary = payload
        .split("")
        .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
        .join("");

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    gain.gain.value = SONIC_CONFIG.VOLUME;

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    let t = audioCtx.currentTime;

    for (const bit of binary) {
        osc.frequency.setValueAtTime(
            bit === "1" ? SONIC_CONFIG.FREQ_1 : SONIC_CONFIG.FREQ_0,
            t
        );
        t += SONIC_CONFIG.BIT_DURATION;
    }

    osc.start();
    osc.stop(t);

    console.log(`[Sonic] Transmitting: ${payload}`);
    return t - audioCtx.currentTime;
};

export const createFSKDecoder = (sampleRate: number) => {
    // Basic FFT logic (placeholder for now)
    return {
        process: (fftData: Uint8Array) => null
    };
};

export const initSonic = () => { console.log("[Sonic] Ready"); };

export default {
    SONIC_CONFIG,
    transmitSimpleWave,
    transmitFSK,
    createFSKDecoder,
    initSonic
};
