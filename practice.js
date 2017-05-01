  // VARIABLE DECLARATIONS ------
  
  var catColorSurvey,
      catPurpleResultQuestions,
      questionCounter,
      correctAnswer,
      correctAnswersCounter,
      userSelectedAnswer,

      // function names
      newSurvey,
      generateQuestionAndAnswers,
      getCorrectAnswer,
      getUserAnswer,
      selectAnswer,
      deselectAnswer,
      selectCorrectAnswer,
      deselectCorrectAnswer,
      getSelectedAnswerDivs,
      highlightCorrectAnswerGreen,
      highlightIncorrectAnswerRed,
      clearHighlightsAndFeedback;

$(document).ready(function(){
  
  // DOM SELECTION ------
  
    // App pages
      // Page 1 - Initial
    var splashPage = $('.splash-page');
      // Page 2 - Choose dog or cat
    var dogCatPage = $('.dogcat-page');
      // Page 3 - Quiz
    var questionsPage = $('.questions-page');
      // Page 4 - Results
    var resultsPage = $('.results-page');
  
    // Buttons
    var splashBtn = $('.js-splash-btn');
    var dogBtn = $('.dog-btn');
    var catBtn = $('.cat-btn');
  
    // Answer block divs
    var answerDiv = $('.answer-div');
    var answerDivA = $('.answer-div-a');
    var answerDivB = $('.answer-div-b');
    var answerDivC = $('.answer-div-c');

    // Questions and answers
    var question = $('.question');
    var answerList = $('.answer-list');
    var answerSpan = $('.answer-span');
    var answerA = $('.questions-page-answer-A');
    var answerB = $('.questions-page-answer-B');
    var answerC = $('.questions-page-answer-C');

    // Results for cats
    var privateInvestigator = $('.privateInvestigator');
    var secretAdmirer = $('.secretAdmirer');
    var lovebug = $('.lovebug');
    var executive = $('.executive');
    var sidekick = $('.sidekick');
    var personalAssistant = $('.personalAssistant');
    var mvp = $('.mvp');
    var partyAnimal = $('.partyAnimal');
    var bandLeader = $('.bandLeader');
  
    // User final score
    var userScore = $('.results-page-score');
  
  // QUIZ CONTENT ------
// Cat Survey Content
var catColorSurvey = [
  {
    question: "I would consider my household to be like...",
    answers: ["A library", "Middle of the road", "A carnival"],
  },
  {
    question: "I am comfortable with a cat that likes to play \"chase my ankles\" and similar games.",
    answers: ["No", "Somewhat", "Yes"],
  },
  {
    question: "I want my cat to interact with guests that come to my house...",
    answers: ["Little of the time", "Some of the time", "All of the time"],
  },
  {
    question: "How do you feel about a boisterous cat that gets into everything?",
    answers: ["Love them but rather not live with them", "Depends on the situation", "Fine by me"],
  },
  {
    question: "My cat needs to be able to adjust to new situations quickly.",
    answers: ["Not important", "Somewhat", "Yes"], 
  }
];

var catPurpleResultQuestions = [
  {
    question: "I want my cat to love being with children in my home.",
    answers: ["Not important", "Some of the time", "Most of the time"],
  },
  {
    question: "My cat needs to be able to be alone...",
    answers: ["9+ hours per day", "4-8 hours per day", "Less than 4 hours per day"],
  },
  {
    question: "When I am at home, I want my cat to be by my side or in my lap...",
    answers: ["Little of the time", "Some of the time", "All of the time"],
  },
  {
    question: "I want my cat to enjoy being held...",
    answers: ["Little of the time", "Some of the time", "Most of the time"],
  },
  {
    question: "I want my cat to be active...",
    answers: ["Not very active at all", "Sometimes", "Yes, very"],
  },
];
  
// FUNCTION DECLARATIONS ------
  
  // Start the quiz
  newSurvey = function() { 
    // Set the question counter to 0
    questionCounter = 0;
    
    // Set the total correct answers counter to 0
    correctAnswersCounter = 0;
    
    // Hide other pages of the app
    questionsPage.hide();
    resultsPage.hide();
  };
  
  // Load the next question and set of answers
  generateQuestionAndAnswers = function() {
    question.text(quiz[questionCounter].question);
    answerA.text(quiz[questionCounter].answers[0]);
    answerB.text(quiz[questionCounter].answers[1]);
    answerC.text(quiz[questionCounter].answers[2]);
    answerD.text(quiz[questionCounter].answers[3]);
  };
  
  // Store the correct answer of a given question
  getCorrectAnswer = function() {
    correctAnswer = quiz[questionCounter].correctAnswer;
  };
  
  // Store the user's selected (clicked) answer
  getUserAnswer = function(target) {
    userSelectedAnswer = $(target).find(answerSpan).text();
  };
  
// APP FUNCTIONALITY ------
  
  /* --- PAGE 1/3 --- */
  
  // Start the quiz:
  newSurvey();
  
  // Clicking on start button:
  startBtn.on('click', function(){
    
    // Advance to questions page
    initPage.hide();
    questionsPage.show(300);
    
    // Load question and answers
    generateQuestionAndAnswers();
    
    // Store the correct answer in a variable
    getCorrectAnswer();
    
    // Hide the submit and continue buttons
    submitBtn.hide();
    continueBtn.hide();
    
  });
  
  /* --- PAGE 2/3 --- */
  
  // Clicking on an answer:
  answerDiv.on('click', function(){
    
    // Make the submit button visible
    submitBtn.show(300);
    
    // Remove pointer from any answer that already has it
    deselectAnswer();
    
    // Put pointer on clicked answer
    selectAnswer(this);
    
    // Store current selection as user answer
    getUserAnswer(this);
    
    // Store current answer div for highlighting purposes
    getSelectedAnswerDivs(this);
    
  });
  
  // Clicking on the submit button:
  submitBtn.on('click', function(){
    
    // Disable ability to select an answer
    answerDiv.off('click');
      
    // Make correct answer green and add a checkmark
    highlightCorrectAnswerGreen();
    
    // Evaluate if the user got the answer right or wrong
    if (userSelectedAnswer === correctAnswer) {
      // Increment the total correct answers counter
      correctAnswersCounter++;
    }
    else {
      highlightIncorrectAnswerRed();
    }
    
    // Substitute the submit button for the continue button:
    submitBtn.hide(300);
    continueBtn.show(300);
    
  });
  
  // Clicking on the continue button:
  continueBtn.on('click', function(){
    
    // Increment question number until there are no more questions, then advance to the next page
    if (questionCounter < quiz.length - 1) {
      questionCounter++;
    }
    else {
      questionsPage.hide();
      resultsPage.show(300);
      // Display user score as a percentage
      userScore.text(Math.floor((correctAnswersCounter / quiz.length) * 100) + "%");
    }
    
    // Load the next question and set of answers
    generateQuestionAndAnswers();
    
    // Store the correct answer in a variable
    getCorrectAnswer();
    
    // Remove all selections, highlighting, and feedback
    deselectAnswer();
    clearHighlightsAndFeedback();
    
    // Hide the continue button
    continueBtn.hide(300);
    
    // Enable ability to select an answer
    answerDiv.on('click', function(){
      // Make the submit button visible
      submitBtn.show(300);
      // Remove pointer from any answer that already has it
      deselectAnswer();
      // Put pointer on clicked answer
      selectAnswer(this);
      // Store current answer div for highlighting purposes
      getSelectedAnswerDivs(this);
      // Store current selection as user answer
      getUserAnswer(this);
    });
    
  });
  
  /* --- PAGE 3/3 --- */

  // Clicking on the retake button:
  retakeBtn.on('click', function(){
    
    // Go to the first page
    resultsPage.hide();
    initPage.show(300);
  
    // Start the quiz over
    newQuiz();
    
  });

  // Clicking on the spanish button:
    // Link takes user to Duolingo
  
});