import React from 'react';
import {
  // Core Icons
  BrainCircuit,
  GitMerge,
  Columns,
  Maximize,
  Milestone,
  ListOrdered,
  Map,
  Pyramid,
  BarChart3,
  GitCommitVertical,
  GitBranch,
  UserSquare,
  RefreshCcw,
  MountainSnow,
  Combine,
  Filter,
  Triangle,
  Atom,
  // Expansion Pack 1 Icons
  Grid2x2,
  Target,
  TrendingUp,
  Puzzle,
  // Expansion Pack 2 & 3 Icons
  UtensilsCrossed,
  Scale,
  Link,
  Sprout,
  AlignStartVertical,
  Waves,
  Highlighter,
  Users,
  Trophy,
  Layers,
  Share2,
  // Argument, Reference & Analogy Expansion
  Landmark,
  LayoutGrid,
  ArrowLeftRight,
  GitFork,
  Bone,
  Building2,
} from 'lucide-react';

/**
 * PROMPT TAXONOMY GUIDE
 * This guide defines the structural logic used in the 'promptInstruction' fields below.
 * * 0. [CONCEPTUAL CORE]: Defines the psychological archetype and the "Why" behind the visualization.
 * 1. [VISUAL GEOMETRY]: Defines the raw physical shape, perspective, 3D space, and arrangement of masses.
 * 2. [COMPOSITIONAL DYNAMICS]: Defines the movement, tension, balance, visual forces, and lighting mood.
 * 3. [SEMANTIC TRANSLATION]: Defines the rule for converting abstract concepts (Text) into concrete objects (Image).
 */
const PROMPT_TAXONOMY_GUIDE = `
  Strictly adhere to the following four-part structure for image generation:
  0. CONCEPTUAL CORE: Read this to understand the mood and the intellectual goal of the image.
  1. VISUAL GEOMETRY: Describe the scene's physical layout, 3D space, and arrangement of masses in detail.
  2. COMPOSITIONAL DYNAMICS: Describe the flow of the eye, contrast, lighting mood, and kinetic energy.
  3. SEMANTIC TRANSLATION: Describe how specific keywords from the input text must be "reified" into physical props.
`;

export interface InfographicLayout {
  id: string;
  icon: React.ReactNode;
  promptInstruction: string;
}

