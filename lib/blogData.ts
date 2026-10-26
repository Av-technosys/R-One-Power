export interface BlogSection {
  title: string
  content: string
  bulletPoints?: string[]
}

export interface BlogPost {
  slug: string
  title: string
  subtitle?: string
  excerpt: string
  date: string
  formattedDate: string
  readTime: string
  featured: boolean
  image: string
  introParagraphs: string[]
  mainSectionTitle: string
  sections: BlogSection[]
  author?: {
    name: string
    role: string
  }
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-industrial-solar-is-used-across-different-industries",
    title: "How Industrial Solar Is Used Across Different Industries",
    subtitle: "Turnkey EPC Engineering, Cost Reduction, and Clean Power Adoption in Manufacturing",
    excerpt:
      "Industrial solar plays an important role in various industries, from chemical manufacturing and water treatment to textiles and detergent production. Explore its key applications, energy savings, and turnkey execution.",
    date: "2026-10-13",
    formattedDate: "Oct 13, 2026",
    readTime: "7 min read",
    featured: true,
    image: "/blog/featured-solar-industrial.jpg",
    introParagraphs: [
      "Industrial solar is a key material and energy driver in many areas of manufacturing and heavy industry. While solar is often associated with cooking and domestic residential rooftops, it has many other important uses across modern production. It powers chemical plants, process textiles, treat industrial effluent, power high-capacity cold chains, and support modern agriculture.",
      "Industrial solar is crucial for ensuring production runs smoothly, electricity expenses stay predictable, and large-scale industrial operations remain competitive against surging utility tariffs.",
      "As manufacturing and industrial parks expand across Rajasthan and pan-India, the need for reliable, captive, and cost-effective clean power supplies continues to rise exponentially.",
      "Enterprises require solar power engineering tailored to their specific operational needs—matching roof load capacities, continuous high-voltage (HT) grid synchronization, peak kilowatt demands, and zero-export or open-access regulatory compliance. R-ONE Power, a premier MNRE-certified solar EPC company in India, delivers turnkey industrial solar plants that satisfy these rigorous industrial standards."
    ],
    mainSectionTitle: "Uses of Industrial Solar Energy",
    sections: [
      {
        title: "1. Chemical Manufacturing & Processing Plants",
        content:
          "The chemical industry is one of the biggest users of continuous industrial energy. Energy-intensive operations like brine electrolysis, caustic soda synthesis, chlorine generation, and synthetic polymer formulation require immense electrical current. Industrial rooftop and ground-mounted solar setups offset peak grid tariffs during high-output daylight hours, slashing continuous operational expenses while meeting national ESG compliance benchmarks.",
        bulletPoints: [
          "Electrolytic processes and high-load compression units operate with zero voltage sag.",
          "Custom heavy-gauge mounting structures resist corrosive chemical fumes.",
          "Substantial reduction in per-unit manufacturing cost translates to direct bottom-line margin expansion."
        ]
      },
      {
        title: "2. Water Treatment and Effluent Purification",
        content:
          "Industrial facilities rely on high-pressure Reverse Osmosis (RO) plants, heavy aeration pumps, and multi-stage effluent treatment plants (ETPs) to treat and purify wastewater. Industrial solar plants provide clean, dedicated electricity to keep filtration and chemical dosing systems running non-stop without triggering hefty discom peak demand penalties.",
        bulletPoints: [
          "Solar water treatment pumps reduce grid dependence and diesel generator running hours.",
          "Prevents high-demand surge tariffs during municipal supply cycles.",
          "Improves industrial water recycling compliance under strict pollution control board standards."
        ]
      },
      {
        title: "3. Textile and Dyeing Mills",
        content:
          "In the textile and fabric sector, solar electricity is utilized throughout spinning, weaving, boiler pre-heating, and water-heavy dyeing cycles. Textile mills possess enormous covered shed roof areas ideally suited for 500kW to 2MW+ distributed rooftop PV arrays, capturing direct irradiance without requiring additional land acquisition.",
        bulletPoints: [
          "Massive factory shed roofs convert dormant airspace into captive green power generators.",
          "Uniform daylight energy generation aligns perfectly with multi-shift textile manufacturing hours.",
          "Eligible for 40% accelerated depreciation (AD) benefits under Indian taxation laws."
        ]
      },
      {
        title: "4. Cold Storage and Food Processing Hubs",
        content:
          "Perishable food supply chains, agricultural cold storage units, and dairy processors cannot afford even minute-long power fluctuations. Industrial solar coupled with smart hybrid battery storage ensures uninterrupted cooling compressors and protects high-value inventory from catastrophic thermal spoilage.",
        bulletPoints: [
          "Suppresses peak afternoon air conditioning and chiller plant electrical surges.",
          "Reduces diesel fuel consumption by up to 70% during daytime grid outages.",
          "Ensures reliable farm-to-table refrigeration standards in high ambient temperature regions."
        ]
      },
      {
        title: "5. Cement, Steel & Heavy Engineering",
        content:
          "Heavy manufacturing hubs with massive open areas and auxiliary buildings deploy high-voltage solar plants to handle auxiliary loads, office cooling, conveyor networks, and workshop machinery, reducing composite plant carbon emissions.",
        bulletPoints: [
          "Turnkey EPC integration with plant SCADA and remote telemetry systems.",
          "Payback periods as short as 3 to 4 years against commercial tariffs.",
          "Guaranteed 25-year performance warranty with Tier-1 bifacial panels."
        ]
      }
    ],
    author: {
      name: "R-ONE Power Engineering Team",
      role: "MNRE Certified Solar EPC Specialists"
    }
  },
  {
    slug: "industrial-solar-vs-residential-key-differences",
    title: "Industrial Solar vs Rooftop Residential: Understanding Key Differences",
    excerpt:
      "Industrial solar and residential rooftop installations serve fundamentally different scales. Learn about system engineering, high-voltage HT connectivity, net metering, and financial payback.",
    date: "2026-10-07",
    formattedDate: "Oct 7, 2026",
    readTime: "5 min read",
    featured: false,
    image: "/blog/solar-commercial-vs-residential.jpg",
    introParagraphs: [
      "While both residential and industrial solar capture photons from the sun and convert them into clean kilowatt-hours via photovoltaic cells, their engineering architectures, scale, regulatory pathways, and return on investment operate in completely different realms.",
      "Understanding these distinctions helps property owners, factory operators, and commercial building managers select the exact sizing, structural mounting, and financial scheme suited to their consumption."
    ],
    mainSectionTitle: "Key Technical & Financial Distinctions",
    sections: [
      {
        title: "1. System Capacity & Voltage Grid Interconnection",
        content:
          "Residential installations typically range between 3 kW and 10 kW, interconnected at low-voltage single-phase (230V) or three-phase (415V). In contrast, Commercial and Industrial (C&I) solar plants start at 50 kW and easily scale to 1 MW to 10 MW+, frequently interconnecting at 11 kV or 33 kV high-tension (HT) substations.",
        bulletPoints: [
          "Residential: 3kW – 15kW, LT connection, simple bi-directional net meter.",
          "Industrial: 50kW – 5MW+, HT transmission, vacuum circuit breakers, dedicated step-up transformers."
        ]
      },
      {
        title: "2. Financial Return & Payback Duration",
        content:
          "Residential customers primarily seek to zero out their tier-based domestic electricity bills with the assistance of central schemes like PM Surya Ghar Muft Bijli Yojana (up to ₹78,000 subsidy). Industrial consumers, paying commercial tariffs upwards of ₹8–₹11 per unit, experience accelerated capital recovery, achieving full CAPEX break-even within 3 to 4 years."
      },
      {
        title: "3. Structural Engineering & Wind Load Specifications",
        content:
          "Industrial rooftops—whether metal standing-seam, trapezoidal sheet, or RCC sheds—require specialized non-penetrating clamps and aerodynamic ballast framing designed to withstand wind gusts up to 150 km/h without compromising roof waterproofing."
      }
    ],
    author: {
      name: "Er. Vikram Singh",
      role: "Lead Project Engineer, R-ONE Power"
    }
  },
  {
    slug: "how-to-choose-the-right-solar-epc-manufacturer",
    title: "How to Choose the Right Solar EPC Manufacturer and Supplier for Bulk Installations",
    excerpt:
      "Choosing the right solar EPC partner and Tier-1 component supplier is essential for consistent energy yield, high uptime, and dependable 25-year warranty support.",
    date: "2026-09-18",
    formattedDate: "Sep 18, 2026",
    readTime: "6 min read",
    featured: false,
    image: "/blog/solar-epc-manufacturer.jpg",
    introParagraphs: [
      "A commercial solar power plant is a 25-year capital asset. The financial viability of your investment depends not only on the upfront quote, but on module degradation rates, inverter efficiency, structural stability, and the EPC contractor's execution integrity.",
      "Here is the proven framework our engineering team advises every commercial investor and plant manager to evaluate before signing an EPC contract."
    ],
    mainSectionTitle: "Essential Evaluation Criteria for Commercial Solar EPC",
    sections: [
      {
        title: "1. MNRE Certification & Proven Track Record",
        content:
          "Always verify if the solar EPC provider is officially certified by the Ministry of New and Renewable Energy (MNRE) and possesses verified case studies of completed megawatt-scale or multi-rooftop projects across industrial belts."
      },
      {
        title: "2. Tier-1 ALMM Approved Photovoltaic Modules",
        content:
          "Ensure panels are included on the Approved List of Models and Manufacturers (ALMM) with positive power tolerance (+3%) and linear degradation guarantees limiting 25-year power loss to under 0.5% per year."
      },
      {
        title: "3. End-to-End DISCOM Approval & Net Metering Liaison",
        content:
          "A true turnkey EPC partner handles all statutory clearance: CEIG electrical safety inspector approvals, DISCOM feasibility studies, transformer enhancements, and bi-directional meter synchronization."
      }
    ],
    author: {
      name: "Anita Sharma",
      role: "Technical Director, R-ONE Power"
    }
  },
  {
    slug: "different-types-of-solar-panels-complete-guide",
    title: "Different Types of Solar: A Complete Guide to Modern Photovoltaic Solutions",
    excerpt:
      "Learn about modern high-efficiency solar panel technologies, including Monocrystalline PERC, Bifacial dual-glass, and TopCon cells, their efficiency ratings, and optimal use cases.",
    date: "2026-09-15",
    formattedDate: "Sep 15, 2026",
    readTime: "8 min read",
    featured: false,
    image: "/blog/solar-panel-types.jpg",
    introParagraphs: [
      "Solar cell efficiency has leaped forward dramatically over the past three years. Today, industrial and residential customers have access to high-wattage modules ranging from 540W to 700W+ per panel.",
      "Selecting the right cell architecture determines how much power your roof will harvest during foggy mornings, extreme summer heat, and diffuse cloudy conditions."
    ],
    mainSectionTitle: "Comparing Photovoltaic Cell Technologies",
    sections: [
      {
        title: "1. Monocrystalline PERC Panels",
        content:
          "Manufactured from high-purity single-crystal silicon ingots, Monocrystalline PERC modules offer efficiency between 20.5% and 22%. Their uniform dark black appearance and compact footprint make them the gold standard for rooftops with limited surface area."
      },
      {
        title: "2. Bifacial Dual-Glass Modules",
        content:
          "Bifacial panels generate electricity from both the front and back sides. When installed on reflective industrial surfaces (such as white cool-roof coatings or light RCC terrace floors), bifacial gain adds an extra 10% to 25% energy yield at minimal incremental cost."
      },
      {
        title: "3. TopCon (Tunnel Oxide Passivated Contact)",
        content:
          "TopCon is the cutting edge of n-type silicon solar technology, delivering over 22.5%+ module efficiency, superior temperature coefficients, and negligible Light-Induced Degradation (LID) in tropical Indian climates."
      }
    ],
    author: {
      name: "Rahul Gupta",
      role: "Project Manager, R-ONE Power"
    }
  }
]

export function getAllPosts(): BlogPost[] {
  return blogPosts
}

export function getFeaturedPost(): BlogPost {
  return blogPosts.find((p) => p.featured) || blogPosts[0]
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getMorePosts(excludeSlug?: string): BlogPost[] {
  return blogPosts.filter((p) => (excludeSlug ? p.slug !== excludeSlug : !p.featured))
}
