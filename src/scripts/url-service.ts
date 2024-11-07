import { BehaviorSubject } from 'rxjs';

export enum UrlQueryParam {
  QUERY = 'q',
  TYPE = 't',
}

const searchParams = new URLSearchParams(window.location.search);

const subject = new BehaviorSubject<Partial<Record<UrlQueryParam, string>>>({
  [UrlQueryParam.QUERY]: searchParams.get(UrlQueryParam.QUERY) ?? '',
  [UrlQueryParam.TYPE]: searchParams.get(UrlQueryParam.TYPE) ?? '',
});

/* 
  This service is used to set/get the URL query parameters
  and sync with the app state
*/
export const UrlService = {
  subscribe(callback: (value: Partial<Record<UrlQueryParam, string>>) => void) {
    return subject.subscribe(callback);
  },

  getQueryParam(key: UrlQueryParam) {
    return subject.getValue()[key] ?? '';
  },

  setQueryParam(key: UrlQueryParam, value: string) {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.replaceState({}, '', url.toString());
    subject.next({ [key]: value });
  },
};
