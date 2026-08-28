import { submitContact, type ContactPayload } from '../lib/submit-contact';

interface Env {
  TURNSTILE_SECRET_KEY: string;
  WEB3FORMS_ACCESS_KEY: string;
}

type PagesContext = {
  request: Request;
  env: Env;
};

export const onRequestPost = async (context: PagesContext) => {
  try {
    const payload = (await context.request.json()) as ContactPayload;
    const remoteIp = context.request.headers.get('CF-Connecting-IP') ?? undefined;

    const result = await submitContact(
      payload,
      {
        turnstileSecret: context.env.TURNSTILE_SECRET_KEY,
        web3formsKey: context.env.WEB3FORMS_ACCESS_KEY,
      },
      remoteIp,
    );

    if (!result.ok) {
      return Response.json({ success: false, message: result.message }, { status: result.status });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false }, { status: 500 });
  }
};
