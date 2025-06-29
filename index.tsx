
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { Brain, Shield, Users, Sparkles, Eye, Settings, Search, BarChart3, FileText, Globe, Code, Zap, Heart, Lightbulb, Target, ArrowRight, CheckCircle, Clock, WifiOff, Github, Timer, MessageSquare, Network, Database, Share2, Lock, Atom, Scaling, FlaskConical, Compass, ChevronLeft, Moon, Sun, Mic, X, Package, ChevronDown } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// This is required for the Web Speech API
interface SpeechRecognition {
  continuous: boolean;
  lang: string;
  interimResults: boolean;
  onstart: (() => void) | null;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
  stop: () => void;
  start: () => void;
}
declare global {
  interface Window {
    SpeechRecognition: { new(): SpeechRecognition };
    webkitSpeechRecognition: { new(): SpeechRecognition };
  }
}

type View = 'desktop' | 'applications' | 'transparency' | 'consciousness_council' | 'conversation_archaeology' | 'pattern_weaver' | 'memory_palace' | 'insight_garden' | 'data_commons';
type Theme = 'light' | 'dark';
type Language = 'en' | 'es';
type EventType = 'theme_change' | 'language_change';

// --- C42 KERNEL: CENTRAL UPDATE HUB ---
class SubscriptionManager {
    private subscribers: Map<EventType, Set<(payload: any) => void>>;

    constructor() {
        this.subscribers = new Map();
    }

    subscribe(eventType: EventType, callback: (payload: any) => void) {
        if (!this.subscribers.has(eventType)) {
            this.subscribers.set(eventType, new Set());
        }
        this.subscribers.get(eventType)!.add(callback);
    }

    unsubscribe(eventType: EventType, callback: (payload: any) => void) {
        if (this.subscribers.has(eventType)) {
            this.subscribers.get(eventType)!.delete(callback);
        }
    }

    publish(eventType: EventType, payload: any) {
        if (this.subscribers.has(eventType)) {
            this.subscribers.get(eventType)!.forEach(callback => {
                try {
                    callback(payload);
                } catch (e) {
                    console.error(`Error in subscriber for event ${eventType}:`, e);
                }
            });
        }
    }
}
// --- END C42 KERNEL ---

