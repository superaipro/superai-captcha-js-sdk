import { AxiosError } from 'axios';

/**
 * captcha error
 */
export class CaptchaError extends Error {
  private config: any;

  /**
   * error message
   * @param { AxiosError } raw
   */
  constructor(raw: Partial<AxiosError>) {
    super(raw.message);

    this.config = {
      ...raw.config,
      code: raw.code,
      ...raw.request?.headers,
    };
  }
}

/**
 * authentication error
 */
export class CaptchaAuthenticationError extends CaptchaError {}

/**
 * rate limit error
 */
export class CaptchaRateLimitError extends CaptchaError {}

/**
 * unknown error
 */
export class CaptchaUnknownError extends CaptchaError {}
