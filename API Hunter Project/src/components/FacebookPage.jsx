import React from "react";

export default function FacebookPage() {
  return (
    <div className="bg-[#F0F2F5] min-h-screen w-full text-sm md:text-base">
      <header className="bg-white border-b border-gray-300 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 md:px-4 flex items-center justify-between h-14">
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <div
              className="w-9 h-9 md:w-10 md:h-10 bg-[#1877F2] rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl flex-shrink-0"
              aria-hidden="true"
            >
              f
            </div>

            <form className="flex items-center bg-[#F0F2F5] rounded-full px-2 md:px-4 py-1 flex-1 max-w-xs" role="search" aria-label="Search Facebook">
              <label htmlFor="fb-search" className="sr-only">
                Search Facebook
              </label>
              <span className="text-gray-500 mr-2" aria-hidden>
                🔍
              </span>
              <input
                id="fb-search"
                type="search"
                placeholder="Search Facebook"
                className="bg-transparent outline-none text-xs md:text-sm w-full"
                aria-label="Search"
              />
            </form>
          </div>

          <nav className="hidden md:flex items-center space-x-1" aria-label="Main navigation">
            {["🏠", "📹", "🏪", "👥", "🎮"].map((icon, idx) => (
              <button
                key={idx}
                type="button"
                className="w-12 md:w-16 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label={`nav-${idx}`}
              >
                <span className="text-xl md:text-2xl" aria-hidden>
                  {icon}
                </span>
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-2 shrink-0">
            <button type="button" className="w-8 h-8 md:w-9 md:h-9 bg-gray-200 rounded-full" aria-label="Profile" />
            <button type="button" className="w-8 h-8 md:w-9 md:h-9 bg-[#E4E6EB] rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300" aria-label="Create">
              <span>➕</span>
            </button>
            <button type="button" className="w-8 h-8 md:w-9 md:h-9 bg-[#E4E6EB] rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300" aria-label="Messenger">
              <span>💬</span>
            </button>
            <button type="button" className="w-8 h-8 md:w-9 md:h-9 bg-[#E4E6EB] rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300" aria-label="Notifications">
              <span>🔔</span>
            </button>
            <button type="button" className="w-8 h-8 md:w-9 md:h-9 bg-gray-300 rounded-full" aria-label="More" />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 md:px-4 py-4 flex gap-3 md:gap-4">
        {/* Left Sidebar */}
        <aside className="w-64 hidden lg:block shrink-0" aria-label="Sidebar">
          <div className="bg-white rounded-lg p-4 shadow-sm space-y-1">
            <button className="flex items-center space-x-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-200">
              <div className="w-9 h-9 bg-gray-300 rounded-full" />
              <span className="font-semibold">Your Name</span>
            </button>

            {[
              { icon: "👥", label: "Friends" },
              { icon: "👥", label: "Groups" },
              { icon: "🏪", label: "Marketplace" },
              { icon: "📹", label: "Watch" },
              { icon: "📅", label: "Events" },
              { icon: "⏰", label: "Memories" },
              { icon: "💾", label: "Saved" },
            ].map((item) => (
              <button key={item.label} className="flex items-center space-x-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-200">
                <span className="text-2xl">{item.icon}</span>
                <span className="font-semibold">{item.label}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 min-w-0 max-w-2xl mx-auto" id="main" tabIndex={-1}>
          <section className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
              <input
                type="text"
                aria-label="Create a post"
                placeholder="What's on your mind?"
                className="flex-1 bg-[#F0F2F5] rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="flex justify-around border-t border-gray-200 pt-2">
              <button type="button" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200">
                <span className="text-xl">📹</span>
                <span className="text-gray-600 font-semibold">Live video</span>
              </button>
              <button type="button" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200">
                <span className="text-xl">📷</span>
                <span className="text-gray-600 font-semibold">Photo/video</span>
              </button>
              <button type="button" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200">
                <span className="text-xl">😊</span>
                <span className="text-gray-600 font-semibold">Feeling/activity</span>
              </button>
            </div>
          </section>

          <article className="bg-white rounded-lg shadow-sm mb-4">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full" />
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>

                <button type="button" aria-label="Post options" className="text-gray-500 hover:bg-gray-100 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-200">
                  ⋯
                </button>
              </div>

              <p className="mb-3">Enjoying a beautiful day! 🌞</p>

              <img src="insta-img.jpg" alt="People enjoying outdoors" className="w-full rounded-lg mb-3 object-cover" loading="lazy" />

              <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                <button type="button" className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-4 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200">
                  <span>👍</span>
                  <span>Like</span>
                </button>
                <button type="button" className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-4 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200">
                  <span>💬</span>
                  <span>Comment</span>
                </button>
                <button type="button" className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-4 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200">
                  <span>↗️</span>
                  <span>Share</span>
                </button>
              </div>
            </div>
          </article>
        </main>

        <aside className="w-80 hidden xl:block shrink-0" aria-label="Right sidebar">
          <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
            <div>
              <h3 className="font-semibold mb-3">Sponsored</h3>
              <div className="flex items-start space-x-3">
                <div className="w-20 h-20 bg-gray-200 rounded-lg" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">Amazing Product</p>
                  <p className="text-xs text-gray-500">amazingproduct.com</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Contacts</h3>
              <div className="space-y-2">
                {["Friend 1", "Friend 2", "Friend 3"].map((name, i) => (
                  <button key={name} className="flex items-center space-x-3 hover:bg-gray-100 rounded-lg p-2 w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-200">
                    <div className="w-9 h-9 bg-gray-300 rounded-full relative">
                      {i < 2 && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />}
                    </div>
                    <span className="font-semibold text-sm">{name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
