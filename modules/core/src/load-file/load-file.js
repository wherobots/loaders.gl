import {fetchFile, readFileSync} from '../read-file/read-file';
import {parseFile, parseFileSync, parseFileInBatches} from '../parse-file/parse-file';
import {autoDetectLoader} from '../parse-file/auto-detect-loader';

export async function loadFileInBatches(url, loaders, options) {
  const response = await fetchFile(url, options);
  return parseFileInBatches(response, loaders, options, url);
}

export async function loadFile(url, loaders, options) {
  const loader = Array.isArray(loaders) ? autoDetectLoader(url, null, loaders) : loaders;
  // Some loaders can not separate reading and parsing of data (e.g ImageLoader)
  if (loader.loadAndParse) {
    return await loader.loadAndParse(url, options);
  }
  // at this point, data can be binary or text
  const response = await fetchFile(url, options);
  return parseFile(response, loaders, options, url);
}

export function loadFileSync(url, loaders, options) {
  const data = readFileSync(url, options);
  const result = parseFileSync(data, loaders, options, url);
  // Separate return to facilitate breakpoint setting
  return result;
}
