import debounce from 'lodash.debounce';
import { BehaviorSubject } from 'rxjs';

export enum UrlQueryParam {
  QUERY = 'q',
  TYPE = 't',
}

const url = new URL(window.location.href);

const subject = new BehaviorSubject<Partial<Record<UrlQueryParam, string>>>({
  [UrlQueryParam.QUERY]: url.searchParams.get(UrlQueryParam.QUERY) ?? '',
  [UrlQueryParam.TYPE]: url.searchParams.get(UrlQueryParam.TYPE) ?? '',
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
    debounce(() => {
      url.searchParams.set(key, value);
      window.history.replaceState({}, '', url.toString());
      subject.next({ [key]: value });
    }, 350)();
  },
};
