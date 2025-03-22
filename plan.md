Outlines the implementation approach for creating the Nextla website using Astro, focusing on brand identity integration, color system implementation, and initial project setup.

# Nextla Astro Site Implementation Plan

## Implementation Overview

This plan describes how to implement the Nextla website using Astro, with a focus on establishing the brand identity through a robust color system, typography, and initial project structure. The implementation will create a foundation that blends Mesoamerican-inspired design elements with modern enterprise software aesthetics, supporting both narrative content and technical documentation.

## High-Level Architecture

The implementation will follow Astro's content-focused architecture with these key components:

- A design system with Tailwind CSS for implementing the Nextla color palette
- Content collections for organizing different types of information
- Reusable components for consistent user interface elements
- Layouts that support both documentation and narrative content formats
- Static assets for brand identity elements and illustrations

## Key Integration Points

### New Files to Create

1. `astro.config.mjs`
   - Configure Astro with Tailwind CSS integration
   - Set up content collections for documentation and story content
   - Configure Markdown processing options

2. `tailwind.config.cjs`
   - Define custom color system based on Nextla brand identity
   - Configure typography settings for brand-specific fonts
   - Set up design tokens for spacing, shadows, and other visual elements

3. `src/layouts/BaseLayout.astro`
   - Create main layout wrapper with consistent header and footer
   - Establish responsive grid system
   - Implement common navigation elements

4. `src/components/ColorSystem.astro`
   - Component to display and document the color system
   - Include color swatches with hex values and usage guidelines
   - Showcase color combinations for UI elements

5. `src/pages/index.astro`
   - Landing page introducing the Nextla concept
   - Showcase brand identity elements
   - Provide navigation to documentation and narrative sections

6. `src/content/config.ts`
   - Define schema for documentation and narrative content
   - Set up frontmatter validation for content organization
   - Configure content relationships and cross-referencing

### Project Structure

```
nextla-site/
├── src/
│   ├── components/       # Reusable UI elements
│   ├── content/          # Markdown content collections
│   │   ├── docs/         # Technical documentation
│   │   └── narrative/    # Story content and excerpts
│   ├── layouts/          # Page templates
│   ├── pages/            # Route definitions
│   └── styles/           # Global CSS and variables
├── public/               # Static assets
│   ├── fonts/            # Typography resources
│   └── images/           # Brand imagery and icons
└── package.json          # Project dependencies
```

## Implementation Details

### Color System Implementation

Create a comprehensive color system in Tailwind with the Nextla brand colors:

```javascript
// tailwind.config.cjs
module.exports = {
  theme: {
    extend: {
      colors: {
        // Primary colors (Navy)
        primary: {
          100: '#E8E8F0', // Very light navy
          200: '#C5C7E0', // Light navy
          300: '#9A9DCE', // Lighter navy
          400: '#2A34A4', // Light navy
          500: '#1A237E', // Deep Navy (primary brand color)
          600: '#151B69', // Darker navy
          700: '#10144F', // Even darker navy
          800: '#0A0C35', // Very dark navy
          900: '#05061A', // Nearly black navy
        },
        
        // Secondary colors (Jade Green)
        secondary: {
          100: '#E6F0EC', // Very light green
          200: '#C2DBD1', // Light green
          300: '#9BC3B5', // Lighter green
          400: '#37865F', // Light green
          500: '#2E6E4E', // Jade Green (secondary brand color)
          600: '#255A3F', // Darker green
          700: '#1C4330', // Even darker green
          800: '#132D20', // Very dark green
          900: '#091610', // Nearly black green
        },
        
        // Accent colors (Earthy Red)
        accent: {
          100: '#F5E9E7', // Very light red
          200: '#E6C9C5', // Light red
          300: '#D6A6A0', // Lighter red
          400: '#C24B3A', // Light red
          500: '#A63D2F', // Earthy Red (accent color)
          600: '#8A3327', // Darker red
          700: '#6F281F', // Even darker red
          800: '#4D1C15', // Very dark red
          900: '#2A0F0B', // Nearly black red
        },
        
        // Neutral colors
        neutral: {
          100: '#F5F5F5', // Warm White
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#1A1A1A', // Rich Black
        },
        
        // Additional utility colors
        alert: '#FFC107', // Alert Amber
        success: '#4CAF50', // Success Green
      }
    }
  }
}
```

