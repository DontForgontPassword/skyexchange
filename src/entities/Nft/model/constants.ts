import { INft } from "./types";
import beeChlen from "@/shared/assets/images/nfts/bee-chlen-218.jpg";
import cockGuardian from "@/shared/assets/images/nfts/cocal-guardian-3443.jpg";
import kitIgor from "@/shared/assets/images/nfts/cyber-guardian-7284.jpg";
import cyberGuardian from "@/shared/assets/images/nfts/cyber-guardian-9451.png";
import digitalPhantom from "@/shared/assets/images/nfts/digital-phantom-7392.png";
import extraterrestrial from "@/shared/assets/images/nfts/extraterrestrial-din-din-madung-4821.png";
import femboiWarrior from "@/shared/assets/images/nfts/femboi-warrior-8632.png";
import kirillBarabulka from "@/shared/assets/images/nfts/kirill-barabulka-1205.png";
import ladyGaga from "@/shared/assets/images/nfts/lady-gaga-4353.jpg";
import neonSoul from "@/shared/assets/images/nfts/neon-soul-3178.png";
import quantumRanger from "@/shared/assets/images/nfts/quantum-ranger-5823.png";
import olga from "@/shared/assets/images/nfts/void-hunter-4709.png";
import daunSArbuzom from "@/shared/assets/images/nfts/daun-s-arbuzom-8435.png";

export const INITIAL_NFT_COLLECTION: INft[] = [
    {
        id: "4821",
        name: "Extraterrestrial din din madung",
        rarity: "Legendary",
        price: 898.45,
        type: "popular",
        image: extraterrestrial,
    },
    {
        id: "8435",
        name: "Syka blyad",
        rarity: "Legendary",
        price: 444.45,
        type: "new",
        image: daunSArbuzom,
    },
    {
        id: "7392",
        name: "Samurai Mashka",
        rarity: "Rare",
        price: 112.38,
        type: "popular",
        image: digitalPhantom,
    },
    {
        id: "1205",
        name: "Kirill Barabulka",
        rarity: "Legendary",
        price: 201.77,
        type: "new",
        image: kirillBarabulka,
    },
    {
        id: "9451",
        name: "Kazah Level Up Super Ultra Max",
        rarity: "Common",
        price: 67.12,
        type: "new",
        image: cyberGuardian,
    },
    {
        id: "3178",
        name: "Chicken Nuggets",
        rarity: "Epic",
        price: 144.89,
        type: "new",
        image: neonSoul,
    },
    {
        id: "5823",
        name: "Quantum Ranger",
        rarity: "Rare",
        price: 198.45,
        type: "popular",
        image: quantumRanger,
    },
    {
        id: "4709",
        name: "Olga",
        rarity: "Legendary",
        price: 230.12,
        type: "popular",
        image: olga,
    },
    {
        id: "8632",
        name: "Femboi Warrior",
        rarity: "Common",
        price: 91.77,
        type: "new",
        image: femboiWarrior,
    },
    {
        id: "218",
        name: "Bee chlen",
        rarity: "Epic",
        price: 152.34,
        type: "popular",
        image: beeChlen,
    },
    {
        id: "7284",
        name: "Kit Igor",
        rarity: "Legendary",
        price: 123.67,
        type: "new",
        image: kitIgor,
    },
    {
        id: "3443",
        name: "Cock Guardian",
        rarity: "Legendary",
        price: 1222.67,
        type: "new",
        image: cockGuardian,
    },
    {
        id: "4353",
        name: "Lady Gaga",
        rarity: "Legendary",
        price: 543.67,
        type: "new",
        image: ladyGaga,
    },
];
