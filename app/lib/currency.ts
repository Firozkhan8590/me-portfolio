/**
 * Global Country-to-Currency Mapping and IP-based Location Detection
 * Supports worldwide ISO 3166-1 alpha-2 country codes mapped to official currencies
 */

export interface CurrencyInfo {
  country: string;
  countryCode: string;
  currency: string;
  symbol: string;
  useSpace: boolean; // true for AED 1,000; false for $1,000 or ₹1,000
}

export interface BudgetOption {
  value: string;
  label: string;
}

// Fallback default: USD
export const DEFAULT_GEO: CurrencyInfo = {
  country: "United States",
  countryCode: "US",
  currency: "USD",
  symbol: "$",
  useSpace: false,
};

/**
 * Comprehensive ISO 3166-1 alpha-2 to Currency Mapping
 * Covers worldwide countries and official currencies
 */
export const COUNTRY_CURRENCY_MAP: Record<
  string,
  { country: string; currency: string; symbol: string; useSpace: boolean }
> = {
  // Middle East / GCC
  AE: { country: "United Arab Emirates", currency: "AED", symbol: "AED", useSpace: true },
  SA: { country: "Saudi Arabia", currency: "SAR", symbol: "SAR", useSpace: true },
  QA: { country: "Qatar", currency: "QAR", symbol: "QAR", useSpace: true },
  KW: { country: "Kuwait", currency: "KWD", symbol: "KWD", useSpace: true },
  OM: { country: "Oman", currency: "OMR", symbol: "OMR", useSpace: true },
  BH: { country: "Bahrain", currency: "BHD", symbol: "BHD", useSpace: true },
  JO: { country: "Jordan", currency: "JOD", symbol: "JOD", useSpace: true },
  LB: { country: "Lebanon", currency: "LBP", symbol: "LBP", useSpace: true },
  IQ: { country: "Iraq", currency: "IQD", symbol: "IQD", useSpace: true },
  YE: { country: "Yemen", currency: "YER", symbol: "YER", useSpace: true },
  IL: { country: "Israel", currency: "ILS", symbol: "₪", useSpace: false },

  // South Asia
  IN: { country: "India", currency: "INR", symbol: "₹", useSpace: false },
  PK: { country: "Pakistan", currency: "PKR", symbol: "PKR", useSpace: true },
  BD: { country: "Bangladesh", currency: "BDT", symbol: "৳", useSpace: false },
  LK: { country: "Sri Lanka", currency: "LKR", symbol: "LKR", useSpace: true },
  NP: { country: "Nepal", currency: "NPR", symbol: "NPR", useSpace: true },
  AF: { country: "Afghanistan", currency: "AFN", symbol: "AFN", useSpace: true },
  MV: { country: "Maldives", currency: "MVR", symbol: "MVR", useSpace: true },
  BT: { country: "Bhutan", currency: "BTN", symbol: "BTN", useSpace: true },

  // North America
  US: { country: "United States", currency: "USD", symbol: "$", useSpace: false },
  CA: { country: "Canada", currency: "CAD", symbol: "CAD", useSpace: true },
  MX: { country: "Mexico", currency: "MXN", symbol: "MX$", useSpace: false },

  // Europe (Eurozone)
  DE: { country: "Germany", currency: "EUR", symbol: "€", useSpace: false },
  FR: { country: "France", currency: "EUR", symbol: "€", useSpace: false },
  IT: { country: "Italy", currency: "EUR", symbol: "€", useSpace: false },
  ES: { country: "Spain", currency: "EUR", symbol: "€", useSpace: false },
  NL: { country: "Netherlands", currency: "EUR", symbol: "€", useSpace: false },
  BE: { country: "Belgium", currency: "EUR", symbol: "€", useSpace: false },
  AT: { country: "Austria", currency: "EUR", symbol: "€", useSpace: false },
  IE: { country: "Ireland", currency: "EUR", symbol: "€", useSpace: false },
  PT: { country: "Portugal", currency: "EUR", symbol: "€", useSpace: false },
  GR: { country: "Greece", currency: "EUR", symbol: "€", useSpace: false },
  FI: { country: "Finland", currency: "EUR", symbol: "€", useSpace: false },
  SK: { country: "Slovakia", currency: "EUR", symbol: "€", useSpace: false },
  LT: { country: "Lithuania", currency: "EUR", symbol: "€", useSpace: false },
  SI: { country: "Slovenia", currency: "EUR", symbol: "€", useSpace: false },
  LV: { country: "Latvia", currency: "EUR", symbol: "€", useSpace: false },
  EE: { country: "Estonia", currency: "EUR", symbol: "€", useSpace: false },
  CY: { country: "Cyprus", currency: "EUR", symbol: "€", useSpace: false },
  LU: { country: "Luxembourg", currency: "EUR", symbol: "€", useSpace: false },
  MT: { country: "Malta", currency: "EUR", symbol: "€", useSpace: false },
  HR: { country: "Croatia", currency: "EUR", symbol: "€", useSpace: false },
  MC: { country: "Monaco", currency: "EUR", symbol: "€", useSpace: false },
  AD: { country: "Andorra", currency: "EUR", symbol: "€", useSpace: false },
  SM: { country: "San Marino", currency: "EUR", symbol: "€", useSpace: false },
  VA: { country: "Vatican City", currency: "EUR", symbol: "€", useSpace: false },
  ME: { country: "Montenegro", currency: "EUR", symbol: "€", useSpace: false },
  XK: { country: "Kosovo", currency: "EUR", symbol: "€", useSpace: false },

  // Non-Euro Europe
  GB: { country: "United Kingdom", currency: "GBP", symbol: "£", useSpace: false },
  CH: { country: "Switzerland", currency: "CHF", symbol: "CHF", useSpace: true },
  SE: { country: "Sweden", currency: "SEK", symbol: "SEK", useSpace: true },
  NO: { country: "Norway", currency: "NOK", symbol: "NOK", useSpace: true },
  DK: { country: "Denmark", currency: "DKK", symbol: "DKK", useSpace: true },
  PL: { country: "Poland", currency: "PLN", symbol: "PLN", useSpace: true },
  CZ: { country: "Czech Republic", currency: "CZK", symbol: "CZK", useSpace: true },
  HU: { country: "Hungary", currency: "HUF", symbol: "HUF", useSpace: true },
  RO: { country: "Romania", currency: "RON", symbol: "RON", useSpace: true },
  BG: { country: "Bulgaria", currency: "BGN", symbol: "BGN", useSpace: true },
  IS: { country: "Iceland", currency: "ISK", symbol: "ISK", useSpace: true },
  RS: { country: "Serbia", currency: "RSD", symbol: "RSD", useSpace: true },
  UA: { country: "Ukraine", currency: "UAH", symbol: "₴", useSpace: false },
  TR: { country: "Turkey", currency: "TRY", symbol: "₺", useSpace: false },
  RU: { country: "Russia", currency: "RUB", symbol: "₽", useSpace: false },
  BY: { country: "Belarus", currency: "BYN", symbol: "BYN", useSpace: true },
  AL: { country: "Albania", currency: "ALL", symbol: "ALL", useSpace: true },
  BA: { country: "Bosnia and Herzegovina", currency: "BAM", symbol: "BAM", useSpace: true },
  MD: { country: "Moldova", currency: "MDL", symbol: "MDL", useSpace: true },
  MK: { country: "North Macedonia", currency: "MKD", symbol: "MKD", useSpace: true },
  GE: { country: "Georgia", currency: "GEL", symbol: "₾", useSpace: false },
  AM: { country: "Armenia", currency: "AMD", symbol: "AMD", useSpace: true },
  AZ: { country: "Azerbaijan", currency: "AZN", symbol: "₼", useSpace: false },
  LI: { country: "Liechtenstein", currency: "CHF", symbol: "CHF", useSpace: true },
  GI: { country: "Gibraltar", currency: "GIP", symbol: "£", useSpace: false },
  IM: { country: "Isle of Man", currency: "GBP", symbol: "£", useSpace: false },
  JE: { country: "Jersey", currency: "GBP", symbol: "£", useSpace: false },
  GG: { country: "Guernsey", currency: "GBP", symbol: "£", useSpace: false },
  FO: { country: "Faroe Islands", currency: "DKK", symbol: "DKK", useSpace: true },

  // East & Southeast Asia
  JP: { country: "Japan", currency: "JPY", symbol: "¥", useSpace: false },
  CN: { country: "China", currency: "CNY", symbol: "¥", useSpace: false },
  SG: { country: "Singapore", currency: "SGD", symbol: "SGD", useSpace: true },
  KR: { country: "South Korea", currency: "KRW", symbol: "₩", useSpace: false },
  HK: { country: "Hong Kong", currency: "HKD", symbol: "HK$", useSpace: false },
  TW: { country: "Taiwan", currency: "TWD", symbol: "NT$", useSpace: false },
  MY: { country: "Malaysia", currency: "MYR", symbol: "RM", useSpace: true },
  ID: { country: "Indonesia", currency: "IDR", symbol: "Rp", useSpace: true },
  TH: { country: "Thailand", currency: "THB", symbol: "฿", useSpace: false },
  VN: { country: "Vietnam", currency: "VND", symbol: "₫", useSpace: false },
  PH: { country: "Philippines", currency: "PHP", symbol: "₱", useSpace: false },
  BN: { country: "Brunei", currency: "BND", symbol: "BND", useSpace: true },
  KH: { country: "Cambodia", currency: "KHR", symbol: "KHR", useSpace: true },
  LA: { country: "Laos", currency: "LAK", symbol: "₭", useSpace: false },
  MM: { country: "Myanmar", currency: "MMK", symbol: "MMK", useSpace: true },
  MO: { country: "Macau", currency: "MOP", symbol: "MOP", useSpace: true },
  MN: { country: "Mongolia", currency: "MNT", symbol: "₮", useSpace: false },
  KZ: { country: "Kazakhstan", currency: "KZT", symbol: "₸", useSpace: false },
  UZ: { country: "Uzbekistan", currency: "UZS", symbol: "UZS", useSpace: true },
  KG: { country: "Kyrgyzstan", currency: "KGS", symbol: "KGS", useSpace: true },
  TJ: { country: "Tajikistan", currency: "TJS", symbol: "TJS", useSpace: true },
  TM: { country: "Turkmenistan", currency: "TMT", symbol: "TMT", useSpace: true },

  // Oceania & Pacific
  AU: { country: "Australia", currency: "AUD", symbol: "AUD", useSpace: true },
  NZ: { country: "New Zealand", currency: "NZD", symbol: "NZD", useSpace: true },
  FJ: { country: "Fiji", currency: "FJD", symbol: "FJD", useSpace: true },
  PG: { country: "Papua New Guinea", currency: "PGK", symbol: "PGK", useSpace: true },
  WS: { country: "Samoa", currency: "WST", symbol: "WST", useSpace: true },
  TO: { country: "Tonga", currency: "TOP", symbol: "TOP", useSpace: true },
  VU: { country: "Vanuatu", currency: "VUV", symbol: "VUV", useSpace: true },
  SB: { country: "Solomon Islands", currency: "SBD", symbol: "SBD", useSpace: true },
  KI: { country: "Kiribati", currency: "AUD", symbol: "AUD", useSpace: true },
  NR: { country: "Nauru", currency: "AUD", symbol: "AUD", useSpace: true },
  TV: { country: "Tuvalu", currency: "AUD", symbol: "AUD", useSpace: true },
  FM: { country: "Micronesia", currency: "USD", symbol: "$", useSpace: false },
  MH: { country: "Marshall Islands", currency: "USD", symbol: "$", useSpace: false },
  PW: { country: "Palau", currency: "USD", symbol: "$", useSpace: false },
  NC: { country: "New Caledonia", currency: "XPF", symbol: "₣", useSpace: true },
  PF: { country: "French Polynesia", currency: "XPF", symbol: "₣", useSpace: true },
  GU: { country: "Guam", currency: "USD", symbol: "$", useSpace: false },

  // South America
  BR: { country: "Brazil", currency: "BRL", symbol: "R$", useSpace: false },
  AR: { country: "Argentina", currency: "ARS", symbol: "ARS", useSpace: true },
  CL: { country: "Chile", currency: "CLP", symbol: "CLP", useSpace: true },
  CO: { country: "Colombia", currency: "COP", symbol: "COP", useSpace: true },
  PE: { country: "Peru", currency: "PEN", symbol: "S/", useSpace: true },
  UY: { country: "Uruguay", currency: "UYU", symbol: "UYU", useSpace: true },
  PY: { country: "Paraguay", currency: "PYG", symbol: "₲", useSpace: false },
  BO: { country: "Bolivia", currency: "BOB", symbol: "Bs", useSpace: true },
  EC: { country: "Ecuador", currency: "USD", symbol: "$", useSpace: false },
  VE: { country: "Venezuela", currency: "VES", symbol: "VES", useSpace: true },
  GY: { country: "Guyana", currency: "GYD", symbol: "GY$", useSpace: false },
  SR: { country: "Suriname", currency: "SRD", symbol: "Sr$", useSpace: false },

  // Central America & Caribbean
  CR: { country: "Costa Rica", currency: "CRC", symbol: "₡", useSpace: false },
  PA: { country: "Panama", currency: "USD", symbol: "$", useSpace: false },
  DO: { country: "Dominican Republic", currency: "DOP", symbol: "RD$", useSpace: false },
  GT: { country: "Guatemala", currency: "GTQ", symbol: "Q", useSpace: false },
  HN: { country: "Honduras", currency: "HNL", symbol: "L", useSpace: false },
  SV: { country: "El Salvador", currency: "USD", symbol: "$", useSpace: false },
  NI: { country: "Nicaragua", currency: "NIO", symbol: "C$", useSpace: false },
  JM: { country: "Jamaica", currency: "JMD", symbol: "J$", useSpace: false },
  TT: { country: "Trinidad and Tobago", currency: "TTD", symbol: "TT$", useSpace: false },
  BS: { country: "Bahamas", currency: "BSD", symbol: "B$", useSpace: false },
  BB: { country: "Barbados", currency: "BBD", symbol: "Bds$", useSpace: false },
  BZ: { country: "Belize", currency: "BZD", symbol: "BZ$", useSpace: false },
  CU: { country: "Cuba", currency: "CUP", symbol: "₱", useSpace: false },
  HT: { country: "Haiti", currency: "HTG", symbol: "G", useSpace: false },
  AG: { country: "Antigua and Barbuda", currency: "XCD", symbol: "EC$", useSpace: false },
  DM: { country: "Dominica", currency: "XCD", symbol: "EC$", useSpace: false },
  GD: { country: "Grenada", currency: "XCD", symbol: "EC$", useSpace: false },
  KN: { country: "Saint Kitts and Nevis", currency: "XCD", symbol: "EC$", useSpace: false },
  LC: { country: "Saint Lucia", currency: "XCD", symbol: "EC$", useSpace: false },
  VC: { country: "Saint Vincent and the Grenadines", currency: "XCD", symbol: "EC$", useSpace: false },
  AW: { country: "Aruba", currency: "AWG", symbol: "Afl", useSpace: true },
  CW: { country: "Curaçao", currency: "ANG", symbol: "NAƒ", useSpace: true },
  BM: { country: "Bermuda", currency: "BMD", symbol: "BD$", useSpace: false },
  KY: { country: "Cayman Islands", currency: "KYD", symbol: "CI$", useSpace: false },
  PR: { country: "Puerto Rico", currency: "USD", symbol: "$", useSpace: false },
  GL: { country: "Greenland", currency: "DKK", symbol: "DKK", useSpace: true },

  // Africa
  ZA: { country: "South Africa", currency: "ZAR", symbol: "ZAR", useSpace: true },
  EG: { country: "Egypt", currency: "EGP", symbol: "EGP", useSpace: true },
  NG: { country: "Nigeria", currency: "NGN", symbol: "₦", useSpace: false },
  KE: { country: "Kenya", currency: "KES", symbol: "KES", useSpace: true },
  GH: { country: "Ghana", currency: "GHS", symbol: "GH₵", useSpace: false },
  MA: { country: "Morocco", currency: "MAD", symbol: "MAD", useSpace: true },
  DZ: { country: "Algeria", currency: "DZD", symbol: "DZD", useSpace: true },
  TN: { country: "Tunisia", currency: "TND", symbol: "TND", useSpace: true },
  ET: { country: "Ethiopia", currency: "ETB", symbol: "ETB", useSpace: true },
  TZ: { country: "Tanzania", currency: "TZS", symbol: "TZS", useSpace: true },
  UG: { country: "Uganda", currency: "UGX", symbol: "UGX", useSpace: true },
  MU: { country: "Mauritius", currency: "MUR", symbol: "MUR", useSpace: true },
  RW: { country: "Rwanda", currency: "RWF", symbol: "RWF", useSpace: true },
  SN: { country: "Senegal", currency: "XOF", symbol: "XOF", useSpace: true },
  CI: { country: "Ivory Coast", currency: "XOF", symbol: "XOF", useSpace: true },
  CM: { country: "Cameroon", currency: "XAF", symbol: "XAF", useSpace: true },
  AO: { country: "Angola", currency: "AOA", symbol: "AOA", useSpace: true },
  ZM: { country: "Zambia", currency: "ZMW", symbol: "ZMW", useSpace: true },
  ZW: { country: "Zimbabwe", currency: "ZWG", symbol: "ZWG", useSpace: true },
  BJ: { country: "Benin", currency: "XOF", symbol: "XOF", useSpace: true },
  BF: { country: "Burkina Faso", currency: "XOF", symbol: "XOF", useSpace: true },
  BI: { country: "Burundi", currency: "BIF", symbol: "BIF", useSpace: true },
  CV: { country: "Cape Verde", currency: "CVE", symbol: "CVE", useSpace: true },
  CF: { country: "Central African Republic", currency: "XAF", symbol: "XAF", useSpace: true },
  TD: { country: "Chad", currency: "XAF", symbol: "XAF", useSpace: true },
  CG: { country: "Congo - Brazzaville", currency: "XAF", symbol: "XAF", useSpace: true },
  CD: { country: "Congo - Kinshasa", currency: "CDF", symbol: "CDF", useSpace: true },
  DJ: { country: "Djibouti", currency: "DJF", symbol: "DJF", useSpace: true },
  GQ: { country: "Equatorial Guinea", currency: "XAF", symbol: "XAF", useSpace: true },
  ER: { country: "Eritrea", currency: "ERN", symbol: "ERN", useSpace: true },
  GA: { country: "Gabon", currency: "XAF", symbol: "XAF", useSpace: true },
  GM: { country: "Gambia", currency: "GMD", symbol: "GMD", useSpace: true },
  GN: { country: "Guinea", currency: "GNF", symbol: "GNF", useSpace: true },
  GW: { country: "Guinea-Bissau", currency: "XOF", symbol: "XOF", useSpace: true },
  LS: { country: "Lesotho", currency: "LSL", symbol: "LSL", useSpace: true },
  LR: { country: "Liberia", currency: "LRD", symbol: "LRD", useSpace: true },
  LY: { country: "Libya", currency: "LYD", symbol: "LYD", useSpace: true },
  MG: { country: "Madagascar", currency: "MGA", symbol: "MGA", useSpace: true },
  MW: { country: "Malawi", currency: "MWK", symbol: "MWK", useSpace: true },
  ML: { country: "Mali", currency: "XOF", symbol: "XOF", useSpace: true },
  MR: { country: "Mauritania", currency: "MRU", symbol: "MRU", useSpace: true },
  MZ: { country: "Mozambique", currency: "MZN", symbol: "MZN", useSpace: true },
  NA: { country: "Namibia", currency: "NAD", symbol: "NAD", useSpace: true },
  NE: { country: "Niger", currency: "XOF", symbol: "XOF", useSpace: true },
  SC: { country: "Seychelles", currency: "SCR", symbol: "SCR", useSpace: true },
  SL: { country: "Sierra Leone", currency: "SLE", symbol: "SLE", useSpace: true },
  SO: { country: "Somalia", currency: "SOS", symbol: "SOS", useSpace: true },
  SS: { country: "South Sudan", currency: "SSP", symbol: "SSP", useSpace: true },
  SD: { country: "Sudan", currency: "SDG", symbol: "SDG", useSpace: true },
  SZ: { country: "Eswatini", currency: "SZL", symbol: "SZL", useSpace: true },
  TG: { country: "Togo", currency: "XOF", symbol: "XOF", useSpace: true },
};

