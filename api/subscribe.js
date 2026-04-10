export default async function handler(req, res) {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(204).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    res.setHeader('Access-Control-Allow-Origin', '*');

    const { email, segment, gdpr } = req.body;

    // Validate
    if (!email || !email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ error: 'invalid_email' });
    }

    if (!segment || !['tohru', 'bartatar'].includes(segment)) {
        return res.status(400).json({ error: 'invalid_segment' });
    }

    const apiKey = process.env.FLODESK_API_KEY;
    if (!apiKey) {
        console.error('FLODESK_API_KEY is not set');
        return res.status(500).json({ error: 'server_error' });
    }

    // Map segment names to Flodesk segment IDs
    const segmentMap = {
        tohru: '65c8876ddc58257728cb7f5d',
        bartatar: '619222cfe9932f2819ad478c'
    };

    const segmentId = segmentMap[segment];

    try {
        // Create or update subscriber with segment assignment in one call
        const subscriberRes = await fetch('https://api.flodesk.com/v1/subscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(apiKey + ':').toString('base64')
            },
            body: JSON.stringify({
                email: email,
                segment_ids: [segmentId],
                optin_ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '',
                ...(gdpr && { custom_fields: { gdpr_consent: 'true' } })
            })
        });

        if (!subscriberRes.ok) {
            const err = await subscriberRes.json().catch(() => ({}));
            console.error('Flodesk subscriber error:', subscriberRes.status, err);
            return res.status(subscriberRes.status >= 500 ? 502 : 400).json({ error: 'subscribe_failed' });
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Subscribe error:', error);
        return res.status(500).json({ error: 'server_error' });
    }
}
