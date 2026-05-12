import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Easing} from 'remotion';
import {COLORS, FONT} from '../theme';

/**
 * StairsScene — 425 frames (relative)
 *   0–30:    fade-in
 *   30–180:  perigo (figura com celular, sem corrimão)
 *   180–360: correção (celular sai, corrimão ganha glow verde, caminho aparece)
 *   360–425: cena corrigida mantida
 */
export const StairsScene: React.FC = () => {
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

	// Phone slides out
	const exitStart = 180;
	const phoneExit = spring({
		frame: frame - exitStart,
		fps,
		config: {damping: 20, stiffness: 62},
	});

	// Arm reaches corrimão
	const armReach = spring({
		frame: frame - (exitStart + 10),
		fps,
		config: {damping: 22, stiffness: 68},
	});

	// Handrail glow
	const railGlow = interpolate(frame, [exitStart + 20, exitStart + 60], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Path draw (seta de caminho seguro subindo a escada)
	const pathDraw = interpolate(frame, [285, 365], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});

	// Check mark
	const checkProgress = interpolate(frame, [330, 390], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.back(2)),
	});

	// Pulse for danger phase
	const pulse = Math.sin((frame / fps) * Math.PI * 1.6) * 0.5 + 0.5;

	const isDanger = frame < exitStart;

	// Phone position (slides right on correction)
	const phoneX = phoneExit * 500;
	const phoneOpacity = interpolate(phoneExit, [0, 0.7], [1, 0], {
		extrapolateRight: 'clamp',
	});

	// Arm angle (from holding phone to reaching rail)
	const armAngle = interpolate(armReach, [0, 1], [0, -60]);

	// Rail glow color
	const railColor = railGlow > 0.1 ? COLORS.green : '#78909C';
	const railStrokeWidth = 14 + railGlow * 4;

	const PATH_LENGTH = 680;

	return (
		<AbsoluteFill style={{opacity: opacity * exitOpacity}}>
			{/* Background */}
			<AbsoluteFill
				style={{
					background: `linear-gradient(160deg, #F5F9FB 0%, #DCE7EC 100%)`,
					transform: `scale(${kenBurns})`,
					transformOrigin: 'center center',
				}}
			/>

			<svg
				width="1920"
				height="1080"
				viewBox="0 0 1920 1080"
				style={{position: 'absolute', inset: 0}}
			>
				{/* ── Floor ── */}
				<defs>
					<linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#CFD8DC" />
						<stop offset="100%" stopColor="#B0BEC5" />
					</linearGradient>
					<linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#F5F9FB" />
						<stop offset="100%" stopColor="#DCE7EC" />
					</linearGradient>
					<linearGradient id="stepGrad" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#ECEFF1" />
						<stop offset="100%" stopColor="#CFD8DC" />
					</linearGradient>
					<linearGradient id="riserGrad" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#B0BEC5" />
						<stop offset="100%" stopColor="#90A4AE" />
					</linearGradient>
					<filter id="railGlow">
						<feGaussianBlur stdDeviation="8" result="blur" />
						<feMerge>
							<feMergeNode in="blur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
					<filter id="greenGlow">
						<feGaussianBlur stdDeviation="12" result="blur" />
						<feMerge>
							<feMergeNode in="blur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>

				{/* Floor */}
				<rect x="0" y="880" width="1920" height="200" fill="url(#floorGrad)" />
				{/* Floor highlight line */}
				<line x1="0" y1="880" x2="1920" y2="880" stroke="#B0BEC5" strokeWidth="3" />

				{/* ── Staircase body (profile polygon) ── */}
				{/* 5 steps, each tread W=160, riser H=80, going left and up */}
				{/* Baseline at y=880, bottom-right at x=1150 */}
				{/*
					Step 1 tread: x=990..1150, y=800
					Step 2 tread: x=830..990,  y=720
					Step 3 tread: x=670..830,  y=640
					Step 4 tread: x=510..670,  y=560
					Step 5 tread: x=350..510,  y=480  (top landing)
				*/}

				{/* Staircase fill */}
				<polygon
					points="
						1150,880
						990,880  990,800
						830,800  830,720
						670,720  670,640
						510,640  510,560
						350,560  350,480
						350,880
					"
					fill="#B0BEC5"
					opacity="0.5"
				/>

				{/* Step treads (top surface) */}
				{[
					{x: 990, y: 800, w: 160},
					{x: 830, y: 720, w: 160},
					{x: 670, y: 640, w: 160},
					{x: 510, y: 560, w: 160},
					{x: 350, y: 480, w: 160},
				].map((step, i) => (
					<g key={i}>
						<rect
							x={step.x}
							y={step.y}
							width={step.w}
							height={12}
							fill="url(#stepGrad)"
							rx="2"
						/>
						{/* Tread edge shadow */}
						<rect
							x={step.x}
							y={step.y + 10}
							width={step.w}
							height={4}
							fill="#90A4AE"
							opacity="0.6"
						/>
					</g>
				))}

				{/* Step risers (front vertical face) */}
				{[
					{x: 990, y: 800, h: 80},
					{x: 830, y: 720, h: 80},
					{x: 670, y: 640, h: 80},
					{x: 510, y: 560, h: 80},
					{x: 350, y: 480, h: 80},
				].map((riser, i) => (
					<rect
						key={i}
						x={riser.x}
						y={riser.y}
						width={8}
						height={riser.h}
						fill="url(#riserGrad)"
						rx="1"
					/>
				))}

				{/* ── Handrail ── */}
				{/* Left side handrail posts */}
				{[
					{x: 990, y: 800},
					{x: 830, y: 720},
					{x: 670, y: 640},
					{x: 510, y: 560},
					{x: 350, y: 480},
				].map((post, i) => (
					<line
						key={i}
						x1={post.x + 6}
						y1={post.y}
						x2={post.x + 6}
						y2={post.y - 110}
						stroke={railGlow > 0.1 ? COLORS.green : '#78909C'}
						strokeWidth="6"
						strokeLinecap="round"
						opacity={railGlow > 0.1 ? 0.7 : 1}
					/>
				))}

				{/* Main handrail bar */}
				<path
					d="M 996 690 L 836 610 L 676 530 L 516 450 L 356 370"
					stroke={railColor}
					strokeWidth={railStrokeWidth}
					strokeLinecap="round"
					fill="none"
					filter={railGlow > 0.5 ? 'url(#railGlow)' : undefined}
				/>
				{/* Handrail highlight */}
				<path
					d="M 996 690 L 836 610 L 676 530 L 516 450 L 356 370"
					stroke="rgba(255,255,255,0.4)"
					strokeWidth="4"
					strokeLinecap="round"
					fill="none"
				/>

				{/* ── Sign "USE O CORRIMÃO" ── */}
				<g transform="translate(580, 280)">
					<rect x="0" y="0" width="340" height="70" rx="10" fill={COLORS.teal} />
					<text
						x="170"
						y="46"
						textAnchor="middle"
						fill="white"
						fontSize="28"
						fontWeight="800"
						fontFamily={FONT}
						letterSpacing="2"
					>
						USE O CORRIMÃO
					</text>
				</g>

				{/* ── Green safety path (stroke draw animation) ── */}
				{pathDraw > 0 && (
					<g filter="url(#greenGlow)" opacity={pathDraw}>
						{/* Glow layer */}
						<path
							d="M 1070 860 C 1020 830 960 800 900 780 L 900 780 C 850 760 830 730 830 720 L 830 720 C 780 700 670 650 670 640 L 670 640 C 620 620 510 570 510 560 L 510 560 C 460 540 350 490 350 480"
							stroke={COLORS.green}
							strokeWidth="28"
							strokeLinecap="round"
							fill="none"
							opacity="0.25"
						/>
						{/* Main path */}
						<path
							d="M 1070 860 C 1020 830 960 800 900 780 L 900 780 C 850 760 830 730 830 720 L 830 720 C 780 700 670 650 670 640 L 670 640 C 620 620 510 570 510 560 L 510 560 C 460 540 350 490 350 480"
							stroke={COLORS.green}
							strokeWidth="10"
							strokeLinecap="round"
							fill="none"
							strokeDasharray={PATH_LENGTH}
							strokeDashoffset={PATH_LENGTH * (1 - pathDraw)}
						/>
					</g>
				)}

				{/* ── Danger border around phone area (danger phase only) ── */}
				{isDanger && (
					<rect
						x={745}
						y={510}
						width={130}
						height={200}
						rx="14"
						fill="none"
						stroke={COLORS.red}
						strokeWidth={3 + pulse * 3}
						strokeDasharray="12 6"
						opacity={0.5 + pulse * 0.5}
					/>
				)}

				{/* ── Human figure on step 3 (x≈670, y=640) ── */}
				<g transform="translate(700, 440)">
					{/* Head */}
					<circle cx="50" cy="28" r="34" fill="#FFCC80" />
					{/* Hair */}
					<ellipse cx="50" cy="10" rx="34" ry="18" fill="#5D4037" />
					{/* Body */}
					<rect x="20" y="62" width="60" height="110" rx="14" fill="#1565C0" />
					{/* Left leg */}
					<rect x="20" y="165" width="24" height="80" rx="10" fill="#0D47A1" />
					{/* Right leg */}
					<rect x="56" y="165" width="24" height="80" rx="10" fill="#0D47A1" />
					{/* Left shoe */}
					<ellipse cx="32" cy="248" rx="20" ry="10" fill="#263238" />
					{/* Right shoe */}
					<ellipse cx="68" cy="248" rx="20" ry="10" fill="#263238" />

					{/* Right arm — reaching toward rail (correction) or extended (danger) */}
					<g
						style={{
							transformOrigin: '20px 80px',
							transform: `rotate(${armAngle}deg)`,
						}}
					>
						<rect
							x="-50"
							y="70"
							width="72"
							height="22"
							rx="11"
							fill="#FFCC80"
						/>
					</g>

					{/* Left arm — holds phone (danger) */}
					<rect x="80" y="70" width="72" height="22" rx="11" fill="#FFCC80" />
				</g>

				{/* ── Phone (danger phase, slides out on correction) ── */}
				<g
					transform={`translate(${phoneX}, 0)`}
					opacity={phoneOpacity}
				>
					{/* Phone body */}
					<rect x="770" y="520" width="80" height="140" rx="12" fill="#37474F" />
					{/* Phone screen */}
					<rect x="777" y="530" width="66" height="115" rx="6" fill="#80DEEA" />
					{/* Screen content lines */}
					<rect x="785" y="545" width="50" height="8" rx="3" fill="rgba(255,255,255,0.7)" />
					<rect x="785" y="560" width="38" height="8" rx="3" fill="rgba(255,255,255,0.5)" />
					<rect x="785" y="575" width="44" height="8" rx="3" fill="rgba(255,255,255,0.5)" />
					{/* Home button */}
					<circle cx="810" cy="648" r="8" fill="#546E7A" />

					{/* X mark over phone (danger) */}
					{isDanger && (
						<g opacity={0.85 + pulse * 0.15}>
							<line x1="760" y1="500" x2="870" y2="680" stroke={COLORS.red} strokeWidth="6" strokeLinecap="round" />
							<line x1="870" y1="500" x2="760" y2="680" stroke={COLORS.red} strokeWidth="6" strokeLinecap="round" />
						</g>
					)}
				</g>

				{/* ── Check mark (correction complete) ── */}
				{checkProgress > 0 && (
					<g transform="translate(300, 320)">
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
