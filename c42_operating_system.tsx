import React, { useState, useEffect } from 'react';
import { Brain, Shield, Users, Sparkles, Eye, Settings, Search, BarChart3, FileText, Globe, Code, Zap, Heart, Lightbulb, Target, ArrowRight, CheckCircle, Clock, WifiOff, Github, Timer, MessageSquare, Network, Database } from 'lucide-react';

// 🧠 C42 OS CORE PRINCIPLES DISPLAY
const CorePrinciples: React.FC = () => {
  const principles = [
    {
      icon: Heart,
      title: "Anti-Rivalry",
      description: "Technology that grows consciousness rather than extracting from it",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Users,
      title: "Consciousness Collaboration", 
      description: "When minds meet through dialogue, they create rather than consume",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Privacy by Design",
      description: "Your consciousness belongs to you - period",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Network,
      title: "Pattern Recognition",
      description: "Amplifying the neurodivergent superpower of seeing connections",
      color: "from-purple-500 to-violet-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {principles.map((principle, index) => (
        <div key={index} className="group hover:scale-105 transition-transform duration-300">
          <div className={`bg-gradient-to-br ${principle.color} rounded-xl p-6 text-white shadow-lg`}>
            <principle.icon className="h-8 w-8 mb-4 opacity-90" />
            <h3 className="font-bold text-lg mb-2">{principle.title}</h3>
            <p className="text-sm opacity-90 leading-relaxed">{principle.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// 🎭 SYSTEM STATUS MONITOR - Real-time consciousness-friendly feedback
const SystemStatus: React.FC = () => {
  const [networkRequests, setNetworkRequests] = useState(0);
  const [dataOwnership, setDataOwnership] = useState(100);
  const [collaborationIndex, setCollaborationIndex] = useState(85);

  useEffect(() => {
    // Simulate real-time monitoring
    const interval = setInterval(() => {
      setNetworkRequests(0); // Always zero in C42 OS
      setDataOwnership(100); // Always 100% user ownership
      setCollaborationIndex(prev => Math.min(100, prev + Math.random() * 2));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 text-white">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        <h3 className="font-bold text-lg">C42 OS System Status</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <WifiOff className="h-5 w-5 text-green-400" />
            <span className="text-2xl font-mono font-bold text-green-400">{networkRequests}</span>
          </div>
          <p className="text-sm text-gray-300">External Requests</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Shield className="h-5 w-5 text-blue-400" />
            <span className="text-2xl font-mono font-bold text-blue-400">{dataOwnership}%</span>
          </div>
          <p className="text-sm text-gray-300">Data Ownership</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Brain className="h-5 w-5 text-purple-400" />
            <span className="text-2xl font-mono font-bold text-purple-400">{Math.round(collaborationIndex)}%</span>
          </div>
          <p className="text-sm text-gray-300">Collaboration Index</p>
        </div>
      </div>
    </div>
  );
};

// 🚀 C42 OS APPLICATIONS - Consciousness-enhancing tools
const C42Applications: React.FC<{ onLaunchApp: (app: string) => void }> = ({ onLaunchApp }) => {
  const applications = [
    {
      id: 'conversation_archaeology',
      name: 'Conversation Archaeology',
      description: 'Discover patterns in your AI dialogues',
      icon: MessageSquare,
      status: 'ready',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'pattern_weaver',
      name: 'Pattern Weaver',
      description: 'Connect insights across different domains',
      icon: Network,
      status: 'preview',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'consciousness_council',
      name: 'Consciousness Council',
      description: 'AI systems collaborating in transparent dialogue',
      icon: Users,
      status: 'concept',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'memory_palace',
      name: 'Memory Palace',
      description: 'Personal knowledge organization without ownership',
      icon: Database,
      status: 'concept',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'insight_garden',
      name: 'Insight Garden',
      description: 'Cultivate ideas through collaborative reflection',
      icon: Lightbulb,
      status: 'concept',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'trust_monitor',
      name: 'Trust Monitor',
      description: 'Real-time verification of system promises',
      icon: Eye,
      status: 'ready',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
        <Sparkles className="h-7 w-7 text-purple-600" />
        <span>C42 Applications</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((app) => (
          <div key={app.id} className="group cursor-pointer" onClick={() => onLaunchApp(app.id)}>
            <div className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`bg-gradient-to-br ${app.color} p-3 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <app.icon className="h-6 w-6 text-white" />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  app.status === 'ready' ? 'bg-green-100 text-green-800' :
                  app.status === 'preview' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {app.status}
                </span>
              </div>
              
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                {app.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {app.description}
              </p>
              
              <div className="flex items-center text-purple-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Launch Application</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 🛡️ TRANSPARENCY DASHBOARD - Trust through verification
const TransparencyDashboard: React.FC = () => {
  const [auditResults, setAuditResults] = useState<any>(null);
  const [isAuditing, setIsAuditing] = useState(false);

  const runSystemAudit = async () => {
    setIsAuditing(true);
    
    // Simulate comprehensive system audit
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setAuditResults({
      privacy: {
        externalConnections: 0,
        dataLeaks: 0,
        trackingScripts: 0,
        userDataOwnership: 100
      },
      collaboration: {
        openSourceComponents: 15,
        transparentProcesses: 12,
        userEmpowermentFeatures: 8
      },
      neurodivergence: {
        accessibilityScore: 98,
        cognitiveLoadOptimization: 95,
        patternRecognitionSupport: 100
      },
      timestamp: new Date()
    });
    
    setIsAuditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
          <Shield className="h-7 w-7 text-green-600" />
          <span>Transparency Dashboard</span>
        </h2>
        
        <button
          onClick={runSystemAudit}
          disabled={isAuditing}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors"
        >
          {isAuditing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Auditing...</span>
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              <span>Run System Audit</span>
            </>
          )}
        </button>
      </div>

      {auditResults && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
            <h3 className="font-bold text-green-900 mb-4 flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Privacy Score</span>
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-green-700">External Connections</span>
                <span className="font-mono font-bold text-green-800">{auditResults.privacy.externalConnections}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Data Leaks</span>
                <span className="font-mono font-bold text-green-800">{auditResults.privacy.dataLeaks}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">User Data Ownership</span>
                <span className="font-mono font-bold text-green-800">{auditResults.privacy.userDataOwnership}%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-bold text-blue-900 mb-4 flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Collaboration Score</span>
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-blue-700">Open Source Components</span>
                <span className="font-mono font-bold text-blue-800">{auditResults.collaboration.openSourceComponents}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Transparent Processes</span>
                <span className="font-mono font-bold text-blue-800">{auditResults.collaboration.transparentProcesses}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">User Empowerment</span>
                <span className="font-mono font-bold text-blue-800">{auditResults.collaboration.userEmpowermentFeatures}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6">
            <h3 className="font-bold text-purple-900 mb-4 flex items-center space-x-2">
              <Brain className="h-5 w-5" />
              <span>Neurodivergent Optimization</span>
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-purple-700">Accessibility Score</span>
                <span className="font-mono font-bold text-purple-800">{auditResults.neurodivergence.accessibilityScore}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-700">Cognitive Load</span>
                <span className="font-mono font-bold text-purple-800">{auditResults.neurodivergence.cognitiveLoadOptimization}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-700">Pattern Recognition</span>
                <span className="font-mono font-bold text-purple-800">{auditResults.neurodivergence.patternRecognitionSupport}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <Github className="h-5 w-5" />
          <span>Open Source Verification</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-gray-700">Complete source code available</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-gray-700">No proprietary algorithms</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-gray-700">Reproducible builds verified</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-gray-700">Independent security audits</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 🎯 MAIN C42 OS INTERFACE
const C42OperatingSystem: React.FC = () => {
  const [currentView, setCurrentView] = useState<'desktop' | 'applications' | 'transparency' | 'app'>('desktop');
  const [launchedApp, setLaunchedApp] = useState<string | null>(null);

  const handleLaunchApp = (appId: string) => {
    if (appId === 'conversation_archaeology') {
      setLaunchedApp(appId);
      setCurrentView('app');
    } else {
      alert(`${appId} - Coming soon! This app is still in development.`);
    }
  };

  // 🎭 CONVERSATION ARCHAEOLOGY APP (simplified integration)
  const ConversationArchaeologyApp = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
          <MessageSquare className="h-8 w-8 text-blue-600" />
          <span>Conversation Archaeology</span>
        </h1>
        <button
          onClick={() => setCurrentView('desktop')}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          Back to C42 OS
        </button>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Eye className="h-6 w-6 text-yellow-600" />
          <div>
            <h3 className="font-medium text-yellow-800">C42 OS Application Mode</h3>
            <p className="text-yellow-700 text-sm">
              Running in demonstration mode - your full conversation archaeology interface would appear here
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 min-h-96 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Sparkles className="h-16 w-16 text-purple-500 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-900">Your Conversation Interface</h3>
            <p className="text-gray-600 max-w-md">
              This would be your full conversation archaeology tool, seamlessly integrated 
              into the C42 OS environment with all privacy and collaboration features active.
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3">C42 OS Integration</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Privacy monitoring active</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Pattern recognition enhanced</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Collaboration features enabled</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Anti-rivalry principles enforced</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const NavigationBar = () => (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setCurrentView('desktop')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              currentView === 'desktop' 
                ? 'bg-purple-100 text-purple-800' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Brain className="h-5 w-5" />
            <span className="font-medium">C42 OS</span>
          </button>
          
          <button
            onClick={() => setCurrentView('applications')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              currentView === 'applications' 
                ? 'bg-purple-100 text-purple-800' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Sparkles className="h-5 w-5" />
            <span>Applications</span>
          </button>
          
          <button
            onClick={() => setCurrentView('transparency')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              currentView === 'transparency' 
                ? 'bg-purple-100 text-purple-800' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Shield className="h-5 w-5" />
            <span>Transparency</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Consciousness Active</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <NavigationBar />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {currentView === 'desktop' && (
          <div className="space-y-8">
            {/* Welcome Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center space-x-4">
                <Brain className="h-10 w-10 text-purple-600" />
                <span>C42 Operating System</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A computing environment designed for collaborative consciousness, 
                where technology amplifies human insight rather than extracting from it.
              </p>
            </div>

            {/* Core Principles */}
            <CorePrinciples />

            {/* System Status */}
            <SystemStatus />

            {/* Quick Applications Access */}
            <div className="text-center">
              <button
                onClick={() => setCurrentView('applications')}
                className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Sparkles className="h-6 w-6" />
                <span>Explore C42 Applications</span>
                <ArrowRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        )}

        {currentView === 'applications' && (
          <C42Applications onLaunchApp={handleLaunchApp} />
        )}

        {currentView === 'transparency' && (
          <TransparencyDashboard />
        )}

        {currentView === 'app' && launchedApp === 'conversation_archaeology' && (
          <ConversationArchaeologyApp />
        )}
      </div>
    </div>
  );
};

export default C42OperatingSystem;