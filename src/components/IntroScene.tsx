import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS, FONT} from '../theme';
import {LogoDrOcupacional} from './LogoDrOcupacional';

type Props = {
	eyebrow?: string;
	titlePrefix?: string;
	titleHighlight?: string;
	sticker?: string;
};

/**
 * Intro premium da branch Video-B, estendida para 135 frames.
 */
export const IntroScene: React.FC<Props> = ({
	eyebrow = 'Mapa de risco',
	titlePrefix = 'Saídas de',
	titleHighlight = 'emergência',
	sticker = 'SEGURANÇA',
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const bgOpacity = interpolate(frame, [0, 14], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const logoEnter = spring({
		frame: frame - 4,
		fps,
		config: {damping: 18, stiffness: 80},
	});
	const tagEnter = spring({frame: frame - 16, fps, config: {damping: 18}});
	const titleEnter = spring({
		frame: frame - 26,
		fps,
		config: {damping: 16, stiffness: 90},
	});
	const underlineDraw = interpolate(frame, [38, 66], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const exitFade = interpolate(frame, [124, 135], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const stickerEnter = spring({frame: frame - 30, fps, config: {damping: 12}});
	const stickerRotate = interpolate(stickerEnter, [0, 1], [-20, -8]);
	const particleProgress = interpolate(frame, [0, 30], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{opacity: exitFade}}>
			<AbsoluteFill
				style={{
					background: `linear-gradient(135deg, ${COLORS.bgWhite} 0%, ${COLORS.bg} 58%, #E5F6F7 100%)`,
					opacity: bgOpacity,
				}}
			/>

			<svg
				width="1920"
				height="1080"
				style={{position: 'absolute', inset: 0, opacity: particleProgress}}
				viewBox="0 0 1920 1080"
			>
				<circle cx="120" cy="120" r="60" fill={COLORS.teal} opacity="0.12" />
				<circle cx="1800" cy="960" r="90" fill={COLORS.teal} opacity="0.1" />
				<circle cx="1700" cy="140" r="44" fill={COLORS.brandBlue} opacity="0.14" />
				<circle cx="200" cy="900" r="70" fill={COLORS.brandBlue} opacity="0.1" />
				<line x1="0" y1="0" x2="600" y2="600" stroke={COLORS.teal} strokeWidth="1" opacity="0.11" />
				<line x1="1920" y1="0" x2="1320" y2="600" stroke={COLORS.teal} strokeWidth="1" opacity="0.11" />
				{[...Array(8)].map((_, i) =>
					[...Array(5)].map((__, j) => (
						<circle
							key={`${i}-${j}`}
							cx={180 + i * 220}
							cy={160 + j * 190}
							r="2"
							fill={COLORS.teal}
							opacity="0.22"
						/>
					))
				)}
			</svg>

			<div
				style={{
					position: 'absolute',
					top: 56,
					left: 80,
					opacity: logoEnter,
					transform: `translateY(${(1 - logoEnter) * -20}px)`,
				}}
			>
				<LogoDrOcupacional variant="intro" delay={0} />
			</div>

			<AbsoluteFill
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					fontFamily: FONT,
				}}
			>
				<div
					style={{
						transform: `translateY(${(1 - tagEnter) * -30}px) scale(${tagEnter})`,
						opacity: tagEnter,
						marginBottom: 40,
					}}
				>
					<div
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: 14,
							padding: '13px 28px',
							background: 'rgba(255,255,255,0.76)',
							borderRadius: 999,
							border: `1.5px solid ${COLORS.teal}55`,
							boxShadow: '0 12px 32px rgba(47,127,153,0.11)',
							backdropFilter: 'blur(8px)',
						}}
					>
						<div
							style={{
								width: 13,
								height: 13,
								borderRadius: '50%',
								background: COLORS.teal,
								boxShadow: `0 0 0 5px ${COLORS.teal}33`,
							}}
						/>
						<span
							style={{
								fontSize: 24,
								fontWeight: 700,
								color: COLORS.teal,
								letterSpacing: '0.22em',
								textTransform: 'uppercase',
							}}
						>
							{eyebrow}
						</span>
					</div>
				</div>

				<div
					style={{
						transform: `translateY(${(1 - titleEnter) * 44}px)`,
						opacity: titleEnter,
						textAlign: 'center',
						position: 'relative',
					}}
				>
					<h1
						style={{
							fontSize: 148,
							fontWeight: 800,
							color: COLORS.text,
							margin: 0,
							letterSpacing: '-0.03em',
							lineHeight: 1.04,
							textShadow: '0 8px 34px rgba(47,127,153,0.12)',
						}}
					>
						{titlePrefix}{' '}
						<span style={{color: COLORS.teal, position: 'relative'}}>
							{titleHighlight}
							<svg
								width="820"
								height="24"
								viewBox="0 0 820 24"
								style={{position: 'absolute', left: 0, bottom: -8}}
							>
								<path
									d="M 6 16 Q 210 4 420 13 T 814 11"
									stroke={COLORS.teal}
									strokeWidth="8"
									strokeLinecap="round"
									fill="none"
									strokeDasharray="860"
									strokeDashoffset={860 * (1 - underlineDraw)}
								/>
							</svg>
						</span>
					</h1>
				</div>

				<div
					style={{
						position: 'absolute',
						top: 240,
						right: 300,
						transform: `rotate(${stickerRotate}deg) scale(${stickerEnter})`,
						opacity: stickerEnter,
					}}
				>
					<div
						style={{
							background: COLORS.teal,
							color: '#fff',
							padding: '11px 24px',
							borderRadius: 14,
							fontSize: 22,
							fontWeight: 800,
							letterSpacing: '0.08em',
							boxShadow: `0 10px 28px ${COLORS.teal}55`,
						}}
					>
						{sticker}
					</div>
				</div>
			</AbsoluteFill>

			<div
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					height: 5,
					background: `linear-gradient(to right, transparent, ${COLORS.teal}, transparent)`,
					opacity: particleProgress * 0.7,
				}}
			/>
		</AbsoluteFill>
	);
};
