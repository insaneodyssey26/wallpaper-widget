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
        url: 'https://images.nasa.gov/images/earth_blue_marble.jpg',
        title: 'Blue Marble',
        thumbnail: 'https://images.nasa.gov/images/earth_blue_marble.jpg'
      },
      {
        id: 2,
        url: 'https://images.nasa.gov/images/galaxy_ngc_1300.jpg',
        title: 'Galaxy NGC 1300',
        thumbnail: 'https://images.nasa.gov/images/galaxy_ngc_1300.jpg'
      },
      {
        id: 3,
        url: 'https://images.nasa.gov/images/nebula_carina.jpg',
        title: 'Carina Nebula',
        thumbnail: 'https://images.nasa.gov/images/nebula_carina.jpg'
      },
      {
        id: 4,
        url: 'https://images.nasa.gov/images/milky_way.jpg',
        title: 'Milky Way',
        thumbnail: 'https://images.nasa.gov/images/milky_way.jpg'
      },
      {
        id: 5,
        url: 'https://images.nasa.gov/images/deep_field.jpg',
        title: 'Hubble Deep Field',
        thumbnail: 'https://images.nasa.gov/images/deep_field.jpg'
      },
      {
        id: 6,
        url: 'https://images.nasa.gov/images/orion_nebula.jpg',
        title: 'Orion Nebula',
        thumbnail: 'https://images.nasa.gov/images/orion_nebula.jpg'
      },
      {
        id: 7,
        url: 'https://images.nasa.gov/images/galactic_center.jpg',
        title: 'Galactic Center',
        thumbnail: 'https://images.nasa.gov/images/galactic_center.jpg'
      },
      {
        id: 8,
        url: 'https://images.nasa.gov/images/nebula_eagle.jpg',
        title: 'Eagle Nebula',
        thumbnail: 'https://images.nasa.gov/images/nebula_eagle.jpg'
      },
      {
        id: 9,
        url: 'https://images.nasa.gov/images/stars_night_sky.jpg',
        title: 'Starry Night',
        thumbnail: 'https://images.nasa.gov/images/stars_night_sky.jpg'
      },
      {
        id: 10,
        url: 'https://images.nasa.gov/images/nebula_helix.jpg',
        title: 'Helix Nebula',
        thumbnail: 'https://images.nasa.gov/images/nebula_helix.jpg'
      },
      {
        id: 11,
        url: 'https://images.nasa.gov/images/cosmic_dust.jpg',
        title: 'Cosmic Dust',
        thumbnail: 'https://images.nasa.gov/images/cosmic_dust.jpg'
      },
      {
        id: 12,
        url: 'https://images.nasa.gov/images/galaxy_whirlpool.jpg',
        title: 'Whirlpool Galaxy',
        thumbnail: 'https://images.nasa.gov/images/galaxy_whirlpool.jpg'
      },
      {
        id: 13,
        url: 'https://images.nasa.gov/images/space_colors.jpg',
        title: 'Space Colors',
        thumbnail: 'https://images.nasa.gov/images/space_colors.jpg'
      },
      {
        id: 14,
        url: 'https://images.nasa.gov/images/star_cluster.jpg',
        title: 'Star Cluster',
        thumbnail: 'https://images.nasa.gov/images/star_cluster.jpg'
      },
      {
        id: 15,
        url: 'https://images.nasa.gov/images/deep_universe.jpg',
        title: 'Deep Universe',
        thumbnail: 'https://images.nasa.gov/images/deep_universe.jpg'
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
  }
]

