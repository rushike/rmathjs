import { beforeAll } from 'vitest';
import { initWasm } from '../src/bridge';

const enableWasm = process.env.RMATH_USE_WASM === 'true' || process.env.RMATH_USE_WASM === '1';

if (enableWasm) {
  beforeAll(async () => {
    await initWasm();
  });
}

