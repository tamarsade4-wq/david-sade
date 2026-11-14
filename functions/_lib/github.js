// שמירת שינויים בפרויקט ב-GitHub (קומיט אחד), שמפעיל בנייה מחדש של האתר.
const API = 'https://api.github.com';

function headers(env) {
  return {
    authorization: `Bearer ${env.GITHUB_TOKEN}`,
    accept: 'application/vnd.github+json',
    'user-agent': 'david-sade-admin',
    'x-github-api-version': '2022-11-28',
    'content-type': 'application/json',
  };
}
const repo = (env) => env.GITHUB_REPO || 'tamarsade4-wq/david-sade';
const branch = (env) => env.GITHUB_BRANCH || 'main';

async function gh(env, path, init = {}) {
  const r = await fetch(`${API}/repos/${repo(env)}${path}`, { ...init, headers: headers(env) });
  if (!r.ok) throw new Error(`GitHub ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return r.json();
}

export const PORTFOLIO_PATH = 'src/content/settings/portfolio.json';

export async function readPortfolio(env) {
  const f = await gh(env, `/contents/${PORTFOLIO_PATH}?ref=${branch(env)}`);
  const bytes = Uint8Array.from(atob(f.content.replace(/\n/g, '')), (c) => c.charCodeAt(0));
  const data = JSON.parse(new TextDecoder().decode(bytes));
  if (!Array.isArray(data.works)) data.works = [];
  return data;
}

// files: [{ path, content (טקסט) } או { path, base64 (בינארי) }]
export async function commitFiles(env, files, message) {
  const ref = await gh(env, `/git/ref/heads/${branch(env)}`);
  const base = ref.object.sha;
  const baseCommit = await gh(env, `/git/commits/${base}`);
  const tree = [];
  for (const f of files) {
    const blob = await gh(env, '/git/blobs', {
      method: 'POST',
      body: JSON.stringify(f.base64 ? { content: f.base64, encoding: 'base64' } : { content: f.content, encoding: 'utf-8' }),
    });
    tree.push({ path: f.path, mode: '100644', type: 'blob', sha: blob.sha });
  }
  const newTree = await gh(env, '/git/trees', { method: 'POST', body: JSON.stringify({ base_tree: baseCommit.tree.sha, tree }) });
  const commit = await gh(env, '/git/commits', { method: 'POST', body: JSON.stringify({ message, tree: newTree.sha, parents: [base] }) });
  await gh(env, `/git/refs/heads/${branch(env)}`, { method: 'PATCH', body: JSON.stringify({ sha: commit.sha }) });
  return commit.sha;
}
