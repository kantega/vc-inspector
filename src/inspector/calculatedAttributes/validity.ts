import { ErrorReason, Result } from './errors';
import { Standards } from './standards';

export type ParserResult<T> = Partial<Record<Standards, Result<T>>>;
export type ReasonedOptional<T> = { kind: 'some'; value: T } | { kind: 'none'; reason: string };

export type Validity = {
	isValid: boolean;
	validityDates: ValidityDates;
};

export type ValidityDates = {
	validFrom: ReasonedOptional<Date>;
	validUntil: ReasonedOptional<Date>;
};

export type InputType = Record<string, string>;

const ValidityParsers = [
	{ standard: Standards.W3C_V2, parser: W3CV2ValidityDatesParser },
	{ standard: Standards.W3C_V1, parser: W3CV1ValidityDatesParser },
	{ standard: Standards.EIDAS2_0, parser: W3CV1ValidityDatesParser },
];

export function parseValidity(parsedJson: InputType): ParserResult<Validity> {
	const results: ParserResult<Validity> = {};

	for (const parser of ValidityParsers) {
		results[parser.standard];
		const validityDates = parser.parser(parsedJson);

		if (validityDates.kind === 'error') {
			results[parser.standard] = validityDates;
			continue;
		}

		const today = new Date();
		const isValid =
			(validityDates.value.validFrom.kind !== 'some' || validityDates.value.validFrom.value <= today) &&
			(validityDates.value.validUntil.kind !== 'some' || validityDates.value.validUntil.value >= today);

		results[parser.standard] = { kind: 'ok', value: { isValid, validityDates: validityDates.value } };
	}

	return results;
}

function W3CV2ValidityDatesParser(obj: InputType): Result<ValidityDates> {
	let result: ValidityDates = {
		validFrom: {
			kind: 'none',
			reason: 'validFrom is missing',
		},
		validUntil: {
			kind: 'none',
			reason: 'validUntil is missing',
		},
	};

	if ('validFrom' in obj) {
		result.validFrom = { kind: 'some', value: new Date(obj.validFrom) };
	}

	if ('validUntil' in obj) {
		result.validUntil = { kind: 'some', value: new Date(obj.validUntil) };
	}

	return { kind: 'ok', value: result };
}

function W3CV1ValidityDatesParser(obj: InputType): Result<ValidityDates> {
	if (!('issuanceDate' in obj)) {
		return {
			kind: 'error',
			error: { name: 'Missing', message: 'issuanceDate is required', reason: ErrorReason.Missing },
		};
	}

	let result: ValidityDates = {
		validFrom: {
			kind: 'some',
			value: new Date(obj.issuanceDate),
		},
		validUntil: {
			kind: 'none',
			reason: 'expirationDate is missing',
		},
	};

	if ('expirationDate' in obj) {
		result.validUntil = { kind: 'some', value: new Date(obj.expirationDate) };
	}

	return { kind: 'ok', value: result };
}