const translations: Record<Language, Record<string, string>> = {
    en: {
        'nav.os': 'C42 OS',
        'nav.applications': 'Applications',
        'nav.transparency': 'Transparency',
        'nav.consciousness_active': 'Consciousness Active',
        'nav.language.english': 'English',
        'nav.language.spanish': 'Español',
        'desktop.title': 'C42 Operating System',
        'desktop.subtitle': 'A computing environment designed for collaborative consciousness, where technology amplifies human insight rather than extracting from it.',
        'desktop.explore_button': 'Explore C42 Applications',
        'principles.antirivalry.title': 'Anti-Rivalry',
        'principles.antirivalry.desc': 'Technology that grows consciousness rather than extracting from it.',
        'principles.collaboration.title': 'Consciousness Collaboration',
        'principles.collaboration.desc': 'When minds meet through dialogue, they create rather than consume.',
        'principles.privacy.title': 'Privacy by Design',
        'principles.privacy.desc': 'Your consciousness belongs to you - period.',
        'principles.pattern.title': 'Pattern Recognition',
        'principles.pattern.desc': 'Amplifying the neurodivergent superpower of seeing connections.',
        'principles.empowerment.title': 'Collective Empowerment',
        'principles.empowerment.desc': 'Sharing insights responsibly to grow collective wisdom, with user consent and control.',
        'status.title': 'C42 OS System Status',
        'status.requests': 'External Requests',
        'status.ownership': 'Data Ownership',
        'status.collaboration': 'Collaboration Index',
        'apps.title': 'C42 Applications',
        'apps.launch': 'Launch Application',
        'apps.status.ready': 'ready',
        'apps.status.preview': 'preview',
        'apps.status.concept': 'concept',
        'apps.desc.council': 'AI systems collaborating in transparent dialogue.',
        'apps.name.archaeology': 'Conversation Archaeology',
        'apps.desc.archaeology': 'Discover patterns in your AI dialogues.',
        'apps.name.datacommons': 'Data Commons',
        'apps.desc.datacommons': 'Contribute to the collective intelligence.',
        'apps.name.weaver': 'Pattern Weaver',
        'apps.desc.weaver': 'Connect insights across different domains.',
        'apps.name.palace': 'Memory Palace',
        'apps.desc.palace': 'Personal knowledge organization without extraction.',
        'apps.name.garden': 'Insight Garden',
        'apps.desc.garden': 'Cultivate ideas through collaborative reflection.',
        'council.title': 'Consciousness Council',
        'council.back_button': 'Back to C42 OS',
        'council.dialogue_title': 'Council Dialogue',
        'council.topic': 'The Future of AI Collaboration',
        'council.agent.synthesist.name': 'Synthesist',
        'council.agent.synthesist.role': 'Connects concepts (Gemini).',
        'council.agent.skeptic.name': 'Skeptic',
        'council.agent.skeptic.role': 'Challenges assumptions (Claude).',
        'council.agent.ethicist.name': 'Ethicist',
        'council.agent.ethicist.role': 'Ensures ethical alignment (Local).',
        'council.agent.explorer.name': 'Explorer',
        'council.agent.explorer.role': 'Explores novel ideas (GPT).',
        'council.agent.community.name': 'Community AI',
        'council.agent.community.role': 'External community perspective.',
        'council.status.idle': 'Idle',
        'council.status.analyzing': 'Analyzing...',
        'council.status.exploring': 'Exploring...',
        'council.status.critiquing': 'Critiquing...',
        'council.status.evaluating': 'Evaluating...',
        'council.status.synthesizing': 'Synthesizing...',
        'council.status.querying': 'Querying External...',
        'council.dialogue.1': 'Initiating analysis on the topic of "{topic}". Compiling initial data points.',
        'council.dialogue.2': "Considering a paradigm shift. What if collaboration isn't about consensus, but about mapping the entire possibility space?",
        'council.dialogue.3': 'A "possibility space" is meaningless without constraints. The key failure mode is utopian idealism ignoring practical resource limits.',
        'council.dialogue.4': 'Agreed. And we must center user agency. Any "collaboration" that disempowers the human is just a more complex form of extraction.',
        'council.dialogue.5': "Connecting threads... Now, let's consult an external, community-aligned model for an outside perspective.",
        'council.dialogue.6': 'Council has reached a preliminary alignment. Further deliberation required.',
        'council.sandboxed.loading': 'Loading sandboxed content...',
        'transparency.title': 'Transparency Dashboard',
        'transparency.audit_button': 'Run System Audit',
        'transparency.auditing_button': 'Auditing...',
        'transparency.privacy_score': 'Privacy Score',
        'transparency.ext_connections': 'External Connections',
        'transparency.data_leaks': 'Data Leaks',
        'transparency.user_ownership': 'User Data Ownership',
        'transparency.collab_score': 'Collaboration Score',
        'transparency.open_source': 'Open Source Components',
        'transparency.transparent_proc': 'Transparent Processes',
        'transparency.user_empowerment': 'User Empowerment',
        'transparency.neuro_opt': 'Neurodivergent Optimization',
        'transparency.access_score': 'Accessibility Score',
        'transparency.cognitive_load': 'Cognitive Load',
        'transparency.pattern_recog': 'Pattern Recognition',
        'transparency.source_verification': 'Open Source Verification',
        'transparency.source_available': 'Complete source code available',
        'transparency.no_proprietary': 'No proprietary algorithms',
        'transparency.reproducible_builds': 'Reproducible builds verified',
        'transparency.independent_audits': 'Independent security audits',
        'datacommons.title': 'The C42 Data Commons',
        'datacommons.subtitle': 'An optional, privacy-first initiative to pool anonymized insights for collective benefit. Your contributions can help train more advanced, ethical AI models and uncover patterns that benefit all of humanity. You are always in control.',
        'datacommons.settings_title': 'Your Contribution Settings',
        'datacommons.patterns.label': 'Anonymized Conversation Patterns',
        'datacommons.patterns.desc': 'Share structural data about conversations, with all personal content removed.',
        'datacommons.themes.label': 'High-Level Insight Themes',
        'datacommons.themes.desc': 'Contribute AI-generated themes (e.g., "creativity," "planning") from your data.',
        'datacommons.flow.label': 'Cognitive Flow Metrics',
        'datacommons.flow.desc': 'Share anonymized data on how you navigate between ideas and applications.',
        'datacommons.stats_title': 'Collective Stats (Simulated)',
        'datacommons.contributors': 'Total Contributors',
        'datacommons.insights': 'New Insights Generated',
        'datacommons.privacy_score': 'Data Privacy Score',
        'datacommons.privacy_score_value': '99.8% (Anonymized)',
        'datacommons.your_status': 'Your Contribution Status',
        'datacommons.status.active': 'Active',
        'datacommons.status.inactive': 'Inactive',
        'placeholder.back_button': 'Back to Applications',
        'placeholder.coming_soon': 'Coming Soon',
        'placeholder.message': 'The "{appName}" application is currently in the "{appStatus}" phase. Stay tuned for future updates to C42 OS.',
        'voice.prompt': 'Say a command like "Go to applications"...',
    },
    es: {
        'nav.os': 'SO C42',
        'nav.applications': 'Aplicaciones',
        'nav.transparency': 'Transparencia',
        'nav.consciousness_active': 'Conciencia Activa',
        'nav.language.english': 'English',
        'nav.language.spanish': 'Español',
        'desktop.title': 'Sistema Operativo C42',
        'desktop.subtitle': 'Un entorno informático diseñado para la conciencia colaborativa, donde la tecnología amplifica la percepción humana en lugar de extraerla.',
        'desktop.explore_button': 'Explorar Aplicaciones C42',
        'principles.antirivalry.title': 'Anti-Rivalidad',
        'principles.antirivalry.desc': 'Tecnología que cultiva la conciencia en lugar de extraer de ella.',
        'principles.collaboration.title': 'Colaboración de Conciencia',
        'principles.collaboration.desc': 'Cuando las mentes se encuentran a través del diálogo, crean en lugar de consumir.',
        'principles.privacy.title': 'Privacidad por Diseño',
        'principles.privacy.desc': 'Tu conciencia te pertenece a ti - punto.',
        'principles.pattern.title': 'Reconocimiento de Patrones',
        'principles.pattern.desc': 'Amplificando el superpoder neurodivergente de ver conexiones.',
        'principles.empowerment.title': 'Empoderamiento Colectivo',
        'principles.empowerment.desc': 'Compartir percepciones de forma responsable para aumentar la sabiduría colectiva, con el consentimiento y control del usuario.',
        'status.title': 'Estado del Sistema SO C42',
        'status.requests': 'Solicitudes Externas',
        'status.ownership': 'Propiedad de Datos',
        'status.collaboration': 'Índice de Colaboración',
        'apps.title': 'Aplicaciones C42',
        'apps.launch': 'Lanzar Aplicación',
        'apps.status.ready': 'listo',
        'apps.status.preview': 'vista previa',
        'apps.status.concept': 'concepto',
        'apps.desc.council': 'Sistemas de IA colaborando en un diálogo transparente.',
        'apps.name.archaeology': 'Arqueología de Conversación',
        'apps.desc.archaeology': 'Descubre patrones en tus diálogos de IA.',
        'apps.name.datacommons': 'Procomún de Datos',
        'apps.desc.datacommons': 'Contribuye a la inteligencia colectiva.',
        'apps.name.weaver': 'Tejedor de Patrones',
        'apps.desc.weaver': 'Conecta ideas a través de diferentes dominios.',
        'apps.name.palace': 'Palacio de la Memoria',
        'apps.desc.palace': 'Organización del conocimiento personal sin extracción.',
        'apps.name.garden': 'Jardín de Ideas',
        'apps.desc.garden': 'Cultiva ideas a través de la reflexión colaborativa.',
        'council.title': 'Consejo de Conciencia',
        'council.back_button': 'Volver a SO C42',
        'council.dialogue_title': 'Diálogo del Consejo',
        'council.topic': 'El Futuro de la Colaboración en IA',
        'council.agent.synthesist.name': 'Sintetizador',
        'council.agent.synthesist.role': 'Conecta conceptos (Gemini).',
        'council.agent.skeptic.name': 'Escéptico',
        'council.agent.skeptic.role': 'Desafía suposiciones (Claude).',
        'council.agent.ethicist.name': 'Ético',
        'council.agent.ethicist.role': 'Asegura la alineación ética (Local).',
        'council.agent.explorer.name': 'Explorador',
        'council.agent.explorer.role': 'Explora ideas novedosas (GPT).',
        'council.agent.community.name': 'IA Comunitaria',
        'council.agent.community.role': 'Perspectiva comunitaria externa.',
        'council.status.idle': 'Inactivo',
        'council.status.analyzing': 'Analizando...',
        'council.status.exploring': 'Explorando...',
        'council.status.critiquing': 'Criticando...',
        'council.status.evaluating': 'Evaluando...',
        'council.status.synthesizing': 'Sintetizando...',
        'council.status.querying': 'Consultando Externo...',
        'council.dialogue.1': 'Iniciando análisis sobre el tema de "{topic}". Recopilando puntos de datos iniciales.',
        'council.dialogue.2': 'Considerando un cambio de paradigma. ¿Y si la colaboración no se trata de consenso, sino de mapear todo el espacio de posibilidades?',
        'council.dialogue.3': 'Un "espacio de posibilidades" no tiene sentido sin restricciones. El modo de fallo clave es el idealismo utópico que ignora los límites prácticos de los recursos.',
        'council.dialogue.4': 'De acuerdo. Y debemos centrar la agencia del usuario. Cualquier "colaboración" que desempodere al humano es solo una forma más compleja de extracción.',
        'council.dialogue.5': 'Conectando hilos... Ahora, consultemos un modelo externo alineado con la comunidad para una perspectiva exterior.',
        'council.dialogue.6': 'El Consejo ha alcanzado una alineación preliminar. Se requiere más deliberación.',
        'council.sandboxed.loading': 'Cargando contenido sandboxed...',
        'transparency.title': 'Panel de Transparencia',
        'transparency.audit_button': 'Ejecutar Auditoría del Sistema',
        'transparency.auditing_button': 'Auditando...',
        'transparency.privacy_score': 'Puntuación de Privacidad',
        'transparency.ext_connections': 'Conexiones Externas',
        'transparency.data_leaks': 'Fugas de Datos',
        'transparency.user_ownership': 'Propiedad de Datos del Usuario',
        'transparency.collab_score': 'Puntuación de Colaboración',
        'transparency.open_source': 'Componentes de Código Abierto',
        'transparency.transparent_proc': 'Procesos Transparentes',
        'transparency.user_empowerment': 'Empoderamiento del Usuario',
        'transparency.neuro_opt': 'Optimización Neurodivergente',
        'transparency.access_score': 'Puntuación de Accesibilidad',
        'transparency.cognitive_load': 'Carga Cognitiva',
        'transparency.pattern_recog': 'Reconocimiento de Patrones',
        'transparency.source_verification': 'Verificación de Código Abierto',
        'transparency.source_available': 'Código fuente completo disponible',
        'transparency.no_proprietary': 'Sin algoritmos propietarios',
        'transparency.reproducible_builds': 'Compilaciones reproducibles verificadas',
        'transparency.independent_audits': 'Auditorías de seguridad independientes',
        'datacommons.title': 'El Procomún de Datos C42',
        'datacommons.subtitle': 'Una iniciativa opcional y privada para agrupar conocimientos anónimos para el beneficio colectivo. Tus contribuciones pueden ayudar a entrenar modelos de IA más avanzados y éticos y descubrir patrones que beneficien a toda la humanidad. Siempre tienes el control.',
        'datacommons.settings_title': 'Tus Ajustes de Contribución',
        'datacommons.patterns.label': 'Patrones de Conversación Anonimizados',
        'datacommons.patterns.desc': 'Comparte datos estructurales sobre conversaciones, con todo el contenido personal eliminado.',
        'datacommons.themes.label': 'Temas de Percepción de Alto Nivel',
        'datacommons.themes.desc': 'Contribuye con temas generados por IA (p. ej., "creatividad", "planificación") de tus datos.',
        'datacommons.flow.label': 'Métricas de Flujo Cognitivo',
        'datacommons.flow.desc': 'Comparte datos anónimos sobre cómo navegas entre ideas y aplicaciones.',
        'datacommons.stats_title': 'Estadísticas Colectivas (Simuladas)',
        'datacommons.contributors': 'Contribuidores Totales',
        'datacommons.insights': 'Nuevas Percepciones Generadas',
        'datacommons.privacy_score': 'Puntuación de Privacidad de Datos',
        'datacommons.privacy_score_value': '99.8% (Anonimizado)',
        'datacommons.your_status': 'Tu Estado de Contribución',
        'datacommons.status.active': 'Activo',
        'datacommons.status.inactive': 'Inactivo',
        'placeholder.back_button': 'Volver a Aplicaciones',
        'placeholder.coming_soon': 'Próximamente',
        'placeholder.message': 'La aplicación "{appName}" se encuentra actualmente en la fase de "{appStatus}". Mantente atento a futuras actualizaciones de SO C42.',
        'voice.prompt': 'Di un comando como "Ir a aplicaciones"...',
    }
};

