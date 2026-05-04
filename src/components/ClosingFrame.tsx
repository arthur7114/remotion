import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {COLORS, FONT} from '../theme';
import {LogoDrOcupacional} from './LogoDrOcupacional';

type Props = {
	eyebrow: string;
	titleLine1: string;
	titleLine2: string;
	subtitle: string;
	actions: [string, string, string];
};

export const ClosingFrame: React.FC<Props> = ({
	eyebrow,
	titleLine1,
	titleLine2,
	subtitle,
	actions,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const titleEnter = spring({frame, fps, config: {damping: 24, stiffness: 68}});
	const subEnter = spring({
		frame: frame - 18,
		fps,
		config: {damping: 22, stiffness: 70},
	});
	const logoEnter = spring({
		frame: frame - 54,
		fps,
		config: {damping: 24, stiffness: 70},
	});
	const pulse = Math.sin((frame / fps) * Math.PI * 1.4) * 0.5 + 0.5;

	const lineDraw = interpolate(frame, [18, 58], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const routeDraw = interpolate(frame, [8, 94], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const glowScale = interpolate(frame, [22, 86], [0.86, 1.08], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{
				fontFamily: FONT,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<svg
				width="1920"
				height="1080"
				viewBox="0 0 1920 1080"
				style={{position: 'absolute', inset: 0}}
			>
				<circle
					cx="960"
					cy="500"
					r={250 * glowScale}
					fill={COLORS.green}
					opacity={0.07 + pulse * 0.03}
				/>
				<circle
					cx="420"
					cy="210"
					r="150"
					fill={COLORS.cyan}
					opacity="0.12"
				/>
				<circle
					cx="1530"
					cy="860"
					r="190"
					fill={COLORS.blue}
					opacity="0.07"
				/>
				<path
					d="M 332 746 C 514 624 688 736 850 626 S 1134 432 1358 492 C 1474 524 1542 616 1584 730"
					fill="none"
					stroke={COLORS.cyan}
					strokeWidth="9"
					strokeLinecap="round"
					strokeDasharray="1400"
					strokeDashoffset={1400 * (1 - routeDraw)}
					opacity="0.28"
				/>
				<path
					d="M 1518 710 L 1586 730 L 1542 784"
					fill="none"
					stroke={COLORS.green}
					strokeWidth="11"
					strokeLinecap="round"
					strokeLinejoin="round"
					opacity={routeDraw}
				/>
			</svg>

			<div
				style={{
					width: 1260,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 28,
					textAlign: 'center',
					position: 'relative',
				}}
			>
				<div
					style={{
						transform: `translateY(${(1 - titleEnter) * 30}px) scale(${0.96 + titleEnter * 0.04})`,
						opacity: titleEnter,
						position: 'relative',
					}}
				>
					<div
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: 10,
							background: `${COLORS.blue}14`,
							color: COLORS.blueDark,
							border: `1px solid ${COLORS.cyan}55`,
							padding: '10px 18px',
							borderRadius: 999,
							fontSize: 18,
							fontWeight: 780,
							letterSpacing: '0.12em',
							textTransform: 'uppercase',
							marginBottom: 22,
						}}
					>
						{eyebrow}
					</div>
					<h1
						style={{
							fontSize: 104,
							fontWeight: 780,
							color: COLORS.text,
							margin: 0,
							letterSpacing: '-0.04em',
							lineHeight: 1.02,
						}}
					>
						{titleLine1}
						<br />
						<span style={{color: COLORS.green, position: 'relative'}}>
							{titleLine2}
							<svg
								width="760"
								height="24"
								viewBox="0 0 760 24"
								style={{
									position: 'absolute',
									left: 8,
									bottom: -10,
								}}
							>
								<path
									d="M 6 14 Q 190 2 390 13 T 754 10"
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

				<div
					style={{
						opacity: subEnter,
						transform: `translateY(${(1 - subEnter) * 20}px)`,
						display: 'flex',
						alignItems: 'center',
						gap: 16,
						padding: '16px 30px',
						background: 'rgba(255,255,255,0.86)',
						border: `1px solid ${COLORS.green}33`,
						borderRadius: 999,
						boxShadow: '0 14px 30px rgba(47,127,153,0.09)',
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
							fontSize: 31,
							fontWeight: 640,
							color: COLORS.textSoft,
							letterSpacing: '-0.015em',
						}}
					>
						{subtitle}
					</span>
				</div>

				<div
					style={{
						display: 'flex',
						gap: 14,
						marginTop: 6,
					}}
				>
					{actions.map((action, index) => {
						const chipEnter = spring({
							frame: frame - 34 - index * 8,
							fps,
							config: {damping: 20, stiffness: 78},
						});

						return (
							<div
								key={action}
								style={{
									opacity: chipEnter,
									transform: `translateY(${(1 - chipEnter) * 18}px)`,
									padding: '12px 22px',
									borderRadius: 18,
									background: index === 1 ? COLORS.green : COLORS.bgWhite,
									color: index === 1 ? '#fff' : COLORS.blueDark,
									border: `1px solid ${index === 1 ? COLORS.green : `${COLORS.cyan}44`}`,
									fontSize: 24,
									fontWeight: 760,
									boxShadow: '0 10px 24px rgba(47,127,153,0.08)',
								}}
							>
								{action}
							</div>
						);
					})}
				</div>

				<div
					style={{
						marginTop: 16,
						opacity: logoEnter,
						transform: `translateY(${(1 - logoEnter) * 20}px)`,
					}}
				>
					<LogoDrOcupacional variant="centered" />
				</div>
			</div>
		</AbsoluteFill>
	);
};
