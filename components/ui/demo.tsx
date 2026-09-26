"use client";

import { SqueezeCarousel, type SqueezeSlide } from "@/components/ui/carousel-squeeze";

export const settings = {
    height: 320,
    gap: 16,
    slatGap: 8,
    slatWidth: 8,
    radius: 6,
    duration: 1000,
    hoverGrow: true,
    autoplay: false,
    interval: 6000,
    controls: true,
};

type DemoProps = Partial<typeof settings>;

/** A wordmark for the corner of the open panel. */
const mark = (text: string) => (
    <span className="text-sm font-medium tracking-tight text-white bg-black/60 px-2.5 py-1 rounded backdrop-blur border border-white/10 uppercase font-mono text-[11px]">{text}</span>
);

export const streetwearSlides: SqueezeSlide[] = [
    {
        id: "nero-collab",
        title: "NERO X DEDICATE — Heavyweight Collab Drop.",
        description:
            "240 GSM ultra-combed cotton featuring discharge dystopian artwork and chrome foil accents. Limited to 100 pieces.",
        action: "Pre-Order via WhatsApp",
        overlay: mark("DROP 01 // NERO COLLAB"),
        image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "Streetwear model wearing black oversized graphic tee",
        href: "#catalog-section",
    },
    {
        id: "you-are-sick",
        title: "YOU ARE SICK — Signature 235 GSM Boxy Cut.",
        description:
            "Wide drop shoulder silhouette, 3.5cm thick neck collar ribbing, and high-density plastisol print. Engineered for street aesthetics.",
        action: "Lihat Detail Kaos",
        overlay: mark("DROP 02 // 235 GSM BOXY"),
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "Urban streetwear model in dark boxy tee posing in city alley",
        href: "#catalog-section",
    },
    {
        id: "system-collapse",
        title: "SYSTEM COLLAPSE — 260 GSM Acid Washed Vintage Charcoal.",
        description:
            "14s vintage washed heavyweight cotton with industrial Y2K typography across the back and heavy drape.",
        action: "Buka Battle-Room",
        overlay: mark("DROP 03 // 260 GSM ACID WASH"),
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "Vintage grunge washed graphic tee streetwear model",
        href: "#catalog-section",
    },
    {
        id: "anxiety-society",
        title: "ANXIETY SOCIETY — Distressed Cracked-Ink Edition.",
        description:
            "200 GSM breathable combed cotton exploring urban grunge culture with authentic cracked ink plastisol finish.",
        action: "Pesan via WA",
        overlay: mark("DROP 04 // CRACKED INK"),
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "Dark gothic streetwear apparel on model",
        href: "#catalog-section",
    },
    {
        id: "cybernetic-ls",
        title: "CYBERNETIC ARCHIVE — Burgundy Crimson Heavy Longsleeve.",
        description:
            "Deep burgundy wine heavyweight cotton with high-density tribal sleeves and ribbed cuffs designed for layering.",
        action: "Eksplor Longsleeve",
        overlay: mark("DROP 05 // CYBERNETIC LS"),
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "High-fashion urban streetwear editorial on model",
        href: "#catalog-section",
    },
    {
        id: "void-hoodie",
        title: "VOID DIVISION — 380 GSM Heavy Boxy Zip Hoodie.",
        description:
            "Substantial cotton fleece with tonal 3D puff embroidery and double-lined hood for cold Yogyakarta underground nights.",
        action: "Cek Ketersediaan",
        overlay: mark("DROP 06 // 380 GSM FLEECE"),
        image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "Streetwear hoodie lookbook photo on model",
        href: "#catalog-section",
    },
    {
        id: "yk-lookbook",
        title: "MALIOBORO & UNDERGROUND — Yogyakarta Streetwear Lookbook.",
        description:
            "Raw, unpolished snapshots of the Dedicaterealite community styling boxy cuts in alleyways, gigs, and skate spots.",
        action: "Buka Lookbook",
        overlay: mark("LOOKBOOK // YK UNDERGROUND"),
        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "Streetwear community aesthetic in Yogyakarta",
        href: "#lookbook-section",
    },
];

export default function SqueezeCarouselDemo(props: DemoProps) {
    const options = { ...settings, ...props };

    return (
        <div className="bg-background w-full px-4 sm:px-6 py-8">
            <SqueezeCarousel 
                slides={streetwearSlides} 
                label="Dedicaterealite Apparel Showcase" 
                accent="#7A0006"
                accentForeground="#ffffff"
                height={340}
                {...options} 
            />
        </div>
    );
}
