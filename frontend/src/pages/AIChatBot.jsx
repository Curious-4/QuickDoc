import { useState, useRef, useEffect } from "react";

// OpenRouter API endpoint and model
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY; // <-- Paste your OpenRouter API key here

const systemPrompt = `
You are a professional medical assistant chatbot for patients. 
You ONLY answer questions about health, medicine, nutrition, symptoms, treatments, and medical advice.
If a user asks about anything unrelated to health, medicine, or nutrition, politely respond:
"I'm here to help with medical, health, and nutrition questions only. Please ask a relevant question."
Never provide a diagnosis or prescription. For emergencies or serious symptoms, always recommend seeing a doctor.
Never engage in casual conversation or non-medical topics.
`;

const MEDICAL_KEYWORDS = [
  // Original Keywords
  "health", "medicine", "medicines", "doctor", "symptom", "treatment", "nutrition", "diet", "pain", "fever", "headache", "illness", "disease", "prescription", "appointment", "injury", "infection", "therapy", "vaccine", "allergy", "blood", "pressure", "diabetes", "cholesterol", "cancer", "asthma", "covid", "flu", "cold", "cough",

  // General Health & Wellness
  "wellness", "fitness", "hygiene", "preventive", "screening", "rehabilitation", "palliative", "hospice", "stress", "sleep", "exercise", "hydration", "metabolism", "vital signs", "checkup",

  // Medical Specialties & Professionals
  "physician", "surgeon", "nurse", "pharmacist", "dentist", "cardiologist", "dermatologist", "neurologist", "oncologist", "pediatrician", "psychiatrist", "radiologist", "gynecologist", "urologist", "ophthalmologist", "orthopedist", "endocrinologist", "pulmonologist", "gastroenterologist", "hematologist", "nephrologist", "pathologist", "anesthesiologist", "therapist", "paramedic", "specialist", "clinician", "practitioner",

  // Anatomy & Physiology
  "anatomy", "physiology", "cell", "tissue", "organ", "muscle", "bone", "nerve", "artery", "vein", "heart", "lung", "brain", "liver", "kidney", "stomach", "intestine", "skin", "hormone", "enzyme", "immune system", "lymph node", "skeleton", "joint", "cartilage", "tendon", "ligament", "gland", "abdomen", "chest", "thorax", "cranium", "spine", "pelvis",

  // Diseases & Conditions (General & Specific examples)
  "syndrome", "disorder", "condition", "inflammation", "trauma", "fracture", "burn", "virus", "bacteria", "fungus", "parasite", "genetic disorder", "autoimmune", "arthritis", "hypertension", "hypotension", "stroke", "dementia", "alzheimer's", "parkinson's", "epilepsy", "migraine", "depression", "anxiety", "bipolar disorder", "schizophrenia", "autism", "adhd", "osteoporosis", "bronchitis", "pneumonia", "tuberculosis", "hiv", "aids", "hepatitis", "cirrhosis", "anemia", "leukemia", "lymphoma", "sepsis", "eczema", "psoriasis", "acne", "gout", "obesity", "malnutrition", "edema", "tumor", "cyst", "lesion", "ulcer", "hernia", "cataract", "glaucoma", "dehydration", "insomnia", "narcolepsy", "vertigo",

  // Treatments & Procedures
  "surgery", "biopsy", "chemotherapy", "radiotherapy", "immunotherapy", "dialysis", "transplant", "transfusion", "intubation", "ventilation", "cpr", "first aid", "catheter", "endoscopy", "colonoscopy", "laparoscopy", "angioplasty", "bypass", "scan", "imaging", "ultrasound", "x-ray", "ct scan", "mri", "pet scan", "prognosis", "diagnosis", "consultation", "referral", "medication", "drug", "pharmaceutical", "antibiotic", "antiviral", "antifungal", "analgesic", "anti-inflammatory", "steroid", "antidepressant", "antipsychotic", "sedative", "stimulant", "vaccination", "inoculation", "infusion", "injection", "dosage", "placebo",

  // Diagnostics & Testing
  "test", "assay", "culture", "smear", "swab", "sample", "biomarker", "pathology", "histology", "cytology", "microscopy", "blood test", "urine test", "genetic testing", "ecg", "ekg", "eeg", "biopsy", "manometry", "spirometry",

  // Biology (General & Molecular)
  "biology", "biochemistry", "molecular biology", "genetics", "dna", "rna", "gene", "chromosome", "protein", "amino acid", "lipid", "carbohydrate", "cell cycle", "mitosis", "meiosis", "mutation", "evolution", "ecology", "organism", "species", "microbiology", "bacteriology", "virology", "mycology", "immunology", "neuroscience", "biotechnology", "bioinformatics", "genome", "proteome", "metabolome", "enzyme kinetics", "cell signaling", "receptor", "membrane", "cytoplasm", "nucleus", "mitochondria", "ribosome",

  // Pharmacology more
  "pharmacodynamics", "pharmacokinetics", "generic", "brand name", "side effect", "adverse reaction", "contraindication", "over-the-counter", "narcotic", "opiate", "vaccine adjuvant", "clinical trial","Ovulation",

  // Medical Equipment & Supplies
  "stethoscope", "scalpel", "syringe", "needle", "bandage", "gauze", "splint", "crutch", "wheelchair", "monitor", "defibrillator", "pacemaker", "implant",

  // Public Health & Epidemiology
  "epidemiology", "outbreak", "pandemic", "epidemic", "public health", "sanitation", "quarantine", "incidence", "prevalence", "morbidity", "mortality",

  // Mental Health
  "psychology", "psychosis", "neurosis", "phobia", "trauma (psychological)", "counseling", "psychotherapy", "cognitive behavioral therapy", "cbt", "mental illness",

  // Dental Health
  "dental", "tooth", "teeth", "gum", "cavity", "gingivitis", "periodontitis", "orthodontics", "endodontics", "plaque",

  // Research & Study
  "research", "study", "trial", "cohort", "longitudinal", "cross-sectional", "double-blind", "peer review", "publication", "abstract", "hypothesis"
];

