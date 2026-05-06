import React from 'react';
import {
	AbsoluteFill,
	Img,
	interpolate,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS, FONT} from '../theme';

type Props = {
	titleLine1?: string;
	titleLine2?: string;
	subtitle?: string;
};

export const ClosingFrame: React.FC<Props> = ({
	titleLine1 = 'Mantenha os',
	titleLine2 = 'acessos livres.',
	subtitle = 'Pequenas atitudes evitam acidentes.',
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const titleEnter = spring({frame, fps, config: {damping: 18}});
	const subEnter = spring({
		frame: frame - 14,
		fps,
		config: {damping: 16},
	});
	const logoEnter = spring({
		frame: frame - 28,
		fps,
		config: {damping: 18},
	});
	const lineDraw = interpolate(frame, [10, 36], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{
				fontFamily: FONT,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 32,
			}}
		>
			<svg
				width="1920"
				height="1080"
				viewBox="0 0 1920 1080"
				style={{position: 'absolute', inset: 0}}
			>
				<circle cx="1660" cy="220" r="160" fill={COLORS.teal} opacity="0.08" />
				<circle cx="220" cy="900" r="180" fill={COLORS.brandBlue} opacity="0.12" />
			</svg>

			<div
				style={{
					textAlign: 'center',
					transform: `translateY(${(1 - titleEnter) * 30}px) scale(${0.96 + titleEnter * 0.04})`,
					opacity: titleEnter,
					position: 'relative',
				}}
			>
				<h1
					style={{
						fontSize: 120,
						fontWeight: 800,
						color: COLORS.text,
						margin: 0,
						letterSpacing: '-0.03em',
						lineHeight: 1.05,
					}}
				>
					{titleLine1}{' '}
					<span style={{color: COLORS.teal, position: 'relative'}}>
						{titleLine2}
						<svg
							width="780"
							height="22"
							viewBox="0 0 780 22"
							style={{
								position: 'absolute',
								left: 0,
								bottom: -8,
							}}
						>
							<path
								d="M 6 14 Q 200 4 400 12 T 774 10"
								stroke={COLORS.teal}
								strokeWidth="8"
								strokeLinecap="round"
								fill="none"
								strokeDasharray="800"
								strokeDashoffset={800 * (1 - lineDraw)}
							/>
						</svg>
					</span>
				</h1>
			</div>

			<div
				style={{
					marginTop: 28,
					opacity: subEnter,
					transform: `translateY(${(1 - subEnter) * 20}px)`,
					display: 'flex',
					alignItems: 'center',
					gap: 18,
					padding: '14px 30px',
					background: COLORS.bgWhite,
					borderRadius: 999,
					boxShadow: '0 12px 32px rgba(47,127,153,0.12)',
				}}
			>
				<svg width="32" height="32" viewBox="0 0 24 24" fill="none">
					<circle cx="12" cy="12" r="10" fill={COLORS.teal} />
					<path
						d="M 7 12 L 11 16 L 17 9"
						stroke="#fff"
						strokeWidth="2.5"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				<span
					style={{
						fontSize: 36,
						fontWeight: 600,
						color: COLORS.textSoft,
						letterSpacing: '-0.01em',
					}}
				>
					{subtitle}
				</span>
			</div>

			<div
				style={{
					marginTop: 52,
					opacity: logoEnter,
					transform: `translateY(${(1 - logoEnter) * 20}px)`,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 14,
				}}
			>
				<span
					style={{
						fontSize: 24,
						fontWeight: 760,
						color: COLORS.textSoft,
						letterSpacing: '0.08em',
						textTransform: 'uppercase',
					}}
				>
					Em parceria
				</span>
				<Img
					src={staticFile('logo-dr-cliente-mrv.png')}
					style={{
						width: 820,
						height: 120,
						objectFit: 'contain',
					}}
				/>
			</div>
		</AbsoluteFill>
	);
};
