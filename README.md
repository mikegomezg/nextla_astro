# Nextla - Free to be Found

Nextla is a narrative world where AI management meets human psychology, set in the corporate city-state of Mirador in 2075.

## Implementation Changes

The site has been updated with the following changes:

1. **Diagonal Design Style**:
   - Hero section now features a diagonal split background
   - Improved typography for better readability and visual interest

2. **Navigation**:
   - Replaced static navbar with a hamburger menu
   - Full-screen overlay navigation for a more modern look

3. **Character Showcase**:
   - Horizontally scrollable display with square images
   - Scroll indicators and arrow controls
   - Feather motif integration for brand consistency

4. **Typography System**:
   - Enhanced display text classes
   - Gradient text options
   - Responsive font sizing

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm run dev
   ```

## Character Images Setup

For the character showcase to display images properly, you need to:

1. Create the character images directory:
   ```
   mkdir -p public/assets/characters
   ```

2. Add square character images to this directory with the following filenames:
   - `silas-square.jpg`
   - `nova-square.jpg`
   - `victoria-square.jpg`
   - `enrique-square.jpg`

3. If images are not available, the system will display the first letter of each character's name as a fallback.

## File Structure

The main components modified:

- `src/components/global/Header.astro` - New hamburger menu implementation
- `src/components/home/HeroSection.astro` - Diagonal style with "Free to be found" tagline
- `src/components/home/ParallaxReveal.astro` - Improved parallax effect
- `src/components/home/CharacterShowcase.astro` - Horizontal scrolling character cards
- `src/styles/typography.css` - New typography system
- `src/styles/global.css` - Added diagonal section styling and other enhancements

## Browser Compatibility

The implementation works across modern browsers:
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile-responsive design
- Performance optimizations for animations