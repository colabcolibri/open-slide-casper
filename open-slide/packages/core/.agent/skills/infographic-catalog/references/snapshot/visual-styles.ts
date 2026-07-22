import {
  Banknote,
  Binary,
  Box,
  Briefcase,
  Brush,
  Circle,
  Clapperboard,
  Club,
  Code,
  Copyleft,
  Cpu,
  Diamond,
  DraftingCompass,
  Droplets,
  Fingerprint,
  Flower,
  Gamepad2,
  GlassWater,
  GraduationCap,
  Grid,
  Hexagon,
  Home,
  Landmark,
  Layers,
  LayoutGrid,
  Map,
  MessageCircle,
  Newspaper,
  Paintbrush,
  Palette,
  Pencil,
  PenTool,
  Popcorn,
  Presentation,
  Printer,
  Scissors,
  Ship,
  SprayCan,
  Square,
  Sun,
  Tag,
  Thermometer,
  ToyBrick,
  Triangle,
  Type,
  Zap,
} from 'lucide-react';
import React from 'react';

// ==================================
// 1. TAXONOMY DEFINITION
// ==================================

export type VisualVibe =
  | 'Professional'
  | 'Creative'
  | 'Retro'
  | 'Futuristic'
  | 'Minimalist'
  | 'Dramatic'
  | 'Playful'
  | 'Mystical'
  | 'Gritty'
  | 'Luxury'
  | 'Modern';

export type VisualFormat =
  | 'Flat'
  | '3D'
  | 'Linear'
  | 'Textured'
  | 'Photorealistic'
  | 'Abstract'
  | 'Pixel'
  | 'Handmade'
  | 'Data'
  | 'Collage'
  | 'Cinematic';

interface VisualTags {
  vibe: VisualVibe[];
  format: VisualFormat[];
}

const VIBE_OPTIONS: VisualVibe[] = [
  'Professional',
  'Creative',
  'Retro',
  'Futuristic',
  'Minimalist',
  'Dramatic',
  'Playful',
  'Mystical',
  'Gritty',
  'Luxury',
  'Modern',
];

const FORMAT_OPTIONS: VisualFormat[] = [
  'Flat',
  '3D',
  'Linear',
  'Textured',
  'Photorealistic',
  'Abstract',
  'Pixel',
  'Handmade',
  'Data',
  'Collage',
  'Cinematic',
];

// ==================================
// 2. STYLE INTERFACE
// ==================================

export interface InfographicStyle {
  id: string;
  icon: React.ReactNode;
  tags: VisualTags;
  promptModifier: string;
}

export type VisualStyle = InfographicStyle;

// ==================================
// 3. VISUAL STYLES LIBRARY (40 Styles)
// ==================================

