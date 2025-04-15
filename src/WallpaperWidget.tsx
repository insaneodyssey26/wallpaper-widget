import { useState, useEffect, useRef } from 'react'
import './WallpaperWidget.css'

interface Wallpaper {
  id: number
  url: string
  title: string
  thumbnail?: string
}

interface WallpaperCategory {
  id: string
  name: string
  wallpapers: Wallpaper[]
}

// Wallpaper categories with local image paths
const wallpaperCategories: WallpaperCategory[] = [
  {
    id: 'nature',
    name: 'Nature',
    wallpapers: [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1920&h=1080&q=80',
        title: 'Mountain Lake',
        thumbnail: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        url: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Forest Path',
        thumbnail: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 3,
        url: 'https://images.pexels.com/photos/3601094/pexels-photo-3601094.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Tropical Beach',
        thumbnail: 'https://images.pexels.com/photos/3601094/pexels-photo-3601094.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 4,
        url: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Sunset Mountains',
        thumbnail: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 5,
        url: 'https://images.pexels.com/photos/1766838/pexels-photo-1766838.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Misty Forest',
        thumbnail: 'https://images.pexels.com/photos/1766838/pexels-photo-1766838.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 6,
        url: 'https://images.pexels.com/photos/1766839/pexels-photo-1766839.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Autumn Forest',
        thumbnail: 'https://images.pexels.com/photos/1766839/pexels-photo-1766839.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 7,
        url: 'https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Mountain Range',
        thumbnail: 'https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 8,
        url: 'https://images.pexels.com/photos/3601095/pexels-photo-3601095.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Ocean Sunset',
        thumbnail: 'https://images.pexels.com/photos/3601095/pexels-photo-3601095.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 9,
        url: 'https://images.pexels.com/photos/1766837/pexels-photo-1766837.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Forest Stream',
        thumbnail: 'https://images.pexels.com/photos/1766837/pexels-photo-1766837.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 10,
        url: 'https://images.pexels.com/photos/1766836/pexels-photo-1766836.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Autumn Colors',
        thumbnail: 'https://images.pexels.com/photos/1766836/pexels-photo-1766836.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 11,
        url: 'https://images.pexels.com/photos/2387872/pexels-photo-2387872.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Mountain Reflection',
        thumbnail: 'https://images.pexels.com/photos/2387872/pexels-photo-2387872.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 12,
        url: 'https://images.pexels.com/photos/1766835/pexels-photo-1766835.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Green Forest',
        thumbnail: 'https://images.pexels.com/photos/1766835/pexels-photo-1766835.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 13,
        url: 'https://images.pexels.com/photos/3601096/pexels-photo-3601096.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Beach Waves',
        thumbnail: 'https://images.pexels.com/photos/3601096/pexels-photo-3601096.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 14,
        url: 'https://images.pexels.com/photos/2387874/pexels-photo-2387874.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Mountain Vista',
        thumbnail: 'https://images.pexels.com/photos/2387874/pexels-photo-2387874.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 15,
        url: 'https://images.pexels.com/photos/1766834/pexels-photo-1766834.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Forest Path',
        thumbnail: 'https://images.pexels.com/photos/1766834/pexels-photo-1766834.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ]
  },
  {
    id: 'space',
    name: 'Space',
    wallpapers: [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1920&h=1080&q=80',
        title: 'Blue Marble Earth',
        thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1920&h=1080&q=80',
        title: 'Galaxy NGC 1300',
        thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 3,
        url: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=1920&h=1080&q=80',
        title: 'Carina Nebula',
        thumbnail: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 4,
        url: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=1920&h=1080&q=80',
        title: 'Milky Way',
        thumbnail: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 5,
        url: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1920&h=1080&q=80',
        title: 'Hubble Deep Field',
        thumbnail: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 6,
        url: 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Orion Nebula',
        thumbnail: 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 7,
        url: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Galactic Center',
        thumbnail: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 8,
        url: 'https://images.pexels.com/photos/2156/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Eagle Nebula',
        thumbnail: 'https://images.pexels.com/photos/2156/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 9,
        url: 'https://images.pexels.com/photos/1169751/pexels-photo-1169751.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Starry Night',
        thumbnail: 'https://images.pexels.com/photos/1169751/pexels-photo-1169751.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 10,
        url: 'https://images.pexels.com/photos/1169752/pexels-photo-1169752.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Helix Nebula',
        thumbnail: 'https://images.pexels.com/photos/1169752/pexels-photo-1169752.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 11,
        url: 'https://images.pexels.com/photos/1169753/pexels-photo-1169753.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Cosmic Dust',
        thumbnail: 'https://images.pexels.com/photos/1169753/pexels-photo-1169753.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 12,
        url: 'https://images.pexels.com/photos/1169755/pexels-photo-1169755.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Whirlpool Galaxy',
        thumbnail: 'https://images.pexels.com/photos/1169755/pexels-photo-1169755.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 13,
        url: 'https://images.pexels.com/photos/1169756/pexels-photo-1169756.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Space Colors',
        thumbnail: 'https://images.pexels.com/photos/1169756/pexels-photo-1169756.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 14,
        url: 'https://images.pexels.com/photos/1169757/pexels-photo-1169757.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Star Cluster',
        thumbnail: 'https://images.pexels.com/photos/1169757/pexels-photo-1169757.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 15,
        url: 'https://images.pexels.com/photos/1169758/pexels-photo-1169758.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Deep Universe',
        thumbnail: 'https://images.pexels.com/photos/1169758/pexels-photo-1169758.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ]
  },
  {
    id: 'abstract',
    name: 'Abstract',
    wallpapers: [
      {
        id: 1,
        url: 'https://images.pexels.com/photos/325576/pexels-photo-325576.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Abstract Art',
        thumbnail: 'https://images.pexels.com/photos/325576/pexels-photo-325576.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 2,
        url: 'https://images.pexels.com/photos/325577/pexels-photo-325577.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Color Pattern',
        thumbnail: 'https://images.pexels.com/photos/325577/pexels-photo-325577.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 3,
        url: 'https://images.pexels.com/photos/325578/pexels-photo-325578.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Geometric',
        thumbnail: 'https://images.pexels.com/photos/325578/pexels-photo-325578.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 4,
        url: 'https://images.pexels.com/photos/325579/pexels-photo-325579.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Color Flow',
        thumbnail: 'https://images.pexels.com/photos/325579/pexels-photo-325579.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 5,
        url: 'https://images.pexels.com/photos/325580/pexels-photo-325580.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Abstract Waves',
        thumbnail: 'https://images.pexels.com/photos/325580/pexels-photo-325580.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 6,
        url: 'https://images.pexels.com/photos/325581/pexels-photo-325581.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Modern Art',
        thumbnail: 'https://images.pexels.com/photos/325581/pexels-photo-325581.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 7,
        url: 'https://images.pexels.com/photos/325582/pexels-photo-325582.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Abstract Colors',
        thumbnail: 'https://images.pexels.com/photos/325582/pexels-photo-325582.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 8,
        url: 'https://images.pexels.com/photos/325583/pexels-photo-325583.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Color Splash',
        thumbnail: 'https://images.pexels.com/photos/325583/pexels-photo-325583.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 9,
        url: 'https://images.pexels.com/photos/325584/pexels-photo-325584.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Geometric Pattern',
        thumbnail: 'https://images.pexels.com/photos/325584/pexels-photo-325584.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 10,
        url: 'https://images.pexels.com/photos/325585/pexels-photo-325585.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Color Blend',
        thumbnail: 'https://images.pexels.com/photos/325585/pexels-photo-325585.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 11,
        url: 'https://images.pexels.com/photos/325586/pexels-photo-325586.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Abstract Lines',
        thumbnail: 'https://images.pexels.com/photos/325586/pexels-photo-325586.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 12,
        url: 'https://images.pexels.com/photos/325587/pexels-photo-325587.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Modern Abstract',
        thumbnail: 'https://images.pexels.com/photos/325587/pexels-photo-325587.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 13,
        url: 'https://images.pexels.com/photos/325588/pexels-photo-325588.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Color Harmony',
        thumbnail: 'https://images.pexels.com/photos/325588/pexels-photo-325588.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 14,
        url: 'https://images.pexels.com/photos/325589/pexels-photo-325589.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Geometric Art',
        thumbnail: 'https://images.pexels.com/photos/325589/pexels-photo-325589.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 15,
        url: 'https://images.pexels.com/photos/325590/pexels-photo-325590.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        title: 'Abstract Design',
        thumbnail: 'https://images.pexels.com/photos/325590/pexels-photo-325590.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ]
  },
  {
    id: 'videos',
    name: 'Live Wallpapers',
    wallpapers: [
      {
        id: 1,
        url: 'https://cdn.pixabay.com/vimeo/328741711/ocean-24216.mp4?width=1920&hash=f721c7ec8f494e7f9c8c2992d5f27b97a0c3bfb4',
        title: 'Ocean Waves',
        thumbnail: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1920'
      },
      {
        id: 2,
        url: 'https://cdn.pixabay.com/vimeo/414800870/cherry-blossoms-35802.mp4?width=1920&hash=4c3f1e4e42f6e8e01c0f78f503a4d3a2c0d3f9b5',
        title: 'Cherry Blossoms',
        thumbnail: 'https://images.pexels.com/photos/1418595/pexels-photo-1418595.jpeg?auto=compress&cs=tinysrgb&w=1920'
      },
      {
        id: 3,
        url: 'https://cdn.pixabay.com/vimeo/476996920/clouds-50122.mp4?width=1920&hash=7c3f1e4e42f6e8e01c0f78f503a4d3a2c0d3f9b5',
        title: 'Moving Clouds',
        thumbnail: 'https://images.pexels.com/photos/2114014/pexels-photo-2114014.jpeg?auto=compress&cs=tinysrgb&w=1920'
      },
      {
        id: 4,
        url: 'https://cdn.pixabay.com/vimeo/439005057/rain-38569.mp4?width=1920&hash=8c3f1e4e42f6e8e01c0f78f503a4d3a2c0d3f9b5',
        title: 'Rainfall',
        thumbnail: 'https://images.pexels.com/photos/125510/pexels-photo-125510.jpeg?auto=compress&cs=tinysrgb&w=1920'
      },
      {
        id: 5,
        url: 'https://cdn.pixabay.com/vimeo/499162150/aurora-53442.mp4?width=1920&hash=9c3f1e4e42f6e8e01c0f78f503a4d3a2c0d3f9b5',
        title: 'Aurora Borealis',
        thumbnail: 'https://images.pexels.com/photos/2113554/pexels-photo-2113554.jpeg?auto=compress&cs=tinysrgb&w=1920'
      },
      {
        id: 6,
        url: 'https://cdn.pixabay.com/vimeo/384844427/forest-stream-31377.mp4?width=1920&hash=2c3f1e4e42f6e8e01c0f78f503a4d3a2c0d3f9b5',
        title: 'Forest Stream',
        thumbnail: 'https://images.pexels.com/photos/1766838/pexels-photo-1766838.jpeg?auto=compress&cs=tinysrgb&w=1920'
      },
      {
        id: 7,
        url: 'https://cdn.pixabay.com/vimeo/531646844/space-57889.mp4?width=1920&hash=3c3f1e4e42f6e8e01c0f78f503a4d3a2c0d3f9b5',
        title: 'Space Journey',
        thumbnail: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=1920'
      },
      {
        id: 8,
        url: 'https://cdn.pixabay.com/vimeo/404237096/sunset-lake-34455.mp4?width=1920&hash=4c3f1e4e42f6e8e01c0f78f503a4d3a2c0d3f9b5',
        title: 'Sunset Lake',
        thumbnail: 'https://images.pexels.com/photos/1834399/pexels-photo-1834399.jpeg?auto=compress&cs=tinysrgb&w=1920'
      },
      {
        id: 9,
        url: 'https://cdn.pixabay.com/vimeo/446608753/fireplace-39876.mp4?width=1920&hash=5c3f1e4e42f6e8e01c0f78f503a4d3a2c0d3f9b5',
        title: 'Cozy Fireplace',
        thumbnail: 'https://images.pexels.com/photos/1749/fire-orange-emergency-burning.jpg?auto=compress&cs=tinysrgb&w=1920'
      },
      {
        id: 10,
        url: 'https://cdn.pixabay.com/vimeo/392898142/tropical-beach-32455.mp4?width=1920&hash=6c3f1e4e42f6e8e01c0f78f503a4d3a2c0d3f9b5',
        title: 'Tropical Beach',
        thumbnail: 'https://images.pexels.com/photos/1021073/pexels-photo-1021073.jpeg?auto=compress&cs=tinysrgb&w=1920'
      },
      {
        id: 11,
        url: 'https://cdn.pixabay.com/vimeo/473859094/meadow-49755.mp4?width=1920&hash=7c3f1e4e42f6e8e01c0f78f503a4d3a2c0d3f9b5',
        title: 'Windswept Meadow',
        thumbnail: 'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1920'
      },
      {
        id: 12,
        url: 'https://cdn.pixabay.com/vimeo/454563094/ink-flow-41234.mp4?width=1920&hash=8c3f1e4e42f6e8e01c0f78f503a4d3a2c0d3f9b5',
        title: 'Ink Flow',
        thumbnail: 'https://images.pexels.com/photos/3699259/pexels-photo-3699259.jpeg?auto=compress&cs=tinysrgb&w=1920'
      },
      {
        id: 13,
        url: 'https://cdn.pixabay.com/vimeo/492837150/snowfall-52455.mp4?width=1920&hash=9c3f1e4e42f6e8e01c0f78f503a4d3a2c0d3f9b5',
        title: 'Snowfall',
        thumbnail: 'https://images.pexels.com/photos/688660/pexels-photo-688660.jpeg?auto=compress&cs=tinysrgb&w=1920'
      },
      {
        id: 14,
        url: 'https://cdn.pixabay.com/vimeo/465892094/city-lights-44566.mp4?width=1920&hash=1c3f1e4e42f6e8e01c0f78f503a4d3a2c0d3f9b5',
        title: 'City Lights',
        thumbnail: 'https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?auto=compress&cs=tinysrgb&w=1920'
      },
      {
        id: 15,
        url: 'https://cdn.pixabay.com/vimeo/484563094/autumn-51234.mp4?width=1920&hash=2c3f1e4e42f6e8e01c0f78f503a4d3a2c0d3f9b5',
        title: 'Autumn Leaves',
        thumbnail: 'https://images.pexels.com/photos/1808329/pexels-photo-1808329.jpeg?auto=compress&cs=tinysrgb&w=1920'
      }
    ]
  }
]

const WallpaperWidget: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 140, y: window.innerHeight / 2 - 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [hasDragged, setHasDragged] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [showDragHandle, setShowDragHandle] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentWallpaperIndex, setCurrentWallpaperIndex] = useState(0)
  const [categoryWallpaperIndices, setCategoryWallpaperIndices] = useState<Record<string, number>>({})
  const wallpapersPerPage = 2
  const widgetRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const dragStartPos = useRef({ x: 0, y: 0 })
  const widgetStartPos = useRef({ x: 0, y: 0 })
  const proximityTimeout = useRef<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null)

  // Apply default wallpaper on mount
  useEffect(() => {
    const defaultCategory = wallpaperCategories[0] // Nature category
    const defaultWallpaper = defaultCategory.wallpapers[0]
    setSelectedCategory(defaultCategory.id)
    setSelectedWallpaper(defaultWallpaper)
    applyWallpaper(defaultWallpaper.url)
  }, [])

  const applyWallpaper = (url: string) => {
    // Remove any existing video elements
    const existingVideo = document.querySelector('.wallpaper-video') as HTMLVideoElement;
    if (existingVideo) {
      existingVideo.remove();
    }

    if (url.includes('.mp4')) {
      // Create and configure video element
      const video = document.createElement('video');
      video.className = 'wallpaper-video';
      video.src = url;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.style.position = 'fixed';
      video.style.right = '0';
      video.style.bottom = '0';
      video.style.minWidth = '100%';
      video.style.minHeight = '100%';
      video.style.width = 'auto';
      video.style.height = 'auto';
      video.style.zIndex = '-1';
      video.style.objectFit = 'cover';
      video.style.transition = 'opacity 0.5s ease-in-out';

      // Add video to body
      document.body.appendChild(video);

      // Clear any existing background
      document.body.style.backgroundImage = '';

      // Ensure video starts playing
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Error playing video:', error);
        });
      }
    } else {
      // Handle image wallpapers
      document.body.style.backgroundImage = `url(${url})`;
    }
  };

  const currentCategory = wallpaperCategories.find(cat => cat.id === selectedCategory)
  const totalPages = currentCategory ? Math.ceil(currentCategory.wallpapers.length / wallpapersPerPage) : 1
  const totalWallpapers = currentCategory ? currentCategory.wallpapers.length : 0

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleWallpaperChange = (direction: 'prev' | 'next', categoryId?: string) => {
    if (!currentCategory) return;

    setIsTransitioning(true);

    // If a specific category is provided, use that instead of the current category
    const targetCategory = categoryId
      ? wallpaperCategories.find(cat => cat.id === categoryId)
      : currentCategory;

    if (!targetCategory) return;

    const totalWallpapers = targetCategory.wallpapers.length;
    const currentIndex = categoryId
      ? (categoryWallpaperIndices[categoryId] || 0)
      : currentWallpaperIndex;

    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % totalWallpapers;
    } else {
      newIndex = (currentIndex - 1 + totalWallpapers) % totalWallpapers;
    }

    if (categoryId) {
      // Update the index for the specific category
      setCategoryWallpaperIndices(prev => ({
        ...prev,
        [categoryId]: newIndex
      }));

      // Update the wallpaper if this is the current category
      if (categoryId === selectedCategory) {
        setCurrentWallpaperIndex(newIndex);
        const newWallpaper = targetCategory.wallpapers[newIndex];
        setSelectedWallpaper(newWallpaper);
        applyWallpaper(newWallpaper.url);
      }
    } else {
      // Update the current wallpaper index
      setCurrentWallpaperIndex(newIndex);
      const newWallpaper = targetCategory.wallpapers[newIndex];
      setSelectedWallpaper(newWallpaper);
      applyWallpaper(newWallpaper.url);
    }

    setTimeout(() => setIsTransitioning(false), 500);
  }

  const getCurrentPageWallpapers = () => {
    if (!currentCategory) return []
    const startIndex = (currentPage - 1) * wallpapersPerPage
    return currentCategory.wallpapers.slice(startIndex, startIndex + wallpapersPerPage)
  }

  const shuffleWallpaper = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const randomCategory = wallpaperCategories[Math.floor(Math.random() * wallpaperCategories.length)];
    const randomWallpaper = randomCategory.wallpapers[Math.floor(Math.random() * randomCategory.wallpapers.length)];
    setSelectedCategory(randomCategory.id);
    setSelectedWallpaper(randomWallpaper);
    applyWallpaper(randomWallpaper.url);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Handle mouse move for proximity detection
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const dx = e.clientX - dragStartPos.current.x
      const dy = e.clientY - dragStartPos.current.y

      const newX = widgetStartPos.current.x + dx
      const newY = widgetStartPos.current.y + dy

      // Update position directly for smooth dragging
      setPosition({ x: newX, y: newY })

      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        setHasDragged(true)
      }
    }
  }

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false)
    }
  }

  // Handle click outside to close expanded widget
  const handleClickOutside = (event: MouseEvent) => {
    if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
      setIsExpanded(false)
    }
  }

  // Set up event listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDragging, isExpanded])

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isExpanded && !isAnimating && !hasDragged) {
      setIsAnimating(true)
      setIsExpanded(true)
      setTimeout(() => setIsAnimating(false), 300)
    }
    setHasDragged(false)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    // Check if the click is on the drag handle
    const target = e.target as HTMLElement
    const isDragHandle = target.closest('.drag-handle-new')

    // Allow dragging from the drag handle or the entire widget in compact mode
    if (isDragHandle || !isExpanded) {
      e.preventDefault()
      setIsDragging(true)
      setHasDragged(false)

      dragStartPos.current = { x: e.clientX, y: e.clientY }
      widgetStartPos.current = { x: position.x, y: position.y }
      return
    }

    // For expanded mode, only allow dragging from the top area
    const isTopArea = target.closest('.widget-header') ||
      target.closest('.current-category') ||
      target.closest('.current-wallpaper-preview')

    if (isTopArea) {
      e.preventDefault()
      setIsDragging(true)
      setHasDragged(false)

      dragStartPos.current = { x: e.clientX, y: e.clientY }
      widgetStartPos.current = { x: position.x, y: position.y }
    }
  }

  const handleWallpaperSelect = (wallpaper: Wallpaper) => {
    if (!wallpaper) return;
    setSelectedWallpaper(wallpaper);
    applyWallpaper(wallpaper.url);
    setIsExpanded(false);
  }

  const handleWallpaperHover = (url: string) => {
    if (url.includes('.mp4')) {
      const previewVideo = document.createElement('video');
      previewVideo.className = 'wallpaper-preview-video';
      previewVideo.src = url;
      previewVideo.autoplay = true;
      previewVideo.loop = true;
      previewVideo.muted = true;
      previewVideo.playsInline = true;
      previewVideo.style.width = '100%';
      previewVideo.style.height = '100%';
      previewVideo.style.objectFit = 'cover';
      previewVideo.style.position = 'absolute';
      previewVideo.style.top = '0';
      previewVideo.style.left = '0';
      previewVideo.style.zIndex = '1';

      const container = document.querySelector('.wallpaper-preview-container');
      if (container) {
        container.appendChild(previewVideo);
      }
    }
  }

  const handleWallpaperLeave = () => {
    const previewVideo = document.querySelector('.wallpaper-preview-video');
    if (previewVideo) {
      previewVideo.remove();
    }
  }

  const handleCategorySelect = (categoryId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    // Get the current index for this category
    const currentIndex = categoryWallpaperIndices[categoryId] || 0;

    // Find the category and the wallpaper at the current index
    const category = wallpaperCategories.find(cat => cat.id === categoryId);
    if (category) {
      const wallpaper = category.wallpapers[currentIndex];

      // Update the selected category and wallpaper
      setSelectedCategory(categoryId);
      setSelectedWallpaper(wallpaper);
      setCurrentWallpaperIndex(currentIndex);

      // Apply the wallpaper to the background
      applyWallpaper(wallpaper.url);

      // Reset to first page
      setCurrentPage(1);
    }
  }

  return (
    <div
      ref={widgetRef}
      className={`wallpaper-widget ${isExpanded ? 'expanded' : 'compact'} ${isTransitioning ? 'transitioning' : ''}`}
      onClick={handleExpand}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => {
        setIsHovering(true)
      }}
      onMouseLeave={() => {
        setIsHovering(false)
      }}
      style={{
        transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'default',
        transition: isDragging ? 'none' : 'all 0.2s ease'
      }}
    >
      {/* New drag handle */}
      <div className="drag-handle-new">
        <div className="drag-handle-indicator"></div>
      </div>

      {!isExpanded ? (
        <div className="compact-content">
          <div className="compact-wallpaper-preview">
            <img src={selectedWallpaper?.thumbnail || selectedWallpaper?.url} alt={selectedWallpaper?.title} />
            <div className="compact-overlay">
              <span className="compact-category">{currentCategory?.name}</span>
            </div>
          </div>
          <div className="compact-navigation">
            <button
              className="nav-button prev-button"
              onClick={(e) => {
                e.stopPropagation();
                handleWallpaperChange('prev');
              }}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className="nav-button next-button"
              onClick={(e) => {
                e.stopPropagation();
                handleWallpaperChange('next');
              }}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
          <button
            className="shuffle-button-new"
            onClick={(e) => {
              e.stopPropagation();
              shuffleWallpaper();
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <path d="M3.3 7l8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
          </button>
        </div>
      ) : (
        <>
          <div className="widget-header">
            <h2>Wallpaper</h2>
          </div>

          <div className="current-category">
            <h3>{currentCategory?.name}</h3>
          </div>

          <div className="current-wallpaper-preview">
            <img src={selectedWallpaper?.thumbnail || selectedWallpaper?.url} alt={selectedWallpaper?.title} />
            <div className="current-wallpaper-overlay">
            </div>
          </div>

          <div className="collections-section">
            <h3>Collections</h3>
            <div className="categories-list">
              {wallpaperCategories.map(category => (
                <div
                  key={category.id}
                  className={`category-preview ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={(e) => handleCategorySelect(category.id, e)}
                >
                  <div className="category-preview-image">
                    <img
                      src={category.wallpapers[categoryWallpaperIndices[category.id] || 0]?.thumbnail ||
                        category.wallpapers[categoryWallpaperIndices[category.id] || 0]?.url}
                      alt={category.name}
                    />
                  </div>
                  <div className="category-preview-overlay">
                    <span className="category-preview-name">{category.name}</span>
                  </div>
                  <div className="category-navigation">
                    <button
                      className="nav-button prev-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWallpaperChange('prev', category.id);
                      }}
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    <button
                      className="nav-button next-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWallpaperChange('next', category.id);
                      }}
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default WallpaperWidget 