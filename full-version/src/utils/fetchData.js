import CryptoJS from 'crypto-js';

async function fetchData() {
  try {
    const apiUrl = `${process.env.API_URL_LIVE}/admin/admins`;
    const token = ''; // Retrieve your access token as needed

    const secret = process.env.NEXT_PUBLIC_SECRET_KEY || '';
    const payloaddata = JSON.stringify({});
    const nonce = CryptoJS.lib.WordArray.random(16).toString();
    const timestamp = Date.now().toString();

    const generateSignature = (payloaddata, secret, nonce, timestamp) => {
      const payload = `${payloaddata}|${nonce}|${timestamp}`;
      return CryptoJS.HmacSHA256(payload, secret).toString(CryptoJS.enc.Hex);
    };

    const signature = generateSignature(payloaddata, secret, nonce, timestamp);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'livein-key': 'livein-key',
        'Nonce': nonce,
        'Timestamp': timestamp,
        'Signature': signature,
        // Include any additional headers as needed
      },
      credentials: 'include', // Send cookies with the request
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data); // Log the fetched data

    return data; // Return the fetched data
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to handle it further if needed
  }
}

// // Example usage:
// fetchData().then(data => {
//   console.log('Data received:', data);
// }).catch(error => {
//   console.error('Error in fetchData:', error);
// });
