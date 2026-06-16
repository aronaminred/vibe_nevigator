"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bot,
  Check,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  Database,
  Download,
  FilePlus,
  FileText,
  FolderOpen,
  HelpCircle,
  Lightbulb,
  Link,
  Monitor,
  PanelTop,
  RotateCcw,
  Save,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import {
  createDevelopmentPrompt,
  createStepPrompt,
  getStepCompletion,
} from "@/lib/promptTemplates";
import { clearProject, loadProject, saveProject } from "@/lib/projectStorage";
import { emptyProject, steps } from "@/lib/steps";
import { glossary } from "@/lib/glossary";
import { createResultSections } from "@/lib/resultDocuments";
import type { Project, ProjectField } from "@/types/project";
import { Win95Button } from "@/components/win95/Win95Button";
import { AdSlot } from "@/components/monetization/AdSlot";

const emptyText = "아직 입력되지 않음";

const iconMap = {
  idea: Lightbulb,
  users: Users,
  screen: Monitor,
  search: Search,
  check: CheckSquare,
  layout: PanelTop,
  data: Database,
  arch: Link,
  doc: FileText,
  deploy: Bot,
};

type ScreenMode = "intro" | "wizard" | "result";

function addOptionValue(currentValue: string, option: string, multiline?: boolean) {
  if (!multiline) {
    return option;
  }

  const lines = currentValue
    .split("\n")
    .map((line) => line.replace(/^-\s*/, "").trim())
    .filter(Boolean);

  if (lines.includes(option)) {
    return currentValue;
  }

  return [...lines, option].map((line) => `- ${line}`).join("\n");
}

