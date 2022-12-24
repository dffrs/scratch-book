import { useEffect, useMemo, useState } from "react";

type Fetch = { url: Parameters<typeof fetch>[0]; init?: Parameters<typeof fetch>[1] };

const useFetch = <T extends unknown>(args: Fetch): [T | undefined, boolean] => {
  const [data, setData] = useState<T | undefined>(() => undefined);
  const [isLoading, setLoading] = useState<boolean>(() => false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await fetch(args.url, args.init)
          .then((response) => response.json())
          .then(setData)
          .then(() => setLoading(false));
      } catch (error) {
        setData(undefined);
        setLoading(false);
      }
    })();
  }, [args.url, args.init]);
  return useMemo(() => [data, isLoading], [data, isLoading]);
};

export { useFetch };
