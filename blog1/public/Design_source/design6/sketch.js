let night;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100); // HSB 모드 설정
  night = new Night(); // Night 클래스 인스턴스 생성
}

function draw() {
  background(0); // 기본 배경 초기화
  night.display(); // 저녁 하늘 그리기
}

function mousePressed() {
  night.launchFirework(mouseX, mouseY); // 클릭한 위치에서 폭죽 효과 실행

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 창 크기가 바뀔 때 캔버스 크기 조정
}

class Night {
  constructor() {
    this.stars = [];
    this.fireworks = []; // 폭죽 효과를 저장할 배열
    this.initStars(200);
  }

  // 폭죽 발사 효과 추가
  launchFirework(x, y) {
    for(let i = 0 ; i<3 ; i++){
      let startY = height; // 화면 아래에서 시작
      let targetY = y; // 목표 지점
      let colors = color(random(360), 100, 100); // 폭죽 색상
  
      this.fireworks.push({
        x, // x 위치
        currentY: startY, // 현재 y 위치
        targetY, // 목표 y 위치
        phase: "launch", // 폭죽 단계 (launch -> explode)
        radius: 0, // 초기 반경
        maxRadius: int(random(100, 200)), // 최대 반경
        numDirections: int(random(15, 20)), // 폭발 방향 수
        colors, // 폭죽 색상
  
      });
    }
    
  }

  // 폭죽 애니메이션 그리기
  drawFireworks() {
    for (let i = this.fireworks.length - 1; i >= 0; i--) {
      let fw = this.fireworks[i];

      if (fw.phase === "launch") {
        // 발사 애니메이션
        stroke(255);
        strokeWeight(5);
        line(fw.x, fw.currentY, fw.x, fw.currentY - 10); // 발사 라인

        fw.currentY -= 10; // 위로 이동
        if (fw.currentY <= fw.targetY) {
          fw.phase = "explode"; // 목표에 도달하면 폭발 단계로 전환
        }
      } else if (fw.phase === "explode") {
        // 폭발 애니메이션
        stroke(fw.colors);
        strokeWeight(5);

        for (let j = 0; j < fw.numDirections; j++) {
          let angle = j * (TWO_PI / fw.numDirections);
          let fx = fw.x + cos(angle) * fw.radius; // 각 방향 끝점 x
          let fy = fw.targetY + sin(angle) * fw.radius; // 각 방향 끝점 y

          // 중심점 이동 (반경 증가에 따라 반대 방향으로 이동)
          let centerX = fw.x - cos(angle) * (fw.radius * 3); // 중심점 반대 방향 x
          let centerY = fw.y - sin(angle) * (fw.radius * 3); // 중심점 반대 방향 y

          // 중심점에서 끝점까지 선 그리기
          line(centerX, centerY, fx, fy);
        }

        fw.radius += 3; // 반경 증가

        if (fw.radius > fw.maxRadius) {
          this.fireworks.splice(i, 1); // 폭발이 끝나면 제거
        }
      }
    }
  }

  drawGradient() {
    for (let y = 0; y < height; y++) {
      let inter = map(y, 0, height, 0, 1);
      let c1 = color(240, 80, 20);
      let c2 = color(0, 100, 0);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(0, y, width, y);
    }
  }

  initStars(count) {
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: random(width),
        y: random(height),
        brightness: random(50, 1000), // 초기 밝기
        flickerSpeed: random(0.01, 0.05), // 깜빡이는 속도
        size: random(3, 5), // 별의 크기
      });
    }
  }

  drawStars() {
    noStroke();
    for (let star of this.stars) {
      star.brightness += sin(frameCount * star.flickerSpeed);
      fill(60, 0, star.brightness, 1);
      ellipse(star.x, star.y, star.size);
    }
  }

  display() {
    this.drawGradient();
    this.drawStars();
    this.drawFireworks(); // 폭죽 애니메이션 그리기
    
    

  }
}
