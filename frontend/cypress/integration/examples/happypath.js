context('Happy path', () => {
  it('Goes through the happy path', () => {
    cy.visit('localhost:3000');
    const name = 'John Smith';
    const email = 'johnsmith@example.com';
    const password = 'password';
    const quizName = 'Test Quiz';

    // navigate to register page
    cy.get('a[href="/register"')
      .click()

    // input registration details
    cy.get('input[name=name]')
      .focus()
      .type(name);   

    cy.get('input[name=email]')
      .focus()
      .type(email);

    cy.get('input[name=password]')
      .focus()
      .type(password);

    cy.get('input[name=passwordConfirm]')
      .focus()
      .type(password);

    // register successfully
    cy.get('button[name=submitRegistrationButton]')
      .click();

    // verify that we are on the dashboard
    expect(cy.location('pathname').should('eq', '/dashboard'));

    // create new game
    cy.get('button[name=createNewGameButton]')
      .click();

    cy.get('input[name=gameName')
      .focus()
      .type(quizName);

    // submit new game
    cy.get('button[name=createButton')
      .click();   
    
    // verify that we were automatically redirected to the dashboard
    expect(cy.location('pathname').should('eq', '/dashboard'));

    // start the newly created game
    cy.get('button[name=startGameButton')
      .click();

    // check that modal for the game has appeared, indicating that the game has started
    cy.get('h2[id="gameModalTitle"]')
      .should('have.text', 'Game Started')

    // end the game
    cy.get('button[id=stopGameButton]')
      .click();

    // click view results
    cy.get('button[name=yesButtonViewResults]')
      .click();
    
    // check we're on the results page
    cy.location('pathname').should('match', /results\/\d+/);

    // navigate back to dashboard
    cy.get('a[href="/dashboard"')
      .click()

    // modal should no longer be there
    cy.get('h2[id="gameModalTitle"]')
    .should('not.exist');

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
  