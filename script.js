document.addEventListener('DOMContentLoaded', function() {
    const authForm = document.getElementById('auth-form');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const registerNewForm = document.getElementById('register-new-form');
    const contentDiv = document.getElementById('content');
    const usernameInput = document.getElementById('username');
    const dobInput = document.getElementById('dob');
    const genderSelect = document.getElementById('gender');
    const usernameError = document.getElementById('username-error');
    const dobError = document.getElementById('dob-error');
    const genderError = document.getElementById('gender-error');
    const formError = document.getElementById('form-error');
    const usernameLogin = document.getElementById('username-login');
    const dobLogin = document.getElementById('dob-login');
    const genderLogin = document.getElementById('gender-login');
    const usernameErrorLogin = document.getElementById('username-error-login');
    const dobErrorLogin = document.getElementById('dob-error-login');
    const genderErrorLogin = document.getElementById('gender-error-login');
    const formErrorLogin = document.getElementById('form-error-login');
    const logoutButton = document.getElementById('logout-btn');
    const welcomeMessage = document.getElementById('welcome-message');
    const userNameDisplay = document.getElementById('user-name-display');
    const showRegisterBtn = document.getElementById('show-register-btn');

    // Функция для проверки, зарегистрирован ли пользователь
    function isUserRegistered() {
        return localStorage.getItem('isRegistered') === 'true';
    }

    function getUsername() {
        return localStorage.getItem('username');
    }
    function getDob() {
        return localStorage.getItem('dob');
    }
    function getGender() {
        return localStorage.getItem('gender');
    }
    function showContent() {
        if (contentDiv) {
            contentDiv.style.display = 'block';
        }
        if (logoutButton) {
            logoutButton.style.display = 'block';
        }
        updateProfile();
        updateHeader();
    }

    function showAuthForm() {
        if (authForm) {
            authForm.style.display = 'flex';
        }
    }

    function hideAuthForm() {
        if (authForm) {
            authForm.style.display = 'none';
        }
    }

    function hideRegisterForm() {
        if (registerForm) {
            registerForm.style.display = 'none';
        }
    }

    function showRegisterForm() {
        if (registerForm) {
            registerForm.style.display = 'flex';
        }
         if (authForm) {
           authForm.style.display = 'none';
        }
    }

    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', showRegisterForm);
    }

    function logout() {
        localStorage.removeItem('isRegistered');
        localStorage.removeItem('username');
        localStorage.removeItem('testScore');
        localStorage.removeItem('dob');
        localStorage.removeItem('gender');
        if (contentDiv) {
            contentDiv.style.display = 'none';
        }
        if (logoutButton) {
            logoutButton.style.display = 'none';
        }
         if(welcomeMessage){
             welcomeMessage.style.display = 'none';
         }
        showRegisterForm();
    }

    window.logout = logout;

    function checkRegistration() {
      
         if (!isUserRegistered()) {
             showRegisterForm();
            } else {
            showContent();
             hideAuthForm();
            if (welcomeMessage) {
                 welcomeMessage.style.display = 'block';
            }
         }
        updateHeader();
    }
    function calculateAge(dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    function updateHeader() {
        const username = getUsername();
        if (userNameDisplay && username) {
           userNameDisplay.textContent = username;
        }
    }

      function updateProfile() {
          const profileName = document.getElementById('profile-name');
         const profileScore = document.getElementById('profile-score');
         const profileAge = document.getElementById('profile-age');
         const profileGender = document.getElementById('profile-gender');
         const username = getUsername();
         const testScore = localStorage.getItem('testScore');
         const dob = getDob();
         const gender = getGender();
         const totalQuestions = 6;
       if (profileName) {
           profileName.textContent = username || 'Имя не найдено';
        }
        if(profileAge){
             profileAge.textContent = dob ? calculateAge(dob) + ' лет' : '0 лет';
          }

        if(profileGender){
            profileGender.textContent = gender === 'male' ? "Мужской" : gender === 'female' ? "Женский" : "Пол не определен";
         }
       if (profileScore) {
           profileScore.textContent = testScore ? `${testScore} из ${totalQuestions}` : '0 из 6';
          }
     }

        checkRegistration();

    function validateUsername(username) {
        const regex = /^[а-яА-ЯёЁ0-9]+$/;
        return regex.test(username) && username.length >= 4 && username.length <= 10;
    }

    function validateDateOfBirth(dob) {
        const selectedDate = new Date(dob);
        const minDate = new Date(1950, 0, 1);
        return selectedDate >= minDate;
    }

    function validateGender(gender) {
        return gender !== "";
    }

    function displayError(element, message) {
        if (element) {
            element.textContent = message;
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let isFormValid = true;
            if (!usernameLogin) return;
            if (!validateUsername(usernameLogin.value)) {
                displayError(usernameErrorLogin, 'Логин должен содержать от 4 до 10 символов (только русские буквы и цифры).');
                isFormValid = false;
            } else {
                displayError(usernameErrorLogin, '');
            }
            if (!dobLogin) return;
            if (!validateDateOfBirth(dobLogin.value)) {
                displayError(dobErrorLogin, 'Дата рождения должна быть не раньше 1950 года.');
                isFormValid = false;
            } else {
                displayError(dobErrorLogin, '');
            }
            if (!genderLogin) return;
            if (!validateGender(genderLogin.value)) {
                displayError(genderErrorLogin, 'Выберите пол.');
                isFormValid = false;
            } else {
                displayError(genderErrorLogin, '');
            }

            if (isFormValid) {
                localStorage.setItem('isRegistered', 'true');
                localStorage.setItem('username', usernameLogin.value);
                showContent();
                hideAuthForm();
                updateHeader();
            } else {
                displayError(formErrorLogin, 'Пожалуйста, исправьте ошибки.');
            }
        });
    }
    if (registerNewForm) {
        registerNewForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let isFormValid = true;

            if (!usernameInput) return;
            if (!validateUsername(usernameInput.value)) {
                displayError(usernameError, 'Логин должен содержать от 4 до 10 символов (только русские буквы и цифры).');
                isFormValid = false;
            } else {
                displayError(usernameError, '');
            }
            if (!dobInput) return;
            if (!validateDateOfBirth(dobInput.value)) {
                displayError(dobError, 'Дата рождения должна быть не раньше 1950 года.');
                isFormValid = false;
            } else {
                displayError(dobError, '');
            }
            if (!genderSelect) return;
            if (!validateGender(genderSelect.value)) {
                displayError(genderError, 'Выберите пол.');
                isFormValid = false;
            } else {
                displayError(genderError, '');
            }


            if (isFormValid) {
                localStorage.setItem('isRegistered', 'true');
                localStorage.setItem('username', usernameInput.value);
                  localStorage.setItem('dob', dobInput.value);
                localStorage.setItem('gender', genderSelect.value);
               hideRegisterForm();
                showContent();
                 updateHeader();
            } else {
                displayError(formError, 'Пожалуйста, исправьте ошибки.');
            }
        });
    }


    function updateProfile() {
        const profileName = document.getElementById('profile-name');
        const profileScore = document.getElementById('profile-score');
         const profileAge = document.getElementById('profile-age');
          const profileGender = document.getElementById('profile-gender');
        const username = getUsername();
        const testScore = localStorage.getItem('testScore');
           const dob = getDob();
            const gender = getGender();
          const totalQuestions = 6;
        if (profileName) {
            profileName.textContent = username || 'Имя не найдено';
        }
          if(profileAge){
              profileAge.textContent = dob ? calculateAge(dob) + ' лет' : '0 лет';
           }

          if(profileGender){
             profileGender.textContent = gender === 'male' ? "Мужской" : gender === 'female' ? "Женский" : "Пол не определен"
           }
        if (profileScore) {
            profileScore.textContent = testScore ? `${testScore} из ${totalQuestions}` : '0 из 6';
        }
    }
    window.updateProfile = updateProfile;
});

