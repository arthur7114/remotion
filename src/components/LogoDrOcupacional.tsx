import React, {useState, useEffect} from 'react';
import {Img, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {COLORS, FONT} from '../theme';

type Props = {
	variant?: 'corner' | 'centered' | 'intro';
	delay?: number;
};

export const LogoDrOcupacional: React.FC<Props> = ({
	variant = 'corner',
	delay = 0,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const opacity = interpolate(frame - delay, [0, 18], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const enter = spring({
		frame: frame - delay,
		fps,
		config: {damping: 18, stiffness: 90},
	});

	const [imageOk, setImageOk] = useState(false);

	useEffect(() => {
		const img = new window.Image();
		img.src = staticFile('logo-dr-ocupacional.png');
		img.onload = () => setImageOk(true);
		img.onerror = () => setImageOk(false);
	}, [variant]);

	if (variant === 'intro') {
		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					opacity,
					transform: `scale(${0.85 + enter * 0.15})`,
				}}
			>
				{imageOk ? (
					<Img
						src={staticFile('logo-dr-ocupacional.png')}
						style={{height: 74, objectFit: 'contain'}}
					/>
				) : (
					<TextLogo size={58} />
				)}
			</div>
		);
	}

	if (variant === 'centered') {
		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 18,
					opacity,
					transform: `scale(${0.85 + enter * 0.15})`,
				}}
			>
				{imageOk ? (
					<Img
						src={staticFile('logo-dr-ocupacional.png')}
						style={{height: 120, objectFit: 'contain'}}
					/>
				) : (
					<TextLogo size={88} />
				)}
			</div>
		);
	}

	return (
		<div
			style={{
				position: 'absolute',
				bottom: 48,
				left: 64,
				opacity,
				display: 'flex',
				alignItems: 'center',
				gap: 12,
				padding: '14px 24px',
				background: 'rgba(255,255,255,0.85)',
				borderRadius: 14,
				boxShadow: '0 6px 24px rgba(47,127,153,0.10)',
				backdropFilter: 'blur(6px)',
			}}
		>
			<Img
				src={staticFile('logo-parceria-aon.png')}
				style={{height: 46, objectFit: 'contain'}}
			/>
		</div>
	);
};

const TextLogo: React.FC<{size: number; light?: boolean}> = ({size, light = false}) => {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'baseline',
				gap: size * 0.12,
				fontFamily: FONT,
				fontStyle: 'italic',
				letterSpacing: '-0.02em',
				lineHeight: 1,
			}}
		>
			{/* small medical cross sticker */}
			<div
				style={{
					width: size * 0.9,
					height: size * 0.9,
					borderRadius: size * 0.22,
					background: light
						? `linear-gradient(135deg, rgba(255,255,255,0.24), ${COLORS.teal})`
						: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.cyan})`,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					marginRight: size * 0.18,
					boxShadow: `0 ${size * 0.05}px ${size * 0.18}px ${
						light ? `${COLORS.teal}55` : `${COLORS.blue}44`
					}`,
				}}
			>
				<svg
					width={size * 0.55}
					height={size * 0.55}
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M10 3h4v6h6v4h-6v6h-4v-6H4V9h6V3z"
						fill="#fff"
					/>
				</svg>
			</div>
			<span style={{fontSize: size, fontWeight: 800, color: light ? '#fff' : COLORS.blue}}>
				dr.
			</span>
			<span
				style={{
					fontSize: size,
					fontWeight: 700,
					color: light ? COLORS.teal : COLORS.cyan,
				}}
			>
				ocupacional
			</span>
		</div>
	);
};
