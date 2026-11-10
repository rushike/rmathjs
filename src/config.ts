export type ConfigType = {
  precision : number,
  base : number
  string : "string" | "object"
}

const INTERNAL_CONFIG : ConfigType = {
  precision : 30, // in mode of base. ~ 100 bits.
  base : 10,
  string : "string"
}

const PUBLIC_CONFIG = new Proxy(INTERNAL_CONFIG, {
  set(target, prop, value) {
    console.warn(`Blocked attempt to set '${String(prop)}'. Use config() to update settings.`);
    return true; // Returns true to silently fail without crashing the app, or you can `throw new Error(...)`
  }
});


export function config(c ?: Record<string, any>) {
  if (!c) return PUBLIC_CONFIG;

  Object.entries(c).forEach(([key, val]) =>{ 
    // @ts-ignore: overide config to passed attribute
    if (key in INTERNAL_CONFIG) INTERNAL_CONFIG[key] = val;
  })
  return PUBLIC_CONFIG;
}
