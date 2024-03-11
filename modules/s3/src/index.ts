export async function fetchS3(url: string, options?: RequestInit): Promise<Response> {
  // TODO how to pass s3 credentials around?
  return await fetch(getPresignedURL(url, ...));
}

globalThis.loaders = globalThis.loaders ?? {};
globalThis.loaders.fetchNode = fetchS3;