/**
 * Get currency details by ISO 3166-1 alpha-2 code
 */
export function getCurrencyForCountryCode(code?: string | null): CurrencyInfo {
  if (!code) return DEFAULT_GEO;
  const upper = code.trim().toUpperCase();
  const match = COUNTRY_CURRENCY_MAP[upper];
  if (match) {
    return {
      country: match.country,
      countryCode: upper,
      currency: match.currency,
      symbol: match.symbol,
      useSpace: match.useSpace,
    };
  }

  // Fallback
  return DEFAULT_GEO;
}

/**
 * Format a numeric amount using the detected currency symbol/code
 */
export function formatCurrencyAmount(num: number, geo: CurrencyInfo): string {
  const formattedNumber = num.toLocaleString("en-US");
  return geo.useSpace
    ? `${geo.symbol} ${formattedNumber}`
    : `${geo.symbol}${formattedNumber}`;
}

/**
 * Generate the 5 standardized budget dropdown options for a given currency
 * Strictly preserves the numerical ranges (1,000, 3,000, 5,000) without exchange rate conversion.
 */
export function getBudgetOptions(geo: CurrencyInfo): BudgetOption[] {
  const c1000 = formatCurrencyAmount(1000, geo);
  const c3000 = formatCurrencyAmount(3000, geo);
  const c5000 = formatCurrencyAmount(5000, geo);

  return [
    {
      value: `Under ${c1000}`,
      label: `Under ${c1000}`,
    },
    {
      value: `${c1000} – ${c3000}`,
      label: `${c1000} – ${c3000}`,
    },
    {
      value: `${c3000} – ${c5000}`,
      label: `${c3000} – ${c5000}`,
    },
    {
      value: `${c5000}+`,
      label: `${c5000}+`,
    },
    {
      value: "Full-Time Salary Discussion",
      label: "Full-Time Salary Discussion",
    },
  ];
}

