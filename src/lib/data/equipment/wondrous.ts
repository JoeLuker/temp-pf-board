// src/lib/data/equipment/wondrous.ts
import type { WondrousItem } from '$lib/types/equipment';

export const wondrousItemData: Record<string, WondrousItem> = {
    'cloak-of-resistance-1': {
        id: 'cloak-of-resistance-1',
        name: 'Cloak of Resistance +1',
        slot: 'shoulders',
        bonuses: {
            saves: {
                fortitude: [{
                    value: 1,
                    type: 'resistance',
                    source: 'Cloak of Resistance +1'
                }],
                reflex: [{
                    value: 1,
                    type: 'resistance',
                    source: 'Cloak of Resistance +1'
                }],
                will: [{
                    value: 1,
                    type: 'resistance',
                    source: 'Cloak of Resistance +1'
                }]
            }
        },
        cost: 1000,
        weight: 1,
        description: 'Grants a +1 resistance bonus on all saving throws.'
    }
};