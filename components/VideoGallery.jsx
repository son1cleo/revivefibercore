export default function VideoGallery({ items }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((video) => (
        <article key={video.embedUrl} className="overflow-hidden rounded-2xl border border-forest/10 bg-white shadow-soft">
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
            <h3 className="font-semibold text-charcoal">{video.title}</h3>
          </div>
        </article>
      ))}
    </div>
  );
}
