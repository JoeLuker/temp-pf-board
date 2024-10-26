// src/lib/components/shared/types.ts
export interface ValueEditorProps {
	value: number | string;
	onChange: (value: number | string) => void;
	label?: string;
	min?: number;
	max?: number;
	type?: 'number' | 'text';
}

export interface ModifierPillProps {
	value: number;
	label?: string;
	className?: string;
}

export interface StatBlockProps {
	label: string;
	value: number | string;
	modifier?: number;
	description?: string;
}

export interface ParchmentCellProps {
	title?: string;
	collapsible?: boolean;
	collapsed?: boolean;
	padding?: boolean;
	className?: string;
}
