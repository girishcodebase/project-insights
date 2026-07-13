const OWNER = "girishcodebase";
const REPO = "project-insights";
const BRANCH = "main";

export const GITHUB_TOKEN = "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";

function encodeUtf8Base64(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    )
  );
}

function decodeUtf8Base64(str) {
  return decodeURIComponent(
    atob(str)
      .split("")
      .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("")
  );
}

async function githubRequest(path, token, options = {}) {
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`,
    {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        ...options.headers,
      },
    }
  );
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err = new Error(body.message || `GitHub API error (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export async function getJsonFile(path, token) {
  const data = await githubRequest(`${path}?ref=${BRANCH}`, token);
  return { json: JSON.parse(decodeUtf8Base64(data.content)), sha: data.sha };
}

export async function getJsonFileIfExists(path, token) {
  try {
    return await getJsonFile(path, token);
  } catch (err) {
    if (err.status === 404) return null;
    throw err;
  }
}

export async function putJsonFile(path, token, json, sha, message) {
  return githubRequest(path, token, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: encodeUtf8Base64(JSON.stringify(json, null, 2) + "\n"),
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });
}
