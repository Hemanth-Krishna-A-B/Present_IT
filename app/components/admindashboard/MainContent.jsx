import { useEffect, useState } from "react";

export default function MainContent() {
  const [sharedItem, setSharedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0); // Tracks the current slide
  const [animating, setAnimating] = useState(false); // To handle slide transition animation

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/get_presentation_data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: localStorage.getItem("user_id") }),
        });

        const data = await res.json();

        if (res.ok) {
          setItems(data.presentations || []);
        } else {
          setError(data.error || "Failed to fetch data");
        }
      } catch (err) {
        setError("Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleShare = async (item) => {
    // Set sharedItem state
    setSharedItem(item);

    // Get session_id from localStorage
    const session_id = localStorage.getItem("session_id");

    // If no session_id, return
    if (!session_id) {
      setError("No active session found.");
      return;
    }

    // Prepare request body for the API
    const requestBody = {
      type: "presentation",
      id: item.presentation_id,
      session_id,
    };

    try {
      // Call the API to update the session data
      const res = await fetch("/api/update_shared_content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await res.json();
      if (res.ok) {
        console.log("Session updated successfully", result);
      } else {
        console.error("Error updating session", result.error);
      }
    } catch (error) {
      console.error("Error making request", error);
    }
  };

  const nextSlide = () => {
    if (animating) return; // Prevent changing slides while animating
    setAnimating(true);
    setCurrentSlide((prevSlide) => (prevSlide + 1) % sharedItem.image_url.length); // Cycle back to first slide
  };

  const prevSlide = () => {
    if (animating) return; // Prevent changing slides while animating
    setAnimating(true);
    setCurrentSlide((prevSlide) => (prevSlide - 1 + sharedItem.image_url.length) % sharedItem.image_url.length); // Cycle back to last slide
  };

  // Reset animation flag after the slide change animation is completed
  useEffect(() => {
    if (!animating) return;

    const timeout = setTimeout(() => {
      setAnimating(false);
    }, 300); // Duration of the animation (same as transition duration)

    return () => clearTimeout(timeout);
  }, [animating]);

  return (
    <div className="h-full w-full text-black font-semibold text-base p-4 overflow-auto bg-white border-2">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {sharedItem === null ? (
        <div className="space-y-4">
          {items.length === 0 ? (
            <p>No items found</p>
          ) : (
            items.map((item, index) => (
              <div
                key={`${item.id}-${item.title}-${index}`} // Unique key combining item.id, item.title, and index
                className="flex justify-between items-center border border-gray-300 p-3 rounded shadow-sm"
              >
                <span>{item.title}</span>
                <button
                  onClick={() => handleShare(item)} // Pass item directly to the share function
                  className="bg-rose-500 text-white font-medium px-3 py-1 rounded hover:bg-rose-600 transition"
                >
                  Share
                </button>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl mb-4">Sharing: {sharedItem.title}</h2>
          {/* Slide Image Container */}
          <div className="relative w-full max-w-full h-64 sm:h-80 md:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden flex justify-center items-center">
            <div className="w-full h-full overflow-auto scrollbar-hidden flex justify-center items-center">
              <img
                src={sharedItem.image_url[currentSlide]}
                alt="Shared Presentation Slide"
                className={`object-contain scale-60 transition-all duration-300 ease-in-out ${animating ? "opacity-0" : "opacity-100"}`}
              />
            </div>


            {/* Slide Controls */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 transform -translate-y-1/2">
              <button
                onClick={prevSlide}
                className="bg-black text-white p-2 rounded-full opacity-70 hover:opacity-100 transition"
              >
                &#60;
              </button>
              <button
                onClick={nextSlide}
                className="bg-black text-white p-2 rounded-full opacity-70 hover:opacity-100 transition"
              >
                &#62;
              </button>
            </div>
          </div>
          {/* Display Image Indicators */}
          <div className="flex justify-center space-x-2 mt-2">
            {sharedItem.image_url.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-blue-500' : 'bg-gray-400'}`}
                onClick={() => setCurrentSlide(index)} // Jump to specific slide when clicked
              />
            ))}
          </div>
          <button
            onClick={() => setSharedItem(null)}
            className="bg-black text-white font-medium px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
