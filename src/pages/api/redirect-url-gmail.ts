import { SOCIAL_FEATURES_OUTLOOK } from '@/routesConstants/paths';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: {
      sampleTypes: ['json', 'urlencoded'],
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { code, state } = req.query;
    const url = new URL(
      `${process?.env?.NEXT_PUBLIC_BASE_URL}${SOCIAL_FEATURES_OUTLOOK?.GMAIL_REDIRECT_URL}`,
    );
    url.searchParams.append('code', code as string);
    url.searchParams.append('state', state as string);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data.statusCode === 200) {
      res.redirect(
        `${process?.env?.NEXT_LOCAL_URL}${SOCIAL_FEATURES_OUTLOOK?.GMAIL_CONVERSATIONS}`,
      );
    }
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' });
  }
}
