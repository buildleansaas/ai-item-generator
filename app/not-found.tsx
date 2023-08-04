import { CallToAction } from "@/components/CallToAction";
import { Container } from "@/components/Container";
import { HeroPattern } from "@/components/HeroPattern";
import { PoemTypes } from "@/components/PoemTypes";
import { poemTypes } from "@/poems";

export default async function RootNotFound() {
  return (
    <Container className="pt-16 pb-24">
      <HeroPattern className={poemTypes[1].classNames.background} />
      <h1 className="text-3xl/snug sm:text-4xl/snug font-bold tracking-tight mb-4">
        Page not found
      </h1>
      <p className="mb-8">Looking for a poem generator?</p>
      <PoemTypes />
    </Container>
  );
}