const SESSION_STORAGE_KEY = "portfolio_visitor_geo";

/**
 * Detect visitor location via session cache, query simulation, Next.js header API,
 * and reliable client-side public IP geolocation services with fallback to USD.
 */
export async function detectVisitorLocation(): Promise<CurrencyInfo> {
  if (typeof window === "undefined") {
    return DEFAULT_GEO;
  }

  // 1. Check for URL simulation parameter for testing (e.g. ?geo=AE or ?country=IN)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const simulatedCode = urlParams.get("geo") || urlParams.get("country");
    if (simulatedCode) {
      const simulatedGeo = getCurrencyForCountryCode(simulatedCode);
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(simulatedGeo));
      return simulatedGeo;
    }
  } catch {
    // ignore URL parsing error
  }

  // 2. Check session cache to avoid repeated network calls
  try {
    const cached = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as CurrencyInfo;
      if (parsed && parsed.countryCode && parsed.currency) {
        return parsed;
      }
    }
  } catch {
    // ignore session storage error
  }

  // 3. Try internal API route (which reads Vercel / Cloudflare edge headers)
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const internalRes = await fetch("/api/geo", { signal: controller.signal });
    clearTimeout(timeout);
    if (internalRes.ok) {
      const data = await internalRes.json();
      if (data && data.countryCode && data.countryCode !== "XX") {
        const geo = getCurrencyForCountryCode(data.countryCode);
        if (data.country) {
          geo.country = data.country;
        }
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(geo));
        return geo;
      }
    }
  } catch {
    // internal endpoint fallback
  }

  // 4. Try reliable public CORS IP geolocation services
  // Service 1: ipapi.co (Returns country_code and country_name)
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    const res = await fetch("https://ipapi.co/json/", {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      if (data && data.country_code) {
        const geo = getCurrencyForCountryCode(data.country_code);
        if (data.country_name) geo.country = data.country_name;
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(geo));
        return geo;
      }
    }
  } catch {
    // continue to next service
  }

  // Service 2: api.country.is (Ultra fast, lightweight)
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const res = await fetch("https://api.country.is/", {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      if (data && data.country) {
        const geo = getCurrencyForCountryCode(data.country);
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(geo));
        return geo;
      }
    }
  } catch {
    // continue to fallback
  }

  // Service 3: ipwho.is
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const res = await fetch("https://ipwho.is/", {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && data.country_code) {
        const geo = getCurrencyForCountryCode(data.country_code);
        if (data.country) geo.country = data.country;
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(geo));
        return geo;
      }
    }
  } catch {
    // final fallback
  }

  // Safe fallback to USD
  return DEFAULT_GEO;
}
