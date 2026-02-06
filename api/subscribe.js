export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const { email } = req.body;

    // Validate email
    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    const apiKey = process.env.FLODESK_API_KEY;

    if (!apiKey) {
        console.error('FLODESK_API_KEY is not set');
        return res.status(500).json({ error: 'Server configuration error.' });
    }

    try {
        // Create or update subscriber in Flodesk
        const response = await fetch('https://api.flodesk.com/v1/subscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(apiKey + ':').toString('base64'),
                'User-Agent': 'Tohru Nakamura Website (tohru-nakamura.de)'
            },
            body: JSON.stringify({
                email: email,
                double_optin: true
            })
        });

        if (response.ok) {
            return res.status(200).json({ success: true, message: 'Welcome to our Circle \u2013 we look forward to sharing the journey with you.' });
        } else {
            const errorData = await response.json().catch(() => ({}));
            console.error('Flodesk API error:', response.status, errorData);
            return res.status(response.status).json({ 
                error: 'Something went wrong. Please try again.' 
            });
        }
    } catch (error) {
        console.error('Subscribe error:', error);
        return res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
}
