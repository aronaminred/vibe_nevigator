export type GlossaryItem = {
  term: string;
  simple: string;
  description: string;
};

export const glossary: GlossaryItem[] = [
  {
    term: "MVP",
    simple: "처음 만들 최소 기능",
    description: "처음부터 완벽한 서비스를 만들지 않고, 가장 중요한 기능만 담은 첫 버전입니다.",
  },
  {
    term: "API",
    simple: "다른 서비스와 데이터를 주고받는 통로",
    description: "내 서비스가 AI, 결제, 지도 같은 다른 서비스와 연결될 때 쓰는 약속입니다.",
  },
  {
    term: "아키텍처",
    simple: "서비스를 어떤 구조로 만들지",
    description: "화면, 저장소, 서버, 외부 서비스가 어떻게 연결되는지 정리한 큰 그림입니다.",
  },
  {
    term: "기술 스택",
    simple: "개발에 쓸 도구 조합",
    description: "Next.js, TypeScript, Supabase처럼 서비스를 만들 때 사용할 도구 목록입니다.",
  },
  {
    term: "배포",
    simple: "인터넷에 공개하기",
    description: "내 컴퓨터에서만 보이던 서비스를 다른 사람도 접속할 수 있게 올리는 일입니다.",
  },
  {
    term: "프롬프트",
    simple: "AI 개발자에게 줄 작업 요청서",
    description: "AI에게 무엇을 만들지, 어떤 기준으로 끝낼지 알려주는 지시문입니다.",
  },
  {
    term: "환경변수",
    simple: "비밀값을 안전하게 보관하는 설정",
    description: "API 키처럼 공개되면 안 되는 값을 코드 밖에 따로 보관하는 방법입니다.",
  },
  {
    term: "LocalStorage",
    simple: "내 브라우저에 임시 저장하기",
    description: "서버 없이도 사용자의 브라우저 안에 입력 내용을 저장하는 기능입니다.",
  },
  {
    term: "Vercel",
    simple: "웹사이트를 인터넷에 올리는 서비스",
    description: "Next.js 앱을 쉽게 배포하고 주소를 받을 수 있는 호스팅 서비스입니다.",
  },
  {
    term: "Supabase",
    simple: "로그인과 데이터 저장을 쉽게 붙이는 서비스",
    description: "데이터베이스, 로그인, 파일 저장 같은 백엔드 기능을 빠르게 붙일 수 있는 도구입니다.",
  },
];
