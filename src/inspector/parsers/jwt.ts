import { JWTPayload, decodeJwt } from 'jose';
import { Result } from '../calculatedAttributes/results';
import { getErrorMessage } from '../errorHandling';

export type ParsedJWT = {
  type: 'JWT';
  jwtPayload: JWTPayload;
  payload: JSON;
};

export function safeJWTParse(credential: string): Result<ParsedJWT> {
  try {
    const { vc, ...jwtPayload } = decodeJwt(credential);
    return {
      kind: 'ok',
      value: {
        type: 'JWT',
        payload: vc as JSON,
        jwtPayload,
      },
    };
  } catch (e) {
    return { kind: 'error', error: { name: 'JWT Parse Error', message: getErrorMessage(e) } };
  }
}
