export interface NftContract {
    id: number;
    image: string;
    name: string;
    slug: string;
    symbol: string;
    description: string;
    recipient: string;
    royalty_address: string;
    royalty_percentage: number;
    fees_address: string;
    fees_percentage: number;
    address: string;
    owner: string;
    deletedAt: string | null;
    createdDate: string;
};

export interface IFaq {
    question: string;
    response: string;
}


export interface NFTPromotion {
    claimImage: string,
    claimLink: string | null,
    claimText: string | null,
    claimTitle: string | null,
    colorAccents: string,
    createdA: string | null,
    deletedAt: string | null,
    endTime: string | null,
    faq: IFaq[],
    footerText: string | null,
    headerImage: string,
    id: string,
    joinDiscordLink: string | null,
    layoutType: string | null,
    name: string,
    sections: Section[] | null,
    subtitle: string,
    title: string,
    userId: string,
}

export interface Faq {
    question: string;
    response: string;
}

export interface Section {
    image: string;
    content: string;
}


export interface PropertyOrRanking {
    value: string;
    trait_type: string;
}

export interface BoostOrStat {
    display_type: string;
    trait_type: string;
    value: number;
};


export interface NFTMetadata {
    id: number;
    name: string;
    slug: string;
    description: string;
    animation_url: string | null;
    external_url: string;
    image: string;
    properties: PropertyOrRanking[] | [];
    boosts: BoostOrStat[] | [];
    rankings: PropertyOrRanking[] | [];
    stats: BoostOrStat[] | [];
    isUsed: boolean;
    deletedAt: string | null;
};

export enum WhitelistType {
    NONE = 'NONE',
    EMAIL = 'EMAIL',
    EMAIL_CLAIMCODE = 'EMAIL_CLAIMCODE',
    CLAIMCODE = 'CLAIMCODE',
}


export interface IWhitelistData {
    code?: string;
    email?: string;
}

export interface IUserInfo {
    name?: string;
    lastname?: string;
    country?: string;
    email?: string;
    taxId?: string;
}

export interface NFTClaimConditions {
    createdAt: Date
    deletedAt: Date | null
    endTime: Date | null
    id: string
    maxClaimable: number | null
    maxQuantity: number | null
    price: number | null
    quantityLimitPerTransaction: number | null
    snapshoot: string | string[] | null
    startTime: Date
    useUuid: boolean
    waitInSeconds: number | null
    whitelist: IWhitelistData | null
    whitelistType: WhitelistType
}