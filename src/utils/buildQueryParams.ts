export const buildQueryParams = (args: Record<string, unknown>) => {
  const params = new URLSearchParams();

  Object.entries(args || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    if (Array.isArray(value)) {
      value.forEach((val) => {
        if (val !== "") params.append(key, String(val));
      });
    } else {
      params.append(key, String(value));
    }
  });

  return params;
};
