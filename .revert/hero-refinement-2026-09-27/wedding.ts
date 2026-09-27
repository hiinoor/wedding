export type WeddingDay = "24" | "25" | "26";
export type DressCodeId =
  | "engagement"
  | "mehendi"
  | "sangeet"
  | "haldi"
  | "wedding";

export interface WeddingEvent {
  id: string;
  day: WeddingDay;
  time: string;
  title: string;
  overviewLabel: string;
  description: string;
  dressCodeId: DressCodeId | null;
}

export interface DressCode {
  id: DressCodeId;
  event: string;
  mood: string;
  description: string;
  photo: { src: string; alt: string; objectPosition: string };
}

export interface TravelPlace {
  name: string;
  city: string;
  area: string;
  address: string;
  mapsQuery: string;
}

export interface TransportPoint {
  name: string;
  city?: string;
  distance: string;
  travelTime: string;
}

export interface Hotel {
  name: string;
  address: string | null;
  distanceFromVenue: string | null;
  contact: string | null;
}

export interface HelpContact {
  name: string;
  phone: string | null;
  whatsapp: string | null;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const wedding = {
  couple: { bride: "Khushboo", groom: "Parag" },
  dates: ["24", "25", "26"] as const,
  month: "November",
  year: 2026,
  heroEyebrow: "OUR FOREVER BEGINS",
  heroTagline: "Traditions. Celebrations. Togetherness.",
  introduction: {
    eyebrow: "A celebration of",
    heading: "Tradition & Togetherness",
    body: "Join us for three days of rituals, music and time with family and friends.",
  },
  photography: {
    heroKhushboo: {
      src: "/images/portrait-mint.jpg",
      alt: "Portrait of a woman in a mint traditional outfit among trees",
      objectPosition: "50% 42%",
    },
    heroParag: {
      src: "/images/portrait-white-shirt.jpg",
      alt: "Portrait of a man in a white shirt beside the water",
      objectPosition: "57% 48%",
    },
    scheduleMood: {
      src: "/images/schedule-lights-indigo.png",
      alt: "Brass lanterns and oil lamps glowing against indigo wedding decorations",
      objectPosition: "50% 50%",
    },
    dressIntro: {
      src: "/images/dress-code-intro-outfits.png",
      alt: "Blush embroidered dress and sage embroidered waistcoat displayed together in a heritage setting",
      objectPosition: "50% 50%",
    },
  },
  days: [
    { day: "24", label: "Arrival & Celebrations", photo: { src: "/images/mood-engagement.png", objectPosition: "50% 65%" } },
    { day: "25", label: "The Wedding Day", photo: { src: "/images/mood-wedding.png", objectPosition: "50% 40%" } },
    { day: "26", label: "Departure", photo: { src: "/images/la-vista-resort-lakeside.jpg", objectPosition: "50% 50%" } },
  ] as const,
  overviewTitle: "The Days Ahead",
  scheduleTitle: "Three Days of Celebration",
  dressCodeTitle: "Dress for the Celebration",
  dressCodeIntro: "All dress codes are just suggestions! :) No need to buy anything new, let us know if you have any questions!",
  stay: {
    checkIn: { day: "24" as WeddingDay, time: "11:00 AM" },
    checkOut: { day: "26" as WeddingDay, time: "9:00 AM" },
  },
  events: [
    {
      id: "check-in",
      day: "24",
      time: "11:00 AM",
      title: "Guest Check-in",
      overviewLabel: "Arrival",
      description: "Settle in and get ready for the celebrations ahead.",
      dressCodeId: null,
    },
    {
      id: "engagement",
      day: "24",
      time: "12:00 PM – 2:00 PM",
      title: "Engagement & Welcome Party",
      overviewLabel: "Engagement",
      description: "An elegant beginning to the celebrations.",
      dressCodeId: "engagement",
    },
    {
      id: "mehendi",
      day: "24",
      time: "4:00 PM – 6:00 PM",
      title: "Mehendi & Shrimanti Pujan",
      overviewLabel: "Mehendi",
      description: "An afternoon of colour, tradition and celebration.",
      dressCodeId: "mehendi",
    },
    {
      id: "sangeet",
      day: "24",
      time: "8:00 PM – 12:00 AM",
      title: "Sangeet",
      overviewLabel: "Sangeet",
      description: "Music, performances and an evening made for celebration.",
      dressCodeId: "sangeet",
    },
    {
      id: "haldi",
      day: "25",
      time: "10:00 AM – 12:00 PM",
      title: "Haldi",
      overviewLabel: "Haldi",
      description: "A bright morning filled with colour and celebration.",
      dressCodeId: "haldi",
    },
    {
      id: "wedding",
      day: "25",
      time: "5:30 PM onwards",
      title: "Varmala & Pheras",
      overviewLabel: "Varmala & Pheras",
      description: "An evening of traditions, rituals and celebration.",
      dressCodeId: "wedding",
    },
    {
      id: "check-out",
      day: "26",
      time: "9:00 AM",
      title: "Guest Check-out",
      overviewLabel: "Guest Check-out",
      description: "Breakfast, chai, and goodbyes before check-out.",
      dressCodeId: null,
    },
  ] satisfies WeddingEvent[],
  dressCodes: [
    {
      id: "engagement",
      event: "Engagement",
      mood: "Elegant Formal",
      description: "An elegant start to the celebrations. Choose polished Indian or contemporary formalwear that feels like you.",
      photo: {
        src: "/images/schedule-sherwani-still-life.png",
        alt: "Ivory embroidered sherwani with wine fabric and traditional accessories",
        objectPosition: "50% 50%",
      },
    },
    {
      id: "mehendi",
      event: "Mehendi & Shrimanti Pujan",
      mood: "Festive & Easy",
      description: "A relaxed afternoon of colour and tradition. Light, comfortable festive wear is perfect for moving around and joining in.",
      photo: {
        src: "/images/mood-mehendi.png",
        alt: "Editorial still life of green Indian textiles and a bowl of henna",
        objectPosition: "50% 50%",
      },
    },
    {
      id: "sangeet",
      event: "Sangeet",
      mood: "Evening Glamour",
      description: "Let the colors shine! This is the night to go bold and bright. Think rich, festive hues that light up the dance floor.",
      photo: {
        src: "/images/mood-sangeet.png",
        alt: "Editorial still life of a glowing brass lantern and dark textiles",
        objectPosition: "50% 50%",
      },
    },
    {
      id: "haldi",
      event: "Haldi",
      mood: "Sunshine & Colour",
      description: "We’re going for bright, breezy, and beautiful! Please wear shades of yellow, cream, orange to match the festive poolside spirit.",
      photo: {
        src: "/images/mood-haldi.png",
        alt: "Editorial still life of turmeric, warm fabrics and marigolds",
        objectPosition: "50% 50%",
      },
    },
    {
      id: "wedding",
      event: "Wedding",
      mood: "Timeless Elegance",
      description: "Traditional Indian attire or your favourite elegant festive outfit will feel right for the evening ceremonies.",
      photo: {
        src: "/images/mood-wedding.png",
        alt: "Editorial still life of ivory and wine brocade beside a brass diya",
        objectPosition: "50% 50%",
      },
    },
  ] satisfies DressCode[],
  travel: {
    eyebrow: "Travel & Stay",
    venue: {
      name: "La Vista Resort Lakeside",
      city: "Nagpur",
      area: "Suraburdi, Nagpur",
      address: "5W6V+MF, Drugdhamna, Alesur, Maharashtra 440021, India",
      mapsQuery:
        "La Vista Resort Lakeside, 5W6V+MF, Drugdhamna, Alesur, Maharashtra 440021",
    } satisfies TravelPlace,
    airport: {
      name: "Dr. Babasaheb Ambedkar International Airport",
      city: "Nagpur",
      distance: "Approx. 20 km",
      travelTime: "35–45 min",
    } satisfies TransportPoint,
    railwayPrimary: {
      name: "Nagpur Junction",
      distance: "Approx. 16 km",
      travelTime: "Approx. 35–40 min",
    } satisfies TransportPoint,
    railwaySecondary: {
      name: "Ajni Railway Station",
      distance: "Approx. 15 km",
      travelTime: "Approx. 35–40 min",
    } satisfies TransportPoint,
    arrivalNote:
      "Please plan your arrival accordingly so you're comfortably settled before the celebrations begin.",
    journeyNote:
      "We recommend allowing a little extra travel time when arriving from the airport or railway station, particularly during busy city hours.",
    hotels: [] as Hotel[],
    transport: {
      pickup: null as string | null,
      hotelToVenue: null as string | null,
      drop: null as string | null,
      parking: null as string | null,
    },
    helpContact: null as HelpContact | null,
  },
  faqs: [
    {
      question: "What time is check-in and check-out?",
      answer: "Check-in is on 24 November at 11:00 AM. Check-out is on 26 November at 9:00 AM. We recommend planning your journey accordingly so you're comfortably settled before the celebrations begin.",
    },
    {
      question: "How do I get from the airport or railway station to the hotel?",
      answer: "We have arranged private transportation for all our guests during their stay in Nagpur TO and FROM the airport/railway station. Please provide Parag and Khushboo your itinerary (paragpise22@gmail.com) so that we can help confirm your transportation.",
    },
    {
      question: "Who should I contact if I need help during the wedding?",
      answer: "Please text/call Parag (+91 7387672310), Khushboo (+91 9929532868) or Mohit (+91 9216201713) for ANY and ALL questions. We will do our best to help answer them!",
    },
    {
      question: "What will the weather feel like?",
      answer: "Late November in Nagpur is usually pleasant, dry, and comfortable, with warm afternoons and cooler mornings and evenings. Around the wedding dates, daytime temperatures are typically around 29–31°C, while nights can drop to roughly 14–17°C.",
    },
    {
      question: "Where exactly am I staying?",
      answer: "All guest accommodations are arranged at La Vista Resort Lakeside, Suraburdi, Nagpur, where the wedding celebrations will also take place. You’ll receive your room assignment and stay details when you check in on 24 November at 11:00 AM.",
    },
  ] satisfies FAQItem[],
} as const;

export const weddingDateRange = `${wedding.dates[0]}–${wedding.dates[2]} ${wedding.month} ${wedding.year}`;
