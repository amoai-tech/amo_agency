const SITE_URL = process.env.SITE_URL || "https://www.amoai.ca";
const EDGE_HEALTH_URL =
  process.env.EDGE_HEALTH_URL ||
  "https://icpzzsslayhywxoniekw.supabase.co/functions/v1/make-server-283466b6/health";

const checks = [];

async function request(url, options = {}) {
  const response = await fetch(url, {
    redirect: options.redirect || "manual",
    headers: { "user-agent": "amoai-prod-smoke/1.0" },
    ...options,
  });
  const text = options.readBody === false ? "" : await response.text();
  return { response, text };
}

function record(name, ok, detail) {
  checks.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"} ${name} - ${detail}`);
}

async function expectHtml200(path) {
  const url = new URL(path, SITE_URL).toString();
  const { response, text } = await request(url, { redirect: "follow" });
  const contentType = response.headers.get("content-type") || "";
  const ok =
    response.status === 200 &&
    contentType.includes("text/html") &&
    text.includes('<div id="root"></div>');
  record(`${path} html`, ok, `status=${response.status}, type=${contentType || "unknown"}`);
  return text;
}

async function checkDashboard() {
  const url = new URL("/app/dashboard", SITE_URL).toString();
  const { response, text } = await request(url, { redirect: "follow" });
  const finalUrl = response.url || url;
  const safe =
    response.status === 200 &&
    (finalUrl.includes("/auth") ||
      text.includes("Sign in to your account") ||
      text.includes('<div id="root"></div>'));
  record("/app/dashboard safe load", safe, `status=${response.status}, final=${finalUrl}`);
}

async function checkEdgeHealth() {
  const { response, text } = await request(EDGE_HEALTH_URL);
  let body = {};
  try {
    body = JSON.parse(text);
  } catch {
    body = {};
  }
  const ok =
    response.status === 200 &&
    body.status === "ok" &&
    body.schema === "migrated" &&
    body.onboardingSchema === "migrated";
  record(
    "edge health",
    ok,
    `status=${response.status}, schema=${body.schema || "missing"}, onboarding=${body.onboardingSchema || "missing"}`
  );
}

async function checkAssets(homeHtml) {
  const assets = [...homeHtml.matchAll(/(?:src|href)="([^"]*\/assets\/[^"]+)"/g)]
    .map((match) => match[1])
    .slice(0, 8);

  if (!assets.length) {
    record("vite assets discovered", false, "no /assets entries found in homepage HTML");
    return;
  }

  record("vite assets discovered", true, `${assets.length} asset references`);

  for (const asset of assets) {
    const assetUrl = new URL(asset, SITE_URL).toString();
    const { response } = await request(assetUrl, { method: "HEAD", readBody: false });
    record(`asset ${asset}`, response.status === 200, `status=${response.status}`);
  }
}

const homeHtml = await expectHtml200("/");
await expectHtml200("/wizard");
await expectHtml200("/auth");
await checkDashboard();
await checkEdgeHealth();
await checkAssets(homeHtml);

const failed = checks.filter((check) => !check.ok);
if (failed.length) {
  console.error(`Production smoke failed: ${failed.length} check(s) failed.`);
  process.exit(1);
}

console.log(`Production smoke passed: ${checks.length} checks.`);
