import { Hono } from 'hono';
import { Resend } from 'resend';

import DefaultEmail from './emails/default-email';
import VercelInviteUserEmail from './emails/vercel-email';

export type Env = {
  RESEND_API_KEY: string;
};

const app = new Hono<{ Bindings: Env }>();

app.post('/send/email', async (c) => {
  const resend = new Resend(c.env.RESEND_API_KEY);

  const data = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['omp164703@gmail.com'],
    subject: 'Hello From ReachOut',
    react: <DefaultEmail firstName="ReachOut" />,
  });

  return c.json(data);
});

app.post('/send/email/vercel', async (c) => {
  const resend = new Resend(c.env.RESEND_API_KEY);

  const data = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['omp164703@gmail.com'],
    subject: 'Hello from ReachOut',
    react: (
      <VercelInviteUserEmail
        username="ReachOut"
        teamName="ReachOut"
        invitedByUsername="ReachOut"
        invitedByEmail="reachout@gmail.com"
      />
    ),
  });

  return c.json(data);
});

export default app;
