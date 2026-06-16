import type { Project } from "@/types/project";

const empty = "아직 입력되지 않음";

function value(text: string) {
  return text.trim() || empty;
}

export type ResultSection = {
  id: string;
  label: string;
  title: string;
  content: string;
};

export function createResultSections(project: Project, fullPrompt: string): ResultSection[] {
  return [
    {
      id: "summary",
      label: "요약서",
      title: "서비스 기획 요약서",
      content: `# 서비스 기획 요약서

## 서비스 이름
${value(project.serviceName)}

## 한 줄 설명
${value(project.serviceDescription)}

## 핵심 사용자
${value(project.targetUser)}

## 해결하려는 문제
${value(project.problem)}

## 사용자가 얻는 결과
${value(project.goal)}`,
    },
    {
      id: "mvp",
      label: "처음 만들 기능",
      title: "처음 만들 기능 명세",
      content: `# 처음 만들 기능 명세

## 꼭 만들 기능
${value(project.mvpFeatures)}

## 이번에는 만들지 않을 기능
${value(project.excludedFeatures)}

## 완료 기준
- 사용자가 선택지를 눌러 입력 초안을 만들 수 있다.
- 입력 내용이 자동 저장된다.
- 최종 결과를 복사할 수 있다.`,
    },
    {
      id: "screens",
      label: "화면 구조",
      title: "화면 구조 설계서",
      content: `# 화면 구조 설계서

## 필요한 화면
${value(project.screens)}

## 사용자 흐름
${value(project.userJourney)}

## 참고할 서비스
${value(project.references)}

## 참고할 점
${value(project.referenceNotes)}`,
    },
    {
      id: "technical",
      label: "만들 방법",
      title: "기술 설계서",
      content: `# 기술 설계서

## 서비스 모양
${value(project.serviceType)}

## 주요 플랫폼
${value(project.platform)}

## 저장할 정보
${value(project.dataModel)}

## 다른 서비스 연결
${value(project.apiNeeds)}

## 개발 도구 조합
${value(project.architecture)}

## 지켜야 할 조건
${value(project.constraints)}`,
    },
    {
      id: "prompt",
      label: "AI에게 시킬 말",
      title: "전체 개발 프롬프트",
      content: fullPrompt,
    },
    {
      id: "launch",
      label: "공개 전 체크",
      title: "배포 및 운영 체크리스트",
      content: `# 공개 전 체크리스트

## 공개 계획
${value(project.deployment)}

## 확인할 것
${value(project.qaChecklist)}

## 기본 체크
- npm run lint 통과
- npm run build 통과
- 모바일 화면 확인
- 비밀값이 커밋되지 않았는지 확인
- 배포 URL 접속 확인`,
    },
  ];
}
