import { useState } from 'react';
import { poems, type Poem } from './data/poems';
import { BookOpen, ChevronLeft, HelpCircle, Volume2, Sparkles, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type ViewMode = 'list' | 'detail' | 'recite';

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('list');
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  const [showPinyin, setShowPinyin] = useState(true);
  const [reciteMode, setReciteMode] = useState<'none' | 'fill'>('none');
  const [showResult, setShowResult] = useState(false);

  const handleSelectPoem = (poem: Poem) => {
    setSelectedPoem(poem);
    setCurrentView('detail');
    setReciteMode('none');
    setShowResult(false);
  };

  const handleBack = () => {
    if (reciteMode !== 'none') {
      setReciteMode('none');
      setShowResult(false);
    } else {
      setCurrentView('list');
      setSelectedPoem(null);
    }
  };

  const startRecite = () => {
    setReciteMode('fill');
  };

  const speakPoem = () => {
    if (selectedPoem && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        selectedPoem.title + '。' + selectedPoem.author + '。' + selectedPoem.content.join('')
      );
      utterance.lang = 'zh-CN';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const getHiddenLine = (line: string) => {
    if (reciteMode === 'none' || showResult) return line;
    
    // 随机隐藏一些字，保留标点
    const chars = line.split('');
    const hiddenIndices: number[] = [];
    
    // 每句隐藏2-3个字
    const hideCount = Math.min(3, Math.floor(chars.length / 3));
    const validIndices = chars.map((c, i) => /[，。]/.test(c) ? -1 : i).filter(i => i !== -1);
    
    while (hiddenIndices.length < hideCount && validIndices.length > 0) {
      const randomIndex = Math.floor(Math.random() * validIndices.length);
      hiddenIndices.push(validIndices[randomIndex]);
      validIndices.splice(randomIndex, 1);
    }
    
    return chars.map((char, index) => {
      if (hiddenIndices.includes(index)) {
        return '___';
      }
      return char;
    }).join('');
  };

  // 列表页面
  if (currentView === 'list') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-6 px-4 shadow-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center gap-3">
              <BookOpen className="w-8 h-8 md:w-10 md:h-10" />
              趣味背古诗
            </h1>
            <p className="text-amber-100 text-sm md:text-base">快乐学习，轻松背诵</p>
          </div>
        </header>

        {/* Poem List */}
        <main className="max-w-4xl mx-auto p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {poems.map((poem) => (
              <Card
                key={poem.id}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-amber-100 hover:border-amber-300 overflow-hidden group"
                onClick={() => handleSelectPoem(poem)}
              >
                <div className="h-32 overflow-hidden">
                  <img
                    src={poem.image}
                    alt={poem.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold text-amber-900 mb-1">{poem.title}</h3>
                  <p className="text-amber-600 text-sm">
                    {poem.dynasty} · {poem.author}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-6 text-amber-600 text-sm">
          <p>共 {poems.length} 首古诗 · 适合小学三年级</p>
        </footer>
      </div>
    );
  }

  // 详情页面
  if (currentView === 'detail' && selectedPoem) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 px-4 shadow-lg sticky top-0 z-10">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="text-white hover:bg-white/20"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              返回
            </Button>
            <h1 className="text-lg md:text-xl font-bold">{selectedPoem.title}</h1>
            <div className="w-16" />
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-4 md:p-6">
          {/* Image */}
          <Card className="mb-6 overflow-hidden border-2 border-amber-200">
            <img
              src={selectedPoem.image}
              alt={selectedPoem.title}
              className="w-full h-48 md:h-64 object-cover"
            />
          </Card>

          {/* Poem Content */}
          <Card className="mb-6 border-2 border-amber-200">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-amber-900 mb-2">
                  {selectedPoem.title}
                </h2>
                <p className="text-amber-600">
                  {selectedPoem.dynasty} · {selectedPoem.author}
                </p>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-3 mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPinyin(!showPinyin)}
                  className="border-amber-300 text-amber-700"
                >
                  {showPinyin ? '隐藏拼音' : '显示拼音'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={speakPoem}
                  className="border-amber-300 text-amber-700"
                >
                  <Volume2 className="w-4 h-4 mr-1" />
                  朗读
                </Button>
              </div>

              {/* Poem Lines */}
              <div className="space-y-4 text-center">
                {selectedPoem.content.map((line, index) => (
                  <div key={index} className="space-y-1">
                    {showPinyin && reciteMode === 'none' && (
                      <p className="text-amber-400 text-sm md:text-base font-mono">
                        {selectedPoem.pinyin[index]}
                      </p>
                    )}
                    <p className="text-xl md:text-2xl text-amber-900 font-medium leading-relaxed">
                      {reciteMode === 'fill' && !showResult
                        ? getHiddenLine(line)
                        : line}
                    </p>
                  </div>
                ))}
              </div>

              {/* Recite Button */}
              {reciteMode === 'none' && (
                <div className="mt-8 text-center">
                  <Button
                    onClick={startRecite}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 text-lg rounded-full shadow-lg"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    开始背诵
                  </Button>
                </div>
              )}

              {reciteMode === 'fill' && !showResult && (
                <div className="mt-8 text-center">
                  <Button
                    onClick={() => setShowResult(true)}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 text-lg rounded-full shadow-lg"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    查看答案
                  </Button>
                </div>
              )}

              {reciteMode === 'fill' && showResult && (
                <div className="mt-8 text-center">
                  <p className="text-green-600 text-lg mb-4 font-medium">太棒了！你已经背会了这首诗！</p>
                  <Button
                    onClick={() => {
                      setReciteMode('none');
                      setShowResult(false);
                    }}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 text-lg rounded-full shadow-lg"
                  >
                    再背一遍
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Annotations */}
          <Card className="mb-6 border-2 border-amber-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                词语注释
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedPoem.annotations.map((anno, index) => (
                  <div key={index} className="bg-amber-50 rounded-lg p-3">
                    <span className="font-bold text-amber-800">{anno.word}</span>
                    <span className="text-amber-600 mx-2">:</span>
                    <span className="text-amber-700">{anno.meaning}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Background */}
          <Card className="border-2 border-amber-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                背景介绍
              </h3>
              <p className="text-amber-800 leading-relaxed text-sm md:text-base">
                {selectedPoem.background}
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return null;
}

export default App;
