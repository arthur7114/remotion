import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, interpolate} from 'remotion';
import {COLORS, FONT} from './theme';
import {BackgroundGrid} from './components/BackgroundGrid';
import {LogoDrOcupacional} from './components/LogoDrOcupacional';
import {IntroScene} from './components/IntroScene';
import {EmergencyExitScene} from './components/EmergencyExitScene';
import {RiskHighlight} from './components/RiskHighlight';
import {ChecklistScene} from './components/ChecklistScene';
import {ClosingFrame} from './components/ClosingFrame';

/**
 * PilulaSaidasEmergencia
 * 1920x1080, 30fps, 30s (900 frames)
 *
 * Timeline:
 *   0-90    Intro                ("Pílula de SST" → "Saídas de emergência")
 *   90-690  Emergency exit scene (with obstruction → correction)
 *   240-360 Risk question overlay ("Você percebe o risco?")
 *   360-510 Risk evidence overlay ("Saída obstruída")
 *   690-840 Checklist (4 cards)
 *   840-900 Closing
 */
export const PilulaSaidasEmergencia: React.FC = () => {
	const frame = useCurrentFrame();

	// Show the persistent corner logo only after intro
	const cornerLogoOpacity = interpolate(frame, [80, 110, 830, 855], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: COLORS.bg,
				fontFamily: FONT,
			}}
		>
			<BackgroundGrid />

			<Sequence from={0} durationInFrames={90} layout="none">
				<IntroScene />
			</Sequence>

			<Sequence from={90} durationInFrames={600} layout="none">
				<EmergencyExitScene />
			</Sequence>

			<Sequence from={240} durationInFrames={120} layout="none">
				<RiskHighlight variant="question" />
			</Sequence>

			<Sequence from={360} durationInFrames={150} layout="none">
				<RiskHighlight variant="evidence" />
			</Sequence>

			<Sequence from={690} durationInFrames={150} layout="none">
				<ChecklistScene />
			</Sequence>

			<Sequence from={840} durationInFrames={60} layout="none">
				<ClosingFrame />
			</Sequence>

			{/* Persistent corner logo (hidden during intro and closing) */}
			<div style={{opacity: cornerLogoOpacity}}>
				<LogoDrOcupacional variant="corner" />
			</div>
		</AbsoluteFill>
	);
};
