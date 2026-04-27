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

export const ChecklistScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const titleEnter = spring({frame, fps, config: {damping: 18}});
	const exit = interpolate(frame, [130, 150], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const items = [
		{number: 1, text: 'Nunca bloqueie as saídas', icon: <IconBlock />},
		{number: 2, text: 'Conheça as rotas de fuga', icon: <IconRoute />},
		{number: 3, text: 'Respeite a sinalização', icon: <IconSign />},
		{number: 4, text: 'Mantenha os acessos livres', icon: <IconDoor />},
	];

	return (
		<AbsoluteFill
			style={{
				fontFamily: FONT,
				opacity: exit,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				paddingTop: 60,
			}}
		>
			{/* Title */}
			<div
				style={{
					transform: `translateY(${(1 - titleEnter) * -30}px)`,
					opacity: titleEnter,
					marginBottom: 44,
					textAlign: 'center',
				}}
			>
				<div
					style={{
						display: 'inline-flex',
						alignItems: 'center',
						gap: 12,
						background: COLORS.green,
						color: '#fff',
						padding: '10px 22px',
						borderRadius: 999,
						fontSize: 22,
						fontWeight: 700,
						letterSpacing: '0.16em',
						textTransform: 'uppercase',
						marginBottom: 18,
						boxShadow: '0 8px 24px rgba(89,185,90,0.35)',
					}}
				>
					Checklist de segurança
				</div>
				<h2
					style={{
						fontSize: 76,
						fontWeight: 800,
						color: COLORS.text,
						margin: 0,
						letterSpacing: '-0.025em',
					}}
				>
					O que <span style={{color: COLORS.blue}}>fazer</span> sempre
				</h2>
			</div>

			{/* Checklist grid */}
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					gap: 26,
					padding: '0 100px',
				}}
			>
				{items.map((item, i) => (
					<ChecklistCard
						key={item.number}
						number={item.number}
						text={item.text}
						icon={item.icon}
						delay={10 + i * 12}
					/>
				))}
			</div>
		</AbsoluteFill>
	);
};
