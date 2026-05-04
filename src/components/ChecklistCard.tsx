import React from 'react';
import {useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {COLORS, FONT} from '../theme';

type Props = {
	number: number;
	text: string;
	delay: number;
	icon: React.ReactNode;
	compact?: boolean;
};

export const ChecklistCard: React.FC<Props> = ({
	number,
	text,
	delay,
	icon,
	compact = false,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const enter = spring({
		frame: frame - delay,
		fps,
		config: {damping: 22, stiffness: 72},
	});

	const checkProgress = interpolate(
		frame - delay,
		[24, 46],
		[0, 1],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	return (
		<div
			style={{
				transform: `translateX(${(1 - enter) * -46}px) scale(${0.97 + enter * 0.03})`,
				opacity: enter,
				display: 'flex',
				alignItems: 'center',
				gap: compact ? 17 : 22,
				background: 'rgba(255,255,255,0.92)',
				padding: compact ? '18px 21px' : '23px 30px',
				borderRadius: compact ? 18 : 16,
				boxShadow: '0 12px 26px rgba(47,127,153,0.08)',
				border: `1px solid ${COLORS.green}20`,
				borderLeft: `4px solid ${COLORS.green}`,
				width: compact ? 610 : 720,
			}}
		>
			{/* Number badge */}
			<div
				style={{
					width: compact ? 44 : 56,
					height: compact ? 44 : 56,
					borderRadius: compact ? 12 : 14,
					background: `${COLORS.cyan}1F`,
					color: COLORS.blue,
					fontSize: compact ? 21 : 27,
					fontWeight: 760,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexShrink: 0,
					fontFamily: FONT,
					boxShadow: 'none',
				}}
			>
				{number}
			</div>

			{/* Icon */}
			<div
				style={{
					width: compact ? 40 : 48,
					height: compact ? 40 : 48,
					borderRadius: compact ? 10 : 12,
					background: `${COLORS.green}12`,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexShrink: 0,
				}}
			>
				{icon}
			</div>

			{/* Text */}
			<div
				style={{
					fontSize: compact ? 22 : 27,
					fontWeight: 660,
					color: COLORS.text,
					fontFamily: FONT,
					letterSpacing: '-0.01em',
					flex: 1,
					lineHeight: 1.2,
				}}
			>
				{text}
			</div>

			{/* Check */}
			<div
				style={{
					width: compact ? 36 : 46,
					height: compact ? 36 : 46,
					borderRadius: '50%',
					background: `${COLORS.green}14`,
					border: `2px solid ${COLORS.green}66`,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexShrink: 0,
					boxShadow: 'none',
				}}
			>
				<svg width="25" height="25" viewBox="0 0 24 24" fill="none">
					<path
						d="M 5 12 L 10 17 L 19 7"
						stroke={COLORS.green}
						strokeWidth="3"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeDasharray="30"
						strokeDashoffset={30 * (1 - checkProgress)}
					/>
				</svg>
			</div>
		</div>
	);
};
