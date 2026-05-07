import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Easing} from 'remotion';
import {COLORS, FONT} from '../theme';

/**
 * FireScene — 425 frames (relative)
 *   0–30:    fade-in
 *   30–180:  perigo (extintor bloqueado por caixas, material inflamável visível)
 *   180–360: correção (caixas saem, caminho verde para extintor aparece)
 *   360–425: cena corrigida mantida
 */
export const FireScene: React.FC = () => {
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

	const box1Exit = spring({frame: frame - exitStart, fps, config: {damping: 20, stiffness: 62}});
	const box2Exit = spring({frame: frame - (exitStart + 14), fps, config: {damping: 20, stiffness: 62}});
	const box3Exit = spring({frame: frame - (exitStart + 8), fps, config: {damping: 20, stiffness: 62}});

	const pathDraw = interpolate(frame, [285, 365], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});

	const extGlow = interpolate(frame, [305, 375], [0, 1], {
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
	const PATH_LENGTH = 500;

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
					<linearGradient id="floorGradF" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#CFD8DC" />
						<stop offset="100%" stopColor="#B0BEC5" />
					</linearGradient>
					<linearGradient id="extGrad" x1="0" y1="0" x2="1" y2="0">
						<stop offset="0%" stopColor="#C62828" />
						<stop offset="50%" stopColor="#EF5350" />
						<stop offset="100%" stopColor="#C62828" />
					</linearGradient>
					<filter id="extGlowF">
						<feGaussianBlur stdDeviation="14" result="blur" />
						<feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
					</filter>
					<filter id="greenGlowF">
						<feGaussianBlur stdDeviation="12" result="blur" />
						<feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
					</filter>
				</defs>

				{/* Floor */}
				<rect x="0" y="840" width="1920" height="240" fill="url(#floorGradF)" />
				<line x1="0" y1="840" x2="1920" y2="840" stroke="#B0BEC5" strokeWidth="3" />

				{/* Wall panel behind extinguisher */}
				<rect x="680" y="140" width="320" height="700" rx="8" fill="rgba(255,255,255,0.18)" stroke="#CFD8DC" strokeWidth="2" />

				{/* ── Fire Extinguisher ── */}
				{/* Mounting bracket */}
				<rect x="815" y="195" width="50" height="18" rx="5" fill="#78909C" />

				{/* Extinguisher body */}
				<rect x="790" y="208" width="100" height="340" rx="50" fill="url(#extGrad)" filter={extGlow > 0.5 ? 'url(#extGlowF)' : undefined} />
				{/* Shine */}
				<rect x="804" y="230" width="22" height="260" rx="11" fill="rgba(255,255,255,0.22)" />

				{/* Label band */}
				<rect x="790" y="360" width="100" height="80" rx="0" fill="#EF9A9A" opacity="0.8" />
				<text x="840" y="408" textAnchor="middle" fill="#B71C1C" fontSize="18" fontWeight="800" fontFamily={FONT}>EXTINTOR</text>

				{/* Valve/top */}
				<rect x="822" y="192" width="36" height="20" rx="6" fill="#546E7A" />
				{/* Pressure gauge */}
				<circle cx="840" cy="272" r="22" fill="#ECEFF1" stroke="#90A4AE" strokeWidth="3" />
				<circle cx="840" cy="272" r="14" fill="#E8F5E9" />
				<line x1="840" y1="272" x2="840" y2="260" stroke={COLORS.green} strokeWidth="3" strokeLinecap="round" />
				{/* Handle */}
				<rect x="820" y="178" width="40" height="14" rx="5" fill="#37474F" />
				{/* Hose */}
				<path d="M 890 250 Q 960 250 960 300 Q 960 340 920 340" stroke="#37474F" strokeWidth="10" fill="none" strokeLinecap="round" />
				<circle cx="916" cy="344" r="14" fill="#546E7A" />

				{/* Green glow ring when cleared */}
				{extGlow > 0 && (
					<rect
						x={780}
						y={198}
						width={120}
						height={360}
						rx={60}
						fill="none"
						stroke={COLORS.green}
						strokeWidth={4 + extGlow * 4}
						opacity={extGlow * 0.8}
						filter="url(#extGlowF)"
					/>
				)}

				{/* Sign "EXTINTOR DE INCÊNDIO" */}
				<g transform="translate(660, 80)">
					<rect x="0" y="0" width="360" height="70" rx="10" fill="#C62828" />
					<text x="180" y="46" textAnchor="middle" fill="white" fontSize="26" fontWeight="800" fontFamily={FONT} letterSpacing="1">EXTINTOR DE INCÊNDIO</text>
				</g>

				{/* ── Flammable material warning (danger phase) ── */}
				{isDanger && (
					<g opacity={0.7 + pulse * 0.3}>
						{/* Jerrycan shape */}
						<rect x="1100" y="700" width="80" height="110" rx="10" fill="#FFA000" />
						<rect x="1115" y="680" width="50" height="30" rx="6" fill="#FF6F00" />
						<rect x="1130" y="665" width="20" height="20" rx="4" fill="#E65100" />
						{/* Flame icon */}
						<text x="1140" y="765" textAnchor="middle" fontSize="36" fill="#BF360C">🔥</text>
						{/* Warning label */}
						<rect x="1090" y="740" width="100" height="30" rx="4" fill="#FFD54F" />
						<text x="1140" y="761" textAnchor="middle" fill="#E65100" fontSize="16" fontWeight="800" fontFamily={FONT}>INFLAMÁVEL</text>
					</g>
				)}

				{/* ── Boxes blocking extinguisher ── */}
				{/* Box 1 (large, front) */}
				<g transform={`translate(${box1Exit * -700}, ${box1Exit * 200})`} opacity={1 - box1Exit * 0.9}>
					<rect x="750" y="660" width="190" height="175" rx="8" fill={COLORS.cardboard} />
					<rect x="750" y="660" width="190" height="18" rx="4" fill={COLORS.cardboardDark} opacity="0.4" />
					<line x1="845" y1="660" x2="845" y2="835" stroke={COLORS.cardboardDark} strokeWidth="3" opacity="0.3" />
					<text x="845" y="762" textAnchor="middle" fill={COLORS.cardboardDark} fontSize="20" fontWeight="700" fontFamily={FONT} opacity="0.6">FRAGIL</text>
				</g>

				{/* Box 2 (medium, back left) */}
				<g transform={`translate(${box2Exit * -600}, ${box2Exit * 250})`} opacity={1 - box2Exit * 0.9}>
					<rect x="700" y="700" width="140" height="130" rx="8" fill={COLORS.cardboardLight} />
					<rect x="700" y="700" width="140" height="16" rx="4" fill={COLORS.cardboardDark} opacity="0.3" />
					<line x1="770" y1="700" x2="770" y2="830" stroke={COLORS.cardboardDark} strokeWidth="3" opacity="0.25" />
				</g>

				{/* Box 3 (small, stacked) */}
				<g transform={`translate(${box3Exit * -650}, ${box3Exit * 180})`} opacity={1 - box3Exit * 0.9}>
					<rect x="770" y="545" width="120" height="115" rx="8" fill={COLORS.cardboard} />
					<rect x="770" y="545" width="120" height="14" rx="4" fill={COLORS.cardboardDark} opacity="0.35" />
					<line x1="830" y1="545" x2="830" y2="660" stroke={COLORS.cardboardDark} strokeWidth="2" opacity="0.3" />
				</g>

				{/* Danger border around blocked area */}
				{isDanger && (
					<rect
						x={690}
						y={530}
						width={340}
						height={320}
						rx="14"
						fill="none"
						stroke={COLORS.red}
						strokeWidth={3 + pulse * 3}
						strokeDasharray="12 6"
						opacity={0.5 + pulse * 0.5}
					/>
				)}

				{/* ── Green safety path to extinguisher ── */}
				{pathDraw > 0 && (
					<g filter="url(#greenGlowF)" opacity={pathDraw}>
						<path
							d="M 960 820 C 900 810 860 790 840 760 L 840 760 C 840 730 840 680 840 600"
							stroke={COLORS.green}
							strokeWidth="28"
							strokeLinecap="round"
							fill="none"
							opacity="0.22"
						/>
						<path
							d="M 960 820 C 900 810 860 790 840 760 L 840 760 C 840 730 840 680 840 600"
							stroke={COLORS.green}
							strokeWidth="10"
							strokeLinecap="round"
							fill="none"
							strokeDasharray={PATH_LENGTH}
							strokeDashoffset={PATH_LENGTH * (1 - pathDraw)}
						/>
					</g>
				)}

				{/* Check mark */}
				{checkProgress > 0 && (
					<g transform="translate(1100, 320)">
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
