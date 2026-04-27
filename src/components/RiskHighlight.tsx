import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Easing} from 'remotion';
import {COLORS, FONT} from '../theme';

type Props = {
	variant: 'question' | 'evidence';
};

export const RiskHighlight: React.FC<Props> = ({variant}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const enter = spring({frame, fps, config: {damping: 18}});
	const exitStart = variant === 'question' ? 100 : 130;
	const exit = interpolate(frame, [exitStart, exitStart + 18], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const pulse = Math.sin((frame / fps) * Math.PI * 2.4) * 0.5 + 0.5;
	const circleDraw = interpolate(frame, [10, 45], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const arrowDraw = interpolate(frame, [20, 55], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});

	if (variant === 'question') {
		return (
			<AbsoluteFill
				style={{
					fontFamily: FONT,
					opacity: exit,
				}}
			>
				{/* Big question text on the left */}
				<div
					style={{
						position: 'absolute',
						top: 220,
						left: 110,
						width: 760,
						transform: `translateY(${(1 - enter) * 40}px) scale(${0.96 + enter * 0.04})`,
						opacity: enter,
					}}
				>
					{/* tag */}
					<div
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: 12,
							background: COLORS.red,
							color: '#fff',
							padding: '10px 20px',
							borderRadius: 999,
							fontSize: 22,
							fontWeight: 700,
							letterSpacing: '0.16em',
							textTransform: 'uppercase',
							marginBottom: 28,
							boxShadow: '0 8px 24px rgba(233,79,79,0.35)',
						}}
					>
						<span
							style={{
								width: 12,
								height: 12,
								borderRadius: '50%',
								background: '#fff',
								boxShadow: `0 0 0 ${4 + pulse * 4}px rgba(255,255,255,0.4)`,
							}}
						/>
						Atenção
					</div>
					<h2
						style={{
							fontSize: 132,
							fontWeight: 800,
							color: COLORS.text,
							margin: 0,
							letterSpacing: '-0.03em',
							lineHeight: 1,
						}}
					>
						Você
						<br />
						percebe o{' '}
						<span style={{color: COLORS.red, position: 'relative'}}>
							risco?
						</span>
					</h2>
				</div>

				{/* Hand-drawn circle around obstruction + arrow */}
				<svg
					width="1920"
					height="1080"
					viewBox="0 0 1920 1080"
					style={{position: 'absolute', inset: 0}}
				>
					<defs>
						<filter id="redGlow" x="-50%" y="-50%" width="200%" height="200%">
							<feGaussianBlur stdDeviation="6" />
						</filter>
					</defs>

					{/* Pulsing circle around boxes */}
					<g opacity={circleDraw} style={{transformOrigin: '1080px 690px'}}>
						<ellipse
							cx="1080"
							cy="690"
							rx="290"
							ry="200"
							fill="none"
							stroke={COLORS.red}
							strokeWidth={6 + pulse * 3}
							strokeDasharray="2200"
							strokeDashoffset={2200 * (1 - circleDraw)}
							opacity="0.9"
							transform="rotate(-6 1080 690)"
						/>
						<ellipse
							cx="1080"
							cy="690"
							rx="310"
							ry="220"
							fill="none"
							stroke={COLORS.red}
							strokeWidth="3"
							strokeDasharray="2300"
							strokeDashoffset={2300 * (1 - circleDraw)}
							opacity="0.4"
							transform="rotate(4 1080 690)"
						/>
					</g>

					{/* Hand-drawn arrow pointing to obstruction */}
					<g opacity={arrowDraw}>
						<path
							d="M 760 480 Q 880 540 950 600"
							stroke={COLORS.red}
							strokeWidth="8"
							fill="none"
							strokeLinecap="round"
							strokeDasharray="220"
							strokeDashoffset={220 * (1 - arrowDraw)}
						/>
						{/* Arrow head */}
						{arrowDraw > 0.85 && (
							<g
								transform="translate(950, 600) rotate(50)"
								opacity={(arrowDraw - 0.85) / 0.15}
							>
								<path
									d="M 0 0 L -22 -10 L -16 0 L -22 10 Z"
									fill={COLORS.red}
								/>
							</g>
						)}
					</g>
				</svg>

				{/* Question mark sticker */}
				<div
					style={{
						position: 'absolute',
						top: 540,
						left: 760,
						transform: `rotate(${-12 + enter * 4}deg) scale(${enter})`,
						opacity: enter,
					}}
				>
					<div
						style={{
							width: 90,
							height: 90,
							borderRadius: 18,
							background: COLORS.red,
							color: '#fff',
							fontSize: 64,
							fontWeight: 900,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							boxShadow: '0 12px 30px rgba(233,79,79,0.4)',
							fontFamily: FONT,
						}}
					>
						?
					</div>
				</div>
			</AbsoluteFill>
		);
	}

	// Evidence variant
	return (
		<AbsoluteFill style={{fontFamily: FONT, opacity: exit}}>
			{/* Top-left evidence card */}
			<div
				style={{
					position: 'absolute',
					top: 110,
					left: 110,
					width: 720,
					transform: `translateX(${(1 - enter) * -60}px)`,
					opacity: enter,
				}}
			>
				<div
					style={{
						background: COLORS.bgWhite,
						padding: '36px 44px',
						borderRadius: 22,
						boxShadow: '0 18px 48px rgba(38,50,56,0.16)',
						borderTop: `8px solid ${COLORS.red}`,
						display: 'flex',
						flexDirection: 'column',
						gap: 14,
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 16,
						}}
					>
						<AlertIcon />
						<span
							style={{
								fontSize: 24,
								fontWeight: 700,
								color: COLORS.red,
								letterSpacing: '0.16em',
								textTransform: 'uppercase',
							}}
						>
							Risco identificado
						</span>
					</div>
					<h3
						style={{
							fontSize: 78,
							fontWeight: 800,
							color: COLORS.text,
							margin: 0,
							letterSpacing: '-0.02em',
							lineHeight: 1.05,
						}}
					>
						Saída obstruída
					</h3>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 14,
							marginTop: 8,
							fontSize: 32,
							fontWeight: 600,
							color: COLORS.textSoft,
						}}
					>
						<span style={{color: COLORS.red, fontSize: 38}}>=</span>
						<span>evacuação mais lenta</span>
					</div>
				</div>
			</div>

			{/* Diagonal red caution stripe overlay (subtle) */}
			<svg
				width="1920"
				height="1080"
				viewBox="0 0 1920 1080"
				style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}
			>
				<defs>
					<pattern
						id="caution-stripes"
						width="40"
						height="40"
						patternUnits="userSpaceOnUse"
						patternTransform="rotate(-45)"
					>
						<rect width="40" height="40" fill="transparent" />
						<rect width="20" height="40" fill={COLORS.red} opacity="0.18" />
					</pattern>
				</defs>

				{/* Red highlight around obstruction zone */}
				<g opacity={enter * 0.85}>
					<rect
						x="850"
						y="510"
						width="490"
						height="340"
						fill="url(#caution-stripes)"
						rx="14"
					/>
					<rect
						x="850"
						y="510"
						width="490"
						height="340"
						fill="none"
						stroke={COLORS.red}
						strokeWidth="5"
						strokeDasharray="18 12"
						rx="14"
					/>
				</g>
			</svg>

			{/* Time/clock annotation sticker */}
			<div
				style={{
					position: 'absolute',
					bottom: 180,
					left: 220,
					transform: `rotate(-4deg) scale(${enter})`,
					opacity: enter,
				}}
			>
				<div
					style={{
						background: '#FFF8E1',
						padding: '14px 22px',
						borderRadius: 12,
						boxShadow: '0 10px 26px rgba(0,0,0,0.12)',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						border: `2px dashed ${COLORS.red}66`,
					}}
				>
					<svg width="32" height="32" viewBox="0 0 24 24" fill="none">
						<circle cx="12" cy="12" r="10" stroke={COLORS.red} strokeWidth="2" />
						<path d="M 12 6 L 12 12 L 16 14" stroke={COLORS.red} strokeWidth="2" strokeLinecap="round" />
					</svg>
					<span style={{fontSize: 22, fontWeight: 700, color: COLORS.text}}>
						Cada segundo importa
					</span>
				</div>
			</div>
		</AbsoluteFill>
	);
};

const AlertIcon: React.FC = () => {
	return (
		<div
			style={{
				width: 56,
				height: 56,
				borderRadius: 12,
				background: COLORS.red,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				boxShadow: '0 6px 16px rgba(233,79,79,0.35)',
			}}
		>
			<svg width="32" height="32" viewBox="0 0 24 24" fill="none">
				<path
					d="M 12 2 L 22 20 L 2 20 Z"
					fill="#fff"
				/>
				<rect x="11" y="9" width="2" height="6" fill={COLORS.red} />
				<circle cx="12" cy="17.5" r="1.4" fill={COLORS.red} />
			</svg>
		</div>
	);
};
