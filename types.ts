import { AxiosRequestConfig } from 'axios';

export const BASE_URL = 'https://api.superai.pro';
export const DEFAULT_TIMEOUT = 8000;

export type GeeTest = {
  proxy: string;
  proxytype: 'http' | 'https';
  userAgent: string;
  gt: string;
  challenge: string;
  url: string;
  apiServer: string;
};
export type HCaptcha = {
  proxy: string;
  proxytype: 'http' | 'https';
  userAgent: string;
  siteKey: string;
  pageUrl: string;
  type: string;
  timeout: number;
};
export type ReCaptcha = {
  proxy: string;
  proxytype: 'http' | 'https';
  userAgent: string;
  siteKey: string;
  url: string;
  invisible: boolean;
  version: string;
  action: string;
  score: number;
};

export type AkamaiBMP = {
  version: string;
};

export type Request = GeeTest | HCaptcha | ReCaptcha | AkamaiBMP;
export type GetCaptchaResultReq = {
  id: string;
};
export type GetCaptchaResultRetryReq = {
  id: string;
  retries: number;
  delay: number;
};
export type CaptchaOption = Partial<Omit<AxiosRequestConfig, 'data'>>;