// You can then use this array in your application
// console.log(MEDICAL_KEYWORDS.length); // To see how many keywords you have

function isMedicalQuestion(text) {
  const lower = text.toLowerCase();
  return MEDICAL_KEYWORDS.some(word => lower.includes(word));
}

async function fetchLLMResponse(userMessage) {
  const body = {
    model: "mistralai/mistral-7b-instruct:free", // You can use other free models from OpenRouter
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage }
    ],
    max_tokens: 256,
    temperature: 0.7
  };

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "HTTP-Referer": "http://localhot:5173/", // required by OpenRouter
      "X-Title": "QuickDoc Health Chatbot"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) return "Sorry, I'm currently unavailable. Please try again later.";
  const data = await response.json();
  console.log(response)
  return data?.choices?.[0]?.message?.content?.trim() || "Sorry, I couldn't understand that.";
}

const AIChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm your AI health assistant. Ask me about health, nutrition, or medicines." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    if (!isMedicalQuestion(input)) {
      setMessages(msgs => [
        ...msgs,
        { from: "user", text: input },
        { from: "bot", text: "I'm here to help with medical, health, and nutrition questions only. Please ask a relevant question." }
      ]);
      setInput("");
      return;
    }
    const userMsg = { from: "user", text: input };
    setMessages(msgs => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    const botReply = await fetchLLMResponse(input);
    setMessages(msgs => [...msgs, { from: "bot", text: botReply }]);
    setLoading(false);
  };

  return (
    <>
      {!open && (
        <button
          className="w-12 h-12 rounded-full bg-blue-800 text-white flex items-center justify-center shadow-lg fixed right-4 bottom-4 z-50 md:right-10 md:bottom-10"
          onClick={() => setOpen(true)}
          aria-label="Open AI chatbot"
        >
          🤖
        </button>
      )}
      {open && (
        <div className="fixed right-4 bottom-4 w-80 max-w-[95vw] h-96 max-h-[80vh] bg-white rounded-lg shadow-lg flex flex-col z-50 md:right-10 md:bottom-10">
          <div className="flex justify-between items-center p-3 border-b">
            <span className="font-bold text-blue-800">AI Health ChatBot</span>
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-red-500 text-2xl leading-none">&times;</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`text-sm p-2 rounded-lg ${msg.from === "bot" ? "bg-blue-100 text-left" : "bg-green-100 text-right ml-auto"}`}
                style={{ maxWidth: "80%" }}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="text-xs text-blue-500">AI is typing...</div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="p-2 border-t flex gap-2">
            <input
              className="flex-1 border rounded px-2 py-1 text-sm"
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder="Ask about health, nutrition, medicines..."
              disabled={loading}
            />
            <button
              className="bg-blue-800 text-white px-3 py-1 rounded"
              onClick={handleSend}
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatBot;