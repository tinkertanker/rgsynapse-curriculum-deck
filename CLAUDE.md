# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a web-based presentation deck for the RGSynapse Tier 1 Programme by Tinkercademy. It's a single-page application that displays a series of slides about a comprehensive computational thinking curriculum for Raffles Girls' School.

## Architecture

### File Structure
- `index.html` - Main HTML structure containing all 14 presentation slides
- `app.js` - JavaScript controller that manages slide navigation and interactions
- `style.css` - Complete styling using Perplexity's design system with custom presentation styles

### Key Components

**PresentationController (app.js)**
- Manages slide transitions with smooth animations
- Handles keyboard navigation (arrow keys, Home, End)
- Supports touch gestures for mobile devices
- Implements dot navigation for quick slide access
- Updates progress text and button states dynamically

**Slide System**
- 14 slides total, each with `data-index` attribute
- Active slide has `.active` class
- Transition states: `.prev` and `.next` classes for animation
- Slides positioned absolutely for smooth transitions

**Design System**
- Uses Perplexity's design system CSS variables
- Supports both light and dark themes via CSS custom properties
- Responsive design with mobile-specific adjustments
- Accessible with proper ARIA labels and keyboard navigation

## Development Commands

This is a static website with no build process required. To run:
```bash
# Open directly in browser
open index.html

# Or use a simple HTTP server
python -m http.server 8000
# Then visit http://localhost:8000
```

## Key Interaction Patterns

1. **Navigation Methods**:
   - Previous/Next buttons
   - Keyboard arrows (←/→)
   - Home/End keys for first/last slide
   - Dot navigation clicks
   - Touch swipe gestures

2. **State Management**:
   - `currentSlide` index tracks position
   - CSS classes control visibility and transitions
   - Button states update based on slide position

3. **Responsive Behavior**:
   - Timeline switches from horizontal to vertical on mobile
   - Grid layouts collapse to single column
   - Controls adapt to smaller screens

## CSS Architecture

The design system is comprehensive with:
- CSS custom properties for theming
- Light/dark mode support
- Utility classes for layout (flex, gap, padding)
- Component styles (buttons, cards, status indicators)
- Presentation-specific overrides

## Notes

- No external dependencies or frameworks
- All animations use CSS transitions for performance
- Touch events have minimum swipe distance threshold (50px)
- Slide transitions clean up after 250ms to prevent layout issues