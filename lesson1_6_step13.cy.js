describe('Rewrite test from selenium to cypress', () => {
  beforeEach(() => {
    cy.visit('http://suninjuly.github.io/registration1.html')
  })

  it('Test 1', () => {
    cy.get("h1").should("have.text", "Registration")
    cy.get("h1").next().should("have.text", "Please submit some information about you below:")
  })

  it('Test 2', () => {
    clickButton()
    cy.contains("Congratulations! You have successfully registered!").should("not.exist")
    cy.url().should('eq', "http://suninjuly.github.io/registration1.html")
    
  })

  it('Test 3', () => {
    const elements = ["First name*", "Last name*", "Email*", "Phone:", "Address:"]
    elements.forEach((element) => {
      cy.contains(element).next().type(element).should("have.value", element)
      clickButton()
      cy.url().should('eq', "http://suninjuly.github.io/registration1.html")
      cy.contains("Congratulations! You have successfully registered!").should("not.exist")
      cy.contains(element).next().clear().should("have.value", "")
    })
    
  })

  it('Test 4', () => {
    const elements = ["First name*", "Last name*", "Email*", "Phone:", "Address:"]
    elements.forEach((element) => {
      cy.contains(element).next().type(element).should("have.value", element)
    })
    clickButton()
    cy.url().should('eq', "http://suninjuly.github.io/registration_result.html?")
    cy.get('h1').should("have.text", "Congratulations! You have successfully registered!")
  })

  it('Test 5', () => {
    cy.contains("Phone:").next().type("Phone")
    cy.contains("Address:").next().type("Address")
    clickButton()
    cy.url().should('eq', "http://suninjuly.github.io/registration1.html")
    cy.contains("Congratulations! You have successfully registered!").should("not.exist")
  })
})

function clickButton() {
  cy.contains("Submit").click()
}
