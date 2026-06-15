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
  Users,
} from "lucide-react";
import {
  createDevelopmentPrompt,
  createStepPrompt,
  getStepCompletion,
} from "@/lib/promptTemplates";
import { clearProject, loadProject, saveProject } from "@/lib/projectStorage";
import { emptyProject, steps } from "@/lib/steps";
import type { Project, ProjectField } from "@/types/project";
import { Win95Button } from "@/components/win95/Win95Button";

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
    setCopied(false);
  };

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
  };

  const copyStepPrompt = async () => {
    await navigator.clipboard.writeText(currentStepPrompt);
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
          <Win95Button icon={<FilePlus size={16} />}>새 프로젝트</Win95Button>
          <Win95Button icon={<FolderOpen size={16} />}>열기</Win95Button>
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
                <strong>도움말</strong>
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
                <Win95Button
                  icon={<ChevronRight size={16} />}
                  onClick={() =>
                    setCurrentStep((value) => Math.min(steps.length - 1, value + 1))
                  }
                  disabled={currentStep === steps.length - 1}
                >
                  다음(N)
                </Win95Button>
              </div>
            </div>
          </section>

          <aside className="right-rail">
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
                  {(keywords.length ? keywords : ["소상공인", "AI", "자동화"]).map((keyword) => (
                    <span key={keyword}>{keyword}</span>
                  ))}
                </div>
              </div>
              <div className="summary-card">
                <h2>해결하려는 문제</h2>
                <p>{project.problem || emptyText}</p>
                <h2>이루고 싶은 목표</h2>
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
                <Win95Button icon={<Clipboard size={16} />} onClick={copyStepPrompt}>
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

        <footer className="status-bar">
          <span>준비</span>
          <span>프로젝트: {project.serviceName || "새 프로젝트"}</span>
          <span>자동 저장: 켬</span>
        </footer>
      </section>
    </main>
  );
}
