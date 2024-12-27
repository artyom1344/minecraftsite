document.addEventListener('DOMContentLoaded', function() {
    const quizForm = document.getElementById('quiz-form');
    const resultMessage = document.getElementById('result-message');
    const restartButton = document.getElementById('restart-button');
    const submitButton = quizForm.querySelector('button[type="submit"]'); // Получаем кнопку "Проверить результаты"

    quizForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
         submitButton.disabled = true; // Делаем кнопку неактивной
        let score = 0;
        const answers = {
            q1: 'дерево',
            q2: 'лопата',
            q3: 'крипер',
            q4: 'морковь',
            q5: 'b',
            q6: 'c'
        };

        for (let i = 1; i <= Object.keys(answers).length; i++) {
            const questionResult = document.getElementById(`q${i}-result`);
            let userAnswer;
            if(i === 1 || i === 2 || i === 3 || i === 4 ) {
                userAnswer = document.querySelector(`input[name="q${i}"]`).value.toLowerCase();
            } else {
                const selectedRadio = document.querySelector(`input[name="q${i}"]:checked`);
                userAnswer = selectedRadio ? selectedRadio.value : null;
            }

            if (userAnswer === answers[`q${i}`] ) {
                score++;
                questionResult.textContent = 'Ответ правильный';
                questionResult.style.color = 'green';
                questionResult.style.fontWeight = 'bold';
            } else {
                 let correctAnswerText = answers[`q${i}`];
                    if (i === 1) {
                         correctAnswerText = 'дерево'
                     }
                     if (i === 2) {
                         correctAnswerText = 'лопата'
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
         submitButton.disabled = false; // Делаем кнопку активной
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