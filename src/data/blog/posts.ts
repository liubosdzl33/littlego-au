export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML content
  author: string;
  publishedAt: string; // ISO date
  updatedAt?: string;
  category: 'playgrounds' | 'activities' | 'events' | 'tips' | 'reviews';
  tags: string[];
  featuredImage?: string; // URL or path
  seoTitle?: string;
  seoDescription?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'weekend-planner-melbourne-families-feb-28-mar-1-2026',
    title: 'Weekend Planner: Melbourne Family Fun for February 28 – March 1',
    excerpt: 'Warm weather, colourful festivals, and plenty of outdoor play — here\'s your family weekend sorted with playground picks, events, and a backup plan if the clouds roll in.',
    content: `
      <p>Late February in Melbourne is that golden sweet spot: the scorching days have eased off, the evenings are longer, and the city is buzzing with end-of-summer energy. This weekend looks ideal for getting outdoors with the kids — here's how to make the most of it.</p>

      <h2>🌤️ Weekend Weather at a Glance</h2>
      <p><strong>Saturday:</strong> Around 22°C with partly cloudy skies — genuinely perfect playground weather. UV will still be moderate, so hats and sunscreen are non-negotiable.<br>
      <strong>Sunday:</strong> Slightly cooler at 20°C with a chance of light showers in the afternoon. Plan your outdoor adventures for the morning and have an indoor backup ready.</p>

      <h2>🎪 What's On This Weekend</h2>

      <h3>Antipodes Festival — Lonsdale Street, CBD</h3>
      <p>Melbourne's beloved Greek festival is back for its 38th year, transforming Lonsdale Street into a vibrant celebration of Greek-Australian culture. For families, this means incredible street food (the loukoumades alone are worth the trip), live music, and dancing. Kids love the atmosphere, and there's usually face painting and activities scattered along the route. It's free to wander, and the CBD location means easy access via the free tram zone.</p>

      <h3>Holi Festival — Docklands</h3>
      <p>If your kids have never experienced a Holi colour festival, this is the one. Docklands lights up with music, dance performances, and of course, clouds of colourful powder. A few tips from parents who've done this before: dress everyone in white (it looks amazing in photos), bring a change of clothes, and leave the pram at home — a carrier works better in the crowds. Kids absolutely love it.</p>

      <h3>Sydney Road Street Party — Brunswick</h3>
      <p>Kicking off the Brunswick Music Festival, this is Melbourne's biggest and longest-running street party. Sydney Road closes to traffic and fills with live music stages, food stalls, craft vendors, and community groups. It's wonderfully chaotic in the best way. For families with younger kids, arrive earlier in the day when it's less crowded — by mid-afternoon it gets pretty packed.</p>

      <h3>Tinkertown — Scienceworks (Ongoing)</h3>
      <p>If Sunday's showers arrive, Scienceworks has you covered. Their hands-on Tinkertown exhibition is designed for budding engineers and creators aged 3–8. Kids can build, design, and problem-solve their way through an interactive village. It's included with general admission and genuinely engaging — not one of those exhibits where parents do all the work.</p>

      <h2>🛝 Playground Picks for This Weekend</h2>

      <h3>Saturday: Royal Park Nature Play, Parkville</h3>
      <p>With mild conditions and partial cloud cover, Saturday is made for a nature playground. Royal Park's nature play area is one of Melbourne's best — fallen logs to climb, rocks to scramble over, sand play, and a water pump area that toddlers find endlessly fascinating. There's decent shade from mature trees, and you're right next to the Royal Park train station. Pack a picnic and claim a spot under the elms.</p>
      <p><strong>Nearby bonus:</strong> Melbourne Zoo is just across the road if the kids want more adventure.</p>

      <h3>Sunday Morning: Flagstaff Gardens, West Melbourne</h3>
      <p>If you want to beat any afternoon rain, Flagstaff Gardens is a smart Sunday morning pick. The recently upgraded playground has excellent equipment for toddlers and older kids, with good shade coverage and clean facilities. It's in the free tram zone, there are cafés nearby on William Street for your coffee fix, and if rain does start, you can duck into the State Library or Melbourne Central in minutes.</p>

      <h2>🎒 What to Pack This Weekend</h2>
      <ul>
        <li><strong>Saturday:</strong> Sunscreen, hats, water bottles, a picnic blanket, and snacks (always more snacks than you think you need)</li>
        <li><strong>Sunday:</strong> Everything above plus a lightweight rain jacket for each kid and a spare set of clothes in the car</li>
        <li><strong>If heading to Holi Festival:</strong> Old white clothes, wet wipes (so many wet wipes), and a plastic bag for colourful clothes afterwards</li>
      </ul>

      <h2>🍦 Family-Friendly Eating</h2>
      <p>If you're in the city for the Antipodes Festival, grab lunch from the street food stalls — souvlaki, spanakopita, and baklava are all toddler-approved in our experience. For something sit-down, <strong>Brunetti</strong> on Lonsdale Street is right in the thick of the festival and has high chairs and a kids' menu.</p>
      <p>Near Royal Park, <strong>Pidapipó Laboratorio</strong> in Carlton is a short drive for what might be Melbourne's best gelato. Yes, it's worth the detour.</p>

      <h2>📋 Your Weekend Game Plan</h2>

      <h4>Saturday</h4>
      <p>Morning at Royal Park playground → picnic lunch → afternoon wander through the Antipodes Festival or Holi Festival in Docklands.</p>

      <h4>Sunday</h4>
      <p>Early playground session at Flagstaff Gardens → brunch on William Street → if rain arrives, head to Scienceworks for Tinkertown or the State Library's kids' section.</p>

      <p>Whatever you end up doing, the last weekend of February is one of those Melbourne moments worth savouring. Summer's not quite done with us yet — get out there and enjoy it with your little ones.</p>

      <p>Need more playground ideas? Use our <a href="/search?category=playground">playground finder</a> to discover spots near you, filtered by age group and facilities.</p>
    `,
    author: 'LittleGo Team',
    publishedAt: '2026-02-28T07:00:00+11:00',
    category: 'activities',
    tags: ['weekend planner', 'melbourne events', 'family activities', 'playgrounds', 'february 2026', 'antipodes festival', 'holi festival'],
    seoTitle: 'Melbourne Family Weekend Planner Feb 28 – Mar 1, 2026 | Playgrounds, Events & Activities',
    seoDescription: 'Plan your family weekend in Melbourne with our guide to the best playgrounds, festivals like Antipodes and Holi, and rainy day backup plans. Perfect for families with toddlers and young kids.'
  },
  {
    slug: 'best-shaded-playgrounds-south-east-melbourne',
    title: 'Best Shaded Playgrounds in South East Melbourne',
    excerpt: 'Discover the top family-friendly playgrounds with excellent shade coverage in South East Melbourne, perfect for protecting your little ones from Australia\'s harsh UV rays.',
    content: `
      <p>Australia has some of the highest UV levels in the world, making shade coverage absolutely crucial when choosing playgrounds for our children. The Cancer Council Australia reports that UV radiation is the main cause of skin cancer, which kills more than 2,000 Australians each year. For families in South East Melbourne, finding well-shaded playgrounds isn't just about comfort—it's about protecting our children's health.</p>

      <h2>Why Shade Matters</h2>
      <p>Children's skin is more delicate and vulnerable to UV damage than adult skin. Even on cloudy days, up to 80% of UV radiation can penetrate clouds. The "Slip, Slop, Slap, Seek, Slide" campaign reminds us that seeking shade is one of the most effective ways to reduce UV exposure.</p>

      <p>When selecting playgrounds, look for:</p>
      <ul>
        <li>Natural shade from mature trees</li>
        <li>Purpose-built shade sails and structures</li>
        <li>Covered play equipment</li>
        <li>Shaded seating areas for parents</li>
      </ul>

      <h2>Top Shaded Playgrounds in South East Melbourne</h2>

      <h3>1. Jells Park, Wheelers Hill</h3>
      <p>This expansive park features excellent natural shade from established eucalyptus and oak trees. The playground areas are strategically positioned under tree canopies, providing natural cooling and protection. Visit early morning (7-9 AM) or late afternoon (4-6 PM) for the best shade coverage.</p>

      <h3>2. Dandenong Park, Dandenong</h3>
      <p>Recently upgraded with modern shade sails covering the main play equipment. The combination of artificial and natural shade makes this playground usable even during peak UV hours. The shade sails are particularly effective during midday sun.</p>

      <h3>3. Tirhatuan Park, Dandenong North</h3>
      <p>Features a mix of mature trees and purpose-built shade structures. The enclosed toddler area is completely covered, making it ideal for younger children. Best visited in the morning when natural shade is most effective.</p>

      <h3>4. Tatterson Park, Keysborough</h3>
      <p>Boasts extensive natural shade from native trees, with additional shade sails installed over key play areas. The park's design maximizes shade coverage throughout the day, with multiple shaded seating areas for parents.</p>

      <h3>5. Barry Powell Reserve, Endeavour Hills</h3>
      <p>This hidden gem offers excellent shade coverage from established trees and strategically placed shade sails. The playground is designed with shade as a priority, featuring covered climbing structures and shaded pathways.</p>

      <h3>6. Rowville Lakes Reserve, Rowville</h3>
      <p>Features innovative shade solutions including natural tree coverage and modern shade structures. The playground design incorporates shade into the play experience, with covered areas for different age groups.</p>

      <h2>Sun Safety Tips for Playground Visits</h2>

      <h4>Best Times to Visit</h4>
      <p>Avoid peak UV hours (10 AM - 3 PM) when possible. Early morning (7-10 AM) and late afternoon (4-7 PM) visits are ideal. Even with shade, UV reflection from surfaces can still cause exposure.</p>

      <h4>Essential Sun Safety Gear</h4>
      <ul>
        <li>Wide-brimmed hats (minimum 10cm brim)</li>
        <li>SPF 50+ sunscreen (reapply every 2 hours)</li>
        <li>UV-protective clothing with UPF rating</li>
        <li>Sunglasses for children over 12 months</li>
      </ul>

      <h4>Additional Protection</h4>
      <p>Remember that shade provides approximately 75% UV protection, so sunscreen is still essential. Sand, concrete, and water can reflect UV rays, increasing exposure even in shaded areas.</p>

      <p>Planning your playground visits around shade coverage ensures your family can enjoy outdoor play safely. For more playground recommendations and updates, explore our <a href="/search?category=playground">playground search</a> feature to find the perfect shaded spot near you.</p>
    `,
    author: 'LittleGo Team',
    publishedAt: '2026-02-25T09:00:00.000Z',
    category: 'playgrounds',
    tags: ['shade', 'UV protection', 'summer', 'south east melbourne', 'sun safety'],
    seoTitle: 'Best Shaded Playgrounds in South East Melbourne - UV Safe Family Fun',
    seoDescription: 'Find the top shaded playgrounds in South East Melbourne perfect for protecting kids from UV rays. Complete guide with sun safety tips and best visit times.'
  },
  {
    slug: 'rainy-day-activities-toddlers-melbourne',
    title: 'Rainy Day Activities for Toddlers in Melbourne',
    excerpt: 'When Melbourne\'s unpredictable weather keeps you indoors, discover these engaging activities and venues perfect for toddlers and young children.',
    content: `
      <p>Melbourne is famous for experiencing "four seasons in one day," and when the rain starts falling, parents of toddlers need a backup plan. The good news? Melbourne offers an incredible array of indoor activities specifically designed for little ones. From interactive play centres to cozy storytime sessions, here's your guide to making rainy days just as fun as sunny ones.</p>

      <h2>Indoor Play Centres</h2>
      
      <h3>Ballooning Fun (Multiple Locations)</h3>
      <p>With locations across Melbourne's east and southeast, Ballooning Fun offers soft play areas specifically designed for toddlers. The dedicated under-3 areas feature safe climbing structures, ball pits, and sensory play zones. Most locations open from 9 AM and offer parent-child classes during weekday mornings.</p>

      <h3>Lollipops Playland (Multiple Locations)</h3>
      <p>These themed indoor playgrounds feature toddler-specific zones with age-appropriate equipment. The Ringwood and Glen Waverley locations are particularly toddler-friendly, with dedicated areas for crawlers and early walkers. Entry includes access to the café where parents can enjoy a coffee while supervising play.</p>

      <h3>Monkey Mania (Scoresby)</h3>
      <p>Features an excellent toddler zone with sensory play equipment, mini slides, and soft play structures. The facility maintains a clean environment with regular sanitization, making it perfect for Melbourne's germier winter months.</p>

      <h2>Libraries and Storytime</h2>
      
      <h4>Council Library Programs</h4>
      <p>Melbourne's council libraries offer exceptional toddler programs, many of which are completely free:</p>
      
      <ul>
        <li><strong>Rhyme Time</strong>: Interactive sessions with songs, rhymes, and movement activities</li>
        <li><strong>Baby Bounce</strong>: For younger toddlers (12-18 months) with sensory play elements</li>
        <li><strong>Toddler Tales</strong>: Story sessions with craft activities for toddlers and preschoolers</li>
      </ul>

      <p>Popular locations include Monash Public Library (Oakleigh), Whitehorse Libraries (Box Hill, Blackburn), and City of Boroondara libraries. Many sessions run multiple times per week, so check online schedules for availability.</p>

      <h2>Toddler-Friendly Cafés</h2>

      <h3>The Little Pantry (Hughesdale)</h3>
      <p>Purpose-built with families in mind, featuring a dedicated kids' corner with toys, books, and a small play area. The menu includes healthy options for little ones, and the space is designed for prams and toddler movement.</p>

      <h3>Ginger & Rose (Malvern East)</h3>
      <p>Offers high chairs, changing facilities, and a relaxed atmosphere welcoming to families with young children. The café features a small reading nook that toddlers enjoy exploring.</p>

      <h3>Two Souls Café (Endeavour Hills)</h3>
      <p>Family-owned café with a dedicated kids' menu and play corner. The owners are parents themselves and create a genuinely welcoming environment for families with toddlers.</p>

      <h2>Museums and Interactive Spaces</h2>

      <h3>Melbourne Museum - Discovery Centre</h3>
      <p>The Discovery Centre within Melbourne Museum is specifically designed for children under 5. Interactive displays encourage hands-on exploration, and the space is climate-controlled and stroller-friendly. Entry to the Discovery Centre is included with general museum admission.</p>

      <h3>Scienceworks - Nitty Gritty Super City</h3>
      <p>While some exhibits are aimed at older children, the Nitty Gritty Super City area provides excellent interactive experiences for toddlers. The space encourages exploration and imaginative play in a safe, contained environment.</p>

      <h2>Shopping Centre Activities</h2>

      <h4>Westfield Southland</h4>
      <p>Features an excellent playground area and regular toddler-friendly activities. The centre often hosts free entertainment including puppet shows and character meet-and-greets suitable for young children.</p>

      <h4>Chadstone Shopping Centre</h4>
      <p>Offers multiple play areas including a dedicated toddler zone. The centre's "Little Ones" program includes activities like mini discos and craft sessions specifically designed for toddlers and young children.</p>

      <h2>Creative and Sensory Activities</h2>

      <h3>Pottery Painting Studios</h3>
      <p>Studios like "All Fired Up" (multiple locations) welcome toddlers for simple pottery painting sessions. These activities develop fine motor skills while creating keepsakes. Staff are experienced with young children and provide appropriate guidance.</p>

      <h3>Music Classes</h3>
      <p>Programs like "Music Together" and "Kindermusik" offer structured music experiences for toddlers and parents. These classes focus on rhythm, movement, and early musical development while providing social interaction opportunities.</p>

      <h2>Budget-Friendly Options</h2>

      <h4>Free Activities</h4>
      <ul>
        <li>Library programs (most are free)</li>
        <li>Shopping centre playgrounds</li>
        <li>Community centre activities</li>
        <li>Council-run playgroups</li>
      </ul>

      <h4>Low-Cost Options ($5-15)</h4>
      <ul>
        <li>Swimming pool visits during toddler-friendly times</li>
        <li>Council-run indoor sports facilities</li>
        <li>Community art classes</li>
        <li>Toddler cinema sessions at select venues</li>
      </ul>

      <h2>Planning Your Rainy Day</h2>

      <p><strong>Morning Activities (9-11 AM):</strong> Library sessions, swim classes, or less crowded play centres</p>
      <p><strong>Lunch Time (11 AM-1 PM):</strong> Toddler-friendly cafés or shopping centre food courts with play areas</p>
      <p><strong>Afternoon (1-4 PM):</strong> Museums, creative activities, or rest time at home</p>
      <p><strong>Late Afternoon (4-6 PM):</strong> Play centres (often less busy), shopping centre activities</p>

      <p>Remember to pack essentials: spare clothes, snacks, drinks, and favorite comfort items. Melbourne's rainy days don't have to mean staying home—with proper planning, they can become special bonding experiences that your toddler will remember fondly.</p>

      <p>Looking for more family activities? Check out our <a href="/search?category=activities">activities search</a> to discover even more options near you.</p>
    `,
    author: 'LittleGo Team',
    publishedAt: '2026-02-20T10:30:00.000Z',
    category: 'activities',
    tags: ['rainy day', 'indoor', 'toddlers', 'melbourne', 'winter'],
    seoTitle: 'Rainy Day Activities for Toddlers in Melbourne - Indoor Fun Guide',
    seoDescription: 'Discover the best indoor activities for toddlers in Melbourne when weather keeps you inside. Play centres, libraries, cafés and more - all toddler-tested!'
  },
  {
    slug: 'whats-on-this-weekend-family-events-melbourne',
    title: 'What\'s On This Weekend: Family Events in Melbourne',
    excerpt: 'Your weekly guide to family-friendly events happening this weekend in Melbourne. From free festivals to hands-on workshops, discover activities perfect for families with young children.',
    content: `
      <p><em>This post represents our weekly events roundup format, updated every Thursday for the upcoming weekend. Events listed are for the weekend of March 1-2, 2026.</em></p>

      <p>Melbourne's weekend event calendar is packed with family-friendly activities, but finding events suitable for families with young children can be overwhelming. Our curated weekly roundup focuses on activities perfect for families with toddlers and young children, highlighting accessibility, costs, and age-appropriateness.</p>

      <h2>🆓 Free Events</h2>

      <h3>Fed Square Family Festival</h3>
      <p><strong>When:</strong> Saturday, March 1, 10 AM - 4 PM<br>
      <strong>Where:</strong> Federation Square<br>
      <strong>Ages:</strong> All ages (particularly good for 2-8 years)<br>
      <strong>What:</strong> Interactive art installations, puppet shows every hour, face painting, and a dedicated toddler sensory play zone. Food trucks available on-site.</p>

      <h3>Royal Botanic Gardens Nature Play</h3>
      <p><strong>When:</strong> Sunday, March 2, 9 AM - 12 PM<br>
      <strong>Where:</strong> Royal Botanic Gardens Melbourne<br>
      <strong>Ages:</strong> 18 months - 5 years<br>
      <strong>What:</strong> Guided nature exploration with hands-on activities including seed planting, bug hunting with magnifying glasses, and nature craft activities. Stroller-friendly paths throughout.</p>

      <h3>St Kilda Farmers Market</h3>
      <p><strong>When:</strong> Saturday, March 1, 8 AM - 3 PM<br>
      <strong>Where:</strong> Peanut Farm Reserve, St Kilda<br>
      <strong>Ages:</strong> All ages<br>
      <strong>What:</strong> Fresh produce, artisan food, and usually features buskers and a small playground nearby. Great for introducing toddlers to different foods and supporting local producers.</p>

      <h2>🎪 Markets & Festivals</h2>

      <h3>Camberwell Sunday Market</h3>
      <p><strong>When:</strong> Sunday, March 2, 6:30 AM - 12:30 PM<br>
      <strong>Where:</strong> Camberwell Recreation Centre<br>
      <strong>Cost:</strong> Entry $2, children free<br>
      <strong>Ages:</strong> All ages<br>
      <strong>What:</strong> One of Melbourne's premier markets with vintage finds, handmade goods, and food stalls. The adjacent recreation centre has public facilities including change rooms.</p>

      <h3>Mulgrave Farmers Market</h3>
      <p><strong>When:</strong> Saturday, March 1, 8 AM - 1 PM<br>
      <strong>Where:</strong> Mulgrave Reserve<br>
      <strong>Cost:</strong> Free<br>
      <strong>Ages:</strong> All ages<br>
      <strong>What:</strong> Smaller, community-focused market with local produce and crafts. Features a playground directly adjacent, making it easy to combine market visit with playtime.</p>

      <h2>🏠 Indoor Activities</h2>

      <h3>Children's Book Week Preview - State Library</h3>
      <p><strong>When:</strong> Saturday, March 1, 11 AM & 2 PM (45-minute sessions)<br>
      <strong>Where:</strong> State Library Victoria<br>
      <strong>Cost:</strong> Free, bookings essential<br>
      <strong>Ages:</strong> 2-6 years<br>
      <strong>What:</strong> Interactive storytelling featuring upcoming children's book releases, with simple craft activities and character dress-ups available.</p>

      <h3>ACMI Family Film Session</h3>
      <p><strong>When:</strong> Sunday, March 2, 10 AM<br>
      <strong>Where:</strong> ACMI, Federation Square<br>
      <strong>Cost:</strong> $8 adults, $5 children<br>
      <strong>Ages:</strong> 3-8 years<br>
      <strong>What:</strong> Screening of "Wallace and Gromit: The Wrong Trousers" in a relaxed environment where talking and movement is welcome. Includes pre-show activities.</p>

      <h2>🎨 Classes & Workshops</h2>

      <h3>Toddler Art Class - The Art Studio</h3>
      <p><strong>When:</strong> Saturday, March 1, 9:30 AM - 10:30 AM<br>
      <strong>Where:</strong> South Yarra<br>
      <strong>Cost:</strong> $25 per child (parent included)<br>
      <strong>Ages:</strong> 18 months - 3 years<br>
      <strong>What:</strong> Sensory art experience using safe, washable materials. Focus on exploration rather than finished products. Aprons provided, but bring spare clothes.</p>

      <h3>Music Together Trial Class</h3>
      <p><strong>When:</strong> Sunday, March 2, 10 AM - 10:45 AM<br>
      <strong>Where:</strong> Various locations (Prahran, Hawthorn, Heidelberg)<br>
      <strong>Cost:</strong> Free trial class<br>
      <strong>Ages:</strong> 6 months - 5 years<br>
      <strong>What:</strong> Interactive music program focusing on rhythm, singing, and instrument exploration. Parents participate alongside children.</p>

      <h3>Little Scientists Workshop</h3>
      <p><strong>When:</strong> Saturday, March 1, 2 PM - 3 PM<br>
      <strong>Where:</strong> Scienceworks<br>
      <strong>Cost:</strong> $12 per child plus museum entry<br>
      <strong>Ages:</strong> 3-6 years<br>
      <strong>What:</strong> Simple science experiments using everyday materials. Activities designed for pre-reading children with strong visual and hands-on components.</p>

      <h2>💡 This Week's Tips</h2>

      <h4>Weather Considerations</h4>
      <p>Saturday forecast: 22°C, partly cloudy - perfect for outdoor events<br>
      Sunday forecast: 19°C, light showers possible - have indoor backup plans</p>

      <h4>Getting Around</h4>
      <p>Free tram zone covers Fed Square, State Library, and many CBD events. Consider park-and-ride options for outer venues to avoid city parking hassles.</p>

      <h4>Booking Requirements</h4>
      <p>Several events require advance booking (marked above). Book by Thursday evening for weekend activities as popular sessions often fill up.</p>

      <h2>Next Week Preview</h2>
      <p>Looking ahead to March 8-9: Labour Day long weekend will feature extended hours at many venues, plus special autumn festival activities at several parks. Keep an eye on our social media for updates and last-minute additions.</p>

      <p><strong>Got an event tip?</strong> Email us at hello@littlego.com.au with family events you'd like to see featured in future roundups.</p>

      <p>For more ongoing activities and permanent attractions, browse our full <a href="/search">activities database</a> or sign up for our weekly email updates.</p>
    `,
    author: 'LittleGo Team',
    publishedAt: '2026-02-27T16:00:00.000Z',
    category: 'events',
    tags: ['events', 'weekend', 'family', 'melbourne', 'march 2026'],
    seoTitle: 'What\'s On This Weekend in Melbourne - Family Events March 1-2, 2026',
    seoDescription: 'Discover family-friendly events this weekend in Melbourne. Free activities, markets, indoor fun and workshops perfect for families with young children.'
  }
];

// Helper function to get posts by category
export function getPostsByCategory(category: BlogPost['category']): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

// Helper function to get related posts (same category, excluding current post)
export function getRelatedPosts(slug: string, limit: number = 3): BlogPost[] {
  const currentPost = blogPosts.find(post => post.slug === slug);
  if (!currentPost) return [];
  
  return blogPosts
    .filter(post => post.slug !== slug && post.category === currentPost.category)
    .slice(0, limit);
}

// Helper function to get post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

// Helper function to get all categories
export function getCategories(): BlogPost['category'][] {
  return ['playgrounds', 'activities', 'events', 'tips', 'reviews'];
}

// Helper function to format date for display
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-AU', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
}