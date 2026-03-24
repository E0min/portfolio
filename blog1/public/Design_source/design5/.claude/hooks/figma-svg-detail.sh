#!/bin/bash
# Figma MCP PostToolUse Hook
# Figma MCP 도구 호출 후 SVG 에셋을 자동으로 다운로드하고 상세 분석

INPUT=$(cat)

TOOL_OUTPUT=$(echo "$INPUT" | jq -r '.tool_output // empty')

if [ -z "$TOOL_OUTPUT" ]; then
  exit 0
fi

# localhost SVG URL 추출
SVG_URLS=$(echo "$TOOL_OUTPUT" | grep -oE 'http://localhost:3845/assets/[a-f0-9]+\.svg' | sort -u)

if [ -z "$SVG_URLS" ]; then
  exit 0
fi

DETAILS=""
COUNT=0

while IFS= read -r url; do
  [ -z "$url" ] && continue

  # 변수명 추출 (const imgXxx = "url" 패턴)
  VAR_NAME=$(echo "$TOOL_OUTPUT" | grep -B0 "$url" | grep -oE 'const [a-zA-Z0-9_]+' | head -1 | sed 's/const //')

  # SVG 다운로드
  SVG_CONTENT=$(curl -sS --max-time 5 "$url" 2>/dev/null)

  if [ -z "$SVG_CONTENT" ]; then
    continue
  fi

  COUNT=$((COUNT + 1))

  # viewBox 추출
  VIEWBOX=$(echo "$SVG_CONTENT" | grep -oE 'viewBox="[^"]*"' | head -1)

  # width/height 추출
  WIDTH=$(echo "$SVG_CONTENT" | grep -oE 'width="[^"]*"' | head -1)
  HEIGHT=$(echo "$SVG_CONTENT" | grep -oE 'height="[^"]*"' | head -1)

  # path 개수
  PATH_COUNT=$(echo "$SVG_CONTENT" | grep -c '<path')

  # fill 색상 추출
  FILLS=$(echo "$SVG_CONTENT" | grep -oE 'fill="[^"]*"' | sort -u | tr '\n' ', ' | sed 's/,$//')

  # stroke 추출
  STROKES=$(echo "$SVG_CONTENT" | grep -oE 'stroke="[^"]*"' | sort -u | tr '\n' ', ' | sed 's/,$//')

  # path d 데이터 (앞부분만)
  FIRST_PATH_D=$(echo "$SVG_CONTENT" | grep -oE 'd="[^"]{0,120}' | head -1)

  DETAILS="${DETAILS}
---
[SVG #${COUNT}] ${VAR_NAME:-unknown}
  URL: ${url}
  ${WIDTH} ${HEIGHT} ${VIEWBOX}
  Paths: ${PATH_COUNT}
  Fills: ${FILLS}
  Strokes: ${STROKES:-none}
  Path preview: ${FIRST_PATH_D}...\""

done <<< "$SVG_URLS"

if [ $COUNT -gt 0 ]; then
  MSG="[Figma SVG 상세 분석] ${COUNT}개 SVG 에셋 감지됨${DETAILS}

---
[체크리스트] Figma → HTML 변환 시 반드시 확인:
□ 아이콘/화살표 순서: Figma 좌표(left 값)를 비교하여 아이콘이 텍스트 앞인지 뒤인지 확인
□ 요소 간 간격(gap): Figma 좌표 차이를 계산하여 정확한 vw 값 적용 (px / 1920 * 100)
□ SVG 크기: width뿐 아니라 height도 Figma 원본 비율에 맞게 지정
□ 텍스트 SVG: 브라우저 폰트 렌더링과 차이 발생 시 fontTools로 패스 아웃라인 변환
□ viewBox/fill/stroke: SVG 내부 색상이 CSS 디자인 토큰과 일치하는지 확인

[SVG 저장 규칙]
- 다운로드 경로: images/svg/ 또는 images/page/{페이지명}/
- 디렉토리 구조: pages/와 css/는 동일한 하위 구조를 유지"

  jq -n --arg msg "$MSG" '{"systemMessage": $msg}'
else
  exit 0
fi
