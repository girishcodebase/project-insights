const OWNER = "girishcodebase";
const REPO = "project-insights";
const BRANCH = "main";

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
    throw new Error(body.message || `GitHub API error (${res.status})`);
  }
  return res.json();
}

export async function getJsonFile(path, token) {
  const data = await githubRequest(`${path}?ref=${BRANCH}`, token);
  return { json: JSON.parse(decodeUtf8Base64(data.content)), sha: data.sha };
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
