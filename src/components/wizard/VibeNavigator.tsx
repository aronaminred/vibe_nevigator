"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  RotateCcw,
  Save,
} from "lucide-react";
import { createDevelopmentPrompt } from "@/lib/promptTemplates";
import { clearProject, loadProject, saveProject } from "@/lib/projectStorage";
import { emptyProject, steps } from "@/lib/steps";
import type { Project } from "@/types/project";
import { Win95Button } from "@/components/win95/Win95Button";

export function VibeNavigator() {
  const [project, setProject] = useState<Project>(() => loadProject());
  const [currentStep, setCurrentStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const step = steps[currentStep];

  useEffect(() => {
    saveProject(project);
  }, [project]);

  const completedCount = useMemo(
    () => steps.filter((item) => project[item.id].trim().length > 0).length,
    [project],
  );

  const generatedPrompt = useMemo(
    () => createDevelopmentPrompt(project),
    [project],
  );

  const updateField = (value: string) => {
    setProject((current) => ({ ...current, [step.id]: value }));
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

  return (
    <main className="desktop-shell">
      <section className="window-frame" aria-label="Vibe Coding Navigator">
        <div className="title-bar">
          <div className="title-dot" />
          <span>{process.env.NEXT_PUBLIC_APP_NAME ?? "Vibe Coding Navigator"}</span>
          <div className="title-controls" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>

        <nav className="menu-bar" aria-label="Application menu">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Tools</span>
          <span>Help</span>
        </nav>

        <div className="progress-header">
          <div>
            <p className="eyebrow">Step {currentStep + 1} of {steps.length}</p>
            <h1>{step.title}</h1>
          </div>
          <div className="progress-meter" aria-label="completion">
            <span style={{ width: `${(completedCount / steps.length) * 100}%` }} />
          </div>
        </div>

        <div className="wizard-grid">
          <aside className="step-sidebar" aria-label="10 step list">
            {steps.map((item, index) => {
              const isActive = index === currentStep;
              const isDone = project[item.id].trim().length > 0;

              return (
                <button
                  key={item.id}
                  className={isActive ? "step-item active" : "step-item"}
                  onClick={() => setCurrentStep(index)}
                  type="button"
                >
                  <span className="step-number">{index + 1}</span>
                  <span className="step-copy">
                    <strong>{item.shortTitle}</strong>
                    <small>{item.title}</small>
                  </span>
                  {isDone ? <Check size={14} aria-label="completed" /> : null}
                </button>
              );
            })}
          </aside>

          <section className="wizard-panel">
            <label htmlFor="step-input">
              <span>{step.question}</span>
              {step.required ? <em>Required</em> : null}
            </label>
            <p>{step.helper}</p>
            <textarea
              id="step-input"
              value={project[step.id]}
              onChange={(event) => updateField(event.target.value)}
              placeholder={step.placeholder}
              rows={12}
            />
            {step.required && !project[step.id].trim() ? (
              <div className="validation">이 단계는 최종 프롬프트 품질에 중요합니다.</div>
            ) : null}
          </section>

          <aside className="summary-panel">
            <h2>Live Summary</h2>
            <dl>
              {steps.slice(0, 6).map((item) => (
                <div key={item.id}>
                  <dt>{item.title}</dt>
                  <dd>{project[item.id].trim() || "아직 입력되지 않음"}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <section className="prompt-panel" aria-label="Generated prompt">
          <div className="prompt-heading">
            <div>
              <p className="eyebrow">Generated Output</p>
              <h2>개발 프롬프트</h2>
            </div>
            <Win95Button
              icon={<Clipboard size={16} />}
              onClick={copyPrompt}
              aria-label="Copy generated prompt"
            >
              {copied ? "Copied" : "Copy"}
            </Win95Button>
          </div>
          <textarea readOnly value={generatedPrompt} rows={9} />
        </section>

        <div className="bottom-bar">
          <Win95Button
            icon={<ChevronLeft size={16} />}
            onClick={() => setCurrentStep((value) => Math.max(0, value - 1))}
            disabled={currentStep === 0}
          >
            이전
          </Win95Button>
          <Win95Button icon={<Save size={16} />} onClick={() => saveProject(project)}>
            임시저장
          </Win95Button>
          <Win95Button icon={<RotateCcw size={16} />} onClick={resetProject}>
            초기화
          </Win95Button>
          <Win95Button
            icon={<ChevronRight size={16} />}
            onClick={() =>
              setCurrentStep((value) => Math.min(steps.length - 1, value + 1))
            }
            disabled={currentStep === steps.length - 1}
          >
            다음
          </Win95Button>
        </div>

        <footer className="status-bar">
          <span>{completedCount}/{steps.length} fields completed</span>
          <span>LocalStorage secure draft</span>
          <span>Ready</span>
        </footer>
      </section>
    </main>
  );
}
