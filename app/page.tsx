import ChatPage from '@/components/chat-page';

export default function Home() {
  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
          Medichat - Micromeet AI Healthcare
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          A simple chat interface to generate medical records from doctor-patient conversations using AI.
        </p>
      </header>
      <ChatPage />
    </main>
  );
}