function saveTestResult(score) {
    localStorage.setItem('testScore', score);
}
window.saveTestResult = saveTestResult;
document.addEventListener('DOMContentLoaded', function() {
    const quizForm = document.getElementById('quiz-form');
    const resultMessage = document.getElementById('result-message');
    const restartButton = document.getElementById('restart-button');

    quizForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let score = 0;
        const answers = {
            q1: 'a',
            q2: 'b',
             q3: 'крипер',
            q4: 'морковь',
            q5: 'b',
             q6: 'c'
        };

        for (let i = 1; i <= Object.keys(answers).length; i++) {
            const questionResult = document.getElementById(`q${i}-result`);
             let userAnswer;
                if(i === 1 || i === 2 || i === 5 || i === 6) {
                   const selectedRadio = document.querySelector(`input[name="q${i}"]:checked`);
                   userAnswer = selectedRadio ? selectedRadio.value : null;
                 } else {
                   userAnswer = document.querySelector(`input[name="q${i}"]`).value.toLowerCase();
               }

             if (userAnswer === answers[`q${i}`] ) {
                score++;
                questionResult.textContent = 'Ответ правильный';
                  questionResult.style.color = 'green';
                 questionResult.style.fontWeight = 'bold';
             }  else {
                 let correctAnswerText = answers[`q${i}`];
                if(i === 1){
                       correctAnswerText = 'Дерево';
                 }
                 if(i === 2){
                      correctAnswerText = 'Лопата';
                 }
                if(i === 3){
                       correctAnswerText = 'крипер';
                 }
                 if(i === 4){
                     correctAnswerText = 'морковь';
                 }
                 if(i === 5){
                       correctAnswerText = 'В пещерах';
                 }
                 if(i === 6){
                       correctAnswerText = 'Багровое дерево';
                 }
                questionResult.textContent = `Ответ неправильный, правильный ответ: ${correctAnswerText}`;
                questionResult.style.color = 'red';
                 questionResult.style.fontWeight = 'bold';
            }
        }

        saveTestResult(score);
        resultMessage.textContent = `Вы набрали ${score} из ${Object.keys(answers).length} баллов`;
          restartButton.style.display = 'inline-block';
    });
      restartButton.addEventListener('click', function() {
        quizForm.reset();
         resultMessage.textContent = '';
         restartButton.style.display = 'none';
         const questionResults = document.querySelectorAll('.result-message');
            questionResults.forEach(result => {
             result.textContent = '';
         });
    });
});

 function saveTestResult(score) {
    localStorage.setItem('testScore', score);
}
window.saveTestResult = saveTestResult;