import React from 'react';
import {Composition} from 'remotion';
import {PilulaSaidasEmergencia} from './PilulaSaidasEmergencia';
import {PilulaEscadas} from './PilulaEscadas';
import {PilulaIncendio} from './PilulaIncendio';
import {PilulaErgonomia} from './PilulaErgonomia';
import {PilulaAtencao} from './PilulaAtencao';
import {
	defaultPilulaSaidasEmergenciaProps,
	pilulaSaidasEmergenciaSchema,
	defaultPilulaEscadasProps,
	pilulaEscadasSchema,
	defaultPilulaIncendioProps,
	pilulaIncendioSchema,
	defaultPilulaErgonomiaProps,
	pilulaErgonomiaSchema,
	defaultPilulaAtencaoProps,
	pilulaAtencaoSchema,
} from './pilulaProps';

export const Root: React.FC = () => {
	return (
		<>
			<Composition
				id="PilulaSaidasEmergencia"
				component={PilulaSaidasEmergencia}
				durationInFrames={870}
				fps={30}
				width={1920}
				height={1080}
				schema={pilulaSaidasEmergenciaSchema}
				defaultProps={defaultPilulaSaidasEmergenciaProps}
			/>
			<Composition
				id="PilulaEscadas"
				component={PilulaEscadas}
				durationInFrames={870}
				fps={30}
				width={1920}
				height={1080}
				schema={pilulaEscadasSchema}
				defaultProps={defaultPilulaEscadasProps}
			/>
			<Composition
				id="PilulaIncendio"
				component={PilulaIncendio}
				durationInFrames={870}
				fps={30}
				width={1920}
				height={1080}
				schema={pilulaIncendioSchema}
				defaultProps={defaultPilulaIncendioProps}
			/>
			<Composition
				id="PilulaErgonomia"
				component={PilulaErgonomia}
				durationInFrames={870}
				fps={30}
				width={1920}
				height={1080}
				schema={pilulaErgonomiaSchema}
				defaultProps={defaultPilulaErgonomiaProps}
			/>
			<Composition
				id="PilulaAtencao"
				component={PilulaAtencao}
				durationInFrames={870}
				fps={30}
				width={1920}
				height={1080}
				schema={pilulaAtencaoSchema}
				defaultProps={defaultPilulaAtencaoProps}
			/>
		</>
	);
};