### Typography Implementation

Set up the typography system with recommended fonts:

```javascript
// tailwind.config.cjs - additional configuration
module.exports = {
  theme: {
    extend: {
      // ...colors defined above
      fontFamily: {
        heading: ['Euclid Circular', 'system-ui', 'sans-serif'],
        body: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        // Custom font size scale
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        bold: 700,
      },
    }
  }
}
```

### Base Layout Implementation

Create a foundational layout component that implements the brand identity:

```astro
// src/layouts/BaseLayout.astro
---
const { title, description } = Astro.props;
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title} | Nextla</title>
    <meta name="description" content={description} />
    <link rel="icon" href="/favicon.ico" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;700&family=JetBrains+Mono&display=swap" />
  </head>
  <body class="bg-neutral-100 text-neutral-900 font-body">
    <header class="bg-primary-500 text-white">
      <!-- Header content -->
    </header>
    
    <main>
      <slot />
    </main>
    
    <footer class="bg-neutral-900 text-neutral-100">
      <!-- Footer content -->
    </footer>
  </body>
</html>
```

### Color System Documentation Component

Create a component to showcase the color system:

```astro
// src/components/ColorSystem.astro
---
const colorCategories = [
  {
    name: 'Primary (Deep Navy)',
    description: 'Used for primary elements, main navigation, and key UI components',
    colors: [
      { name: '100', value: '#E8E8F0' },
      { name: '200', value: '#C5C7E0' },
      { name: '300', value: '#9A9DCE' },
      { name: '400', value: '#2A34A4' },
      { name: '500', value: '#1A237E' },
      { name: '600', value: '#151B69' },
      { name: '700', value: '#10144F' },
      { name: '800', value: '#0A0C35' },
      { name: '900', value: '#05061A' },
    ]
  },
  // Secondary and Accent color categories follow same pattern
];
---

<section class="max-w-4xl mx-auto py-12">
  <h2 class="text-2xl font-heading font-medium mb-8">Nextla Color System</h2>
  
  {colorCategories.map(category => (
    <div class="mb-12">
      <h3 class="text-xl font-heading mb-2">{category.name}</h3>
      <p class="mb-4">{category.description}</p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {category.colors.map(color => (
          <div class="flex items-center">
            <div class="w-16 h-16 rounded mr-4" style={`background-color: ${color.value}`}></div>
            <div>
              <div class="font-mono text-sm">{color.value}</div>
              <div class="text-neutral-500">{category.name.split(' ')[0].toLowerCase()}-{color.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}
</section>
```

## Configuration Approach

### Package.json Dependencies

Key dependencies to include:

```json
{
  "dependencies": {
    "astro": "^4.3.2",
    "@astrojs/tailwind": "^5.1.0",
    "tailwindcss": "^3.4.1"
  },
  "devDependencies": {
    "typescript": "^5.3.3"
  }
}
```

### Astro Configuration

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  site: 'https://nextla.net',
  outDir: './dist',
});
```

## Code Consolidation

As this is an initial implementation, code consolidation isn't applicable yet. However, prepare for future consolidation by:

- Creating a component library for UI elements
- Establishing design tokens for consistent styling
- Implementing utility functions for common operations
- Setting up content organization patterns that can scale

## Next Steps

After implementing this foundation:

1. Develop the Nextla logomark and integrate it into the header
2. Create the main navigation structure
3. Implement the first documentation pages
4. Design and build UI components for interactive elements
5. Create templates for different content types
6. Implement responsive design for mobile devices
7. Add interactive elements to showcase the attention management concept
8. Develop the integration between narrative content and technical documentation

## Implementation Plan Usage Notes

When using this implementation plan:

1. **Configuration Management**: The color system is centralized in the Tailwind configuration for consistent application across the site.

2. **Execution Approach**: The project can be initialized with `npm create astro@latest` followed by installing the dependencies and implementing the files as described.

3. **Code Organization**: The project structure follows Astro's content-focused architecture with clear separation of components, layouts, and content.

4. **Error Handling**: Implement progressive enhancement to ensure content is accessible even if JavaScript fails.

5. **Maintainability**: The design token approach for colors and typography ensures consistent application of the brand identity throughout the site.