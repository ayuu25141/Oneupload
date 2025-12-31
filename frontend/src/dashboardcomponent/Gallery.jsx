import { useQuery } from "@tanstack/react-query";
import ImageCard from "../dashboardcomponent/ImageCard";
import { fetchMyGallery } from "../Gallery";

const Gallery = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-gallery"],
    queryFn: () => fetchMyGallery({ page: 1, limit: 12 }),
  });

  // 🔄 Loading
  if (isLoading) {
    return <p className="text-center mt-10">Loading images...</p>;
  }

  // ❌ Error
  if (isError) {
    return <p className="text-center mt-10 text-red-500">Failed to load images</p>;
  }

  // 🚫 No images → show nothing (or empty UI)
  if (!data || data.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500">
        <p>No images uploaded yet 📭</p>
      </div>
    );
  }

  // ✅ Images exist
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((img) => (
          <ImageCard key={img.id} image={img} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
