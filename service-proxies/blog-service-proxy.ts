import { ICreateBlogInput, IFindBlogDetail, IUpdateBlogDetail, IFindPostResult } from "api/modules/website/blog/interface";
import fetch from 'isomorphic-fetch';

class Exception extends Error {
  message: string;
  status: number;
  response: string;
  headers: { [key: string]: any };
  result: any;

  constructor(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result: any
  ) {
    super();

    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isSwaggerException = true;

  static isSwaggerException(obj: any): obj is Exception {
    return obj.isSwaggerException === true;
  }
}

function throwException(
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any },
  result?: any
): any {
  if (result !== null && result !== undefined) {
    throw result;
  } else {
    throw new Exception(message, status, response, headers, null);
  }
}

async function processResponse<T>(response: Response): Promise<T> {
  const status = response.status;

  let _headers: any = {};
  if (response.headers && response.headers.forEach) {
    response.headers.forEach((v: any, k: any) => (_headers[k] = v));
  }

  if (status === 200 || status === 201) {
    return response.text().then(responseText => {
      let result: any = null;
      let resultData = responseText === '' ? null : JSON.parse(responseText);
      result = resultData;
      return result;
    });
  } else if (status === 400) {
    return response.text().then(responseText => {
      return throwException(
        responseText,
        status,
        responseText,
        _headers
      );
    });
  } else if (status === 404) {
    return response.text().then(responseText => {
      return throwException(
        responseText,
        status,
        responseText,
        _headers
      );
    });
  } else if (status !== 200 && status !== 204) {
    return response.text().then(responseText => {
      return throwException(
        responseText,
        status,
        responseText,
        _headers
      );
    });
  }
  return Promise.resolve<T>(null as any);
}

const BlogServiceProxy = (baseUrl = '', _token = '') => {
  return {
    newpost: async (
      createBlogInput: ICreateBlogInput
    ): Promise <IFindBlogDetail> => {
      let url = baseUrl + '/blog/newpost';
      url = url.replace(/[?&]$/, '');

      let options = {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createBlogInput)
      };
      return fetch(url, options as any).then((response: Response) =>
      processResponse<IFindBlogDetail>(response)
    );
    },
    edit: async (
      updateBlogInput: IUpdateBlogDetail
    ): Promise<IFindBlogDetail> => {
      let url = baseUrl + '/blog/edit';
      url = url.replace(/[?&]$/, '');
      let options = {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateBlogInput)
      };

      return fetch(url, options as any).then((response: Response) =>
        processResponse<IFindBlogDetail>(response)
      );
    },
    activate: async (blogId: string): Promise<void> => {
      let url = baseUrl + '/blog/activate/';
      if (blogId === undefined || blogId === null) {
        throw new Error(
          'The parameter \'userId\' must be defined and cannot be null.'
        );
      } else {
        url += '' + encodeURIComponent('' + blogId) + '&';
      }
      url = url.replace(/[?&]$/, '');

      let options = {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return fetch(url, options as any).then((response: Response) =>
        processResponse<void>(response)
      );
    },
    deactivate: async (blogId: string): Promise<void> => {
      let url = baseUrl + '/blog/deactivate/';
      if (blogId === undefined || blogId === null) {
        throw new Error(
          'The parameter \'userId\' must be defined and cannot be null.'
        );
      } else {
        url += '' + encodeURIComponent('' + blogId) + '&';
      }
      url = url.replace(/[?&]$/, '');

      let options = {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return fetch(url, options as any).then((response: Response) =>
        processResponse<void>(response)
      );
    },
    findPostByTitle: async (
      searchInput: string | null | undefined,
      pageNumber: number | null | undefined,
      pageSize: number | null | undefined,
      sortBy: string,
      asc: boolean
    ): Promise<IFindPostResult> => {
      let url = baseUrl + '/blog/findpostbytitle?';
      if (searchInput !== undefined) {
        url += 'searchInput=' + encodeURIComponent('' + searchInput) + '&';
      }
      if (pageNumber !== undefined) {
        url += 'pageNumber=' + encodeURIComponent('' + pageNumber) + '&';
      }
      if (pageSize !== undefined) {
        url += 'pageSize=' + encodeURIComponent('' + pageSize) + '&';
      }
      if (sortBy === undefined || sortBy === null) {
        throw new Error(
          'The parameter \'sortBy\' must be defined and cannot be null.'
        );
      } else {
        url += 'sortBy=' + encodeURIComponent('' + sortBy) + '&';
      }
      if (asc === undefined || asc === null) {
        throw new Error(
          'The parameter \'asc\' must be defined and cannot be null.'
        );
      } else {
        url += 'asc=' + encodeURIComponent('' + asc) + '&';
      }
      url = url.replace(/[?&]$/, '');
      let options = {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return fetch(url, options as any).then((response: Response) =>
        processResponse<IFindPostResult>(response)
      );
    },
    getActivePost: async (
      searchInput: string | null | undefined,
      pageNumber: number | null | undefined,
      pageSize: number | null | undefined,
      sortBy: string,
      asc: boolean
    ): Promise<IFindPostResult> => {
      let url = baseUrl + '/blog/getactivepost?';
      if (searchInput !== undefined) {
        url += 'searchInput=' + encodeURIComponent('' + searchInput) + '&';
      }
      if (pageNumber !== undefined) {
        url += 'pageNumber=' + encodeURIComponent('' + pageNumber) + '&';
      }
      if (pageSize !== undefined) {
        url += 'pageSize=' + encodeURIComponent('' + pageSize) + '&';
      }
      if (sortBy === undefined || sortBy === null) {
        throw new Error(
          'The parameter \'sortBy\' must be defined and cannot be null.'
        );
      } else {
        url += 'sortBy=' + encodeURIComponent('' + sortBy) + '&';
      }
      if (asc === undefined || asc === null) {
        throw new Error(
          'The parameter \'asc\' must be defined and cannot be null.'
        );
      } else {
        url += 'asc=' + encodeURIComponent('' + asc) + '&';
      }
      url = url.replace(/[?&]$/, '');

      let options = {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return fetch(url, options as any).then((response: Response) =>
        processResponse<IFindPostResult>(response)
      );
    },
    getPostById: async (
      blogId: string,
    ): Promise<IFindBlogDetail> => {
      let url = baseUrl + '/blog/getpostbyid/';
      if (blogId !== undefined) {
        url += encodeURIComponent('' + blogId);
      }
      url = url.replace(/[?&]$/, '');
      let options = {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return fetch(url, options as any).then((response: Response) =>
        processResponse<IFindBlogDetail>(response)
      );
    },
    getLastestPost: async (
    ): Promise<IFindPostResult> => {
      let url = baseUrl + '/blog/getlastestpost/';
      url = url.replace(/[?&]$/, '');
      let options = {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return fetch(url, options as any).then((response: Response) =>
        processResponse<IFindPostResult>(response)
      );
    },

    getPostByFriendlyUrl: async (
      friendlyUrl: string,
    ): Promise<IFindBlogDetail> => {
      let url = baseUrl + '/blog/getpostbyfriendlyurl/';
      if (friendlyUrl !== undefined) {
        url += encodeURIComponent('' + friendlyUrl);
      }
      url = url.replace(/[?&]$/, '');
      let options = {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return fetch(url, options as any).then((response: Response) =>
        processResponse<IFindBlogDetail>(response)
      );
    },
  };
};

export default BlogServiceProxy;