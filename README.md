## SuperAI captcha solver sdk

Captcha service Node SDK

## Installation

```shell
npm i captcha-sdk-ts; // npm 
yarn add captcha-sdk-ts; // yarn
pnpm add captcha-sdk-ts; // pnpm
```


## Tutorial

```typescript
import { CaptchaSdk, Request } from 'superai-captcha-sdk';

async function test() {
  const apiKey = 'aa37d476-c06a-4a8f-bb94-xxxxxxxxxxxxxx';
  const captcha = new CaptchaSdk(apiKey);

  // test get userinfo
  const userInfo = await captcha.userInfo();
  console.log('userInfo: ', userInfo);

  const params: Request = {
    proxy: '',
    proxytype: "http",
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36',
    siteKey: '51829642-2cda-4b09-896c-594f89d700cc',
    pageUrl: 'http://democaptcha.com/demo-form-eng/hcaptcha.html',
    type: 'HCaptchaV1',
    timeout: 120,
  };

  const sendR = await captcha.send(params)
  console.log('sendR : ', sendR.data);

  const taskId = sendR.data.id;
  const solveR = await captcha.getResult({ id: taskId })
  console.log('solveR: ', solveR);

  const r = await captcha.solve(params)
  return r;
}

test().then(console.info).catch(console.error)
```


## API

### captchaSDK.userInfo()
Get the current user information and wallet balance


### captchaSDK.send([request])
Send identification request


### captchaSDK.getResult({taskId: ''})
Obtain identification results


### captchaSDK.solve([request])
send + getResult 

Automatically obtain recognition results, Automatically retry