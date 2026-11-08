// Browser replacements for the Node zlib imports in just-bash.
export { gunzipSync, gzipSync, inflateSync, deflateSync, unzlibSync, zlibSync } from "fflate";
export const constants = {
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
};
