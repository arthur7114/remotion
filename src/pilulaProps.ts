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
		titleLine1: z.string(),
		titleLine2: z.string(),
		subtitle: zTextarea(),
	}),
});

export type PilulaSaidasEmergenciaProps = z.infer<
	typeof pilulaSaidasEmergenciaSchema
>;

export const pilulaEscadasSchema = z.object({
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
		titleLine1: z.string(),
		titleLine2: z.string(),
		subtitle: zTextarea(),
	}),
});

export type PilulaEscadasProps = z.infer<typeof pilulaEscadasSchema>;

export const defaultPilulaEscadasProps: PilulaEscadasProps = {
	intro: {
		eyebrow: 'Pílula de SST',
		titlePrefix: 'Uso seguro de',
		titleHighlight: 'escadas',
		sticker: 'PREVENÇÃO',
	},
	speech: {
		question: 'Você percebe o risco aqui?',
		warning: 'Distração nas escadas causa quedas graves.',
		success: 'Agora sim: suba e desça com segurança.',
	},
	checklist: {
		eyebrow: 'Boas práticas',
		title: 'Atenção em cada degrau.',
		subtitle:
			'Pequenos hábitos evitam quedas e afastamentos. Adote-os sempre.',
		note: 'Se vir risco, sinalize antes de continuar.',
		item1: 'Use o corrimão sempre',
		item2: 'Suba e desça com calma',
		item3: 'Nada de celular na escada',
		item4: 'Atenção total no trajeto',
	},
	closing: {
		titleLine1: 'Segurança começa',
		titleLine2: 'em cada degrau.',
		subtitle: 'Pequenas atitudes evitam grandes acidentes.',
	},
};

export const defaultPilulaSaidasEmergenciaProps: PilulaSaidasEmergenciaProps = {
	intro: {
		eyebrow: 'Mapa de risco',
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
		titleLine1: 'Mantenha os',
		titleLine2: 'acessos livres.',
		subtitle: 'Pequenas atitudes evitam acidentes.',
	},
};

// ─── Prevenção de Incêndio ───────────────────────────────────────────────────

const pilulaBaseSchema = z.object({
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
		titleLine1: z.string(),
		titleLine2: z.string(),
		subtitle: zTextarea(),
	}),
});

export const pilulaIncendioSchema = pilulaBaseSchema;
export type PilulaIncendioProps = z.infer<typeof pilulaIncendioSchema>;

export const defaultPilulaIncendioProps: PilulaIncendioProps = {
	intro: {
		eyebrow: 'Pílula de SST',
		titlePrefix: 'Prevenção de',
		titleHighlight: 'incêndio',
		sticker: 'ATENÇÃO',
	},
	speech: {
		question: 'Você percebe o risco aqui?',
		warning: 'Descuido com fogo pode ser fatal.',
		success: 'Agora sim: extintor sempre acessível.',
	},
	checklist: {
		eyebrow: 'Boas práticas',
		title: 'Prevenção salva vidas.',
		subtitle:
			'Conhecer os equipamentos e as rotas é parte do seu trabalho.',
		note: 'Achou bloqueio? Corrija imediatamente.',
		item1: 'Saiba onde estão os extintores',
		item2: 'Não bloqueie equipamentos de emergência',
		item3: 'Respeite a sinalização',
		item4: 'Fique atento a materiais inflamáveis',
	},
	closing: {
		titleLine1: 'Prevenção é',
		titleLine2: 'responsabilidade de todos.',
		subtitle: 'Pequenas atitudes evitam grandes tragédias.',
	},
};

// ─── Ergonomia e Postura ─────────────────────────────────────────────────────

export const pilulaErgonomiaSchema = pilulaBaseSchema;
export type PilulaErgonomiaProps = z.infer<typeof pilulaErgonomiaSchema>;

export const defaultPilulaErgonomiaProps: PilulaErgonomiaProps = {
	intro: {
		eyebrow: 'Pílula de SST',
		titlePrefix: 'Ergonomia e',
		titleHighlight: 'postura',
		sticker: 'SAÚDE',
	},
	speech: {
		question: 'Você percebe o risco aqui?',
		warning: 'Postura inadequada causa dores e afastamentos.',
		success: 'Agora sim: postura correta, menos lesões.',
	},
	checklist: {
		eyebrow: 'Boas práticas',
		title: 'Cuide do seu corpo.',
		subtitle:
			'Pequenos ajustes no dia a dia evitam dores crônicas e afastamentos.',
		note: 'Cuidado ao movimentar peso: dobre os joelhos.',
		item1: 'Ajuste a altura da cadeira',
		item2: 'Mantenha as costas retas',
		item3: 'Traga o celular para a altura dos olhos',
		item4: 'Evite curvar pescoço e ombros',
	},
	closing: {
		titleLine1: 'Seu corpo',
		titleLine2: 'agradece.',
		subtitle: 'Postura certa hoje, menos dor amanhã.',
	},
};

// ─── Atenção e Comportamento Seguro ──────────────────────────────────────────

export const pilulaAtencaoSchema = pilulaBaseSchema;
export type PilulaAtencaoProps = z.infer<typeof pilulaAtencaoSchema>;

export const defaultPilulaAtencaoProps: PilulaAtencaoProps = {
	intro: {
		eyebrow: 'Pílula de SST',
		titlePrefix: 'Atenção e',
		titleHighlight: 'comportamento seguro',
		sticker: 'FOCO',
	},
	speech: {
		question: 'Você percebe o risco aqui?',
		warning: 'Distração no trabalho pode virar acidente.',
		success: 'Agora sim: foco total na atividade.',
	},
	checklist: {
		eyebrow: 'Boas práticas',
		title: 'Foco é segurança.',
		subtitle:
			'Um momento de distração pode gerar consequências irreversíveis.',
		note: 'Não improvise. Siga sempre o procedimento.',
		item1: 'Evite usar o celular durante atividades',
		item2: 'Foque no que está fazendo',
		item3: 'Siga os procedimentos',
		item4: 'Não improvise',
	},
	closing: {
		titleLine1: 'Atenção total',
		titleLine2: 'em cada tarefa.',
		subtitle: 'Segurança começa com comportamento consciente.',
	},
};
