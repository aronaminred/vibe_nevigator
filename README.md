# Vibe Coding Navigator

개발 지식이 없는 사람도 서비스 아이디어를 AI 개발 도구에 전달할 수 있는 기획서와 개발 프롬프트로 바꾸는 10단계 Wizard입니다.

이 프로젝트의 핵심은 “개발 용어를 모르는 사람을 위한 번역기”입니다. 사용자는 어려운 말을 직접 쓰지 않고, 추천 선택지를 클릭하고 필요한 부분만 수정합니다. 서비스는 그 입력을 바탕으로 기획 문서, 화면 구조, 기술 설계, 개발 프롬프트를 만들어줍니다.

## 제품 방향

자세한 기획안은 [docs/product-strategy.md](docs/product-strategy.md)를 참고하세요.

상단 버튼, 이어하기, 여러 프로젝트 저장 방향은 [docs/development-v2.md](docs/development-v2.md)에 정리되어 있습니다.

내일 이어서 할 일은 [TODO.md](TODO.md)에 정리되어 있습니다.

## 핵심 사용자

- 서비스 아이디어는 있지만 개발 지식이 거의 없는 사람
- 문과 출신, 비전공자, 1인 창업자, 기획자
- Cursor, Claude, ChatGPT, Codex 같은 AI 도구로 서비스를 만들어보고 싶은 사람
- “무엇을 어떻게 요청해야 하는지”가 막막한 사람

## 핵심 가치

> 아이디어를 개발자가 이해할 수 있는 요구사항과 AI 개발 프롬프트로 번역한다.

## 현재 기능

- Windows 95 스타일의 10단계 Wizard UI
- 첫 화면 온보딩
- 결과물 미리보기
- 초보자를 위한 용어 번역 사전
- 초보자를 위한 추천 선택지 클릭 입력
- 단계별 다중 입력 필드
- 각 단계별 실시간 프롬프트 생성
- 전체 개발 프롬프트 생성
- 10단계 완료 후 결과 탭 화면
- 결과 화면 광고 슬롯 자리
- Wizard 진행 중 하단 광고 슬롯 자리
- 왼쪽 단계 목록과 도움말 패널
- 오른쪽 요약, 키워드, 단계 프롬프트, 진행률 패널
- LocalStorage 자동 저장
- 모바일 대응
- `.env.local` 기반 로컬 환경변수 관리

## 다음 제품 방향

다음 개발의 핵심은 온보딩과 용어 번역입니다.

- 첫 화면에서 이 서비스가 무엇을 해주는지 설명
- “개발 지식이 없어도 된다”는 안내
- 10단계 이후 받을 결과물 미리보기
- 어려운 용어를 쉬운 말로 번역
- 전문용어 옆 도움말 제공
- 결과 화면을 탭 구조로 분리
- 광고 슬롯과 수익화 구조 준비

## 10단계 이후 산출물

최종적으로 사용자는 다음 결과물을 받아야 합니다.

- 서비스 기획 요약서
- MVP 기능 명세서
- 화면 구조 설계서
- 기술 설계서
- AI 개발 프롬프트
- 배포 및 운영 체크리스트

## 기술 스택

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- React 19
- LocalStorage
- Vercel 배포 준비

## 환경변수

실제 비밀 값은 `.env.local`에만 저장합니다. 이 파일은 `.gitignore`에 의해 커밋되지 않습니다.

```bash
cp .env.example .env.local
```

현재 사용하는 값:

```bash
NEXT_PUBLIC_APP_NAME="Vibe Coding Navigator"
NEXT_PUBLIC_STORAGE_KEY="vibe-coding-navigator:v1"
OPENAI_API_KEY=""
```

향후 광고 수익화를 위해 다음 환경변수를 추가할 예정입니다.

```bash
NEXT_PUBLIC_ADSENSE_CLIENT_ID=""
NEXT_PUBLIC_ADSENSE_SLOT_WIZARD_BOTTOM=""
NEXT_PUBLIC_ADSENSE_SLOT_RESULT_TOP=""
NEXT_PUBLIC_ADSENSE_SLOT_RESULT_BOTTOM=""
```

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 확인:

```bash
http://localhost:3000
```

또는:

```bash
http://127.0.0.1:3000
```

## 빌드

```bash
npm run build
```

## 배포

GitHub 저장소를 Vercel에 연결한 뒤 기본 설정으로 배포할 수 있습니다.

빌드 명령:

```bash
npm run build
```

환경변수가 필요한 경우 Vercel Project Settings의 Environment Variables에 `.env.example` 기준으로 등록합니다.
