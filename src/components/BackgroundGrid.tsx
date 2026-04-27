import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {COLORS} from '../theme';

export const BackgroundGrid: React.FC = () => {
	const frame = useCurrentFrame();
	const drift = interpolate(frame, [0, 900], [0, 30]);

	return (
		<AbsoluteFill style={{backgroundColor: COLORS.bg}}>
			<svg
				width="1920"
				height="1080"
				style={{position: 'absolute', inset: 0}}
				viewBox="0 0 1920 1080"
			>
				<defs>
					<pattern
						id="grid-fine"
						width="48"
						height="48"
						patternUnits="userSpaceOnUse"
						patternTransform={`translate(${drift} ${drift})`}
					>
						<path
							d="M 48 0 L 0 0 0 48"
							fill="none"
							stroke={COLORS.blue}
							strokeWidth="0.5"
							opacity="0.07"
						/>
					</pattern>
					<pattern
						id="grid-dots"
						width="96"
						height="96"
						patternUnits="userSpaceOnUse"
						patternTransform={`translate(${drift} ${drift})`}
					>
						<circle cx="0" cy="0" r="1.5" fill={COLORS.blue} opacity="0.15" />
					</pattern>
					<radialGradient id="vignette" cx="50%" cy="50%" r="75%">
						<stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
						<stop offset="100%" stopColor={COLORS.blue} stopOpacity="0.08" />
					</radialGradient>
				</defs>
				<rect width="1920" height="1080" fill="url(#grid-fine)" />
				<rect width="1920" height="1080" fill="url(#grid-dots)" />
				<rect width="1920" height="1080" fill="url(#vignette)" />
			</svg>

			{/* decorative corner shapes */}
			<div
				style={{
					position: 'absolute',
					top: -120,
					left: -120,
					width: 320,
					height: 320,
					borderRadius: '50%',
					background: `radial-gradient(circle, ${COLORS.cyan}33 0%, transparent 70%)`,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					bottom: -160,
					right: -160,
					width: 420,
					height: 420,
					borderRadius: '50%',
					background: `radial-gradient(circle, ${COLORS.blue}25 0%, transparent 70%)`,
				}}
			/>
		</AbsoluteFill>
	);
};
