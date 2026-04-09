export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  success: boolean;
  message: string;
  meta?: TMeta;
  data: T;
};

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export type TErrorSource = {
  path: string;
  message: string;
};

// export type TRTKError = {
//   status: number;
//   data: {
//     success: boolean;
//     message: string;
//     errorSources?: TErrorSource[];
//   };
// };

export type TRTKError = {
  status: number;
  data: {
    success: boolean;
    message: string;
    errorSources?: {
      path: string;
      message: string;
    }[];
  };
};
