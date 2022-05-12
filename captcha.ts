import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import * as retry from 'retry';

import { CaptchaUnknownError } from './error';
import {
  BASE_URL,
  CaptchaOption,
  DEFAULT_TIMEOUT,
  GetCaptchaResultReq,
  GetCaptchaResultRetryReq,
  Request,
} from './types';

/**
 *  superai captcha
 */
export class CaptchaSdk {
  private readonly api: AxiosInstance;

  /**
   * init
   * @param {string} accessToken
   * @param {CaptchaOption} option
   */
  constructor(private readonly accessToken: string, option?: CaptchaOption) {
    this.api = axios.create({
      baseURL: BASE_URL,
      timeout: DEFAULT_TIMEOUT,
      ...option,
      headers: {
        authorization: accessToken,
        'Content-Type': 'application/json',
      },
    });

    // retry
    axiosRetry(this.api, { retries: 3 });

    this.api.interceptors.response.use(
      (res: AxiosResponse) => {
        return res;
      },
      (err: AxiosError) => {
        throw new CaptchaUnknownError(err);
      }
    );
  }

  /**
   *
   * @param {Request} req
   * @param {CaptchaOption} option
   */
  public async send(req: Request, option?: CaptchaOption) {
    return await this.api.post<{ id: string; success: boolean }>('/api/v1/task', req, option);
  }

  /**
   * get captcha result
   * @param {GetCaptchaResultReq} req
   */
  public async getResult(req: GetCaptchaResultReq) {
    const r = await this.api.get('/api/v1/task', {
      params: req,
    });
    return r.data;
  }

  /**
   * get user info
   */
  public async userInfo() {
    const r = await this.api.get('/api/v1/user');
    return r.data;
  }

  /**
   * solve
   * @param {Request} req
   */
  public async solve(req: Request) {
    const r = await this.send(req);

    await this.sleep();
    if (!r.data.success) {
      throw new CaptchaUnknownError({ message: 'solve error' });
    }
    return await this.retryGetResult({ id: r.data.id, retries: 3, delay: 200 });
  }

  /**
   * get result with retry
   * @param {GetCaptchaResultRetryReq} req
   */
  public async retryGetResult(req: GetCaptchaResultRetryReq) {
    const operation = retry.operation({
      retries: req.retries,
      maxRetryTime: 8000,
      randomize: true,
    });
    return new Promise((resolve, _) => {
      operation.attempt(async () => {
        const r = await this.getResult(req);
        if (r.status === 'idle') {
          const err = new Error();
          await operation.retry(err);
          return;
        } else {
          resolve(r);
        }
      });
    });
  }
  /**
   * sleep
   * @param {number} ms
   */
  public async sleep(ms = 2000) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
