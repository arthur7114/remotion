import React from 'react';
import {useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {COLORS, FONT} from '../theme';

type Props = {
	number: number;
	text: string;
	delay: number;
	icon: React.ReactNode;
};

export const ChecklistCard: React.FC<Props> = ({number, text, delay, icon}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const enter = spring({
		frame: frame - delay,
		fps,
		config: {damping: 16, stiffness: 110},
	});

	const checkProgress = interpolate(
		frame - delay,
		[18, 36],
		[0, 1],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	return (
		<div
			style={{
				transform: `translateX(${(1 - enter) * -80}px) scale(${0.92 + enter * 0.08})`,
				opacity: enter,
				display: 'flex',
				alignItems: 'center',
				gap: 28,
				background: COLORS.bgWhite,
				padding: '26px 36px',
				borderRadius: 18,
				boxShadow: '0 12px 32px rgba(47,127,153,0.12)',
				borderLeft: `8px solid ${COLORS.green}`,
				width: 760,
			}}
		>
			{/* Number badge */}
			<div
				style={{
					width: 64,
					height: 64,
					borderRadius: 16,
					background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.cyan})`,
					color: '#fff',
					fontSize: 32,
					fontWeight: 800,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexShrink: 0,
					fontFamily: FONT,
					boxShadow: `0 6px 16px ${COLORS.blue}55`,
				}}
			>
				{number}
			</div>

			{/* Icon */}
			<div
				style={{
					width: 56,
					height: 56,
					borderRadius: 14,
					background: `${COLORS.green}1A`,
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
					fontSize: 30,
					fontWeight: 700,
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
					width: 56,
					height: 56,
					borderRadius: '50%',
					background: COLORS.green,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexShrink: 0,
					boxShadow: `0 6px 14px ${COLORS.green}55`,
				}}
			>
				<svg width="32" height="32" viewBox="0 0 24 24" fill="none">
					<path
						d="M 5 12 L 10 17 L 19 7"
						stroke="#fff"
						strokeWidth="3.5"
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
