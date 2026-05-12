import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Easing} from 'remotion';
import {COLORS, FONT} from '../theme';

/**
 * PostureScene — 425 frames (relative)
 *   0–30:    fade-in
 *   30–180:  perigo (pessoa curvada, pescoço dobrado para celular)
 *   180–360: correção (postura ereta, tela na altura dos olhos, costas retas)
 *   360–425: cena corrigida mantida
 */
export const PostureScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const opacity = interpolate(frame, [0, 24], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const exitOpacity = interpolate(frame, [398, 425], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const kenBurns = interpolate(frame, [30, 360], [1, 1.04], {
		extrapolateRight: 'clamp',
		easing: Easing.inOut(Easing.ease),
	});

	const exitStart = 180;

	// Posture correction: 0 = bad, 1 = good
	const postureCorrect = spring({
		frame: frame - exitStart,
		fps,
		config: {damping: 22, stiffness: 55},
	});

	// Monitor rises to eye level
	const monitorRise = spring({
		frame: frame - (exitStart + 10),
		fps,
		config: {damping: 20, stiffness: 60},
	});

	// Chair backrest highlight
	const chairGlow = interpolate(frame, [exitStart + 20, exitStart + 60], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const checkProgress = interpolate(frame, [330, 390], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.back(2)),
	});

	const pulse = Math.sin((frame / fps) * Math.PI * 1.6) * 0.5 + 0.5;
	const isDanger = frame < exitStart;

	// Bad posture: head tilted forward/down (-30deg), spine curved
	// Good posture: head upright (0deg), spine straight
	const headTilt = interpolate(postureCorrect, [0, 1], [35, 0]);
	const spineOffset = interpolate(postureCorrect, [0, 1], [60, 0]); // body leans forward
	const neckBend = interpolate(postureCorrect, [0, 1], [25, 0]);

	// Phone: visible and low (danger), rises to eye level and fades (correction)
	const phoneY = interpolate(monitorRise, [0, 1], [0, -180]);
	const phoneOpacityVal = interpolate(monitorRise, [0.7, 1], [1, 0], {extrapolateRight: 'clamp'});

	// Monitor: low (danger), rises (correction)
	const monitorY = interpolate(monitorRise, [0, 1], [0, -160]);

	return (
		<AbsoluteFill style={{opacity: opacity * exitOpacity}}>
			<AbsoluteFill
				style={{
					background: `linear-gradient(160deg, #F5F9FB 0%, #DCE7EC 100%)`,
					transform: `scale(${kenBurns})`,
					transformOrigin: 'center center',
				}}
			/>

			<svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
				<defs>
					<linearGradient id="floorGradP" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#CFD8DC" />
						<stop offset="100%" stopColor="#B0BEC5" />
					</linearGradient>
					<linearGradient id="deskGrad" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#D7CCC8" />
						<stop offset="100%" stopColor="#BCAAA4" />
					</linearGradient>
					<linearGradient id="chairGrad" x1="0" y1="0" x2="1" y2="0">
						<stop offset="0%" stopColor="#455A64" />
						<stop offset="100%" stopColor="#37474F" />
					</linearGradient>
					<filter id="glowP">
						<feGaussianBlur stdDeviation="10" result="blur" />
						<feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
					</filter>
				</defs>

				{/* Floor */}
				<rect x="0" y="860" width="1920" height="220" fill="url(#floorGradP)" />
				<line x1="0" y1="860" x2="1920" y2="860" stroke="#B0BEC5" strokeWidth="3" />

				{/* ── Chair ── */}
				{/* Base (5-star) */}
				{[-72, -36, 0, 36, 72].map((angle, i) => {
					const rad = (angle * Math.PI) / 180;
					return (
						<line
							key={i}
							x1="840"
							y1="840"
							x2={840 + Math.cos(rad) * 110}
							y2={840 + Math.sin(rad) * 50}
							stroke="#546E7A"
							strokeWidth="14"
							strokeLinecap="round"
						/>
					);
				})}
				{/* Center hub */}
				<circle cx="840" cy="840" r="20" fill="#546E7A" />
				{/* Gas cylinder */}
				<rect x="822" y="660" width="36" height="180" rx="10" fill="#607D8B" />

				{/* Seat */}
				<ellipse cx="840" cy="658" rx="130" ry="38" fill="url(#chairGrad)" />
				<ellipse cx="840" cy="652" rx="125" ry="32" fill="#546E7A" opacity="0.5" />

				{/* Backrest */}
				<rect
					x="750"
					y="440"
					width="180"
					height="230"
					rx="20"
					fill={chairGlow > 0.5 ? COLORS.green : '#455A64'}
					filter={chairGlow > 0.5 ? 'url(#glowP)' : undefined}
					opacity={chairGlow > 0.5 ? 0.9 : 1}
				/>
				{/* Lumbar support line */}
				<path
					d="M 758 560 Q 840 540 922 560"
					stroke={chairGlow > 0.5 ? '#fff' : '#607D8B'}
					strokeWidth="6"
					fill="none"
					strokeLinecap="round"
					opacity="0.6"
				/>
				{/* Backrest stem */}
				<rect x="822" y="620" width="36" height="80" rx="8" fill="#37474F" />

				{/* Armrests */}
				<rect x="700" y="590" width="80" height="18" rx="9" fill="#546E7A" />
				<rect x="960" y="590" width="80" height="18" rx="9" fill="#546E7A" />
				<rect x="700" y="590" width="14" height="70" rx="7" fill="#455A64" />
				<rect x="1026" y="590" width="14" height="70" rx="7" fill="#455A64" />

				{/* ── Desk ── */}
				<rect x="480" y="520" width="1000" height="38" rx="10" fill="url(#deskGrad)" />
				<rect x="500" y="554" width="960" height="20" rx="6" fill="#BCAAA4" opacity="0.6" />
				{/* Desk legs */}
				<rect x="530" y="570" width="30" height="290" rx="8" fill="#A1887F" />
				<rect x="1420" y="570" width="30" height="290" rx="8" fill="#A1887F" />

				{/* ── Person seated on chair ── */}
				<g transform={`translate(${spineOffset * 0.8}, 0)`}>
					{/* Torso — straight or leaning */}
					<g transform={`translate(790, 440) rotate(${spineOffset * 0.4}, 50, 120)`}>
						{/* Body */}
						<rect x="10" y="0" width="80" height="130" rx="22" fill="#1565C0" />
						{/* Collar */}
						<rect x="30" y="0" width="40" height="30" rx="10" fill="#1976D2" />

						{/* Neck */}
						<rect x="32" y="-30" width="36" height="40" rx="12" fill="#FFCC80" transform={`rotate(${neckBend}, 50, 10)`} />

						{/* Head */}
						<g transform={`rotate(${headTilt}, 50, -30)`}>
							<circle cx="50" cy="-52" r="48" fill="#FFCC80" />
							{/* Hair */}
							<ellipse cx="50" cy="-90" rx="46" ry="24" fill="#5D4037" />
							{/* Eyes */}
							<circle cx="36" cy="-55" r="5" fill="#263238" />
							<circle cx="64" cy="-55" r="5" fill="#263238" />
							{/* Mouth */}
							{isDanger
								? <path d="M 38 -36 Q 50 -30 62 -36" stroke="#263238" strokeWidth="3" fill="none" strokeLinecap="round" />
								: <path d="M 38 -38 Q 50 -44 62 -38" stroke="#263238" strokeWidth="3" fill="none" strokeLinecap="round" />
							}
						</g>

						{/* Arms */}
						{/* Left arm (rests on desk) */}
						<rect x="-40" y="30" width="55" height="20" rx="10" fill="#FFCC80" />
						{/* Right arm */}
						<rect x="85" y="30" width="55" height="20" rx="10" fill="#FFCC80" />
					</g>

					{/* Legs */}
					<rect x="800" y="568" width="30" height="90" rx="12" fill="#0D47A1" />
					<rect x="860" y="568" width="30" height="90" rx="12" fill="#0D47A1" />
					{/* Feet */}
					<ellipse cx="815" cy="660" rx="28" ry="12" fill="#263238" />
					<ellipse cx="875" cy="660" rx="28" ry="12" fill="#263238" />
				</g>

				{/* ── Phone (danger: on desk low, correction: fades as monitor rises) ── */}
				<g transform={`translate(0, ${phoneY})`} opacity={phoneOpacityVal}>
					<rect x="955" y="460" width="70" height="115" rx="12" fill="#37474F" />
					<rect x="963" y="470" width="54" height="90" rx="6" fill="#80DEEA" />
					<rect x="971" y="482" width="38" height="7" rx="3" fill="rgba(255,255,255,0.7)" />
					<rect x="971" y="495" width="28" height="7" rx="3" fill="rgba(255,255,255,0.5)" />
					<rect x="971" y="508" width="32" height="7" rx="3" fill="rgba(255,255,255,0.5)" />
					<circle cx="990" cy="566" r="7" fill="#546E7A" />
					{/* X cross danger */}
					{isDanger && (
						<g opacity={0.85 + pulse * 0.15}>
							<line x1="942" y1="445" x2="1040" y2="590" stroke={COLORS.red} strokeWidth="6" strokeLinecap="round" />
							<line x1="1040" y1="445" x2="942" y2="590" stroke={COLORS.red} strokeWidth="6" strokeLinecap="round" />
						</g>
					)}
				</g>

				{/* ── Monitor (rises to eye level on correction) ── */}
				{!isDanger && monitorRise > 0.05 && (
					<g transform={`translate(0, ${monitorY})`} opacity={Math.min(monitorRise * 2, 1)}>
						{/* Monitor stand */}
						<rect x="1010" y="540" width="20" height="80" rx="6" fill="#607D8B" />
						<rect x="990" y="615" width="60" height="12" rx="6" fill="#546E7A" />
						{/* Screen */}
						<rect x="930" y="360" width="200" height="180" rx="14" fill="#263238" />
						<rect x="940" y="370" width="180" height="160" rx="8" fill="#80DEEA" />
						{/* Content lines on screen */}
						<rect x="955" y="390" width="130" height="10" rx="4" fill="rgba(255,255,255,0.7)" />
						<rect x="955" y="408" width="100" height="10" rx="4" fill="rgba(255,255,255,0.5)" />
						<rect x="955" y="426" width="115" height="10" rx="4" fill="rgba(255,255,255,0.5)" />
						{/* Green glow border */}
						<rect x="930" y="360" width="200" height="180" rx="14" fill="none" stroke={COLORS.green} strokeWidth="3" opacity={chairGlow} />
					</g>
				)}

				{/* Danger border posture area */}
				{isDanger && (
					<rect
						x={760}
						y={380}
						width={260}
						height={300}
						rx="14"
						fill="none"
						stroke={COLORS.red}
						strokeWidth={3 + pulse * 3}
						strokeDasharray="12 6"
						opacity={0.5 + pulse * 0.5}
					/>
				)}

				{/* Sign "POSTURA CORRETA" */}
				<g transform="translate(600, 90)">
					<rect x="0" y="0" width="360" height="70" rx="10" fill={COLORS.teal} />
					<text x="180" y="46" textAnchor="middle" fill="white" fontSize="26" fontWeight="800" fontFamily={FONT} letterSpacing="1">POSTURA CORRETA</text>
				</g>

				{/* Check mark */}
				{checkProgress > 0 && (
					<g transform="translate(1200, 380)">
						<circle cx="50" cy="50" r="44" fill={COLORS.green} opacity={checkProgress} />
						<path
							d="M 22 50 L 42 70 L 78 30"
							stroke="white"
							strokeWidth="10"
							strokeLinecap="round"
							strokeLinejoin="round"
							fill="none"
							strokeDasharray="80"
							strokeDashoffset={80 * (1 - checkProgress)}
						/>
					</g>
				)}
			</svg>
		</AbsoluteFill>
	);
};
