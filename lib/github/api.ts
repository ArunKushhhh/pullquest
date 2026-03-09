class GitHubApiError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.name = "GitHubApiError";
    }
}

function getGitHubHeaders(token?: string): Record<string, string> {
    const headers: Record<string, string> = {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
}

async function assertOk(response: Response, context: string): Promise<void> {
    if (!response.ok) {
        const body = await response.text().catch(() => "Unknown error");
        throw new GitHubApiError(
            response.status,
            `GitHub API error (${context}): ${response.status} — ${body}`
        );
    }
}

export async function fetchRepoInfo(owner: string, repo: string, token?: string): Promise<{ stars: number; contributorsCount: number; isPrivate: boolean; }> {
    const headers = getGitHubHeaders(token);

    const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
    await assertOk(repoResponse, `repos/${owner}/${repo}`);
    const repoData = await repoResponse.json();

    // Fetch actual contributor count — gracefully fallback to 0 on failure
    let contributorsCount = 0;
    try {
        const contributorsResponse = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=1&anon=true`,
            { headers }
        );

        if (contributorsResponse.ok) {
            const linkHeader = contributorsResponse.headers.get("Link");
            if (linkHeader) {
                const lastPageMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
                contributorsCount = lastPageMatch ? parseInt(lastPageMatch[1], 10) : 1;
            } else {
                const contributors = await contributorsResponse.json();
                contributorsCount = Array.isArray(contributors) ? contributors.length : 0;
            }
        }
    } catch {
        // Contributor count is supplementary — don't fail the whole call
    }

    return { stars: repoData.stargazers_count, contributorsCount, isPrivate: repoData.private };
}

export async function fetchIssueInfo(owner: string, repo: string, issueNumber: number, token?: string): Promise<{ title: string; labels: string[]; state: string; body: string; }> {
    const headers = getGitHubHeaders(token);

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`, { headers });
    await assertOk(response, `issues/${issueNumber}`);
    const data = await response.json();

    return { title: data.title, labels: data.labels.map((label: { name: string; }) => label.name), state: data.state, body: data.body };
}

export async function fetchPRInfo(owner: string, repo: string, prNumber: number, token?: string): Promise<{ title: string; state: string; merged: boolean, mergeable: boolean | null; }> {
    const headers = getGitHubHeaders(token);

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`, { headers });
    await assertOk(response, `pulls/${prNumber}`);
    const data = await response.json();

    return { title: data.title, state: data.state, merged: data.merged, mergeable: data.mergeable };
}

export { GitHubApiError };