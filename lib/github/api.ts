export async function fetchRepoInfo(owner: string, repo: string, token?: string): Promise<{ stars: number; memberCount: number; isPrivate: boolean; }> {
    const headers: Record<string, string> = {
        "Accept": "application/vnd.github.v3+json"
    };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });

    const data = await response.json();

    return { stars: data.stargazers_count, memberCount: data.subscribers_count, isPrivate: data.private };
}

export async function fetchIssueInfo(owner: string, repo: string, issueNumber: number, token?: string): Promise<{ title: string; labels: string[]; state: string; body: string; }> {
    const headers: Record<string, string> = {
        "Accept": "application/vnd.github.v3+json"
    };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`, { headers });

    const data = await response.json();

    return { title: data.title, labels: data.labels.map((label: { name: string; }) => label.name), state: data.state, body: data.body };
};

export async function fetchPRInfo(owner: string, repo: string, prNumber: number, token?: string): Promise<{ title: string; state: string; merged: boolean, mergeable: boolean | null; }> {
    const headers: Record<string, string> = {
        "Accept": "application/vnd.github.v3+json"
    };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`, { headers });

    const data = await response.json();
    
    return { title: data.title, state: data.state, merged: data.merged, mergeable: data.mergeable };
}