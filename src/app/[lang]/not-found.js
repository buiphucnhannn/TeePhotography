import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { getDictionary } from "@/data/dictionaries";

// Trang 404 (dùng ngôn ngữ mặc định vì không có params ở đây).
export default function NotFound() {
  const t = getDictionary("vi");
  return (
    <Container className="flex min-h-[70svh] flex-col items-center justify-center py-32 text-center">
      <p className="font-serif text-8xl text-amber">404</p>
      <h1 className="h-display mt-6 text-3xl text-ink">{t.notFound.title}</h1>
      <p className="mt-3 text-ink-soft">{t.notFound.description}</p>
      <Button href="/" variant="pillDark" className="mt-10">
        {t.notFound.home}
      </Button>
    </Container>
  );
}