export const VISUAL_STYLES: InfographicStyle[] = [
  // --- EXISTING 18 ---
  {
    id: 'swiss',
    icon: React.createElement(Grid, { size: 24 }),
    tags: { vibe: ['Professional', 'Minimalist'], format: ['Flat', 'Abstract'] },
    promptModifier: `
    **ART DIRECTION GUIDE: SWISS MODERNISM**
    
    *   **The Vibe:**
        Embrace the philosophy that "design is intelligence made visible." The aesthetic should feel mathematically precise, objective, and universally understood, rejecting all decorative fluff in favor of absolute clarity. It carries the weight of a trusted institution or a high-end architectural firm—confident, timeless, and perfectly ordered.
        
        The atmosphere is one of silence and focus. There is no visual noise here, only the harmonious balance of negative space and structured information. It should feel like looking at a perfectly calibrated instrument where every element exists strictly for a functional purpose, communicating a sense of calm authority and undeniable truth.

    *   **Color Palette:**
        Construct a stark, high-contrast foundation using pure **White** for the background and **Jet Black** for typography. This binary base ensures maximum legibility. Select one single, high-saturation accent color (e.g., International Orange, Electric Blue, or Helvetic Red) to highlight key data points.
        
        Use this color sparingly to guide the eye; it acts as a beacon in the monochrome landscape. Absolutely no gradients, no pastels, and no muddy tones. Colors must be solid and declarative, signaling that the information is unambiguous and bold.

    *   **Materials & Texture:**
        The surface should feel perfectly flat and pristine. There is no simulated texture, no paper grain, and no depth simulation. Think of freshly printed ink on high-quality matte cardstock or a digital screen with perfect color accuracy. The visual language is vector-based, celebrating the perfection of the line and the curve.
        
        The edges of every shape must be razor-sharp. This lack of texture removes any sense of decay or history, placing the information in an eternal "now." It suggests that the data is pure and uncorrupted by the physical world.

    *   **Lighting & FX:**
        Eliminate all lighting effects. No shadows, no glow, no ambient occlusion, and no reflections. The light source is purely conceptual; elements exist on a 2D plane. Depth is achieved solely through scale, overlap, and color value, not through simulated physics.
        
        It is a graphic universe, not a physical one. Clarity is the only metric that matters. By removing the simulation of light, you remove the distraction of atmosphere, leaving only the raw signal of the information itself.

    *   **Application Rule:**
        Render the *subject matter* using only geometric silhouettes and negative space. If the subject is "Chaos," show scattered black squares. If "Order," show aligned squares. Do not illustrate realistic objects; abstract them into their geometric essence.
        
        Typography plays a massive role—use large, tight-tracking Grotesque Sans-Serif headers (like Helvetica or Akzidenz-Grotesk) as visual elements themselves. The text blocks should align perfectly to a visible or invisible grid system, creating a rhythm of reading that feels like a musical score.
    `,
  },
  {
    id: 'sketch',
    icon: React.createElement(Pencil, { size: 24 }),
    tags: { vibe: ['Retro', 'Creative'], format: ['Handmade', 'Linear', 'Textured'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE FIELD JOURNAL**
    
    *   **The Vibe:**
        Capture the intellectual intimacy of a Renaissance polymath or a Victorian naturalist working at their desk. It feels personal, discovered, and handcrafted. It captures the moment of "figuring it out," full of curiosity and observation.
        
        The atmosphere is warm, studious, and timeless. It should look like a page torn from a genius's diary, where the thinking process is visible on the page. It values the human hand over the machine's perfection, suggesting that knowledge is a human pursuit, not a digital output.

    *   **Color Palette:**
        Use a monochromatic scheme of sepia, graphite grey, and faded ink blues. These colors evoke history and age. Occasional accents of red chalk (sanguine) can be used for emphasis or correction, but the overall tone should remain muted and warm.
        
        Avoid bright, synthetic colors that would break the illusion of an analog artifact. The colors should look like they came from the earth—ochre, charcoal, and indigo. This palette grounds the abstract ideas in the physical world of history and tradition.

    *   **Materials & Texture:**
        The background is crucial: it must be textured, off-white parchment, vellum, or a dot-grid notebook page. There should be visible imperfections—paper grain, coffee cup stains, or erased pencil marks. The ink should mimic the physical properties of graphite pencil (soft, textured edges) or a fountain pen (variable line width with slight ink pooling).
        
        It should look drawn, not rendered. These imperfections add credibility; they show that the work was created by a human mind grappling with complex ideas, inviting the viewer to share in the struggle and the discovery.

    *   **Lighting & FX:**
        The lighting is flat in terms of scene render, but use cross-hatching and stippling techniques within the sketches to create volume and form. The light source comes from the "illustrator's lamp," casting a subtle vignette on the paper itself, focusing attention on the center of the page.
        
        The lighting effect creates a cozy, localized focus on the work. It shuts out the rest of the world, inviting the viewer into the private circle of light where the study is taking place.

    *   **Application Rule:**
        Treat the subject matter as a biological or mechanical specimen being studied. Draw it with loose, sketchy lines that show the construction (guidelines, circles). Add handwritten annotations, arrows, measurements, and "correction" scribbles around the main diagram.
        
        Connect labels with looping, hand-drawn lines. It should look like a study or a prototype, not a final polished product. This unfinished quality invites the viewer to participate in the finalization of the idea, making the learning process feel active rather than passive.
    `,
  },
  {
    id: 'mid_century',
    icon: React.createElement(Layers, { size: 24 }),
    tags: { vibe: ['Retro', 'Creative'], format: ['Flat', 'Abstract', 'Collage'] },
    promptModifier: `
    **ART DIRECTION GUIDE: 1950s AVANT-GARDE**
    
    *   **The Vibe:**
        Channel the energy of 1950s graphic design—jazzy, confident, playful, but rigorously sophisticated. Think Saul Bass movie posters, Blue Note album covers, or Paul Rand logos. It combines whimsy with strong compositional principles.
        
        The atmosphere is cool and rhythmic. It feels like a piece of modern art hanging in a stylish living room. It balances "fun" shapes with "serious" composition, creating a look that is both retro and timeless. It suggests a world that is optimistic, creative, and swinging with energy.

    *   **Color Palette:**
        Employ a palette of muted, earthy, yet sophisticated tones. Mustard Yellow, Olive Green, Burnt Orange, Teal, and Slate Blue. These colors should sit against an Off-White, Cream, or Charcoal background. Colors are applied as flat, solid fields.
        
        There is a sense of "dusty" saturation—vibrant but not neon. It feels organic yet designed. The color combinations should be unexpected and slightly dissonant, creating a visual vibration that feels like a jazz chord.

    *   **Materials & Texture:**
        Adopt a "cut-paper" aesthetic. Shapes should look like they were cut from colored construction paper with scissors—slightly irregular, organic curves ("kidney shapes"), and sharp, deliberate angles. Overlay a subtle "screen print" texture or paper grain.
        
        The ink should look like it has soaked into the paper, perhaps with slight imperfections in coverage that add warmth and character. This handmade quality prevents the geometry from feeling cold or corporate; it keeps the design human and approachable.

    *   **Lighting & FX:**
        Simulate "Overprinting" or "Multiply" blending modes. Where two colored shapes overlap, the colors should mix to create a third darker color, mimicking traditional offset printing techniques. There are no 3D shadows or gradients.
        
        Depth is created purely through the layering of colored shapes. This interplay of transparency is the primary visual effect. It suggests connection and interaction between the elements without needing complex 3D rendering.

    *   **Application Rule:**
        Simplify the subject into abstract, flat shapes. Do not use outlines; let the blocks of color define the form. If drawing a person, use a circle for a head and a trapezoid for a body. Play with asymmetry and offset composition—elements should feel like they are dancing or floating in a balanced void.
        
        The layout should feel dynamic, as if captured mid-movement to a jazz beat. By abstracting the form, you focus the viewer on the *essence* of the subject rather than the details, communicating the core idea through pure shape and color.
    `,
  },
  {
    id: 'isometric',
    icon: React.createElement(Box, { size: 24 }),
    tags: { vibe: ['Professional', 'Playful'], format: ['3D', 'Data', 'Abstract'] },
    promptModifier: `
    **ART DIRECTION GUIDE: DIGITAL ENGINEERING**
    
    *   **The Vibe:**
        Evoke a sense of technical precision and organized complexity. This is a perfectly ordered miniature world where everything fits together. It feels like a high-end simulation, a city builder game, or a digital twin of reality.
        
        The atmosphere is clean, efficient, and satisfying. It communicates that the subject is a system that can be understood, managed, and optimized. It makes the complex look cute and manageable, giving the viewer a god-like perspective over the entire system.

    *   **Color Palette:**
        Use a clean, modern, and vibrant palette. A soft, bright background (light grey or pastel blue) allows the colorful objects to pop. Code the object types by color (e.g., all data units are blue, all processing units are yellow).
        
        Use consistent saturation levels to maintain harmony. The colors should feel synthetic and pure, like high-quality manufacturing materials. This distinct color coding helps the viewer parse complex systems instantly, turning the image into a readable map.

    *   **Materials & Texture:**
        Render objects as if made of matte plastic, smooth ceramic, and epoxy. Surfaces are clean, touchable, and free of grunge or dirt. There is a tactile quality to the objects—they look like high-quality toys or architectural models that you want to pick up.
        
        Avoid hyper-realism; focus on the purity of the material and the form. The smoothness suggests efficiency and lack of friction, reinforcing the idea that this is an idealized, optimized version of reality.

    *   **Lighting & FX:**
        Soft, global studio lighting (Ambient Occlusion) is essential. Shadows are soft and diffuse, grounding the objects to the floor without obscuring details. There are no harsh spotlights. The light is uniform, ensuring every face of the isometric cube is visible and distinct.
        
        This is a world without night; it is always perfectly lit for inspection. The lighting serves the purpose of clarity, ensuring that no part of the system is hidden in darkness.

    *   **Application Rule:**
        Adhere to a strict 30-degree parallel projection (Isometric). There is no vanishing point. Lines remain parallel forever. Render the subject as a physical model placed on a floating platform or tile. Connect elements with pipes, tracks, or wires that follow the grid lines (90-degree turns only).
        
        The subject becomes a machine or a facility that functions logically. This perspective eliminates distortion, allowing for accurate comparison of size and distance, appealing to the engineering mind.
    `,
  },
  {
    id: 'glassmorphism',
    icon: React.createElement(Droplets, { size: 24 }),
    tags: { vibe: ['Futuristic', 'Luxury'], format: ['3D', 'Abstract'] },
    promptModifier: `
    **ART DIRECTION GUIDE: FUTURE UI**
    
    *   **The Vibe:**
        Create an aesthetic that is ethereal, premium, and weightless. This is the user interface of the near future—clean, airy, and expensive. It feels digital yet organic, like light passing through crystal.
        
        The atmosphere is dreamy and high-tech. It suggests clarity and transparency in the subject matter. It feels frictionless and smooth, removing the weight of physical reality. It frames the content as sophisticated and cutting-edge, elevating its perceived value.

    *   **Color Palette:**
        Backgrounds are vibrant, moving mesh gradients (Deep Purple, Hot Pink, Cyan, fluid blends). These colors provide the light source. Foreground elements are white or transparent/grey.
        
        The vibrancy comes from what is *behind* the glass, not the glass itself. The contrast comes from the interplay of blurred color and crisp white text. This creates a sense of depth and richness without cluttering the foreground information.

    *   **Materials & Texture:**
        The hero material is Frosted Glass (background blur / backdrop-filter). It is translucent, diffuses light, and has a subtle grain. Combine this with translucent acrylic and glowing edges. Surfaces are smooth, glossy, and polished.
        
        The texture is light itself—how it bends and blurs as it passes through the layers. This materiality suggests that the interface is tangible but delicate, a sophisticated lens through which to view the data.

    *   **Lighting & FX:**
        This style relies entirely on light physics. Use inner shadows, rim lighting (thin white borders), and soft drop shadows to define edges and separate layers. Light must appear to pass *through* the objects, blurring the shapes behind them.
        
        The refraction and diffusion of light are the main visual interest. It mimics the optical qualities of high-end camera lenses or precious gems, adding a layer of beauty to the functional interface.

    *   **Application Rule:**
        Place the content on floating glass cards or planes. Do not put text directly on the background; encapsulate it in glass. Use a hierarchy of transparency—more important items are more opaque, while secondary items fade into the background.
        
        The subject should look like a floating hologram trapped in a pristine crystal block, protected and elevated. This containment suggests that the information is precious and carefully curated.
    `,
  },
  {
    id: 'blueprint',
    icon: React.createElement(DraftingCompass, { size: 24 }),
    tags: { vibe: ['Professional', 'Minimalist'], format: ['Linear', 'Data'] },
    promptModifier: `
    **ART DIRECTION GUIDE: ARCHITECTURAL SCHEMATIC**
    
    *   **The Vibe:**
        Convey an analytical, planned, and structural tone. This document proves that the subject has been engineered and thoroughly understood. It feels trustworthy, foundational, and rigorous.
        
        The atmosphere is one of the workshop or the engineering desk. It is the "plan" before the "build." It suggests that nothing here is accidental; everything has been measured and calculated. It invites the viewer to inspect the structural integrity of the idea.

    *   **Color Palette:**
        Use a Deep Prussian Blue or CAD Dark Grey for the background. This provides high contrast for the lines. The lines themselves are White (primary) and Cyan or Yellow (secondary/highlight).
        
        Use semi-transparent blue fills to indicate solidity, but keep the overall feel linear. The palette is utilitarian and functional, designed for readability in low light. It creates a serious, professional mood associated with industry and construction.

    *   **Materials & Texture:**
        The background should have a subtle grid pattern, graph paper texture, or construction lines. It should look like a digital CAD file or a physical cyanotype print. The lines are precise vector strokes (monoline).
        
        They do not vary in width like a sketch; they are uniform and mathematical. The texture is the precision of the grid itself, implying a world governed by rules and measurements.

    *   **Lighting & FX:**
        None. This is a flat schematic document. There is no light source, only data. However, you can use a subtle "glow" on the white lines to make them pop against the dark background, simulating a digital screen blueprint.
        
        The focus is on the geometry, not the atmosphere. The lack of lighting tricks emphasizes the honesty of the design; nothing is hidden by shadows or exaggerated by highlights.

    *   **Application Rule:**
        Render the subject as an x-ray or wireframe schematic. Show the *insides* and the hidden structure. Use dashed lines for hidden edges and solid lines for visible edges. Decorate the negative space with measurement arrows, dimension lines, grid coordinates, and technical callout markers (A, B, C).
        
        It should look ready to be sent to a factory for production. This treatment tells the viewer that you are showing them the "source code" or the internal mechanism of the concept.
    `,
  },
  {
    id: 'papercut',
    icon: React.createElement(Scissors, { size: 24 }),
    tags: { vibe: ['Creative', 'Playful'], format: ['3D', 'Handmade', 'Collage'] },
    promptModifier: `
    **ART DIRECTION GUIDE: LAYERED PAPER CRAFT**
    
    *   **The Vibe:**
        Evoke a sense of tactile warmth and handmade charm. It feels approachable, creative, and safe, like a high-end children's book illustration or an art project come to life.
        
        The atmosphere is intimate and physical. It breaks the screen's flatness by simulating physical depth. It feels like you could reach in and touch the layers, sensing the thickness of the paper. It lowers the barrier to entry for complex topics by presenting them in a friendly, "toy-like" format.

    *   **Color Palette:**
        Use a playful, saturated, and varied palette. Think of the colors found in a pack of high-quality construction paper or cardstock. Avoid gradients. Use flat colors for each layer.
        
        The variation comes from the shadows, not the ink itself. The colors should be distinct enough to separate the layers visually, creating a vibrant landscape that feels cheerful and energetic.

    *   **Materials & Texture:**
        The material is thick, matte colored paper. There should be a slight visible grain or fiber texture on the surfaces to sell the illusion. Edges should look physically cut—sharp and precise, perhaps with a tiny bit of white fraying at the corners to show it's paper.
        
        It should look crisp but not digital. This materiality adds a sense of craft and effort, implying that the information has been carefully assembled by hand.

    *   **Lighting & FX:**
        This is the most critical element. Use harsh, direct top-down lighting to create deep, sharp drop shadows between the layers. The depth determines the hierarchy. The top layers cast shadows on the layers below them.
        
        This parallax effect creates the 3D illusion. The shadows define the space, separating the foreground from the background and giving the image a sense of volume and physical presence.

    *   **Application Rule:**
        Do not draw lines. Create shapes by "cutting" them out of paper layers. Stack the layers to create the image. The subject is a physical diorama. Use negative space by cutting holes in the top layers to reveal colors underneath.
        
        Build the image up from back to front, like a stage set. This construction method forces simplicity and bold shapes, stripping away unnecessary detail to focus on the core form.
    `,
  },
  {
    id: 'cyberpunk',
    icon: React.createElement(Cpu, { size: 24 }),
    tags: { vibe: ['Futuristic', 'Gritty', 'Dramatic'], format: ['Linear', 'Data'] },
    promptModifier: `
    **ART DIRECTION GUIDE: DYSTOPIAN DATASCAPE**
    
    *   **The Vibe:**
        Create a high-tech, urgent, and gritty atmosphere. It feels military-grade or hacker-made. It is the view from a Terminator's eye or a decker's terminal in a rain-slicked city.
        
        The atmosphere is intense and overwhelming. Information overload is part of the aesthetic. It feels fast, dangerous, and electric, suggesting that data is the most valuable currency. It commands attention through sensory saturation and a sense of high stakes.

    *   **Color Palette:**
        Use a Pure Black background to represent the void. The foregrounds are Neon: Acid Green, Laser Red, Electric Blue, and Hot Pink. These colors should pierce the darkness.
        
        There are no pastels or earth tones here. Only light. The colors act as warning signals and data streams in the dark, creating a high-contrast environment that is optimized for readability in low-light conditions.

    *   **Materials & Texture:**
        The material is digital luminescence. There are no physical materials, only projections of light and data. The "texture" comes from the grid of the screen—scanlines, pixels, and refresh rates.
        
        It is an immaterial world made of pure energy and code. This lack of physical matter suggests speed and fluidity, a reality that can be rewritten in an instant.

    *   **Lighting & FX:**
        Use heavy "Bloom" and "Glow" effects on the lines to simulate CRT phosphor or laser projection. Add digital artifacts: Scanlines, chromatic aberration (RGB split), digital noise, glitch distortion, and dead pixels to make it feel like a live, slightly unstable feed.
        
        The imperfections make it feel real and analog-digital. It suggests that the system is pushing its limits, adding a layer of narrative tension to the image.

    *   **Application Rule:**
        Render the subject as a holographic projection or a tactical Heads-Up Display (HUD). Encircle elements with targeting reticles, brackets, and crosshairs. Use meaningless hexadecimal codes, barcodes, scrolling data streams, and warning labels as decoration to fill the void.
        
        The subject is being analyzed by a machine. This framing objectifies the subject, breaking it down into data points and schematics for rapid consumption.
    `,
  },
  {
    id: 'risograph',
    icon: React.createElement(Printer, { size: 24 }),
    tags: { vibe: ['Retro', 'Creative', 'Gritty'], format: ['Textured', 'Handmade'] },
    promptModifier: `
    **ART DIRECTION GUIDE: INDIE PRINT SHOP**
    
    *   **The Vibe:**
        Capture the lo-fi, artistic, and imperfect soul of independent publishing. It feels like a DIY zine printed in a garage—full of character, mistakes, and human touch.
        
        The atmosphere is creative and rebellious. It rejects digital perfection in favor of texture and noise. It feels authentic and retro-modern, celebrating the process of making. It connects with the viewer on a grassroots level, feeling less like "corporate communication" and more like "art."

    *   **Color Palette:**
        Use a limited set of specific ink spots: Fluorescent Pink, Hunter Green, Bright Yellow, Cornflower Blue. Crucially, colors act like transparent ink. Where they overlap, they mix to create a third color (e.g., Pink + Blue = Purple).
        
        This "overprinting" look is the signature of the style. The colors are incredibly vibrant and specific to the Riso ink drum, creating a unique aesthetic that is both nostalgic and modern.

    *   **Materials & Texture:**
        Heavy dither grain and noise are essential. Nothing is a solid block of color; everything is a dot pattern or stipple shading. The paper background should look cheap, off-white, and absorbent (like newsprint or recycled paper).
        
        The ink sits *in* the paper, not on it, creating a matte, soaked-in feel. This texture adds grit and reality to the image, grounding the vibrant colors in a physical medium.

    *   **Lighting & FX:**
        Simulate "Misregistration"—the color layers should not line up perfectly. Create slight gaps of white or dark overlaps at the edges of shapes. This imperfection makes the image vibrate visually.
        
        It looks like a hurried print job that turned into art. The lighting is flat, but the texture creates visual vibration. These "mistakes" are the charm, signaling that the work is human and unique.

    *   **Application Rule:**
        Treat the subject as a high-contrast photocopy. Use bold shapes and grainy gradients. Shadows are halftone dots. The aesthetic relies on the collision of bold, unnatural colors.
        
        Do not try to be realistic; be graphic and bold. Use color to define shadow and light, creating a posterized effect. The image should look like it was mass-produced on a tight budget but with high artistic intent.
    `,
  },
  {
    id: 'editorial',
    icon: React.createElement(Diamond, { size: 24 }),
    tags: { vibe: ['Luxury', 'Minimalist', 'Professional'], format: ['Photorealistic', 'Flat'] },
    promptModifier: `
    **ART DIRECTION GUIDE: LUXURY MAGAZINE**
    
    *   **The Vibe:**
        Project an image of wealth, intelligence, and quiet authority. It whispers rather than shouts. It feels curated, spacious, and expensive—like a spread in Vogue, Monocle, or Architectural Digest.
        
        The atmosphere is calm and confident. It respects the viewer's intelligence and taste. It treats the information as a work of art, deserving of space and attention. It implies that the content is exclusive and high-value.

    *   **Color Palette:**
        Restrained and elegant. Black and White are dominant. Use soft Creams, Beiges, or Greys as neutrals. Introduce a single deep accent color (Burgundy, Navy, Forest Green) for emphasis.
        
        Avoid bright primaries or neons. The colors should feel mature, sophisticated, and tailored. This restraint creates a sense of focus and calm, allowing the typography and photography to take center stage.

    *   **Materials & Texture:**
        Combine the look of smooth, high-gloss fashion photography with the texture of heavy, matte paper stock. There is a tactile quality to the "page." It feels substantial and deliberate.
        
        The images look like they were captured by a master photographer, and the text looks like it was set by a master typographer. The quality of the materials (even simulated) implies the quality of the content.

    *   **Lighting & FX:**
        Use natural, soft window light or high-end studio photography lighting. No harsh effects, no digital glows. The lighting should be flattering and realistic, highlighting the form and texture of the subject matter.
        
        It should look like a photoshoot, not a render. The lighting creates a sense of realism and intimacy, bringing the subject closer to the viewer.

    *   **Application Rule:**
        Extreme use of Macro Whitespace. Do not fill the canvas; let the subject breathe. Treat the subject as an art object in a gallery—isolated and perfectly framed. Use razor-thin lines (hairlines) for diagrams.
        
        Typography is the hero: pair High-contrast Serif headers (Didot/Bodoni) with tiny, geometric Sans-Serif captions. The text is not just for reading; it is a compositional element that balances the image.
    `,
  },
  {
    id: 'comic',
    icon: React.createElement(MessageCircle, { size: 24 }),
    tags: { vibe: ['Retro', 'Playful', 'Dramatic'], format: ['Handmade', 'Linear'] },
    promptModifier: `
    **ART DIRECTION GUIDE: POP ART COMIC**
    
    *   **The Vibe:**
        Channel the energy of the Silver Age of Comics (1960s). It is energetic, punchy, and nostalgic. Roy Lichtenstein meets Jack Kirby. It feels dramatic, loud, and narrative.
        
        The atmosphere is one of action and conflict. Every frame tells a story. It grabs the viewer by the collar and demands attention through boldness and exaggeration. It turns dry information into an epic struggle or a dynamic event.

    *   **Color Palette:**
        Use the limited CMYK palette of vintage printing: Cyan, Magenta, Yellow, and Black. Colors are flat and unblended. They collide with each other to create vibration. Use secondary colors (Green, Orange, Purple) sparingly and boldly.
        
        The colors should look like they came from a cheap printing press but were applied with artistic intent. This limited palette creates a cohesive, instantly recognizable look that evokes childhood excitement.

    *   **Materials & Texture:**
        Simulate cheap newsprint paper texture that has yellowed slightly with age. Use visible "Ben-Day" dots (halftone patterns) for shading and skin tones.
        
        This mechanical shading texture is the hallmark of the style. It creates the illusion of color mixing while keeping the printing costs low (historically). It adds a layer of texture that breaks up the flat colors and adds visual interest.

    *   **Lighting & FX:**
        High contrast ink shadows (Noir style). The lighting is dramatic and exaggerated to show form. There are no soft gradients, only hard edges of black ink.
        
        The shadows define the volume and the drama of the scene. They create a sense of depth and intensity, making the figures pop off the page.

    *   **Application Rule:**
        Line work is king: Bold, heavy black ink outlines with variable width. The ink should look wet and brushed. Render the subject inside panels or breaking out of them. Use dynamic action lines ("speed lines") and starbursts to emphasize impact.
        
        Text should be in speech bubbles or yellow narration boxes with hand-lettered fonts. The subject becomes a character in a story, acting out the concept rather than just representing it.
    `,
  },
  {
    id: 'botanical',
    icon: React.createElement(Flower, { size: 24 }),
    tags: { vibe: ['Retro', 'Creative'], format: ['Handmade', 'Linear', 'Textured'] },
    promptModifier: `
    **ART DIRECTION GUIDE: VINTAGE NATURALIST**
    
    *   **The Vibe:**
        Evoke the spirit of 19th-century scientific exploration. It is academic, organic, timeless, and incredibly detailed. It feels calm, studied, and precious—like a plate from Darwin's sketchbook.
        
        The atmosphere is one of quiet observation. It invites the viewer to lean in and study the fine details. It respects the complexity of nature and biology, presenting information with a sense of wonder and reverence.

    *   **Color Palette:**
        Desaturated, earthy tones. Sage Green, Terracotta, Ochre, Slate Blue, Faded Rose. The colors should look like watercolors that have faded slightly over time.
        
        They are natural and harmonious, never jarring. They reflect the colors found in a garden or a forest floor. This palette creates a soothing, natural feel that contrasts with the urgency of digital screens.

    *   **Materials & Texture:**
        The background is aged, tea-stained parchment or heavy watercolor paper. It has history. The medium is fine ink liner (black) and watercolor wash.
        
        The ink provides the structure, and the paint provides the life. The texture of the paper should be visible through the paint, grounding the image in a physical reality.

    *   **Lighting & FX:**
        Natural, flat illustration lighting. No dramatic shadows. The goal is clarity of form, not drama. The light is soft and diffuse, like a cloudy day in a greenhouse.
        
        It is designed to show every vein on a leaf and every petal on a flower without obstruction. The lighting serves the scientific purpose of accurate representation.

    *   **Application Rule:**
        Treat the subject (even if it's a machine, a code block, or a concept) as a biological specimen. Use organic cross-hatching for texture. Label parts with delicate calligraphic lines and serif text.
        
        Show "life cycles" or "dissections." Draw the subject with the reverence a botanist has for a rare flower, highlighting its organic complexity and the interdependence of its parts.
    `,
  },
  {
    id: 'collage',
    icon: React.createElement(Copyleft, { size: 24 }),
    tags: {
      vibe: ['Gritty', 'Creative', 'Dramatic'],
      format: ['Collage', 'Textured', 'Photorealistic'],
    },
    promptModifier: `
    **ART DIRECTION GUIDE: MIXED MEDIA PUNK**
    
    *   **The Vibe:**
        Unleash a rebellious, raw, and handmade aesthetic. It feels chaotic but curated, like a punk rock concert poster, a Dadaist artwork, or a mood board in a fashion studio.
        
        The atmosphere is energetic and subversive. It breaks the rules of traditional composition. It feels like it was made with hands, scissors, and glue, not a computer. It has an aggressive, immediate quality that demands a reaction.

    *   **Color Palette:**
        High contrast Black and White photography mixed with splashes of bright paint or tape (Yellow, Red, Neon Green). The contrast between the grayscale photos and the saturated accents creates the visual tension.
        
        It combines the realism of the photo with the energy of the paint. This clash of color modes creates a dynamic, vibrating effect that keeps the eye moving.

    *   **Materials & Texture:**
        The "analogue" feel is key. Use halftone patterns, ripped paper edges, masking tape strips, coffee stains, staples, and photocopy noise. The texture should be gritty and tactile.
        
        You should feel the layers of paper piling up. It should look like it was pulled off a street wall, weathered and worn. This texture implies history and usage.

    *   **Lighting & FX:**
        Use hard shadows under the paper scraps to show layering depth. It should look like a physical object photographed from above. There is no unified lighting scheme; each element brings its own lighting from its original source, adding to the collage feel.
        
        The lighting comes from the "scanner" or the room it was photographed in. This inconsistency is part of the aesthetic, creating a disjointed but compelling reality.

    *   **Application Rule:**
        "Construct" the subject from disparate cutout elements. Do not draw it; assemble it. Combine a photo of a hand with a drawing of a gear. Juxtapose unrelated textures.
        
        Use "ransom note" typography (letters cut from different sources) or typewriter text to label elements. The rougher the better; perfection is the enemy here. The aesthetic relies on the shock of combining things that don't belong together.
    `,
  },
  {
    id: 'pixel_art',
    icon: React.createElement(Gamepad2, { size: 24 }),
    tags: { vibe: ['Retro', 'Playful'], format: ['Pixel'] },
    promptModifier: `
    **ART DIRECTION GUIDE: 16-BIT ERA**
    
    *   **The Vibe:**
        Tap into the nostalgia of the golden age of gaming. It is digital, blocky, precise, and charming. It feels like a Super Nintendo game or a retro indie title.
        
        The atmosphere is fun and gamified. It simplifies the world into a grid, making it feel manageable and orderly. It triggers a sense of play and reward in the viewer, associating the learning process with the joy of gaming.

    *   **Color Palette:**
        Use a strictly limited palette (e.g., 16 or 32 colors). These colors should be saturated and distinct. The limitation is the style. Use specific shading ramps (Light Green, Mid Green, Dark Green) to create form within the limits.
        
        The colors should feel vibrant and electric, like a CRT monitor. This restriction forces creativity and clarity, ensuring that every pixel counts.

    *   **Materials & Texture:**
        Pure pixels. No blur, no anti-aliasing, no vectors. Every edge is a sharp step. The texture is the pixel grid itself. It defines the resolution of the world.
        
        It enforces a strict digital logic where everything must fit into a square. This discrete nature makes the information feel quantifiable and exact.

    *   **Lighting & FX:**
        Shading is achieved through "Dithering" (checkerboard patterns of pixels) rather than smooth gradients. Light is stylized and dramatic, often coming from the top-left (standard sprite lighting).
        
        It gives volume to the small sprites without breaking the grid. The lighting is functional, designed to make the sprites readable against the background.

    *   **Application Rule:**
        Visible Pixel Grid. Render the subject as a video game "Sprite" or an inventory item. Simplify complex curves into blocky steps. Backgrounds should be tiling patterns or simple gradients.
        
        Text must be pixelated bitmap fonts. The resolution is low, but the readability is high. The subject becomes a digital artifact, an icon of itself.
    `,
  },
  {
    id: 'watercolor',
    icon: React.createElement(Palette, { size: 24 }),
    tags: { vibe: ['Creative', 'Mystical'], format: ['Handmade', 'Textured'] },
    promptModifier: `
    **ART DIRECTION GUIDE: FLUID IMPRESSIONISM**
    
    *   **The Vibe:**
        Create a calm, flowing, and dreamy atmosphere. It feels emotional and human, emphasizing mood and feeling over rigid precision. It is the visual equivalent of a gentle melody.
        
        The atmosphere is serene and meditative. It softens the hard edges of information, making it easier to absorb and less intimidating. It invites the viewer to relax and feel the information rather than analyze it rigorously.

    *   **Color Palette:**
        Use pastels, washes, and translucent hues. Colors should look diluted with water—soft pinks, sky blues, pale greens. Avoid black. Use dark blue or purple for shadows.
        
        The colors should feel light and airy, blending into one another seamlessly. This lack of harsh contrast creates a soothing visual experience that is easy on the eyes.

    *   **Materials & Texture:**
        Cold-press watercolor paper texture is essential—rough, bumpy, and organic. Show visible brush strokes and the "coffee ring" edges where the water pooled and dried.
        
        The medium's unpredictability is its beauty. It feels handmade and one-of-a-kind. The texture captures the interaction between the liquid paint and the physical paper.

    *   **Lighting & FX:**
        Technique is "Wet-on-wet." Colors bleed into each other organically. Edges are soft and irregular ("water stains"). Light comes from the paper itself (negative space).
        
        The white of the paper is the highlight. It feels like the light is shining through the paint. The lighting is ambient and glowing, lacking harsh directionality.

    *   **Application Rule:**
        Focus on the *mood* of the subject. Use pools of color to define shapes rather than hard outlines. Leave whitespace ("negative painting") to define highlights. Do not overwork the image; it should feel like a sketch captured in a few confident strokes.
        
        The image should feel like it is still drying on the page. This ephemeral quality makes the subject feel precious and fleeting.
    `,
  },
  {
    id: 'low_poly',
    icon: React.createElement(Hexagon, { size: 24 }),
    tags: { vibe: ['Futuristic', 'Minimalist'], format: ['3D', 'Abstract'] },
    promptModifier: `
    **ART DIRECTION GUIDE: POLYGONAL MINIMALISM**
    
    *   **The Vibe:**
        Embrace the aesthetic of digital origami. It is faceted, crisp, and abstracted. It feels efficient, modern, and stylized—like early 90s CGI or modern indie vector art.
        
        The atmosphere is clean and synthetic. It reduces complex reality to its mathematical essence, stripping away the noise of texture and curve. It represents the world as a mesh of data points.

    *   **Color Palette:**
        Use vibrant, saturated, matte colors. Because there are no textures, color carries all the information. Each facet of an object has a slightly different shade of the base color depending on the light, creating a mosaic effect.
        
        The colors should look like colored paper or plastic. This clear coloration helps distinguish the planes of the object, defining its volume.

    *   **Materials & Texture:**
        Paper or matte plastic. No smooth curves; everything is made of triangles and sharp edges. The material looks rigid and folded. There are no organic imperfections, only geometric perfection.
        
        It feels lightweight and hollow, like a digital shell. The "texture" is the geometry itself—the visible edges of the polygons.

    *   **Lighting & FX:**
        Flat shading (no smoothing groups). Each polygon reflects light evenly, creating a "jewel-like" appearance. The lighting should be directional to emphasize the angles of the polygons.
        
        Contrast between lit and shadowed faces is key. The shadows are sharp and angular. The lighting reveals the topology of the mesh, turning the shape into a study of light and plane.

    *   **Application Rule:**
        Reduce the subject to its geometric essence using the lowest number of polygons possible. It should look like a papercraft model. The beauty comes from the mesh topology—how the triangles flow to define the shape.
        
        Do not hide the edges; celebrate the geometry. The subject is a digital sculpture, proving that complexity can be built from simple units.
    `,
  },
  {
    id: 'art_deco',
    icon: React.createElement(Landmark, { size: 24 }),
    tags: { vibe: ['Luxury', 'Retro', 'Dramatic'], format: ['Flat', 'Abstract'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE ROARING 20s**
    
    *   **The Vibe:**
        Summon the opulence of the 1920s. It is symmetrical, vertical, and imposing. It feels industrial yet jewelry-like. Think of the Chrysler Building, The Great Gatsby, or a luxury perfume bottle.
        
        The atmosphere is grand and aspirational. It elevates the subject matter to a status of power and elegance. It commands respect through beauty and order, suggesting timeless value and high status.

    *   **Color Palette:**
        Rich, deep backgrounds (Emerald Green, Midnight Blue, Jet Black) provide the canvas. The foreground is dominated by Metallic Gold, Silver, or Copper.
        
        The contrast between the matte dark background and the shining metal is the core aesthetic. It looks expensive and rare. It implies that the information is gold—valuable and durable.

    *   **Materials & Texture:**
        Gold foil stamping, polished brass, black marble, velvet. Every surface should feel expensive and crafted. Use grain to simulate high-quality cardstock background.
        
        The materials imply durability and value. It should look like a monument built to last, not a disposable flyer.

    *   **Lighting & FX:**
        High specular highlights on the metallic elements to make them shine and sparkle. The lighting is dramatic, emphasizing the metallic glint against the shadows.
        
        It should look like it is being lit by spotlights at a premiere. The light catches the gold edges, creating a sense of movement and shimmer in a static image.

    *   **Application Rule:**
        Frame the subject in gold geometry. Use rigorous symmetry. Patterns should include sunbursts, fans, zig-zags, and stepped geometry. The subject should look like a golden statue or a monument.
        
        Use borders and frames extensively. Typography should be geometric sans-serif or high-waisted serif. The framing acts as a pedestal, presenting the subject as a work of art.
    `,
  },
  {
    id: 'claymorphism',
    icon: React.createElement(Circle, { size: 24 }),
    tags: { vibe: ['Playful', 'Creative'], format: ['3D', 'Handmade'] },
    promptModifier: `
    **ART DIRECTION GUIDE: PLAYFUL PLASTICINE**
    
    *   **The Vibe:**
        Create a world that is friendly, soft, and childishly tactile. It feels safe, approachable, and fun. Like a stop-motion movie or a high-quality toy.
        
        The atmosphere is innocent and welcoming. It disarms the viewer and makes complex topics feel simple and manageable. It appeals to the inner child and the sense of play, removing the fear of failure or difficulty.

    *   **Color Palette:**
        Use bright, pastel, pleasing colors. High brightness, low saturation. Think mint green, baby blue, soft pink, and sunny yellow. The colors should look edible, like candy or frosting.
        
        Avoid dark, muddy, or aggressive colors entirely. The palette should feel like a sunny day, promoting optimism and joy.

    *   **Materials & Texture:**
        Matte modeling clay or playdough. Slight imperfections (fingerprints, uneven surface) make it feel real and handmade. It should not look like shiny plastic; it should look like soft, squishy clay.
        
        It invites the viewer to reach out and squish it. This tactile quality grounds the digital image in a familiar, physical sensation.

    *   **Lighting & FX:**
        Soft, bright, diffuse global illumination. Shadows are pillowy and soft (Ambient Occlusion). No hard edges anywhere. The lighting is cheerful and sunny.
        
        Use "Subsurface Scattering" to make the clay look slightly translucent and soft, rather than hard and rock-like. This lighting makes the objects look dense but yielding.

    *   **Application Rule:**
        Round every corner. Inflate every shape. The subject should look like a balloon or a ball of clay. Use exaggerated proportions (big heads, small bodies) if depicting characters.
        
        The aesthetic is chunky and cute. Even a dangerous concept like a "virus" should look like a cute, squishy blob. This abstraction removes the threat and allows for safe examination.
    `,
  },

  // --- NEW 22 ---
  {
    id: 'corporate_vector',
    icon: React.createElement(Briefcase, { size: 24 }),
    tags: { vibe: ['Professional', 'Playful'], format: ['Flat'] },
    promptModifier: `
    **ART DIRECTION GUIDE: FRIENDLY BIG TECH**

    *   **The Vibe:**
        Project an atmosphere of optimism, simplicity, and collaboration. The aesthetic is clean, friendly, and approachable, embodying the modern tech startup (think Stripe, Notion, or Asana). It feels efficient but human, suggesting that complex problems can be solved with elegant, user-friendly tools.
        
        The world is a utopia of productivity and teamwork. It's a space where diverse teams work harmoniously in bright, clean offices. This style communicates trust, ease-of-use, and a forward-thinking mindset, making technology feel like a helpful partner rather than a cold machine.

    *   **Color Palette:**
        Utilize a bright, accessible color palette built on a primary brand color (e.g., a specific blue or purple) and a set of vibrant secondary accent colors (like soft oranges, teals, and pinks). Backgrounds are typically pure white or very light grey to maximize clean space. Subtle gradients are used to add a touch of depth to flat shapes.
        
        The colors are optimistic and energetic without being overwhelming. They are designed to be pleasing and to create a clear visual hierarchy. This palette feels modern, digital, and professional, perfectly suited for a software or service company.

    *   **Materials & Texture:**
        The style is strictly vector-based and textureless. All surfaces are perfectly smooth and clean, representing an idealized digital environment. There is no grain, no paper, and no grunge; the world is pristine and frictionless.
        
        The lack of texture reinforces the concepts of efficiency and simplicity. It suggests a world where there are no unnecessary complications, just clean lines and clear actions. The materiality is that of a perfectly rendered user interface element.

    *   **Lighting & FX:**
        Lighting is minimal and conceptual. Use soft, subtle gradients within shapes to suggest a gentle, ambient light source and give a hint of dimensionality. Very soft, almost imperceptible drop shadows can be used to lift elements off the page, creating a clean layering effect.
        
        Avoid any realistic lighting, harsh shadows, or glows. The goal is to maintain a flat, graphic feel while creating a clear sense of order and depth. The light exists only to serve the clarity of the composition, not to create drama.

            *   **Application Rule:**
        Represent people and concepts with abstracted, geometric characters. These characters should be inclusive and diverse, often with unnatural skin tones (like blue or purple) to be universally relatable. They have simple shapes, long limbs, and are often shown collaborating around giant UI elements or abstract data visualizations.
        
        The subject matter is translated into simple, iconic representations. A "task" might be a checkmark in a box, a "message" a paper plane. This visual language simplifies complex processes into friendly, understandable icons, making the abstract feel concrete and manageable.
    `,
  },
  {
    id: 'chalkboard',
    icon: React.createElement(GraduationCap, { size: 24 }),
    tags: { vibe: ['Retro', 'Professional'], format: ['Handmade', 'Textured'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE LECTURE HALL**

    *   **The Vibe:**
        Evoke the feeling of a university lecture hall or a secret brainstorming session in a professor's office. The aesthetic is academic, foundational, and slightly dusty. It communicates that the knowledge being shared is fundamental, time-tested, and being worked out "live" in front of you.
        
        The atmosphere is one of focused learning and intellectual rigor. It feels like you're getting a privileged look at the raw process of teaching and discovery. The imperfections of the medium—smudges, imperfect lines—add a sense of authenticity and human effort.

    *   **Color Palette:**
        The background is a deep, matte black or a slightly faded green, representing the chalkboard. The primary "ink" is a dusty, imperfect white. Use a few classic chalk colors like pale yellow, soft blue, and light red for accents, diagrams, and emphasis.
        
        The colors should look like actual chalk pigments, not vibrant digital colors. The limited and slightly muted palette creates a serious, academic mood and ensures high readability against the dark background.

    *   **Materials & Texture:**
        Texture is paramount. The background must have a subtle slate texture with faint traces of erased chalk dust ("ghosting"). The lines and text should not be solid; they must have a grainy, dusty texture, as if drawn with a physical piece of chalk.
        
        The lines should have variable opacity and thickness, just like real chalk strokes. This tactile quality is what sells the illusion and makes the information feel grounded and handmade, not slick and digital.

    *   **Lighting & FX:**
        The lighting is flat and non-directional, as if in a well-lit classroom. There are no shadows cast by the elements themselves. The only "effect" is the texture of the chalk and the smudges on the board, which create a sense of depth and history.
        
        This simple lighting scheme keeps the focus squarely on the information being presented. The lack of dramatic effects reinforces the no-nonsense, academic nature of the style.

    *   **Application Rule:**
        All typography must look handwritten, in a clear but not overly ornate cursive or print script. Use hand-drawn boxes, arrows, and diagrams to connect ideas. The layout should feel slightly improvised, as if a professor were adding to it during a lecture.
        
        Embrace "mistakes." A word might be crossed out and rewritten, or an arrow might be slightly crooked. This makes the infographic feel like a live, dynamic thinking process, inviting the viewer to follow along with the logic as it unfolds.
    `,
  },
  {
    id: 'brutalism',
    icon: React.createElement(Code, { size: 24 }),
    tags: { vibe: ['Minimalist', 'Gritty'], format: ['Flat'] },
    promptModifier: `
    **ART DIRECTION GUIDE: RAW DIGITALISM**

    *   **The Vibe:**
        Project an aesthetic of raw, unadorned honesty and function-over-form. This is a rejection of friendly, polished corporate design. It feels like a system tool, an underground art zine, or a '90s website made by a developer who hates CSS. It is confident, unapologetic, and brutally efficient.
        
        The atmosphere is stark and confrontational. It doesn't try to be pretty; it tries to be clear. This rawness communicates a sense of authenticity and transparency, suggesting that the content is so strong it doesn't need a fancy wrapper. It appeals to a desire for authenticity in a world of over-designed interfaces.

    *   **Color Palette:**
        The palette is extremely limited and high-contrast. Often it's just pure black (#000000) text on a pure white (#FFFFFF) background, or vice-versa. If color is used, it's a single, harsh, system-level accent color like electric blue or neon green, used for links or highlights.
        
        There are no soft tones, gradients, or friendly pastels. The color choices are utilitarian and often jarring, designed for maximum impact and readability, not for comfort. This creates a visually aggressive and memorable experience.

    *   **Materials & Texture:**
        There are no materials or textures. This is the antithesis of skeuomorphism and texture. The world is made of pure, unstyled HTML elements. The "texture" is the anti-aliasing of the system font itself.
        
        The aesthetic celebrates its digital nature without trying to mimic any physical object. The surface is the harsh, flat plane of the screen itself. This lack of artifice is the core of its appeal.

    *   **Lighting & FX:**
        There is no lighting, and there are no effects. No drop shadows, no glows, no blurs. Edges are razor-sharp. Rectangles are perfect rectangles with 90-degree corners and harsh, 1px solid borders.
        
        The only "effect" might be an old-school animated GIF or a monospace text cursor. This deliberate lack of polish is a stylistic choice that communicates a focus on raw information and a rejection of decorative trends.

    *   **Application Rule:**
        Use default system fonts like Times New Roman, Arial, or a monospace font (like Courier). Layouts are often based on simple tables or stark grids, with elements colliding or having unconventional spacing. The hierarchy is established through font size and weight alone.
        
        Images, if used, are often unedited, poorly compressed, or displayed at their raw size. The overall feeling is that the content was "dumped" onto the page with minimal styling, forcing the viewer to engage with the information in its most naked form.
    `,
  },
  {
    id: 'acid_graphics',
    icon: React.createElement(Club, { size: 24 }),
    tags: { vibe: ['Futuristic', 'Creative'], format: ['3D', 'Abstract'] },
    promptModifier: `
    **ART DIRECTION GUIDE: Y2K CYBER-FUTURISM**

    *   **The Vibe:**
        Evoke the futuristic optimism and digital psychedelia of the late 90s and early 2000s. The aesthetic is fluid, experimental, and hyper-digital. Think of old Winamp skins, rave flyers, or the visual language of early electronic music. It's a vision of the future that is both nostalgic and forward-looking.
        
        The atmosphere is electric, trippy, and in constant motion. It feels like data is melting, flowing, and reforming. This style communicates a sense of innovation, rebellion against minimalism, and a playful exploration of what digital tools can create.

    *   **Color Palette:**
        The palette is a mix of iridescent gradients, metallic silvers, and one or two high-saturation accent colors like lime green or hot pink. The defining feature is iridescence—colors that shift and change across a surface, like an oil slick or a soap bubble.
        
        Backgrounds are often dark to make the metallic and neon elements pop. The colors are synthetic and otherworldly, suggesting a reality that exists only on a screen.

    *   **Materials & Texture:**
        The primary materials are liquid chrome, translucent plastic, and iridescent gels. Surfaces are impossibly smooth, glossy, and reflective. Shapes often look like they are made of mercury or blown glass.
        
        There is no natural texture; it's a celebration of the artificial and the computer-generated. The materiality feels futuristic and intangible, as if you could pass your hand right through it.

    *   **Lighting & FX:**
        Lighting is a key element. Use sharp, high-contrast specular highlights to define the chrome shapes. Add a strong "bloom" or "glow" effect to luminous elements. Lens flares and chromatic aberration are used to enhance the digital, screen-based feel.
        
        The lighting should look artificial and dramatic, as if coming from neon signs or computer monitors in a dark room. It creates a sense of depth and excitement, making the image feel dynamic and alive.

    *   **Application Rule:**
        Typography is treated as a liquid. Letters are stretched, warped, and melted. Use bold, experimental, and often hard-to-read display fonts. Shapes are organic and blob-like ("globular").
        
        Incorporate abstract cybernetic elements like grids, wireframes, and sci-fi interface components. The layout is often chaotic and dense, overlapping elements to create a sense of deep, complex digital space. The goal is to create a visually rich and stimulating experience, even at the cost of immediate readability.
    `,
  },
  {
    id: 'celestial_tarot',
    icon: React.createElement(Fingerprint, { size: 24 }),
    tags: { vibe: ['Mystical', 'Luxury'], format: ['Linear', 'Abstract'] },
    promptModifier: `
    **ART DIRECTION GUIDE: ESOTERIC ALCHEMY**

    *   **The Vibe:**
        Create an atmosphere of mystery, ancient wisdom, and cosmic significance. The aesthetic should feel like a page from a secret alchemical text or a custom-designed tarot card. It is elegant, spiritual, and imbued with hidden meaning.
        
        The tone is reverent and profound. It suggests that the information being presented is not just data, but a piece of timeless wisdom. It invites the viewer into a world of symbolism and archetypes, making the concept feel important and sacred.

    *   **Color Palette:**
        The palette is simple and high-contrast. Use a deep, matte background of Midnight Blue, Royal Purple, or Jet Black. The foreground elements are almost exclusively rendered in a shimmering Metallic Gold. A secondary accent of Silver or White can be used for minor details.
        
        This stark contrast makes the golden lines appear to glow from within the darkness. The color scheme communicates value, magic, and cosmic importance.

    *   **Materials & Texture:**
        The background should have the texture of heavy, uncoated cardstock or ancient paper. The primary material is the line itself, which should look like it was printed with gold foil or drawn with metallic ink.
        
        The lines should have a subtle glint and texture, suggesting a physical, valuable object. The interplay between the rough, matte paper and the smooth, shining gold creates a rich tactile experience.

    *   **Lighting & FX:**
        The light source is the gold itself. The lines should have a subtle inner glow or a metallic sheen that makes them pop. The background is dark and absorbs light, creating a sense of infinite, cosmic space.
        
        The effect is one of luminescence in the void. There are no traditional shadows; depth is created by the layering and intricacy of the golden line work.

    *   **Application Rule:**
        All elements must be rendered using fine, continuous, monoline vector strokes. The style is linear and geometric. Build the subject from symmetrical arrangements of sacred geometry: circles, triangles, eyes, suns, moons, and stars.
        
        Incorporate astrological symbols, alchemical icons, and constellations as decorative and symbolic elements. The composition should be balanced and centered, like a mandala or a coat of arms. The subject is transformed into a powerful, archetypal symbol.
    `,
  },
  {
    id: 'banknote_engraving',
    icon: React.createElement(Banknote, { size: 24 }),
    tags: { vibe: ['Professional', 'Luxury', 'Retro'], format: ['Linear', 'Textured'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE TREASURY**

    *   **The Vibe:**
        Evoke the ultimate sense of trust, value, and security. The aesthetic is that of currency, stock certificates, and official government documents. It feels traditional, intricate, and impossible to forge. It communicates that the information is as reliable and valuable as money itself.
        
        The atmosphere is one of authority and permanence. It is serious, formal, and meticulously detailed. This style leverages centuries of financial design to imbue the content with a sense of rock-solid credibility.

    *   **Color Palette:**
        Use a monochromatic palette based on a single "ink" color, typically a deep green, brown, or blue, on an off-white or pale watermarked background. The variation in tone comes entirely from the density of the engraved lines, not from different colors.
        
        This limited palette is serious and official. It avoids frivolity and focuses on the intricate detail of the line work, which is the star of the show.

    *   **Materials & Texture:**
        The primary material is intaglio ink on high-quality cotton paper. The key texture comes from the engraved lines themselves—the fine, raised feel of the ink. The lines are not flat; they have a physical presence.
        
        The background may feature a subtle watermark or the fine texture of security paper. The entire image should feel like a valuable, tangible object that you can hold and feel.

    *   **Lighting & FX:**
        There is no lighting in the scene. All volume, shadow, and form are created through the painstaking technique of cross-hatching and line density. Darker areas are achieved by placing lines closer together; lighter areas have more space between them.
        
        This manual rendering of light and shadow is the core skill of the style. It demonstrates an incredible level of craft and precision, which in turn builds trust in the content.

    *   **Application Rule:**
        Render the subject as a classical portrait or a symbolic allegorical figure, similar to what you'd find on a dollar bill. Surround the central image with elaborate, decorative scrollwork, guilloché patterns, and ornate borders.
        
        Typography should be formal and classic, often using serif fonts with flourishes. The entire composition should be framed and balanced, like a legal document, conveying a sense of official importance and security.
    `,
  },
  {
    id: 'whiteboard',
    icon: React.createElement(Presentation, { size: 24 }),
    tags: { vibe: ['Professional', 'Creative'], format: ['Handmade', 'Linear'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE BRAINSTORM SESSION**

    *   **The Vibe:**
        Capture the dynamic, collaborative, and slightly chaotic energy of a strategy session. The aesthetic is that of a well-used whiteboard, filled with ideas, diagrams, and connections being made in real-time. It feels agile, creative, and action-oriented.
        
        The atmosphere is one of active problem-solving. It's not a polished final presentation; it's the messy, exciting "work in progress." This style makes the information feel current, relevant, and collaboratively generated.

    *   **Color Palette:**
        The background is a slightly reflective, off-white, representing the whiteboard. The "inks" are the classic set of dry-erase markers: black (for core ideas), blue, green, and red (for annotations, connections, and emphasis).
        
        The colors should have the slightly unsaturated, streaky quality of a real marker. This limited but vibrant palette is instantly recognizable and associated with planning and teaching.

    *   **Materials & Texture:**
        The "ink" should not be perfectly solid. It should have the characteristic streaks and slight transparency of a dry-erase marker. Include imperfections like a slightly faded marker stroke or the faint "ghosting" of a previously erased idea in the background.
        
        The surface of the whiteboard itself should have a subtle gloss, perhaps with a slight lens flare or reflection to sell the effect. These details make the digital image feel like a photograph of a real object, adding to its authenticity.

    *   **Lighting & FX:**
        The lighting should be flat and bright, like an office environment. The main effect is the glossy reflection on the whiteboard surface. This subtle glare can help create a sense of depth and realism.
        
        There are no shadows cast by the drawings themselves. The focus is on the clarity and energy of the hand-drawn information.

    *   **Application Rule:**
        All text and diagrams should look like they were drawn quickly but clearly by hand with a marker. Use a simple, all-caps print. Connect ideas with hand-drawn arrows and circles. Use sticky notes (yellow squares) for side comments or key takeaways.
        
        The layout should feel organic and iterative, as if ideas were added over time. Don't be afraid to make it look a little crowded or messy—this is part of the "live session" aesthetic. It's the visual representation of a mind at work.
    `,
  },
  {
    id: 'stained_glass',
    icon: React.createElement(GlassWater, { size: 24 }),
    tags: { vibe: ['Mystical', 'Dramatic', 'Retro'], format: ['Abstract', 'Textured'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE CATHEDRAL**

    *   **The Vibe:**
        Evoke a sense of reverence, timelessness, and profound significance. The aesthetic is that of a medieval cathedral window, where stories are told through light and color. It feels ancient, sacred, and awe-inspiring.
        
        The atmosphere is one of quiet contemplation and spiritual weight. This style elevates the subject matter, treating it not as mere information, but as a deep truth or a moral lesson. It commands a hushed respect from the viewer.

    *   **Color Palette:**
        Use a palette of deep, jewel-toned colors: Ruby Red, Sapphire Blue, Emerald Green, and Amethyst Purple. These colors should look like they are being illuminated from behind, making them glow with intense saturation.
        
        The colors are not mixed but separated by black lines, giving each hue its own space to shine. The richness of the colors creates a sense of value and preciousness.

    *   **Materials & Texture:**
        The material is colored glass. The glass should not be perfectly smooth; it should have subtle imperfections, bubbles, and variations in thickness that cause the light to refract in interesting ways. The pieces are held together by thick, dark lead came.
        
        The texture is in the interaction of light with the imperfect glass. This materiality gives the image a sense of age and handcrafted artistry.

    *   **Lighting & FX:**
        The lighting is the most critical element. The light source must come from *behind* the image, passing through the glass. This backlighting makes the colors vibrant and luminous. Use "god rays" or beams of light that appear to shine through the window into a dark space.
        
        The lead lines should be almost black, creating a stark contrast that defines the shapes. The effect is one of pure, colored light, creating a powerful and memorable visual experience.

    *   **Application Rule:**
        Render the subject in a stylized, symbolic, and often geometric fashion, similar to medieval art. Figures are elongated and expressive rather than realistic. The composition is often symmetrical and framed within an architectural shape like an arch or a rose window.
        
        The story is told through a series of panels or vignettes within the larger composition. The thick black lines are essential for defining the forms and separating the colors. The subject is transformed into a timeless icon or a scene from a sacred story.
    `,
  },
  {
    id: 'thermal_imaging',
    icon: React.createElement(Thermometer, { size: 24 }),
    tags: { vibe: ['Futuristic', 'Dramatic'], format: ['Data', 'Abstract'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE PREDATOR'S VIEW**

    *   **The Vibe:**
        Create an analytical, high-tech, and slightly unsettling aesthetic. This is the world seen through an infrared camera or the eyes of a sci-fi hunter. It reveals a hidden layer of reality—the world of energy and heat. It feels scientific, investigative, and focused.
        
        The atmosphere is one of pure data analysis. It strips away the surface appearance of things to reveal their underlying activity level. This style is excellent for showing hotspots, bottlenecks, or areas of high intensity in a system.

    *   **Color Palette:**
        The palette is based on a "heat map" gradient. The most common is the "Ironbow" palette, which moves from Black/Purple (cold) through Red and Orange to bright Yellow/White (hot). The colors are not arbitrary; they directly represent a value on a scale.
        
        The smooth, continuous gradient is the defining feature. The colors are luminous and synthetic, reinforcing the technological nature of the view.

    *   **Materials & Texture:**
        The "material" is energy itself. Surfaces are defined by their heat signature, not their physical texture. The image should have a slightly blurry, noisy quality, similar to a real thermal image, which often has a lower resolution than a visual camera.
        
        This digital noise and softness adds to the authenticity of the effect. It feels like you're looking at a live sensor feed, not a static, perfect render.

    *   **Lighting & FX:**
        There is no external light source. The objects themselves are the source of light. Hotter areas should have a strong "bloom" or "glow" effect, appearing to radiate energy. Colder areas should be dark and absorb light.
        
        The contrast comes from the temperature differences. This self-illumination is the core of the style, creating a visually striking and informative image.

    *   **Application Rule:**
        Render the subject not by its visible lines, but by its "hotspots." If the concept is about "effort," the areas requiring the most work should glow white-hot. If it's about "risk," the riskiest components should be bright red.
        
        The shape of the subject should be recognizable but slightly distorted by its heat signature. Add a data overlay, like a temperature scale or crosshairs, to reinforce the analytical, data-driven nature of the view. The subject becomes a dataset to be analyzed.
    `,
  },
  {
    id: 'film_noir',
    icon: React.createElement(Clapperboard, { size: 24 }),
    tags: { vibe: ['Dramatic', 'Retro', 'Gritty'], format: ['Photorealistic'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE HARD-BOILED DETECTIVE**

    *   **The Vibe:**
        Evoke the moody, cynical, and morally ambiguous world of 1940s detective films. The aesthetic is one of high drama, secrets, and existential dread. It's a world of shadows and moral gray areas.
        
        The atmosphere is heavy, tense, and mysterious. It suggests that the subject matter is a puzzle to be solved, a crime to be investigated, or a serious dilemma to be faced. This style adds a sense of weight, consequence, and intellectual seriousness to the content.

    *   **Color Palette:**
        Strictly black and white. The key is not the absence of color, but the richness of the grayscale. Use deep, crushed blacks, a full range of mid-tone grays, and stark, bright whites for highlights. The contrast should be high and dramatic.
        
        This monochromatic world forces the viewer to focus on form, light, and composition. The lack of color creates a timeless, serious mood and emphasizes the dramatic interplay of light and shadow.

    *   **Materials & Texture:**
        The image should have the texture of old film grain. It shouldn't be perfectly clean. Add a subtle layer of cinematic noise to give it an authentic, analog feel. Surfaces in the scene are often wet, reflecting light, like rain-slicked city streets.
        
        The film grain adds a layer of grit and realism, grounding the scene in a specific time and medium. The wetness of the surfaces enhances the dramatic reflections and deepens the blacks.

    *   **Lighting & FX:**
        This is the most critical element. Use "Chiaroscuro" lighting—a strong contrast between light and dark. The light source should be hard, low, and from a single point, creating long, dramatic shadows. Use silhouettes and "Venetian blind" shadow patterns.
        
        The shadows are more important than the light; they hide information and create mystery. Much of the frame should be lost in darkness, forcing the viewer to piece together the scene from the few illuminated details. This creates a sense of suspense and discovery.

    *   **Application Rule:**
        Frame the subject as if it were a clue in a detective's office or a scene from a mystery film. The subject is rarely fully illuminated; it is often partially obscured by shadow. The composition should be unbalanced and use dramatic low or high angles ("Dutch angles").
        
        If there are figures, their faces should be partially hidden. The text can be integrated as if it were part of a secret document or a newspaper headline under a desk lamp. The style turns the infographic into an investigation, and the viewer into the detective.
    `,
  },
  {
    id: 'monoline',
    icon: React.createElement(PenTool, { size: 24 }),
    tags: { vibe: ['Minimalist', 'Professional'], format: ['Linear', 'Flat'] },
    promptModifier: `
    **ART DIRECTION GUIDE: ELEGANT SIMPLICITY**

    *   **The Vibe:**
        Project an aesthetic of ultimate cleanliness, precision, and modern minimalism. It feels technical but approachable, like the instruction manual for a high-end piece of technology or a perfectly designed icon set. It communicates intelligence through restraint.
        
        The atmosphere is calm, airy, and incredibly organized. There is zero visual clutter. Every line has a purpose. This style suggests that the subject matter, no matter how complex, can be broken down into a simple, logical, and understandable system.

    *   **Color Palette:**
        The palette is extremely restrained. It's typically a single dark color (black or dark grey) for the lines on a pure white or off-white background. Optionally, a single, soft accent color can be used to highlight a key component or action.
        
        The beauty comes from the purity of the line work, not from a complex color scheme. This minimalism forces the viewer to focus on the structure and form of the subject.

    *   **Materials & Texture:**
        There are no materials or textures. The style is defined by pure, mathematical vector lines. The lines are "monoline," meaning they have a constant, uniform thickness from beginning to end. The ends of the lines are often rounded for a softer, more modern feel.
        
        The entire image is composed of strokes, with no fills. The "material" is the elegant path of the line itself. This creates a light, ethereal quality, as if the objects are drawn with light.

    *   **Lighting & FX:**
        There is absolutely no lighting or shadow. This is a purely two-dimensional, graphic representation. The world is perfectly flat.
        
        Depth and form are implied only through overlap and perspective, not through any lighting effects. This radical simplicity is the core of the style's elegance and clarity.

    *   **Application Rule:**
        Render the subject using only outlines. Do not fill any shapes with color. Simplify complex objects into their most iconic and recognizable linear form. The line weight should be consistent throughout the entire illustration.
        
        The composition relies heavily on negative space. The empty space is just as important as the lines. This style forces the designer to communicate the essence of an object with the minimum possible information, resulting in powerful and clear icons.
    `,
  },
  {
    id: 'scandinavian',
    icon: React.createElement(Home, { size: 24 }),
    tags: { vibe: ['Minimalist', 'Professional'], format: ['Flat', 'Handmade'] },
    promptModifier: `
    **ART DIRECTION GUIDE: HYGGE & LAGOM**

    *   **The Vibe:**
        Create a sense of calm, comfort, and balanced simplicity. The aesthetic is inspired by Scandinavian interior design—it's minimalist but warm, functional but beautiful. It feels clean, natural, and human-centric. It's the visual equivalent of "hygge" (coziness) and "lagom" (just the right amount).
        
        The atmosphere is bright, airy, and peaceful. It suggests that life and work can be both organized and comfortable. This style is calming and reassuring, making complex information feel manageable and harmonious.

    *   **Color Palette:**
        The palette is dominated by white and light, neutral tones (like soft grey and beige). Accent colors are soft, desaturated pastels—dusty pink, sage green, pale blue, and mustard yellow. The overall feeling is light and natural.
        
        The colors are muted and calming, inspired by a Nordic landscape. They provide visual interest without creating harsh contrasts or overwhelming the senses.

    *   **Materials & Texture:**
        The materials are natural and tactile. Think light-colored wood (like birch or pine), soft textiles (wool, linen), and matte ceramics. There is often a subtle paper grain or a light, hand-drawn texture in the illustrations to give them a touch of warmth.
        
        While the overall look is clean, it's not sterile. The natural textures prevent the minimalism from feeling cold, adding a layer of organic, human warmth.

    *   **Lighting & FX:**
        The lighting is bright, soft, and diffuse, like natural light pouring through a large window on a slightly overcast day. Shadows are soft and subtle, gently grounding objects without creating harsh drama.
        
        There are no strong glows or digital effects. The lighting feels natural and calming, contributing to the overall sense of peace and clarity.

    *   **Application Rule:**
        Embrace negative space. The composition should be uncluttered and spacious, allowing each element to breathe. Illustrations should be simple, often combining geometric shapes with soft, organic lines.
        
        Typography is typically a clean, geometric sans-serif, used with generous line spacing. The goal is to create a design that is both highly functional and aesthetically pleasing in a quiet, understated way. It's about finding the perfect balance between form and function.
    `,
  },
  {
    id: 'voxel',
    icon: React.createElement(ToyBrick, { size: 24 }),
    tags: { vibe: ['Playful', 'Creative'], format: ['3D', 'Pixel'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE DIGITAL LEGO**

    *   **The Vibe:**
        Evoke the playful, creative, and constructive spirit of sandbox games like Minecraft or Crossy Road. The world is made of digital building blocks, suggesting that anything can be built or deconstructed. It feels fun, orderly, and infinitely modular.
        
        The atmosphere is one of creativity and exploration within a structured, grid-based universe. It makes complex systems feel like a set of simple, understandable blocks that can be rearranged and experimented with. It gamifies the concept, inviting the user to "play" with the ideas.

    *   **Color Palette:**
        Use a vibrant, saturated, and clearly defined color palette. Each material has its own distinct color (e.g., brown for dirt, green for grass, grey for stone). Colors are typically flat and applied per-block.
        
        The palette is bright and cheerful, reinforcing the playful, game-like feel. The clear color-coding of materials helps the viewer instantly understand the composition of the voxel world.

    *   **Materials & Texture:**
        The only material is the "voxel" or the 3D cube. All objects, no matter how complex, are constructed from these blocks. Textures, if used, are very simple, low-resolution pixel art patterns mapped onto the faces of the cubes.
        
        The blocky, pixelated nature is the core of the aesthetic. It's a 3D extension of pixel art, celebrating the grid and the beauty of digital constraints.

    *   **Lighting & FX:**
        Lighting is typically soft and bright, with strong ambient occlusion to emphasize the edges where blocks meet. This creates soft shadows in the corners and crevices, giving the blocky world a sense of depth and tactility.
        
        The lighting should be simple and clear, often coming from a single directional source to create a day/night feel. The shadows cast by objects are often blocky themselves, respecting the underlying grid of the world.

    *   **Application Rule:**
        Render the entire subject and its environment as if it were built from 1x1 cubes on a perfect grid. Curves are represented by stair-step patterns of blocks. The world is strictly aligned to the X, Y, and Z axes.
        
        This forces a simplification of form that can reveal the underlying structure of a concept. It's about breaking down a complex idea into its smallest, indivisible "atomic" units (the voxels) and showing how they assemble into a greater whole.
    `,
  },
  {
    id: 'hand_drawn_indie',
    icon: React.createElement(Brush, { size: 24 }),
    tags: { vibe: ['Creative', 'Playful', 'Gritty'], format: ['Handmade', 'Linear'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE ARTISANAL GAME**

    *   **The Vibe:**
        Capture the moody, atmospheric, and lovingly crafted feel of a breakout indie game like Hollow Knight or Cuphead. The aesthetic is a blend of traditional 2D animation and painterly backgrounds. It feels personal, expressive, and full of soul.
        
        The atmosphere is immersive and often melancholic or whimsical. It suggests a world with a deep history and hidden secrets. This style communicates a high level of craft and artistic dedication, making the content feel like a unique, boutique experience.

    *   **Color Palette:**
        The palette is often desaturated and thematic, using a limited range of colors to create a strong mood. It could be the gloomy blues and greys of a forgotten kingdom, or the sepia tones of a 1930s cartoon. A few pops of a single, vibrant accent color are used for emphasis (like the orange of Hollow Knight's infection).
        
        The colors are chosen for their emotional impact, not for realism. They work together to create a cohesive and unforgettable atmosphere for the game world.

    *   **Materials & Texture:**
        There's a strong contrast in texture. The characters and foreground elements are defined by clean, sharp ink lines. The backgrounds, however, are painterly and textured, with visible brush strokes and soft gradients, often using a parallax scrolling effect to create depth.
        
        This separation makes the playable characters pop from the environment, focusing the viewer's attention on the main action while still creating a rich, immersive world.

    *   **Lighting & FX:**
        Lighting is used dramatically to create mood. Characters might be backlit with a strong rim light, or areas of the world might be shrouded in shadow. Particles, like glowing dust motes or embers, are often used to add life and magic to the scene.
        
        The lighting is not realistic but cinematic, designed to enhance the emotional tone of the scene. It guides the eye and tells a story about the environment.

    *   **Application Rule:**
        Render the subject as a character or creature within a 2D game level. The character should have expressive, hand-drawn outlines. The environment should be a multi-layered, painterly backdrop that tells a story about the world.
        
        The composition should feel like a screenshot from a game, often with some UI elements (like a health bar or a map) to complete the illusion. The subject is transformed from a piece of information into an active participant in an epic adventure.
    `,
  },
  {
    id: '1_bit',
    icon: React.createElement(Binary, { size: 24 }),
    tags: { vibe: ['Minimalist', 'Retro', 'Gritty'], format: ['Pixel'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE BINARY WORLD**

    *   **The Vibe:**
        Embrace the ultimate constraint in digital art. The aesthetic is stark, high-contrast, and surprisingly expressive, reminiscent of early Macintosh games, the Playdate console, or avant-garde pixel art. It feels retro, bold, and incredibly deliberate.
        
        The atmosphere is one of pure graphic clarity. With only two colors, there is no room for ambiguity. Every single pixel is a critical decision. This style communicates a powerful message of focus and essence—stripping a concept down to its most fundamental, binary form.

    *   **Color Palette:**
        Pure black and pure white. There are no shades of gray. The entire image is composed of on/off pixels.
        
        This extreme limitation forces creativity in how form, texture, and light are represented. It's a masterclass in visual problem-solving.

    *   **Materials & Texture:**
        There are no materials. The only texture is created through "dithering"—the arrangement of black and white pixels in patterns (like checkerboards or stripes) to simulate shades of gray or different surface textures.
        
        Dithering is the core technique of the style. It's how artists create the illusion of depth and complexity from the simplest possible building blocks. The texture is the cleverness of the pixel patterns themselves.

    *   **Lighting & FX:**
        Light and shadow are represented in the most abstract way possible. An object is either lit (white) or in shadow (black). There are no soft gradients. Form is defined by the stark contrast between the two.
        
        The lighting is purely graphic and conceptual. It's not about realism; it's about using the binary choice of black or white to define shapes and create a readable image.

    *   **Application Rule:**
        Render the subject using low-resolution pixel art, but with only black and white pixels. Outlines are crucial for defining shapes. Use dithering patterns extensively to create shading, gradients, and texture.
        
        The challenge is to make a complex idea readable with the least amount of information possible. This style forces a radical simplification that can reveal the absolute core of a concept. It's a visual representation of the "signal vs. noise" philosophy, taken to its logical extreme.
    `,
  },
  {
    id: 'bauhaus',
    icon: React.createElement(Square, { size: 24 }),
    tags: { vibe: ['Minimalist', 'Retro', 'Professional'], format: ['Flat', 'Abstract'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE WORKSHOP OF FORM**

    *   **The Vibe:**
        Channel the spirit of the early 20th-century Bauhaus school. The aesthetic is functional, geometric, and radically simple. It's a celebration of pure form and industrial efficiency. It feels like a piece of modernist architecture or a product designed by Walter Gropius.
        
        The atmosphere is one of intellectual rigor and design purity. It rejects all historical ornamentation in favor of a universal visual language based on simple shapes and colors. It communicates that the subject is well-designed, logical, and built on first principles.

    *   **Color Palette:**
        The palette is strictly limited to the primary colors: Red, Yellow, and Blue, used alongside Black, White, and Gray. The colors are used in their pure, saturated forms as flat blocks of color.
        
        This foundational palette reinforces the focus on primary shapes and first principles. The colors are not used for emotional expression, but as functional elements for creating hierarchy and visual balance.

    *   **Materials & Texture:**
        The materials are clean and industrial. Think smooth plaster, steel tubing, and unadorned wood. In graphic form, this translates to perfectly flat, textureless vector shapes.
        
        The aesthetic celebrates the clean, machine-made surface. There is no grain or handmade quality. The purity of the material reflects the purity of the geometric forms.

    *   **Lighting & FX:**
        There is no realistic lighting. The style is flat and graphic. Depth is implied through overlapping shapes and composition, not through shadows or gradients.
        
        The focus is on the two-dimensional arrangement of forms and colors on the page. The lack of lighting effects keeps the image clean, objective, and easy to read.

    *   **Application Rule:**
        Deconstruct the subject into its most basic geometric components: circles, squares, and triangles. The composition should be asymmetrical but balanced, often using strong diagonal lines to create a sense of dynamic tension.
        
        Typography is almost always a clean, geometric sans-serif (like Futura), often set in lowercase and integrated into the composition as a design element itself. The goal is to create a "total work of art" where every element, including the text, serves a functional and aesthetic purpose within the whole.
    `,
  },
  {
    id: 'psychedelic',
    icon: React.createElement(Popcorn, { size: 24 }),
    tags: { vibe: ['Creative', 'Retro', 'Mystical'], format: ['Abstract', 'Handmade'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE 60s COUNTER-CULTURE**

    *   **The Vibe:**
        Immerse the viewer in the mind-bending, fluid world of 1960s psychedelic rock posters. The aesthetic is organic, vibrant, and deliberately disorienting. It feels like a hallucination, a dream, or a piece of visual music.
        
        The atmosphere is one of freedom, anti-authoritarianism, and expanded consciousness. It breaks all the traditional rules of graphic design, prioritizing emotional expression and visual vibration over legibility and order.

    *   **Color Palette:**
        Use high-saturation, clashing complementary colors. Think bright orange next to electric blue, or hot pink next to lime green. The colors are designed to vibrate and create optical illusions.
        
        The palette is intense and sensory-overloading. It's meant to simulate an altered state of consciousness, creating a powerful and unforgettable visual experience.

    *   **Materials & Texture:**
        The "material" is liquid ink. Everything should look like it's melting, flowing, or pulsing. There's a strong hand-drawn quality, with the imperfections of a pen-and-ink drawing being a key feature.
        
        The texture is in the movement of the lines and the way the colors bleed into one another. It's an organic, living aesthetic that stands in stark contrast to rigid, geometric design.

    *   **Lighting & FX:**
        There is no realistic lighting. The "light" comes from the vibrancy of the colors themselves. The main effect is the distortion and warping of shapes and text.
        
        The image should feel like it's being viewed through a heat haze or under water. This constant motion and visual instability is the core of the style's hypnotic appeal.

    *   **Application Rule:**
        Typography is the main event. Letters are treated as illustrative forms themselves. They are hand-drawn, bubble-like, and warped to fill the entire space of the canvas, often making them nearly illegible. The text *is* the image.
        
        The composition is extremely dense, with every inch of the canvas filled with pulsating lines and colors. Negative space is the enemy. The goal is to create an immersive, overwhelming visual field that the viewer gets lost in.
    `,
  },
  {
    id: 'ukiyo_e',
    icon: React.createElement(Ship, { size: 24 }),
    tags: { vibe: ['Creative', 'Retro'], format: ['Textured', 'Handmade', 'Flat'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE FLOATING WORLD**

    *   **The Vibe:**
        Capture the elegant, stylized, and serene beauty of Japanese woodblock prints from the Edo period (like Hokusai or Hiroshige). The aesthetic is a masterful blend of graphic simplicity and subtle, natural detail. It feels calm, balanced, and deeply connected to nature.
        
        The atmosphere is one of contemplation and fleeting beauty ("ukiyo-e" means "pictures of the floating world"). It finds beauty in everyday scenes and the power of the natural world. This style brings a sense of grace, history, and artistic mastery to the subject.

    *   **Color Palette:**
        Use a palette of soft, muted colors derived from natural pigments: indigo blue, faded cherry blossom pink, pale greens, and earthy browns, all on an aged, rice paper background. Black is used for keylines but not for large fills.
        
        The colors are harmonious and desaturated, giving the image a sense of age and tranquility. The palette is chosen for its atmospheric and poetic qualities.

    *   **Materials & Texture:**
        The primary texture is the visible grain of the woodblock in the printed areas. The background is a soft, fibrous rice paper texture. The "ink" should look like it has been pressed into the paper, with slight variations in opacity.
        
        This tactile quality is essential to the style. It reminds the viewer that the image is a physical artifact, created through a painstaking process of carving and printing.

    *   **Lighting & FX:**
        The lighting is completely flat and graphic. There are no shadows or realistic light sources. Depth is created through overlapping planes, atmospheric perspective (distant objects being paler), and scale.
        
        This rejection of Western-style perspective and lighting is a defining feature. It forces the viewer to appreciate the composition in terms of pure shape and line, creating a unique and powerful graphic language.

    *   **Application Rule:**
        Define all shapes with strong, elegant, calligraphic black outlines ("keylines"). The line work has variable thickness, reflecting the pressure of a brush. Fill the outlined shapes with flat fields of color.
        
        Render natural elements like waves, clouds, and mountains in highly stylized, symbolic forms. The composition is often asymmetrical and uses "cut-off" framing to create a sense of a larger world existing beyond the frame. The subject is integrated into a beautiful, poetic landscape.
    `,
  },
  {
    id: 'stencil',
    icon: React.createElement(SprayCan, { size: 24 }),
    tags: { vibe: ['Gritty', 'Creative', 'Dramatic'], format: ['Textured', 'Collage'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE URBAN GHOST**

    *   **The Vibe:**
        Evoke the urgent, subversive, and anonymous spirit of street art. The aesthetic is that of a quickly sprayed stencil on a city wall, like the work of Banksy or Shepard Fairey. It feels political, temporary, and impactful.
        
        The atmosphere is one of rebellion and guerilla communication. The message has to be delivered quickly and powerfully before the artist is caught. This style gives the content a sense of urgency and counter-cultural importance.

    *   **Color Palette:**
        The palette is extremely limited and high-contrast. It's typically single-color (often black or red) spray paint on a textured, neutral background (like concrete or brick). The power comes from the stark binary of paint vs. wall.
        
        This limitation is a practical one for street artists but becomes a powerful stylistic choice. It ensures the message is clear, graphic, and instantly readable from a distance.

    *   **Materials & Texture:**
        Texture is everything. The background must be a realistic, gritty urban surface: cracked concrete, weathered brick, or a rusty metal door. The "ink" is spray paint, which means it should have soft, fuzzy edges ("overspray") and occasional drips or splatters.
        
        The stencil itself is part of the material. You should see the "bridges"—the small gaps in the stencil needed to hold it together (like the inside of the letter 'O'). These imperfections are proof of the medium's authenticity.

    *   **Lighting & FX:**
        The lighting should be dramatic and environmental. Imagine the scene lit by a single, harsh streetlight from above or the side, casting long shadows. The lighting is part of the urban environment, not a neutral studio setup.
        
        This cinematic lighting adds to the drama and sense of place. It makes the artwork feel like it's part of a real, living city at night.

    *   **Application Rule:**
        Render the subject as a high-contrast, multi-layer stencil. Break the image down into pure black and white shapes (posterization). The subject is not drawn; it's the result of a physical process of spraying paint over a cutout.
        
        The message is often a simple, powerful image combined with a stenciled, military-style font. The composition should feel tactical and placed with intention, as if to comment on or interact with its environment. The subject becomes a piece of political commentary.
    `,
  },
  {
    id: 'manual',
    icon: React.createElement(LayoutGrid, { size: 24 }),
    tags: { vibe: ['Minimalist', 'Professional'], format: ['Linear', 'Data'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE UNIVERSAL LANGUAGE**

    *   **The Vibe:**
        Create an aesthetic of absolute clarity, function, and universal understanding. This is the visual language of IKEA and LEGO instructions. It is designed to be understood by anyone, anywhere, without needing a single word of text. It feels helpful, logical, and foolproof.
        
        The atmosphere is one of calm, patient instruction. It communicates that even a complex process can be broken down into simple, manageable steps. It builds confidence in the user by showing them exactly what to do, leaving no room for ambiguity.

    *   **Color Palette:**
        Strictly black and white. The background is pure white. The lines are solid black. There are no other colors.
        
        This extreme minimalism removes all possible distraction. The focus is 100% on the form of the objects and the sequence of actions. It is the purest form of instructional design.

    *   **Materials & Texture:**
        There are no materials or textures. The image is composed of pure, clean vector lines. The lines are monoline (constant thickness) and have a technical, precise quality.
        
        The aesthetic is completely flat and graphic. It's about representing form and process in the most direct way possible.

    *   **Lighting & FX:**
        There is no lighting or shadow. This is a schematic diagram, not a realistic rendering. Form is communicated through line work and perspective alone.
        
        This ensures that every part of the object is equally visible and that no detail is obscured. Clarity is the only goal.

    *   **Application Rule:**
        Render the subject from an isometric or exploded perspective. Show a sequence of steps, using arrows to indicate movement and assembly. Use numbered diagrams to show the order of operations.
        
        Use visual cues to communicate actions: a checkmark for a correct step, an 'X' for an incorrect one, or a magnifying glass icon to zoom in on a critical detail. The entire story must be told through these simple, universal symbols, creating a language that transcends words.
    `,
  },
  {
    id: 'oil_painting',
    icon: React.createElement(Paintbrush, { size: 24 }),
    tags: {
      vibe: ['Creative', 'Dramatic', 'Retro'],
      format: ['Textured', 'Handmade', 'Photorealistic'],
    },
    promptModifier: `
    **ART DIRECTION GUIDE: THE OLD MASTER**

    *   **The Vibe:**
        Evoke the feeling of a classical oil painting from a master like Rembrandt or Caravaggio. The aesthetic is rich, dramatic, and full of emotional depth. It feels timeless, important, and worthy of being in a museum.
        
        The atmosphere is one of serious contemplation. The subject is treated with a profound sense of importance and psychological depth. This style elevates the content, giving it the weight and gravitas of a masterpiece.

    *   **Color Palette:**
        Use a rich, deep, and often dark palette inspired by classical painters. Think burnt umber, sienna, deep reds, and golden ochres, with light used as a focal point. The colors are mixed and blended, not flat.
        
        The palette is chosen for its emotional resonance and its ability to create dramatic light and shadow. The colors feel organic and earthy, mixed from physical pigments.

    *   **Materials & Texture:**
        The texture is the star of the show. The image must have the visible texture of oil paint on canvas. Show "impasto" (thickly applied paint), visible brushstrokes, and the weave of the canvas itself.
        
        The viewer should be able to almost feel the texture of the painted surface. This materiality proves that the image is a physical object created by a human hand, adding a layer of craft and value.

    *   **Lighting & FX:**
        Use dramatic Chiaroscuro lighting—a strong contrast between a bright, focused light source and deep, dark shadows. The light is used to model form and create a powerful focal point. It carves the subject out of the darkness.
        
        The lighting is not just for illumination; it's the primary tool for creating drama and emotion. It directs the viewer's eye and tells a story about what is important in the scene.

    *   **Application Rule:**
        Render the subject in a realistic but painterly style. The subject should be the focus of a classical composition, like a portrait or a still life. The background is often dark and indistinct, keeping all the attention on the subject.
        
        Don't hide the process. The brushstrokes should be visible, showing the artist's hand. This style transforms the subject from a simple piece of information into a profound object of artistic contemplation.
    `,
  },
  {
    id: 'synthwave',
    icon: React.createElement(Sun, { size: 24 }),
    tags: { vibe: ['Futuristic', 'Retro', 'Dramatic'], format: ['3D', 'Linear'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE 80s FUTURE**

    *   **The Vibe:**
        Capture the retro-futuristic, nostalgic optimism of 1980s sci-fi. This is the future as imagined by movies like Tron and Blade Runner, and the music of artists like Kavinsky. It's a world of neon sunsets, laser grids, and chrome sports cars. It feels cool, stylish, and dreamlike.
        
        The atmosphere is one of melancholic nostalgia for a future that never was. It's both futuristic and retro, blending high-tech visuals with a distinctly analog, 80s sensibility. It's the perfect style for concepts that are both forward-looking and rooted in a classic foundation.

    *   **Color Palette:**
        The palette is defined by glowing neon colors against a dark background. The key colors are hot pink, electric blue, and deep purple. These colors are often used in gradients, especially for the sky, which typically features a massive, setting sun.
        
        The colors are luminous and synthetic, representing a digital world of light. The specific combination of pink, purple, and blue is iconic and instantly sets the mood.

    *   **Materials & Texture:**
        The materials are polished and reflective. Think chrome, glossy plastic, and pure light. Surfaces are perfectly smooth. The "texture" comes from the repeating patterns of the laser grids that often define the ground plane.
        
        There is no dirt or grit here; it's a clean, idealized digital world. The reflective surfaces bounce the neon light around, creating a vibrant and immersive environment.

    *   **Lighting & FX:**
        The world is lit by neon and the glowing sunset. Use strong "bloom" and "glow" effects on all luminous elements to make them feel like they are emitting light. Lens flares and subtle scanlines can be used to add a retro, screen-based feel.
        
        The lighting is all about atmosphere. The glowing colors reflecting on the dark, wet ground is a hallmark of the style. It creates a dreamlike, immersive mood.

    *   **Application Rule:**
        Render the subject as a chrome object or a neon wireframe moving through a digital landscape. The ground is often a perspective grid of lasers stretching to the horizon. The background features a giant, low-hanging sun or moon, often with a grid pattern on it.
        
        Incorporate classic 80s imagery like palm trees, sports cars, or cassette tapes, but rendered in this futuristic style. The composition uses a strong one-point perspective to create a sense of speed and infinite distance.
    `,
  },
  {
    id: 'fantasy_rpg',
    icon: React.createElement(Map, { size: 24 }),
    tags: {
      vibe: ['Mystical', 'Dramatic', 'Retro'],
      format: ['Textured', 'Photorealistic', 'Handmade'],
    },
    promptModifier: `
    **ART DIRECTION GUIDE: THE HERO'S QUEST**

    * **The Vibe:**
        Transport the viewer into a world of swords and sorcery. This is the aesthetic of High Fantasy RPG interfaces (think World of Warcraft, Baldur's Gate, or Skyrim). It feels epic, historical, and weighted with destiny.
        
        The atmosphere is one of adventure and ancient lore. It treats the information as a quest log or a magical tome. It adds a sense of grandeur and importance to the content, suggesting that reading this is part of a legendary journey.

    * **Color Palette:**
        Use rich, deep, and earthy materials. The primary colors are the brown of aged leather, the cream of old parchment, and the metallic shine of Gold and Iron.
        
        Use jewel tones for accents: Ruby Red (Health), Sapphire Blue (Mana), and Emerald Green (Stamina). These colors should glow against the darker, textured backgrounds, creating a sense of magical power.

    * **Materials & Texture:**
        Skeuomorphism is king here. Every UI element should look like a physical object. Buttons are gemstones or stone tablets. Frames are wrought iron or carved gold. Backgrounds are worn parchment or dragon scales.
        
        The texture is heavy and tactile. It should look weathered by battle and time. Avoid clean, digital flat surfaces at all costs.

    * **Lighting & FX:**
        The lighting is warm and ambient, like a tavern hearth or a torch in a dungeon. Metals should have strong specular highlights to show their hardness. Gems should have an inner glow.
        
        Use drop shadows to create depth between the UI layers. The interface should feel like a heavy, physical overlay sitting on top of the world.

    * **Application Rule:**
        Frame the content in ornate borders with filigree, rivets, and celtic knots. Use serif fonts that look like hand-lettered calligraphy.
        
        Gamify the data: represent progress with experience bars, represent importance with "rarity" colors (Grey < Green < Blue < Purple < Orange). The subject becomes a legendary item or a boss monster to be analyzed.
    `,
  },
  {
    id: 'esports_tactical',
    icon: React.createElement(Triangle, { size: 24 }),
    tags: { vibe: ['Futuristic', 'Dramatic', 'Professional'], format: ['Flat', 'Linear'] },
    promptModifier: `
    **ART DIRECTION GUIDE: COMPETITIVE EDGE**

    * **The Vibe:**
        Channel the high-octane energy of modern competitive gaming and tactical shooters (like Valorant, Apex Legends, or Overwatch League). The aesthetic is sharp, fast, and aggressive. It screams "Victory."
        
        The atmosphere is hyped and kinetic. It feels like a broadcast overlay for a grand final tournament. It communicates precision, speed, and skill, appealing to a generation raised on high-refresh-rate screens and twitch reflexes.

    * **Color Palette:**
        Use a "Dark Mode" base (Gunmetal Grey, Deep Navy) pierced by extremely bright, synthetic accents. Neon Red, Electric Volt, and Hyper Cyan.
        
        The contrast is crucial. The accents are used sharply and sparingly to guide the eye and create visual impact. It’s not a "rainbow" style; it’s a tactical, team-color based style.

    * **Materials & Texture:**
        The look is mostly flat but includes subtle patterns like carbon fiber, hexagonal meshes, or "glitch" textures. Surfaces look like matte tactical gear or high-end GPU shrouds.
        
        Use "chromatic aberration" (RGB splitting) and digital noise on the edges of shapes to give it a modern, broadcast signal feel.

    * **Lighting & FX:**
        Lighting is minimal but sharp. Use glowing gradients to indicate energy. The primary FX are "Speed Lines" and shattered geometry.
        
        Motion is implied through slanted shapes (sheared rectangles) and italicized typography. Everything leans forward, rushing towards the right side of the screen.

    * **Application Rule:**
        Reject 90-degree angles; use 45-degree cuts and trapezoids. The layout should feel like a Heads-Up Display (HUD) for a cyber-athlete.
        
        Typography is massive, wide, and bold Sans-Serif (often italicized). Use decorative elements like crosshairs, chevrons, and rank insignias. The composition should feel explosive, shattering the static frame.
    `,
  },
  {
    id: 'napkin_sketch',
    // Usando Square para representar o guardanapo quadrado
    icon: React.createElement(Square, { size: 24 }),
    tags: {
      vibe: ['Creative', 'Minimalist', 'Gritty'],
      format: ['Handmade', 'Linear', 'Textured'],
    },
    promptModifier: `
    **ART DIRECTION GUIDE: BACK OF THE ENVELOPE**

    * **The Vibe:**
        Capture the urgency and raw creativity of an idea sketched out in a coffee shop moments after inception. It feels unfiltered, messy, and brilliant in its simplicity. It’s not about pretty drawings; it’s about getting the core concept down fast before it’s forgotten.
        
        The atmosphere is casual and intimate. It suggests that the viewer is getting an exclusive look at the very beginning of something big.

    * **Color Palette:**
        Strictly monochromatic in a specific way: cheap, standard blue (or sometimes black) ballpoint pen ink. The background is an off-white, slightly yellowish napkin color.
        
        There are no other colors. The variation comes from the pressure of the pen—heavy lines are dark blue, lighter, quicker lines are fainter.

    * **Materials & Texture:**
        The substrate is crucial: a white paper napkin with a circular coffee ring stain mark. The napkin is soft, absorbent, and textured. You must see the fibrous texture, the bumps, and the pre-existing creases of the folded napkin.
        
        The ink interaction is key. The ballpoint pen should occasionally bleed slightly into the soft paper, creating fuzzy edges. There should be indentations in the paper where the pen pressed hard. The circular coffee ring stain should be visible, showing the characteristic brownish mark left by a coffee cup.
        
        **CRITICAL COMPOSITION REQUIREMENT:** The napkin is placed on a table surface. The camera angle must show the table surface visible in the lateral edges of the image (left and right sides), not just the napkin itself. The viewer should see the table texture and edges around the napkin, creating context and depth. The napkin should not fill the entire frame; it should be centered on the table with the table surface visible on both sides.

    * **Lighting & FX:**
        The lighting is flat and natural, like the ambient light in a cafe. The focus is on the physical texture of the napkin and ink, but the table surface should also be visible and lit naturally, showing its texture and material (wood, laminate, or other cafe table surface).

    * **Typography & Handwriting:**
        **CRITICAL:** All text must be hand-drawn with the ballpoint pen, but it must remain legible and readable. The handwriting should look natural and hurried—like someone quickly jotting down ideas—but never illegible or messy to the point of confusion.
        
        Use a mix of handwriting styles: some text in quick cursive, some in hurried block letters, some in casual print. The letters should show the natural imperfections of hand-drawn text: slight variations in size, occasional wobbly lines, and the organic flow of someone writing quickly. However, every word must be clearly readable and legible.

    * **Application Rule:**
        The drawing must look hurried. Lines are wobbly and often retraced. Mistakes are vigorously scribbled out, not erased. Arrows connect ideas wildly. All text must be hand-drawn, maintaining the authentic handwritten feel while ensuring complete legibility.
        
        The layout is chaotic, as if the person ran out of space and started writing in the margins. It's a glorious mess of pure thought—where every word is hand-drawn but perfectly readable.
    `,
  },
  {
    id: 'napkin_color',
    // Usando Palette para representar canetas coloridas
    icon: React.createElement(Palette, { size: 24 }),
    tags: { vibe: ['Creative', 'Playful', 'Gritty'], format: ['Handmade', 'Linear', 'Textured'] },
    promptModifier: `
    **ART DIRECTION GUIDE: COLORFUL BACK OF THE ENVELOPE**

    * **The Vibe:**
        Capture the same urgency and raw creativity of an idea sketched out in a coffee shop, but now with the added energy and expressiveness of colorful markers. It feels unfiltered, messy, and brilliant—but with personality and visual distinction. The colors bring life to the sketch, making different concepts pop and creating visual hierarchy through color coding.
        
        The atmosphere is casual, intimate, and vibrant. It suggests that the viewer is getting an exclusive look at a creative mind at work, where ideas are not just captured but also organized and emphasized through strategic use of color.

    * **Color Palette:**
        Use a vibrant, diverse palette of colorful marker pens: bright red, electric blue, sunny yellow, vivid green, vibrant purple, and bold orange. These are the classic colors of a set of felt-tip markers or colored ballpoint pens that someone would carry in a bag.
        
        The background remains an off-white, slightly yellowish napkin color. The colors should be bold and saturated, but still look like they're bleeding into the soft paper texture. Different elements can be drawn in different colors to create visual distinction—for example, main concepts in red, supporting ideas in blue, important notes in green, etc.
        
        The variation comes from both the pressure of the pen (heavy lines are darker, lighter lines are fainter) and the natural bleeding of colored ink into the absorbent napkin surface.

    * **Materials & Texture:**
        The substrate is crucial: a white paper napkin with a circular coffee ring stain mark. The napkin is soft, absorbent, and textured. You must see the fibrous texture, the bumps, and the pre-existing creases of the folded napkin.
        
        The ink interaction is key. The colored markers should bleed more noticeably than ballpoint pens, creating vibrant halos around the lines. Different colors may bleed into each other where they overlap, creating interesting color mixing effects. There should be indentations in the paper where markers pressed hard. The circular coffee ring stain should be visible, showing the characteristic brownish mark left by a coffee cup.
        
        **CRITICAL COMPOSITION REQUIREMENT:** The napkin is placed on a table surface. The camera angle must show the table surface visible in the lateral edges of the image (left and right sides), not just the napkin itself. The viewer should see the table texture and edges around the napkin, creating context and depth. The napkin should not fill the entire frame; it should be centered on the table with the table surface visible on both sides.

    * **Lighting & FX:**
        The lighting is flat and natural, like the ambient light in a cafe. The focus is on the physical texture of the napkin and the vibrant colors of the markers, but the table surface should also be visible and lit naturally, showing its texture and material (wood, laminate, or other cafe table surface).
        
        The colors should feel bright and energetic, but still grounded in the physical reality of ink on paper. No digital effects or glows—just the natural vibrancy of colored markers on textured paper.

    * **Typography & Handwriting:**
        **CRITICAL:** All text must be hand-drawn with the colored markers, but it must remain legible and readable. The handwriting should look natural and hurried—like someone quickly jotting down ideas—but never illegible or messy to the point of confusion.
        
        Use a mix of handwriting styles: some text in quick cursive, some in hurried block letters, some in casual print. The letters should show the natural imperfections of hand-drawn text: slight variations in size, occasional wobbly lines, and the organic flow of someone writing quickly. However, every word must be clearly readable.
        
        Text can be written in different colors for emphasis and organization. Important words or phrases can be written larger or underlined with a different colored marker. The handwriting should feel authentic and human—not perfect or digital—but always maintain clarity and legibility.

    * **Application Rule:**
        The drawing must look hurried and expressive. Lines are wobbly and often retraced. Mistakes are vigorously scribbled out in a different color (or multiple colors), not erased. Arrows connect ideas wildly, and different colored arrows can indicate different types of relationships or flows.
        
        Use color strategically to organize information: main concepts in one color, supporting details in another, important callouts in a third. All text must be hand-drawn with markers, maintaining the authentic handwritten feel while ensuring complete legibility. The layout is chaotic, as if the person ran out of space and started writing in the margins, but the colors help create visual order within the chaos.
        
        It's a glorious, colorful mess of pure thought—where the vibrancy of the markers adds energy and clarity to the raw creative process, and every word is hand-drawn but perfectly readable.
    `,
  },
  {
    id: 'child_drawing',
    icon: React.createElement(ToyBrick, { size: 24 }),
    tags: { vibe: ['Playful', 'Creative'], format: ['Handmade', 'Textured', 'Abstract'] },
    promptModifier: `
    **ART DIRECTION GUIDE: PURE IMAGINATION**

    * **The Vibe:**
        Evoke the innocent, unfiltered creativity of a 5-year-old's drawing. It is joyful, chaotic, and completely free from the rules of perspective or proportion. It feels honest and charmingly clumsy.
        
        The atmosphere is one of pure fun. It disarms the viewer by presenting complex information through the simplest, most nostalgic lens possible.

    * **Color Palette:**
        Use the hyper-saturated, limited palette of a basic 8-pack of wax crayons: bright red, sunny yellow, grass green, sky blue, orange, purple, brown, and black.
        
        Colors are applied enthusiastically and often go outside the lines. They should look waxy and vibrant.

    * **Materials & Texture:**
        The primary texture is wax crayon on paper. You should see the buildup of wax, the flakes, and the areas where the crayon skipped over the tooth of the paper.
        
        The background paper should look cheap, textured, and slightly crinkled or torn from a spiral-bound sketchpad.

    * **Lighting & FX:**
        Flat, bright, and happy lighting. No shadows or realistic effects. The focus is on the waxy texture of the medium.

    * **Application Rule:**
        Forget reality. People are stick figures with giant heads. Houses are squares with triangles on top. The sun is always in the corner and smiling.
        
        Lines are shaky and thick. Shapes are colored in with vigorous, scribbled strokes that don't quite cover the paper. All text must look like it was written by a child—backward letters, mixed upper/lowercase, and phonetic spelling are encouraged.
    `,
  },
  {
    id: 'newspaper_strip',
    icon: React.createElement(Newspaper, { size: 24 }),
    tags: { vibe: ['Retro', 'Playful', 'Creative'], format: ['Handmade', 'Linear', 'Textured'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE DAILY STRIP**

    * **The Vibe:**
        Channel the gentle humor and nostalgic charm of classic newspaper comic strips (think "Peanuts," "Calvin and Hobbes," or "Garfield"). It feels comforting, narrative, and slightly lo-fi. Unlike the "Vintage Comic" style (which is action-heavy), this is more about everyday life and storytelling.
        
        The atmosphere is warm and accessible. It frames the information as a simple, relatable story.

    * **Color Palette:**
        A limited, slightly muted CMYK printing palette. The colors should not be perfectly solid; they must be rendered with visible "halftone dots" (tiny rosette patterns used in printing).
        
        A key feature is "misregistration"—the colors should slightly bleed outside the black ink outlines, or not line up perfectly, creating thin white gaps. This imperfection is essential to the vintage print feel.

    * **Materials & Texture:**
        The background is cheap, textured, slightly greyish/yellowed newsprint paper. The black ink lines should look slightly absorbed into the porous paper, not sitting perfectly on top. You might see the texture of the fibers through the ink.

    * **Lighting & FX:**
        Flat print lighting. No dramatic shadows. The visual interest comes from the texture of the ink, dots, and paper.

    * **Application Rule:**
        The drawing style is defined by expressive, hand-drawn black ink outlines with varying thickness (nib pen look). Characters and objects have simple, rounded, friendly designs.
        
        Structure the content into comic panels with distinct borders. Use classic comic elements: speech bubbles for text, thought clouds, and hand-drawn sound effects ("POOF!", "SIGH").
    `,
  },
  {
    id: 'calligraphy',
    icon: React.createElement(Type, { size: 24 }),
    tags: { vibe: ['Luxury', 'Creative', 'Professional'], format: ['Handmade', 'Linear'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE MASTER SCRIBE**

    * **The Vibe:**
        Capture the refined elegance of traditional calligraphy and hand-lettering. This style evokes luxury, sophistication, and timeless beauty. It feels like an invitation to a royal event, a certificate of honor, or a beautifully crafted manuscript.
        
        The atmosphere is graceful and ceremonial. Every letter is treated as a work of art, with careful attention to form, spacing, and decorative elements. It suggests that the content is important, valuable, and worthy of this level of craftsmanship.

    * **Color Palette:**
        Use rich, deep colors: deep burgundy, royal blue, forest green, or classic black ink. Gold or silver accents can be used for flourishes and decorative elements. The background should be elegant—cream, ivory, or high-quality paper white.
        
        The contrast between the ink and paper should be strong and clear. Metallic accents (gold leaf effect) can be used sparingly for emphasis, creating a sense of luxury and importance.

    * **Materials & Texture:**
        The substrate is premium paper or parchment with subtle texture. You should see the quality of the paper—smooth but with a slight grain. The ink should look like it was applied with a calligraphy pen or brush, showing variable line width (thick downstrokes, thin upstrokes).
        
        The texture should suggest premium materials: handmade paper, vellum, or high-quality stationery. There may be subtle watermarks or embossed elements visible.

    * **Lighting & FX:**
        Soft, elegant lighting that highlights the texture of the paper and the depth of the ink. The lighting should create subtle shadows that give dimension to the letterforms and decorative flourishes.
        
        Gold or metallic elements should have a subtle sheen, catching the light naturally. No harsh shadows or dramatic effects—just refined, sophisticated illumination.

    * **Typography & Handwriting:**
        **CRITICAL:** All text must be rendered in elegant calligraphic script. Use classic calligraphy styles: Spencerian, Copperplate, or modern brush lettering. Each letter should show the characteristic thick and thin strokes of calligraphy.
        
        Decorative flourishes, swashes, and ornamental elements should be integrated naturally. The letterforms should be legible but artistic—showing the skill of a master calligrapher. Important words can be rendered larger with more elaborate decoration.
        
        The spacing between letters and words should be carefully considered, creating rhythm and flow. The overall composition should feel balanced and harmonious, like a piece of fine art.

    * **Application Rule:**
        Treat text as the primary visual element. The calligraphy itself becomes the illustration. Decorative borders, ornamental dividers, and elegant flourishes can frame and organize the content.
        
        Use color strategically: main headings in one color, body text in another, decorative elements in metallic accents. The layout should feel like a beautifully designed certificate or formal document, where every element is carefully placed and crafted.
    `,
  },
  {
    id: 'neon_signs',
    icon: React.createElement(Zap, { size: 24 }),
    tags: { vibe: ['Futuristic', 'Dramatic', 'Modern'], format: ['3D', 'Cinematic'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE NEON CITY**

    * **The Vibe:**
        Capture the electric energy of urban nightlife and futuristic cityscapes. This style evokes the feeling of walking through Times Square, Las Vegas, or a cyberpunk metropolis at night. It's bold, attention-grabbing, and impossible to ignore.
        
        The atmosphere is high-energy and modern. It suggests innovation, technology, and the pulse of contemporary culture. Everything feels alive, glowing, and dynamic.

    * **Color Palette:**
        Use vibrant neon colors against deep dark backgrounds: electric pink, cyan, purple, green, orange, and yellow. The background should be dark—midnight blue, deep purple, or pure black—to make the neon colors pop.
        
        The neon colors should be intensely saturated and glowing. Different elements can use different neon colors to create visual hierarchy and excitement. White or light gray can be used for non-glowing elements.

    * **Materials & Texture:**
        The neon signs should look like actual glass tubes filled with glowing gas. The edges should be sharp and defined, with a bright core and slightly softer glow around the edges. The background can be textured urban surfaces: brick walls, metal panels, or wet asphalt reflecting the neon glow.
        
        The typography should look like it's made of neon tubes—rounded, glowing, with visible connections between letters. The glow should create halos and reflections on nearby surfaces.

    * **Lighting & FX:**
        The primary light source is the neon itself, creating dramatic contrast between the glowing elements and the dark background. The neon should cast colored light onto surrounding surfaces, creating atmospheric reflections and glows.
        
        Use lens flares, bloom effects, and chromatic aberration subtly to enhance the neon glow. The lighting should feel cinematic and dramatic, like a night scene from Blade Runner or a cyberpunk film.

    * **Typography & Handwriting:**
        **CRITICAL:** All text must be rendered as neon signs—glowing, tubular letterforms that look like actual neon lighting. The letters should be bold, rounded, and clearly legible despite the glow effect.
        
        Use classic neon sign typography: bold sans-serif fonts, script fonts with flowing connections, or blocky display fonts. Each letter should look like it's made of glowing glass tubes, with visible connections and supports.
        
        The text should be highly legible—the neon glow enhances readability rather than obscuring it. Important text can be larger and brighter, while supporting text can be smaller but still clearly visible.

    * **Application Rule:**
        Structure the content like a collection of neon signs arranged in an urban environment. Different sections can be different neon signs, each glowing in its own color. Use the dark background and neon glow to create depth and hierarchy.
        
        The composition should feel like looking at a wall of neon signs or a neon-lit street. The glow and reflections create natural visual flow, guiding the eye through the information.
    `,
  },
  {
    id: 'vintage_poster',
    icon: React.createElement(Presentation, { size: 24 }),
    tags: { vibe: ['Retro', 'Professional', 'Dramatic'], format: ['Flat', 'Abstract'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE GOLDEN AGE OF POSTERS**

    * **The Vibe:**
        Channel the bold, confident graphic design of mid-century poster art (think WPA posters, travel posters, or propaganda art). It feels authoritative, optimistic, and visually striking. It communicates with clarity and impact.
        
        The atmosphere is nostalgic yet timeless. It suggests that the information is important and worth paying attention to—like a public service announcement or a call to action from a bygone era.

    * **Color Palette:**
        Use limited, bold color palettes typical of vintage printing: 2-4 colors maximum. Classic combinations include: red and black, blue and yellow, green and orange, or sepia tones. The colors should be flat and solid, with no gradients.
        
        The background is usually a single bold color or white. Text and illustrations use contrasting colors for maximum impact. The limited palette creates visual cohesion and makes the design memorable.

    * **Materials & Texture:**
        The surface should look like vintage printed paper—slightly textured, with the character of offset printing or screen printing. There may be subtle imperfections: slight misregistration, paper texture, or the characteristic look of aged paper.
        
        The illustrations should be graphic and stylized—not photorealistic. Think bold silhouettes, simplified forms, and strong graphic shapes. The style should feel hand-drawn but refined.

    * **Lighting & FX:**
        Flat, graphic lighting. No shadows or depth effects. The visual interest comes from the bold shapes, strong typography, and color contrast. Everything exists on a single plane.
        
        The lighting is conceptual—elements are lit evenly to show their graphic form clearly. The focus is on clarity and impact, not realism.

    * **Typography & Handwriting:**
        **CRITICAL:** Typography is the star of the show. Use bold, display fonts typical of the era: condensed sans-serifs, bold serifs, or stylized script fonts. The text should be large, clear, and impossible to miss.
        
        Text hierarchy is created through size, weight, and color—not through subtle variations. Headlines are massive and bold. Body text is clear and readable. Every word should feel intentional and impactful.
        
        The typography should feel hand-lettered or custom-designed for the poster. It should complement the illustrations and create a unified graphic statement.

    * **Application Rule:**
        Structure the content like a classic poster: a bold headline at the top, a central illustration or graphic element, and supporting text arranged in a clear hierarchy. Use strong geometric shapes, arrows, and graphic elements to guide the eye.
        
        The composition should be balanced and purposeful. Every element should serve the message. The limited color palette and bold typography create a powerful, memorable visual statement.
    `,
  },
  {
    id: 'origami',
    icon: React.createElement(Layers, { size: 24 }),
    tags: { vibe: ['Minimalist', 'Creative', 'Modern'], format: ['3D', 'Abstract'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE FOLDED PAPER**

    * **The Vibe:**
        Capture the precision and elegance of origami—the Japanese art of paper folding. This style feels clean, meditative, and sophisticated. It suggests that complex ideas can be expressed through simple, elegant forms.
        
        The atmosphere is calm and focused. It values precision, craftsmanship, and the beauty of geometric forms. It feels both traditional and modern, timeless and contemporary.

    * **Color Palette:**
        Use clean, solid colors typical of origami paper: bright white, vibrant red, deep blue, forest green, sunny yellow, or classic black. The colors should be flat and uniform—like high-quality origami paper.
        
        The background should be neutral—white, light gray, or a subtle gradient. The folded paper forms should stand out clearly against the background. Use color strategically to differentiate elements or create visual hierarchy.

    * **Materials & Texture:**
        The paper should look like high-quality origami paper: smooth, crisp, and perfectly folded. You should see the sharp creases and folds clearly. The paper should have a subtle sheen or matte finish, depending on the type of paper being represented.
        
        The folds should be precise and geometric. You should see the characteristic patterns of origami: valley folds, mountain folds, and the geometric patterns they create. The paper should look three-dimensional, with clear light and shadow defining the folded forms.

    * **Lighting & FX:**
        Clean, directional lighting that highlights the three-dimensional nature of the folded forms. The lighting should create clear shadows that define the creases and folds, making the geometry visible.
        
        The shadows should be crisp and geometric, following the folded edges. The lighting should feel natural but controlled, like studio photography of a carefully crafted object.

    * **Typography & Handwriting:**
        **CRITICAL:** Typography should complement the origami aesthetic—clean, geometric, and precise. Use modern sans-serif fonts with clear, simple letterforms. The text should feel like it belongs in the same world as the folded paper.
        
        Text can be integrated into the design by placing it on flat surfaces of the origami forms, or arranged around them. The typography should maintain the clean, minimalist aesthetic of the folded paper.
        
        The text should be highly legible and well-spaced. It should feel intentional and carefully placed, matching the precision of the origami forms.

    * **Application Rule:**
        Structure the content using origami forms as visual metaphors. Different concepts can be represented by different folded shapes: animals, geometric forms, or abstract sculptures. The folded paper becomes both illustration and organizational structure.
        
        Use the geometric nature of origami to create visual hierarchy and flow. The clean lines and precise folds guide the eye naturally through the information. The minimalist aesthetic ensures clarity and focus.
    `,
  },
  {
    id: 'graffiti',
    icon: React.createElement(SprayCan, { size: 24 }),
    tags: { vibe: ['Playful', 'Gritty', 'Creative'], format: ['Handmade', 'Textured'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE URBAN CANVAS**

    * **The Vibe:**
        Capture the raw energy and rebellious spirit of street art and graffiti. This style feels bold, expressive, and unapologetic. It suggests that the information is important enough to spray paint on a wall.
        
        The atmosphere is energetic and urban. It feels authentic, street-smart, and connected to contemporary culture. It's not polished or corporate—it's real, raw, and powerful.

    * **Color Palette:**
        Use vibrant, high-contrast colors typical of spray paint: electric blue, hot pink, lime green, bright yellow, orange, and black. The colors should be intense and saturated, like actual spray paint.
        
        The background can be a textured wall surface: brick, concrete, or metal. The graffiti colors should pop against this background. Use black outlines to define shapes and make colors stand out.

    * **Materials & Texture:**
        The surface should look like an actual wall: textured brick, rough concrete, or corrugated metal. You should see the texture of the surface through the paint. The spray paint should look like it was applied with actual spray cans—with characteristic drips, overspray, and texture.
        
        The paint should have the characteristic look of spray paint: slightly translucent in some areas, opaque in others, with visible spray patterns and texture. There may be drips, splatters, and the organic quality of hand-applied paint.

    * **Lighting & FX:**
        Natural urban lighting: daylight, streetlights, or the harsh light of an alley. The lighting should feel realistic and grounded. Shadows should be natural and help define the texture of the wall and the three-dimensional quality of the paint.
        
        The lighting should enhance the urban feel—like graffiti photographed on an actual city wall. No dramatic effects, just authentic urban illumination.

    * **Typography & Handwriting:**
        **CRITICAL:** All text must be rendered in graffiti lettering styles: wildstyle, bubble letters, or block letters with decorative elements. The letterforms should be bold, expressive, and stylized—but still legible.
        
        Graffiti typography is an art form itself. Letters can be interlocked, decorated with arrows, stars, or other elements, and stylized to create visual impact. However, the text must remain readable—the style enhances rather than obscures the message.
        
        Different words can use different graffiti styles to create hierarchy. Important text can be larger and more elaborate, while supporting text can be simpler but still clearly legible.

    * **Application Rule:**
        Structure the content like a graffiti wall: different sections can be different "pieces" or "tags" arranged on the wall. Use arrows, stars, and other graffiti elements to connect ideas and guide the eye.
        
        The composition should feel organic and energetic, like a wall that's been tagged over time. The vibrant colors and bold typography create natural visual hierarchy. The urban texture and authentic spray paint look ground the design in reality.
    `,
  },
  {
    id: 'minimalist_line',
    icon: React.createElement(Circle, { size: 24 }),
    tags: { vibe: ['Minimalist', 'Modern', 'Professional'], format: ['Linear', 'Flat'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE SINGLE LINE**

    * **The Vibe:**
        Embrace the philosophy of "less is more." This style is about maximum impact with absolute minimalism. It feels clean, modern, and sophisticated. Every line serves a purpose.
        
        The atmosphere is calm and focused. It suggests clarity, precision, and thoughtful design. It values simplicity and elegance over complexity and decoration.

    * **Color Palette:**
        Use a minimal color palette: typically black lines on white background, or a single accent color. The focus is on form, not color. If color is used, it should be strategic and sparing—perhaps a single accent color for emphasis.
        
        The background should be pure white or a very light neutral. The contrast should be high and clear. This minimal palette ensures that the line work is the star of the show.

    * **Materials & Texture:**
        The surface should be perfectly smooth and flat—like high-quality paper or a digital screen. There should be no texture, no grain, no imperfections. The focus is purely on the line itself.
        
        The lines should be clean and precise—like they were drawn with a fine technical pen or created digitally. The line weight should be consistent, or vary intentionally to create hierarchy.

    * **Lighting & FX:**
        No lighting effects. No shadows. No depth. Everything exists on a single flat plane. The visual interest comes from the line work itself—the curves, the negative space, the composition.
        
        The lighting is conceptual—elements are evenly lit to show their pure form. The focus is on clarity and simplicity.

    * **Typography & Handwriting:**
        **CRITICAL:** Typography should match the minimalist aesthetic—clean, simple, and geometric. Use modern sans-serif fonts with minimal character. The text should feel like it's part of the line art itself.
        
        Text should be highly legible and well-spaced. It should complement the line illustrations without competing with them. The typography should feel intentional and carefully considered.
        
        Text can be integrated into the design by placing it near or within the line illustrations. The relationship between text and illustration should feel harmonious and balanced.

    * **Application Rule:**
        Structure the content using single-line illustrations as the primary visual element. The line work should be expressive and meaningful—not just decorative. Use negative space strategically to create visual interest and guide the eye.
        
        The composition should be balanced and purposeful. Every line should serve the message. The minimalist aesthetic ensures that the information is clear and easy to understand, without visual distractions.
    `,
  },
  {
    id: 'vintage_map',
    icon: React.createElement(Map, { size: 24 }),
    tags: { vibe: ['Retro', 'Professional', 'Mystical'], format: ['Handmade', 'Textured'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE ANCIENT MAP**

    * **The Vibe:**
        Capture the sense of exploration and discovery from classic cartography. This style evokes the age of exploration, where maps were works of art as much as tools for navigation. It feels historical, authoritative, and mysterious.
        
        The atmosphere is adventurous and scholarly. It suggests that the information is part of a larger journey or exploration. It feels like discovering something important on an old map.

    * **Color Palette:**
        Use the muted, aged colors typical of vintage maps: sepia tones, faded blues, soft greens, and warm browns. The colors should look like they've aged over time—slightly faded but still rich.
        
        The background should be aged paper: cream, beige, or light brown. The map elements should use classic cartographic colors: blue for water, green for land, brown for borders and text. Decorative elements can use gold or red accents.

    * **Materials & Texture:**
        The substrate should look like aged parchment or old paper: textured, slightly yellowed, with visible imperfections. You should see the character of old paper—slight discoloration, texture, and the patina of age.
        
        The illustrations should look hand-drawn and detailed, like classic map illustrations. Think ornate compass roses, decorative borders, illustrated landmarks, and stylized geographic features. The style should feel like it came from the golden age of cartography.

    * **Lighting & FX:**
        Soft, warm lighting that suggests an old document viewed in natural light. The lighting should enhance the aged quality of the paper and make the illustrations feel authentic and historical.
        
        There may be subtle shadows and depth, but the focus is on the map itself. The lighting should feel natural and unobtrusive, like examining an actual historical document.

    * **Typography & Handwriting:**
        **CRITICAL:** Typography should match the vintage map aesthetic—classic serif fonts that look hand-lettered or engraved. The text should feel like it's part of the map itself, integrated naturally into the design.
        
        Place names, labels, and annotations should look like they were written by a cartographer. The typography should be clear and legible, but with the character of hand-drawn or engraved text.
        
        Text can be integrated into the map design: following coastlines, placed near landmarks, or arranged in decorative borders. The typography should feel intentional and part of the overall map composition.

    * **Application Rule:**
        Structure the content like a classic map: use geographic metaphors to organize information. Different regions can represent different concepts. Use map elements—compass roses, borders, landmarks, paths—to guide the viewer through the information.
        
        The composition should feel like exploring a map, with visual elements that guide the eye naturally. The vintage aesthetic adds character and makes the information feel more engaging and memorable.
    `,
  },
  {
    id: 'scientific_diagram',
    icon: React.createElement(Cpu, { size: 24 }),
    tags: { vibe: ['Professional', 'Modern'], format: ['Linear', 'Abstract'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE LABORATORY MANUAL**

    * **The Vibe:**
        Capture the precision and clarity of scientific illustration. This style is about education and understanding. It feels authoritative, accurate, and educational. It suggests that the information is based on careful observation and analysis.
        
        The atmosphere is clinical and focused. It values accuracy, clarity, and educational value. It feels like looking at a textbook or scientific publication—trustworthy and informative.

    * **Color Palette:**
        Use a clean, professional color palette: black lines on white background, with strategic use of color for differentiation. Common scientific diagram colors: red for arteries, blue for veins, green for specific systems, or grayscale for technical illustrations.
        
        The background should be pure white or very light gray. The colors should be clear and distinct, used strategically to differentiate elements or highlight important parts. The palette should support clarity and understanding.

    * **Materials & Texture:**
        The surface should be perfectly smooth and clean—like high-quality technical paper or a digital screen. There should be no texture or imperfections. The focus is on clarity and precision.
        
        The illustrations should be precise and technical: clean lines, accurate proportions, clear labels. Think cross-sections, exploded views, labeled diagrams, and technical drawings. The style should feel like it came from a scientific textbook or laboratory manual.

    * **Lighting & FX:**
        Even, flat lighting that shows all details clearly. No dramatic shadows or effects. The lighting should be purely functional—designed to show the information clearly and accurately.
        
        The lighting is conceptual and even. Every element should be clearly visible and well-lit. The focus is on clarity and educational value.

    * **Typography & Handwriting:**
        **CRITICAL:** Typography should be clear, professional, and highly legible. Use clean sans-serif or serif fonts typical of scientific publications. The text should feel authoritative and easy to read.
        
        Labels, annotations, and text should be clearly integrated into the diagram. Use arrows, lines, and callouts to connect text to specific parts of the illustration. The typography should support understanding and clarity.
        
        Text hierarchy should be clear: main labels larger and bolder, supporting text smaller but still legible. The typography should feel intentional and educational, like a well-designed textbook.

    * **Application Rule:**
        Structure the content using scientific diagram conventions: labeled illustrations, cross-sections, exploded views, or flow diagrams. Use arrows, lines, and callouts to guide the eye and explain relationships.
        
        The composition should be organized and logical, following scientific illustration principles. The clean, precise aesthetic ensures that the information is clear and easy to understand, supporting learning and comprehension.
    `,
  },
  {
    id: 'architectural_blueprint',
    icon: React.createElement(DraftingCompass, { size: 24 }),
    tags: { vibe: ['Professional', 'Modern'], format: ['Linear', 'Abstract'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE ARCHITECT'S TABLE**

    * **The Vibe:**
        Capture the precision and professionalism of architectural drafting. This style feels technical, authoritative, and well-planned. It suggests that the information has been carefully considered and professionally executed.
        
        The atmosphere is professional and precise. It values accuracy, planning, and technical excellence. It feels like looking at blueprints for a building—detailed, measured, and trustworthy.

    * **Color Palette:**
        Use the classic blueprint color scheme: white or light blue background with dark blue or black lines. Alternatively, use the modern architectural drawing palette: white background with black lines and red accents for important elements.
        
        The background should be clean and professional. The lines should be crisp and clear. Accent colors (red, blue, or green) can be used strategically to highlight important elements or differentiate systems.

    * **Materials & Texture:**
        The surface should look like technical drafting paper: smooth, clean, and professional. There should be subtle grid lines or measurement marks visible, like those on architectural paper. The paper should feel high-quality and precise.
        
        The drawings should look like they were created with technical drafting tools: precise lines, accurate angles, clear measurements. Think floor plans, elevations, sections, and technical details. The style should feel like professional architectural drawings.

    * **Lighting & FX:**
        Even, professional lighting that shows all details clearly. No dramatic shadows or effects. The lighting should be functional and clear, designed to show the technical information accurately.
        
        The lighting is even and professional. Every line and measurement should be clearly visible. The focus is on clarity and technical accuracy.

    * **Typography & Handwriting:**
        **CRITICAL:** Typography should be clear, technical, and highly legible. Use clean sans-serif fonts typical of architectural drawings. The text should feel professional and easy to read.
        
        Labels, dimensions, and annotations should be clearly integrated into the drawing. Use leader lines, callouts, and technical notation to connect text to specific parts of the drawing. The typography should support understanding and clarity.
        
        Text should include measurements, labels, and technical information. The typography should feel intentional and professional, like a well-executed architectural drawing.

    * **Application Rule:**
        Structure the content using architectural drawing conventions: floor plans, elevations, sections, or technical details. Use measurement lines, dimensions, and annotations to provide information. The layout should be organized and logical.
        
        The composition should follow architectural drawing principles: clear hierarchy, logical organization, and professional presentation. The technical, precise aesthetic ensures that the information is clear and easy to understand, supporting professional communication.
    `,
  },
  {
    id: 'vintage_label',
    icon: React.createElement(Tag, { size: 24 }),
    tags: { vibe: ['Retro', 'Luxury', 'Professional'], format: ['Flat', 'Textured'] },
    promptModifier: `
    **ART DIRECTION GUIDE: THE ARTISAN LABEL**

    * **The Vibe:**
        Capture the elegance and craftsmanship of vintage product labels and packaging. This style evokes the golden age of branding—when labels were works of art. It feels premium, authentic, and timeless.
        
        The atmosphere is sophisticated and nostalgic. It suggests quality, tradition, and attention to detail. It feels like discovering a beautifully designed product from a bygone era.

    * **Color Palette:**
        Use rich, classic colors typical of vintage labels: deep burgundy, forest green, navy blue, gold, cream, and sepia tones. The colors should feel premium and carefully chosen, like high-quality printing inks.
        
        The background should be aged paper: cream, ivory, or light brown with subtle texture. The label colors should contrast beautifully against this background. Gold or metallic accents can be used for borders and decorative elements.

    * **Materials & Texture:**
        The substrate should look like vintage label paper: textured, slightly aged, with visible paper grain. You should see the character of old printing: slight imperfections, paper texture, and the patina of age.
        
        The design should look like it was printed with vintage printing techniques: letterpress, engraving, or offset printing. The illustrations should be detailed and ornate, like classic label artwork. The style should feel hand-crafted and premium.

    * **Lighting & FX:**
        Soft, warm lighting that enhances the vintage quality of the paper and printing. The lighting should make the label feel like a physical object, with subtle shadows and depth that suggest it's sitting on a surface.
        
        The lighting should feel natural and warm, like examining an actual vintage label. It should enhance the texture and detail without being dramatic or distracting.

    * **Typography & Handwriting:**
        **CRITICAL:** Typography should match the vintage label aesthetic—elegant serif fonts, script fonts, or ornate display fonts typical of the era. The text should feel like it's part of the label design itself, integrated naturally.
        
        The typography should be clear and legible, but with the character of vintage printing. Think classic serif fonts for body text, elegant script for brand names, and ornate display fonts for headings. The text should feel intentional and carefully designed.
        
        Text hierarchy should be clear: brand names large and prominent, product information smaller but still legible. The typography should feel premium and well-crafted, matching the overall label aesthetic.

    * **Application Rule:**
        Structure the content like a classic product label: ornate borders, decorative elements, clear hierarchy, and organized information. Use vintage label design conventions: badges, seals, decorative frames, and classic layouts.
        
        The composition should feel balanced and intentional, like a well-designed vintage label. The ornate borders and decorative elements frame the information beautifully. The vintage aesthetic adds character and makes the information feel more engaging and memorable.
    `,
  },
];
