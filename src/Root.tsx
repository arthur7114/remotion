import React from 'react';
import {Composition} from 'remotion';
import {PilulaSaidasEmergencia} from './PilulaSaidasEmergencia';

export const Root: React.FC = () => {
	return (
		<>
			<Composition
				id="PilulaSaidasEmergencia"
				component={PilulaSaidasEmergencia}
				durationInFrames={900}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{}}
			/>
		</>
	);
};
