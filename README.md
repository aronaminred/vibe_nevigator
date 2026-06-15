# Vibe Coding Navigator

Windows 95 스타일의 10단계 기획 Wizard입니다. 바이브 코딩을 처음 시작하는 사용자가 서비스 아이디어를 MVP 개발 프롬프트로 정리할 수 있도록 돕습니다.

## 주요 기능

- 10단계 step-by-step 기획 입력
- 단계별 다중 입력 필드: 서비스 이름, 설명, 문제, 목표 등
- Windows 95 데스크톱 앱 레퍼런스를 따른 메뉴바, 툴바, 패널형 레이아웃
- 왼쪽 단계 목록과 도움말, 중앙 입력 패널, 오른쪽 실시간 요약·키워드·진행률 패널
- LocalStorage 자동 저장 및 초기화
- Codex/Cursor/Claude 등에 전달할 개발 프롬프트 자동 생성
- 모바일 대응 Windows 95 스타일 UI
- 로컬 전용 환경변수 파일 `.env.local` 사용

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

`OPENAI_API_KEY`는 향후 AI API 연동을 위한 자리이며, 현재 MVP에서는 서버로 전송하지 않습니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 확인:

```bash
http://localhost:3000
```

## 빌드

```bash
npm run build
```

## 개발문서 v1 반영 범위

- 프로젝트 세팅: Next.js, TypeScript, Tailwind 구성
- 디자인 시스템: WindowFrame, TitleBar, MenuBar, Win95Button, StatusBar 스타일 구현
- Wizard 레이아웃: 10단계 목록, 도움말, 현재 단계 다중 입력, 요약 패널, 이전/다음 이동
- 상태 관리: Project 객체 기반 입력값 관리
- 저장 및 복원: LocalStorage 자동 저장
- 프롬프트 생성: 입력값 기반 개발 프롬프트 생성 및 복사
- QA 기준: 빌드 검증과 모바일 레이아웃 대응

## 배포

GitHub 저장소를 Vercel에 연결한 뒤 기본 설정으로 배포할 수 있습니다.

빌드 명령:

```bash
npm run build
```

환경변수가 필요한 경우 Vercel Project Settings의 Environment Variables에 `.env.example` 기준으로 등록합니다.
