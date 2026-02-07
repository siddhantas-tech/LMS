// @ts-nocheck
export default async function handler(req, res) {
  // Get the original path from the request
  const originalPath = req.url.replace('/api/proxy', '');
  const targetUrl = `https://learning-management-system-be.onrender.com${originalPath}`;
  
  console.log('Proxy request:', {
    method: req.method,
    originalPath,
    targetUrl,
    body: req.body
  });
  
  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
        'Accept': 'application/json',
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    console.log('Backend response:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });

    let data;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Proxy error', 
      message: error.message,
      targetUrl,
      originalPath
    });
  }
}
