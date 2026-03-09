import { getDifficultyCap, getTrustMultiplier } from "./tiers";

export function calculateXP(difficulty: string, evaluationScore: number, stars: number, memberCount: number): number {
    const cap = getDifficultyCap(difficulty);

    const multiplier = getTrustMultiplier(stars, memberCount);

    const rawXP = cap * (evaluationScore / 5) * multiplier;

    const finalXP = Math.max(0, Math.min(rawXP, cap * multiplier));

    return Math.round(finalXP);
}