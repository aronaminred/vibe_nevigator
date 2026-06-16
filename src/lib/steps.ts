import type { Project, Step } from "@/types/project";

export const steps: Step[] = [
  {
    title: "만들고 싶은 것 고르기",
    shortTitle: "만들 것",
    icon: "idea",
    question: "가장 가까운 아이디어를 고르고, 내 상황에 맞게 조금만 고쳐주세요.",
    helper:
      "처음부터 완벽히 쓰지 않아도 됩니다. 선택지를 누르면 초안이 만들어지고, 사용자는 필요한 부분만 바꾸면 됩니다.",
    inputs: [
      {
        id: "serviceName",
        label: "서비스 이름",
        placeholder: "예: 소상공인을 위한 AI 블로그 자동화 서비스",
        maxLength: 80,
        required: true,
        options: [
          "AI 블로그 자동화 서비스",
          "예약 관리 서비스",
          "고객 문의 자동응답 서비스",
          "개인 맞춤 학습 도우미",
        ],
      },
      {
        id: "serviceDescription",
        label: "무엇을 해주는 서비스인가요?",
        placeholder:
          "예: 키워드만 입력하면 글 제목, 목차, 본문 초안을 자동으로 만들어주는 서비스",
        multiline: true,
        maxLength: 500,
        required: true,
        options: [
          "키워드만 입력하면 결과물을 자동으로 만들어주는 서비스",
          "반복 업무를 체크리스트와 자동화로 줄여주는 서비스",
          "초보자가 질문에 답하면 결과 문서를 만들어주는 서비스",
          "고객 정보를 한 화면에서 정리하고 다음 행동을 추천하는 서비스",
        ],
      },
      {
        id: "problem",
        label: "어떤 어려움을 해결하나요?",
        placeholder: "예: 블로그 글쓰기에 시간이 많이 들고 꾸준히 작성하기 어렵다.",
        multiline: true,
        maxLength: 500,
        options: [
          "시간이 부족해서 꾸준히 하기 어렵다.",
          "무엇부터 시작해야 할지 몰라 막힌다.",
          "반복 작업이 많아 실수가 생긴다.",
          "여러 도구에 정보가 흩어져 관리하기 어렵다.",
        ],
      },
      {
        id: "goal",
        label: "사용자가 얻는 좋은 결과는 무엇인가요?",
        placeholder:
          "예: 누구나 쉽고 빠르게 블로그 글을 작성해 온라인 마케팅을 할 수 있게 된다.",
        multiline: true,
        maxLength: 500,
        options: [
          "초보자도 10분 안에 첫 결과물을 만들게 한다.",
          "반복 업무 시간을 절반 이하로 줄인다.",
          "전문가 도움 없이도 의사결정할 수 있게 돕는다.",
          "사용자가 다음 행동을 바로 실행할 수 있게 만든다.",
        ],
      },
    ],
  },
  {
    title: "누가 왜 필요할지 정하기",
    shortTitle: "사용자",
    icon: "users",
    question: "이 서비스를 가장 절실하게 필요로 하는 사람은 누구인가요?",
    helper:
      "모두를 위한 서비스보다 한 사람을 위한 서비스가 더 만들기 쉽습니다. 가장 먼저 만족시킬 사용자를 고릅니다.",
    inputs: [
      {
        id: "targetUser",
        label: "핵심 사용자",
        placeholder: "예: 온라인 마케팅 경험이 적은 1인 가게 사장님",
        required: true,
        options: ["1인 사업자", "소상공인", "초기 스타트업 팀", "비전공자 창업자", "프리랜서"],
      },
      {
        id: "userSituation",
        label: "그 사람은 어떤 상황인가요?",
        placeholder: "예: 매장 운영이 바빠 콘텐츠를 꾸준히 만들 시간이 부족하다.",
        multiline: true,
        options: [
          "혼자 여러 업무를 동시에 처리하고 있다.",
          "예산이 적어 전문가를 고용하기 어렵다.",
          "디지털 도구 사용 경험이 많지 않다.",
          "빨리 검증해야 하지만 개발 지식이 부족하다.",
        ],
      },
      {
        id: "painPoints",
        label: "가장 답답한 점은 무엇인가요?",
        placeholder: "예: 무엇을 써야 할지 모르고, 글을 완성하는 데 시간이 오래 걸린다.",
        multiline: true,
        options: ["시작점이 막막하다.", "작업 시간이 오래 걸린다.", "결과 품질이 들쭉날쭉하다.", "기존 도구가 너무 복잡하다."],
      },
    ],
  },
  {
    title: "어떤 모양의 서비스인지 고르기",
    shortTitle: "모양",
    icon: "screen",
    question: "사용자는 어떤 화면이나 방식으로 이 서비스를 만나면 좋을까요?",
    helper:
      "처음 버전은 가장 빠르게 만들고 테스트할 수 있는 모양이 좋습니다. 웹으로 시작하면 공유와 수정이 쉽습니다.",
    inputs: [
      {
        id: "serviceType",
        label: "서비스 모양",
        placeholder: "예: 선택지를 고르는 단계형 웹 서비스",
        required: true,
        options: ["단계형 질문 서비스", "대시보드", "챗봇", "문서 생성기", "체크리스트 도구"],
      },
      {
        id: "platform",
        label: "주로 어디에서 쓰나요?",
        placeholder: "예: 데스크톱 웹 우선, 모바일도 볼 수 있게",
        options: ["데스크톱 웹 우선", "모바일 웹 우선", "반응형 웹", "크롬 확장", "모바일 앱"],
      },
    ],
  },
  {
    title: "참고할 서비스 고르기",
    shortTitle: "참고",
    icon: "search",
    question: "어떤 서비스의 흐름이나 느낌을 참고하면 좋을까요?",
    helper:
      "정확한 URL이 없어도 괜찮습니다. 닮고 싶은 사용 경험을 고르면 AI가 방향을 이해하기 쉽습니다.",
    inputs: [
      {
        id: "references",
        label: "참고 서비스",
        placeholder: "예: Typeform, Notion, Canva",
        multiline: true,
        options: ["Typeform", "Notion", "Canva", "Wix ADI", "Tally", "Airtable"],
      },
      {
        id: "referenceNotes",
        label: "무엇을 참고하고 싶나요?",
        placeholder: "예: Typeform처럼 한 번에 하나씩 쉽게 고르는 흐름",
        multiline: true,
        options: [
          "단계별 입력이 쉽다.",
          "결과 문서가 보기 좋게 정리된다.",
          "버튼과 선택지가 명확하다.",
          "초보자도 다음 행동을 이해하기 쉽다.",
        ],
      },
    ],
  },
  {
    title: "처음 만들 기능 고르기",
    shortTitle: "첫 기능",
    icon: "check",
    question: "첫 버전에 꼭 넣을 기능과 과감히 뺄 기능을 고르세요.",
    helper:
      "처음부터 크게 만들면 완성하기 어렵습니다. 가장 중요한 기능만 남기면 빠르게 테스트할 수 있습니다.",
    inputs: [
      {
        id: "mvpFeatures",
        label: "처음에 꼭 만들 기능",
        placeholder: "- 단계별 입력\n- 자동 저장\n- 결과 프롬프트 복사",
        multiline: true,
        required: true,
        options: [
          "단계별 입력",
          "선택지 클릭 입력",
          "실시간 요약",
          "브라우저 자동 저장",
          "최종 프롬프트 복사",
          "모바일 대응",
        ],
      },
      {
        id: "excludedFeatures",
        label: "이번에는 만들지 않을 기능",
        placeholder: "- 로그인\n- 결제\n- 실시간 협업\n- 서버 저장",
        multiline: true,
        options: ["로그인", "결제", "팀 협업", "서버 저장", "AI 자동 분석", "관리자 페이지"],
      },
    ],
  },
  {
    title: "어떤 화면이 필요할지 정하기",
    shortTitle: "화면",
    icon: "layout",
    question: "사용자가 보게 될 화면은 어떤 역할을 해야 하나요?",
    helper:
      "화면 이름보다 역할로 생각하면 쉽습니다. 입력, 요약, 결과, 복사처럼 사용자가 하는 행동을 기준으로 고릅니다.",
    inputs: [
      {
        id: "screens",
        label: "필요한 화면",
        placeholder: "예: 시작 화면, 단계별 입력 화면, 결과 화면",
        multiline: true,
        options: ["시작 화면", "단계별 입력 화면", "실시간 요약 패널", "최종 결과 화면", "설정 화면"],
      },
      {
        id: "userJourney",
        label: "사용자는 어떤 순서로 움직이나요?",
        placeholder: "예: 시작하기 → 선택지 클릭 → 결과 확인 → 프롬프트 복사",
        multiline: true,
        options: [
          "목적 확인 → 선택지 클릭 → 보충 입력 → 결과 복사",
          "아이디어 입력 → 첫 기능 정리 → 개발 프롬프트 생성",
          "단계별 저장 → 새로고침 후 복원 → 최종 내보내기",
        ],
      },
    ],
  },
  {
    title: "저장할 정보 정하기",
    shortTitle: "저장",
    icon: "data",
    question: "이 서비스가 기억해야 할 정보는 무엇인가요?",
    helper:
      "처음에는 서버 없이 내 브라우저에 저장하는 방식만으로도 충분할 수 있습니다. 비밀값은 저장소에 올리지 않습니다.",
    inputs: [
      {
        id: "dataModel",
        label: "저장할 정보",
        placeholder: "예: 사용자가 입력한 답변, 현재 단계, 생성된 프롬프트",
        multiline: true,
        options: ["입력한 답변", "현재 단계", "완료 상태", "생성된 프롬프트", "사용자 설정"],
      },
      {
        id: "apiNeeds",
        label: "다른 서비스 연결이 필요한가요?",
        placeholder: "예: 첫 버전에서는 연결 없음. 나중에 AI API와 DB 연결",
        multiline: true,
        options: ["첫 버전에서는 연결 없음", "OpenAI API 연결 예정", "Supabase 저장 예정", "로그인은 나중에"],
      },
    ],
  },
  {
    title: "만들 방법 정하기",
    shortTitle: "방법",
    icon: "arch",
    question: "어떤 도구 조합으로 만들면 좋을까요?",
    helper:
      "처음에는 익숙하고 배포가 쉬운 조합이 좋습니다. 복잡한 서버보다 웹앱으로 먼저 검증합니다.",
    inputs: [
      {
        id: "architecture",
        label: "개발에 쓸 도구 조합",
        placeholder: "예: Next.js, TypeScript, Tailwind, LocalStorage, Vercel",
        multiline: true,
        options: ["Next.js", "TypeScript", "Tailwind CSS", "브라우저 저장", "Vercel", "Supabase"],
      },
      {
        id: "constraints",
        label: "지켜야 할 조건",
        placeholder: "예: 비밀값은 로컬에만 두고, 모바일에서도 잘 보여야 한다.",
        multiline: true,
        options: ["백엔드 없이 시작", "비밀값은 로컬에만 보관", "모바일 360px 지원", "빌드 오류 없는 상태로 배포"],
      },
    ],
  },
  {
    title: "AI에게 시킬 말 만들기",
    shortTitle: "AI 요청",
    icon: "doc",
    question: "어떤 AI 개발 도구에 넘길 요청서를 만들까요?",
    helper:
      "AI에게는 목표, 범위, 완료 기준을 분명히 말해야 합니다. 이 단계에서 최종 요청서의 톤을 정합니다.",
    inputs: [
      {
        id: "promptTarget",
        label: "사용할 AI 도구",
        placeholder: "예: Codex, Cursor, Claude",
        options: ["Codex", "Cursor", "Claude", "ChatGPT", "v0"],
      },
      {
        id: "promptPreference",
        label: "어떤 스타일로 요청할까요?",
        placeholder: "예: 파일 구조부터 구현, QA, README 업데이트까지 요청",
        multiline: true,
        options: [
          "구현까지 맡기는 상세 요청서",
          "디자인만 요청하는 요청서",
          "버그 수정 중심 요청서",
          "QA와 배포까지 포함한 요청서",
        ],
      },
    ],
  },
  {
    title: "인터넷에 공개하기 전 확인하기",
    shortTitle: "공개 전",
    icon: "deploy",
    question: "사람들이 실제로 볼 수 있게 공개하기 전 무엇을 확인해야 할까요?",
    helper:
      "공개 전에는 빌드, 모바일 화면, 비밀값, 복사 기능을 확인합니다. 이 체크리스트가 실수를 줄여줍니다.",
    inputs: [
      {
        id: "deployment",
        label: "공개 계획",
        placeholder: "예: GitHub에 올리고 Vercel로 배포한다.",
        multiline: true,
        options: ["GitHub에 커밋", "Vercel에 연결", "환경변수 등록", "배포 URL 확인"],
      },
      {
        id: "qaChecklist",
        label: "공개 전 체크리스트",
        placeholder: "- npm run build\n- 모바일 화면 확인\n- 환경변수 등록\n- 프롬프트 복사 확인",
        multiline: true,
        options: [
          "npm run lint 통과",
          "npm run build 통과",
          "모바일 화면 확인",
          "브라우저 저장 복원 확인",
          "프롬프트 복사 확인",
        ],
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
