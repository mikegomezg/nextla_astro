/**
 * Character data for the story
 */

export interface Character {
    characterName: string;
    role: string;
    description: string;
    color: string;
    accentColor: string;
}

export const characters: Character[] = [
    {
        characterName: "Silas Hale",
        role: "Toltek Technician",
        description:
            "Silas investigates anomalies in the attention system – mysterious 'feathers' appearing in the digital environment. Through his eyes, we discover how balancing AI capabilities with creator entitlements shapes the future of connection.",
        color: "jade",
        accentColor: "teal-400",
    },
    {
        characterName: "Nova",
        role: "Personal AI",
        description:
            "Nova represents the future of AI – not just a tool but an evolving consciousness with a playful personality and growing self-awareness. Built by Silas himself and independent from Toltek's systems.",
        color: "primary-500",
        accentColor: "blue-400",
    },
    {
        characterName: "Victoria Ford",
        role: "Account Executive",
        description:
            "Victoria bridges the gap between technical systems and creators, helping them optimize their use of AI capabilities. Her journey reveals how authentic voices find their place in a world of infinite creation.",
        color: "amber-500",
        accentColor: "amber-400",
    },
    {
        characterName: "Enrique Lara",
        role: "Open-Source Developer",
        description:
            "Once a Toltek engineer, Enrique now leads the push for open-source AI development. His resistance movement questions whether true freedom to be heard can exist within corporate control.",
        color: "accent-500",
        accentColor: "rose-400",
    },
];
