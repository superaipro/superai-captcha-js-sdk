import { CaptchaSdk } from '.';
import { Request } from './types';

(async function () {
  const apiKey = process.env['apiKey'] as string;
  const captchaSDK = new CaptchaSdk(apiKey);
  const p = {
    proxy: process.env['proxy'] as string,
    proxytype: 'https',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36',
    siteKey: '51829642-2cda-4b09-896c-594f89d700cc',
    pageUrl: 'http://democaptcha.com/demo-form-eng/hcaptcha.html',
    type: 'HCaptchaV1',
    timeout: 120,
  };

  const r = await captchaSDK.solve(p as Request);
  console.log(r);
})();
