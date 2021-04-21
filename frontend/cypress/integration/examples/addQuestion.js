context('Add question path', () => {
    it('Goes through the add question path', () => {
      cy.visit('localhost:3000');
      const name = 'Jane Doe';
      const email = 'janedoe@example.com';
      const password = 'password';
      const question = 'What mark should this assignment receive?';
      const questionType = 'Single Choice';
      const timeLimit = 10;
      const points = 10;
      const answer1 = 100;
      const answer2 = 90;
      const answer3 = 'at least 75 pls';
      
      // navigate to register page
      cy.get('a[href="/register"')
        .click()
  
      cy.get('input[name=name]')
        .focus()
        .type(name);   
  
      cy.get('input[name=email]')
        .focus()
        .type(email);
  
      cy.get('input[name=password]')
        .focus()
        .type(password);
  
      cy.get('button[name=submitRegistrationButton]')
        .click();
  
      expect(cy.location('pathname').should('eq', '/dashboard'));
  
      // create new game
      const quizName = 'Test Quiz';
      
      cy.get('button[name=createNewGameButton]')
        .click();
  
      cy.get('input[name=gameName')
        .focus()
        .type(quizName);
  
      cy.get('button[name=createButton')
        .click();   
      
      // navigate back to dashboard
      cy.get('a[href="/dashboard"')
        .click()
      
      expect(cy.location('pathname').should('eq', '/dashboard'));
  
      // edit the newly created game
      cy.get('button[name=editGameButton')
        .click();
      
      // check that we're in the edit game screen
      cy.location('pathname').should('match', /edit\/\d+/);
      
      // click the add question button
      cy.get('button[name=addNewQuestionButton]')
       .click();

      // check that we're in the edit question screen
      cy.location('pathname').should('match', /add\/\d+/);

      // input question details
      cy.get('input[name=question]')
        .focus()
        .type(question);  

      cy.get('[type="radio"]')
        .check(questionType);  

      cy.get('input[id=timeLimit]')
        .focus()
        .type(timeLimit);
      
      cy.get('input[id=points]')
        .focus()
        .type(points);
      
      cy.get('select')
        .select('3');

      cy.get('input[id=answer1]')
        .focus()
        .type(answer3);

      cy.get('input[id=answer2]')
        .focus()
        .type(answer2); 
        
      cy.get('input[id=answer3]')
        .focus()
        .type(answer1);
      
      cy.get('[type="checkbox"]')
        .first()
        .check(); 

      // click the submit question button
      cy.get('button[name=submitNewQuestionButton')
        .click();
      
      // navigate back to dashboard
      cy.get('a[href="/dashboard"')
        .click();
    
      expect(cy.location('pathname').should('eq', '/dashboard'));

      // navigate back to our previous game
      cy.get('button[name=editGameButton')
        .click();
      
      // check that we're in the edit game screen
      cy.location('pathname').should('match', /edit\/\d+/);

      // check that our question is there
      cy.get('p[id=question]')
        .should('have.text', `question: ${question}`);
      
      // logout
      cy.get('button[id=logoutButton')
        .click()
      
      // verify we're back on the login page
      expect(cy.location('pathname').should('eq', '/login'));
      
      // log back in
      cy.get('input[name=loginEmail]')
        .focus()
        .type(email);   
  
      cy.get('input[name=loginPassword]')
        .focus()
        .type(password);
  
      cy.get('button[name=loginButton')
        .click()
      
      // assert that we're logged back in
      expect(cy.location('pathname').should('eq', '/dashboard'));
    });
  });
    