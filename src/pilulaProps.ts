import {zTextarea} from '@remotion/zod-types';
import {z} from 'zod';

export const pilulaSaidasEmergenciaSchema = z.object({
	intro: z.object({
		eyebrow: z.string(),
		titlePrefix: z.string(),
		titleHighlight: z.string(),
		sticker: z.string(),
	}),
	speech: z.object({
		question: zTextarea(),
		warning: zTextarea(),
		success: zTextarea(),
	}),
	checklist: z.object({
		eyebrow: z.string(),
		title: z.string(),
		subtitle: zTextarea(),
		note: zTextarea(),
		item1: z.string(),
		item2: z.string(),
		item3: z.string(),
		item4: z.string(),
	}),
	closing: z.object({
		eyebrow: z.string(),
		titleLine1: z.string(),
		titleLine2: z.string(),
		subtitle: zTextarea(),
		action1: z.string(),
		action2: z.string(),
		action3: z.string(),
	}),
});

export type PilulaSaidasEmergenciaProps = z.infer<
	typeof pilulaSaidasEmergenciaSchema
>;

export const defaultPilulaSaidasEmergenciaProps: PilulaSaidasEmergenciaProps = {
	intro: {
		eyebrow: 'Pílula de SST',
		titlePrefix: 'Saídas de',
		titleHighlight: 'emergência',
		sticker: 'SEGURANÇA',
	},
	speech: {
		question: 'Você percebe o que está errado?',
		warning: 'Saída obstruída atrasa a evacuação.',
		success: 'Agora sim: rota livre.',
	},
	checklist: {
		eyebrow: 'Checagem de 30 segundos',
		title: 'Saída livre não é detalhe.',
		subtitle:
			'Antes de encerrar a atividade, olhe para o acesso como quem vai precisar passar por ele.',
		note: 'Se bloqueou, corrija antes de seguir.',
		item1: 'Retire caixas, pallets e cabos do caminho',
		item2: 'Teste se a porta abre sem esforço',
		item3: 'Confira placas e luzes visíveis',
		item4: 'Avise a equipe se algo voltar a bloquear',
	},
	closing: {
		eyebrow: 'Rotina boa aparece na passagem livre',
		titleLine1: 'Saídas livres.',
		titleLine2: 'Pessoas seguras.',
		subtitle:
			'Se a rota estiver livre, a resposta é mais rápida quando importa.',
		action1: 'Olhou',
		action2: 'Liberou',
		action3: 'Combinou',
	},
};
