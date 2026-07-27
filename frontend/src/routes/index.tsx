import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import UploadSection from "../components/UploadSection";
import About from "../components/About";
import TechStack from "../components/TechStack";
import Footer from "../components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Text Image Deblurring — Restore Blurry Text with AI" },
      {
        name: "description",
        content:
          "Restore blurry text images into sharp, readable images using our U-Net deep learning model. Upload, deblur, and download instantly.",
      },
      { property: "og:title", content: "AI Text Image Deblurring" },
      {
        property: "og:description",
        content: "Restore blurry text images into sharp, readable images with a U-Net deep learning model.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(30,30,45,0.85)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
          },
        }}
      />
      <Navbar />
      <main>
        <Hero />
        <UploadSection />
        <About />
        <TechStack />
      </main>
      <Footer />
    </div>
  );
}
