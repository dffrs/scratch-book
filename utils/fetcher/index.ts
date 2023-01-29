class Fetcher {
  private goGetItBoy = async <T>(
    path: string,
    extra: RequestInit
  ): Promise<Awaited<T>> => {
    const response = await fetch(path, extra);
    if (!response.ok) throw new Error(undefined, { cause: response });
    try {
      return await response.json();
    } catch (error) {
      return await Promise.reject<T>({} as T);
    }
  };
  public get = async <T>(
    path: string,
    extra?: Omit<RequestInit, "body" | "method">
  ): Promise<Awaited<T>> => {
    const config: RequestInit = {
      ...extra,
      method: "get",
    };
    return await this.goGetItBoy(path, config);
  };
  public post = async <T, V>(
    path: string,
    body: T,
    extra?: Omit<RequestInit, "body" | "method">
  ): Promise<Awaited<V>> => {
    try {
      const parsedBody = JSON.stringify(body);
      const config: RequestInit = {
        ...extra,
        method: "post",
        body: parsedBody,
      };
      return await this.goGetItBoy(path, config);
    } catch (error) {
      throw new Error(`Error: JSON.stringify ${body} threw an error`, {
        cause: body,
      });
    }
  };
  public put = async <T, V>(
    path: string,
    body: T,
    extra?: Omit<RequestInit, "body" | "method">
  ): Promise<Awaited<V>> => {
    try {
      const parsedBody = JSON.stringify(body);
      const config: RequestInit = {
        ...extra,
        method: "put",
        body: parsedBody,
      };
      return await this.goGetItBoy(path, config);
    } catch (error) {
      throw new Error(`Error: JSON.stringify ${body} threw an error`, {
        cause: body,
      });
    }
  };
}
export default new Fetcher();
