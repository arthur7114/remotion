import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig, Easing} from 'remotion';
import {COLORS, FONT} from '../theme';

/**
 * PostureCorretaScene
 * Layout: avatar Dr.Ocupacional à ESQUERDA (via MascotSpeech)
 *         frame da ilustração à DIREITA (x: 780–1860)
 */
export const PostureCorretaScene: React.FC<{totalDuration?: number}> = ({totalDuration = 195}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const fadeInOpacity = interpolate(frame, [0, 18], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const fadeOutOpacity = interpolate(frame, [totalDuration - 24, totalDuration - 4], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const opacity = fadeInOpacity * fadeOutOpacity;

	// Frame entra deslizando da direita
	const frameEnter = spring({frame, fps, config: {damping: 22, stiffness: 60}});

	// Borda verde aparece
	const borderGlow = interpolate(frame, [18, 60], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});

	// Check mark: frame 50 → 85
	const checkProgress = interpolate(frame, [50, 85], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.back(2)),
	});

	// Card "Postura correta": frame 75
	const cardEnter = spring({
		frame: frame - 75,
		fps,
		config: {damping: 16, stiffness: 70},
	});

	// Label topo
	const labelEnter = interpolate(frame, [20, 45], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});

	const FRAME_X = 740;
	const FRAME_Y = 70;
	const FRAME_W = 1120;
	const FRAME_H = 900;

	return (
		<AbsoluteFill style={{opacity, fontFamily: FONT}}>

			{/* Fundo suave */}
			<AbsoluteFill style={{
				background: 'linear-gradient(145deg, #F0F4F7 0%, #DDE6EC 100%)',
			}} />

			{/* Frame da ilustração */}
			<div style={{
				position: 'absolute',
				left: FRAME_X + (1 - frameEnter) * 120,
				top: FRAME_Y,
				width: FRAME_W,
				height: FRAME_H,
				borderRadius: 24,
				overflow: 'hidden',
				boxShadow: '0 28px 72px rgba(38,50,56,0.22)',
				border: `3px solid rgba(255,255,255,0.9)`,
				opacity: frameEnter,
			}}>
				<Img
					src={staticFile('postura-correta.png')}
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						objectPosition: 'center center',
					}}
				/>
			</div>

			{/* SVG overlays */}
			<svg width="1920" height="1080" viewBox="0 0 1920 1080"
				style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>

				<defs>
					<filter id="checkShadow" x="-40%" y="-40%" width="180%" height="180%">
						<feGaussianBlur stdDeviation="8" />
					</filter>
				</defs>

				{/* Borda verde sobre o frame */}
				{borderGlow > 0 && (
					<rect
						x={FRAME_X + 2}
						y={FRAME_Y + 2}
						width={FRAME_W - 4}
						height={FRAME_H - 4}
						rx="22"
						fill="none"
						stroke={COLORS.green}
						strokeWidth={4 + borderGlow * 4}
						opacity={borderGlow * 0.7 * frameEnter}
					/>
				)}

				{/* Check mark no canto superior do frame */}
				{checkProgress > 0 && (
					<g transform={`translate(${FRAME_X + FRAME_W - 80}, ${FRAME_Y - 28})`}
						opacity={checkProgress}
					>
						<circle cx="40" cy="40" r="38" fill={COLORS.green}
							filter="url(#checkShadow)" />
						<circle cx="40" cy="40" r="38" fill={COLORS.green} />
						<path
							d="M 18 40 L 33 56 L 62 22"
							stroke="#fff"
							strokeWidth="9"
							strokeLinecap="round"
							strokeLinejoin="round"
							fill="none"
							strokeDasharray="80"
							strokeDashoffset={80 * (1 - checkProgress)}
						/>
					</g>
				)}
			</svg>

			{/* Label "POSTURA CORRETA" — topo esquerdo do frame */}
			<div style={{
				position: 'absolute',
				left: FRAME_X + 24,
				top: FRAME_Y + 20,
				opacity: labelEnter,
				transform: `translateY(${(1 - labelEnter) * -16}px)`,
				zIndex: 10,
			}}>
				<div style={{
					display: 'inline-flex',
					alignItems: 'center',
					gap: 12,
					background: COLORS.green,
					color: '#fff',
					padding: '10px 22px',
					borderRadius: 999,
					fontSize: 22,
					fontWeight: 800,
					letterSpacing: '0.1em',
					textTransform: 'uppercase',
					boxShadow: `0 6px 20px ${COLORS.green}66`,
				}}>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
						<circle cx="12" cy="12" r="10" fill="none"
							stroke="white" strokeWidth="2.5"/>
						<path d="M 7 12 L 11 16 L 17 8" stroke="white"
							strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
					</svg>
					Postura correta
				</div>
			</div>

			{/* Card "Seu corpo agradece." — canto inferior esquerdo do frame */}
			{cardEnter > 0.05 && (
				<div style={{
					position: 'absolute',
					left: FRAME_X + 24,
					bottom: 1080 - (FRAME_Y + FRAME_H) + 24,
					opacity: cardEnter,
					transform: `translateY(${(1 - cardEnter) * 20}px)`,
					zIndex: 10,
				}}>
					<div style={{
						background: 'rgba(255,255,255,0.96)',
						padding: '18px 30px',
						borderRadius: 16,
						boxShadow: `0 12px 36px rgba(59,191,193,0.20)`,
						borderLeft: `7px solid ${COLORS.green}`,
						display: 'flex',
						flexDirection: 'column',
						gap: 4,
					}}>
						<span style={{
							fontSize: 20,
							fontWeight: 700,
							color: COLORS.green,
							textTransform: 'uppercase',
							letterSpacing: '0.1em',
						}}>
							Postura correta
						</span>
						<span style={{
							fontSize: 38,
							fontWeight: 800,
							color: COLORS.text,
							letterSpacing: '-0.02em',
						}}>
							Seu corpo agradece.
						</span>
					</div>
				</div>
			)}

		</AbsoluteFill>
	);
};
