import { db } from "./index";
import { blogCategories, blogs } from "./schema";

const initialCategories = [
  {
    id: "cat-1",
    name: "Industrial & Commercial",
    slug: "industrial-commercial",
  },
  {
    id: "cat-2",
    name: "Residential Solar",
    slug: "residential-solar",
  },
  {
    id: "cat-3",
    name: "EPC & Installation",
    slug: "epc-installation",
  },
  {
    id: "cat-4",
    name: "Solar Technology",
    slug: "solar-technology",
  },
];

const initialBlogs = [
  {
    id: "blog-1",
    title: "How Industrial Solar Is Used Across Different Industries",
    slug: "how-industrial-solar-is-used-across-different-industries",
    categoryId: "cat-1",
    publishDate: "2026-10-13",
    mainBannerImage: "/blog/featured-solar-industrial.jpg",
    authorName: "R-ONE Power Engineering Team",
    metaTitle: "Industrial Solar Applications in Manufacturing | R-One Power",
    metaDescription:
      "Explore how industrial solar powers manufacturing, chemical plants, cold chains, and textiles, driving massive electricity savings and ESG compliance.",
    content: `Industrial solar is a key material and energy driver in many areas of manufacturing and heavy industry. While solar is often associated with domestic residential rooftops, it has many other important uses across modern production. It powers chemical plants, process textiles, treat industrial effluent, power high-capacity cold chains, and support modern agriculture.

## Uses of Industrial Solar Energy

### 1. Chemical Manufacturing & Processing Plants
The chemical industry is one of the biggest users of continuous industrial energy. Energy-intensive operations like brine electrolysis, caustic soda synthesis, chlorine generation, and synthetic polymer formulation require immense electrical current. Industrial rooftop and ground-mounted solar setups offset peak grid tariffs during high-output daylight hours, slashing continuous operational expenses.

### 2. Water Treatment and Effluent Purification
Industrial facilities rely on high-pressure Reverse Osmosis (RO) plants, heavy aeration pumps, and multi-stage effluent treatment plants (ETPs) to treat and purify wastewater. Industrial solar plants provide clean, dedicated electricity to keep filtration running non-stop.

### 3. Textile and Dyeing Mills
In the textile and fabric sector, solar electricity is utilized throughout spinning, weaving, boiler pre-heating, and water-heavy dyeing cycles. Textile mills possess enormous covered shed roof areas ideally suited for 500kW to 2MW+ distributed rooftop PV arrays.`,
    isDraft: false,
  },
  {
    id: "blog-2",
    title: "Industrial Solar vs Rooftop Residential: Understanding Key Differences",
    slug: "industrial-solar-vs-residential-key-differences",
    categoryId: "cat-1",
    publishDate: "2026-10-07",
    mainBannerImage: "/blog/solar-commercial-vs-residential.jpg",
    authorName: "Er. Vikram Singh",
    metaTitle: "Commercial vs Residential Solar Power Comparison",
    metaDescription:
      "Learn key differences between commercial high-voltage solar plants and rooftop residential solar, including net metering, voltage levels, and ROI.",
    content: `While both residential and industrial solar capture photons from the sun and convert them into clean kilowatt-hours via photovoltaic cells, their engineering architectures, scale, regulatory pathways, and return on investment operate in completely different realms.

## System Capacity & Voltage Grid Interconnection
Residential installations typically range between 3 kW and 10 kW, interconnected at low-voltage single-phase (230V) or three-phase (415V). In contrast, Commercial and Industrial (C&I) solar plants start at 50 kW and easily scale to 1 MW to 10 MW+, frequently interconnecting at 11 kV or 33 kV high-tension (HT) substations.`,
    isDraft: false,
  },
  {
    id: "blog-3",
    title: "How to Choose the Right Solar EPC Manufacturer and Supplier for Bulk Installations",
    slug: "how-to-choose-the-right-solar-epc-manufacturer",
    categoryId: "cat-3",
    publishDate: "2026-09-18",
    mainBannerImage: "/blog/solar-epc-manufacturer.jpg",
    authorName: "Anita Sharma",
    metaTitle: "Choosing a Commercial Solar EPC Contractor Checklist",
    metaDescription:
      "A comprehensive due diligence checklist for selecting Tier-1 solar EPC contractors, evaluating warranties, ALMM lists, and DISCOM approvals.",
    content: `A commercial solar power plant is a 25-year capital asset. The financial viability of your investment depends not only on the upfront quote, but on module degradation rates, inverter efficiency, structural stability, and the EPC contractor's execution integrity.`,
    isDraft: false,
  },
  {
    id: "blog-4",
    title: "Different Types of Solar: A Complete Guide to Modern Photovoltaic Solutions",
    slug: "different-types-of-solar-panels-complete-guide",
    categoryId: "cat-4",
    publishDate: "2026-09-15",
    mainBannerImage: "/blog/solar-panel-types.jpg",
    authorName: "Rahul Gupta",
    metaTitle: "Solar Panel Types: Monocrystalline vs Bifacial vs TopCon",
    metaDescription:
      "Detailed guide to modern photovoltaic technologies including Monocrystalline PERC, n-type TopCon, and Bifacial dual-glass solar panels.",
    content: `Solar cell efficiency has leaped forward dramatically over the past three years. Today, industrial and residential customers have access to high-wattage modules ranging from 540W to 700W+ per panel.`,
    isDraft: true,
  },
];

async function seed() {
  console.log("Seeding categories...");
  for (const cat of initialCategories) {
    await db
      .insert(blogCategories)
      .values(cat)
      .onConflictDoNothing();
  }

  console.log("Seeding blogs...");
  for (const b of initialBlogs) {
    await db
      .insert(blogs)
      .values(b)
      .onConflictDoNothing();
  }

  console.log("Seed completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});

