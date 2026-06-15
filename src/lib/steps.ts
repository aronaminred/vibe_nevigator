import type { Project, Step } from "@/types/project";

export const steps: Step[] = [
  {
    title: "아이디어 입력",
    shortTitle: "아이디어 입력",
    icon: "💡",
    question: "만들고 싶은 서비스에 대해 자유롭게 설명해주세요.",
    helper: "구체적으로 작성할수록 더 좋은 결과를 얻을 수 있어요. 서비스의 핵심 가치, 타겟 사용자, 주요 기능을 포함해보세요.",
    inputs: [
      {
        id: "serviceName",
        label: "서비스 이름 (가칭)",
        placeholder: "예: 소상공인을 위한 AI 블로그 자동화 서비스",
        maxLength: 80,
        required: true,
      },
      {
        id: "serviceDescription",
        label: "서비스 설명",
        placeholder:
          "예: 키워드만 입력하면 AI가 글 제목, 목차, 본문 초안을 자동으로 생성해주는 서비스",
        multiline: true,
        maxLength: 500,
        required: true,
      },
      {
        id: "problem",
        label: "해결하고 싶은 문제",
        placeholder: "예: 블로그 글쓰기에 시간과 노력이 많이 들고 꾸준히 작성하기 어렵다.",
        multiline: true,
        maxLength: 500,
      },
      {
        id: "goal",
        label: "이 서비스로 이루고 싶은 목표",
        placeholder:
          "예: 누구나 쉽고 빠르게 블로그 글을 작성해 온라인 마케팅을 할 수 있도록 돕는다.",
        multiline: true,
        maxLength: 500,
      },
    ],
  },
  {
    title: "타겟 · 문제 정의",
    shortTitle: "타겟 · 문제 정의",
    icon: "👥",
    question: "가장 먼저 만족시켜야 할 사용자는 누구인가요?",
    helper: "사용자 유형, 실제 상황, 반복되는 불편함을 분리해서 적으면 MVP 우선순위가 선명해집니다.",
    inputs: [
      {
        id: "targetUser",
        label: "핵심 사용자",
        placeholder: "예: 온라인 마케팅 경험이 적은 1인 가게 사장님",
        required: true,
      },
      {
        id: "userSituation",
        label: "사용자 상황",
        placeholder: "예: 매장 운영이 바빠 콘텐츠를 꾸준히 만들 시간이 부족하다.",
        multiline: true,
      },
      {
        id: "painPoints",
        label: "페인포인트",
        placeholder: "예: 무엇을 써야 할지 모르고, 글을 완성하는 데 시간이 오래 걸린다.",
        multiline: true,
      },
    ],
  },
  {
    title: "서비스 형태 선택",
    shortTitle: "서비스 형태 선택",
    icon: "🖥️",
    question: "이 아이디어는 어떤 형태의 제품에 가깝나요?",
    helper: "웹앱, 대시보드, 마법사, 챗봇, 자동화 도구 등 사용자가 만나는 형태를 정합니다.",
    inputs: [
      {
        id: "serviceType",
        label: "서비스 형태",
        placeholder: "예: 로그인 없는 웹 기반 마법사형 SaaS MVP",
        required: true,
      },
      {
        id: "platform",
        label: "주요 플랫폼",
        placeholder: "예: 데스크톱 웹 우선, 모바일 대응",
      },
    ],
  },
  {
    title: "레퍼런스 분석",
    shortTitle: "레퍼런스 분석",
    icon: "🔍",
    question: "비슷한 서비스나 참고하고 싶은 화면이 있나요?",
    helper: "서비스명, URL, 마음에 드는 흐름과 피하고 싶은 점을 함께 적어주세요.",
    inputs: [
      {
        id: "references",
        label: "참고 서비스·URL",
        placeholder: "예: Typeform, Notion AI, Wix ADI",
        multiline: true,
      },
      {
        id: "referenceNotes",
        label: "참고할 점",
        placeholder: "예: 단계형 입력은 Typeform처럼 간단하게, 결과 문서는 Notion처럼 정리",
        multiline: true,
      },
    ],
  },
  {
    title: "MVP 기능 정리",
    shortTitle: "MVP 기능 정리",
    icon: "☑️",
    question: "처음 버전에 꼭 필요한 기능은 무엇인가요?",
    helper: "핵심 기능과 제외 기능을 분리하면 개발 범위가 흔들리지 않습니다.",
    inputs: [
      {
        id: "mvpFeatures",
        label: "포함할 핵심 기능",
        placeholder: "- 10단계 입력\n- 자동 저장\n- 결과 프롬프트 복사",
        multiline: true,
        required: true,
      },
      {
        id: "excludedFeatures",
        label: "이번 버전에서 제외할 기능",
        placeholder: "- 로그인\n- 결제\n- 실시간 협업\n- 서버 저장",
        multiline: true,
      },
    ],
  },
  {
    title: "화면 구조 설계",
    shortTitle: "화면 구조 설계",
    icon: "▦",
    question: "사용자가 보게 될 주요 화면은 무엇인가요?",
    helper: "첫 화면, 입력 화면, 결과 화면, 설정 화면처럼 나눠 적어주세요.",
    inputs: [
      {
        id: "screens",
        label: "주요 화면 목록",
        placeholder: "예: 랜딩, Wizard 입력, 현재까지 입력된 내용, 최종 결과",
        multiline: true,
      },
      {
        id: "userJourney",
        label: "사용자 흐름",
        placeholder: "예: 목적 확인 → 10단계 입력 → 결과 확인 → 프롬프트 복사",
        multiline: true,
      },
    ],
  },
  {
    title: "데이터 · API 설계",
    shortTitle: "데이터 · API 설계",
    icon: "🗄️",
    question: "저장해야 할 데이터와 필요한 API가 있나요?",
    helper: "MVP에서는 LocalStorage만으로 충분한지, 서버 API가 필요한지 판단합니다.",
    inputs: [
      {
        id: "dataModel",
        label: "저장 데이터",
        placeholder: "예: Project 객체, currentStep, 입력 완료 상태",
        multiline: true,
      },
      {
        id: "apiNeeds",
        label: "API 필요 여부",
        placeholder: "예: v1에서는 API 없음. 2차에서 AI API와 Supabase 연동",
        multiline: true,
      },
    ],
  },
  {
    title: "아키텍처 추천",
    shortTitle: "아키텍처 추천",
    icon: "🔗",
    question: "선호하는 기술 스택이나 제약이 있나요?",
    helper: "배포 위치, 인증 여부, DB 필요 여부, AI API 사용 계획을 적어주세요.",
    inputs: [
      {
        id: "architecture",
        label: "추천 기술 스택",
        placeholder: "예: Next.js, TypeScript, Tailwind, LocalStorage, Vercel",
        multiline: true,
      },
      {
        id: "constraints",
        label: "개발 제약",
        placeholder: "예: 백엔드는 생략하고 브라우저 중심 정적 웹앱으로 먼저 검증",
        multiline: true,
      },
    ],
  },
  {
    title: "프롬프트 생성",
    shortTitle: "프롬프트 생성",
    icon: "📄",
    question: "AI 개발 도구에 어떤 스타일로 요청하고 싶나요?",
    helper: "Cursor, Claude, ChatGPT, Codex 중 대상 도구와 원하는 톤을 적어주세요.",
    inputs: [
      {
        id: "promptTarget",
        label: "대상 AI 도구",
        placeholder: "예: Codex, Cursor, Claude",
      },
      {
        id: "promptPreference",
        label: "프롬프트 스타일",
        placeholder: "예: 파일 구조부터 구현, QA, README 업데이트까지 요청하는 상세 프롬프트",
        multiline: true,
      },
    ],
  },
  {
    title: "배포 · 운영 체크리스트",
    shortTitle: "배포 · 운영 체크리스트",
    icon: "🌐",
    question: "배포와 운영에서 확인해야 할 조건은 무엇인가요?",
    helper: "도메인, 환경변수, 빌드 확인, QA 시나리오를 적어주세요.",
    inputs: [
      {
        id: "deployment",
        label: "배포 계획",
        placeholder: "예: GitHub 저장소 연결 후 Vercel 배포",
        multiline: true,
      },
      {
        id: "qaChecklist",
        label: "운영 체크리스트",
        placeholder: "- npm run build\n- 모바일 360px 확인\n- 환경변수 등록\n- 최종 프롬프트 복사 확인",
        multiline: true,
      },
    ],
  },
];

export const emptyProject: Project = {
  serviceName: "",
  serviceDescription: "",
  problem: "",
  goal: "",
  targetUser: "",
  userSituation: "",
  painPoints: "",
  serviceType: "",
  platform: "",
  references: "",
  referenceNotes: "",
  mvpFeatures: "",
  excludedFeatures: "",
  screens: "",
  userJourney: "",
  dataModel: "",
  apiNeeds: "",
  architecture: "",
  constraints: "",
  promptTarget: "",
  promptPreference: "",
  deployment: "",
  qaChecklist: "",
};
