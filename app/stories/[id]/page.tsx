import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { getStories, type Story } from "@/app/data/stories";
import { StoryCard } from "@/components/StoryCard";
import { notFound } from "next/navigation";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";

interface StoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { id } = await params;
  const stories = await getStories();
  const story = stories.find((s) => s.id === id);

  if (!story) {
    notFound();
  }

  // Get other stories for "More Articles" section
  const moreStories = stories.filter((s) => s.id !== story.id).slice(0, 8);

  return (
    <div className="w-full">
      <Header />
      <div className="container mx-auto px-6 md:px-8 py-10">
        <main className="w-full mx-auto">
          {/* Article area */}
          <div className="">
            {/* Back button */}
            <Link href="/stories" className="flex items-center gap-2 mb-3">
             <Button variant="outline" className="text-md font-bold rounded-full px-8 border border-black/60">Back</Button>
            </Link>

            {/* Layout: stacked on mobile, side-by-side on lg+ */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
              {/* Sidebar — above content on mobile, sticky on desktop */}
              <aside className="flex flex-row lg:flex-col gap-8 lg:gap-6 lg:w-60 xl:w-67.5 lg:shrink-0 lg:pt-2">
                {/* Date & Author */}
                <div className="flex-1 lg:flex-none">
                  <p className="text-sm md:text-md text-black leading-snug">
                    Posted {story.date}
                  </p>
                  <p className="font-bold text-base md:text-md text-black leading-snug">
                    By {story.author}
                  </p>
                </div>

                {/* Share */}
                <div className="flex flex-col gap-2">
                  <p className="text-base md:text-lg text-black">Share</p>
                  <div className="flex gap-2 items-center flex-wrap">
                    <a href="#" className="hover:opacity-70 transition-opacity p-2 rounded-full hover:bg-gray-100">
                      <FaInstagram className="w-6 h-6 text-gray-700" />
                    </a>
                    <a href="#" className="hover:opacity-70 transition-opacity p-2 rounded-full hover:bg-gray-100">
                      <FaFacebook className="w-6 h-6 text-gray-700" />
                    </a>
                    <a href="#" className="hover:opacity-70 transition-opacity p-2 rounded-full hover:bg-gray-100">
                      <FaTwitter className="w-6 h-6 text-gray-700" />
                    </a>
                    <a href="#" className="hover:opacity-70 transition-opacity p-2 rounded-full hover:bg-gray-100">
                      <FaLinkedin className="w-6 h-6 text-gray-700" />
                    </a>
                  </div>
                </div>
              </aside>

              {/* Main article content */}
              <div className="flex-1 min-w-0">
                {/* Title */}
                <h1 className="font-bold text-4xl">
                  {story.title}
                </h1>

                {/* Intro italic */}
                <p className="italic text-lg text-black leading-relaxed mb-8 md:mb-10 mt-10">
                  {story.intro}
                </p>

                {/* Featured image */}
                <div className="overflow-hidden mb-8 md:mb-12 h-55 md:h-105 lg:h-125  rounded-2xl">
                  <Image
                    src={story.featuredImage}
                    alt={story.title}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content sections */}
                {story.sections.map((section, idx) => (
                  <div key={idx} className="mb-8 md:mb-12">
                    {section.heading && (
                      <h3 className="font-bold text-2xl text-[#0a0200] leading-tight mb-4 md:mb-6">
                        {section.heading}
                      </h3>
                    )}
                    <div className="text-sm text-black leading-relaxed whitespace-pre-line mb-6 md:mb-10">
                      {section.body}
                    </div>
                    {section.image && idx < story.sections.length - 1 && (
                      <div className="overflow-hidden h-50 md:h-100 lg:h-120 rounded-lg mb-8 md:mb-12">
                        <Image
                          src={section.image}
                          alt=""
                          width={1000}
                          height={1000}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* More Articles */}
          <section className=" py-12  border-t border-gray-100 mt-8">
            <span className="text-5xl">
              More Articles
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-10">
              {moreStories.map((s) => (
                <StoryCard key={s.id} story={s} />
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}

// Generate static params for all stories
export async function generateStaticParams() {
  const stories = await getStories();
  return stories.map((story: Story) => ({
    id: story.id,
  }));
}
