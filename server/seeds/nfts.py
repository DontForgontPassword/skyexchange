from fastapi import Depends
from sqlalchemy.orm import Session

from models.nft import NFT
from database import SessionLocal


def seed_nfts():
    db = SessionLocal()
    if db.query(NFT).count() > 0:
        print("NFTs already seeded")
        return

    nfts = [
        NFT(
            id=4821,
            name="Extraterrestrial din din madung",
            rarity="Legendary",
            price=898.45,
            type="popular",
            image="/static/nfts/extraterrestrial-din-din-madung-4821.png",
        ),
        NFT(
            id=8435,
            name="Syka blyad",
            rarity="Legendary",
            price=444.45,
            type="new",
            image="/static/nfts/daun-s-arbuzom-8435.png",
        ),
        NFT(
            id=7392,
            name="Samurai Mashka",
            rarity="Rare",
            price=112.38,
            type="popular",
            image="/static/nfts/digital-phantom-7392.png",
        ),
        NFT(
            id=1205,
            name="Kirill Barabulka",
            rarity="Legendary",
            price=201.77,
            type="new",
            image="/static/nfts/kirill-barabulka-1205.png",
        ),
        NFT(
            id=9451,
            name="Kazah Level Up Super Ultra Max",
            rarity="Common",
            price=67.12,
            type="new",
            image="/static/nfts/cyber-guardian-9451.png",
        ),
        NFT(
            id=3178,
            name="Chicken Nuggets",
            rarity="Epic",
            price=144.89,
            type="new",
            image="/static/nfts/neon-soul-3178.png",
        ),
        NFT(
            id=5823,
            name="Quantum Ranger",
            rarity="Rare",
            price=198.45,
            type="popular",
            image="/static/nfts/quantum-ranger-5823.png",
        ),
        NFT(
            id=4709,
            name="Olga",
            rarity="Legendary",
            price=230.12,
            type="popular",
            image="/static/nfts/void-hunter-4709.png",
        ),
        NFT(
            id=8632,
            name="Femboi Warrior",
            rarity="Common",
            price=91.77,
            type="new",
            image="/static/nfts/femboi-warrior-8632.png",
        ),
        NFT(
            id=218,
            name="Bee chlen",
            rarity="Epic",
            price=152.34,
            type="popular",
            image="/static/nfts/bee-chlen-218.jpg",
        ),
        NFT(
            id=7284,
            name="Kit Igor",
            rarity="Legendary",
            price=123.67,
            type="new",
            image="/static/nfts/cyber-guardian-7284.jpg",
        ),
        NFT(
            id=3443,
            name="Cock Guardian",
            rarity="Legendary",
            price=1222.67,
            type="new",
            image="/static/nfts/cocal-guardian-3443.jpg",
        ),
        NFT(
            id=4353,
            name="Lady Gaga",
            rarity="Legendary",
            price=543.67,
            type="new",
            image="/static/nfts/lady-gaga-4353.jpg",
        ),
    ]

    db.add_all(nfts)
    db.commit()

    print("NFTs seeded successfully ✅")