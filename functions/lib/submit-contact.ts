export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  turnstileToken: string;
}

export interface ContactSecrets {
  turnstileSecret: string;
  web3formsKey: string;
}

interface TurnstileVerifyResponse {
  success: boolean;
}

interface Web3FormsResponse {
  success: boolean;
}

async function verifyTurnstile(token: string, secret: string, remoteIp?: string) {
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (remoteIp) body.append('remoteip', remoteIp);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  });

  const data = (await response.json()) as TurnstileVerifyResponse;
  return data.success;
}

async function sendViaWeb3Forms(payload: ContactPayload, accessKey: string) {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `Nowa wiadomość od ${payload.name} - rymn.me`,
      from_name: 'rymn.me',
      name: payload.name,
      email: payload.email,
      phone: payload.phone ? `+48 ${payload.phone}` : 'nie podano',
      message: payload.message,
    }),
  });

  const data = (await response.json()) as Web3FormsResponse;
  return data.success;
}

/** Shared by the Pages Function (prod) and the Vite dev middleware (local). */
export async function submitContact(payload: ContactPayload, secrets: ContactSecrets, remoteIp?: string) {
  if (!payload.name?.trim() || !payload.email?.trim() || !payload.message?.trim() || !payload.turnstileToken) {
    return { ok: false as const, status: 400, message: 'Invalid payload' };
  }

  if (!secrets.turnstileSecret || !secrets.web3formsKey) {
    return { ok: false as const, status: 500, message: 'Server misconfigured' };
  }

  const turnstileOk = await verifyTurnstile(payload.turnstileToken, secrets.turnstileSecret, remoteIp);
  if (!turnstileOk) {
    return { ok: false as const, status: 403, message: 'Turnstile verification failed' };
  }

  const sent = await sendViaWeb3Forms(payload, secrets.web3formsKey);
  if (!sent) {
    return { ok: false as const, status: 502, message: 'Email delivery failed' };
  }

  return { ok: true as const, status: 200 };
}
