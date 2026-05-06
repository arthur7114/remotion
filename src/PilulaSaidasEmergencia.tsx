import React from 'react';
import {
	AbsoluteFill,
	Img,
	Sequence,
	staticFile,
	useCurrentFrame,
	interpolate,
} from 'remotion';
import {COLORS, FONT} from './theme';
import {BackgroundGrid} from './components/BackgroundGrid';
import {IntroScene} from './components/IntroScene';
import {EmergencyExitScene} from './components/EmergencyExitScene';
import {RiskHighlight} from './components/RiskHighlight';
import {ChecklistScene} from './components/ChecklistScene';
import {ClosingFrame} from './components/ClosingFrame';
import {MascotSpeech} from './components/MascotSpeech';
import {
	defaultPilulaSaidasEmergenciaProps,
	type PilulaSaidasEmergenciaProps,
} from './pilulaProps';

/**
 * PilulaSaidasEmergencia
 * 1920x1080, 30fps, 29s (870 frames)
 *
 * Timeline:
 *   0-135   Intro
 *   135-560 Emergency exit scene
 *   195-315 Risk question with mascot
 *   300-420 Risk evidence with mascot
 *   420-560 Correction confirmation with mascot
 *   560-750 Centered checklist
 *   730-870 Closing without mascot
 */
export const PilulaSaidasEmergencia: React.FC<PilulaSaidasEmergenciaProps> = ({
	intro,
	speech,
	checklist,
	closing,
} = defaultPilulaSaidasEmergenciaProps) => {
	const frame = useCurrentFrame();

	const footerLogoOpacity = interpolate(frame, [134, 135, 485, 500], [0, 1, 1, 0], {
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

			<Sequence from={0} durationInFrames={135} layout="none">
				<IntroScene {...intro} />
			</Sequence>

			<Sequence from={135} durationInFrames={425} layout="none">
				<EmergencyExitScene />
			</Sequence>

			<Sequence from={195} durationInFrames={120} layout="none">
				<RiskHighlight variant="question" text={speech.question} />
			</Sequence>

			<Sequence from={300} durationInFrames={120} layout="none">
				<RiskHighlight variant="evidence" text={speech.warning} />
			</Sequence>

			<Sequence from={420} durationInFrames={140} layout="none">
				<MascotSpeech
					text={speech.success}
					tone="success"
					layout="hero"
					exitStart={118}
					exitDuration={18}
				/>
			</Sequence>

			<Sequence from={560} durationInFrames={190} layout="none">
				<ChecklistScene
					eyebrow={checklist.eyebrow}
					title={checklist.title}
					subtitle={checklist.subtitle}
					note={checklist.note}
					items={[
						checklist.item1,
						checklist.item2,
						checklist.item3,
						checklist.item4,
					]}
				/>
			</Sequence>

			<Sequence from={730} durationInFrames={140} layout="none">
				<ClosingFrame
					titleLine1={closing.titleLine1}
					titleLine2={closing.titleLine2}
					subtitle={closing.subtitle}
				/>
			</Sequence>

			{/* Footer lockup for the main scenes only. */}
			<div style={{opacity: footerLogoOpacity}}>
				<div
					style={{
						position: 'absolute',
						bottom: 48,
						right: 64,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: 430,
						height: 82,
						padding: '13px 26px',
						background: 'rgba(255,255,255,0.85)',
						borderRadius: 14,
						boxShadow: '0 6px 24px rgba(47,127,153,0.10)',
						backdropFilter: 'blur(6px)',
					}}
				>
					<Img
						src={staticFile('logo-dr-cliente-mrv.png')}
						style={{
							width: 378,
							height: 56,
							objectFit: 'contain',
						}}
					/>
				</div>
			</div>
		</AbsoluteFill>
	);
};
