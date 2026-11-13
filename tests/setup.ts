import { beforeAll } from 'vitest';
import { initWasm } from '../src/bridge';
import { config } from '../src/config';

export function getRequestedPrecision(): number | undefined {
  if (process.env.RMATH_PRECISION) {
    const p = parseInt(process.env.RMATH_PRECISION, 10);
    if (!isNaN(p) && p > 0) return p;
  }
  if (process.env.PRECISION) {
    const p = parseInt(process.env.PRECISION, 10);
    if (!isNaN(p) && p > 0) return p;
  }
  for (let i = 0; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg.startsWith('--precision=')) {
      const p = parseInt(arg.slice('--precision='.length), 10);
      if (!isNaN(p) && p > 0) return p;
    } else if (arg === '--precision' && i + 1 < process.argv.length) {
      const p = parseInt(process.argv[i + 1], 10);
      if (!isNaN(p) && p > 0) return p;
    }
  }
  return undefined;
}

const customPrecision = getRequestedPrecision();
if (customPrecision !== undefined) {
  config({ precision: customPrecision });
}

const enableWasm = process.env.RMATH_USE_WASM === 'true' || process.env.RMATH_USE_WASM === '1';

if (enableWasm) {
  beforeAll(async () => {
    await initWasm();
  });
}

