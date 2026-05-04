import React from 'react';
import {Composition} from 'remotion';
import {PilulaSaidasEmergencia} from './PilulaSaidasEmergencia';
import {
	defaultPilulaSaidasEmergenciaProps,
	pilulaSaidasEmergenciaSchema,
} from './pilulaProps';

export const Root: React.FC = () => {
	return (
		<>
			<Composition
				id="PilulaSaidasEmergencia"
				component={PilulaSaidasEmergencia}
				durationInFrames={750}
				fps={30}
				width={1920}
				height={1080}
				schema={pilulaSaidasEmergenciaSchema}
				defaultProps={defaultPilulaSaidasEmergenciaProps}
			/>
		</>
	);
};
