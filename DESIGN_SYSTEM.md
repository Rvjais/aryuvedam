# 🎨 Aaryuvedam - Royal Design System

## Color Palette

### Primary Colors
```
Emerald Green Dark:  #0f2818  ███████  Deep, rich forest green
Emerald Green:       #1a4d2e  ███████  Primary brand color
Emerald Green Light: #2d6a4f  ███████  Lighter healing green
```

### Accent Colors
```
Gold Dark:           #b8941f  ███████  Deep luxurious gold
Gold Primary:        #d4af37  ███████  Premium gold accent
Gold Light:          #f2c464  ███████  Bright golden highlight
```

### Neutral Colors
```
Cream:               #faf8f3  ███████  Soft background base
Ivory:               #f5f1e8  ███████  Warm neutral tone
Sand:                #e8dcc4  ███████  Desert-inspired earth
Charcoal:            #2c2c2c  ███████  Primary text color
Soft Black:          #1a1a1a  ███████  Deep text color
```

### Supporting Accents
```
Terracotta:          #c5705d  ███████  Warm earthy accent
Sage:                #9caf88  ███████  Natural green tone
Deep Purple:         #4a1e3d  ███████  Royal richness
```

## Typography

### Font Families
- **Headings**: Playfair Display (Elegant serif for main titles)
- **Secondary**: Cormorant Garamond (Classic serif for subtitles)
- **Body**: Montserrat (Clean sans-serif for readability)

### Font Sizes
```
Hero Title:          clamp(2.5rem, 5vw, 4rem)
Section Titles:      clamp(2rem, 4vw, 3rem)
Subsection:          1.6rem - 2rem
Body Text:           1rem
Small Text:          0.85rem - 0.95rem
```

### Font Weights
- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Extrabold: 800

## Spacing System

```
xs:  0.5rem  (8px)   - Tight spacing
sm:  1rem    (16px)  - Small gaps
md:  2rem    (32px)  - Medium spacing
lg:  3rem    (48px)  - Large sections
xl:  5rem    (80px)  - Extra large padding
```

## Border Radius

```
Small:     8px   - Buttons, inputs
Medium:    12px  - Cards, smaller elements
Large:     16px  - Large cards, containers
X-Large:   24px  - Hero sections, major features
```

## Shadows

### Elevation Levels
```
Small:     0 2px 8px rgba(0,0,0,0.08)    - Subtle depth
Medium:    0 4px 16px rgba(0,0,0,0.12)   - Card elevation
Large:     0 8px 32px rgba(0,0,0,0.16)   - Modals, dropdowns
X-Large:   0 16px 48px rgba(0,0,0,0.2)   - Major overlays
Gold:      0 4px 20px rgba(212,175,55,0.3) - Premium accent
```

## Gradients

### Primary Gradient
```css
background: linear-gradient(135deg, #1a4d2e 0%, #2d6a4f 100%);
```

### Gold Gradient
```css
background: linear-gradient(135deg, #d4af37 0%, #f2c464 100%);
```

### Overlay Gradient
```css
background: linear-gradient(135deg, 
  rgba(26,77,46,0.9) 0%, 
  rgba(45,106,79,0.85) 100%
);
```

## Animation Timing

```
Fast:      0.2s ease  - Micro-interactions
Base:      0.3s ease  - Standard transitions
Slow:      0.5s ease  - Hero sliders, major changes
```

## Buttons

### Primary Button
- Background: Gold gradient
- Color: Dark emerald (#0f2818)
- Padding: 1rem 2.5rem
- Border-radius: 16px
- Shadow: Gold shadow
- Hover: Lift 3px with enhanced shadow

### Outline Button
- Background: Transparent
- Border: 2px solid white
- Color: White
- Hover: Fill with white, text becomes emerald

## Cards

### Standard Card
- Background: White or Cream
- Padding: 2.5rem
- Border-radius: 16px
- Border: 2px transparent (becomes gold on hover)
- Shadow: Small (becomes large on hover)
- Transform: translateY(-5px) on hover

### Featured Card
- Larger with image backgrounds
- Gradient overlays
- Height: 450px
- Border-radius: 24px
- Transform: translateY(-10px) on hover

## Icons

### Size Standards
```
Small:     40px
Medium:    60-70px
Large:     80px
```

### Icon Containers
- Background: Emerald gradient or Gold gradient
- Border-radius: 50% (circular) or 12px (rounded square)
- Padding: Centered with flexbox
- Shadow: Medium elevation

## Responsive Breakpoints

```
Mobile:    < 768px
Tablet:    768px - 991px
Desktop:   992px - 1199px
Large:     1200px+
```

### Grid Layouts
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3-4 columns depending on context

## Glassmorphism

### Settings
```css
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);
border: 2px solid rgba(255, 255, 255, 0.15);
```

### Usage Areas
- Mobile navigation overlay
- Contact section cards
- Floating action buttons

## Accessibility

### Minimum Touch Targets
- 44px × 44px minimum (mobile)
- 40px × 40px for desktop

### Color Contrast
- Text on white: AAA rated (4.5:1+)
- Text on emerald: White or gold for contrast
- All interactive elements clearly distinguishable

### Focus States
- Visible focus rings
- 2px solid gold outline
- 2px offset for clarity

## Component Examples

### Section Header
```html
<div class="section-header">
  <span class="section-tag">Tag Text</span>
  <h2 class="section-title">Main Title</h2>
  <p class="section-subtitle">Supporting text</p>
</div>
```

### Treatment Card
```html
<div class="treatment-card">
  <div class="treatment-icon">Icon</div>
  <h3>Title</h3>
  <p>Description</p>
  <a href="#" class="card-link">Learn more →</a>
</div>
```

## Image Treatment

### Overlays
- Dark gradient for text readability
- 85-90% opacity for balance

### Filters
- Slight warmth for healing aesthetic
- Soft focus backgrounds
- Natural lighting preferred

## Brand Voice

### Visual Personality
- **Royal**: Luxurious, premium, sophisticated
- **Natural**: Earthy, healing, organic
- **Modern**: Clean, minimal, contemporary
- **Trustworthy**: Professional, established, expert

### Design Principles
1. Premium over busy
2. Space creates luxury
3. Animations enhance, not distract
4. Accessibility is non-negotiable
5. Every element serves a purpose

---

**Design System Version**: 1.0  
**Last Updated**: 2025  
**Status**: ✅ Production Ready
