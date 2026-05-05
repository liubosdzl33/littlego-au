import os

file_path = '/home/pandaguo/.openclaw/workspace/venus_projects/littlego/src/data/blog/posts.ts'

new_post = """  {
    slug: 'melbourne-kids-activities-this-week-may-6-12-2026-mother-day-market-dino-day',
    title: "What's On This Week: Mother's Day Planning, Market Fun, and the Best Free Kids' Events",
    excerpt: "The second week of May is here, and Melbourne is buzzing with prep for Mother's Day. From the iconic Queen Victoria Market to the last days of the Hawker 88 Night Market and free Dino Days for the little ones, here is your guide for May 6–12, 2026.",
    content: `
      <p>Happy Wednesday, Melbourne parents! We've hit that glorious mid-autumn stride where the coffee is hot, the puffer jackets are officially out, and the 'Mother's Day mental load' is starting to kick in. Whether you're planning a special day for yourself or dropping heavy hints for the family, this week in the city has some brilliant ways to keep the kids entertained while checking off the to-do list.</p>

      <p>This week's roundup is all about variety—we've got the final nights of a cultural foodie favorite, some mid-week dinosaur magic, and a head-start on Mother's Day spoils at our most iconic market. Let’s dive into what’s on for the week of May 6 to May 12, 2026.</p>

      <h2>🏮 Tonight (May 6): Last Call for Hawker 88 Night Market</h2>

      <p>If you've been meaning to hit the <strong>Hawker 88 Night Market</strong> at Queen Victoria Market, tonight is your absolute last chance for the season. It’s vibrant, loud, and full of the sensory delights that Melbourne does best. While night markets can feel intimidating with toddlers, the early bird (5:00 PM - 6:00 PM) window is actually quite manageable.</p>

      <p><strong>Top Tip:</strong> Grab some satay sticks or a mooncake early before the queues get massive. The atmosphere with the red lanterns overhead is pure magic for little eyes. If it gets too much, the wide open spaces of the market sheds give you plenty of room for a quick 'escape' walk.</p>

      <ul>
        <li><strong>When:</strong> Wednesday May 6, 5 PM – 10 PM</li>
        <li><strong>Where:</strong> Queen Victoria Market</li>
        <li><strong>Playground Pairing:</strong> If you're there early, the <strong>Flagstaff Gardens Playground</strong> is just across the road—perfect for a pre-dinner energy burn.</li>
      </ul>

      <h2>🦕 Mid-Week Magic: Dino Days (Wednesdays)</h2>

      <p>Did you know every Wednesday at the <strong>Melbourne Museum</strong> is 'Dino Day'? If you have a preschooler who can identify a Pachycephalosaurus but can't yet tie their shoes, this is your mid-week sanctuary. The Museum is always free for kids under 16, and on Wednesdays, they lean into the prehistoric theme with extra storytelling and activities in the Children's Gallery.</p>

      <p>May is a great time to visit because the <strong>Gandel Gondwana Garden</strong> (the outdoor palaeontology-themed garden) is stunning in the autumn light. It’s fenced, safe, and designed specifically for 6-to-12-year-olds to explore, though younger ones will enjoy the 'dig' vibe too.</p>

      <ul>
        <li><strong>When:</strong> Every Wednesday</li>
        <li><strong>Where:</strong> Melbourne Museum, Carlton</li>
        <li><strong>Inside Knowledge:</strong> Check out our <a href="/blog/5-free-things-to-do-melbourne-kids-autumn-indoor-outdoor-guide">autumn free activities guide</a> for why the Museum remains our #1 rainy day backup.</li>
      </ul>

      <h2>💐 Saturday & Sunday: Mother's Day Prep at Queen Vic Market</h2>

      <p>This weekend (May 9–10) is the big one. If you're looking for a low-stress way to celebrate Mother's Day with toddlers, a morning run to the <strong>Queen Victoria Market</strong> is hard to beat. The flower stalls will be in peak autumn bloom—think giant chrysanthemums and local proteas—and the vibe is always festive.</p>

      <p>The <strong>Sustainable Shopping Trail</strong> at the market is also running, making it a great chance to teach the kids about 'buying local'. Grab a hot jam doughnut (a Melbourne requirement) and wander the Dairy Hall for some brunch supplies to take home. It’s much easier than trying to get a 2-year-old to sit still for a 3-course Mother's Day lunch!</p>

      <ul>
        <li><strong>Tip:</strong> Sunday is traditionally the busier day. If you want the 'luxe' feel without the crowds, head in early Saturday morning (around 8:30 AM).</li>
        <li><strong>Coffee Call:</strong> <strong>Market Lane Coffee</strong> near the Dairy Hall is a parent staple for a reason.</li>
      </ul>

      <h2>📚 Storytime Sanctuaries: Bedtime & Beyond</h2>

      <p>If the autumn wind is biting, duck into one of the city's libraries. <strong>Bedtime Storytime</strong> is running this week (check the City of Melbourne website for specific branch times like the Library at The Dock). There is something incredibly calming about seeing a room full of toddlers in their PJs listening to a story while the city hums outside.</p>

      <p>For more bookish fun, the <strong>World of the Book</strong> exhibition at the State Library Victoria is free and running all week. While it’s a 'museum' environment, the scale of the books and the beautiful architecture of the <strong>Dome Reading Room</strong> usually earns a few "wow"s from the school-aged crowd.</p>

      <h2>📋 Your Weekly Blueprint: May 6–12</h2>
      <ul>
        <li><strong>Wednesday May 6:</strong> Dino Day at the Museum 🦖 + Hawker 88 Finale 🏮</li>
        <li><strong>Friday May 8:</strong> Morning run at <strong>ArtPlay Playground</strong> followed by the <strong>NGV Kids 'Let's Party'</strong> exhibition (check for last-minute dates!).</li>
        <li><strong>Saturday May 9:</strong> Flower and doughnut run at QVM 💐🍩</li>
        <li><strong>Sunday May 10:</strong> <a href="/blog/mothers-day-melbourne-families-toddlers-guide-2026">Mother's Day in the Botanic Gardens</a> (don't forget the hat!).</li>
      </ul>

      <p>Melbourne in May is all about making the most of those sunny pockets and having a solid indoor 'Plan B' ready to go. Whether you're chasing dinosaurs or choosing the perfect Mother's Day bouquet, enjoy the crisp air and the city energy this week. See you at the slide! 🛝</p>
    `,
    author: 'LittleGo Team',
    publishedAt: '2026-05-06T07:00:00+10:00',
    category: 'events',
    tags: ['What on Melbourne kids May 2026', 'Mother\\'s Day Melbourne activities', 'Queen Victoria Market kids', 'Dino Days Melbourne Museum', 'Hawker 88 Night Market last call', 'free things to do Melbourne kids this week', 'Melbourne family events May', 'parenting tips Melbourne autumn'],
    seoTitle: 'What\\'s On This Week: Melbourne Kids Activities May 6-12, 2026',
    seoDescription: "Your guide to Melbourne's best family events this week: Mother's Day at the market, Dino Days at the Museum, and the Hawker 88 Night Market finale. Plan your week with LittleGo."
  },
"""

with open(file_path, 'r') as f:
    lines = f.readlines()

# Find the line where blogPosts ends (approximately)
# It's an array: export const blogPosts: BlogPost[] = [ ... ];
# We want to insert it at the beginning of the array or at the end.
# Inserting at the beginning for 'What's On' makes sense for visibility.

for i, line in enumerate(lines):
    if 'export const blogPosts: BlogPost[] = [' in line:
        lines.insert(i + 1, new_post)
        break

with open(file_path, 'w') as f:
    f.writelines(lines)

print("Successfully added new post to posts.ts")
