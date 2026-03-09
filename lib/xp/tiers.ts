export const TIER_ORDER = [
    "initiator",
    "committer",
    "contributor",
    "merge_master",
    "architect",
    "open_source_legend"
] as const;

export const DIFFICULTY_CAPS: Record<string, number> = {
    easy: 40,
    medium: 70,
    hard: 100,
};

export const TRUST_MULTIPLIER = [
    { minStars: 1000, minMembers: 0, multiplier: 1.5 },
    { minStars: 100, minMembers: 0, multiplier: 1.0 },
    { minStars: 0, minMembers: 5, multiplier: 0.8 },
    { minStars: 0, minMembers: 1, multiplier: 0.5 },
] as const;

export function getTrustMultiplier(stars: number, memberCount: number): number {
    for (const { minStars, minMembers, multiplier } of TRUST_MULTIPLIER) {
        if (stars >= minStars && memberCount >= minMembers) {
            return multiplier;
        }
    }
    return 0.5;
}

export function getDifficultyCap(difficulty: string): number {
    if (difficulty in DIFFICULTY_CAPS) {
        return DIFFICULTY_CAPS[difficulty];
    }
    throw new Error("Invalid difficulty");
}