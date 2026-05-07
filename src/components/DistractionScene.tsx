import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Easing} from 'remotion';
import {COLORS, FONT} from '../theme';

/**
 * DistractionScene — 425 frames (relative)
 *   0–30:    fade-in
 *   30–180:  perigo (trabalhador distracted com celular durante atividade)
 *   180–360: correção (celular guardado, foco na tarefa, procedimento seguido)
 *   360–425: cena corrigida mantida
 */
export const DistractionScene: React.FC = () => {
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

	// Phone exit
	const phoneExit = spring({frame: frame - exitStart, fps, config: {damping: 20, stiffness: 62}});

	// Checklist/procedure board highlights
	const boardGlow = interpolate(frame, [exitStart + 20, exitStart + 60], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Attention indicator appears (eye/focus icon)
	const focusAppear = spring({
		frame: frame - (exitStart + 30),
		fps,
		config: {damping: 22, stiffness: 68},
	});

	const checkProgress = interpolate(frame, [330, 390], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.back(2)),
	});

	const pulse = Math.sin((frame / fps) * Math.PI * 1.6) * 0.5 + 0.5;
	const isDanger = frame < exitStart;

	const phoneX = phoneExit * 550;
	const phoneOpacityVal = interpolate(phoneExit, [0, 0.7], [1, 0], {extrapolateRight: 'clamp'});

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
					<linearGradient id="floorGradD" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#CFD8DC" />
						<stop offset="100%" stopColor="#B0BEC5" />
					</linearGradient>
					<linearGradient id="tableGradD" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#D7CCC8" />
						<stop offset="100%" stopColor="#BCAAA4" />
					</linearGradient>
					<filter id="glowD">
						<feGaussianBlur stdDeviation="10" result="blur" />
						<feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
					</filter>
				</defs>

				{/* Floor */}
				<rect x="0" y="860" width="1920" height="220" fill="url(#floorGradD)" />
				<line x1="0" y1="860" x2="1920" y2="860" stroke="#B0BEC5" strokeWidth="3" />

				{/* ── Work table ── */}
				<rect x="500" y="560" width="920" height="36" rx="10" fill="url(#tableGradD)" />
				<rect x="520" y="592" width="880" height="16" rx="6" fill="#BCAAA4" opacity="0.5" />
				<rect x="550" y="604" width="28" height="256" rx="8" fill="#A1887F" />
				<rect x="1342" y="604" width="28" height="256" rx="8" fill="#A1887F" />

				{/* ── Task object on table: clipboard with checklist ── */}
				{/* Clipboard */}
				<rect x="870" y="360" width="180" height="220" rx="12" fill="#FFF8E1" stroke="#CFD8DC" strokeWidth="3" />
				<rect x="920" y="345" width="80" height="28" rx="8" fill="#78909C" />
				{/* Checklist lines */}
				<g opacity={boardGlow > 0 ? 0.9 : 0.6}>
					{[0, 1, 2, 3].map((i) => (
						<g key={i}>
							<rect x="895" y={390 + i * 42} width="18" height="18" rx="4"
								fill={boardGlow > 0 && i < 3 ? COLORS.green : '#CFD8DC'}
								stroke={boardGlow > 0 && i < 3 ? COLORS.green : '#90A4AE'}
								strokeWidth="2"
							/>
							{boardGlow > 0 && i < 3 && (
								<path
									d={`M ${898} ${399 + i * 42} L ${906} ${407 + i * 42} L ${912} ${392 + i * 42}`}
									stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"
								/>
							)}
							<rect x="922" y={395 + i * 42} width={100 - i * 10} height="8" rx="3" fill="#B0BEC5" opacity="0.7" />
						</g>
					))}
				</g>

				{/* Glow border when focused */}
				<rect
					x="870" y="360" width="180" height="220" rx="12"
					fill="none"
					stroke={boardGlow > 0.5 ? COLORS.green : 'transparent'}
					strokeWidth="4"
					opacity={boardGlow}
					filter={boardGlow > 0.5 ? 'url(#glowD)' : undefined}
				/>

				{/* ── Worker figure (standing at table) ── */}
				<g transform="translate(710, 230)">
					{/* Legs */}
					<rect x="26" y="250" width="32" height="130" rx="14" fill="#0D47A1" />
					<rect x="82" y="250" width="32" height="130" rx="14" fill="#0D47A1" />
					{/* Shoes */}
					<ellipse cx="42" cy="383" rx="30" ry="13" fill="#263238" />
					<ellipse cx="98" cy="383" rx="30" ry="13" fill="#263238" />

					{/* Safety vest (body) */}
					<rect x="14" y="90" width="112" height="165" rx="20" fill="#F9A825" />
					{/* Vest stripes */}
					<rect x="14" y="140" width="112" height="18" rx="4" fill="#FFF176" opacity="0.8" />
					<rect x="14" y="196" width="112" height="18" rx="4" fill="#FFF176" opacity="0.8" />
					{/* Shirt under */}
					<rect x="30" y="92" width="80" height="50" rx="8" fill="#1565C0" />

					{/* Left arm — resting toward task */}
					<rect x="-30" y="110" width="50" height="22" rx="11" fill="#FFCC80" />

					{/* Right arm — holding phone (danger) / at task (correction) */}
					<g transform={`translate(${phoneX * 0.3}, 0)`}>
						<rect x="126" y="110" width="50" height="22" rx="11" fill="#FFCC80" />
					</g>

					{/* Neck */}
					<rect x="55" y="60" width="30" height="38" rx="10" fill="#FFCC80" />

					{/* Head */}
					<circle cx="70" cy="38" r="46" fill="#FFCC80" />
					{/* Hard hat */}
					<ellipse cx="70" cy="14" rx="52" ry="20" fill="#F9A825" />
					<rect x="20" y="14" width="100" height="16" rx="4" fill="#F9A825" />
					{/* Hat brim */}
					<rect x="12" y="27" width="116" height="8" rx="4" fill="#E65100" />

					{/* Eyes */}
					<circle cx="55" cy="40" r="5.5" fill="#263238" />
					<circle cx="85" cy="40" r="5.5" fill="#263238" />
					{/* Gaze direction indicator */}
					{isDanger
						? /* Looking down at phone */
						  <ellipse cx="70" cy="50" rx="20" ry="10" fill="none" stroke="#263238" strokeWidth="2" opacity="0.3" />
						: /* Looking at clipboard */
						  <path d="M 52 57 Q 70 64 88 57" stroke="#263238" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
					}
				</g>

				{/* ── Phone (danger phase) ── */}
				<g transform={`translate(${phoneX}, 0)`} opacity={phoneOpacityVal}>
					<rect x="845" y="450" width="72" height="120" rx="12" fill="#37474F" />
					<rect x="853" y="460" width="56" height="95" rx="6" fill="#80DEEA" />
					<rect x="861" y="472" width="40" height="8" rx="3" fill="rgba(255,255,255,0.7)" />
					<rect x="861" y="486" width="30" height="8" rx="3" fill="rgba(255,255,255,0.5)" />
					<circle cx="881" cy="562" r="7" fill="#546E7A" />
					{isDanger && (
						<g opacity={0.85 + pulse * 0.15}>
							<line x1="832" y1="437" x2="932" y2="585" stroke={COLORS.red} strokeWidth="6" strokeLinecap="round" />
							<line x1="932" y1="437" x2="832" y2="585" stroke={COLORS.red} strokeWidth="6" strokeLinecap="round" />
						</g>
					)}
				</g>

				{/* Danger zone border */}
				{isDanger && (
					<rect
						x={700}
						y={220}
						width={340}
						height={380}
						rx="14"
						fill="none"
						stroke={COLORS.red}
						strokeWidth={3 + pulse * 3}
						strokeDasharray="12 6"
						opacity={0.5 + pulse * 0.5}
					/>
				)}

				{/* Focus/attention indicator (correction) */}
				{focusAppear > 0.1 && (
					<g transform="translate(650, 140)" opacity={focusAppear}>
						<circle cx="50" cy="50" r="44" fill="none" stroke={COLORS.teal} strokeWidth="5" />
						{/* Eye shape */}
						<path d="M 16 50 Q 50 22 84 50 Q 50 78 16 50 Z" fill={COLORS.tealLight} />
						<circle cx="50" cy="50" r="14" fill={COLORS.teal} />
						<circle cx="50" cy="50" r="7" fill="white" />
					</g>
				)}

				{/* Sign */}
				<g transform="translate(610, 80)">
					<rect x="0" y="0" width="360" height="70" rx="10" fill={COLORS.brandBlue} />
					<text x="180" y="46" textAnchor="middle" fill="white" fontSize="26" fontWeight="800" fontFamily={FONT} letterSpacing="1">FOCO NA ATIVIDADE</text>
				</g>

				{/* Check mark */}
				{checkProgress > 0 && (
					<g transform="translate(1270, 350)">
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
