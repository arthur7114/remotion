import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {COLORS, FONT} from '../theme';
import {ChecklistCard} from './ChecklistCard';

const IconBlock: React.FC = () => (
	<svg width="32" height="32" viewBox="0 0 24 24" fill="none">
		<circle cx="12" cy="12" r="9" stroke={COLORS.green} strokeWidth="2.5" />
		<line x1="6" y1="6" x2="18" y2="18" stroke={COLORS.green} strokeWidth="2.5" strokeLinecap="round" />
	</svg>
);

const IconRoute: React.FC = () => (
	<svg width="32" height="32" viewBox="0 0 24 24" fill="none">
		<path
			d="M 4 6 Q 4 4 6 4 L 12 4 Q 14 4 14 6 L 14 14 Q 14 16 16 16 L 20 16"
			stroke={COLORS.green}
			strokeWidth="2.5"
			fill="none"
			strokeLinecap="round"
		/>
		<circle cx="4" cy="4" r="2" fill={COLORS.green} />
		<path d="M 17 13 L 21 16 L 17 19" stroke={COLORS.green} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const IconSign: React.FC = () => (
	<svg width="32" height="32" viewBox="0 0 24 24" fill="none">
		<rect x="3" y="6" width="18" height="11" rx="2" stroke={COLORS.green} strokeWidth="2.5" />
		<line x1="12" y1="17" x2="12" y2="21" stroke={COLORS.green} strokeWidth="2.5" strokeLinecap="round" />
		<path d="M 8 11 L 14 11 L 14 9 L 17 12 L 14 15 L 14 13 L 8 13 Z" fill={COLORS.green} />
	</svg>
);

const IconDoor: React.FC = () => (
	<svg width="32" height="32" viewBox="0 0 24 24" fill="none">
		<rect x="5" y="3" width="14" height="18" rx="1" stroke={COLORS.green} strokeWidth="2.5" />
		<circle cx="15" cy="12" r="1.2" fill={COLORS.green} />
		<path d="M 5 21 L 19 21" stroke={COLORS.green} strokeWidth="2.5" strokeLinecap="round" />
	</svg>
);

type Props = {
	eyebrow: string;
	title: string;
	subtitle: string;
	note: string;
	items: [string, string, string, string];
};

export const ChecklistScene: React.FC<Props> = ({
	eyebrow,
	title,
	subtitle,
	note,
	items: itemTexts,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const titleEnter = spring({frame, fps, config: {damping: 22, stiffness: 74}});
	const noteEnter = spring({
		frame: frame - 58,
		fps,
		config: {damping: 23, stiffness: 68},
	});
	const sceneOpacity = interpolate(frame, [0, 24, 116, 130], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const routeDraw = interpolate(frame, [18, 96], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const scanX = interpolate(frame, [18, 108], [-120, 1180], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const items = [
		{number: 1, text: itemTexts[0], icon: <IconBlock />},
		{number: 2, text: itemTexts[1], icon: <IconDoor />},
		{number: 3, text: itemTexts[2], icon: <IconSign />},
		{number: 4, text: itemTexts[3], icon: <IconRoute />},
	];

	return (
		<AbsoluteFill
			style={{
				fontFamily: FONT,
				opacity: sceneOpacity,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '76px 120px 84px',
			}}
		>
			<svg
				width="1240"
				height="560"
				viewBox="0 0 1240 560"
				style={{
					position: 'absolute',
					top: 292,
					left: 340,
					opacity: 0.68,
				}}
			>
				<path
					d="M 60 84 C 260 24 376 184 548 128 S 852 38 1048 104 C 1160 142 1194 220 1136 292 C 1024 430 770 332 632 422 C 524 492 382 516 176 468"
					fill="none"
					stroke={COLORS.cyan}
					strokeWidth="8"
					strokeLinecap="round"
					strokeDasharray="1500"
					strokeDashoffset={1500 * (1 - routeDraw)}
					opacity="0.22"
				/>
				<circle cx={Math.min(Math.max(scanX, 40), 1180)} cy="112" r="10" fill={COLORS.green} opacity="0.5" />
			</svg>

			<div
				style={{
					transform: `translateY(${(1 - titleEnter) * -28}px)`,
					opacity: titleEnter,
					marginBottom: 34,
					textAlign: 'center',
					position: 'relative',
				}}
			>
				<div
					style={{
						display: 'inline-flex',
						alignItems: 'center',
						gap: 12,
						background: COLORS.green,
						color: '#fff',
						padding: '9px 20px',
						borderRadius: 999,
						fontSize: 16,
						fontWeight: 800,
						letterSpacing: '0.14em',
						textTransform: 'uppercase',
						marginBottom: 20,
						boxShadow: '0 10px 24px rgba(89,185,90,0.22)',
					}}
				>
					{eyebrow}
				</div>
				<h2
					style={{
						fontSize: 64,
						fontWeight: 780,
						color: COLORS.text,
						margin: 0,
						letterSpacing: '-0.035em',
						lineHeight: 1.02,
					}}
				>
					{title}
				</h2>
				<p
					style={{
						fontSize: 28,
						fontWeight: 560,
						color: COLORS.textSoft,
						margin: '16px 0 0',
						letterSpacing: '-0.015em',
					}}
				>
					{subtitle}
				</p>
			</div>

			<div
				style={{
					position: 'relative',
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					gap: 22,
				}}
			>
				<div
					style={{
						position: 'absolute',
						left: scanX,
						top: -16,
						width: 130,
						height: 286,
						background: 'linear-gradient(90deg, transparent, rgba(69,200,200,0.18), transparent)',
						borderRadius: 28,
						filter: 'blur(1px)',
					}}
				/>
				{items.map((item, i) => (
					<ChecklistCard
						key={item.number}
						number={item.number}
						text={item.text}
						icon={item.icon}
						delay={14 + i * 10}
						compact
					/>
				))}
			</div>

			<div
				style={{
					opacity: noteEnter,
					transform: `translateY(${(1 - noteEnter) * 16}px)`,
					marginTop: 28,
					padding: '13px 24px',
					borderRadius: 999,
					background: 'rgba(255,255,255,0.78)',
					border: `1px solid ${COLORS.cyan}44`,
					color: COLORS.blueDark,
					fontSize: 24,
					fontWeight: 680,
					boxShadow: '0 12px 28px rgba(47,127,153,0.08)',
				}}
			>
				{note}
			</div>
		</AbsoluteFill>
	);
};
