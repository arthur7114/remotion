import React from 'react';
import {AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {COLORS, FONT} from './theme';
import {BackgroundGrid} from './components/BackgroundGrid';
import {IntroScene} from './components/IntroScene';
import {PostureIncorretaScene} from './components/PostureIncorretaScene';
import {PostureCorretaScene} from './components/PostureCorretaScene';
import {ChecklistScene} from './components/ChecklistScene';
import {ClosingFrame} from './components/ClosingFrame';
import {MascotSpeech} from './components/MascotSpeech';
import {defaultPilulaErgonomiaProps, type PilulaErgonomiaProps} from './pilulaProps';

/**
 * PilulaErgonomia — 1920×1080 | 30fps | 29s (870 frames)
 *
 * Timeline:
 *   0–135   (4.5s)  IntroScene
 * 135–405   (9.0s)  PostureIncorretaScene — postura errada, borda vermelha
 *   ↳ 195–315       MascotSpeech hero/question
 *   ↳ 315–405       MascotSpeech hero/warning
 * 405–560   (5.2s)  PostureCorretaScene — postura correta, borda verde (fadeout ~536)
 *   ↳ 420–560       MascotSpeech hero/success
 * 560–730   (5.7s)  ChecklistScene
 * 730–870   (4.7s)  ClosingFrame
 */
export const PilulaErgonomia: React.FC<PilulaErgonomiaProps> = ({
	intro,
	speech,
	checklist,
	closing,
} = defaultPilulaErgonomiaProps) => {
	const frame = useCurrentFrame();

	const footerLogoOpacity = interpolate(frame, [134, 150, 855, 865], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{backgroundColor: COLORS.bg, fontFamily: FONT}}>
			<BackgroundGrid />

			{/* ══ BLOCO 1 | 0-135 | Intro ══════════════════════════════════════ */}
			<Sequence from={0} durationInFrames={135} layout="none">
				<IntroScene {...intro} />
			</Sequence>

			{/* ══ BLOCO 2 | 135-405 | Postura INCORRETA ═══════════════════════ */}
			<Sequence from={135} durationInFrames={270} layout="none">
				<PostureIncorretaScene />
			</Sequence>

			{/* Fala 1 — pergunta (frames absolutos 195-315) */}
			<Sequence from={195} durationInFrames={120} layout="none">
				<MascotSpeech text={speech.question} tone="question" layout="hero" exitStart={100} exitDuration={16} />
			</Sequence>

			{/* Fala 2 — alerta (frames absolutos 315-405) */}
			<Sequence from={315} durationInFrames={90} layout="none">
				<MascotSpeech text={speech.warning} tone="warning" layout="hero" exitStart={72} exitDuration={16} />
			</Sequence>

			{/* ══ BLOCO 3 | 405-560 | Postura CORRETA ═════════════════════════ */}
			<Sequence from={405} durationInFrames={155} layout="none">
				<PostureCorretaScene totalDuration={155} />
			</Sequence>

			{/* Fala 3 — sucesso (frames absolutos 420-560) */}
			<Sequence from={420} durationInFrames={140} layout="none">
				<MascotSpeech text={speech.success} tone="success" layout="hero" exitStart={118} exitDuration={18} />
			</Sequence>

			{/* ══ BLOCO 4 | 560-730 | Checklist ═══════════════════════════════ */}
			<Sequence from={560} durationInFrames={170} layout="none">
				<ChecklistScene
					eyebrow={checklist.eyebrow}
					title={checklist.title}
					subtitle={checklist.subtitle}
					note={checklist.note}
					items={[checklist.item1, checklist.item2, checklist.item3, checklist.item4]}
				/>
			</Sequence>

			{/* ══ BLOCO 5 | 730-870 | Closing ══════════════════════════════════ */}
			<Sequence from={730} durationInFrames={140} layout="none">
				<ClosingFrame
					titleLine1={closing.titleLine1}
					titleLine2={closing.titleLine2}
					subtitle={closing.subtitle}
				/>
			</Sequence>

			{/* ── Logo parceria — sempre em primeiro plano ─────────────────────── */}
			<div style={{
				opacity: footerLogoOpacity,
				position: 'absolute',
				inset: 0,
				zIndex: 200,
				pointerEvents: 'none',
			}}>
				<div style={{
					position: 'absolute',
					bottom: 48,
					right: 64,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '13px 26px',
					background: 'rgba(255,255,255,0.88)',
					borderRadius: 14,
					boxShadow: '0 6px 24px rgba(47,127,153,0.10)',
					backdropFilter: 'blur(6px)',
				}}>
					<Img
						src={staticFile('logo-parceria-aon.png')}
						style={{width: 378, height: 56, objectFit: 'contain'}}
					/>
				</div>
			</div>
		</AbsoluteFill>
	);
};
