import React from 'react';
import {
	AbsoluteFill,
	Easing,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS, FONT} from '../theme';
import {MascotSpeech} from './MascotSpeech';

type Props = {
	variant: 'question' | 'evidence';
	text: string;
};

export const RiskHighlight: React.FC<Props> = ({variant, text}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const enter = spring({frame, fps, config: {damping: 22, stiffness: 74}});
	const exitStart = variant === 'question' ? 88 : 90;
	const exit = interpolate(frame, [exitStart, exitStart + 17], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const pulse = Math.sin((frame / fps) * Math.PI * 2.4) * 0.5 + 0.5;
	const circleDraw = interpolate(frame, [14, 54], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const arrowDraw = interpolate(frame, [26, 66], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});

	if (variant === 'question') {
		return (
			<AbsoluteFill style={{fontFamily: FONT, opacity: exit}}>
				<MascotSpeech text={text} />
				<svg
					width="1920"
					height="1080"
					viewBox="0 0 1920 1080"
					style={{position: 'absolute', inset: 0}}
				>
					<g opacity={circleDraw} style={{transformOrigin: '1080px 690px'}}>
						<ellipse
							cx="1080"
							cy="690"
							rx="290"
							ry="200"
							fill="none"
							stroke={COLORS.red}
							strokeWidth={6 + pulse * 3}
							strokeDasharray="2200"
							strokeDashoffset={2200 * (1 - circleDraw)}
							opacity="0.9"
							transform="rotate(-6 1080 690)"
						/>
						<ellipse
							cx="1080"
							cy="690"
							rx="310"
							ry="220"
							fill="none"
							stroke={COLORS.red}
							strokeWidth="3"
							strokeDasharray="2300"
							strokeDashoffset={2300 * (1 - circleDraw)}
							opacity="0.4"
							transform="rotate(4 1080 690)"
						/>
					</g>

					<g opacity={arrowDraw}>
						<path
							d="M 760 480 Q 880 540 950 600"
							stroke={COLORS.red}
							strokeWidth="8"
							fill="none"
							strokeLinecap="round"
							strokeDasharray="220"
							strokeDashoffset={220 * (1 - arrowDraw)}
						/>
						{arrowDraw > 0.85 && (
							<g
								transform="translate(950, 600) rotate(50)"
								opacity={(arrowDraw - 0.85) / 0.15}
							>
								<path d="M 0 0 L -22 -10 L -16 0 L -22 10 Z" fill={COLORS.red} />
							</g>
						)}
					</g>
				</svg>
			</AbsoluteFill>
		);
	}

	return (
		<AbsoluteFill style={{fontFamily: FONT, opacity: exit}}>
			<MascotSpeech
				text={text}
				tone="warning"
				layout="hero"
			/>
			<svg
				width="1920"
				height="1080"
				viewBox="0 0 1920 1080"
				style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}
			>
				<defs>
					<pattern
						id="caution-stripes"
						width="40"
						height="40"
						patternUnits="userSpaceOnUse"
						patternTransform="rotate(-45)"
					>
						<rect width="40" height="40" fill="transparent" />
						<rect width="20" height="40" fill={COLORS.red} opacity="0.18" />
					</pattern>
				</defs>

				<g opacity={enter * 0.85}>
					<rect
						x="850"
						y="510"
						width="490"
						height="340"
						fill="url(#caution-stripes)"
						rx="14"
					/>
					<rect
						x="850"
						y="510"
						width="490"
						height="340"
						fill="none"
						stroke={COLORS.red}
						strokeWidth="5"
						strokeDasharray="18 12"
						rx="14"
					/>
				</g>
			</svg>
		</AbsoluteFill>
	);
};
