
import { cookies } from 'next/headers';

export async function getInitialProps(context) {
  const allCookies = await cookies(context.req.headers);

  // Check for the specific cookie you need based on its header name (replace "X-Custom-Cookie" with the actual header)
  const customCookie = allCookies.get('accessToken');

console.log(customCookie);
console.log(Set-Cookie);

  // Process the retrieved cookie data
  // ...

  return { customCookieData: processedCookieData }; // Pass processed data as props
}