export const INFOGRAPHIC_LAYOUTS: InfographicLayout[] = [
  // --- CORE ARCHETYPES ---
  {
    id: 'central_metaphor',
    icon: React.createElement(BrainCircuit),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    This layout relies on the power of a single, undeniable focal point to anchor the viewer's understanding. By concentrating all visual weight in the center, it mimics the structure of a solar system or an atom, suggesting that the central concept is the source of all energy and meaning in the diagram.
    
    Psychologically, this creates a sense of stability and hierarchy, instantly telling the viewer what matters most. It is best used when defining a core product, a singular idea, or a main protagonist, ensuring that all secondary information feels subservient to the main subject.

    **1. [VISUAL GEOMETRY]**
    * **Anchor:** Construct a single, massive "Hero Object" that commands the absolute center of the visual field, occupying at least 40% of the canvas. This object must be rendered with the highest level of fidelity in the entire image, acting as the undisputed protagonist. It serves as the static constant, the nucleus around which all other elements must organize themselves. Think of it as a dense, physical solid that grounds the composition.
    * **Orbit:** Position smaller secondary elements, icons, or data points in the negative space surrounding the core, ensuring they float in a balanced, radial arrangement. These elements must never touch or obscure the central object; they should maintain a respectful distance to preserve the silhouette of the hero. The arrangement should feel evenly distributed, like satellites or electrons, creating a protective ring around the subject.
    * **Connectors:** Utilize thin, elegant tether lines or precise laser indicators that lead the eye specifically from the dense center to the airy periphery. These lines should be geometric and straight, avoiding organic curves to imply technical precision. They serve as the visual "bridges" that transfer meaning from the core to the labels.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Gravity:** The central object must exert a powerful gravitational pull, making the surrounding elements feel lighter and subservient to its mass. The center feels heavy, dense, and permanent, while the edges feel airy, temporary, and light. This creates a physical sensation of depth and weight distribution.
    * **Hierarchy:** Establish an extreme contrast between the hyper-detailed, fully lit center and the minimal, cleaner background. The lighting should spotlight the hero object, perhaps with a rim light that separates it from the void behind it. The eye should always return to the center after reading a peripheral label.

    **3. [SEMANTIC TRANSLATION]**
    * **Concept to Object:** The main abstract topic must be transmuted into a tangible physical object (e.g., if the topic is "Cybersecurity," render a complex Digital Vault; if "Speed," render a Turbine). Do not use generic icons; create a photorealistic or hyper-stylized prop that embodies the noun. The object itself must tell the story through its texture and material.
    * **Attributes:** The supporting features described in the text must become the floating satellites or the mechanical details of the main object. For example, if a feature is "Fast," the object might have exhaust ports; if "Secure," it might have reinforced locks. These attributes are not just text; they are visual clues on the object itself.
    `,
  },
  {
    id: 'process_flowchart',
    icon: React.createElement(GitMerge),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    This archetype visualizes the journey of transformation, emphasizing that a result is the product of a specific sequence of actions. It turns static instructions into a dynamic narrative, forcing the viewer to travel mentally from a starting point to a destination.
    
    It validates the "work" required to achieve a goal, breaking down a complex undertaking into manageable, visible steps. It provides a sense of logical inevitability, suggesting that if one follows the path, the result is guaranteed.

    **1. [VISUAL GEOMETRY]**
    * **The Path:** Establish a distinct, continuous track—such as a winding S-curve, a mechanical conveyor belt, or a perspective road—that moves clearly from the Left (Start) to the Right (End). This path acts as the spine of the image, physically connecting every element. It should have physical width and texture, looking like a surface that can be walked or traveled upon.
    * **The Nodes:** Place distinct 3D "Stations," platforms, or gateways at regular intervals along this path to represent the specific steps of the process. These nodes should look like places where work happens, not just flat markers. They act as "chapters" in the visual story, breaking the continuous line into digestible segments.
    * **Direction:** The flow must be unmistakably indicated by visual cues such as arrows painted on the floor, flowing liquid inside transparent pipes, or the orientation of the objects. There should be zero ambiguity about which way the eye should move. The geometry should propel the viewer forward.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Kinetic Flow:** The entire composition must possess a sense of forward momentum, using techniques like motion blur or streaming light to imply speed and progression. The image should not feel like a still life; it should feel like a machine in operation or a journey in progress. The energy pushes from the beginning towards the end.
    * **Evolution:** The environment or the object traveling on the path must visually change or improve as it progresses from start to finish. For example, raw materials at the start might become polished products at the end, or a dark path might become brighter. This visual arc reinforces the value of the process.

    **3. [SEMANTIC TRANSLATION]**
    * **Steps:** Each abstract step in the text must be visualized as a physical station or machine part (e.g., "Analysis" becomes a scanning station; "Delivery" becomes a launch pad). Reify the verb of the step into a mechanical or physical action.
    * **Actions:** Visualize the *mechanism* of the change (e.g., if the step is "Filtering," show a physical mesh or sieve; if "Heating," show a furnace). Don't just show the label; show the physics of the verb happening at that specific node.
    `,
  },
  {
    id: 'comparison',
    icon: React.createElement(Columns),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Duality layout is built on the fundamental human need to categorize and rank options by placing them side-by-side. It creates immediate intellectual tension by presenting two alternative realities, forcing the viewer to evaluate and choose.
    
    It serves as a visual argument or debate, using aesthetic cues to bias the viewer towards the "correct" choice while maintaining a structure of fair comparison. It creates a "Before & After" or "Problem & Solution" narrative that is instantly intuitive.

    **1. [VISUAL GEOMETRY]**
    * **The Split:** A hard, definitive divider—such as a vertical wall, a beam of light, or a diagonal tear—must split the canvas into two distinct universes (Zone A and Zone B). This border is the most important line in the composition, establishing the separation of church and state. It physically prevents the two concepts from mixing.
    * **Symmetry:** Despite the contrasting content, the layout must maintain structural symmetry, where objects on the left mirror the placement of objects on the right. This structural fairness allows for a direct "apples-to-apples" comparison. The viewer can scan horizontally to see the difference in specific attributes.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Tension:** The divider acts as a "Line of Scrimmage," creating a palpable visual tension between the two opposing sides. The two sides should feel incompatible, like oil and water, representing a choice that must be made. The eye bounces back and forth, comparing the differences.
    * **Atmospheric Contrast:** Utilize opposing color temperatures (Warm vs Cool), lighting styles (Gloomy vs Bright), or textures (Rough vs Smooth) to emotionally code the two sides. One side should feel inviting and stable, while the other feels chaotic or dull. This biases the viewer emotionally before they even read the text.

    **3. [SEMANTIC TRANSLATION]**
    * **Traits:** If the text describes "Old Way vs New Way," visually age Zone A (rust, dust, desaturation) and modernize Zone B (glow, polish, saturation). The visual style must embody the adjectives used in the text.
    * **Winner:** The text's preferred option should subtly dominate the composition through better lighting, slightly larger scale, or a more harmonious arrangement. The visual language should crown the winner without needing a "Winner" label.
    `,
  },
  {
    id: 'anatomy_view',
    icon: React.createElement(Maximize),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    This layout appeals to the engineer's mindset, deconstructing a complex whole to reveal the sophistication of its parts. It fosters trust and authority by showing that the creator understands the system down to its smallest bolt.
    
    It transforms a "Black Box" concept into a transparent system, teaching the viewer how things work by exposing the internal relationships. It suggests precision, high-tech engineering, and deep knowledge.

    **1. [VISUAL GEOMETRY]**
    * **Deconstruction:** The subject is pulled apart along a central axis (usually Z-depth), creating an "exploded view" where parts hover suspended in mid-air. The spacing between parts must be deliberate, allowing the face of each component to be seen clearly. It should look like a technical schematic brought to life in 3D.
    * **Alignment:** All suspended parts must align perfectly to a central invisible spine, implying that if time resumed, they would snap back together seamlessly. This alignment is crucial to communicate that these are parts of a single whole, not just random debris. The geometry is rigid and mathematical.
    * **Void:** The background must be a clean, technical grid, a blueprint style void, or a studio infinity wall to prevent distraction. The negative space is essential to define the silhouette of the floating parts. The environment feels like a sterile laboratory or a design studio.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Frozen Time:** The image captures a precise millisecond of assembly or disassembly, creating a sense of suspended animation. There is no motion blur here; everything is razor sharp and static, allowing for careful study. It feels like a pause button has been hit on reality.
    * **Precision:** Thin, clinical leader lines or callouts point to specific internal parts with surgical accuracy. These lines should not cross each other and should contribute to the feeling of order. The aesthetic is one of exactitude and high definition.

    **3. [SEMANTIC TRANSLATION]**
    * **System:** The overarching concept described in the text is visualized as the assembled machine, organism, or structure.
    * **Components:** Abstract sub-points or features are visualized as physical gears, chips, layers, or organs inside the main body. For example, "Strategy" might be the CPU; "Support" might be the chassis. Reify intangible qualities into structural components.
    `,
  },
  {
    id: 'timeline',
    icon: React.createElement(Milestone),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Evolution layout tells the story of time, growth, and consequence. It visualizes the concept that the present is built upon the past and leads to the future, creating a narrative arc that implies progress and accumulation of value.
    
    It provides a sense of heritage and destiny, reassuring the viewer that there is a plan and a direction. It is essential for showing history, roadmaps, or the maturation of an idea over time.

    **1. [VISUAL GEOMETRY]**
    * **The Spine:** A continuous, unbroken central axis—visualized as a DNA helix, a winding river, a cable, or a road—traverses the image from start to end. This spine is the physical manifestation of time; it connects everything and provides the structural backbone of the image. It should feel organic or engineered, but always continuous.
    * **Nodes:** Specific milestones are marked as distinct stops, monuments, or glowing markers situated along the spine. These nodes should look like physical locations or checkpoints where the flow of time pauses. They serve as the anchors for the text labels.
    * **Rhythm:** Use an alternating placement (Left/Right or Top/Bottom) of events along the spine to create a balanced, pendulum-like visual rhythm. This zig-zag movement keeps the eye engaged and prevents the timeline from looking like a boring static list.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Growth:** The spine should visually accumulate weight, complexity, or brightness as it moves towards the "future" side of the image. The starting point might be thin and simple, while the end point is robust and intricate. This visual crescendo represents the accumulation of experience or value.
    * **Momentum:** The visual flow leads inevitably from the past to the final point, creating a sense of destiny. The eye is guided along the path by the geometry, unable to skip steps. The dynamic implies that the journey is ongoing and forward-moving.

    **3. [SEMANTIC TRANSLATION]**
    * **Time:** Physical distance on the canvas equates to the duration of time. Long gaps imply long waits; short gaps imply rapid changes.
    * **Events:** Major dates are visualized as large landmarks or monuments; minor dates are smaller signposts. The visual size of the marker should correspond to the historical importance of the event.
    `,
  },
  {
    id: 'listicle',
    icon: React.createElement(ListOrdered),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Stack is about order, digestability, and modularity. It breaks down information into bite-sized, equal units, promising the viewer that they can consume the content one piece at a time without being overwhelmed.
    
    It implies a curated collection, a checklist, or a ranking, providing a sense of completion as the viewer reads down the list. It organizes chaos into a neat, vertical structure that feels reliable and finite.

    **1. [VISUAL GEOMETRY]**
    * **The Rack:** Construct a vertical arrangement of identical modular containers, such as cards, slots, shelves, or floating panels. These containers should be stacked neatly on top of one another with consistent padding. The structure resembles a server rack, a stack of books, or a high-tech menu.
    * **Uniformity:** Each module must have the exact same height and internal layout (e.g., Icon on the left, Text on the right) to create a rhythm. The visual consistency allows the viewer to focus on the *content* differences rather than the *structural* differences. The repetition is pleasing to the eye.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Order:** The alignment must be strict and mathematical; no overlapping or messy piling. It feels like a well-organized library or a filing system where everything has its place. This creates a sense of calm and authority.
    * **Rhythm:** The repetitive pattern creates a scanning rhythm that is easy to read. Variations in color or icon style within the identical frames keep the visual interest alive without breaking the structural pattern.

    **3. [SEMANTIC TRANSLATION]**
    * **Items:** Each point in the text list translates into a distinct "card" or physical module. Do not merge points; give each one its own frame.
    * **Ranking:** Numbers (#1, #2, #3) should be treated as large, stylized graphic art elements, not just text. They act as the visual anchors that guide the eye down the stack.
    `,
  },
  {
    id: 'hierarchy_pyramid',
    icon: React.createElement(Pyramid),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Pyramid archetype is the universal symbol of stability and ascension. It communicates that high-level achievement is impossible without a broad, solid foundation of basics. It teaches dependency and structural integrity.
    
    It is used to rank concepts not just by importance, but by *necessity*. It visually argues that the top layer rests upon the bottom layers, and that removing the base would cause the collapse of the goal.

    **1. [VISUAL GEOMETRY]**
    * **The Triangle:** Establish a strong triangular silhouette with a wide, heavy base narrowing to a sharp, singular peak. This shape should feel solid and filled, not just an outline. It commands the center of the composition.
    * **Strata:** Divide the triangle horizontally into distinct layers, floors, or geological strata. Each layer should have a clear boundary line, separating it from the one above and below. The layers get physically smaller as they ascend.
    * **Interlocking:** The visual language should imply that the layers sit physically on top of one another, perhaps with interlocking joints or weight distribution. This emphasizes the physical reality of the support structure.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Load Bearing:** The bottom layers should look heavy, compressed, and supportive, while the top layers look lighter and more refined. The visual weight is at the bottom. This conveys the effort required to build the foundation.
    * **Ascension:** Lighting and color should shift as the eye moves up; the base might be darker or earthier, while the peak is glowing or illuminated. This symbolizes the journey from the mundane basics to the enlightened goal.

    **3. [SEMANTIC TRANSLATION]**
    * **Foundation:** The prerequisites or basic concepts described in the text become the wide stone base of the structure.
    * **Goal:** The ultimate outcome or highest value is visualized as the glowing capstone or the flag at the peak. It is the prize for building the structure.
    `,
  },
  {
    id: 'geographical_map',
    icon: React.createElement(Map),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Landscape layout spatializes information, turning a list of topics into a world that can be explored. It leverages the brain's innate navigational skills to understand relationships between concepts through distance and terrain.
    
    It implies that the subject is a vast ecosystem with distinct regions, creating a sense of immersion. It allows for "soft" categorization, where things can be "kind of" related by being nearby, rather than in rigid boxes.

    **1. [VISUAL GEOMETRY]**
    * **The Terrain:** Create an isometric or top-down view of a distinct landmass, a sprawling city, or a complex circuit board. This terrain provides the canvas and the boundaries for the information. It should have topography—hills, valleys, or districts—that creates natural zones.
    * **Zones:** distinct regions or "biomes" should be separated by natural borders like rivers, walls, or empty negative space. These zones visually group related items together without using boxes.
    * **Connectors:** Roads, bridges, flight paths, or signal traces should connect the different regions, showing how one travels between topics. These paths turn the static map into a network of potential journeys.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Exploration:** The eye is invited to wander across the map rather than following a linear path. There is no fixed start or end; the viewer can "land" anywhere and start exploring. This creates a sense of discovery.
    * **Clustering:** Related items are physically close to each other, forming cities or forests of data; unrelated items are separated by vast distances. The visual density changes, with some areas being crowded hubs and others being sparse outskirts.

    **3. [SEMANTIC TRANSLATION]**
    * **Categories:** Different sub-topics become different "biomes" or "districts" (e.g., "The Desert of Doubt" vs. "The City of Success"). The visual look of the terrain reflects the nature of the topic.
    * **Context:** Difficult concepts are placed in rugged, hard-to-reach terrain (mountains), while easy concepts are in flat, accessible plains. The geography adds emotional context to the data.
    `,
  },
  {
    id: 'data_story',
    icon: React.createElement(BarChart3),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Dashboard archetype represents control, monitoring, and objective truth. It appeals to the desire for quantification and status updates, presenting information as a series of measurable metrics rather than opinions.
    
    It creates a feeling of high situational awareness, placing the viewer in the cockpit of the system. It is best used for data-heavy, evidence-based content where precision is more important than narrative.

    **1. [VISUAL GEOMETRY]**
    * **The Grid:** Utilize a tight, modular "bento-box" layout composed of rectangular cards or widgets. The spacing between them is uniform and tight. The structure is rigid and grid-based, maximizing the use of space.
    * **HUD Aesthetic:** The visual style should resemble a futuristic Heads-Up Display (HUD) or a financial terminal. Use thin lines, monospaced fonts, and geometric shapes. Avoid organic curves or sketchy lines; everything should look generated by a computer.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Control:** The high density of information creates a sense of complexity that is being tamed. The aesthetic feels like a "Mission Control" screen, empowering the viewer with data. It conveys efficiency and speed.
    * **Focal Point:** Despite the grid, one "Hero Metric" or main chart should be significantly larger than the others (usually top-left or center) to anchor the eye. This establishes the headline of the data story.

    **3. [SEMANTIC TRANSLATION]**
    * **Qualitative to Quantitative:** Convert abstract adjectives in the text into mock-data charts. "Huge Success" becomes a full progress bar; "Small Risk" becomes a tiny slice of a pie chart. Reify feelings into numbers.
    * **Status:** Use color coding to indicate status instantly: "Good" implies Green/Blue/Upward trends; "Bad" implies Red/Warning/Downward trends. The shape of the graph tells the story before the numbers are read.
    `,
  },
  {
    id: 'roadmap',
    icon: React.createElement(GitCommitVertical),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Horizon layout is about vision and foresight. By using strong perspective, it places the viewer in the "Here and Now" looking towards the "Future," creating a physical representation of planning and ambition.
    
    It motivates the viewer by showing the destination in the distance, while making the immediate next steps clear in the foreground. It bridges the gap between current actions and long-term dreams.

    **1. [VISUAL GEOMETRY]**
    * **Perspective:** Use a strong one-point perspective with a vanishing point located on the horizon line. This draws the viewer's eye deep into the image, creating a sense of 3D space and distance.
    * **The Road:** A distinct path or road starts wide and detailed in the immediate foreground and narrows as it recedes into the distance. This road is the stage for the timeline.
    * **Environment:** The foreground represents the "Now" (Detailed, gritty, real); the Horizon represents the "Future" (Glowing, idealized, hazy). The environment transitions as the road progresses.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Depth:** Use atmospheric perspective (haze, lighter colors in distance) to emphasize how far away the goal is. This depth represents the time required to travel the road.
    * **Urgency:** Objects in the foreground feel immediate, large, and actionable, demanding attention. Objects in the background feel aspirational. This hierarchy prioritizes immediate execution while keeping the vision in sight.

    **3. [SEMANTIC TRANSLATION]**
    * **Goals:** The ultimate destination described in the text is visualized as a "City on a Hill," a Sunrise, or a Golden Gate at the end of the road.
    * **Obstacles:** Challenges mentioned in the text become physical barriers (rocks, walls, broken bridges) blocking the road that must be navigated.
    `,
  },
  {
    id: 'decision_tree',
    icon: React.createElement(GitBranch),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Decision Tree archetype visualizes complexity and causality. It shows how a single starting point can explode into a multitude of possibilities, mapping the "Butterfly Effect" of decisions.

    Unlike a Peer Mesh (which shows lateral peer connections without hierarchy) or an Org Chart (which maps reporting lines between roles), the Decision Tree is purely logical — every branch is a choice, and every endpoint is an outcome. It is used to navigate "If/Then" scenarios and turns a confusing mental maze into a clear, navigable map of consequences.

    **1. [VISUAL GEOMETRY]**
    * **The Root:** Identify a single origin point (usually at the Top or Left edge) from which all lines flow. This is the singularity of the concept.
    * **Divergence:** Lines split and branch outwards from the root, expanding in width and complexity as they move away. The structure resembles a tree's branches, a river delta, or neural pathways. The spacing expands to accommodate the increasing number of endpoints.
    * **Nodes:** Place distinct geometric shapes (diamonds, circles) at every intersection where a branch splits. These nodes represent the decision points or the moments of change.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Flow:** The eye is compelled to follow the lines like an electrical circuit or a flowing liquid. The movement is unidirectional (outward), tracing the path of logic.
    * **Expansion:** The image gets visually more complex and wider as it moves away from the source, representing the explosion of entropy or possibility. The energy disperses from the center to the edges.

    **3. [SEMANTIC TRANSLATION]**
    * **Choices:** The abstract "Options" in the text become physical forks in the road or splits in the cable.
    * **Outcomes:** The terminal points of the branches represent the final results. Visualize them as "Fruits" (Good results) or "Dead Ends/Skulls" (Bad results) to immediately signal the value of that path.
    `,
  },
  {
    id: 'visual_resume',
    icon: React.createElement(UserSquare),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Profile layout humanizes data by attaching it to a specific identity or persona. It borrows the visual language of RPG character sheets or futuristic ID cards to create a holistic snapshot of an entity's capabilities.
    
    It fosters empathy and connection, making the viewer feel they are analyzing a specific "player" rather than abstract stats. It unifies diverse data points under a single name and face.

    **1. [VISUAL GEOMETRY]**
    * **The Avatar:** A high-fidelity portrait, logo, or mascot serves as the anchor, usually positioned in the Center or Top-Left. This image defines the "Who."
    * **Satellites:** Data points, meters, text blocks, and inventory slots are arranged neatly around the avatar or stacked in a column next to it.
    * **Card:** The entire composition often sits within a frame that looks like a high-tech identification card, a dossier, or a game interface.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Identity:** All visual lines and grouping logic lead back to the persona. The data is clearly subservient to the identity; these are *his/her/its* stats.
    * **Quantification:** Abstract traits are visualized as "Power Bars," "Radar Charts," or "Badges." This "gamification" of the data makes it instantly comparable and scannable.

    **3. [SEMANTIC TRANSLATION]**
    * **Subject:** The entity described in the text is the hero of the image.
    * **Skills:** Abstract abilities or qualifications are treated as "Inventory Items," "Weapons," or "Equipment" that the character possesses.
    `,
  },
  {
    id: 'cycle',
    icon: React.createElement(RefreshCcw),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Loop archetype represents eternity, sustainability, and self-reinforcement. Unlike a line, which has a death (the end), the circle implies a process that feeds itself, suggesting resilience and continuity.
    
    It is the perfect shape for feedback loops, habits, or eco-systems. It creates a satisfying sense of completeness and balance, showing that the output of one stage becomes the input of the next.

    **1. [VISUAL GEOMETRY]**
    * **The Ring:** A dominant circular, elliptical, or infinity-loop structure defines the layout. There is no beginning and no end. The path connects back to itself seamlessly.
    * **Spacing:** Nodes or steps are placed at equidistant intervals around the perimeter (like numbers on a clock face). This symmetry is crucial to imply balance.
    * **Center:** The negative space in the center is often occupied by a "Hub" object or a glowing core that represents the purpose or the engine of the cycle.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Rotation:** Use directional arrows, motion blur, or swooping lines to imply that the ring is spinning. The image should feel kinetic, like a flywheel in motion.
    * **Perpetuity:** The visual cues should suggest that this system generates its own energy. It looks like a perpetual motion machine, self-sustaining and alive.

    **3. [SEMANTIC TRANSLATION]**
    * **Process:** The abstract steps of the cycle are the physical cogs or stations on the wheel.
    * **Result:** The "Value" generated by the cycle is often visualized as light or energy being emitted from the spinning center.
    `,
  },
  {
    id: 'iceberg',
    icon: React.createElement(MountainSnow),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Subsurface layout is the ultimate metaphor for hidden depth and root causes. It challenges the viewer's superficial perception by revealing the massive, invisible reality that supports the visible tip.
    
    It creates an "Aha!" moment by visually proving that what we see is only a fraction of the truth. It is essential for explaining complex problems where the symptoms are small but the causes are deep.

    **1. [VISUAL GEOMETRY]**
    * **The Horizon:** A rigid, straight horizontal line cuts the canvas across the upper 30% mark. This acts as a physical barrier between two distinct mediums (e.g., Air vs. Water, Light vs. Dark).
    * **The Mass:** A single, monolithic 3D object spans both zones. Only 10-20% of its volume is visible above the line, while 80-90% is submerged below. The shape below must look vastly larger, wider, and more dangerous/complex than the tip.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Binary Contrast:** Zone A (Above) should be bright, clean, minimalist, and safe. Zone B (Below) should be dark, dense, textured, and mysterious. This atmospheric shift signals a change in the nature of the information.
    * **Support:** The visual physics must imply that the submerged part is physically supporting the floating part. Without the base, the tip would sink. This communicates dependency.

    **3. [SEMANTIC TRANSLATION]**
    * **Surface:** Map superficial data (symptoms, public image, price) to the top section. Use simple, clear labels.
    * **Deep:** Map fundamental data (root causes, culture, hidden costs, risks) to the bottom section. Use denser clustering of labels deeper down to signify complexity and weight.
    `,
  },
  {
    id: 'venn',
    icon: React.createElement(Combine),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Synthesis archetype visualizes the magic of combination. It moves beyond simple addition to show alchemy—where the intersection of two things creates a third, superior thing.
    
    It focuses on the relationship and the shared ground between distinct entities. It is the visual definition of "Innovation" or "Sweet Spot," showing where value is created through collaboration.

    **1. [VISUAL GEOMETRY]**
    * **Shapes:** Use large, translucent geometric forms (circles, triangles, or amorphous blobs) that act as the primary containers. They must look like panes of colored glass or fields of light.
    * **Overlap:** The shapes must physically intersect and overlap in the center of the canvas. The overlapping area should create a new color (e.g., Blue + Yellow = Green) to visually prove the mixture.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Convergence:** The shapes should feel magnetically drawn to the center, as if they are trying to merge. The energy focuses on the middle.
    * **The Glow:** The intersection point should be the brightest, most saturated, or most detailed part of the image. This visual highlighting tells the viewer that the "Answer" is in the middle.

    **3. [SEMANTIC TRANSLATION]**
    * **Inputs:** The isolated outer areas represent the ingredients or the separate concepts.
    * **Intersection:** The "Solution," "Insight," or "Product" described in the text is located in the central blend. It represents the best of both worlds.
    `,
  },
  {
    id: 'funnel',
    icon: React.createElement(Filter),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Filter archetype tells the story of refinement. It acknowledges a chaotic or overwhelming starting state and visualizes the process of selecting the best parts to create a pure output.
    
    It validates the "waste" or the effort of selection, showing that the reduction in quantity leads to an increase in quality. It is the visual metaphor for recruiting, sales pipelines, or data processing.

    **1. [VISUAL GEOMETRY]**
    * **The Cone:** A prominent 3D structure that is wide at the top and tapers down to a narrow spout at the bottom. It occupies the vertical center of the image.
    * **Density:** The top section is crowded with many chaotic particles or items. The bottom section releases only a few, polished, high-value gems. The visual density changes drastically from top to bottom.
    * **Filters:** distinct horizontal meshes, sieves, or barriers are placed inside the cone to represent the stages of selection.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Gravity:** The visual force pulls everything downward. The items fall through the process. The flow is vertical and inevitable.
    * **Pressure:** The tapering shape implies squeezing and refining. The visual language suggests that only the strongest or best elements can fit through the hole at the bottom.

    **3. [SEMANTIC TRANSLATION]**
    * **Input:** The "Chaos," "Raw Data," or "Applicants" mentioned in the text are the messy particles at the top.
    * **Output:** The "Solution," "Winner," or "Insight" is the polished object that emerges at the bottom.
    `,
  },
  {
    id: 'prism',
    icon: React.createElement(Triangle),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Refraction archetype visualizes the "Black Box" of transformation. Unlike a funnel (which reduces), a prism changes the *nature* of the thing passing through it. It explains the "How" of a methodology.
    
    It highlights the tool or the insight as the catalyst that alters reality. It creates a sense of wonder and sudden clarity, showing a distinct "Before" and "After" state separated by a specific intervention.

    **1. [VISUAL GEOMETRY]**
    * **The Catalyst:** A central, mysterious geometric object (a glass prism, a floating cube, a lens) sits in the exact center. This is the pivot point of the image.
    * **The Beam:** A single stream of matter or light enters from the Left, strikes the object, and fans out (or changes color/texture) as it exits to the Right.
    * **Alignment:** The entry and exit points are aligned horizontally, creating a linear narrative of cause and effect.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Metamorphosis:** The visual properties (color, texture, speed) of the stream must change *instantly* upon hitting the catalyst. This discontinuity proves that the catalyst is powerful.
    * **Direction:** The flow is strictly Left to Right. The energy hits the object and is transformed by it.

    **3. [SEMANTIC TRANSLATION]**
    * **Before:** The user's problem or current state (dull, chaotic) is the incoming beam.
    * **The Tool:** The central prism represents the Methodology, Software, or Secret Sauce being explained.
    * **After:** The result (colorful, structured) is the outgoing beam.
    `,
  },
  {
    id: 'galaxy',
    icon: React.createElement(Atom),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Ecosystem archetype represents a network of soft relationships. Unlike a rigid hierarchy chart, it shows a flexible, living system where elements are connected by influence and gravity rather than hard reporting lines.
    
    It conveys complexity, adaptability, and organic growth. It is perfect for showing communities, product suites, or cultural values where everything relates to a central mission but maintains independence.

    **1. [VISUAL GEOMETRY]**
    * **The Nucleus:** A glowing, dense central hub anchors the image. It does not look like a box, but like a source of light or gravity.
    * **The Cloud:** Related elements float freely around the hub in a 3D cloud or ring. They are not bound by rigid grid lines or boxes. Their positions feel fluid and dynamic.
    * **Connectors:** Faint, organic proximity lines, orbital paths, or glow effects connect the items. The connections look like magnetic forces rather than steel beams.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Fluidity:** The system feels alive and moving, like a solar system or a cellular structure under a microscope. It suggests that the parts can move and reorganize without breaking the system.
    * **Gravity:** Items closer to the center are visually implied to be more relevant or fundamental; items further out are peripheral. This creates a "soft hierarchy" based on distance.

    **3. [SEMANTIC TRANSLATION]**
    * **Core:** The Mission, Purpose, or Brand is the central sun.
    * **Satellites:** The Community members, Products, or Values are the planets orbiting the core.
    `,
  },

  // --- STRATEGIC EXPANSION (LOGIC & STRUCTURE) ---
  {
    id: 'matrix_quadrant',
    icon: React.createElement(Grid2x2),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Matrix layout is the definitive tool for strategic analysis. By crossing two variables, it creates four distinct realities, forcing the viewer to evaluate items based on trade-offs rather than a single metric.
    
    It brings scientific rigor to decision making. It transforms a subjective list of options into an objective map of value, helping the viewer identify the "Sweet Spot" and avoid the "Trash."

    **1. [VISUAL GEOMETRY]**
    * **Axes:** Two dominant, perpendicular lines cross exactly in the center of the canvas (Crosshair). They should be labeled clearly at the ends to define the coordinate system.
    * **Quadrants:** The cross creates four distinct, equal zones. The background of these zones might be subtly color-coded to indicate their nature.
    * **Distribution:** Bubbles, dots, or icons are scattered across the grid based on their calculated coordinates. It looks like a scatterplot or a star map.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Valuation:** The "Top-Right" quadrant (High/High) is usually visually highlighted as the "Golden Zone" with a glow or a spotlight. The eye is drawn there as the target destination.
    * **Analysis:** The scatter aesthetic implies measurement and data. The placement looks calculated, not random. It conveys a sense of rigorous assessment.

    **3. [SEMANTIC TRANSLATION]**
    * **Axes:** The two competing forces in the text (e.g., "Cost" vs. "Value") become the X and Y axes.
    * **Position:** The location of an item defines its nature (e.g., High Cost + Low Value = The "Avoid" zone). The visual position tells the strategic story.
    `,
  },
  {
    id: 'concentric_layers',
    icon: React.createElement(Target),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Onion archetype visualizes context and containment. It shows that nothing exists in a vacuum; every core concept is wrapped in layers of environment, protection, or influence.
    
    It is used to show relationships of dependency ("The Core depends on the Shell") or protection ("The Shell protects the Core"). It gives a holistic view of a system, from the inside out.

    **1. [VISUAL GEOMETRY]**
    * **Nesting:** A series of perfect rings nested inside one another, creating a Bullseye pattern. The rings should have physical thickness, looking like walls or distinct zones.
    * **Boundaries:** Distinct borders separate each layer. These can be rendered as hard armor, porous membranes, or glowing fields depending on the permeability required.
    * **Core:** The smallest, most protected circle lies in the absolute middle. It is the jewel of the image.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Protection:** The visual language implies that the outer layers are shielding the inner layers. The outside feels exposed to the elements; the inside feels safe and insulated.
    * **Penetration:** If the concept involves influence, arrows may show movement piercing from the outside in (Context affecting Core) or radiating from the inside out (Core affecting Context).

    **3. [SEMANTIC TRANSLATION]**
    * **Core:** The Essence, The Code, or The Self is the center.
    * **Layers:** The Environment, The Market, or The Defense Mechanisms are the wrapping layers. The text maps to the rings based on how "external" the concept is.
    `,
  },
  {
    id: 'staircase',
    icon: React.createElement(TrendingUp),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Ascent archetype visualizes ambition and the overcoming of gravity. Unlike a flat timeline, a staircase implies that moving forward requires *effort* and energy. It validates the struggle of growth.
    
    It is perfect for "Maturity Models" or "Level Up" guides. It tells the viewer that the destination is superior to the starting point, elevating the user's status as they climb.

    **1. [VISUAL GEOMETRY]**
    * **Structure:** A solid, architectural staircase ascending from Bottom-Left to Top-Right. The perspective should look up at the stairs, making them look grand and imposing.
    * **Risers:** The vertical face of each step represents the barrier or the work required.
    * **Treads:** The horizontal platform of each step represents the stability or the plateau achieved after the work.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Effort:** The verticality implies working against gravity. The visual language emphasizes the climb. The top feels "higher" and more valuable than the bottom.
    * **Achievement:** The top step is the podium or the peak. It should be highlighted with a flag, an open door, or a trophy to represent the ultimate reward.

    **3. [SEMANTIC TRANSLATION]**
    * **Levels:** Each step corresponds to a maturity level in the text (e.g., "Beginner," "Intermediate," "Expert").
    * **Climb:** The act of moving up represents the "Upgrade" or the transformation of the user.
    `,
  },
  {
    id: 'puzzle_integration',
    icon: React.createElement(Puzzle),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Puzzle archetype emphasizes interdependence and fit. It visually argues that separate entities are designed to work together, and that the system is incomplete if even one piece is missing.
    
    It fosters a sense of unity and team cohesion. It is better than a Venn diagram when you want to show that things lock together mechanically to form a solid structure, rather than just overlapping.

    **1. [VISUAL GEOMETRY]**
    * **The Fit:** Three to five distinct geometric shapes interlocking with zero gaps. The lines between them are visible but tight. They fit like a glove.
    * **Unity:** The combined pieces form a perfect, unified primitive shape (such as a circle, a hexagon, or a square). The chaos of the parts creates the order of the whole.
    * **Separation:** Each piece has a distinct color or texture to show that it retains its individuality despite being part of the group.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Dependency:** The visual cue suggests structural integrity; if one piece were removed, the whole object would lose its shape or collapse. This implies necessity.
    * **Assembly:** Optionally, show one piece slightly hovering or sliding into place. This "Action of Assembly" suggests that the solution is being built right now and invites the viewer to complete it.

    **3. [SEMANTIC TRANSLATION]**
    * **Pieces:** Different departments, modules, or ingredients described in the text become the puzzle pieces.
    * **Whole:** The Integrated System or the Final Product is the completed shape.
    `,
  },

  // --- TANGIBLE EXPANSION (REAL WORLD METAPHORS) ---
  {
    id: 'ingredients_knolling',
    icon: React.createElement(UtensilsCrossed),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Recipe archetype (Knolling) demystifies complex creation by showing the raw materials. It appeals to the maker's mindset, organizing chaos into a neat, "mise-en-place" arrangement that promises readiness.
    
    It suggests that a complex result is just the sum of manageable parts. It creates a sense of preparation and capability, visually handing the viewer a "Starter Kit" for success.

    **1. [VISUAL GEOMETRY]**
    * **Perspective:** A direct top-down (90 degree) "flat lay" camera angle. Everything is seen in plan view.
    * **Surface:** The background is a textured, realistic surface that grounds the objects—a wooden workbench, a marble kitchen counter, or a technical cutting mat.
    * **Arrangement:** Objects are arranged at strict right angles (Knolling) with satisfying, equal spacing between them. No objects overlap. The layout is hyper-organized.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Preparation:** The aesthetic conveys a sense of potential energy; the work is about to begin. It feels like a surgeon's tray or a chef's counter.
    * **Clarity:** The separation between objects allows for hyper-real focus on the texture and details of individual tools. There is no clutter, only distinct ingredients.

    **3. [SEMANTIC TRANSLATION]**
    * **Concepts as Tools:** Abstract requirements are reified into physical items (e.g., "Time" becomes a stopwatch; "Budget" becomes a stack of coins; "Creativity" becomes a paint tube).
    * **Recipe:** Use small tags or paper labels next to the items specifying quantity or instructions, gamifying the concept into a buildable kit.
    `,
  },
  {
    id: 'balance_scale',
    icon: React.createElement(Scale),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Balance archetype visualizes the concept of value exchange and trade-offs. It moves beyond simple comparison to show *weight* and *leverage*. It answers the question: "Is it worth it?"
    
    It creates a sense of fairness and calculation. It is the visual metaphor for justice, ROI (Return on Investment), and decision-making under constraints.

    **1. [VISUAL GEOMETRY]**
    * **Apparatus:** A central fulcrum supports a beam with two pans (Classic Justice Scale) or a simple seesaw plank. The mechanism should look physically realistic.
    * **The Tilt:** The beam acts as the tension meter. It is either perfectly horizontal (equilibrium) or diagonally tipped (dominance). The angle of the beam tells the score.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Weight:** The visual mass of the objects is crucial. Heavy objects sink the pan; light objects rise. The viewer intuitively "feels" the weight of the concepts.
    * **Tension:** The image captures the struggle to maintain stability. It feels precarious, implying that a slight change in inputs could tip the scales.

    **3. [SEMANTIC TRANSLATION]**
    * **Sides:** The two opposing forces (e.g., "Work vs Life," "Risk vs Reward") are placed on opposite pans.
    * **Leverage:** Use visual irony to make a point—show a small, glowing "Idea" balancing out a huge, heavy pile of "Money." This visualizes the concept of high leverage or quality over quantity.
    `,
  },
  {
    id: 'bridge_gap',
    icon: React.createElement(Link),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Bridge archetype visualizes the solution to a disconnect. It acknowledges a dangerous gap (the problem) and presents a reliable structure (the solution) to cross it. It is the hero's journey in a single frame.
    
    It emphasizes the risk of inaction (falling) and the safety of the proposed path. It is the classic consulting metaphor for "Gap Analysis"—getting from State A to State B safely.

    **1. [VISUAL GEOMETRY]**
    * **The Abyss:** Two distinct landmasses are separated by a deep, dangerous void, canyon, or river. The drop looks impassable without help.
    * **The Span:** An engineered structure (bridge, rope, walkway) connects the Left Cliff (Start) to the Right Cliff (End). The bridge is the focal point.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Risk:** The void below represents failure. It looks dark and intimidating. This heightens the value of the bridge.
    * **Transition:** The visual flow moves horizontally across the gap. The bridge acts as the lifeline. The only way to get to the "Better Place" on the right is to trust the structure.

    **3. [SEMANTIC TRANSLATION]**
    * **The Gap:** The market need, the problem, or the missing capability is the hole in the ground.
    * **The Bridge:** The product, strategy, or solution described in the text is the physical structure that spans the hole. Label the pillars with the key features.
    `,
  },
  {
    id: 'organic_tree',
    icon: React.createElement(Sprout),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Tree archetype connects the invisible to the visible through the metaphor of organic growth. It teaches that visible results (Fruit) are the direct consequence of invisible investments (Roots).
    
    It fosters a long-term mindset, emphasizing health, nurturing, and foundations. It is a warmer, more positive alternative to the Iceberg, focusing on production rather than danger.

    **1. [VISUAL GEOMETRY]**
    * **Ground Line:** A horizontal divider splits the canvas. The texture changes from soil/earth below to air/sky above.
    * **Below:** A complex, spreading, tangle of roots anchors the tree deep in the earth. This section should look as large or larger than the top.
    * **Above:** A strong trunk branches out into a canopy of leaves and hanging, bright fruits.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Flow:** The visual logic implies that nutrients travel upward. The health of the top depends entirely on the health of the bottom. A sickly root leads to a withered branch.
    * **Asymmetry:** The roots often spread wider than the crown to imply stability and reach. The image feels grounded and bottom-heavy.

    **3. [SEMANTIC TRANSLATION]**
    * **Roots:** Abstract inputs like "Values," "Culture," "Education," or "History" are mapped to the roots. They are the hidden anchors.
    * **Fruit:** Tangible outputs like "Revenue," "Brand Reputation," or "Innovation" are mapped to the desirable fruits.
    `,
  },

  // --- FINAL CRITICAL ADDITIONS ---
  {
    id: 'chaos_to_order',
    icon: React.createElement(AlignStartVertical),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Unraveling archetype visualizes the act of making sense of the world. It captures the primary value proposition of intelligence: turning noise into signal. It is the visual definition of "Clarification" or "Strategy."
    
    It validates the user's initial feeling of confusion and offers a path to simplicity. It provides a satisfying "before and after" narrative in a single continuous stream.

    **1. [VISUAL GEOMETRY]**
    * **Left Side:** A chaotic scribble, a tangled knot of wires, or a localized storm cloud dominates the left side. The lines are erratic and multidirectional.
    * **Right Side:** Straight, parallel, equidistant lines emerge from the knot and extend to the right. The lines are perfectly ordered and harmonic.
    * **Transition:** There is a specific vertical threshold or "combing point" where the curves snap into straight lines. This is the moment of transformation.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Entropy Reduction:** The visual noise is maximum on the left and minimum on the right. The contrast between the "mess" and the "grid" creates a feeling of relief.
    * **Direction:** The flow is strictly Left-to-Right. The chaotic mass explicitly "feeds" into the ordered lines, implying that the order is made *from* the chaos, just straightened out.

    **3. [SEMANTIC TRANSLATION]**
    * **Chaos:** The "Problem," "Brainstorming," or "Raw Data" is represented by the tangle.
    * **Order:** The "Solution," "Strategy," or "Insight" is represented by the straight lines.
    `,
  },
  {
    id: 'ripple_effect',
    icon: React.createElement(Waves),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Ripple archetype visualizes impact and influence. It demonstrates how a small, singular action can have vast, expanding consequences that reach far beyond the point of origin.
    
    It captures the "Butterfly Effect" or viral growth. It is essential for explaining marketing reach, PR crises, or the cascading effects of a leadership decision.

    **1. [VISUAL GEOMETRY]**
    * **Impact Point:** A central drop, splash, or stone hitting a surface defines the "Zero Point." It is the epicenter of the image.
    * **Waves:** A series of concentric rings expand outwards from this point. Unlike a target (which is static), these rings must clearly look like motion or impact waves in liquid or air.
    * **Perspective:** Use an isometric or 3/4 angled view to show the height and undulation of the waves, rather than a flat top-down map view.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Propagation:** The energy visibly travels from the center outwards. The layout conveys transmission and expansion.
    * **Causality:** The visual logic makes it undeniable that the center caused the outer rings. The rings get wider and fainter as they move further away, implying dissipation over distance/time.

    **3. [SEMANTIC TRANSLATION]**
    * **Center:** The "Event," "Launch," or "Crisis" is the drop.
    * **Rings:** The expanding circles represent the "Consequences," "Market Reach," or "Secondary Effects." Each ring is a layer of impact reaching a wider audience.
    `,
  },
  {
    id: 'markup_breakdown',
    icon: React.createElement(Highlighter),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Markup archetype acts as the "Editor's Eye." It takes a seemingly simple flat object (a text block, an email, a UI card, or a script) and reveals its hidden genius or flaws through annotation.
    
    It establishes authority by showing *critique* and *analysis*. It transforms passive consumption ("reading a text") into active learning ("understanding the mechanics of the text"). It creates a "Teacher/Student" dynamic.

    **1. [VISUAL GEOMETRY]**
    * **The Subject:** A flat, clean "Paper" or "Card" sits in the center. It contains the raw content (e.g., a sample LinkedIn post, a sales script, or a cold email). It looks like a physical document or a digital screenshot.
    * **The Layer:** A secondary visual layer sits *on top* of the subject. This layer consists of hand-drawn elements: brackets grouping lines together, underlines, circles, and arrows pointing to marginalia.
    * **The Margins:** The whitespace around the subject is used for the "Notes." This is where the insight lives.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Contrast of Styles:** The Subject should look formal, typed, and rigid (Serif/Sans-Serif font). The Markup should look organic, handwritten, and colorful (Marker/Pen style). This contrast separates "The Thing" from "The Insight."
    * **Directionality:** Arrows direct the eye from the specific detail in the text to the explanation in the margin. It guides the reading flow microscopically.

    **3. [SEMANTIC TRANSLATION]**
    * **The Artifact:** The text provided by the user is the "Subject" to be analyzed.
    * **The Insights:** The explanations or labels become the handwritten notes in the margins (e.g., "This creates urgency," "Here is the hook," "Bad example").
    `,
  },

  // --- ROSTER, RANKING & NETWORK EXPANSION ---
  {
    id: 'team_roster',
    icon: React.createElement(Users),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Roster archetype visualizes a collective of equals assembled for a common mission. Unlike a single Profile card, it presents multiple distinct identities side-by-side, each retaining individuality while belonging to the same unit.

    Unlike a Scoreboard (which ranks by quantified performance with numerals and meter bars), the Roster presents members as peers — no rank order, no podium emphasis, no competitive scoring. It is best used for introducing members, contributors, or a set of comparable entities that together form a lineup.

    **1. [VISUAL GEOMETRY]**
    * **The Formation:** Arrange 3-6 individual "ID cards" or "trading cards" in a uniform row or grid, each with identical framing (portrait/icon slot on top, name plate and attribute tags below). No card is larger than another — equality of format is the rule.
    * **Card Anatomy:** Each card contains a distinct avatar or symbolic icon anchor, a name/title band, and 1-3 short attribute or stat tags beneath it.
    * **Cohesion:** A shared background band, banner, or connecting baseline runs behind all cards, visually declaring that these individuals belong to one roster or team.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Parity:** Lighting, scale, and framing must be identical across all cards — no single member outshines another unless the text explicitly ranks them.
    * **Assembly:** The eye scans left to right or across the grid as if reviewing a lineup, inspecting one member at a time before absorbing the group as a whole.

    **3. [SEMANTIC TRANSLATION]**
    * **Members:** Each person, contributor, product variant, or team role described in the text becomes its own card in the roster.
    * **Attributes:** Skills, roles, or traits per member become the short tags beneath each name plate — concise, not paragraphs.
    `,
  },
  {
    id: 'scoreboard',
    icon: React.createElement(Trophy),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Scoreboard archetype visualizes competitive ranking through quantified performance. It borrows the visual language of sports leaderboards and race results, turning abstract achievement into a measurable, ordered contest.

    Unlike the Stack (listicle), which is an ordered list of items without measured scores, every row here must encode performance — rank numerals, medal glyphs, and proportional meter bars are mandatory. It is best used for rankings, top-performer lists, or competitive standings where relative score matters.

    **1. [VISUAL GEOMETRY]**
    * **The Ladder:** Stack 3-6 horizontal rows in strict rank order (1st at top), each row spanning the full width of the canvas.
    * **Row Anatomy:** Each row contains a large rank numeral or medal glyph on the left, a name/label in the middle, and a horizontal progress bar or score meter on the right whose length is proportional to the value it represents.
    * **Podium Emphasis:** The top 1-3 rows are visually elevated — brighter, slightly larger, or gilded — echoing a podium finish.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Descending Weight:** Visual intensity (color saturation, bar length, glow) decreases steadily from the top row to the bottom row, reinforcing the ranking order.
    * **Competitive Energy:** The aesthetic resembles a live leaderboard or race telemetry — clean, high-contrast, and numeric, rewarding a quick top-to-bottom scan.

    **3. [SEMANTIC TRANSLATION]**
    * **Rank:** The order of items in the text maps directly to row position, top to bottom.
    * **Score:** Any quantitative or qualitative strength mentioned in the text becomes the length/fill of that row's meter bar.
    `,
  },
  {
    id: 'layered_stack_comparison',
    icon: React.createElement(Layers),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Tiered Stack archetype visualizes comparison through vertical inclusion rather than side-by-side opposition. Each tier contains everything below it plus something new, making it the natural shape for pricing plans, service levels, or capability tiers.

    It answers "what do I get at each level" rather than "which side wins," emphasizing cumulative value and upgrade paths.

    **1. [VISUAL GEOMETRY]**
    * **The Tower:** Stack 2-4 horizontal slabs of equal width but distinct color intensity, one on top of another, like a layered cake seen from the front.
    * **Tier Anatomy:** Each slab carries a tier name band and a short column of included-feature ticks or icons stacked inside it.
    * **Cumulative Marker:** A vertical guide line or bracket on one side shows that upper tiers visually "contain" the tiers beneath, implying accumulation rather than replacement.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Ascending Richness:** Color saturation, texture detail, or a subtle glow increases from the bottom slab to the top slab, signaling greater value at higher tiers.
    * **Inclusion Logic:** The visual language must never suggest the top tier discards the bottom tier's features — it builds upward, layer upon layer.

    **3. [SEMANTIC TRANSLATION]**
    * **Tiers:** Plans, levels, or packages named in the text become the stacked slabs, ordered bottom (entry) to top (premium).
    * **Features:** Included capabilities per tier become the tick marks or icons inside each slab.
    `,
  },
  {
    id: 'network_graph',
    icon: React.createElement(Share2),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Peer Mesh archetype visualizes lateral relationships without hierarchy. Unlike a Decision Tree (which branches into if/then logic paths) or an Org Chart (which maps who reports to whom), no single node dominates — meaning emerges from the web of connections itself, mirroring how ideas, people, or systems influence one another as equals.

    It is best used for showing collaboration, interdependency, or many-to-many relationships where no node is clearly "in charge."

    **1. [VISUAL GEOMETRY]**
    * **Nodes:** Scatter 5-8 circular or rounded nodes of roughly similar size across the canvas, avoiding any single dominant center or strict grid.
    * **Edges:** Connect related nodes with thin lines of varying length, crossing the canvas at multiple angles — some nodes have many connections (hubs), others have few (leaves).
    * **Clustering:** Allow tightly connected nodes to sit physically closer together, forming loose visual clusters, while weakly connected nodes drift toward the edges.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Lateral Energy:** The eye moves non-linearly across the mesh, following connection lines rather than a single directional path — there is no clear start or end.
    * **Emergent Hubs:** Nodes with more connections should read as slightly more visually prominent (size or glow), not because they are "above" others in rank, but because they are structurally central.

    **3. [SEMANTIC TRANSLATION]**
    * **Nodes:** People, teams, systems, or ideas mentioned in the text become the graph's nodes.
    * **Edges:** Relationships, dependencies, or interactions described in the text become the connecting lines between the relevant nodes.
    `,
  },

  // --- ARGUMENT, REFERENCE & ANALOGY EXPANSION ---
  {
    id: 'claim_pillars',
    icon: React.createElement(Landmark),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Pillars archetype visualizes persuasion through independent, parallel support. It borrows the visual language of classical architecture — a temple facade — where a central thesis rests atop several separate columns of evidence, each strong enough to stand on its own.

    Unlike a hierarchy or pyramid, where every layer depends on the one beneath it, here the pillars are peers: removing one weakens the roof's stability but does not collapse the whole structure. It is best used for persuasive, argumentative content — making a case, backing a position with independent lines of evidence, or presenting reasons that jointly (not sequentially) support a claim.

    **1. [VISUAL GEOMETRY]**
    * **The Pediment:** A solid horizontal entablature or roof spans the top of the composition, inscribed or crowned with the central thesis, claim, or headline. It rests visibly on top of, and is supported by, everything below it.
    * **The Colonnade:** Beneath the pediment, place 3-4 distinct, freestanding vertical columns of equal height and equal visual weight, spaced evenly apart with open space between them — never touching or overlapping. Each column is a complete structural unit on its own.
    * **Column Anatomy:** Each pillar carries its own base, shaft, and capital, with a short label or icon inscribed on the shaft representing one piece of independent evidence or one supporting argument.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Parallel Load-Bearing:** Unlike a cascading pyramid, weight distribution here is horizontal and shared — each column independently bears its portion of the roof's load. Visually, no column looks more "essential" than another; they read as parallel, interchangeable supports.
    * **Structural Confidence:** The overall silhouette should feel monumental, stable, and classical — evoking a courthouse, senate, or temple — reinforcing that the claim above stands on solid, reasoned ground.

    **3. [SEMANTIC TRANSLATION]**
    * **Claim:** The central thesis, position, or headline argument in the text becomes the inscribed pediment at the top.
    * **Evidence:** Each independent supporting argument, data point, or reason described in the text becomes its own freestanding column — distinct, self-sufficient, and never stacked on another column.
    `,
  },
  {
    id: 'glossary_grid',
    icon: React.createElement(LayoutGrid),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Reference Grid archetype visualizes lookup rather than narrative. It abandons sequence and hierarchy entirely, presenting a uniform field of small, self-contained entries meant to be scanned in any order — like flipping through an index card box or a dictionary page.

    Unlike the Stack (which implies rank or sequence) or the Roster (which presents people/entities), this layout is for abstract terms, definitions, or reference facts where no entry is more important than another and there is no implied reading order. It is best used for glossaries, FAQs, or terminology references.

    **1. [VISUAL GEOMETRY]**
    * **The Grid:** A strict, uniform matrix of 6-12 identical rectangular cards, evenly spaced with consistent gutters, filling the canvas edge to edge like a card catalog or a tile wall. Every cell is the exact same size.
    * **Card Anatomy:** Each card contains a small representative icon or glyph at the top, a bolded term or short label beneath it, and one compact line of definition text below that — nothing more.
    * **No Directionality:** There is no arrow, path, number, or connecting line between cards. Each cell is visually sealed and independent of its neighbors.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Even Weight:** Lighting, color intensity, and scale are perfectly uniform across every card — no cell dominates or is subordinate to another. The eye can enter the grid at any point and exit at any point.
    * **Scanning Rhythm:** The repetition creates a calm, catalog-like rhythm suited to quick lookup rather than a guided journey — the opposite feeling of a timeline or process flow.

    **3. [SEMANTIC TRANSLATION]**
    * **Terms:** Each abstract term, acronym, or concept mentioned in the text becomes its own independent card, identified by an icon that visually reifies the word.
    * **Definitions:** The short explanation for each term becomes the single line of text beneath its label — concise, dictionary-style, never a paragraph.
    `,
  },
  {
    id: 'analogy_bridge',
    icon: React.createElement(ArrowLeftRight),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Analogy Bridge archetype visualizes teaching through structural correspondence rather than competition. It pairs a familiar, concrete object with an unfamiliar, abstract concept, drawing explicit point-to-point connections that say "this part of the thing you already know maps to that part of the new idea."

    Unlike Comparison (which evaluates two competing options and implies a winner), there is no rivalry here — the two sides are not competing, they are cooperating: one side exists purely to explain the other. It is best used for teaching abstract or unfamiliar concepts by anchoring them to something the viewer already understands.

    **1. [VISUAL GEOMETRY]**
    * **The Asymmetric Pair:** Divide the canvas into two visually distinct zones of unequal texture — one side renders a familiar, everyday, concrete object (rendered with warm, tactile, recognizable detail); the other side renders the new, abstract concept (rendered as a more schematic, technical, or novel form). The two objects are deliberately different in style to signal "known" vs. "unknown."
    * **Mapping Lines:** Thin, precise dotted or dashed lines cross the gap between the two zones, each connecting one specific part of the familiar object to the structurally corresponding part of the new concept — like a translator's annotation, not a flow of energy.
    * **Balance without Rivalry:** Unlike a Duality split, there is no hard dividing wall or combative tension; the space between the two objects feels like a bridge of understanding, not a battlefield.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Cognitive Translation:** The visual energy moves bidirectionally along the mapping lines rather than pushing toward a single winner — the eye travels back and forth, verifying each correspondence rather than judging which side is "better."
    * **Clarity Over Contrast:** Where Comparison uses opposing color temperatures to bias the viewer, this layout uses matched, neutral lighting on both sides — the goal is understanding, not persuasion.

    **3. [SEMANTIC TRANSLATION]**
    * **The Familiar:** The everyday object, system, or experience used as an anchor in the text becomes the concrete, detailed object on one side.
    * **The New Concept:** The abstract, technical, or unfamiliar idea being taught becomes the schematic form on the other side, with its individual components mapped one-to-one to the equivalent parts of the familiar object via the connecting lines.
    `,
  },

  // --- COGNITIVE GEOMETRY EXPANSION ---
  {
    id: 'mind_map',
    icon: React.createElement(GitFork),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Mind Map archetype visualizes associative thinking rather than linear logic. It radiates outward from a single central concept into a constellation of related ideas, mirroring how the brain explores connections freely without a fixed reading order.

    Unlike a Decision Tree (which enforces if/then logic) or a Galaxy (which orbits a gravitational core), the Mind Map celebrates organic, non-hierarchical brainstorming. Unlike a Central Metaphor (which renders one dominant hero object), the Mind Map uses a labeled hub with branching topics — no single photorealistic prop dominates the canvas. It is best used for summarizing a topic, exploring sub-themes, or capturing the full landscape of an idea at a glance.

    **1. [VISUAL GEOMETRY]**
    * **The Core:** A bold central node — a circle, cloud, or glowing hub — sits in the absolute center of the canvas, labeled with the main topic. It is the sun from which all branches originate.
    * **The Branches:** Curved, organic lines radiate outward in all directions (360°), splitting into thinner sub-branches as they extend. The geometry resembles tree roots viewed from above or neural pathways — fluid, not rigid.
    * **Leaf Nodes:** Each terminal branch ends in a small node (circle, pill, or icon capsule) carrying a short label. Branches closer to the core are thicker; peripheral branches are thinner and more numerous.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Radial Freedom:** There is no top-to-bottom or left-to-right hierarchy. The eye enters at the center and explores outward in any direction, creating a sense of discovery rather than instruction.
    * **Organic Growth:** Lines should feel hand-drawn or naturally curved, not mechanical. The overall silhouette is roughly circular or cloud-shaped, filling the canvas evenly without a dominant axis.

    **3. [SEMANTIC TRANSLATION]**
    * **Central Topic:** The main subject described in the text becomes the central hub node.
    * **Subtopics:** Each related theme, angle, or supporting idea in the text becomes a branch node at the appropriate distance from the core — more fundamental ideas sit closer; peripheral details sit further out.
    `,
  },
  {
    id: 'root_cause_fishbone',
    icon: React.createElement(Bone),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Fishbone archetype (Ishikawa diagram) visualizes root-cause analysis. It traces a visible problem back to its hidden origins by organizing contributing factors into named categories that branch toward a central spine.

    Unlike the Iceberg (which contrasts surface vs depth) or the Ripple (which shows outward impact), the Fishbone is diagnostic — it asks "why did this happen?" by systematically decomposing causes. It is essential for quality analysis, debugging, post-mortems, and problem-solving workshops.

    **1. [VISUAL GEOMETRY]**
    * **The Spine:** A thick horizontal arrow or bone runs from Left (causes) to Right (the Problem). The arrowhead on the right points directly at the problem statement, which sits as a bold label or box at the tip.
    * **The Ribs:** Diagonal branches (like fish ribs) extend upward and downward from the spine at regular intervals. Each rib represents a cause category (e.g., People, Process, Technology, Environment).
    * **Sub-causes:** Smaller twigs branch off each rib, carrying specific contributing factors. The visual density increases toward the left (many causes) and converges toward the single problem on the right.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Convergence:** All visual lines flow toward the problem on the right, creating a sense of inevitability — these causes led to this outcome. The left side feels expansive and complex; the right tip feels singular and sharp.
    * **Categorical Order:** The ribs should feel evenly spaced and balanced above and below the spine, implying a systematic audit rather than random chaos.

    **3. [SEMANTIC TRANSLATION]**
    * **Problem:** The issue, failure, or symptom described in the text becomes the arrowhead label on the right.
    * **Categories:** The major cause groups in the text become the primary ribs branching from the spine.
    * **Factors:** Specific contributing details within each category become the smaller twigs on each rib.
    `,
  },
  {
    id: 'org_chart',
    icon: React.createElement(Building2),
    promptInstruction: `
    **0. [CONCEPTUAL CORE]**
    The Org Chart archetype visualizes formal authority and reporting structure. It maps who reports to whom in a rigid, top-down hierarchy of boxes connected by straight vertical and horizontal lines.

    Unlike a Hierarchy Pyramid (which shows levels of necessity or foundation), a Peer Mesh (which shows lateral peer connections without rank), or a Decision Tree (which branches into if/then logic paths rather than roles), the Org Chart maps formal reporting lines — every box is a role or entity, every connector is a chain of command. It is the definitive format for team structure, company charts, and delegation maps.

    **1. [VISUAL GEOMETRY]**
    * **The Tree:** A strict top-down tree structure with the highest authority at the top center. Each level below contains more boxes, branching outward symmetrically like a family tree or corporate ladder.
    * **The Boxes:** Every role or entity is a uniform rectangular card (same width, consistent padding) containing a name/title and optionally a small icon or avatar. Boxes at the same level share identical dimensions.
    * **Connectors:** Straight vertical lines drop from the bottom center of a parent box to a horizontal bus line, from which vertical drops connect to each child box. No diagonal or curved lines — the geometry is architectural and precise.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Authority Gradient:** Visual weight and prominence decrease as the eye moves down the chart. The top box is largest or most highlighted; lower tiers are progressively smaller or lighter.
    * **Structural Clarity:** The layout must be instantly parsable — a viewer should identify the chain of command within seconds. Symmetry and alignment are paramount; messy overlaps are forbidden.

    **3. [SEMANTIC TRANSLATION]**
    * **Leader:** The topmost person, role, or entity in the text sits in the apex box.
    * **Reports:** Direct reports become the boxes on the next level down, connected by lines to their manager above.
    * **Departments:** Groups or teams mentioned in the text become sub-trees branching from their respective parent box.
    `,
  },
];
