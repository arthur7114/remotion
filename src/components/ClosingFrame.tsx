import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {COLORS, FONT} from '../theme';
import {LogoDrOcupacional} from './LogoDrOcupacional';

export const ClosingFrame: React.FC = () => {
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
			{/* Background accent */}
			<svg
				width="1920"
				height="1080"
				viewBox="0 0 1920 1080"
				style={{position: 'absolute', inset: 0}}
			>
				<circle
					cx="1660"
					cy="220"
					r="160"
					fill={COLORS.green}
					opacity="0.08"
				/>
				<circle
					cx="220"
					cy="900"
					r="180"
					fill={COLORS.cyan}
					opacity="0.12"
				/>
			</svg>

			{/* Main message */}
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
						fontSize: 132,
						fontWeight: 800,
						color: COLORS.text,
						margin: 0,
						letterSpacing: '-0.03em',
						lineHeight: 1.05,
					}}
				>
					Mantenha os{' '}
					<span style={{color: COLORS.green, position: 'relative'}}>
						acessos livres.
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
								stroke={COLORS.green}
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

			{/* Sub-message */}
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
					<circle cx="12" cy="12" r="10" fill={COLORS.green} />
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
					Pequenas atitudes evitam acidentes.
				</span>
			</div>

			{/* Logo */}
			<div
				style={{
					marginTop: 52,
					opacity: logoEnter,
					transform: `translateY(${(1 - logoEnter) * 20}px)`,
				}}
			>
				<LogoDrOcupacional variant="centered" />
			</div>
		</AbsoluteFill>
	);
};