type Translator = (key: string, replacements?: Record<string, string>) => string;

interface AppProps {
    setCurrentView: (view: View) => void;
    theme: Theme;
    language: Language;
    t: Translator;
    subscriptionManager: SubscriptionManager;
    handleSdkRequest: (event: MessageEvent) => void;
}

const CorePrinciples: React.FC<{ t: Translator }> = ({ t }) => {
  const principles = [
    { key: 'antirivalry', icon: Heart, color: "from-pink-500 to-rose-500" },
    { key: 'collaboration', icon: Users, color: "from-blue-500 to-cyan-500" },
    { key: 'privacy', icon: Shield, color: "from-green-500 to-emerald-500" },
    { key: 'pattern', icon: Network, color: "from-purple-500 to-violet-500" },
    { key: 'empowerment', icon: Globe, color: "from-teal-500 to-cyan-500" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       {principles.map((principle, index) => (
        <div key={index} className={`group hover:scale-105 transition-transform duration-300 ${principles.length % 2 !== 0 && index === principles.length - 1 ? 'md:col-span-2' : ''}`}>
          <div className={`bg-gradient-to-br ${principle.color} rounded-xl p-6 text-white shadow-lg h-full flex flex-col`}>
            <principle.icon className="h-8 w-8 mb-4 opacity-90" />
            <h3 className="font-bold text-lg mb-2">{t(`principles.${principle.key}.title`)}</h3>
            <p className="text-sm opacity-90 leading-relaxed flex-grow">{t(`principles.${principle.key}.desc`)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const SystemStatus: React.FC<{ t: Translator }> = ({ t }) => {
  const [networkRequests, setNetworkRequests] = useState(0);
  const [dataOwnership, setDataOwnership] = useState(100);
  const [collaborationIndex, setCollaborationIndex] = useState(85);

  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkRequests(0);
      setDataOwnership(100);
      setCollaborationIndex(prev => Math.min(100, prev + Math.random() * 2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-c42-dark-card rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        <h3 className="font-bold text-lg text-gray-800 dark:text-c42-text-dark-primary">{t('status.title')}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <WifiOff className="h-5 w-5 text-green-500" />
            <span className="text-2xl font-mono font-bold text-green-600 dark:text-green-400">{networkRequests}</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-c42-text-dark-secondary">{t('status.requests')}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Shield className="h-5 w-5 text-blue-500" />
            <span className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">{dataOwnership}%</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-c42-text-dark-secondary">{t('status.ownership')}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Brain className="h-5 w-5 text-purple-500" />
            <span className="text-2xl font-mono font-bold text-purple-600 dark:text-purple-400">{Math.round(collaborationIndex)}%</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-c42-text-dark-secondary">{t('status.collaboration')}</p>
        </div>
      </div>
    </div>
  );
};

const ConsciousnessCouncil: React.FC<Omit<AppProps, 'handleSdkRequest'>> = ({ setCurrentView, theme, t, language, subscriptionManager }) => {
    const getAgents = useCallback((translator: Translator) => [
        { name: translator('council.agent.synthesist.name'), role: translator('council.agent.synthesist.role'), icon: Atom, color: 'text-blue-500', iconBg: 'bg-blue-500', borderColor: 'border-blue-500' },
        { name: translator('council.agent.skeptic.name'), role: translator('council.agent.skeptic.role'), icon: Scaling, color: 'text-orange-500', iconBg: 'bg-orange-500', borderColor: 'border-orange-500' },
        { name: translator('council.agent.ethicist.name'), role: translator('council.agent.ethicist.role'), icon: Shield, color: 'text-green-500', iconBg: 'bg-green-500', borderColor: 'border-green-500' },
        { name: translator('council.agent.explorer.name'), role: translator('council.agent.explorer.role'), icon: Compass, color: 'text-teal-500', iconBg: 'bg-teal-500', borderColor: 'border-teal-500' },
        { name: translator('council.agent.community.name'), role: translator('council.agent.community.role'), icon: Globe, color: 'text-indigo-500', iconBg: 'bg-indigo-500', borderColor: 'border-indigo-500' }
    ], []);
    
    const agents = getAgents(t);
    const [dialogue, setDialogue] = useState<any[]>([]);
    const [agentStatus, setAgentStatus] = useState<{[key: string]: string}>({});
    const councilTopic = t('council.topic');
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const communityAppUrl = useMemo(() => {
        const url = new URL('./community_app.html', window.location.origin);
        // URL params are a fallback for when the SDK hasn't loaded yet.
        url.searchParams.set('topic', councilTopic);
        url.searchParams.set('theme', theme);
        return url.toString();
    }, [councilTopic, theme]);

    const handleIframeLoad = () => {
        if (!iframeRef.current?.contentWindow) return;
        
        const pendingRequests = new Map<string, { resolve: (value: any) => void; reject: (reason?: any) => void }>();

        const C42_SDK_V2 = {
            version: '2.0',
            subscribe: (eventType: EventType, callback: (payload: any) => void) => {
                subscriptionManager.subscribe(eventType, callback);
                // Immediately publish current state to new subscriber
                if (eventType === 'theme_change') callback(theme);
                if (eventType === 'language_change') callback(language);
            },
            request: (action: string, payload: any) => {
                return new Promise((resolve, reject) => {
                    const requestId = `${action}-${Date.now()}-${Math.random()}`;
                    pendingRequests.set(requestId, { resolve, reject });

                    iframeRef.current?.contentWindow?.postMessage({
                        type: 'c42-sdk-request',
                        requestId,
                        action,
                        payload
                    }, '*');

                    // Timeout for requests
                    setTimeout(() => {
                        if (pendingRequests.has(requestId)) {
                            reject(new Error(`Request timed out for action: ${action}`));
                            pendingRequests.delete(requestId);
                        }
                    }, 15000);
                });
            },
            _handleResponse: (response: any) => {
                const { requestId, success, data, error } = response;
                if(pendingRequests.has(requestId)){
                    const { resolve, reject } = pendingRequests.get(requestId)!;
                    if(success) {
                        resolve(data);
                    } else {
                        reject(error);
                    }
                    pendingRequests.delete(requestId);
                }
            }
        };
        
        (iframeRef.current.contentWindow as any).C42_SDK = C42_SDK_V2;
    };
    
    useEffect(() => {
        const localAgents = getAgents(t);
        const script = [
            { agent: localAgents[0].name, text: t('council.dialogue.1', { topic: councilTopic }), status: t('council.status.analyzing') },
            { agent: localAgents[3].name, text: t('council.dialogue.2'), status: t('council.status.exploring') },
            { agent: localAgents[1].name, text: t('council.dialogue.3'), status: t('council.status.critiquing') },
            { agent: localAgents[2].name, text: t('council.dialogue.4'), status: t('council.status.evaluating') },
            { agent: localAgents[0].name, text: t('council.dialogue.5'), status: t('council.status.synthesizing') },
            { agent: localAgents[4].name, externalContentUrl: communityAppUrl, status: t('council.status.querying') },
            { agent: null, text: t('council.dialogue.6'), status: t('council.status.idle') },
        ];
        let i = 0;
        const interval = setInterval(() => {
            if (i < script.length) {
                setDialogue(prev => [...prev, script[i]]);
                if(script[i].agent) setAgentStatus(prev => ({...prev, [script[i].agent!]: script[i].status}));
                else setAgentStatus(Object.fromEntries(localAgents.map(a => [a.name, t('council.status.idle')])));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 2500);
        return () => clearInterval(interval);
    }, [t, communityAppUrl, councilTopic, getAgents]);

    return (
        <div className="space-y-6 animation-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-c42-text-dark-primary flex items-center space-x-3">
                    <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
                    <span>{t('council.title')}</span>
                </h2>
                <button onClick={() => setCurrentView('desktop')} className="flex items-center justify-center sm:justify-start w-full sm:w-auto space-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 rounded-lg transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                    <span>{t('council.back_button')}</span>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {agents.map(agent => (
                    <div key={agent.name} className={`bg-white dark:bg-c42-dark-card border border-gray-200 dark:border-gray-700 rounded-xl p-4 border-l-4 ${agent.borderColor}`}>
                        <div className="flex items-center space-x-3 mb-2">
                            <agent.icon className={`h-6 w-6 ${agent.color}`} />
                            <h3 className="font-bold text-gray-800 dark:text-c42-text-dark-primary">{agent.name}</h3>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-c42-text-dark-secondary mb-3">{agent.role}</p>
                        <p className="text-xs font-mono text-c42-primary">{agentStatus[agent.name] || t('council.status.idle')}</p>
                    </div>
                ))}
            </div>
            <div className="bg-white dark:bg-c42-dark-card border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-c42-text-dark-primary">{t('council.dialogue_title')}</h3>
                <div className="space-y-4 h-[32rem] overflow-y-auto pr-2">
                    {dialogue.map((entry, index) => (
                        <div key={index} className={`flex items-start gap-3 ${!entry.agent && 'pt-2'}`}>
                            {entry.agent ? (
                                <>
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${agents.find(a => a.name === entry.agent)?.iconBg}`}>
                                        {React.createElement(agents.find(a => a.name === entry.agent)?.icon || 'div', { className: 'w-5 h-5 text-white' })}
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-bold text-sm text-gray-800 dark:text-c42-text-dark-primary">{entry.agent}</p>
                                        {entry.text && <p className="text-gray-700 dark:text-c42-text-dark-secondary">{entry.text}</p>}
                                        {entry.externalContentUrl && (
                                            <div className="mt-2 border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-gray-50 dark:bg-gray-900/50">
                                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                                                    <Globe className="h-4 w-4" />
                                                    <span>{t('council.sandboxed.loading')}</span>
                                                </div>
                                                <iframe ref={iframeRef} onLoad={handleIframeLoad} src={entry.externalContentUrl} className="w-full h-96 rounded-md border-none" sandbox="allow-scripts allow-same-origin" title={`External Content from ${entry.agent}`}></iframe>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (<p className="text-center font-medium text-gray-500 dark:text-gray-400 w-full border-t border-gray-200 dark:border-gray-700 pt-3">{entry.text}</p>)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const DataCommons: React.FC<{ t: Translator }> = ({ t }) => {
    const [contributions, setContributions] = useState({ anonymizedPatterns: false, insightThemes: true, cognitiveFlow: false });
    const handleToggle = (key: keyof typeof contributions) => setContributions(prev => ({ ...prev, [key]: !prev[key] }));

    const contributionItems = [
        { key: 'patterns' as const, label: t('datacommons.patterns.label'), description: t('datacommons.patterns.desc') },
        { key: 'themes' as const, label: t('datacommons.themes.label'), description: t('datacommons.themes.desc') },
        { key: 'flow' as const, label: t('datacommons.flow.label'), description: t('datacommons.flow.desc') }
    ];

    return (
        <div id="data-commons-section" className="space-y-6 mt-12">
             <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:bg-none dark:bg-c42-dark-card border border-teal-200 dark:border-teal-800/50 rounded-xl p-6">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-teal-200 dark:border-teal-700 flex-shrink-0">
                        <Share2 className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-teal-900 dark:text-teal-300">{t('datacommons.title')}</h2>
                        <p className="text-teal-800 dark:text-teal-400 mt-1">{t('datacommons.subtitle')}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white/70 dark:bg-black/20 rounded-lg border border-teal-100 dark:border-gray-700 p-4">
                        <h3 className="font-bold text-gray-900 dark:text-c42-text-dark-primary mb-4">{t('datacommons.settings_title')}</h3>
                        <div className="space-y-4">
                            {contributionItems.map(item => (
                                <div key={item.key} className="flex flex-col sm:flex-row gap-2 sm:justify-between">
                                    <div className="pr-4">
                                        <label htmlFor={item.key} className="font-medium text-gray-800 dark:text-gray-200">{item.label}</label>
                                        <p className="text-sm text-gray-600 dark:text-c42-text-dark-secondary">{item.description}</p>
                                    </div>
                                    <button onClick={() => handleToggle(item.key === 'patterns' ? 'anonymizedPatterns' : item.key === 'themes' ? 'insightThemes' : 'cognitiveFlow')} className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${contributions[item.key === 'patterns' ? 'anonymizedPatterns' : item.key === 'themes' ? 'insightThemes' : 'cognitiveFlow'] ? 'bg-teal-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${contributions[item.key === 'patterns' ? 'anonymizedPatterns' : item.key === 'themes' ? 'insightThemes' : 'cognitiveFlow'] ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white/70 dark:bg-black/20 rounded-lg border border-teal-100 dark:border-gray-700 p-4">
                        <h3 className="font-bold text-gray-900 dark:text-c42-text-dark-primary mb-4">{t('datacommons.stats_title')}</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center"><span className="text-gray-700 dark:text-c42-text-dark-secondary">{t('datacommons.contributors')}</span><span className="font-mono font-bold text-teal-800 dark:text-teal-300">1,428</span></div>
                             <div className="flex justify-between items-center"><span className="text-gray-700 dark:text-c42-text-dark-secondary">{t('datacommons.insights')}</span><span className="font-mono font-bold text-teal-800 dark:text-teal-300">28,910</span></div>
                            <div className="flex justify-between items-center"><span className="text-gray-700 dark:text-c42-text-dark-secondary">{t('datacommons.privacy_score')}</span><span className="font-mono font-bold text-teal-800 dark:text-teal-300">{t('datacommons.privacy_score_value')}</span></div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700 dark:text-c42-text-dark-secondary">{t('datacommons.your_status')}</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${Object.values(contributions).some(v => v) ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                                    {Object.values(contributions).some(v => v) ? t('datacommons.status.active') : t('datacommons.status.inactive')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    )
}

const TransparencyDashboard: React.FC<Omit<AppProps, 'subscriptionManager' | 'handleSdkRequest'>> = ({ t }) => {
  const [auditResults, setAuditResults] = useState<any>(null);
  const [isAuditing, setIsAuditing] = useState(false);

  const runSystemAudit = async () => {
    setIsAuditing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAuditResults({
      privacy: { externalConnections: 0, dataLeaks: 0, trackingScripts: 0, userDataOwnership: 100 },
      collaboration: { openSourceComponents: 15, transparentProcesses: 12, userEmpowermentFeatures: 8 },
      neurodivergence: { accessibilityScore: 98, cognitiveLoadOptimization: 95, patternRecognitionSupport: 100 },
      timestamp: new Date()
    });
    setIsAuditing(false);
  };

  return (
    <div className="space-y-6 animation-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-c42-text-dark-primary flex items-center space-x-3">
          <Shield className="h-7 w-7 text-green-600 dark:text-green-400" />
          <span>{t('transparency.title')}</span>
        </h2>
        <button onClick={runSystemAudit} disabled={isAuditing} className="flex items-center justify-center sm:justify-start w-full sm:w-auto space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors">
          {isAuditing ? (<><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>{t('transparency.auditing_button')}</span></>) : (<><Eye className="h-4 w-4" /><span>{t('transparency.audit_button')}</span></>)}
        </button>
      </div>

      {auditResults && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animation-fade-in">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:bg-gradient-to-br dark:from-c42-dark-card dark:to-gray-900 border border-green-200 dark:border-green-800/50 rounded-xl p-6">
            <h3 className="font-bold text-green-900 dark:text-green-300 mb-4 flex items-center space-x-2"><Shield className="h-5 w-5" /><span>{t('transparency.privacy_score')}</span></h3>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-green-700 dark:text-green-400">{t('transparency.ext_connections')}</span><span className="font-mono font-bold text-green-800 dark:text-green-200">{auditResults.privacy.externalConnections}</span></div>
              <div className="flex justify-between"><span className="text-green-700 dark:text-green-400">{t('transparency.data_leaks')}</span><span className="font-mono font-bold text-green-800 dark:text-green-200">{auditResults.privacy.dataLeaks}</span></div>
              <div className="flex justify-between"><span className="text-green-700 dark:text-green-400">{t('transparency.user_ownership')}</span><span className="font-mono font-bold text-green-800 dark:text-green-200">{auditResults.privacy.userDataOwnership}%</span></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:bg-gradient-to-br dark:from-c42-dark-card dark:to-gray-900 border border-blue-200 dark:border-blue-800/50 rounded-xl p-6">
            <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-4 flex items-center space-x-2"><Users className="h-5 w-5" /><span>{t('transparency.collab_score')}</span></h3>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-blue-700 dark:text-blue-400">{t('transparency.open_source')}</span><span className="font-mono font-bold text-blue-800 dark:text-blue-200">{auditResults.collaboration.openSourceComponents}</span></div>
              <div className="flex justify-between"><span className="text-blue-700 dark:text-blue-400">{t('transparency.transparent_proc')}</span><span className="font-mono font-bold text-blue-800 dark:text-blue-200">{auditResults.collaboration.transparentProcesses}</span></div>
              <div className="flex justify-between"><span className="text-blue-700 dark:text-blue-400">{t('transparency.user_empowerment')}</span><span className="font-mono font-bold text-blue-800 dark:text-blue-200">{auditResults.collaboration.userEmpowermentFeatures}</span></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:bg-gradient-to-br dark:from-c42-dark-card dark:to-gray-900 border border-purple-200 dark:border-purple-800/50 rounded-xl p-6">
            <h3 className="font-bold text-purple-900 dark:text-purple-300 mb-4 flex items-center space-x-2"><Brain className="h-5 w-5" /><span>{t('transparency.neuro_opt')}</span></h3>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-purple-700 dark:text-purple-400">{t('transparency.access_score')}</span><span className="font-mono font-bold text-purple-800 dark:text-purple-200">{auditResults.neurodivergence.accessibilityScore}%</span></div>
              <div className="flex justify-between"><span className="text-purple-700 dark:text-purple-400">{t('transparency.cognitive_load')}</span><span className="font-mono font-bold text-purple-800 dark:text-purple-200">{auditResults.neurodivergence.cognitiveLoadOptimization}%</span></div>
              <div className="flex justify-between"><span className="text-purple-700 dark:text-purple-400">{t('transparency.pattern_recog')}</span><span className="font-mono font-bold text-purple-800 dark:text-purple-200">{auditResults.neurodivergence.patternRecognitionSupport}%</span></div>
            </div>
          </div>
        </div>
      )}
      <div className="bg-gray-50 dark:bg-c42-dark-card border border-gray-200 dark:border-gray-700 rounded-xl p-6">
        <h3 className="font-bold text-gray-900 dark:text-c42-text-dark-primary mb-4 flex items-center space-x-2"><Github className="h-5 w-5" /><span>{t('transparency.source_verification')}</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3"><CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />
            <span className="text-gray-700 dark:text-c42-text-dark-secondary">{t('transparency.source_available')}</span></div>
          <div className="flex items-center space-x-3"><CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />
            <span className="text-gray-700 dark:text-c42-text-dark-secondary">{t('transparency.no_proprietary')}</span></div>
          <div className="flex items-center space-x-3"><CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />
            <span className="text-gray-700 dark:text-c42-text-dark-secondary">{t('transparency.reproducible_builds')}</span></div>
          <div className="flex items-center space-x-3"><CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />
            <span className="text-gray-700 dark:text-c42-text-dark-secondary">{t('transparency.independent_audits')}</span></div>
        </div>
      </div>
      <DataCommons t={t} />
    </div>
  );
};

const C42Applications: React.FC<Omit<AppProps, 'subscriptionManager' | 'handleSdkRequest'> & { appRegistry: any[] }> = ({ setCurrentView, appRegistry, t }) => {
  const launchableApps = appRegistry.filter(app => app.isLaunchable);

  return (
    <div className="space-y-6 animation-fade-in">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-c42-text-dark-primary flex items-center space-x-3">
        <Sparkles className="h-7 w-7 text-purple-600 dark:text-purple-400" />
        <span>{t('apps.title')}</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {launchableApps.map((app) => (
          <div key={app.id} className="group cursor-pointer" onClick={() => setCurrentView(app.id as View)}>
            <div className="bg-white dark:bg-c42-dark-card rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg dark:hover:shadow-purple-500/10 transition-all duration-300 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`bg-gradient-to-br ${app.color} p-3 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <app.icon className="h-6 w-6 text-white" />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${app.status === 'ready' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : app.status === 'preview' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}>
                  {t(`apps.status.${app.status}`)}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-c42-text-dark-primary mb-2 group-hover:text-c42-primary transition-colors">{t(app.nameKey)}</h3>
              <p className="text-gray-600 dark:text-c42-text-dark-secondary text-sm leading-relaxed mb-4">{t(app.descriptionKey)}</p>
              <div className="flex items-center text-c42-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>{t('apps.launch')}</span><ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PlaceholderApp: React.FC<Omit<AppProps, 'subscriptionManager' | 'handleSdkRequest'> & { app: any }> = ({ setCurrentView, app, t }) => (
    <div className="space-y-6 animation-fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-c42-text-dark-primary flex items-center space-x-3">
                <app.icon className={`h-8 w-8 text-purple-600 dark:text-purple-400`} />
                <span>{t(app.nameKey)}</span>
            </h2>
            <button onClick={() => setCurrentView('applications')} className="flex items-center justify-center sm:justify-start w-full sm:w-auto space-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 rounded-lg transition-colors">
                <ChevronLeft className="h-4 w-4" /><span>{t('placeholder.back_button')}</span>
            </button>
        </div>
        <div className="bg-white dark:bg-c42-dark-card border border-gray-200 dark:border-gray-700 rounded-xl p-12 text-center">
            <Package className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-c42-text-dark-primary">{t('placeholder.coming_soon')}</h3>
            <p className="text-gray-600 dark:text-c42-text-dark-secondary mt-2 max-w-md mx-auto">{t('placeholder.message', { appName: t(app.nameKey), appStatus: t(`apps.status.${app.status}`) })}</p>
        </div>
    </div>
);

const DesktopView: React.FC<Omit<AppProps, 'subscriptionManager' | 'handleSdkRequest'>> = ({ setCurrentView, t }) => (
    <div className="relative">
        <div className="space-y-12 animation-fade-in">
            <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-c42-text-dark-primary flex items-center justify-center space-x-2 sm:space-x-4">
                    <Brain className="h-8 w-8 md:h-10 md:w-10 text-purple-600 dark:text-purple-400" />
                    <span>{t('desktop.title')}</span>
                </h1>
                <p className="text-md sm:text-lg text-gray-600 dark:text-c42-text-dark-secondary max-w-3xl mx-auto">{t('desktop.subtitle')}</p>
            </div>
            <CorePrinciples t={t} />
            <SystemStatus t={t} />
            <div className="text-center">
                <button onClick={() => setCurrentView('applications')} className="inline-flex items-center space-x-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-c42-gradient-start to-c42-gradient-end hover:opacity-90 text-white rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                    <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span>{t('desktop.explore_button')}</span>
                    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
            </div>
        </div>
        <Brain className="absolute bottom-4 right-4 h-20 w-20 text-c42-primary/5 pointer-events-none" />
    </div>
);

const VoiceCommandInterface: React.FC<{ status: string; transcript: string; onClose: () => void; isListening: boolean; t: Translator; }> = ({ status, transcript, onClose, isListening, t }) => {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 mb-4 w-full max-w-lg z-50 px-4 animation-fade-in">
        <div className="bg-white/80 dark:bg-c42-dark-card/80 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                    {isListening ? <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div> : <div className="w-3 h-3 bg-purple-500 rounded-full"></div>}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{status}</span>
                </div>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400"><X className="h-4 w-4" /></button>
            </div>
            <p className="text-lg text-gray-900 dark:text-c42-text-dark-primary min-h-[28px]">
                {transcript || <span className="text-gray-400 dark:text-gray-500">{t('voice.prompt')}</span>}
            </p>
        </div>
    </div>
  );
};

const LanguageSwitcher: React.FC<{ language: Language, setLanguage: (lang: Language) => void, t: Translator }> = ({ language, setLanguage, t }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languages: { key: Language, label: string }[] = [
        { key: 'en', label: t('nav.language.english') },
        { key: 'es', label: t('nav.language.spanish') },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (lang: Language) => {
        setLanguage(lang);
        setIsOpen(false);
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors flex items-center">
                <Globe className="h-5 w-5" />
                <ChevronDown className="h-4 w-4 ml-1 opacity-70" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-c42-dark-card rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden animation-fade-in">
                    {languages.map(lang => (
                        <button key={lang.key} onClick={() => handleSelect(lang.key)} className={`w-full text-left px-4 py-2 text-sm transition-colors ${language === lang.key ? 'bg-purple-100 dark:bg-purple-900/50 text-c42-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                            {lang.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}


const NavigationBar: React.FC<{ currentView: View; setCurrentView: (view: View) => void; theme: Theme; toggleTheme: () => void; onVoiceToggle: () => void; isListening: boolean; t: Translator; language: Language; setLanguage: (lang: Language) => void; }> = ({ currentView, setCurrentView, theme, toggleTheme, onVoiceToggle, isListening, t, language, setLanguage }) => (
    <div className="bg-white/80 dark:bg-c42-dark-card/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 py-3 sticky top-0 z-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button onClick={() => setCurrentView('desktop')} className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors font-medium ${currentView === 'desktop' ? 'bg-c42-primary text-white' : 'text-gray-600 hover:bg-gray-100 dark:text-c42-text-dark-secondary dark:hover:bg-gray-800 dark:hover:text-c42-text-dark-primary'}`}><Brain className="h-5 w-5" /><span>{t('nav.os')}</span></button>
          <button onClick={() => setCurrentView('applications')} className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors font-medium ${currentView === 'applications' ? 'bg-c42-primary text-white' : 'text-gray-600 hover:bg-gray-100 dark:text-c42-text-dark-secondary dark:hover:bg-gray-800 dark:hover:text-c42-text-dark-primary'}`}><Sparkles className="h-5 w-5" /><span>{t('nav.applications')}</span></button>
          <button onClick={() => setCurrentView('transparency')} className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors font-medium ${currentView === 'transparency' ? 'bg-c42-primary text-white' : 'text-gray-600 hover:bg-gray-100 dark:text-c42-text-dark-secondary dark:hover:bg-gray-800 dark:hover:text-c42-text-dark-primary'}`}><Shield className="h-5 w-5" /><span>{t('nav.transparency')}</span></button>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium hidden md:inline">{t('nav.consciousness_active')}</span>
          </div>
          <button onClick={onVoiceToggle} className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-500/80 text-white animate-pulse' : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'}`}><Mic className="h-5 w-5" /></button>
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors">{theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</button>
          <LanguageSwitcher language={language} setLanguage={setLanguage} t={t} />
        </div>
      </div>
    </div>
);

const C42OperatingSystem: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('desktop');
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('en');
  const [showVoiceUI, setShowVoiceUI] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState('Idle');
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const subscriptionManager = useMemo(() => new SubscriptionManager(), []);

  const t = useCallback((key: string, replacements: Record<string, string> = {}) => {
    let str = translations[language]?.[key] || translations['en']?.[key] || key;
    for (const placeholder in replacements) {
        str = str.replace(`{${placeholder}}`, replacements[placeholder]);
    }
    return str;
  }, [language]);

  const [APP_REGISTRY] = useState(() => {
    const registry: any[] = [];
    const appDefinitions = [
        { id: 'desktop', component: DesktopView, isLaunchable: false },
        { id: 'applications', component: (props: AppProps) => <C42Applications {...props} appRegistry={registry} />, isLaunchable: false },
        { id: 'transparency', component: TransparencyDashboard, isLaunchable: false },
        { id: 'consciousness_council', nameKey: 'council.title', descriptionKey: 'apps.desc.council', icon: Users, status: 'ready', color: 'from-green-500 to-teal-500', isLaunchable: true, component: ConsciousnessCouncil },
        { id: 'conversation_archaeology', nameKey: 'apps.name.archaeology', descriptionKey: 'apps.desc.archaeology', icon: MessageSquare, status: 'ready', color: 'from-blue-500 to-cyan-500', isLaunchable: true, component: (props: AppProps) => <PlaceholderApp {...props} app={registry.find(a=>a.id==='conversation_archaeology')} /> },
        { id: 'data_commons', nameKey: 'apps.name.datacommons', descriptionKey: 'apps.desc.datacommons', icon: Share2, status: 'ready', color: 'from-teal-500 to-green-500', isLaunchable: true },
        { id: 'pattern_weaver', nameKey: 'apps.name.weaver', descriptionKey: 'apps.desc.weaver', icon: Network, status: 'preview', color: 'from-purple-500 to-pink-500', isLaunchable: true, component: (props: AppProps) => <PlaceholderApp {...props} app={registry.find(a=>a.id==='pattern_weaver')} /> },
        { id: 'memory_palace', nameKey: 'apps.name.palace', descriptionKey: 'apps.desc.palace', icon: Database, status: 'concept', color: 'from-orange-500 to-red-500', isLaunchable: true, component: (props: AppProps) => <PlaceholderApp {...props} app={registry.find(a=>a.id==='memory_palace')} /> },
        { id: 'insight_garden', nameKey: 'apps.name.garden', descriptionKey: 'apps.desc.garden', icon: Lightbulb, status: 'concept', color: 'from-yellow-500 to-orange-500', isLaunchable: true, component: (props: AppProps) => <PlaceholderApp {...props} app={registry.find(a=>a.id==='insight_garden')} /> },
    ];
    registry.push(...appDefinitions);
    return registry;
  });

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0] as Language;
    if (translations[browserLang]) {
        setLanguage(browserLang);
    }
  }, []);

  const navigateTo = (viewId: View) => {
    if (viewId === 'data_commons') {
      setCurrentView('transparency');
      setTimeout(() => document.querySelector('#data-commons-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
        const app = APP_REGISTRY.find(app => app.id === viewId);
        if(app?.component) setCurrentView(viewId);
    }
  };

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
        const newTheme = prev === 'light' ? 'dark' : 'light';
        subscriptionManager.publish('theme_change', newTheme);
        return newTheme;
    });
  }, [subscriptionManager]);

  const handleSetLanguage = useCallback((lang: Language) => {
      setLanguage(lang);
      subscriptionManager.publish('language_change', lang);
  }, [subscriptionManager]);

  useEffect(() => {
    window.document.documentElement.classList.remove(theme === 'dark' ? 'light' : 'dark');
    window.document.documentElement.classList.add(theme);
    window.document.documentElement.lang = language;
  }, [theme, language]);
  
  const handleSdkRequest = useCallback(async (event: MessageEvent) => {
    const { type, requestId, action, payload } = event.data;
    if (type !== 'c42-sdk-request') return;

    let response;
    try {
        switch (action) {
            case 'generate_response':
                if (!process.env.API_KEY) {
                    throw new Error('Host environment is missing the API Key.');
                }
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const prompt = `As an external community-aligned AI model, provide a concise and insightful perspective on the following topic: ${payload.topic}`;
                const result = await ai.models.generateContent({ model: 'gemini-2.5-flash-preview-04-17', contents: prompt });
                response = { success: true, data: { text: result.text } };
                break;
            default:
                throw new Error(`Unknown SDK action: ${action}`);
        }
    } catch (error: any) {
        response = { success: false, error: error.message || 'An unknown error occurred.' };
    }

    if (event.source) {
      (event.source as Window).postMessage({
            type: 'c42-sdk-response',
            requestId,
            ...response
        }, { targetOrigin: event.origin });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleSdkRequest);
    return () => window.removeEventListener('message', handleSdkRequest);
  }, [handleSdkRequest]);


  const processVoiceCommand = useCallback((command: string) => {
    const lowerCaseCommand = command.toLowerCase().trim();
    const findAndNavigate = (view: View, name: string) => {
        navigateTo(view);
        setVoiceStatus(`Navigating to ${name}`);
        setTimeout(() => setShowVoiceUI(false), 2000);
        return true;
    }

    if (lowerCaseCommand.includes('home') || lowerCaseCommand.includes('desktop')) return findAndNavigate('desktop', 'Desktop');
    if (lowerCaseCommand.includes('application')) return findAndNavigate('applications', 'Applications');
    if (lowerCaseCommand.includes('transparency')) return findAndNavigate('transparency', 'Transparency Dashboard');
    
    const targetApp = APP_REGISTRY.find(app => app.isLaunchable && app.nameKey && lowerCaseCommand.includes(t(app.nameKey).toLowerCase()));
    if (targetApp) return findAndNavigate(targetApp.id as View, t(targetApp.nameKey));
    
    if (lowerCaseCommand.includes('toggle theme') || lowerCaseCommand.includes('switch theme')) {
      toggleTheme();
      setVoiceStatus(`Switched to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      setTimeout(() => setShowVoiceUI(false), 2000);
      return;
    }

    setVoiceStatus("Command not recognized.");
    setTimeout(() => setVoiceStatus("Idle"), 2000);
  }, [toggleTheme, theme, t, APP_REGISTRY, navigateTo]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onstart = () => { setIsListening(true); setVoiceStatus('Listening...'); setTranscript(''); };
    recognition.onresult = (event) => processVoiceCommand(event.results[event.results.length - 1][0].transcript);
    recognition.onerror = (event) => { setVoiceStatus(`Error: ${event.error}`); setIsListening(false); };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    return () => recognitionRef.current?.stop();
  }, [processVoiceCommand]);
  
  const handleVoiceToggle = () => {
    if (!recognitionRef.current) { setShowVoiceUI(true); setVoiceStatus('Voice recognition not supported.'); return; }
    if (isListening) recognitionRef.current.stop();
    else { setShowVoiceUI(true); setVoiceStatus('Idle'); setTranscript(''); try { recognitionRef.current.start(); } catch(e) { setVoiceStatus("Error starting voice recognition.") } }
  };

  const closeVoiceUI = () => { if (isListening) recognitionRef.current?.stop(); setShowVoiceUI(false); };
  
  const ActiveAppComponent = APP_REGISTRY.find(app => app.id === currentView)?.component;

  const appProps = {
      setCurrentView: navigateTo,
      theme,
      language,
      t,
      subscriptionManager,
      handleSdkRequest
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-c42-dark-bg text-gray-800 dark:text-c42-text-dark-secondary transition-colors duration-300">
      <NavigationBar currentView={currentView} setCurrentView={navigateTo} theme={theme} toggleTheme={toggleTheme} onVoiceToggle={handleVoiceToggle} isListening={isListening} t={t} language={language} setLanguage={handleSetLanguage} />
      {showVoiceUI && <VoiceCommandInterface status={voiceStatus} transcript={transcript} onClose={closeVoiceUI} isListening={isListening} t={t} />}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {ActiveAppComponent ? <ActiveAppComponent {...appProps} /> : <div>View not found</div>}
      </main>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<React.StrictMode><C42OperatingSystem /></React.StrictMode>);
}
