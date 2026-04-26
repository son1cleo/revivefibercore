export default function VideoGallery({ items }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((video) => (
        <article key={video.embedUrl} className="panel overflow-hidden">
          <div className="aspect-video">
            <iframe
              src={video.embedUrl}
              title={video.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-text-primary">{video.title}</h3>
          </div>
        </article>
      ))}
    </div>
  );
}
