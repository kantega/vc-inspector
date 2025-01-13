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

export function parseJwt(jwt: string) {
  const [header, payload] = jwt.split(".");
  return {
    header: JSON.parse(decodeBase64Url(header)),
    payload: JSON.parse(decodeBase64Url(payload)),
  };
}

function decodeBase64Url(base64Url: string): string {
  return decodeURIComponent(
    atob(base64Url.replace(/-/g, "+").replace(/_/g, "/"))
      .split("")
      .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
      .join("")
  );
}