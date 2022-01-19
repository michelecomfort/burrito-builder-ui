describe('App', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
            fixture: 'order.json'
        })
        cy.visit('http://localhost:3000')
    })

    it('should have a title at the top', () => {
        cy.get('h1').contains('Burrito Builder')
    })

    it('should contain a form', () => {
        cy.get('[data-cy=order-form]')
    })

    it('should start off with 1 order', () => {
        cy.get('[data-cy=orders-grid]')
            .should('have.length', 1)
    })

    it('should have a form with all of the correct elements', () => {
        cy.get('[data-cy=name-input]')
            .should('exist')
            .should('have.class', 'name-input')
            .should('have.value', '')

        cy.get('[data-cy=possible-ingredients]')
            .should('exist')
            .should('have.length',12 )
            .should('have.class', 'possible-ingredients')

        cy.get('[data-cy=submit-order]')
            .should('exist')
            .should('have.class', 'submit-order')
            .contains('Submit Order')
    })

    it('should start off my saying Nothing is selected', () => {
        cy.get('[data-cy=order-selection]')
            .contains('Order: Nothing selected')
    })

    it('should not allow the user to submit an order without a name and at least one ingredient', () => {
        cy.get('[data-cy=name-input]').type('Ross')
        cy.get('[data-cy=submit-order]').click()
        cy.get('[data-cy=orders-grid]')
            .should('have.length', 1)
    })

    it('should allow users to create a new order and it should display on the screen', () => {
        cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
            statusCode: 201,
            body: {
                id: Date.now(),
                name: 'Ross',
                ingredients: ["beans"]
            }
        })
        .get('input').type('Ross')
        .get('[data-cy=possible-ingredients]').eq(0).click()  
        .get('[data-cy=submit-order]').click()
        .wait(2000)
        cy.get('[data-cy=orders-grid]')
            .contains('Ross')
    })


})