export function VibeNavigator() {
  const [project, setProject] = useState<Project>(() => loadProject());
  const [currentStep, setCurrentStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<ScreenMode>("intro");
  const [activeResultId, setActiveResultId] = useState("summary");
  const step = steps[currentStep];
  const StepIcon = iconMap[step.icon as keyof typeof iconMap] ?? Lightbulb;

  useEffect(() => {
    saveProject(project);
  }, [project]);

  const completedCount = useMemo(
    () => steps.filter((_, index) => getStepCompletion(project, index)).length,
    [project],
  );

  const generatedPrompt = useMemo(
    () => createDevelopmentPrompt(project),
    [project],
  );

  const currentStepPrompt = useMemo(
    () => createStepPrompt(project, currentStep),
    [project, currentStep],
  );

  const resultSections = useMemo(
    () => createResultSections(project, generatedPrompt),
    [project, generatedPrompt],
  );

  const activeResult =
    resultSections.find((section) => section.id === activeResultId) ?? resultSections[0];

  const keywords = useMemo(() => {
    const source = [
      project.targetUser,
      project.serviceType,
      project.platform,
      project.promptTarget,
    ]
      .join(" ")
      .split(/[\s,./·]+/)
      .map((word) => word.trim())
      .filter((word) => word.length >= 2);

    return Array.from(new Set(source)).slice(0, 6);
  }, [project]);

  const hasDraft = Object.values(project).some((value) => value.trim());

  const updateField = (field: ProjectField, value: string) => {
    setProject((current) => ({ ...current, [field]: value }));
    setCopied(false);
  };

  const chooseOption = (field: ProjectField, option: string, multiline?: boolean) => {
    setProject((current) => ({
      ...current,
      [field]: addOptionValue(current[field], option, multiline),
    }));
    setCopied(false);
  };

  const resetProject = () => {
    clearProject();
    setProject(emptyProject);
    setCurrentStep(0);
    setActiveResultId("summary");
    setMode("intro");
    setCopied(false);
  };

  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const copyPrompt = async () => {
    await copyText(generatedPrompt);
    setCopied(true);
  };

  const goNext = () => {
    if (currentStep === steps.length - 1) {
      setMode("result");
      setActiveResultId("summary");
      return;
    }

    setCurrentStep((value) => Math.min(steps.length - 1, value + 1));
  };

  return (
    <main className="desktop-shell">
      <section className="window-frame" aria-label="Vibe Coding Navigator">
        <div className="title-bar">
          <div className="app-icon" aria-hidden="true">VC</div>
          <span>{process.env.NEXT_PUBLIC_APP_NAME ?? "Vibe Coding Navigator"}</span>
          <div className="title-controls" aria-hidden="true">
            <span>_</span>
            <span>□</span>
            <span>×</span>
          </div>
        </div>

        <nav className="menu-bar" aria-label="Application menu">
          <span>파일(F)</span>
          <span>편집(E)</span>
          <span>보기(V)</span>
          <span>도구(T)</span>
          <span>도움말(H)</span>
        </nav>

        <div className="toolbar" aria-label="Project actions">
          <Win95Button icon={<FilePlus size={16} />} onClick={resetProject}>
            새 프로젝트
          </Win95Button>
          <Win95Button icon={<FolderOpen size={16} />} onClick={() => setMode("wizard")}>
            이어하기
          </Win95Button>
          <Win95Button icon={<Save size={16} />} onClick={() => saveProject(project)}>
            저장
          </Win95Button>
          <Win95Button icon={<Download size={16} />} onClick={copyPrompt}>
            내보내기
          </Win95Button>
          <Win95Button className="toolbar-help" icon={<HelpCircle size={16} />}>
            도움말
          </Win95Button>
        </div>

        {mode === "intro" ? (
          <IntroScreen hasDraft={hasDraft} onStart={() => setMode("wizard")} />
        ) : null}

        {mode === "wizard" ? (
          <>
            <div className="app-grid">
              <aside className="left-rail">
                <section className="panel-shell">
                  <div className="panel-title">
                    <strong>단계 목록</strong>
                    <span>×</span>
                  </div>
                  <div className="step-sidebar" aria-label="10 step list">
                    {steps.map((item, index) => {
                      const isActive = index === currentStep;
                      const isDone = getStepCompletion(project, index);
                      const ItemIcon = iconMap[item.icon as keyof typeof iconMap] ?? Lightbulb;

                      return (
                        <button
                          key={item.title}
                          className={isActive ? "step-item active" : "step-item"}
                          onClick={() => setCurrentStep(index)}
                          type="button"
                        >
                          <span className="step-number">{index + 1}</span>
                          <span className="step-icon" aria-hidden="true">
                            <ItemIcon size={18} />
                          </span>
                          <span className="step-copy">
                            <strong>{item.shortTitle}</strong>
                          </span>
                          {isDone ? <Check size={14} aria-label="completed" /> : null}
                        </button>
                      );
                    })}
                  </div>
                </section>

                <section className="panel-shell help-panel">
                  <div className="panel-title">
                    <strong>왜 묻나요?</strong>
                    <span>×</span>
                  </div>
                  <div className="help-content">
                    <HelpCircle size={34} />
                    <p>{step.helper}</p>
                  </div>
                </section>
              </aside>

              <section className="wizard-panel">
                <div className="panel-title">
                  <strong>
                    {currentStep + 1}단계 / {steps.length}단계 - {step.title}
                  </strong>
                  <span>×</span>
                </div>
                <div className="wizard-content">
                  <header className="step-heading">
                    <span className="large-icon" aria-hidden="true">
                      <StepIcon size={34} />
                    </span>
                    <div>
                      <h1>{step.title}</h1>
                      <p>{step.question}</p>
                    </div>
                  </header>

                  <div className="input-stack">
                    {step.inputs.map((input) => {
                      const value = project[input.id];
                      const count = input.maxLength ? `${value.length} / ${input.maxLength}` : null;

                      return (
                        <div className="field-block" key={input.id}>
                          <label htmlFor={input.id}>
                            {input.label}
                            {input.required ? <em>필수</em> : null}
                          </label>

                          {input.options ? (
                            <div className="option-list" aria-label={`${input.label} 선택지`}>
                              {input.options.map((option) => (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => chooseOption(input.id, option, input.multiline)}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          ) : null}

                          {input.multiline ? (
                            <textarea
                              id={input.id}
                              value={value}
                              onChange={(event) => updateField(input.id, event.target.value)}
                              placeholder={input.placeholder}
                              maxLength={input.maxLength}
                              rows={4}
                            />
                          ) : (
                            <input
                              id={input.id}
                              value={value}
                              onChange={(event) => updateField(input.id, event.target.value)}
                              placeholder={input.placeholder}
                              maxLength={input.maxLength}
                            />
                          )}
                          {count ? <small>{count}</small> : null}
                        </div>
                      );
                    })}
                  </div>

                  <div className="tip-box">
                    <strong>TIP</strong>
                    <span>{step.helper}</span>
                  </div>

                  <div className="bottom-bar in-panel">
                    <Win95Button
                      icon={<ChevronLeft size={16} />}
                      onClick={() => setCurrentStep((value) => Math.max(0, value - 1))}
                      disabled={currentStep === 0}
                    >
                      이전(B)
                    </Win95Button>
                    <Win95Button icon={<Save size={16} />} onClick={() => saveProject(project)}>
                      임시 저장(S)
                    </Win95Button>
                    <Win95Button icon={<ChevronRight size={16} />} onClick={goNext}>
                      {currentStep === steps.length - 1 ? "결과 보기" : "다음(N)"}
                    </Win95Button>
                  </div>
                </div>
              </section>

              <aside className="right-rail">
                <SummaryPanel
                  project={project}
                  keywords={keywords}
                  completedCount={completedCount}
                  currentStepPrompt={currentStepPrompt}
                  onCopyStep={() => copyText(currentStepPrompt)}
                />
              </aside>
            </div>

            <section className="prompt-panel" aria-label="Generated prompt">
              <div className="prompt-heading">
                <div>
                  <p className="eyebrow">Generated Output</p>
                  <h2>전체 개발 프롬프트</h2>
                </div>
                <div className="prompt-actions">
                  <Win95Button icon={<RotateCcw size={16} />} onClick={resetProject}>
                    초기화
                  </Win95Button>
                  <Win95Button
                    icon={<Clipboard size={16} />}
                    onClick={copyPrompt}
                    aria-label="Copy generated prompt"
                  >
                    {copied ? "복사됨" : "복사"}
                  </Win95Button>
                </div>
              </div>
              <textarea readOnly value={generatedPrompt} rows={8} />
            </section>
          </>
        ) : null}

        {mode === "result" ? (
          <ResultScreen
            sections={resultSections}
            active={activeResult}
            activeId={activeResultId}
            onSelect={setActiveResultId}
            onCopy={() => copyText(activeResult.content)}
            onBack={() => setMode("wizard")}
            onReset={resetProject}
          />
        ) : null}

        <footer className="status-bar">
          <span>준비</span>
          <span>프로젝트: {project.serviceName || "새 프로젝트"}</span>
          <span>자동 저장: 켬</span>
        </footer>
      </section>
    </main>
  );
}

function IntroScreen({ hasDraft, onStart }: { hasDraft: boolean; onStart: () => void }) {
  return (
    <section className="intro-screen">
      <div className="intro-main">
        <p className="eyebrow">개발 지식이 없어도 괜찮아요</p>
        <h1>아이디어를 AI 개발자에게 줄 작업 요청서로 바꿔드립니다.</h1>
        <p>
          몇 가지 선택지를 고르면 서비스 요약서, 처음 만들 기능, 화면 구조, 만들 방법,
          AI에게 시킬 말까지 자동으로 정리됩니다.
        </p>
        <div className="intro-actions">
          <Win95Button icon={<Sparkles size={16} />} onClick={onStart}>
            {hasDraft ? "이어서 시작하기" : "시작하기"}
          </Win95Button>
        </div>
      </div>

      <div className="intro-preview">
        <section className="panel-shell">
          <div className="panel-title">
            <strong>끝나면 받는 결과물</strong>
            <span>×</span>
          </div>
          <div className="deliverable-grid">
            {["서비스 요약서", "처음 만들 기능", "화면 구조", "만들 방법", "AI에게 시킬 말", "공개 전 체크리스트"].map(
              (item) => (
                <div key={item} className="deliverable-item">
                  <Check size={15} />
                  <span>{item}</span>
                </div>
              ),
            )}
          </div>
        </section>

        <section className="panel-shell glossary-panel">
          <div className="panel-title">
            <strong>어려운 말을 쉽게 바꿔드려요</strong>
            <span>×</span>
          </div>
          <div className="glossary-list">
            {glossary.slice(0, 6).map((item) => (
              <div key={item.term}>
                <strong>{item.term}</strong>
                <span>{item.simple}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function SummaryPanel({
  project,
  keywords,
  completedCount,
  currentStepPrompt,
  onCopyStep,
}: {
  project: Project;
  keywords: string[];
  completedCount: number;
  currentStepPrompt: string;
  onCopyStep: () => void;
}) {
  return (
    <>
      <section className="panel-shell summary-panel">
        <div className="panel-title">
          <strong>현재까지 입력된 내용</strong>
          <span>×</span>
        </div>
        <div className="summary-card">
          <h2>서비스 요약</h2>
          <p>{project.serviceDescription || project.serviceName || emptyText}</p>
        </div>
        <div className="summary-card">
          <h2>핵심 키워드</h2>
          <div className="keyword-list">
            {(keywords.length ? keywords : ["초보자", "AI", "자동화"]).map((keyword) => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>
        </div>
        <div className="summary-card">
          <h2>해결하려는 문제</h2>
          <p>{project.problem || emptyText}</p>
          <h2>얻고 싶은 결과</h2>
          <p>{project.goal || emptyText}</p>
        </div>
      </section>

      <section className="panel-shell step-prompt-panel">
        <div className="panel-title">
          <strong>현재 단계 프롬프트</strong>
          <span>×</span>
        </div>
        <div className="step-prompt-content">
          <textarea readOnly value={currentStepPrompt} rows={9} />
          <Win95Button icon={<Clipboard size={16} />} onClick={onCopyStep}>
            단계 프롬프트 복사
          </Win95Button>
        </div>
      </section>

      <section className="panel-shell progress-panel">
        <div className="panel-title">
          <strong>진행률</strong>
          <span>×</span>
        </div>
        <div className="progress-content">
          <strong>전체 진행률</strong>
          <div className="progress-meter" aria-label="completion">
            <span style={{ width: `${(completedCount / steps.length) * 100}%` }} />
          </div>
          <p>
            {completedCount} / {steps.length} 단계 완료
            <b>{Math.round((completedCount / steps.length) * 100)}%</b>
          </p>
        </div>
      </section>
    </>
  );
}

function ResultScreen({
  sections,
  active,
  activeId,
  onSelect,
  onCopy,
  onBack,
  onReset,
}: {
  sections: ReturnType<typeof createResultSections>;
  active: ReturnType<typeof createResultSections>[number];
  activeId: string;
  onSelect: (id: string) => void;
  onCopy: () => void;
  onBack: () => void;
  onReset: () => void;
}) {
  return (
    <section className="result-screen">
      <div className="result-heading">
        <p className="eyebrow">Final Package</p>
        <h1>이제 AI 개발 도구에 넘길 준비가 됐습니다.</h1>
        <p>탭을 눌러 결과물을 확인하고 필요한 부분을 복사하세요.</p>
      </div>

      <AdSlot label="결과 화면 상단 광고" />

      <div className="result-layout">
        <nav className="result-tabs" aria-label="Result sections">
          {sections.map((section) => (
            <button
              key={section.id}
              className={activeId === section.id ? "active" : ""}
              onClick={() => onSelect(section.id)}
              type="button"
            >
              {section.label}
            </button>
          ))}
        </nav>

        <section className="panel-shell result-document">
          <div className="panel-title">
            <strong>{active.title}</strong>
            <span>×</span>
          </div>
          <textarea readOnly value={active.content} rows={18} />
          <div className="result-actions">
            <Win95Button icon={<Clipboard size={16} />} onClick={onCopy}>
              이 탭 복사
            </Win95Button>
            <Win95Button icon={<ChevronLeft size={16} />} onClick={onBack}>
              수정하러 가기
            </Win95Button>
            <Win95Button icon={<RotateCcw size={16} />} onClick={onReset}>
              새 프로젝트
            </Win95Button>
          </div>
        </section>
      </div>

      <AdSlot label="결과 화면 하단 광고" />
    </section>
  );
}
