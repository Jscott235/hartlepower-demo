const HP = {
  rooms: [
    {
      id: 1,
      name: "Greenbank Boardroom",
      building: "Greenbank",
      size: 42,
      capacity: 20,
      rate: 20,
      code: "4821",
      status: "vacant",
      amenities: ["Projector", "Whiteboard", "WiFi", "Conference phone", "Air con"],
      photo: "https://static.wixstatic.com/media/4c82ce_1216512bf15a48ba9002ade7dc91b717~mv2.jpeg/v1/fill/w_740,h_495,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_auto/4c82ce_1216512bf15a48ba9002ade7dc91b717~mv2.jpeg",
      description: "Our flagship boardroom with ornate ceiling, seating up to 20. Perfect for board meetings, training days and presentations."
    },
    {
      id: 2,
      name: "Energy Hub Training Room 1",
      building: "Business Hub",
      size: 28,
      capacity: 12,
      rate: 8,
      code: "3374",
      status: "vacant",
      amenities: ["Projector", "Whiteboard", "WiFi", "Accessible"],
      photo: "https://static.wixstatic.com/media/4c82ce_a8c8f8a4ee064f67a7ceab40cb184117~mv2.png/v1/fill/w_740,h_495,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_auto/4c82ce_a8c8f8a4ee064f67a7ceab40cb184117~mv2.png",
      description: "A flexible training room ideal for workshops, team meetings and collaborative sessions."
    },
    {
      id: 3,
      name: "West Wing Meeting Room",
      building: "Greenbank",
      size: 18,
      capacity: 6,
      rate: 10,
      code: "6619",
      status: "vacant",
      amenities: ["Whiteboard", "WiFi", "Accessible"],
      photo: "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?w=740&q=80",
      description: "Intimate meeting room on the ground floor, wheelchair accessible, ideal for small team meetings and client meetings."
    },
    {
      id: 4,
      name: "Hub Hot Desk Suite",
      building: "Business Hub",
      size: 35,
      capacity: 8,
      rate: 5,
      code: null,
      status: "vacant",
      amenities: ["WiFi", "Printing", "Kitchen access", "Locker"],
      photo: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=740&q=80",
      description: "Flexible hot desking space with 8 individual workstations, perfect for freelancers and remote workers."
    }
  ],

  offices: [
    {
      id: 1,
      name: "Room 12",
      building: "Business Hub",
      size: 16,
      capacity: 2,
      price: 216,
      code: "7743",
      status: "vacant",
      amenities: ["24hr access", "Broadband", "Utilities incl.", "Car parking"],
      photo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=740&q=80",
      description: "Compact private office ideal for 1-2 person teams. Ground floor, easy access."
    },
    {
      id: 2,
      name: "Room 7",
      building: "Greenbank",
      size: 24,
      capacity: 4,
      price: 295,
      code: "2291",
      status: "vacant",
      amenities: ["24hr access", "Broadband", "Utilities incl.", "Car parking", "Kitchen access"],
      photo: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=740&q=80",
      description: "Mid-size private office in the historic Greenbank building. Character space with high ceilings."
    },
    {
      id: 3,
      name: "Suite 3",
      building: "Greenbank",
      size: 38,
      capacity: 6,
      price: 360,
      code: "5582",
      status: "vacant",
      amenities: ["24hr access", "Broadband", "Utilities incl.", "Car parking", "Kitchen access", "Breakout area"],
      photo: "https://images.unsplash.com/photo-1497366754035-f200968a6f72?w=740&q=80",
      description: "Our largest available office suite. Ideal for growing teams. Private meeting area included."
    },
    {
      id: 4,
      name: "Room 9",
      building: "Business Hub",
      size: 20,
      capacity: 3,
      price: 245,
      code: null,
      status: "tenanted",
      tenant: "Tees Valley Web",
      tenantSince: "Jan 2025",
      amenities: ["24hr access", "Broadband", "Utilities incl.", "Car parking"],
      photo: "https://images.unsplash.com/photo-1497366858526-0766e3d04dc4?w=740&q=80",
      description: "Private office for up to 3 people."
    }
  ],

  tenants: [
    {
      id: 1,
      name: "Sarah Mitchell",
      business: "Mitchell Creative",
      businessType: "Design Agency",
      email: "sarah@mitchellcreative.co.uk",
      phone: "07821 334 562",
      room: "Room 7",
      building: "Greenbank",
      rent: 295,
      contractStart: "2025-03-01",
      contractEnd: "2026-03-01",
      status: "active",
      paymentStatus: "up-to-date",
      initials: "SM",
      color: "#1A9B8C"
    },
    {
      id: 2,
      name: "James Whitfield",
      business: "Tees Valley Web",
      businessType: "Web Development",
      email: "james@teesvalleyweb.co.uk",
      phone: "07934 221 879",
      room: "Room 9",
      building: "Business Hub",
      rent: 245,
      contractStart: "2025-01-01",
      contractEnd: "2026-01-01",
      status: "active",
      paymentStatus: "up-to-date",
      initials: "JW",
      color: "#E8A020"
    },
    {
      id: 3,
      name: "Priya Sharma",
      business: "Hartlepool Counselling Services",
      businessType: "Healthcare",
      email: "priya@hartlepoolcounselling.co.uk",
      phone: "07712 445 332",
      room: "Suite 3",
      building: "Greenbank",
      rent: 360,
      contractStart: "2024-09-01",
      contractEnd: "2025-09-01",
      status: "active",
      paymentStatus: "overdue",
      initials: "PS",
      color: "#7B5EA7"
    }
  ],

  virtualTenants: [
    {
      id: 1,
      name: "David Carr",
      business: "Carr Financial Consulting",
      email: "david@carrfinancial.co.uk",
      subscriptionStart: "2025-02-01",
      nextPayment: "2025-08-01",
      status: "active",
      mail: [
        { id: 1, from: "HMRC", received: "2025-07-03", description: "Official correspondence", collected: false },
        { id: 2, from: "Barclays Business", received: "2025-07-01", description: "Bank statement", collected: true },
        { id: 3, from: "Companies House", received: "2025-06-28", description: "Annual return reminder", collected: true }
      ]
    }
  ],

  prospects: [
    {
      id: 1,
      name: "Rachel Green",
      business: "Harbour Lane Physio",
      businessType: "Healthcare",
      headcount: 2,
      sizeNeeded: "small",
      budget: "200-300",
      moveIn: "August 2025",
      interested: ["Room 12", "Room 7"],
      submitted: "2025-07-04",
      status: "new"
    },
    {
      id: 2,
      name: "Tom Barker",
      business: "NE Digital Marketing",
      businessType: "Marketing",
      headcount: 4,
      sizeNeeded: "medium",
      budget: "250-350",
      moveIn: "September 2025",
      interested: ["Room 7", "Suite 3"],
      submitted: "2025-07-03",
      status: "viewing-booked",
      viewingDate: "Tuesday 8 July, 10:30am"
    }
  ],

  maintenance: [
    {
      id: 1,
      tenant: "Mitchell Creative",
      room: "Room 7",
      building: "Greenbank",
      issue: "Radiator making noise",
      description: "The radiator has been making a loud clicking noise since Monday, especially in the morning.",
      submitted: "2025-07-03",
      status: "in-progress",
      priority: "medium"
    },
    {
      id: 2,
      tenant: "Tees Valley Web",
      room: "Room 9",
      building: "Business Hub",
      issue: "Flickering light",
      description: "The overhead light in the main office area flickers intermittently.",
      submitted: "2025-07-01",
      status: "open",
      priority: "low"
    }
  ],

  bookings: [
    { id: 1, room: "Greenbank Boardroom", booker: "Hartlepool College", date: "2025-07-07", time: "09:00-13:00", paid: true },
    { id: 2, room: "Energy Hub Training Room 1", booker: "Sarah Mitchell", date: "2025-07-07", time: "14:00-16:00", paid: true },
    { id: 3, room: "Greenbank Boardroom", booker: "St Hilda's Community Centre", date: "2025-07-08", time: "10:00-12:00", paid: false }
  ],

  notices: [
    { id: 1, title: "Fire alarm test", body: "Scheduled fire alarm test this Friday 11 July at 12:00 noon. Please do not evacuate — this is a test. Duration approx. 30 seconds.", target: "all", date: "2025-07-04", pinned: true },
    { id: 2, title: "Car park resurfacing", body: "The car park will be partially closed on Monday 7 July for resurfacing works. Alternative parking available on Waldon Street.", target: "greenbank", date: "2025-07-03", pinned: false },
    { id: 3, title: "Virtual office collection hours this week", body: "Post collection hours are reduced this Thursday — please collect before 2pm. Normal hours resume Friday.", target: "virtual", date: "2025-07-02", pinned: false }
  ],

  communityPosts: [
    {
      id: 1,
      author: "Tees Valley Web",
      initials: "JW",
      color: "#E8A020",
      time: "2 hours ago",
      body: "Looking for a reliable local accountant — any recommendations from the community? We're growing fast and need someone who knows their stuff. 🚀",
      likes: 3,
      replies: 2,
      pinned: false
    },
    {
      id: 2,
      author: "HartlePower Team",
      initials: "HP",
      color: "#1A9B8C",
      time: "Yesterday",
      body: "🎉 Welcome to Mitchell Creative who joined us in Room 7 this week! Sarah specialises in brand identity and print design — pop your head in and say hi!",
      likes: 8,
      replies: 4,
      pinned: true
    },
    {
      id: 3,
      author: "Hartlepool Counselling Services",
      initials: "PS",
      color: "#7B5EA7",
      time: "3 days ago",
      body: "Reminder that we offer a free 15-minute consultation to all HartlePower tenants and their staff. Mental health support is important — don't hesitate to reach out.",
      likes: 12,
      replies: 1,
      pinned: false
    }
  ]
};
