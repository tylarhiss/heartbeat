import Axios from 'axios';

export const Put = (url: string, token: string, headers: any) => {
  return Axios.put(
    url,
    {},
    {
      headers: { ...headers, Authorization: token }
    }
  );
};
