import { steps } from "@/lib/steps";
import type { Project } from "@/types/project";

const fallback = "아직 입력되지 않음";

export function getStepCompletion(project: Project, stepIndex: number) {
  const step = steps[stepIndex];
  const requiredInputs = step.inputs.filter((input) => input.required);
  const requiredDone = requiredInputs.every((input) => project[input.id].trim());
  const anyDone = step.inputs.some((input) => project[input.id].trim());

  if (requiredInputs.length > 0) {
    return requiredDone;
  }

  return anyDone;
}

export function createDevelopmentPrompt(project: Project) {
  const sections = steps
    .map((step, index) => {
      const inputText = step.inputs
        .map((input) => {
          const value = project[input.id]?.trim() || fallback;
          return `- ${input.label}: ${value}`;
        })
        .join("\n");

      return `${index + 1}. ${step.title}\n${inputText}`;
    })
    .join("\n\n");

  return `너는 senior full-stack product engineer다. 아래 기획 내용을 기준으로 MVP를 구현해줘.

개발 원칙:
- Next.js App Router, TypeScript, Tailwind CSS를 사용한다.
- Windows 95 스타일의 Wizard UI를 유지한다.
- 10단계 입력, 좌측 단계 목록과 도움말, 우측 요약/진행률 패널, LocalStorage 자동 저장, 최종 프롬프트 복사 기능을 포함한다.
- 환경변수는 .env.local에만 실제 값을 두고, 저장소에는 .env.example만 커밋한다.
- 모바일 360px 너비에서도 입력과 버튼이 겹치지 않아야 한다.

기획 내용:

${sections}

완료 기준:
- npm run lint와 npm run build가 성공한다.
- README에 설치, 실행, 환경변수, 주요 기능, 배포 방법이 설명되어 있다.
- 비밀 값은 커밋하지 않는다.`;
}

export function createStepPrompt(project: Project, stepIndex: number) {
  const step = steps[stepIndex];
  const inputs = step.inputs
    .map((input) => {
      const value = project[input.id]?.trim() || fallback;
      return `- ${input.label}: ${value}`;
    })
    .join("\n");

  return `현재 단계: ${step.title}

목표:
${step.question}

입력 내용:
${inputs}

요청:
위 내용을 바탕으로 이 단계의 기획을 초보자도 이해할 수 있게 정리하고, 다음 단계에서 확인해야 할 질문 2개를 제안해줘.`;
}
