import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Easing} from 'remotion';
import {COLORS, FONT} from '../theme';

/**
 * The full exit scene that runs from frame 0 to 390 (relative).
 * Internally handles 3 phases:
 *   - Entry (0-30): scene fades + slides in
 *   - Obstructed (30-180): static with subtle ken-burns zoom
 *   - Correction (180-360): boxes slide out, green path appears
 *   - Hold (360-390): cleared scene held
 */
export const EmergencyExitScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const enter = spring({frame, fps, config: {damping: 24, stiffness: 72}});
	const opacity = interpolate(frame, [0, 24], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const exitOpacity = interpolate(frame, [398, 425], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Subtle ken-burns
	const kenBurns = interpolate(frame, [30, 360], [1, 1.04], {
		extrapolateRight: 'clamp',
		easing: Easing.inOut(Easing.ease),
	});

	// Box exit progress starts with the risk evidence block.
	const exitStart = 180;
	const box1Exit = spring({
		frame: frame - exitStart,
		fps,
		config: {damping: 20, stiffness: 62},
	});
	const box2Exit = spring({
		frame: frame - (exitStart + 14),
		fps,
		config: {damping: 20, stiffness: 62},
	});
	const box3Exit = spring({
		frame: frame - (exitStart + 26),
		fps,
		config: {damping: 20, stiffness: 62},
	});
	const box4Exit = spring({
		frame: frame - (exitStart + 10),
		fps,
		config: {damping: 20, stiffness: 62},
	});

	// Path draw (after boxes exit)
	const pathDraw = interpolate(frame, [285, 365], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});

	// Door glow when path appears
	const doorGlow = interpolate(frame, [305, 375], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Check mark animation
	const checkProgress = interpolate(frame, [325, 385], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.back(2)),
	});

	// Pulse for danger (during obstruction phase)
	const pulse = Math.sin((frame / fps) * Math.PI * 1.6) * 0.5 + 0.5;

	const PATH_LENGTH = 720;

	return (
		<AbsoluteFill
			style={{
				opacity: opacity * exitOpacity,
				fontFamily: FONT,
				transform: `translateY(${(1 - enter) * 30}px)`,
			}}
		>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					transform: `scale(${kenBurns})`,
					transformOrigin: '60% 55%',
				}}
			>
				<svg
					viewBox="0 0 1920 1080"
					width="1920"
					height="1080"
					style={{position: 'absolute', inset: 0}}
				>
					<defs>
						<linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="#F5F9FB" />
							<stop offset="100%" stopColor="#DCE7EC" />
						</linearGradient>
						<linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="#CFD8DC" />
							<stop offset="100%" stopColor="#B0BEC5" />
						</linearGradient>
						<linearGradient id="doorPanel" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="#455A64" />
							<stop offset="100%" stopColor="#37474F" />
						</linearGradient>
						<linearGradient id="cardboard1" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor={COLORS.cardboardLight} />
							<stop offset="100%" stopColor={COLORS.cardboard} />
						</linearGradient>
						<linearGradient id="cardboard2" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="#D1A572" />
							<stop offset="100%" stopColor="#A87644" />
						</linearGradient>
						<filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
							<feGaussianBlur stdDeviation="6" />
						</filter>
						<filter id="greenGlow" x="-50%" y="-50%" width="200%" height="200%">
							<feGaussianBlur stdDeviation="12" />
							<feComponentTransfer>
								<feFuncA type="linear" slope="2" />
							</feComponentTransfer>
						</filter>
					</defs>

					{/* Wall */}
					<rect x="0" y="0" width="1920" height="780" fill="url(#wall)" />

					{/* Floor */}
					<rect x="0" y="780" width="1920" height="300" fill="url(#floor)" />

					{/* Floor perspective lines */}
					<g opacity="0.25">
						<line x1="0" y1="780" x2="1920" y2="780" stroke="#90A4AE" strokeWidth="2" />
						<line x1="200" y1="1080" x2="780" y2="780" stroke="#90A4AE" strokeWidth="1.5" />
						<line x1="600" y1="1080" x2="900" y2="780" stroke="#90A4AE" strokeWidth="1.5" />
						<line x1="1100" y1="1080" x2="1040" y2="780" stroke="#90A4AE" strokeWidth="1.5" />
						<line x1="1600" y1="1080" x2="1180" y2="780" stroke="#90A4AE" strokeWidth="1.5" />
					</g>

					{/* Wall decorative corner trim */}
					<rect x="0" y="775" width="1920" height="6" fill="#90A4AE" opacity="0.4" />

					{/* Wall panel (subtle decoration) */}
					<rect
						x="240"
						y="160"
						width="540"
						height="540"
						fill="none"
						stroke="#B0BEC5"
						strokeWidth="2"
						opacity="0.4"
						rx="6"
					/>

					{/* Door shadow on floor */}
					<ellipse
						cx="1340"
						cy="800"
						rx="220"
						ry="14"
						fill="#000"
						opacity="0.18"
					/>

					{/* Emergency Exit Door */}
					<g transform="translate(1180, 230)">
						{/* Frame */}
						<rect width="320" height="560" fill="#263238" rx="6" />
						{/* Panel */}
						<rect
							x="14"
							y="14"
							width="292"
							height="532"
							fill="url(#doorPanel)"
							rx="3"
						/>
						{/* Door split */}
						<line
							x1="160"
							y1="14"
							x2="160"
							y2="546"
							stroke="#1C262B"
							strokeWidth="3"
						/>
						{/* Window */}
						<rect
							x="40"
							y="60"
							width="100"
							height="160"
							fill="#1A1F22"
							stroke="#1C262B"
							strokeWidth="2"
							rx="3"
						/>
						<rect
							x="180"
							y="60"
							width="100"
							height="160"
							fill="#1A1F22"
							stroke="#1C262B"
							strokeWidth="2"
							rx="3"
						/>
						{/* Reflections */}
						<line x1="48" y1="70" x2="48" y2="200" stroke="#fff" strokeWidth="2" opacity="0.15" />
						<line x1="188" y1="70" x2="188" y2="200" stroke="#fff" strokeWidth="2" opacity="0.15" />
						{/* Handles */}
						<rect x="138" y="290" width="8" height="40" fill="#FFD54F" rx="2" />
						<rect x="174" y="290" width="8" height="40" fill="#FFD54F" rx="2" />
						{/* Push bar */}
						<rect x="50" y="350" width="220" height="14" fill="#CFD8DC" rx="6" />
						<rect x="50" y="350" width="220" height="6" fill="#fff" opacity="0.3" rx="6" />

						{/* Door glow when activated */}
						{doorGlow > 0 && (
							<rect
								width="320"
								height="560"
								fill="none"
								stroke={COLORS.green}
								strokeWidth={4 + doorGlow * 4}
								rx="6"
								opacity={doorGlow * 0.7}
							/>
						)}
					</g>

					{/* SAÍDA Sign above door */}
					<g transform="translate(1135, 130)">
						{/* Sign post */}
						<rect x="195" y="80" width="22" height="18" fill="#37474F" />
						{/* Sign body */}
						<rect
							width="412"
							height="86"
							fill={COLORS.green}
							rx="10"
							filter="url(#softShadow)"
						/>
						<rect width="412" height="86" fill={COLORS.green} rx="10" />
						{/* Highlight */}
						<rect width="412" height="32" fill="#fff" opacity="0.15" rx="10" />
						{/* Running man */}
						<g transform="translate(20, 18)">
							<circle cx="22" cy="14" r="9" fill="#fff" />
							<path
								d="M 12 28 L 22 36 L 30 30 L 38 42 L 34 50 M 22 36 L 18 50 M 30 30 L 40 25"
								stroke="#fff"
								strokeWidth="6"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</g>
						{/* SAIDA text */}
						<text
							x="86"
							y="58"
							fontSize="42"
							fontWeight="800"
							fill="#fff"
							style={{fontFamily: FONT, letterSpacing: '0.05em'}}
						>
							SAÍDA
						</text>
						{/* Arrow */}
						<path
							d="M 270 34 L 360 34 L 360 18 L 396 43 L 360 68 L 360 52 L 270 52 Z"
							fill="#fff"
						/>
					</g>

					{/* Green path on floor (revealed after correction) */}
					<g opacity={pathDraw > 0 ? 1 : 0}>
						{/* Path glow */}
						<path
							d="M 480 1020 Q 720 940 980 870 Q 1180 820 1340 805"
							stroke={COLORS.green}
							strokeWidth="44"
							fill="none"
							strokeLinecap="round"
							opacity="0.25"
							strokeDasharray={PATH_LENGTH}
							strokeDashoffset={PATH_LENGTH * (1 - pathDraw)}
						/>
						{/* Main path */}
						<path
							d="M 480 1020 Q 720 940 980 870 Q 1180 820 1340 805"
							stroke={COLORS.green}
							strokeWidth="20"
							fill="none"
							strokeLinecap="round"
							strokeDasharray={PATH_LENGTH}
							strokeDashoffset={PATH_LENGTH * (1 - pathDraw)}
						/>
						{/* Highlight on path */}
						<path
							d="M 480 1020 Q 720 940 980 870 Q 1180 820 1340 805"
							stroke="#fff"
							strokeWidth="4"
							fill="none"
							strokeLinecap="round"
							opacity="0.6"
							strokeDasharray={PATH_LENGTH}
							strokeDashoffset={PATH_LENGTH * (1 - pathDraw)}
						/>
						{/* Footprint markers */}
						{[0.2, 0.4, 0.6, 0.8].map((p, i) => {
							const visible = pathDraw > p ? 1 : 0;
							const positions = [
								{x: 620, y: 980},
								{x: 820, y: 905},
								{x: 1020, y: 855},
								{x: 1220, y: 815},
							];
							return (
								<circle
									key={i}
									cx={positions[i].x}
									cy={positions[i].y}
									r="10"
									fill="#fff"
									opacity={visible * 0.9}
								/>
							);
						})}
					</g>

					{/* Cardboard Boxes (block the door — slide out during correction) */}
					{/* Box 1 (large, foreground left) */}
					<g
						transform={`translate(${880 - box1Exit * 1100}, ${640 + box1Exit * 60}) rotate(${-box1Exit * 18})`}
						style={{transformOrigin: '120px 100px'}}
					>
						<rect width="240" height="190" fill="url(#cardboard1)" stroke={COLORS.cardboardDark} strokeWidth="3" rx="6" filter="url(#softShadow)" />
						<rect width="240" height="190" fill="url(#cardboard1)" stroke={COLORS.cardboardDark} strokeWidth="3" rx="6" />
						<line x1="120" y1="0" x2="120" y2="190" stroke={COLORS.cardboardDark} strokeWidth="2" />
						<line x1="0" y1="95" x2="240" y2="95" stroke={COLORS.cardboardDark} strokeWidth="2" />
						{/* Tape */}
						<rect x="0" y="86" width="240" height="18" fill="#E8C68F" opacity="0.7" />
						{/* Label */}
						<rect x="20" y="120" width="80" height="40" fill="#fff" stroke={COLORS.cardboardDark} strokeWidth="1.5" rx="3" />
						<line x1="28" y1="132" x2="92" y2="132" stroke={COLORS.cardboardDark} strokeWidth="1.5" opacity="0.5" />
						<line x1="28" y1="142" x2="80" y2="142" stroke={COLORS.cardboardDark} strokeWidth="1.5" opacity="0.5" />
					</g>

					{/* Box 2 (tall, behind) */}
					<g
						transform={`translate(${1080 - box2Exit * 1300}, ${570 + box2Exit * 80}) rotate(${box2Exit * 22})`}
						style={{transformOrigin: '110px 120px'}}
					>
						<rect width="220" height="240" fill="url(#cardboard2)" stroke={COLORS.cardboardDark} strokeWidth="3" rx="6" filter="url(#softShadow)" />
						<rect width="220" height="240" fill="url(#cardboard2)" stroke={COLORS.cardboardDark} strokeWidth="3" rx="6" />
						<line x1="110" y1="0" x2="110" y2="240" stroke={COLORS.cardboardDark} strokeWidth="2" />
						<line x1="0" y1="120" x2="220" y2="120" stroke={COLORS.cardboardDark} strokeWidth="2" />
						<rect x="0" y="110" width="220" height="20" fill="#E8C68F" opacity="0.7" />
						{/* "FRÁGIL" */}
						<text x="40" y="180" fontSize="22" fontWeight="800" fill={COLORS.red} opacity="0.85" style={{fontFamily: FONT}}>FRÁGIL</text>
					</g>

					{/* Box 3 (small, top of box 1) */}
					<g
						transform={`translate(${940 + box3Exit * 1500}, ${540 + box3Exit * 100}) rotate(${box3Exit * -28})`}
						style={{transformOrigin: '85px 50px'}}
					>
						<rect width="170" height="100" fill={COLORS.cardboardLight} stroke={COLORS.cardboardDark} strokeWidth="3" rx="5" filter="url(#softShadow)" />
						<rect width="170" height="100" fill={COLORS.cardboardLight} stroke={COLORS.cardboardDark} strokeWidth="3" rx="5" />
						<line x1="85" y1="0" x2="85" y2="100" stroke={COLORS.cardboardDark} strokeWidth="2" />
						<rect x="0" y="42" width="170" height="14" fill="#E8C68F" opacity="0.7" />
					</g>

					{/* Box 4 (tipped, foreground right) */}
					<g
						transform={`translate(${1230 + box4Exit * 1700}, ${720 + box4Exit * 40}) rotate(${-12 + box4Exit * 15})`}
						style={{transformOrigin: '90px 50px'}}
					>
						<rect width="180" height="110" fill="url(#cardboard1)" stroke={COLORS.cardboardDark} strokeWidth="3" rx="5" filter="url(#softShadow)" />
						<rect width="180" height="110" fill="url(#cardboard1)" stroke={COLORS.cardboardDark} strokeWidth="3" rx="5" />
						<line x1="90" y1="0" x2="90" y2="110" stroke={COLORS.cardboardDark} strokeWidth="2" />
						<line x1="0" y1="55" x2="180" y2="55" stroke={COLORS.cardboardDark} strokeWidth="2" />
					</g>

					{/* Pulsing red border around the obstruction (only during obstruction phase) */}
					{frame >= 30 && frame < exitStart && (
						<g opacity={0.3 + pulse * 0.5}>
							<rect
								x="850"
								y="510"
								width="490"
								height="340"
								fill="none"
								stroke={COLORS.red}
								strokeWidth="4"
								strokeDasharray="14 10"
								rx="14"
							/>
						</g>
					)}

					{/* Check mark after correction */}
					{checkProgress > 0 && (
						<g transform="translate(720, 380)" opacity={checkProgress}>
							<circle
								cx="60"
								cy="60"
								r="60"
								fill={COLORS.green}
								filter="url(#softShadow)"
							/>
							<circle cx="60" cy="60" r="60" fill={COLORS.green} />
							<circle cx="60" cy="60" r="60" fill="#fff" opacity="0.15" />
							<path
								d="M 32 64 L 52 84 L 92 40"
								stroke="#fff"
								strokeWidth="10"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeDasharray="100"
								strokeDashoffset={100 * (1 - checkProgress)}
							/>
						</g>
					)}
				</svg>

			</div>
		</AbsoluteFill>
	);
};
