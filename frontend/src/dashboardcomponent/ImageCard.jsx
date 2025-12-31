
import { FiExternalLink, FiCopy, FiDownload } from "react-icons/fi";
import { format } from "date-fns"; // date formatting

const ImageCard = ({ image }) => {
  if (!image) return null;

  // Construct full share URL dynamically
 const fullLink = image.share_url
  ? `${window.location.origin}${image.share_url}`
  : "#";
  // Copy URL to clipboard
  const handleCopy = () => {
    if (fullLink !== "#") {
      navigator.clipboard.writeText(fullLink);
      alert("Link copied to clipboard!");
    }
  };

  // Format uploaded date using date-fns
  let formattedDate = "N/A";
  if (image.uploaded_at) {
    try {
      formattedDate = format(new Date(image.uploaded_at), "dd MMM yyyy");
    } catch (err) {
      console.error("Invalid date:", err);
    }
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Image */}
      <div className="aspect-[3/4] overflow-hidden group">
        <img
          src={image.image_url || ""}
          alt={image.file_name || "image"}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="text-sm font-medium text-gray-900 truncate">
          {image.file_name || "Untitled"}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="rounded-md bg-gray-100 px-2 py-0.5 text-gray-700">
            {image.size_mb?.toFixed(2) || "0.00"} MB
          </span>
          <span>•</span>
          <span>{formattedDate}</span>
        </div>

        {/* Share Link */}
        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
          <a
            href={fullLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-600 truncate hover:underline"
          >
            {fullLink}
          </a>
          <FiExternalLink className="text-gray-400 shrink-0 ml-2" />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 transition"
          >
            <FiCopy />
            Copy Link
          </button>

          <a
            href={image.image_url}
            download={image.file_name}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 transition"
          >
            <FiDownload />
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
