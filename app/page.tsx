import { Container } from "@/components/Container";
import { HeroPattern } from "@/components/HeroPattern";
import { PoemGenerator } from "@/components/PoemGenerator";
import { PoemTypes } from "@/components/PoemTypes";
import { SocialProof } from "@/components/SocialProof";

export const metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  return (
    <Container className="pt-16 pb-24">
      <HeroPattern />
      <SocialProof className="text-red-800" />
      <h1 className="sm:text-center text-4xl/snug sm:text-5xl/snug md:text-6xl/snug font-bold tracking-tight text-gray-800 mb-16 sm:mb-24 lg:mb-32">
        Poem Generator
      </h1>
      <PoemGenerator />
      <div className="pt-24 sm:pt-32 ">
        <PoemTypes />
      </div>
    </Container>
  );
}
