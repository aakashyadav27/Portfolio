# Aakash Yadav - AI Engineer Portfolio

An interactive 3D portfolio website featuring a retro Windows XP aesthetic, built with Next.js and React Three Fiber.

![Portfolio Preview](public/windows_xp_boot_screen_animation_in_hd_by_lukeinatordude_db6dw1k.gif)

## Features

- **Interactive 3D Scene**: Watch an animated character walk to a desk and start typing
- **Windows XP Theme**: Nostalgic retro OS interface with functional windows and taskbar
- **Dance Mode**: Click "Dance Break" to see the character bust some moves
- **Responsive Design**: Optimized camera angles for both desktop and mobile
- **Performance Optimized**: 96% reduction in 3D asset sizes using Draco compression

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **3D Graphics**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [Three.js](https://threejs.org/)
- **3D Utilities**: [@react-three/drei](https://github.com/pmndrs/drei) for loaders, controls, and helpers
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Project Structure

```
src/
├── app/                    # Next.js App Router
├── components/
│   ├── 3d/                 # Three.js components
│   │   ├── Scene.tsx       # Main 3D scene (original)
│   │   ├── SceneOptimized.tsx    # Optimized 3D scene (in use)
│   │   ├── AnimatedCharacter.tsx # Character with FBX animations
│   │   ├── AnimatedCharacterOptimized.tsx # Character with GLB (in use)
│   │   ├── DeskModel.tsx   # Office environment (original)
│   │   └── DeskModelOptimized.tsx # Compressed office (in use)
│   ├── hero/               # Hero section with loading screen
│   ├── os/                 # Windows XP desktop components
│   └── ui/                 # shadcn/ui components
public/
└── models/                 # 3D assets
    ├── *_hq.glb            # Optimized GLB files (in use)
    ├── *_compressed.glb    # Compressed office model (in use)
    └── *.fbx               # Original FBX files (preserved)
```

## 3D Assets

### Optimized Assets (Currently in Use)
| File | Size | Description |
|------|------|-------------|
| `Walking_hq.glb` | 1.1 MB | Walking animation |
| `SitToType_hq.glb` | 1.2 MB | Sit down animation |
| `Typing_hq.glb` | 1.6 MB | Typing animation |
| `Wave Hip Hop Dance_hq.glb` | 2.0 MB | Dance animation |
| `90s_retro_office_pack_compressed.glb` | 3.4 MB | Office environment |

### Original Assets (Preserved for Reference)
| File | Size | Description |
|------|------|-------------|
| `Walking.fbx` | 52 MB | Original walking animation |
| `SitToType.fbx` | 52 MB | Original sit animation |
| `Typing.fbx` | 53 MB | Original typing animation |
| `Wave Hip Hop Dance.fbx` | 53 MB | Original dance animation |
| `90s_retro_office_pack.glb` | 25 MB | Original office model |

**Total reduction: ~235 MB → ~9.3 MB (96% smaller)**

## Performance

The 3D assets were optimized using Blender with:
- **Draco compression** for mesh geometry
- **WebP textures** downscaled to 1024px
- **GLB format** for efficient web delivery

| Metric | Before | After |
|--------|--------|-------|
| LCP (cached) | ~4.4s | ~1.7s |
| LCP (fresh) | N/A | ~2.2s |
| Asset Size | 235 MB | 9.3 MB |

## Configuration

To switch between optimized and original assets, edit `src/components/hero/Hero.tsx`:

```typescript
// Set to true for optimized assets (default)
// Set to false to use original FBX files
const USE_OPTIMIZED_ASSETS = true;
```

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

The project is optimized for Vercel deployment with automatic static optimization.

### Other Platforms

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Credits

- 3D Character Animations: [Mixamo](https://www.mixamo.com/)
- Office Model: [90s Retro Office Pack](https://sketchfab.com/)
- Windows XP Assets: Various retro computing resources

## License

MIT License - Feel free to use this as inspiration for your own portfolio!

---

Built with by Aakash Yadav
