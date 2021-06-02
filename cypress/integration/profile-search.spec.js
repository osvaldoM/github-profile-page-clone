describe('Search for profile', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('is searching for a user', () => {
        cy.get('form').within(() => {
            cy.get('input[name="user_name"]').type('ireade')
            cy.root().submit()
        })
        cy.get('[data-cy=repository-list]').within(() => {
            cy.get('[data-cy=repository-item]').should('have.length', 20)
        })
        cy.get('[data-cy=profile]').within(() => {
            cy.contains('Ire Aderinokun');
            cy.contains('ireade');
        })
    })
})
