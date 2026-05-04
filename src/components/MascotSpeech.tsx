import React from 'react';
import {
	Img,
	interpolate,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS, FONT} from '../theme';

type Props = {
	text: string;
	delay?: number;
	tone?: 'question' | 'warning' | 'success' | 'guide';
	layout?: 'hero' | 'mini';
	exitStart?: number;
	exitDuration?: number;
};

const toneConfig = {
	question: {label: 'Atenção', color: COLORS.red, border: COLORS.cyan},
	warning: {label: 'Risco', color: COLORS.red, border: COLORS.red},
	success: {label: 'Corrigido', color: COLORS.green, border: COLORS.green},
	guide: {label: 'Dica rápida', color: COLORS.blue, border: COLORS.cyan},
} as const;

const layoutConfig = {
	hero: {
		mascotLeft: 42,
		mascotBottom: -150,
		mascotWidth: 730,
		bubbleLeft: 320,
		bubbleTop: 126,
		bubbleWidth: 620,
		bubblePadding: '26px 32px 30px',
		fontSize: 48,
		labelFontSize: 16,
	},
	mini: {
		mascotLeft: 34,
		mascotBottom: -88,
		mascotWidth: 420,
		bubbleLeft: 252,
		bubbleTop: 142,
		bubbleWidth: 430,
		bubblePadding: '18px 22px 22px',
		fontSize: 29,
		labelFontSize: 13,
	},
} as const;

export const MascotSpeech: React.FC<Props> = ({
	text,
	delay = 0,
	tone = 'question',
	layout = 'hero',
	exitStart,
	exitDuration = 16,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const localFrame = frame - delay;
	const toneStyle = toneConfig[tone];
	const layoutStyle = layoutConfig[layout];

	const enter = spring({
		frame: localFrame,
		fps,
		config: {damping: 22, stiffness: 70},
	});
	const bubbleEnter = spring({
		frame: localFrame - 4,
		fps,
		config: {damping: 22, stiffness: 72},
	});

	const opacity = interpolate(localFrame, [0, 18], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const exitOpacity =
		exitStart === undefined
			? 1
			: interpolate(localFrame, [exitStart, exitStart + exitDuration], [1, 0], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				});
	const gentleBob = Math.sin((Math.max(localFrame, 0) / fps) * Math.PI * 1.05) * 3;

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				fontFamily: FONT,
				pointerEvents: 'none',
			}}
		>
			<div
				style={{
					position: 'absolute',
					left: layoutStyle.mascotLeft,
					bottom: layoutStyle.mascotBottom,
					width: layoutStyle.mascotWidth,
					opacity: opacity * exitOpacity,
					transform: `translateY(${(1 - enter) * 34 + gentleBob}px) scale(${
						0.97 + enter * 0.03
					})`,
					transformOrigin: '50% 100%',
					filter: 'drop-shadow(0 18px 26px rgba(38,50,56,0.16))',
				}}
			>
				<Img
					src={staticFile('mascote-dr-institucional.png')}
					style={{
						width: '100%',
						height: 'auto',
						display: 'block',
					}}
				/>
			</div>

			<div
				style={{
					position: 'absolute',
					left: layoutStyle.bubbleLeft,
					top: layoutStyle.bubbleTop,
					width: layoutStyle.bubbleWidth,
					opacity: bubbleEnter * exitOpacity,
					transform: `translateY(${(1 - bubbleEnter) * 18}px) scale(${
						0.98 + bubbleEnter * 0.02
					})`,
					transformOrigin: '18% 100%',
				}}
			>
				<div
					style={{
						position: 'relative',
						background: 'rgba(255,255,255,0.94)',
						border: `2px solid ${toneStyle.border}88`,
						borderRadius: 22,
						padding: layoutStyle.bubblePadding,
						boxShadow: '0 14px 32px rgba(38,50,56,0.10)',
					}}
				>
					<div
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: 8,
							background: `${toneStyle.color}1A`,
							color: toneStyle.color,
							padding: '6px 12px',
							borderRadius: 999,
							fontSize: layoutStyle.labelFontSize,
							fontWeight: 800,
							letterSpacing: '0.12em',
							textTransform: 'uppercase',
							marginBottom: 12,
						}}
					>
						<span
							style={{
								width: 11,
								height: 11,
								borderRadius: '50%',
								background: toneStyle.color,
							}}
						/>
						{toneStyle.label}
					</div>
					<div
						style={{
							fontSize: layoutStyle.fontSize,
							fontWeight: 760,
							lineHeight: 1.12,
							color: COLORS.text,
							letterSpacing: 0,
						}}
					>
						{text}
					</div>
					<div
						style={{
							position: 'absolute',
							left: 98,
							bottom: -34,
							width: 46,
							height: 46,
							background: 'rgba(255,255,255,0.94)',
							borderRight: `2px solid ${toneStyle.border}88`,
							borderBottom: `2px solid ${toneStyle.border}88`,
							transform: 'rotate(45deg)',
							borderBottomRightRadius: 10,
						}}
					/>
				</div>
			</div>
		</div>
	);
};
