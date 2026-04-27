import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {COLORS, FONT} from '../theme';

export const IntroScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const tagEnter = spring({frame: frame - 4, fps, config: {damping: 18}});
	const titleEnter = spring({
		frame: frame - 18,
		fps,
		config: {damping: 16, stiffness: 90},
	});
	const underlineDraw = interpolate(frame, [40, 70], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const exitFade = interpolate(frame, [78, 90], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const stickerRotate = interpolate(
		spring({frame: frame - 30, fps, config: {damping: 12}}),
		[0, 1],
		[-25, -8]
	);

	return (
		<AbsoluteFill
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
				fontFamily: FONT,
				opacity: exitFade,
			}}
		>
			{/* sticker tag */}
			<div
				style={{
					transform: `translateY(${(1 - tagEnter) * -30}px) scale(${tagEnter})`,
					opacity: tagEnter,
					marginBottom: 36,
				}}
			>
				<div
					style={{
						display: 'inline-flex',
						alignItems: 'center',
						gap: 16,
						padding: '14px 28px',
						background: COLORS.bgWhite,
						borderRadius: 999,
						boxShadow: '0 8px 28px rgba(47,127,153,0.14)',
						border: `2px solid ${COLORS.cyan}33`,
					}}
				>
					<div
						style={{
							width: 14,
							height: 14,
							borderRadius: '50%',
							background: COLORS.red,
							boxShadow: `0 0 0 4px ${COLORS.red}33`,
						}}
					/>
					<span
						style={{
							fontSize: 24,
							fontWeight: 700,
							color: COLORS.textSoft,
							letterSpacing: '0.18em',
							textTransform: 'uppercase',
						}}
					>
						Pílula de SST
					</span>
				</div>
			</div>

			{/* main title */}
			<div
				style={{
					transform: `translateY(${(1 - titleEnter) * 40}px)`,
					opacity: titleEnter,
					textAlign: 'center',
					position: 'relative',
				}}
			>
				<h1
					style={{
						fontSize: 144,
						fontWeight: 800,
						color: COLORS.text,
						margin: 0,
						letterSpacing: '-0.03em',
						lineHeight: 1.05,
					}}
				>
					Saídas de{' '}
					<span style={{color: COLORS.blue, position: 'relative'}}>
						emergência
						{/* underline */}
						<svg
							width="780"
							height="22"
							viewBox="0 0 780 22"
							style={{
								position: 'absolute',
								left: 0,
								bottom: -6,
							}}
						>
							<path
								d="M 6 14 Q 200 4 400 12 T 774 10"
								stroke={COLORS.cyan}
								strokeWidth="8"
								strokeLinecap="round"
								fill="none"
								strokeDasharray="800"
								strokeDashoffset={800 * (1 - underlineDraw)}
							/>
						</svg>
					</span>
				</h1>
			</div>

			{/* arrow sticker */}
			<div
				style={{
					position: 'absolute',
					top: 220,
					right: 280,
					transform: `rotate(${stickerRotate}deg) scale(${spring({
						frame: frame - 30,
						fps,
						config: {damping: 12},
					})})`,
					opacity: spring({frame: frame - 30, fps, config: {damping: 14}}),
				}}
			>
				<div
					style={{
						background: COLORS.green,
						color: '#fff',
						padding: '10px 22px',
						borderRadius: 12,
						fontSize: 22,
						fontWeight: 700,
						letterSpacing: '0.05em',
						boxShadow: '0 8px 22px rgba(89,185,90,0.35)',
					}}
				>
					SEGURANÇA
				</div>
			</div>
		</AbsoluteFill>
	);
};
