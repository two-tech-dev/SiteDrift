export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://sitedrift-core-25658b4dcfd8.herokuapp.com';

export interface StatsSummary {
    total_bypasses: number;
    today_bypasses: number;
    top_domains?: DomainCount[];
    version_breakdown?: VersionCount[];
}

export interface DomainCount {
    domain: string;
    count: number;
}

export interface VersionCount {
    version: string;
    count: number;
}

export interface ReportedLink {
    id: number;
    domain: string;
    path: string;
    destination: string;
    times_reported: number;
    hashed_IP: string;
    votedfordeletion: boolean;
    voted_by: string;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, init);
    if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
    }
    return response.json() as Promise<T>;
}

export function getStats(): Promise<StatsSummary> {
    return request<StatsSummary>('/stats/summary');
}

export async function login(username: string, password: string): Promise<string> {
    const data = await request<{ reftoken: string }>('/admin/api/newreftoken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    return data.reftoken;
}

export async function getAccessToken(refreshToken: string): Promise<string> {
    const data = await request<{ acctoken: string }>('/admin/api/newacctoken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reftoken: refreshToken }),
    });
    return data.acctoken;
}

export async function getReportedLinks(accessToken: string, cursorId = 0): Promise<ReportedLink[]> {
    const response = await fetch(`${API_BASE_URL}/admin/api/getreported?cursorId=${cursorId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response.status === 204) {
        return [];
    }
    if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
    }
    return response.json() as Promise<ReportedLink[]>;
}

export async function voteDelete(link: ReportedLink, accessToken: string): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/admin/api/votedelete`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain: link.domain, path: link.path }),
    });
    if (response.status === 200) return 'Vote recorded';
    if (response.status === 202) return 'Link deleted';
    if (response.status === 409) return 'Already voted';
    if (response.status === 422) return 'Link already deleted';
    if (response.status === 401) throw new Error('Unauthorized');
    throw new Error(`Request failed with ${response.status}`);
}

export async function changePassword(username: string, oldpassword: string, newpassword: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/api/changepassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, oldpassword, newpassword }),
    });
    if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
    }
}
