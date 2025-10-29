# MediChat

MediChat is A simple chat interface to generate medical records from doctor-patient conversations using AI. The application generates structured medical records from conversations, including chief complaints, symptoms, assessments, and treatment plans.

## Features

- Real-time AI chat interface for medical consultations
- Automatic generation of structured medical records
- Clean and accessible user interface
- Dark/Light mode support
- Responsive design for all devices

## Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: 
  - Tailwind CSS
  - TW Animate CSS for animations
  - OKLCH color space support
- **UI Components**: 
  - Shacdn UI Component
  - Radix UI primitives (@radix-ui/react-*)
  - Lucide React for iconography (v0.548.0)
  - Class Variance Authority for component variants
  - Sonner for toast notifications
  - Next Themes for dark/light mode

### AI/LLM Integration
- **Model**: Google Generative AI (gemini-2.5-flash)
- **Integration**: @genkit-ai/google-genai
- **Features**:
  - Conversational AI for medical consultations
  - Structured data extraction for medical records
  - Context-aware responses using Google's LLM

## Getting Started

### Prerequisites
- Node.js 20+ 
- npm/yarn/pnpm
- Google AI API key

### Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/bayuramadhans/medichat.git
cd medichat
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env` file in the root directory and add your Google AI API key:
```env
GOOGLE_AI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
medichat/
├── ai/                  # AI/LLM integration logic
├── app/                 # Next.js app router files
├── components/         # React components
│   ├── ui/            # Base UI components
│   └── ...            # Feature components
├── lib/               # Utility functions
└── public/            # Static assets
```

## AI/LLM Implementation

The application uses Gemini model to:
1. Process user inputs and generate medically relevant responses
2. Extract structured information from conversations
3. Generate formatted medical records including:
   - Chief complaints
   - Symptoms
   - Medical assessments
   - Treatment plans

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