const WallpaperWidget: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 150, y: window.innerHeight / 2 - 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [hasDragged, setHasDragged] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [showDragHandle, setShowDragHandle] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const wallpapersPerPage = 3
  const widgetRef = useRef<HTMLDivElement>(null)
  const dragStartPos = useRef({ x: 0, y: 0 })
  const widgetStartPos = useRef({ x: 0, y: 0 })
  const proximityTimeout = useRef<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Apply default wallpaper on mount
  useEffect(() => {
    const defaultCategory = wallpaperCategories[0] // Nature category
    const defaultWallpaper = defaultCategory.wallpapers[0]
    setSelectedCategory(defaultCategory.id)
    setSelectedWallpaper(defaultWallpaper)
    document.body.style.backgroundImage = `url(${defaultWallpaper.url})`
  }, [])

  const currentCategory = wallpaperCategories.find(cat => cat.id === selectedCategory)
  const totalPages = currentCategory ? Math.ceil(currentCategory.wallpapers.length / wallpapersPerPage) : 1

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
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
    document.body.style.backgroundImage = `url(${randomWallpaper.url})`;
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
    } else if (widgetRef.current) {
      // Check if mouse is within proximity of the widget
      const rect = widgetRef.current.getBoundingClientRect()
      const proximityDistance = 50 // pixels
      
      const isNearWidget = 
        e.clientX >= rect.left - proximityDistance &&
        e.clientX <= rect.right + proximityDistance &&
        e.clientY >= rect.top - proximityDistance &&
        e.clientY <= rect.bottom + proximityDistance
      
      if (isNearWidget) {
        setShowDragHandle(true)
        
        // Clear any existing timeout
        if (proximityTimeout.current !== null) {
          window.clearTimeout(proximityTimeout.current)
          proximityTimeout.current = null
        }
      } else if (!isHovering) {
        // Set a timeout to hide the drag handle if not hovering
        proximityTimeout.current = window.setTimeout(() => {
          setShowDragHandle(false)
        }, 500)
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
  }, [isDragging])

  const handleExpand = () => {
    if (!isExpanded && !isAnimating && !hasDragged) {
      setIsAnimating(true)
      setIsExpanded(true)
      setTimeout(() => setIsAnimating(false), 300)
    }
    setHasDragged(false)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only allow dragging from the drag handle
    const target = e.target as HTMLElement
    const isDragHandle = target.className === 'drag-handle' || target.closest('.drag-handle')
    
    if (isDragHandle) {
      e.preventDefault()
      setIsDragging(true)
      setHasDragged(false)
      
      dragStartPos.current = { x: e.clientX, y: e.clientY }
      widgetStartPos.current = { x: position.x, y: position.y }
    }
  }

  const handleWallpaperSelect = (wallpaper: typeof selectedWallpaper) => {
    if (!wallpaper) return;
    setSelectedWallpaper(wallpaper);
    document.body.style.backgroundImage = `url(${wallpaper.url})`;
    setIsExpanded(false);
  }


  return (
    <div 
      ref={widgetRef}
      className={`wallpaper-widget ${isExpanded ? 'expanded' : 'compact'} ${isTransitioning ? 'transitioning' : ''}`}
      onClick={handleExpand}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => {
        setIsHovering(true)
        setShowDragHandle(true)
        
        // Clear any existing timeout
        if (proximityTimeout.current !== null) {
          window.clearTimeout(proximityTimeout.current)
          proximityTimeout.current = null
        }
      }}
      onMouseLeave={() => {
        setIsHovering(false)
        
        // Set a timeout to hide the drag handle
        proximityTimeout.current = window.setTimeout(() => {
          setShowDragHandle(false)
        }, 500)
      }}
      style={{
        transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'default',
        transition: isDragging ? 'none' : 'all 0.2s ease'
      }}
    >
      {showDragHandle && (
        <div className="drag-handle">
          <div className="drag-handle-icon"></div>
        </div>
      )}
      
      {!isExpanded ? (
        <div className="compact-content">
          <div className="current-wallpaper">
            <img src={selectedWallpaper?.thumbnail || selectedWallpaper?.url} alt={selectedWallpaper?.title} />
          </div>
          <div className="wallpaper-info">
            <span className="category-name">{currentCategory?.name}</span>
            <span className="wallpaper-title">{selectedWallpaper?.title}</span>
          </div>
          <button className="shuffle-button" onClick={shuffleWallpaper}>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
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
          <div className="categories-tabs">
            {wallpaperCategories.map(category => (
              <button
                key={category.id}
                className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedCategory(category.id)
                  setCurrentPage(1)
                }}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="wallpapers-grid">
            {getCurrentPageWallpapers().map(wallpaper => (
              <div
                key={wallpaper.id}
                className="wallpaper-item"
                onClick={(e) => {
                  e.stopPropagation()
                  handleWallpaperSelect(wallpaper)
                }}
              >
                <img src={wallpaper.thumbnail || wallpaper.url} alt={wallpaper.title} />
                <div className="wallpaper-overlay">
                  <span>{wallpaper.title}</span>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="page-button"
                onClick={(e) => {
                  e.stopPropagation()
                  if (currentPage > 1) handlePageChange(currentPage - 1)
                }}
                disabled={currentPage === 1}
              >
                ←
              </button>
              <span className="page-info">{currentPage} / {totalPages}</span>
              <button 
                className="page-button"
                onClick={(e) => {
                  e.stopPropagation()
                  if (currentPage < totalPages) handlePageChange(currentPage + 1)
                }}
                disabled={currentPage === totalPages}
              >
                →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default WallpaperWidget 