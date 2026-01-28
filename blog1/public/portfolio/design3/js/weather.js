document.addEventListener("DOMContentLoaded", () => {
    // 날씨 선택 버튼 이벤트 리스너
    const weatherButtons = document.querySelectorAll('.weather-btn');

    weatherButtons.forEach(button => {
        button.addEventListener('click', () => {
            const weatherType = button.getAttribute('data-weather');
            setWeather(weatherType);
        });
    });

    // 날짜 및 시간 표시
    displayDateTime();

    // 기본 날씨를 맑음으로 설정
    setWeather('clear');

    // 날씨 설정 함수
    function setWeather(weatherType) {
        const weatherKor = document.querySelector('.weatherKor');
        const weatherEng = document.querySelector('.weatherEng');
        const temperatureDiv = document.querySelector('.temperature');

        // 날씨 상태에 따라 data-weather 속성 동적으로 설정
        document.documentElement.setAttribute('data-weather', weatherType);

        // 날씨별 정보 설정
        const weatherData = {
            'clear': { kor: '맑음', eng: 'Clear', temp: '25.00 °C' },
            'rain': { kor: '비', eng: 'Rain', temp: '18.00 °C' },
            'snow': { kor: '눈', eng: 'Snow', temp: '-2.00 °C' },
            'clouds': { kor: '흐림', eng: 'Clouds', temp: '20.00 °C' }
        };

        const data = weatherData[weatherType];
        weatherKor.innerHTML = data.kor;
        weatherEng.innerHTML = data.eng;
        temperatureDiv.innerHTML = data.temp;

        // 버튼 활성화 상태 업데이트
        weatherButtons.forEach(btn => {
            if (btn.getAttribute('data-weather') === weatherType) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // 현재 날짜와 시간을 표시하는 함수
    function displayDateTime() {
        const now = new Date();

        // 월, 일, 시간 추출
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');

        // 현재 월과 일을 화면에 표시
        document.querySelector('.month').textContent = month;
        document.querySelector('.day').textContent = day;

        // 현재 시간을 화면에 표시
        document.querySelector('.time').textContent = `${hours}:${minutes}`;

        // 위치 정보 표시
        document.querySelector('.location').textContent = 'Seoul';
        document.querySelector('.latitude').textContent = '37.5665';
        document.querySelector('.longitude').textContent = '126.9780';
    }
});
